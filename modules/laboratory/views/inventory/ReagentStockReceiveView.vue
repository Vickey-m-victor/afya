<script setup>
import { ref, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useLaboratoryStore } from "../../stores/laboratoryStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const store = useLaboratoryStore();
const router = useRouter();

const itemsToReceive = ref([]); // List of { reagent_id, name, receive_qty, expiry_date, unit_price }
const selectedReagentId = ref("");
const receiveQty = ref(100);
const expiryDate = ref("");
const unitPrice = ref(0);

onMounted(async () => {
  await store.fetchReagents();
});

function handleReagentChange() {
  const reagent = store.reagents.find(r => r.id === parseInt(selectedReagentId.value, 10));
  if (reagent) {
    unitPrice.value = reagent.unit_price;
    expiryDate.value = reagent.expiry_date;
  }
}

function addToList() {
  if (!selectedReagentId.value) return;
  
  const reagentId = parseInt(selectedReagentId.value, 10);
  const reagent = store.reagents.find(r => r.id === reagentId);
  
  if (!reagent) return;
  
  // Check if item already exists in list
  const existing = itemsToReceive.value.find(item => item.reagent_id === reagentId);
  if (existing) {
    existing.receive_qty += parseInt(receiveQty.value, 10);
    existing.expiry_date = expiryDate.value;
    existing.unit_price = parseFloat(unitPrice.value);
  } else {
    itemsToReceive.value.push({
      reagent_id: reagentId,
      name: reagent.name,
      code: reagent.code,
      receive_qty: parseInt(receiveQty.value, 10),
      expiry_date: expiryDate.value,
      unit_price: parseFloat(unitPrice.value)
    });
  }

  // Reset inputs
  selectedReagentId.value = "";
  receiveQty.value = 100;
  expiryDate.value = "";
  unitPrice.value = 0;
}

function removeFromList(index) {
  itemsToReceive.value.splice(index, 1);
}

async function submitReceive() {
  if (itemsToReceive.value.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Empty Batch",
      text: "Please add at least one reagent item to the batch."
    });
    return;
  }

  const result = await Swal.fire({
    title: "Verify Stock Batch",
    text: `Are you sure you want to receive these ${itemsToReceive.value.length} items and update reagent inventory?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Receive Stock",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  try {
    await store.receiveStockBatch(itemsToReceive.value);
    itemsToReceive.value = [];
    Swal.fire({
      icon: "success",
      title: "Stock Received",
      text: "Reagent inventory quantities have been successfully updated.",
      timer: 1500,
      showConfirmButton: false
    });
    router.push({ name: "laboratory/inventory" });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed to Update Stock",
      text: err.message || "An error occurred."
    });
  }
}
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 class="h3 fw-bold mb-1">Receive Reagents (GRN)</h1>
        <div class="text-muted fs-sm">Log incoming reagent stock batches from laboratory suppliers.</div>
      </div>
      <button type="button" class="btn btn-alt-secondary btn-sm" @click="router.push({ name: 'laboratory/inventory' })">
        <i class="fa fa-boxes-stacked me-1"></i> Reagent Catalog
      </button>
    </div>

    <div class="row">
      <!-- Left: Stock Entry Form -->
      <div class="col-xl-4">
        <BaseBlock class="shadow-sm border border-light bg-white h-100">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Add Item to Batch</h3>
          </template>

          <div class="block-content">
            <form @submit.prevent="addToList">
              <!-- Select Reagent -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark fs-xs text-uppercase">Select Reagent *</label>
                <select v-model="selectedReagentId" class="form-select" @change="handleReagentChange" required>
                  <option value="" disabled selected>-- Choose Reagent --</option>
                  <option v-for="reagent in store.reagents" :key="reagent.id" :value="reagent.id">
                    {{ reagent.name }} ({{ reagent.code }})
                  </option>
                </select>
              </div>

              <!-- Receive Quantity -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark fs-xs text-uppercase">Quantity Received (tests) *</label>
                <input v-model.number="receiveQty" type="number" class="form-control text-center font-monospace" min="1" required />
              </div>

              <!-- Cost / Price Update -->
              <div class="mb-3">
                <label class="form-label fw-bold text-dark fs-xs text-uppercase">Unit Cost Price (KES)</label>
                <input v-model.number="unitPrice" type="number" step="0.01" class="form-control text-center font-monospace" />
                <div class="form-text fs-xs text-muted">Update kit unit cost if changed.</div>
              </div>

              <!-- Batch Expiry -->
              <div class="mb-4">
                <label class="form-label fw-bold text-dark fs-xs text-uppercase">Batch Expiry Date *</label>
                <input v-model="expiryDate" type="date" class="form-control text-center" required />
              </div>

              <!-- Add button -->
              <button type="submit" class="btn btn-primary w-100" :disabled="!selectedReagentId">
                <i class="fa fa-plus me-1"></i> Add to Batch List
              </button>
            </form>
          </div>
        </BaseBlock>
      </div>

      <!-- Right: Batch Summary Table -->
      <div class="col-xl-8">
        <BaseBlock class="shadow-sm border border-light bg-white h-100 d-flex flex-column justify-content-between">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Incoming Batch List</h3>
          </template>

          <template #options>
            <span class="badge bg-primary-light text-primary font-monospace">{{ itemsToReceive.length }} items</span>
          </template>

          <div class="block-content p-0 flex-grow-1">
            <div v-if="itemsToReceive.length === 0" class="text-center py-5 text-muted">
              <i class="fa fa-truck-loading fs-1 mb-3"></i>
              <p class="mb-0">Batch list is currently empty. Use the left panel to add reagent items.</p>
            </div>
            
            <div v-else class="table-responsive">
              <table class="table table-vcenter table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th class="ps-4">Reagent Item</th>
                    <th class="text-center">Receive Qty (tests)</th>
                    <th class="text-end">Unit Cost</th>
                    <th>Expiry Date</th>
                    <th class="text-center" style="width: 80px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in itemsToReceive" :key="index">
                    <td class="ps-4">
                      <div class="fw-bold text-dark fs-sm">{{ item.name }}</div>
                      <div class="fs-xs text-muted">{{ item.code }}</div>
                    </td>
                    <td class="text-center font-monospace fw-bold text-success">+{{ item.receive_qty }}</td>
                    <td class="text-end font-monospace fs-sm">KES {{ item.unit_price.toFixed(2) }}</td>
                    <td class="fs-sm">{{ item.expiry_date }}</td>
                    <td class="text-center">
                      <button type="button" class="btn btn-sm btn-alt-danger rounded-circle border-0" @click="removeFromList(index)">
                        <i class="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="block-content block-content-full bg-body-light rounded-bottom p-3">
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-success px-4"
                :disabled="itemsToReceive.length === 0"
                @click="submitReceive"
              >
                <i class="fa fa-circle-check me-1"></i> Receive & Update Reagents
              </button>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary-light { background-color: rgba(14, 130, 253, 0.1) !important; }
</style>
