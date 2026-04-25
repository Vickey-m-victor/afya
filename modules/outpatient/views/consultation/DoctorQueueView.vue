<script setup>
import { onMounted, ref } from "vue";
import { useOutpatientContextStore } from "../../stores/outpatientContext";
import { useConsultationQueueStore } from "../../stores/consultationQueueStore";
import { useConsultationService } from "../../services/consultationService";
import PriorityBadge from "../../components/shared/PriorityBadge.vue";
import QueueStatusBadge from "../../components/shared/QueueStatusBadge.vue";
import ConsultationFormPanel from "./ConsultationFormPanel.vue";
import ConsultationSummaryPanel from "./ConsultationSummaryPanel.vue";

const ctx = useOutpatientContextStore();
const store = useConsultationQueueStore();
const api = useConsultationService();

const FACILITY_ID = 1;
const selectedPatient = ref(null);
const consultationStarted = ref(false);
const isLoading = ref(false);
const statusText = ref("Ready for next patient");
const statusIcon = ref("fa-info-circle");

async function refresh() {
  ctx.setFacilityId(FACILITY_ID);
  await store.fetchQueue({ facility_id: FACILITY_ID });
}

function selectPatient(item) {
  selectedPatient.value = item;
  consultationStarted.value = false;
  statusText.value = "Patient selected — ready to start";
  statusIcon.value = "fa-user-check";
}

async function nextPatient() {
  isLoading.value = true;
  try {
    const res = await api.nextPatient({ facility_id: FACILITY_ID });
    if (res.error?.value) return;
    
    // Backend assigns and starts service
    const queueId =
      res.data?.value?.dataPayload?.queue_id ??
      res.data?.value?.payload?.queue_id ??
      res.data?.value?.queue_id;
      
    if (queueId) {
      await refresh();
      const patient = store.items.find(q => q.queue_id === queueId);
      if (patient) {
        selectPatient(patient);
        consultationStarted.value = true; // Auto-start since backend did
        statusText.value = "Consultation in progress";
        statusIcon.value = "fa-stethoscope";
      }
    } else {
      await refresh();
    }
  } finally {
    isLoading.value = false;
  }
}

async function startConsultation() {
  if (!selectedPatient.value) return;
  isLoading.value = true;
  try {
    const res = await api.start({ queueId: selectedPatient.value.queue_id });
    if (res.error?.value) throw res.error.value;
    
    consultationStarted.value = true;
    statusText.value = "Consultation in progress";
    statusIcon.value = "fa-stethoscope";
    
    // Merge new patient details
    const payload = res.data?.value?.payload || res.data?.value?.dataPayload || res.data?.value;
    if (payload?.patient) {
       selectedPatient.value = { ...selectedPatient.value, patient: payload.patient };
    }
    await refresh();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

function onConsultationComplete() {
  statusText.value = "Consultation complete — patient routed";
  statusIcon.value = "fa-check-circle";
  selectedPatient.value = null;
  consultationStarted.value = false;
  refresh();
}

onMounted(refresh);
</script>

<template>
  <div class="content content-full" style="max-width: 1800px; margin: 0 auto;">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
      <div>
        <h2 class="h3 fw-bold mb-1">
          <i class="fa fa-user-doctor me-2 text-primary"></i>Doctor's Console
        </h2>
        <div class="text-muted fs-sm">Outpatient Consultation Workspace</div>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <RouterLink class="btn btn-alt-secondary btn-sm" to="/outpatient/triage/queue">
          <i class="fa fa-arrow-left me-1"></i> Triage
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
              <i class="fa fa-list-ol me-1"></i> Doctor Queue
            </h3>
          </div>
          <div class="block-content p-2 flex-grow-1" style="max-height: 750px; overflow-y: auto">
            <div v-if="store.isLoading" class="text-center py-4 text-muted">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div v-else-if="!store.items.length" class="text-center py-4 text-muted fs-sm">
              No patients waiting
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
                <span v-if="item.status === 'in_consultation'" class="badge bg-primary-light text-primary"><i class="fa fa-stethoscope"></i> In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. FORM PANEL -->
      <div style="flex: 1.8; min-width: 450px" class="d-flex flex-column">
        <ConsultationFormPanel
          :patient="selectedPatient"
          :started="consultationStarted"
          @complete="onConsultationComplete"
          class="h-100 shadow-sm"
        />
      </div>

      <!-- 3. SUMMARY PANEL -->
      <div style="flex: 1.2; min-width: 320px" class="d-flex flex-column">
        <ConsultationSummaryPanel :patient="selectedPatient" class="h-100 shadow-sm" />
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
                class="btn btn-info btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="isLoading || store.isLoading"
                @click="nextPatient"
              >
                <i class="fa fa-forward me-2"></i> Next Patient
              </button>
              <button
                class="btn btn-success btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="!selectedPatient || isLoading || consultationStarted"
                @click="startConsultation"
              >
                <i class="fa fa-play me-2"></i> Start Consultation
              </button>
              <button
                class="btn btn-danger btn-lg fs-sm fw-semibold text-start px-4 rounded-pill"
                :disabled="!selectedPatient || !consultationStarted || isLoading"
                @click="() => {
                  const evt = new CustomEvent('consultation-complete-trigger');
                  window.dispatchEvent(evt);
                }"
              >
                <i class="fa fa-check-circle me-2"></i> Complete
              </button>
            </div>

            <!-- Status Card -->
            <div class="mt-auto p-3 rounded-3 text-center fs-sm fw-medium border"
                 :class="consultationStarted ? 'bg-success-light border-success-light text-success' : 'bg-body-light border-light text-muted'">
              <i class="fa me-1" :class="statusIcon"></i>
              {{ statusText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
