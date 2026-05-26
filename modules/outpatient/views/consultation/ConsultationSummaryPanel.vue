<script setup>
import { ref, watch } from "vue";
import { useConsultationService } from "../../services/consultationService";
import { unwrapData } from "../../services/models";

const props = defineProps({
  patient: { type: Object, default: null },
});

const api = useConsultationService();
const isLoading = ref(false);
const summary = ref(null);

watch(() => props.patient, async (p) => {
  summary.value = null;
  // Use the resolved patientId from the patient object or queue reference
  const patientId = p?.patient?.patient_id ?? p?.patient?.id ?? p?.patient_id ?? null;
  
  if (patientId) {
    isLoading.value = true;
    try {
      const res = await api.patientSummary(patientId);
      if (!res.error?.value) summary.value = unwrapData(res.data?.value);
    } finally { isLoading.value = false; }
  }
});
</script>

<template>
  <div class="block block-rounded block-bordered d-flex flex-column mb-0 shadow-sm h-100" style="overflow: hidden">
    <div class="block-header block-header-default" style="background: linear-gradient(135deg, #2c3e66, #1a2c4e)">
      <h3 class="block-title text-white fw-semibold">
        <i class="fa fa-notes-medical me-1"></i> Patient History
      </h3>
      <div class="text-white-50 fs-xs fw-medium">Clinical record review</div>
    </div>
    <div class="block-content flex-grow-1 p-3" style="max-height: 750px; overflow-y: auto; background-color: #ffffff;">

      <!-- Empty -->
      <div v-if="!patient" class="d-flex flex-column justify-content-center align-items-center h-100 text-muted" style="min-height: 400px;">
        <i class="fa fa-user-circle fa-3x mb-3 opacity-25"></i>
        <p class="fs-sm fw-medium">Select a patient to view medical history</p>
      </div>

      <!-- Loading -->
      <div v-else-if="isLoading" class="d-flex flex-column justify-content-center align-items-center h-100 text-muted" style="min-height: 400px;">
        <i class="fa fa-spinner fa-spin fa-2x mb-2"></i>
        <p class="fs-sm">Loading clinical summary...</p>
      </div>

      <!-- No data -->
      <div v-else-if="!summary" class="d-flex flex-column justify-content-center align-items-center h-100 text-muted" style="min-height: 400px;">
        <i class="fa fa-folder-open fa-3x mb-3 opacity-25"></i>
        <p class="fs-sm fw-medium">No historical data available</p>
      </div>

      <!-- Summary data -->
      <div v-else>
        <!-- Overview -->
        <div class="mb-4">
          <div class="fw-bold fs-sm mb-2 d-flex align-items-center" style="color: #1e8f5e; border-left: 3px solid #1e8f5e; padding-left: 12px;">
            <i class="fa fa-user-md me-2"></i> Patient Overview
          </div>
          <div class="p-3 rounded" style="background: #f8fafc; border: 1px solid #eef3f8; transition: all 0.2s;">
            <div class="fw-semibold" style="color: #1f3b4c; font-size: 0.9rem;">{{ summary.overview?.full_name || patient?.patient_name || "Patient" }}</div>
            <div class="mt-2" style="font-size: 0.75rem; color: #64748b;">
              <i class="fa fa-chart-line me-1"></i>
              {{ summary.overview?.visit_count || 0 }} past visits recorded
              <span v-if="summary.overview?.age"> · Age: {{ summary.overview.age }}</span>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div v-if="summary.alerts?.length" class="mb-4">
          <div class="fw-bold fs-sm mb-2 d-flex align-items-center" style="color: #ef4444; border-left: 3px solid #ef4444; padding-left: 12px;">
            <i class="fa fa-exclamation-triangle me-2"></i> Clinical Alerts
          </div>
          <div v-for="a in summary.alerts" :key="a" class="p-3 mb-2 rounded" style="background: #fef2f2; border: 1px solid #fee2e2; border-left: 3px solid #ef4444; transition: all 0.2s;">
            <div class="fw-semibold" style="color: #dc2626; font-size: 0.9rem;"><i class="fa fa-bell me-1"></i> {{ a }}</div>
          </div>
        </div>

        <!-- Past Vitals -->
        <div v-if="summary.past_vitals?.length" class="mb-4">
          <div class="fw-bold fs-sm mb-2 d-flex align-items-center" style="color: #1e8f5e; border-left: 3px solid #1e8f5e; padding-left: 12px;">
            <i class="fa fa-heartbeat me-2"></i> Recent Vital Signs
          </div>
          <div v-for="(v, i) in summary.past_vitals.slice(0, 3)" :key="i" class="p-3 mb-2 rounded" style="background: #f8fafc; border: 1px solid #eef3f8; transition: all 0.2s;">
            <div style="font-size: 0.7rem; color: #94a3b8; margin-bottom: 4px;"><i class="fa fa-calendar-alt me-1"></i> {{ v.date }}</div>
            <div class="fw-semibold" style="color: #1f3b4c; font-size: 0.9rem;">
              🌡️ Temp: {{ v.temp || '-' }}°C | 💓 HR: {{ v.hr || '-' }} | 🩸 BP: {{ v.bp || '-' }} | 💨 O₂: {{ v.o2 || '-' }}%
            </div>
            <div v-if="v.notes" class="mt-2" style="font-size: 0.75rem; color: #64748b;">📝 {{ v.notes }}</div>
          </div>
        </div>

        <!-- Diagnoses -->
        <div v-if="summary.diagnoses?.length" class="mb-4">
          <div class="fw-bold fs-sm mb-2 d-flex align-items-center" style="color: #1e8f5e; border-left: 3px solid #1e8f5e; padding-left: 12px;">
            <i class="fa fa-stethoscope me-2"></i> Active Diagnoses
          </div>
          <div v-for="(d, i) in summary.diagnoses" :key="i" class="p-3 mb-2 rounded" style="background: #f8fafc; border: 1px solid #eef3f8; transition: all 0.2s;">
            <div style="font-size: 0.7rem; color: #94a3b8; margin-bottom: 4px;">{{ d.date || '' }} {{ d.code ? `| ${d.code}` : '' }}</div>
            <div class="fw-semibold" style="color: #1f3b4c; font-size: 0.9rem;">{{ d.name || d.description || JSON.stringify(d) }}</div>
            <div v-if="d.notes" class="mt-2" style="font-size: 0.75rem; color: #64748b;">📝 {{ d.notes }}</div>
          </div>
        </div>

        <!-- Medications -->
        <div v-if="summary.medications?.length" class="mb-4">
          <div class="fw-bold fs-sm mb-2 d-flex align-items-center" style="color: #1e8f5e; border-left: 3px solid #1e8f5e; padding-left: 12px;">
            <i class="fa fa-pills me-2"></i> Current Medications
          </div>
          <div v-for="(m, i) in summary.medications" :key="i" class="p-3 mb-2 rounded" style="background: #f8fafc; border: 1px solid #eef3f8; transition: all 0.2s;">
            <div class="fw-semibold" style="color: #1f3b4c; font-size: 0.9rem;">💊 {{ m.name || JSON.stringify(m) }}</div>
            <div v-if="m.dose || m.started" class="mt-2" style="font-size: 0.75rem; color: #64748b;">
              {{ m.dose || '' }} {{ m.started ? `| Since ${m.started}` : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
