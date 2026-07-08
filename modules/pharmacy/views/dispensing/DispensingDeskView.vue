<script setup>
import { ref, computed, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { usePharmacyStore } from "../../stores/pharmacyStore";
import { useRouter } from "vue-router";

const store = usePharmacyStore();
const router = useRouter();

const activeTab = ref("ready"); // ready | pending | history
const searchQuery = ref("");

onMounted(async () => {
  await store.fetchPrescriptions();
});

// Computed list based on active tab and search query
const filteredQueue = computed(() => {
  let list = [];
  if (activeTab.value === "ready") {
    list = store.readyToDispenseQueue;
  } else if (activeTab.value === "pending") {
    list = store.pendingPaymentQueue;
  } else {
    list = store.dispensedQueue;
  }

  if (!searchQuery.value) return list;
  
  const query = searchQuery.value.toLowerCase();
  return list.filter(item => 
    item.patient_name.toLowerCase().includes(query) ||
    item.mrn.toLowerCase().includes(query) ||
    item.prescription_number.toLowerCase().includes(query)
  );
});

function openDispenseWorkspace(id) {
  router.push({ name: "pharmacy/dispensing/workspace", params: { prescriptionId: id } });
}

function getStatusBadge(status) {
  if (status === "paid") return "badge bg-success-light text-success";
  if (status === "pending_payment") return "badge bg-warning-light text-warning";
  return "badge bg-info-light text-info";
}

function getStatusLabel(status) {
  if (status === "paid") return "Ready to Dispense";
  if (status === "pending_payment") return "Awaiting Payment";
  return "Dispensed";
}
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2 text-center text-sm-start">
      <div class="flex-grow-1">
        <h1 class="h3 fw-bold mb-2">Prescription Dispensing Desk</h1>
        <h2 class="h6 fw-medium text-muted mb-0">Fulfill doctor prescriptions and dispense medicines to patients.</h2>
      </div>
      <div class="mt-3 mt-sm-0 ms-sm-3">
        <button type="button" class="btn btn-alt-secondary d-flex align-items-center gap-2" @click="store.fetchPrescriptions()">
          <i class="fa fa-sync"></i> Refresh Queue
        </button>
      </div>
    </div>

    <!-- Active Queues -->
    <div class="row mt-4">
      <div class="col-12">
        <BaseBlock class="shadow-sm border border-light bg-white">
          <!-- Queue Filters and Tabs -->
          <template #options>
            <div class="d-flex gap-2 align-items-center w-100 flex-wrap">
              <!-- Search -->
              <div class="input-group input-group-sm" style="width: 250px;">
                <span class="input-group-text bg-body-light border-0">
                  <i class="fa fa-search text-muted"></i>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control bg-body-light border-0"
                  placeholder="Search patient, MRN, Rx..."
                />
              </div>
            </div>
          </template>

          <div class="block-content p-0">
            <!-- Tabs Menu -->
            <ul class="nav nav-tabs nav-tabs-alt px-4 border-bottom" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link fw-semibold"
                  :class="{ active: activeTab === 'ready' }"
                  @click="activeTab = 'ready'"
                  type="button"
                >
                  Ready to Dispense
                  <span class="badge rounded-pill bg-success-light text-success ms-2 font-monospace">{{ store.readyToDispenseQueue.length }}</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link fw-semibold"
                  :class="{ active: activeTab === 'pending' }"
                  @click="activeTab = 'pending'"
                  type="button"
                >
                  Pending Payment
                  <span class="badge rounded-pill bg-warning-light text-warning ms-2 font-monospace">{{ store.pendingPaymentQueue.length }}</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link fw-semibold"
                  :class="{ active: activeTab === 'history' }"
                  @click="activeTab = 'history'"
                  type="button"
                >
                  Dispensed History
                  <span class="badge rounded-pill bg-info-light text-info ms-2 font-monospace">{{ store.dispensedQueue.length }}</span>
                </button>
              </li>
            </ul>

            <!-- Active Queue Table -->
            <div v-if="store.isLoading" class="text-center py-5 text-muted">
              <i class="fa fa-circle-notch fa-spin fs-1 mb-3"></i>
              <p>Loading prescription queue...</p>
            </div>
            
            <div v-else-if="filteredQueue.length === 0" class="text-center py-5 text-muted">
              <i class="fa fa-inbox fs-1 mb-3"></i>
              <p class="mb-0">No prescriptions found in this queue.</p>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-vcenter table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th class="ps-4">Patient Details</th>
                    <th>Prescription No</th>
                    <th>Prescribing Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th class="text-center" style="width: 150px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rx in filteredQueue" :key="rx.id" class="border-bottom border-light">
                    <td class="ps-4 py-3">
                      <div class="fw-bold text-dark fs-sm">{{ rx.patient_name }}</div>
                      <div class="fs-xs text-muted">{{ rx.mrn }} ({{ rx.gender }}, {{ rx.age }})</div>
                    </td>
                    <td class="font-monospace fs-sm">{{ rx.prescription_number }}</td>
                    <td class="fs-sm">{{ rx.doctor_name }}</td>
                    <td class="fs-sm">{{ rx.date }}</td>
                    <td>
                      <span :class="getStatusBadge(rx.status)">
                        {{ getStatusLabel(rx.status) }}
                      </span>
                    </td>
                    <td class="text-center py-3">
                      <!-- Dispense Trigger -->
                      <button
                        v-if="rx.status === 'paid'"
                        type="button"
                        class="btn btn-sm btn-success d-flex align-items-center gap-1 mx-auto"
                        @click="openDispenseWorkspace(rx.id)"
                      >
                        <i class="fa fa-capsules"></i> Dispense
                      </button>
                      <!-- View Prescription Details for unpaid or history -->
                      <button
                        v-else
                        type="button"
                        class="btn btn-sm btn-alt-secondary d-flex align-items-center gap-1 mx-auto"
                        @click="openDispenseWorkspace(rx.id)"
                      >
                        <i class="fa fa-eye"></i> View Details
                      </button>
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
.bg-success-light { background-color: rgba(40, 167, 69, 0.1) !important; }
.bg-warning-light { background-color: rgba(255, 193, 7, 0.1) !important; }
.bg-info-light { background-color: rgba(23, 162, 184, 0.1) !important; }
</style>
