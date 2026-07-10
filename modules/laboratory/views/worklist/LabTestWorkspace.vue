<script setup>
import { ref, onMounted, computed } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useLaboratoryStore } from "../../stores/laboratoryStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const props = defineProps({
  orderId: {
    type: [String, Number],
    required: true
  }
});

const store = useLaboratoryStore();
const router = useRouter();

const order = ref(null);
const resultValues = ref({}); // Maps item.id -> string/number
const remarks = ref("");
const isSaving = ref(false);
const errorMsg = ref("");

onMounted(async () => {
  await store.fetchReagents();
  const foundOrder = await store.fetchLabOrderById(props.orderId);
  if (foundOrder) {
    order.value = JSON.parse(JSON.stringify(foundOrder));
    remarks.value = order.value.remarks || "";
    order.value.items.forEach(item => {
      resultValues.value[item.id] = item.value || "";
    });
  } else {
    errorMsg.value = "Laboratory order not found.";
  }
});

function getReagentInfo(reagentId) {
  return store.reagents.find(r => r.id === reagentId) || { qty: 0, name: "Unknown reagent", expiry_date: "" };
}

// Check stock validity
function isReagentAvailable(item) {
  if (order.value.status === "completed") return true;
  if (!item.reagent_id) return true;
  const reagent = getReagentInfo(item.reagent_id);
  return reagent.qty > 0;
}

// Smart reference range validation
function checkReferenceRange(testName, value) {
  if (!value || isNaN(parseFloat(value))) return null;
  const numVal = parseFloat(value);
  
  let name = testName.toLowerCase();
  let min = null;
  let max = null;

  if (name.includes("hba1c")) {
    min = 4.0;
    max = 5.6;
  } else if (name.includes("hemoglobin") || name.includes("fbc") || name.includes("cbc")) {
    min = 12.0;
    max = 17.5;
  } else if (name.includes("alt")) {
    min = 7.0;
    max = 56.0;
  } else if (name.includes("ast")) {
    min = 10.0;
    max = 40.0;
  } else if (name.includes("creatinine")) {
    min = 0.6;
    max = 1.2;
  } else if (name.includes("urea") || name.includes("bun")) {
    min = 7.0;
    max = 20.0;
  } else if (name.includes("sugar") || name.includes("rbs") || name.includes("glucose")) {
    min = 70.0;
    max = 140.0;
  }

  if (min !== null && max !== null) {
    if (numVal < min) return "LOW";
    if (numVal > max) return "HIGH";
    return "NORMAL";
  }
  return null;
}

const hasFormErrors = computed(() => {
  if (!order.value) return true;
  // If reagent is completely out of stock for pending items, show form errors
  if (order.value.status !== "completed") {
    return order.value.items.some(item => !isReagentAvailable(item));
  }
  return false;
});

async function handleSubmit() {
  if (hasFormErrors.value) {
    Swal.fire({
      icon: "error",
      title: "Reagents Unavailable",
      text: "One or more requested tests cannot be performed due to depleted reagent stock."
    });
    return;
  }

  const result = await Swal.fire({
    title: "Verify & Submit Results",
    text: "This will commit results, decrement reagent inventory, and complete the order.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirm & Submit",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  isSaving.value = true;
  try {
    const payload = order.value.items.map(item => ({
      id: item.id,
      value: String(resultValues.value[item.id]).trim()
    }));

    await store.saveLabResults(props.orderId, payload, remarks.value);

    await Swal.fire({
      icon: "success",
      title: "Results Recorded",
      text: "Laboratory reports updated and sent to ordering clinician.",
      timer: 1500,
      showConfirmButton: false
    });

    router.push({ name: "laboratory/worklist" });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: err.message || "An error occurred."
    });
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 class="h3 fw-bold mb-1">Laboratory Test Workspace</h1>
        <div class="text-muted fs-sm">Clinical Investigation Reports Workspace</div>
      </div>
      <button type="button" class="btn btn-alt-secondary btn-sm" @click="router.push({ name: 'laboratory/worklist' })">
        <i class="fa fa-arrow-left me-1"></i> Back to Queue
      </button>
    </div>

    <!-- Error State -->
    <div v-if="errorMsg" class="alert alert-danger">
      <i class="fa fa-exclamation-circle me-2"></i> {{ errorMsg }}
    </div>

    <!-- Loading State -->
    <div v-else-if="!order" class="text-center py-5 text-muted">
      <i class="fa fa-circle-notch fa-spin fs-1 mb-3"></i>
      <p>Fetching clinical lab order details...</p>
    </div>

    <div v-else class="row">
      <!-- Left: Patient Details & Investigation form -->
      <div class="col-lg-8">
        <!-- Patient Details Block -->
        <BaseBlock class="shadow-sm border border-light mb-4 bg-white">
          <div class="block-content block-content-full bg-body-light py-3 px-4 rounded-top">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <span class="badge bg-primary px-2 py-1 rounded font-monospace me-2">{{ order.lab_number }}</span>
                <span class="fs-sm text-muted">Ordered on {{ order.date }}</span>
              </div>
              <div class="d-flex gap-2">
                <span v-if="order.status === 'paid'" class="badge bg-success">Ready for Testing</span>
                <span v-else-if="order.status === 'pending_payment'" class="badge bg-warning">Awaiting Payment</span>
                <span v-else class="badge bg-secondary">Completed</span>
              </div>
            </div>
          </div>
          
          <div class="block-content">
            <div class="row py-3">
              <div class="col-sm-6 col-md-3 mb-3 mb-md-0">
                <div class="fs-xs text-muted mb-1 text-uppercase">Patient Name</div>
                <div class="fw-bold text-dark fs-sm">{{ order.patient_name }}</div>
              </div>
              <div class="col-sm-6 col-md-3 mb-3 mb-md-0">
                <div class="fs-xs text-muted mb-1 text-uppercase">MRN Number</div>
                <div class="fw-bold text-dark fs-sm font-monospace">{{ order.mrn }}</div>
              </div>
              <div class="col-sm-6 col-md-3 mb-3 mb-md-0">
                <div class="fs-xs text-muted mb-1 text-uppercase">Demographics</div>
                <div class="fw-bold text-dark fs-sm">{{ order.gender }}, {{ order.age }}</div>
              </div>
              <div class="col-sm-6 col-md-3">
                <div class="fs-xs text-muted mb-1 text-uppercase">Requesting Doctor</div>
                <div class="fw-bold text-dark fs-sm">{{ order.doctor_name }}</div>
              </div>
            </div>
          </div>
        </BaseBlock>

        <!-- Test items List and Result entry form -->
        <BaseBlock class="shadow-sm border border-light bg-white">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Requested Investigation Items</h3>
          </template>

          <div class="block-content block-content-full">
            <div v-for="item in order.items" :key="item.id" class="p-3 border rounded mb-3 bg-body-extra-light">
              <div class="row align-items-center">
                <!-- Test name and reagents -->
                <div class="col-md-5 mb-3 mb-md-0">
                  <div class="d-flex align-items-center">
                    <div class="item item-circle bg-primary-light text-primary me-3 flex-shrink-0" style="width: 40px; height: 40px;">
                      <i class="fa fa-vial"></i>
                    </div>
                    <div>
                      <h5 class="fs-sm fw-bold text-dark mb-1">{{ item.test_name }}</h5>
                      <div class="fs-xs text-muted" v-if="item.reagent_id">
                        <strong>Reagent:</strong> {{ getReagentInfo(item.reagent_id).name }} | 
                        <strong>Stock:</strong> {{ getReagentInfo(item.reagent_id).qty }} tests
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Reference Range info -->
                <div class="col-md-3 mb-3 mb-md-0">
                  <div class="fs-xs text-muted mb-1">Reference range</div>
                  <div class="fw-bold text-dark fs-sm">{{ item.ref_range }}</div>
                  <div class="fs-xs text-muted" v-if="item.unit">Unit: {{ item.unit }}</div>
                </div>

                <!-- Result input and range flagging -->
                <div class="col-md-4">
                  <div class="d-flex align-items-center gap-2">
                    <div class="flex-grow-1">
                      <div class="fs-xs text-muted mb-1">Result value</div>
                      <input
                        v-model="resultValues[item.id]"
                        type="text"
                        class="form-control form-control-sm text-center font-monospace"
                        placeholder="Enter value..."
                        :disabled="order.status !== 'paid' || isSaving"
                      />
                    </div>
                    
                    <!-- Flag badge -->
                    <div class="flex-shrink-0 text-center" style="width: 70px; margin-top: 14px;">
                      <span v-if="checkReferenceRange(item.test_name, resultValues[item.id]) === 'HIGH'" class="badge bg-danger">HIGH</span>
                      <span v-else-if="checkReferenceRange(item.test_name, resultValues[item.id]) === 'LOW'" class="badge bg-primary">LOW</span>
                      <span v-else-if="checkReferenceRange(item.test_name, resultValues[item.id]) === 'NORMAL'" class="badge bg-success">NORMAL</span>
                      <span v-else class="text-muted fs-xs">-</span>
                    </div>
                  </div>

                  <!-- Out of reagent stock alert -->
                  <div class="mt-2 text-danger fs-xs" v-if="!isReagentAvailable(item)">
                    <i class="fa fa-exclamation-triangle me-1"></i> Reagent out of stock!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Right: Workspace Action & Remarks -->
      <div class="col-lg-4">
        <BaseBlock class="shadow-sm border border-light bg-white h-100 d-flex flex-column justify-content-between">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Laboratory Remarks</h3>
          </template>

          <div class="block-content flex-grow-1">
            <div class="mb-4">
              <label class="form-label fs-sm fw-bold mb-2">Technician Notes / Remarks</label>
              <textarea
                v-model="remarks"
                class="form-control"
                rows="8"
                placeholder="Enter summary or remarks concerning test findings..."
                :disabled="order.status !== 'paid' || isSaving"
              ></textarea>
            </div>

            <div class="border-top py-3 mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fs-xs text-muted">Investigation Charge</span>
                <span class="fs-xs fw-bold font-monospace text-dark">
                  KES {{ order.items.reduce((sum, i) => sum + i.cost, 0).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>

          <div class="block-content block-content-full bg-body-light rounded-bottom p-3">
            <div class="d-flex flex-column gap-2">
              <button
                v-if="order.status === 'paid'"
                type="button"
                class="btn btn-success btn-lg fs-sm fw-bold w-100"
                :disabled="isSaving || hasFormErrors"
                @click="handleSubmit"
              >
                <span v-if="isSaving">
                  <i class="fa fa-circle-notch fa-spin me-1"></i> Submitting...
                </span>
                <span v-else>
                  <i class="fa fa-check me-1"></i> Verify & Submit
                </span>
              </button>
              
              <button
                type="button"
                class="btn btn-alt-secondary w-100"
                @click="router.push({ name: 'laboratory/worklist' })"
              >
                Cancel / Return
              </button>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-primary-light { background-color: rgba(14, 130, 253, 0.1) !important; }
.bg-success-light { background-color: rgba(40, 167, 69, 0.1) !important; }
</style>
