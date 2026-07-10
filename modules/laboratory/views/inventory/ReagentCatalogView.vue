<script setup>
import { ref, computed, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useLaboratoryStore } from "../../stores/laboratoryStore";
import Swal from "sweetalert2";

const store = useLaboratoryStore();

const searchQuery = ref("");
const showAddModal = ref(false);

const newReagentForm = ref({
  name: "",
  description: "",
  qty: 0,
  min_threshold: 20,
  unit_price: 0,
  expiry_date: ""
});

onMounted(async () => {
  await store.fetchReagents();
});

const filteredReagents = computed(() => {
  if (!searchQuery.value) return store.reagents;
  const query = searchQuery.value.toLowerCase();
  return store.reagents.filter(r => 
    r.name.toLowerCase().includes(query) ||
    r.code.toLowerCase().includes(query) ||
    (r.description && r.description.toLowerCase().includes(query))
  );
});

function openAddModal() {
  newReagentForm.value = {
    name: "",
    description: "",
    qty: 0,
    min_threshold: 20,
    unit_price: 0,
    expiry_date: ""
  };
  showAddModal.value = true;
}

async function submitNewReagent() {
  if (!newReagentForm.value.name || !newReagentForm.value.expiry_date) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill in all required fields."
    });
    return;
  }

  try {
    await store.addReagent(newReagentForm.value);
    showAddModal.value = false;
    Swal.fire({
      icon: "success",
      title: "Reagent Cataloged",
      text: "The new reagent has been added successfully.",
      timer: 1500,
      showConfirmButton: false
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed to Add Reagent",
      text: err.message || "An error occurred."
    });
  }
}

function getExpiryClass(expiryDate) {
  const today = new Date();
  const exp = new Date(expiryDate);
  const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "text-danger fw-bold"; // Expired
  if (diffDays <= 90) return "text-warning fw-bold"; // Expiring soon
  return "text-muted";
}
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2 text-center text-sm-start mb-4">
      <div class="flex-grow-1">
        <h1 class="h3 fw-bold mb-2">Reagent & Supplies Catalog</h1>
        <h2 class="h6 fw-medium text-muted mb-0">Monitor lab chemical kit inventories, manage stock levels, and track expiry warnings.</h2>
      </div>
      <div class="mt-3 mt-sm-0 ms-sm-3">
        <button type="button" class="btn btn-primary d-flex align-items-center gap-2" @click="openAddModal">
          <i class="fa fa-plus"></i> Add New Reagent
        </button>
      </div>
    </div>

    <!-- Inventory Table Block -->
    <div class="row">
      <div class="col-12">
        <BaseBlock class="shadow-sm border border-light bg-white">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Active Reagent List</h3>
          </template>
          
          <template #options>
            <div class="d-flex gap-3 align-items-center w-100 flex-wrap">
              <!-- Search -->
              <div class="input-group input-group-sm" style="width: 250px;">
                <span class="input-group-text bg-body-light border-0">
                  <i class="fa fa-search text-muted"></i>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control bg-body-light border-0"
                  placeholder="Search reagent name, code..."
                />
              </div>
            </div>
          </template>

          <div class="block-content p-0">
            <div v-if="store.isLoading" class="text-center py-5 text-muted">
              <i class="fa fa-circle-notch fa-spin fs-1 mb-3"></i>
              <p>Loading reagent catalog...</p>
            </div>

            <div v-else-if="filteredReagents.length === 0" class="text-center py-5 text-muted">
              <i class="fa fa-box-open fs-1 mb-3"></i>
              <p class="mb-0">No reagents match your search criteria.</p>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-vcenter table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th class="ps-4">Code</th>
                    <th>Reagent Kit / Item</th>
                    <th>Description</th>
                    <th class="text-end">Unit Cost</th>
                    <th class="text-center">Stock Level (tests)</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="reagent in filteredReagents" :key="reagent.id" class="border-bottom border-light">
                    <td class="ps-4 font-monospace fs-sm text-primary fw-semibold">{{ reagent.code }}</td>
                    <td class="py-3">
                      <div class="fw-bold text-dark fs-sm">{{ reagent.name }}</div>
                    </td>
                    <td class="fs-sm text-muted">{{ reagent.description || '-' }}</td>
                    <td class="text-end font-monospace fs-sm fw-semibold">KES {{ reagent.unit_price.toFixed(2) }}</td>
                    <td class="text-center">
                      <div class="d-inline-flex flex-column align-items-center">
                        <span class="fs-sm fw-bold font-monospace" :class="reagent.qty <= reagent.min_threshold ? 'text-danger' : 'text-dark'">
                          {{ reagent.qty }}
                        </span>
                        <span v-if="reagent.qty === 0" class="badge bg-danger fs-xs mt-1">Depleted</span>
                        <span v-else-if="reagent.qty <= reagent.min_threshold" class="badge bg-warning fs-xs mt-1">Low Stock</span>
                        <span v-else class="badge bg-success-light text-success fs-xs mt-1">Sufficient</span>
                      </div>
                    </td>
                    <td class="fs-sm">
                      <div :class="getExpiryClass(reagent.expiry_date)">
                        {{ reagent.expiry_date }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>

    <!-- Bootstrap/OneUI Modal Mockup for adding reagent -->
    <div v-if="showAddModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content shadow-lg border-0">
          <div class="block block-rounded block-transparent mb-0">
            <div class="block-header block-header-default bg-primary py-3 px-4 rounded-top">
              <h3 class="block-title text-white fw-bold"><i class="fa fa-flask me-2"></i>Add New Reagent</h3>
              <div class="block-options">
                <button type="button" class="btn-close btn-close-white" @click="showAddModal = false"></button>
              </div>
            </div>
            
            <div class="block-content py-4 px-4">
              <form @submit.prevent="submitNewReagent">
                <!-- Reagent Name -->
                <div class="mb-3">
                  <label class="form-label fw-bold text-dark fs-xs text-uppercase">Reagent Name *</label>
                  <input v-model="newReagentForm.name" type="text" class="form-control" placeholder="e.g. CBC Diluent, LFT Reagent Pack" required />
                </div>

                <!-- Description -->
                <div class="mb-3">
                  <label class="form-label fw-bold text-dark fs-xs text-uppercase">Description</label>
                  <textarea v-model="newReagentForm.description" class="form-control" rows="2" placeholder="Describe clinical use, packaging, etc."></textarea>
                </div>

                <!-- Quantities -->
                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label fw-bold text-dark fs-xs text-uppercase">Initial Qty (tests)</label>
                    <input v-model.number="newReagentForm.qty" type="number" class="form-control text-center font-monospace" min="0" />
                  </div>
                  <div class="col-6">
                    <label class="form-label fw-bold text-dark fs-xs text-uppercase">Low Stock Alert Level</label>
                    <input v-model.number="newReagentForm.min_threshold" type="number" class="form-control text-center font-monospace" min="0" />
                  </div>
                </div>

                <!-- Unit Cost & Expiry -->
                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label fw-bold text-dark fs-xs text-uppercase">Unit Cost (KES) *</label>
                    <input v-model.number="newReagentForm.unit_price" type="number" step="0.01" class="form-control text-center font-monospace" required />
                  </div>
                  <div class="col-6">
                    <label class="form-label fw-bold text-dark fs-xs text-uppercase">Expiry Date *</label>
                    <input v-model="newReagentForm.expiry_date" type="date" class="form-control text-center" required />
                  </div>
                </div>
              </form>
            </div>

            <div class="block-content block-content-full text-end bg-body-light rounded-bottom p-3">
              <button type="button" class="btn btn-alt-secondary me-2" @click="showAddModal = false">Cancel</button>
              <button type="button" class="btn btn-primary" @click="submitNewReagent">
                <i class="fa fa-save me-1"></i> Save Reagent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-success-light { background-color: rgba(40, 167, 69, 0.1) !important; }
</style>
