<script setup>
import { onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { usePharmacyStore } from "../../stores/pharmacyStore";
import { useRouter } from "vue-router";

const store = usePharmacyStore();
const router = useRouter();

onMounted(async () => {
  await store.fetchMedicines();
  await store.fetchPrescriptions();
});

function navigateTo(routeName) {
  router.push({ name: routeName });
}
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2 text-center text-sm-start">
      <div class="flex-grow-1">
        <h1 class="h3 fw-bold mb-2">Pharmacy Dashboard</h1>
        <h2 class="h6 fw-medium text-muted asc mb-0">Overview of dispensing queue and medicine inventory.</h2>
      </div>
      <div class="mt-3 mt-sm-0 ms-sm-3 d-flex gap-2">
        <button type="button" class="btn btn-primary d-flex align-items-center gap-2" @click="navigateTo('pharmacy/dispensing')">
          <i class="fa fa-file-prescription"></i> Dispensing Desk
        </button>
        <button type="button" class="btn btn-alt-primary d-flex align-items-center gap-2" @click="navigateTo('pharmacy/inventory/receive')">
          <i class="fa fa-plus"></i> Receive Stock
        </button>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="row mt-4">
      <!-- Stat 1: Ready to Dispense -->
      <div class="col-6 col-xl-3">
        <BaseBlock class="shadow-sm border border-light text-center h-100 bg-white">
          <div class="block-content block-content-full">
            <div class="item item-circle bg-success-light mx-auto mb-3">
              <i class="fa fa-file-prescription text-success fs-3"></i>
            </div>
            <div class="fs-2 fw-bold text-dark">{{ store.readyToDispenseQueue.length }}</div>
            <div class="fs-sm fw-semibold text-muted text-uppercase">Ready to Dispense</div>
          </div>
        </BaseBlock>
      </div>

      <!-- Stat 2: Low Stock Warnings -->
      <div class="col-6 col-xl-3">
        <BaseBlock class="shadow-sm border border-light text-center h-100 bg-white">
          <div class="block-content block-content-full">
            <div class="item item-circle bg-danger-light mx-auto mb-3">
              <i class="fa fa-boxes-stacked text-danger fs-3"></i>
            </div>
            <div class="fs-2 fw-bold text-dark">{{ store.lowStockCount }}</div>
            <div class="fs-sm fw-semibold text-muted text-uppercase">Low Stock Alert</div>
          </div>
        </BaseBlock>
      </div>

      <!-- Stat 3: Expiring Soon -->
      <div class="col-6 col-xl-3">
        <BaseBlock class="shadow-sm border border-light text-center h-100 bg-white">
          <div class="block-content block-content-full">
            <div class="item item-circle bg-warning-light mx-auto mb-3">
              <i class="fa fa-calendar-xmark text-warning fs-3"></i>
            </div>
            <div class="fs-2 fw-bold text-dark">{{ store.expiringCount }}</div>
            <div class="fs-sm fw-semibold text-muted text-uppercase">Expiring soon</div>
          </div>
        </BaseBlock>
      </div>

      <!-- Stat 4: Total Medicines -->
      <div class="col-6 col-xl-3">
        <BaseBlock class="shadow-sm border border-light text-center h-100 bg-white">
          <div class="block-content block-content-full">
            <div class="item item-circle bg-info-light mx-auto mb-3">
              <i class="fa fa-prescription-bottle text-info fs-3"></i>
            </div>
            <div class="fs-2 fw-bold text-dark">{{ store.medicines.length }}</div>
            <div class="fs-sm fw-semibold text-muted text-uppercase">Total Medicines</div>
          </div>
        </BaseBlock>
      </div>
    </div>

    <!-- Alert / Action Areas -->
    <div class="row mt-2">
      <!-- Left: Ready Dispensing Queue -->
      <div class="col-xl-6">
        <BaseBlock class="shadow-sm border border-light h-100 bg-white">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Active Dispensing Queue</h3>
          </template>
          <template #options>
            <span class="badge bg-success-light text-success fw-bold">{{ store.readyToDispenseQueue.length }} Patients</span>
          </template>

          <div class="block-content block-content-full p-0">
            <div v-if="store.readyToDispenseQueue.length === 0" class="text-center py-5 text-muted">
              <i class="fa fa-circle-check fs-1 text-success mb-3"></i>
              <p class="mb-0">Dispensing queue is currently clear.</p>
            </div>
            <div v-else class="table-responsive">
              <table class="table table-vcenter table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th>Patient Details</th>
                    <th>Prescription No</th>
                    <th>Doctor</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rx in store.readyToDispenseQueue.slice(0, 5)" :key="rx.id">
                    <td>
                      <div class="fw-bold text-dark">{{ rx.patient_name }}</div>
                      <div class="fs-xs text-muted">{{ rx.mrn }} ({{ rx.gender }}, {{ rx.age }})</div>
                    </td>
                    <td class="fs-sm font-monospace">{{ rx.prescription_number }}</td>
                    <td class="fs-sm">{{ rx.doctor_name }}</td>
                    <td class="text-center">
                      <button type="button" class="btn btn-sm btn-alt-success" @click="router.push({ name: 'pharmacy/dispensing/workspace', params: { prescriptionId: rx.id } })">
                        <i class="fa fa-capsules"></i> Dispense
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Right: Stock Alerts -->
      <div class="col-xl-6">
        <BaseBlock class="shadow-sm border border-light h-100 bg-white">
          <template #title>
            <h3 class="block-title fw-bold text-dark fs-5">Critical Stock Alerts</h3>
          </template>
          <template #options>
            <span class="badge bg-danger-light text-danger fw-bold">Stock Actions Needed</span>
          </template>

          <div class="block-content block-content-full p-0">
            <div class="table-responsive">
              <table class="table table-vcenter table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th>Drug / Item</th>
                    <th>Status</th>
                    <th class="text-end">Current Stock</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="med in store.medicines.filter(m => m.qty <= m.min_threshold || new Date(m.expiry_date) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).slice(0, 5)" :key="med.id">
                    <td>
                      <div class="fw-bold text-dark">{{ med.brand_name }} ({{ med.generic_name }})</div>
                      <div class="fs-xs text-muted">{{ med.strength }} {{ med.dosage_form }}</div>
                    </td>
                    <td>
                      <span v-if="med.qty === 0" class="badge bg-danger">Out of Stock</span>
                      <span v-else-if="med.qty <= med.min_threshold" class="badge bg-warning">Low Stock</span>
                      <span v-if="new Date(med.expiry_date) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)" class="badge bg-danger ms-1">Expiring</span>
                    </td>
                    <td class="text-end fw-semibold font-monospace">{{ med.qty }} units</td>
                    <td class="text-center">
                      <button type="button" class="btn btn-sm btn-alt-primary" @click="navigateTo('pharmacy/inventory/receive')">
                        <i class="fa fa-truck-ramp-box"></i> Restock
                      </button>
                    </td>
                  </tr>
                  <tr v-if="store.medicines.filter(m => m.qty <= m.min_threshold).length === 0">
                    <td colspan="4" class="text-center py-5 text-muted">
                      <i class="fa fa-circle-check fs-1 text-success mb-3"></i>
                      <p class="mb-0">All items are sufficiently stocked.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-success-light { background-color: rgba(40, 167, 69, 0.12) !important; }
.bg-danger-light { background-color: rgba(220, 53, 69, 0.12) !important; }
.bg-warning-light { background-color: rgba(255, 193, 7, 0.12) !important; }
.bg-info-light { background-color: rgba(23, 162, 184, 0.12) !important; }
</style>
