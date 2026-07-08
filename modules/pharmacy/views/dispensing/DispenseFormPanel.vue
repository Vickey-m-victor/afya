<script setup>
import { ref, onMounted, computed } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { usePharmacyStore } from "../../stores/pharmacyStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const props = defineProps({
  prescriptionId: {
    type: [String, Number],
    required: true
  }
});

const store = usePharmacyStore();
const router = useRouter();

const rx = ref(null);
const dispensedQuantities = ref({}); // Maps rxItem.id -> number
const isSaving = ref(false);
const errorMsg = ref("");

onMounted(async () => {
  await store.fetchMedicines();
  const foundRx = await store.fetchPrescriptionById(props.prescriptionId);
  if (foundRx) {
    rx.value = JSON.parse(JSON.stringify(foundRx)); // Deep clone so we can modify locally if needed
    // Initialize default dispensed quantities to prescribed quantities
    rx.value.items.forEach(item => {
      dispensedQuantities.value[item.id] = rx.value.status === "dispensed" ? item.dispensed_qty : item.prescribed_qty;
    });
  } else {
    errorMsg.value = "Prescription not found.";
  }
});

// Helper to find stock info for a medicine
function getStockInfo(medicineId) {
  return store.medicines.find(m => m.id === medicineId) || { qty: 0, brand_name: "Unknown", expiry_date: "" };
}

// Calculate total cost
const totalCost = computed(() => {
  if (!rx.value) return 0;
  return rx.value.items.reduce((sum, item) => {
    const med = getStockInfo(item.medicine_id);
    return sum + (med.unit_price * (dispensedQuantities.value[item.id] || 0));
  }, 0);
});

// Validate if dispensing is safe (dispensed qty <= stock qty)
function isQuantityValid(item) {
  if (rx.value.status === "dispensed") return true;
  const med = getStockInfo(item.medicine_id);
  const qtyToDispense = parseInt(dispensedQuantities.value[item.id] || 0, 10);
  return qtyToDispense <= med.qty && qtyToDispense >= 0;
}

// Check if any warnings/errors exist
const hasFormErrors = computed(() => {
  if (!rx.value) return true;
  return rx.value.items.some(item => !isQuantityValid(item));
});

// Handle dispensing completion
async function handleDispense() {
  if (hasFormErrors.value) {
    Swal.fire({
      icon: "error",
      title: "Stock Exceeded",
      text: "One or more items exceed current inventory. Please adjust quantities."
    });
    return;
  }

  const result = await Swal.fire({
    title: "Confirm Dispensation",
    text: "This will decrement stock levels and mark the prescription as dispensed.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirm & Dispense",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  isSaving.value = true;
  try {
    const payload = rx.value.items.map(item => ({
      id: item.id,
      dispensed_qty: parseInt(dispensedQuantities.value[item.id], 10)
    }));

    await store.dispensePrescription(props.prescriptionId, payload);

    await Swal.fire({
      icon: "success",
      title: "Dispensed Successfully",
      text: "The patient's prescription has been fulfilled.",
      timer: 1500,
      showConfirmButton: false
    });

    router.push({ name: "pharmacy/dispensing" });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Fulfillment Failed",
      text: err.message || "An error occurred while dispensing."
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
        <h1 class="h3 fw-bold mb-1">Dispensing Workspace</h1>
        <div class="text-muted fs-sm">Clinical Prescription Fulfill Panel</div>
      </div>
      <button type="button" class="btn btn-alt-secondary btn-sm" @click="router.push({ name: 'pharmacy/dispensing' })">
        <i class="fa fa-arrow-left me-1"></i> Back to Queue
      </button>
    </div>

    <!-- Error State -->
    <div v-if="errorMsg" class="alert alert-danger">
      <i class="fa fa-exclamation-circle me-2"></i> {{ errorMsg }}
    </div>

    <!-- Loading State -->
    <div v-else-if="!rx" class="text-center py-5 text-muted">
      <i class="fa fa-circle-notch fa-spin fs-1 mb-3"></i>
      <p>Fetching patient prescription details...</p>
    </div>

    <div v-else class="row">
      <!-- Left: Prescription Items and Details -->
      <div class="col-lg-8">
        <!-- Patient Details Block -->
        <BaseBlock class="shadow-sm border border-light mb-4 bg-white">
          <div class="block-content block-content-full bg-body-light py-3 px-4 rounded-top">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <span class="badge bg-primary px-2 py-1 rounded font-monospace me-2">{{ rx.prescription_number }}</span>
                <span class="fs-sm text-muted">Prescribed on {{ rx.date }}</span>
              </div>
              <div class="d-flex gap-2">
                <span v-if="rx.status === 'paid'" class="badge bg-success">Ready to Dispense</span>
                <span v-else-if="rx.status === 'pending_payment'" class="badge bg-warning">Awaiting Payment</span>
                <span v-else class="badge bg-secondary">Dispensed</span>
              </div>
            </div>
          </div>
          
          <div class="block-content">
            <div class="row py-3">
              <div class="col-sm-6 col-md-3 mb-3 mb-md-0">
                <div class="fs-xs text-muted mb-1 text-uppercase">Patient Name</div>
                <div class="fw-bold text-dark fs-sm">{{ rx.patient_name }}</div>
              </div>
              <div class="col-sm-6 col-md-3 mb-3 mb-md-0">
                <div class="fs-xs text-muted mb-1 text-uppercase">MRN Number</div>
                <div class="fw-bold text-dark fs-sm font-monospace">{{ rx.mrn }}</div>
              </div>
              <div class="col-sm-6 col-md-3 mb-3 mb-md-0">
                <div class="fs-xs text-muted mb-1 text-uppercase">Demographics</div>
                <div class="fw-bold text-dark fs-sm">{{ rx.gender }}, {{ rx.age }}</div>
              </div>
              <div class="col-sm-6 col-md-3">
                <div class="fs-xs text-muted mb-1 text-uppercase">Doctor / Officer</div>
                <div class="fw-bold text-dark fs-sm">{{ rx.doctor_name }}</div>
              </div>
            </div>
          </div>
        </BaseBlock>

        <!-- Prescription Items List -->
        <BaseBlock class="shadow-sm border border-light bg-white">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Prescribed Medicines</h3>
          </template>

          <div class="block-content block-content-full">
            <div v-for="(item, index) in rx.items" :key="item.id" class="p-3 border rounded mb-3 bg-body-extra-light">
              <div class="row align-items-center">
                <!-- Drug description -->
                <div class="col-md-5 mb-3 mb-md-0">
                  <div class="d-flex align-items-center">
                    <div class="item item-circle bg-primary-light text-primary me-3 flex-shrink-0" style="width: 40px; height: 40px;">
                      <i class="fa fa-pills"></i>
                    </div>
                    <div>
                      <h5 class="fs-sm fw-bold text-dark mb-1">{{ item.brand_name }} ({{ item.generic_name }})</h5>
                      <div class="fs-xs text-muted">
                        {{ item.strength }} {{ item.dosage_form }} | 
                        <strong>Dosage:</strong> {{ item.dosage }} for {{ item.duration }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Stock info -->
                <div class="col-md-3 mb-3 mb-md-0">
                  <div class="fs-xs text-muted mb-1">Inventory Stock</div>
                  <div class="d-flex align-items-center gap-2">
                    <span class="fw-bold font-monospace text-dark">{{ getStockInfo(item.medicine_id).qty }}</span>
                    <span v-if="getStockInfo(item.medicine_id).qty === 0" class="badge bg-danger">Out of stock</span>
                    <span v-else-if="getStockInfo(item.medicine_id).qty <= getStockInfo(item.medicine_id).min_threshold" class="badge bg-warning">Low stock</span>
                    <span v-else class="badge bg-success-light text-success">Available</span>
                  </div>
                  <div class="fs-xs text-muted mt-1" v-if="getStockInfo(item.medicine_id).expiry_date">
                    Exp: {{ getStockInfo(item.medicine_id).expiry_date }}
                  </div>
                </div>

                <!-- Quantities & Input -->
                <div class="col-md-4">
                  <div class="row g-2 align-items-center">
                    <div class="col-6 text-center">
                      <div class="fs-xs text-muted mb-1">Prescribed Qty</div>
                      <div class="fw-bold fs-6 font-monospace text-dark">{{ item.prescribed_qty }}</div>
                    </div>
                    <div class="col-6">
                      <div class="fs-xs text-muted mb-1">Dispensing Qty</div>
                      <input
                        v-model.number="dispensedQuantities[item.id]"
                        type="number"
                        class="form-control form-control-sm text-center font-monospace"
                        :class="{ 'is-invalid': !isQuantityValid(item) }"
                        :disabled="rx.status !== 'paid' || isSaving"
                        min="0"
                      />
                      <div class="invalid-feedback fs-xs" v-if="!isQuantityValid(item)">
                        Exceeds stock!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Right: Summary & Action Panel -->
      <div class="col-lg-4">
        <!-- Summary block -->
        <BaseBlock class="shadow-sm border border-light bg-white h-100 d-flex flex-column justify-content-between">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Dispensation Summary</h3>
          </template>

          <div class="block-content flex-grow-1">
            <div class="mb-4">
              <div class="fs-xs text-muted mb-1 text-uppercase">Payment Billing Status</div>
              <div class="d-flex align-items-center gap-2">
                <span v-if="rx.status === 'paid' || rx.status === 'dispensed'" class="text-success fw-bold">
                  <i class="fa fa-circle-check me-1"></i> Paid in Full
                </span>
                <span v-else class="text-warning fw-bold">
                  <i class="fa fa-circle-exclamation me-1"></i> Awaiting Payment
                </span>
              </div>
            </div>

            <div class="border-top border-bottom py-3 mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2" v-for="item in rx.items" :key="item.id">
                <span class="fs-xs text-muted">{{ item.brand_name }} (x{{ dispensedQuantities[item.id] || 0 }})</span>
                <span class="fs-xs fw-bold font-monospace text-dark">
                  KES {{ (getStockInfo(item.medicine_id).unit_price * (dispensedQuantities[item.id] || 0)).toFixed(2) }}
                </span>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="fw-bold text-dark">Total Prescription Cost:</span>
              <span class="fs-4 fw-bold font-monospace text-primary">KES {{ totalCost.toFixed(2) }}</span>
            </div>
          </div>

          <div class="block-content block-content-full bg-body-light rounded-bottom p-3">
            <div class="d-flex flex-column gap-2">
              <!-- Dispense complete -->
              <button
                v-if="rx.status === 'paid'"
                type="button"
                class="btn btn-success btn-lg fs-sm fw-bold w-100"
                :disabled="isSaving || hasFormErrors"
                @click="handleDispense"
              >
                <span v-if="isSaving">
                  <i class="fa fa-circle-notch fa-spin me-1"></i> Dispensing...
                </span>
                <span v-else>
                  <i class="fa fa-check me-1"></i> Dispense & Fulfill
                </span>
              </button>
              
              <!-- Back button -->
              <button
                type="button"
                class="btn btn-alt-secondary w-100"
                @click="router.push({ name: 'pharmacy/dispensing' })"
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
