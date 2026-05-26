<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useConsultationService } from "../../services/consultationService";

const props = defineProps({
  patient: { type: Object, default: null },
  started: { type: Boolean, default: false },
});
const emit = defineEmits(["complete"]);
const api = useConsultationService();
const isLoading = ref(false);

const soap = ref(getDefaultSoap());
const decision = ref({ type: "discharge", orders: [], referral: null, admission: null });

function getDefaultSoap() {
  return { subjective: "", objective: "", assessment: "", plan: "" };
}

watch(() => props.patient, () => {
  soap.value = getDefaultSoap();
  decision.value = { type: "discharge", orders: [], referral: null, admission: null };
});

function setDecisionType(t) {
  decision.value.type = t;
}

async function submitConsultation() {
  if (!props.patient?.queue_id) return;
  isLoading.value = true;
  try {
    const payload = {
      ...soap.value,
      assessment: soap.value.assessment,
      diagnoses: [],
      decision: decision.value,
    };
    await api.complete(props.patient.queue_id, payload);
    emit("complete");
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  window.addEventListener('consultation-complete-trigger', submitConsultation);
});

onUnmounted(() => {
  window.removeEventListener('consultation-complete-trigger', submitConsultation);
});
</script>

<template>
  <div class="block block-rounded block-bordered d-flex flex-column mb-0 shadow-sm h-100" style="overflow: hidden">
    <div class="block-header block-header-default" style="background: linear-gradient(135deg, #2c3e66, #1a2c4e)">
      <h3 class="block-title text-white fw-semibold">
        <i class="fa fa-stethoscope me-1"></i> Doctor's Consultation
      </h3>
      <div class="text-white-50 fs-xs fw-medium">Clinical assessment & plan</div>
    </div>
    <div class="block-content flex-grow-1 p-3" style="max-height: 750px; overflow-y: auto; background-color: #ffffff;">

      <!-- Empty state -->
      <div v-if="!patient" class="d-flex flex-column justify-content-center align-items-center h-100 text-muted" style="min-height: 400px;">
        <i class="fa fa-hand-point-left fa-3x mb-3 opacity-25"></i>
        <p class="fs-sm fw-medium">Select a patient from the queue to begin consultation</p>
      </div>

      <div v-else>
        <!-- Patient Info (read-only) -->
        <div class="p-3 mb-4 rounded border" style="background: #f9fafc; border-color: #eef3f8 !important;">
          <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #1e8f5e; border-bottom: 2px solid #e0ebf3; padding-bottom: 8px;">
            <i class="fa fa-user-circle me-2"></i> Patient Information
          </div>
          <div class="row g-3">
            <div class="col-sm-6">
              <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Patient Name</label>
              <input type="text" class="form-control" :value="patient.patient_name || 'N/A'" readonly style="background: #f1f5f9; border-radius: 14px; border-color: #cbdde9;" />
            </div>
            <div class="col-sm-6">
              <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">MRN / Token</label>
              <input type="text" class="form-control" :value="`${patient.token_number || '-'} | Q${patient.queue_number || '-'}`" readonly style="background: #f1f5f9; border-radius: 14px; border-color: #cbdde9;" />
            </div>
          </div>
        </div>

        <!-- Lock warning -->
        <div v-if="!started" class="alert alert-warning fs-sm py-2 d-flex align-items-center rounded-3">
          <i class="fa fa-lock me-2"></i> Start the consultation session to enable documentation
        </div>

        <fieldset :disabled="!started">
          <!-- SOAP Note -->
          <div class="p-3 mb-4 rounded border" style="background: #f9fafc; border-color: #eef3f8 !important;">
            <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #1e8f5e; border-bottom: 2px solid #e0ebf3; padding-bottom: 8px;">
              <i class="fa fa-file-medical me-2"></i> SOAP Note
            </div>
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Subjective</label>
                <textarea v-model="soap.subjective" class="form-control" rows="3" placeholder="Patient's symptoms and history..." style="border-radius: 14px; border-color: #cbdde9;" />
              </div>
              <div class="col-12">
                <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Objective</label>
                <textarea v-model="soap.objective" class="form-control" rows="3" placeholder="Physical examination and observations..." style="border-radius: 14px; border-color: #cbdde9;" />
              </div>
              <div class="col-12">
                <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Assessment</label>
                <textarea v-model="soap.assessment" class="form-control" rows="3" placeholder="Diagnoses and clinical reasoning..." style="border-radius: 14px; border-color: #cbdde9;" />
              </div>
              <div class="col-12">
                <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Plan</label>
                <textarea v-model="soap.plan" class="form-control" rows="3" placeholder="Treatment, medications, instructions..." style="border-radius: 14px; border-color: #cbdde9;" />
              </div>
            </div>
          </div>

          <!-- Decision Routing -->
          <div class="p-3 mb-4 rounded border" style="background: #f9fafc; border-color: #eef3f8 !important;">
            <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #1e8f5e; border-bottom: 2px solid #e0ebf3; padding-bottom: 8px;">
              <i class="fa fa-route me-2"></i> Decision Routing
            </div>
            <div class="d-flex flex-wrap gap-2">
              <button
                class="btn btn-sm rounded-pill px-3"
                :class="decision.type === 'orders' ? 'btn-success' : 'btn-alt-secondary'"
                type="button"
                @click="setDecisionType('orders')"
              >
                Orders
              </button>
              <button
                class="btn btn-sm rounded-pill px-3"
                :class="decision.type === 'admit' ? 'btn-success' : 'btn-alt-secondary'"
                type="button"
                @click="setDecisionType('admit')"
              >
                Admit
              </button>
              <button
                class="btn btn-sm rounded-pill px-3"
                :class="decision.type === 'refer' ? 'btn-success' : 'btn-alt-secondary'"
                type="button"
                @click="setDecisionType('refer')"
              >
                Refer
              </button>
              <button
                class="btn btn-sm rounded-pill px-3"
                :class="decision.type === 'discharge' ? 'btn-success' : 'btn-alt-secondary'"
                type="button"
                @click="setDecisionType('discharge')"
              >
                Discharge
              </button>
              <button
                class="btn btn-sm rounded-pill px-3"
                :class="decision.type === 'follow_up' ? 'btn-success' : 'btn-alt-secondary'"
                type="button"
                @click="setDecisionType('follow_up')"
              >
                Follow up
              </button>
            </div>
            <div class="text-muted mt-3" style="font-size: 0.75rem;">
              Selecting an outcome will route the patient to the next appropriate department (e.g., Billing, Pharmacy, Lab, Ward).
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>
