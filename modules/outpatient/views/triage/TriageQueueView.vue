<script setup>
import { onMounted, ref } from "vue";
import { useOutpatientContextStore } from "../../stores/outpatientContext";
import { useTriageQueueStore } from "../../stores/triageQueueStore";
import { useTriageService } from "../../services/triageService";
import PriorityBadge from "../../components/shared/PriorityBadge.vue";
import QueueStatusBadge from "../../components/shared/QueueStatusBadge.vue";
import TriageFormPanel from "./TriageFormPanel.vue";
import TriageSummaryPanel from "./TriageSummaryPanel.vue";

const ctx = useOutpatientContextStore();
const store = useTriageQueueStore();
const api = useTriageService();

const FACILITY_ID = 1;
const selectedPatient = ref(null);
const triageStarted = ref(false);
const isLoading = ref(false);
const statusText = ref("Ready to triage");
const statusIcon = ref("fa-info-circle");

async function refresh() {
  ctx.setFacilityId(FACILITY_ID);
  await store.fetchQueue({ facility_id: FACILITY_ID });
}

function selectPatient(item) {
  selectedPatient.value = item;
  triageStarted.value = false;
  statusText.value = "Patient selected — call when ready";
  statusIcon.value = "fa-user-check";
}

async function callPatient() {
  if (!selectedPatient.value) return;
  isLoading.value = true;
  try {
    await api.callPatient(selectedPatient.value.queue_id);
    statusText.value = "Patient called — awaiting arrival";
    statusIcon.value = "fa-bell";
    await refresh();
  } finally {
    isLoading.value = false;
  }
}

async function startTriage() {
  if (!selectedPatient.value) return;
  isLoading.value = true;
  try {
    await api.startTriage(selectedPatient.value.queue_id);
    triageStarted.value = true;
    statusText.value = "Triage in progress — complete assessment";
    statusIcon.value = "fa-stethoscope";
    await refresh();
  } finally {
    isLoading.value = false;
  }
}

async function emergencyBypass() {
  if (!selectedPatient.value) return;
  if (!confirm("Send this patient to Emergency immediately?")) return;
  isLoading.value = true;
  try {
    await api.emergencyBypass(selectedPatient.value.queue_id);
    statusText.value = "Emergency bypass activated";
    statusIcon.value = "fa-ambulance";
    selectedPatient.value = null;
    triageStarted.value = false;
    await refresh();
  } finally {
    isLoading.value = false;
  }
}

function emitQueueEvent(eventName) {
  window.dispatchEvent(new globalThis.CustomEvent(eventName));
}

function onTriageComplete() {
  statusText.value = "Triage complete — patient queued for doctor";
  statusIcon.value = "fa-check-circle";
  selectedPatient.value = null;
  triageStarted.value = false;
  refresh();
}

function onOrdersSubmitted() {
  statusText.value = "Orders initiated — lab & radiology notified";
  statusIcon.value = "fa-file-prescription";
}

onMounted(refresh);
</script>

<template>
  <div class="content content-full" style="max-width: 1800px; margin: 0 auto;">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
      <div>
        <h2 class="h3 fw-bold mb-1">
          <i class="fa fa-clinic-medical me-2 text-primary"></i>Triage Console
        </h2>
        <div class="text-muted fs-sm">Outpatient Triage · Nurse Station</div>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <RouterLink class="btn btn-alt-secondary btn-sm" to="/outpatient/registration">
          <i class="fa fa-arrow-left me-1"></i> Registration
        </RouterLink>
        <button class="btn btn-alt-primary btn-sm" type="button" @click="refresh" :disabled="store.isLoading">
          <i class="fa fa-rotate me-1"></i> Refresh
        </button>
      </div>
    </div>

    <!-- 4-Panel Layout -->
    <div class="d-flex flex-column flex-xl-row gap-3">
      <!-- 1. QUEUE PANEL -->
      <div style="flex: 1; min-width: 280px" class="d-flex flex-column">
        <div class="block block-rounded block-bordered d-flex flex-column h-100 mb-0 shadow-sm">
          <div class="block-header block-header-default" style="background: linear-gradient(135deg, #1e8f5e, #166b48)">
            <h3 class="block-title text-white fw-semibold">
              <i class="fa fa-list-ol me-1"></i> Triage Queue
            </h3>
          </div>
          <div class="block-content p-2 flex-grow-1" style="max-height: 650px; overflow-y: auto">
            <div v-if="store.isLoading" class="text-center py-4 text-muted">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div v-else-if="!store.items.length" class="text-center py-4 text-muted fs-sm">
              No patients in queue
            </div>
            <div
              v-for="item in store.items"
              :key="item.queue_id"
              class="p-3 mb-2 rounded border"
              :class="selectedPatient?.queue_id === item.queue_id ? 'border-success bg-success-light' : 'bg-body-extra-light'"
              style="cursor: pointer; transition: all 0.2s;"
              @click="selectPatient(item)"
              @mouseenter="e => !selectedPatient?.queue_id === item.queue_id && (e.currentTarget.style.transform = 'translateX(4px)')"
              @mouseleave="e => (e.currentTarget.style.transform = 'translateX(0)')"
            >
              <div class="fw-bold fs-5" style="color: #1e8f5e">{{ item.token_number || `#${item.queue_id}` }}</div>
              <div class="fw-semibold">{{ item.patient_name || "Patient" }}</div>
              <div class="d-flex flex-wrap gap-2 mt-2 align-items-center">
                <PriorityBadge v-if="item.priority != null" :priority="item.priority" />
                <span class="text-muted fs-xs fw-medium"><i class="fa fa-clock me-1"></i>{{ item.wait_minutes || 0 }} min</span>
                <span v-if="item.called" class="badge bg-info-light text-info"><i class="fa fa-bell"></i> Called</span>
                <span v-if="item.in_service" class="badge bg-primary-light text-primary"><i class="fa fa-stethoscope"></i> In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. TRIAGE FORM PANEL -->
      <div style="flex: 1.8; min-width: 450px" class="d-flex flex-column">
        <TriageFormPanel
          :patient="selectedPatient"
          :started="triageStarted"
          @complete="onTriageComplete"
          class="h-100 shadow-sm"
        />
      </div>

      <!-- 3. PATIENT SUMMARY PANEL -->
      <div style="flex: 1.2; min-width: 320px" class="d-flex flex-column">
        <TriageSummaryPanel :patient="selectedPatient" class="h-100 shadow-sm" />
      </div>

      <!-- 4. QUICK ACTIONS PANEL -->
      <div style="flex: 0.7; min-width: 240px" class="d-flex flex-column">
        <div class="block block-rounded block-bordered h-100 mb-0 shadow-sm">
          <div class="block-header block-header-default">
            <h3 class="block-title fw-semibold"><i class="fa fa-bolt me-1 text-warning"></i> Quick Actions</h3>
          </div>
          <div class="block-content d-flex flex-column p-3">
            <div class="d-flex flex-column gap-3 mb-4">
              <button
                class="btn btn-primary btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="!selectedPatient || isLoading || selectedPatient?.status >= 20"
                @click="callPatient"
              >
                <i class="fa fa-bell me-2"></i> Call Patient
              </button>
              <button
                class="btn btn-success btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="!selectedPatient || isLoading || triageStarted"
                @click="startTriage"
              >
                <i class="fa fa-play me-2"></i> Start Triage
              </button>
              <button
                class="btn btn-warning btn-lg fs-sm fw-semibold text-start px-4 rounded-pill text-white"
                :disabled="!selectedPatient || isLoading"
                @click="emergencyBypass"
              >
                <i class="fa fa-ambulance me-2"></i> Emergency Bypass
              </button>
              <button
                class="btn btn-primary btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="!selectedPatient || !triageStarted || isLoading"
                @click="() => {
                  if ($refs.formPanel) {
                    $refs.formPanel.showOrdersPanel();
                  } else {
                    emitQueueEvent('triage-show-orders');
                  }
                }"
              >
                <i class="fa fa-file-prescription me-2"></i> Initiate Orders
              </button>
              <button
                class="btn btn-danger btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="!selectedPatient || !triageStarted || isLoading"
                @click="emitQueueEvent('triage-complete-trigger')"
              >
                <i class="fa fa-check-circle me-2"></i> Complete Assessment
              </button>
            </div>

            <!-- Status Card -->
            <div class="mt-auto p-3 rounded-3 text-center fs-sm fw-medium border"
                 :class="triageStarted ? 'bg-success-light border-success-light text-success' : 'bg-success-light border-success-light text-success'"
                 style="background-color: #f0fdf4 !important; color: #166534 !important; border-color: #dcfce7 !important;">
              <i class="fa me-1" :class="statusIcon"></i>
              {{ statusText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
