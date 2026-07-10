<script setup>
import { ref, computed, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useLaboratoryStore } from "../../stores/laboratoryStore";
import { useRouter } from "vue-router";

const store = useLaboratoryStore();
const router = useRouter();

const activeTab = ref("ready"); // ready | pending | history
const searchQuery = ref("");

onMounted(async () => {
  await store.fetchLabOrders();
});

// Computed list based on active tab and search query
const filteredQueue = computed(() => {
  let list = [];
  if (activeTab.value === "ready") {
    list = store.readyToTestQueue;
  } else if (activeTab.value === "pending") {
    list = store.pendingPaymentQueue;
  } else {
    list = store.completedQueue;
  }

  if (!searchQuery.value) return list;
  
  const query = searchQuery.value.toLowerCase();
  return list.filter(item => 
    item.patient_name.toLowerCase().includes(query) ||
    item.mrn.toLowerCase().includes(query) ||
    item.lab_number.toLowerCase().includes(query)
  );
});

function openLabWorkspace(id) {
  router.push({ name: "laboratory/worklist/workspace", params: { orderId: id } });
}

function getStatusBadge(status) {
  if (status === "paid") return "badge bg-success-light text-success";
  if (status === "pending_payment") return "badge bg-warning-light text-warning";
  return "badge bg-info-light text-info";
}

function getStatusLabel(status) {
  if (status === "paid") return "Ready for Testing";
  if (status === "pending_payment") return "Awaiting Payment";
  return "Completed";
}
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center py-2 text-center text-sm-start">
      <div class="flex-grow-1">
        <h1 class="h3 fw-bold mb-2">Laboratory Worklist Desk</h1>
        <h2 class="h6 fw-medium text-muted mb-0">Manage active clinical lab requests, process tests, and record patient results.</h2>
      </div>
      <div class="mt-3 mt-sm-0 ms-sm-3">
        <button type="button" class="btn btn-alt-secondary d-flex align-items-center gap-2" @click="store.fetchLabOrders()">
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
                  placeholder="Search patient, MRN, Lab ID..."
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
                  Ready for Testing
                  <span class="badge rounded-pill bg-success-light text-success ms-2 font-monospace">{{ store.readyToTestQueue.length }}</span>
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
                  Completed History
                  <span class="badge rounded-pill bg-info-light text-info ms-2 font-monospace">{{ store.completedQueue.length }}</span>
                </button>
              </li>
            </ul>

            <!-- Active Queue Table -->
            <div v-if="store.isLoading" class="text-center py-5 text-muted">
              <i class="fa fa-circle-notch fa-spin fs-1 mb-3"></i>
              <p>Loading laboratory queue...</p>
            </div>
            
            <div v-else-if="filteredQueue.length === 0" class="text-center py-5 text-muted">
              <i class="fa fa-inbox fs-1 mb-3"></i>
              <p class="mb-0">No lab requests found in this queue.</p>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-vcenter table-hover table-striped mb-0">
                <thead>
                  <tr>
                    <th class="ps-4">Patient Details</th>
                    <th>Lab Ref No</th>
                    <th>Requested Tests</th>
                    <th>Ordering Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th class="text-center" style="width: 150px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredQueue" :key="order.id" class="border-bottom border-light">
                    <td class="ps-4 py-3">
                      <div class="fw-bold text-dark fs-sm">{{ order.patient_name }}</div>
                      <div class="fs-xs text-muted">{{ order.mrn }} ({{ order.gender }}, {{ order.age }})</div>
                    </td>
                    <td class="font-monospace fs-sm">{{ order.lab_number }}</td>
                    <td>
                      <div v-for="item in order.items" :key="item.id" class="fs-xs text-dark fw-semibold">
                        <i class="fa fa-circle text-primary fs-xs me-1" style="font-size: 6px; vertical-align: middle;"></i>
                        {{ item.test_name }}
                        <span v-if="item.value" class="text-muted font-monospace font-normal ms-1">({{ item.value }} {{ item.unit }})</span>
                      </div>
                    </td>
                    <td class="fs-sm">{{ order.doctor_name }}</td>
                    <td class="fs-sm">{{ order.date }}</td>
                    <td>
                      <span :class="getStatusBadge(order.status)">
                        {{ getStatusLabel(order.status) }}
                      </span>
                    </td>
                    <td class="text-center py-3">
                      <!-- Perform Test Trigger -->
                      <button
                        v-if="order.status === 'paid'"
                        type="button"
                        class="btn btn-sm btn-success d-flex align-items-center gap-1 mx-auto"
                        @click="openLabWorkspace(order.id)"
                      >
                        <i class="fa fa-flask"></i> Test
                      </button>
                      <!-- View Test Details for unpaid or history -->
                      <button
                        v-else
                        type="button"
                        class="btn btn-sm btn-alt-secondary d-flex align-items-center gap-1 mx-auto"
                        @click="openLabWorkspace(order.id)"
                      >
                        <i class="fa fa-eye"></i> View Results
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
