<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useTriageService } from "../../services/triageService";

const props = defineProps({
  patient: { type: Object, default: null },
  started: { type: Boolean, default: false },
});
const emit = defineEmits(["complete"]);
const api = useTriageService();
const isLoading = ref(false);
const showOrders = ref(false);

const form = ref(getDefaultForm());

function getDefaultForm() {
  return {
    encounter_id: null,
    chief_complaint: "",
    triage_category: 3,
    pain_score: 0,
    mental_status: "Alert",
    last_meal_time: "",
    vitals: { TEMP: "", BP: "", HR: "", RR: "", SPO2: "", WEIGHT: "", MUAC: "", RBS: "" },
    allergies: [],
    nursing_notes: "",
    history: "",
    department_id: null,
  };
}

watch(() => props.patient, (p) => {
  form.value = getDefaultForm();
  showOrders.value = false;
  if (p?.encounter_id) form.value.encounter_id = p.encounter_id;
});

const esiCategories = [
  { value: 1, label: "Resuscitation (Red) — Immediate" },
  { value: 2, label: "Emergency (Orange) — <10 min" },
  { value: 3, label: "Urgent (Yellow) — <30 min" },
  { value: 4, label: "Semi-Urgent (Green) — <60 min" },
  { value: 5, label: "Non-Urgent (Blue) — >60 min" },
];

const mentalStatuses = ["Alert & Oriented", "Lethargic", "Confused", "Unresponsive"];

// Orders
const orderItems = ref([]);
const newOrder = ref({ name: "", catalog_type: "lab_catalog", instructions: "", priority: 1 });

function addOrder() {
  if (!newOrder.value.name) return;
  orderItems.value.push({ ...newOrder.value });
  newOrder.value = { name: "", catalog_type: "lab_catalog", instructions: "", priority: 1 };
}
function removeOrder(i) { orderItems.value.splice(i, 1); }

async function submitOrders() {
  if (!orderItems.value.length || !props.patient?.encounter_id) return;
  isLoading.value = true;
  try {
    await api.initiateOrders({ encounter_id: props.patient.encounter_id, orders: orderItems.value });
    showOrders.value = false;
    orderItems.value = [];
  } finally { isLoading.value = false; }
}

async function submitTriage() {
  isLoading.value = true;
  try {
    const cleanVitals = {};
    for (const [k, v] of Object.entries(form.value.vitals)) {
      if (v !== "" && v != null) cleanVitals[k] = v;
    }
    await api.capture({ ...form.value, vitals: cleanVitals });
    emit("complete");
  } finally { isLoading.value = false; }
}

function showOrdersPanel() { showOrders.value = true; }

defineExpose({ showOrdersPanel });

onMounted(() => {
  window.addEventListener('triage-complete-trigger', submitTriage);
  window.addEventListener('triage-show-orders', showOrdersPanel);
});

onUnmounted(() => {
  window.removeEventListener('triage-complete-trigger', submitTriage);
  window.removeEventListener('triage-show-orders', showOrdersPanel);
});
</script>

<template>
  <div class="block block-rounded block-bordered d-flex flex-column mb-0" style="overflow: hidden">
    <div class="block-header block-header-default" style="background: linear-gradient(135deg, #2c3e66, #1a2c4e)">
      <h3 class="block-title text-white fw-semibold">
        <i class="fa fa-notes-medical me-1"></i> Triage Assessment
      </h3>
      <div class="text-white-50 fs-xs fw-medium">Complete clinical evaluation</div>
    </div>
    <div class="block-content flex-grow-1 p-3" style="max-height: 650px; overflow-y: auto; background-color: #ffffff;">

      <!-- Empty state -->
      <div v-if="!patient" class="d-flex flex-column justify-content-center align-items-center h-100 text-muted" style="min-height: 400px;">
        <i class="fa fa-hand-point-left fa-3x mb-3 opacity-25"></i>
        <p class="fs-sm fw-medium">Select a patient from the queue to begin triage</p>
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
          <i class="fa fa-lock me-2"></i> Start the triage session to enable editing
        </div>

        <fieldset :disabled="!started">
          <!-- Chief Complaint -->
          <div class="p-3 mb-4 rounded border" style="background: #f9fafc; border-color: #eef3f8 !important;">
            <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #1e8f5e; border-bottom: 2px solid #e0ebf3; padding-bottom: 8px;">
              <i class="fa fa-comment-dots me-2"></i> Chief Complaint
            </div>
            <textarea v-model="form.chief_complaint" class="form-control" rows="3" placeholder="Describe patient's main symptoms..." style="border-radius: 14px; border-color: #cbdde9;" />
          </div>

          <!-- Vitals Grid -->
          <div class="p-3 mb-4 rounded border" style="background: #f9fafc; border-color: #eef3f8 !important;">
            <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #1e8f5e; border-bottom: 2px solid #e0ebf3; padding-bottom: 8px;">
              <i class="fa fa-heartbeat me-2"></i> Vital Signs
            </div>
            <div class="row g-3">
              <div class="col-6 col-md-4" v-for="v in [
                { key: 'TEMP', label: 'Temperature', unit: '°C', type: 'number', step: '0.1', ph: '36.5' },
                { key: 'HR', label: 'Heart Rate', unit: 'BPM', type: 'number', ph: '72' },
                { key: 'BP', label: 'Blood Pressure', unit: 'mmHg', type: 'text', ph: '120/80' },
                { key: 'RR', label: 'Resp. Rate', unit: '/min', type: 'number', ph: '18' },
                { key: 'SPO2', label: 'O₂ Saturation', unit: '%', type: 'number', ph: '98' },
              ]" :key="v.key">
                <div class="text-center p-2 rounded-3 border bg-white shadow-sm" style="border-color: #e2edf5 !important;">
                  <div class="text-uppercase fw-semibold" style="font-size: 0.7rem; color: #7a8e9e;">{{ v.label }}</div>
                  <input v-model="form.vitals[v.key]" :type="v.type" :step="v.step" :placeholder="v.ph"
                    class="form-control text-center fw-bold border-0 bg-transparent py-1 fs-4" style="color: #1a2c3e" />
                  <div class="fw-semibold" style="font-size: 0.7rem; color: #94a3b8;">{{ v.unit }}</div>
                </div>
              </div>
              
              <!-- Pain Score -->
              <div class="col-6 col-md-4">
                <div class="text-center p-2 rounded-3 border bg-white shadow-sm h-100 d-flex flex-column justify-content-center" style="border-color: #e2edf5 !important;">
                  <div class="text-uppercase fw-semibold mb-1" style="font-size: 0.7rem; color: #7a8e9e;">Pain Score</div>
                  <div class="d-flex align-items-center justify-content-center px-2">
                    <input v-model.number="form.pain_score" type="range" class="form-range" min="0" max="10" />
                  </div>
                  <div class="fw-bold fs-4" style="color: #1a2c3e">{{ form.pain_score }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Triage Assessment -->
          <div class="p-3 mb-4 rounded border" style="background: #f9fafc; border-color: #eef3f8 !important;">
            <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #1e8f5e; border-bottom: 2px solid #e0ebf3; padding-bottom: 8px;">
              <i class="fa fa-chart-line me-2"></i> Triage Assessment
            </div>
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Triage Category</label>
                <select v-model="form.triage_category" class="form-select" style="border-radius: 14px; border-color: #cbdde9;">
                  <option v-for="c in esiCategories" :key="c.value" :value="c.value">{{ c.label }}</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Mental Status</label>
                <select v-model="form.mental_status" class="form-select" style="border-radius: 14px; border-color: #cbdde9;">
                  <option v-for="s in mentalStatuses" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>
            <div class="mt-3">
              <label class="form-label fs-xs fw-semibold mb-1" style="color: #2c4c6e">Nursing Notes</label>
              <textarea v-model="form.nursing_notes" class="form-control" rows="2" placeholder="Additional observations..." style="border-radius: 14px; border-color: #cbdde9;" />
            </div>
          </div>
        </fieldset>

        <!-- Standing Orders -->
        <div v-if="showOrders && started" class="p-3 mb-3 rounded border" style="background: #f0f4f9; border-color: #cbdde9 !important;">
          <div class="fw-bold fs-sm mb-3 d-flex align-items-center" style="color: #2c4c6e; border-bottom: 2px solid #cbdde9; padding-bottom: 8px;">
            <i class="fa fa-flask me-2"></i> Standing Orders
          </div>
          <div class="row g-2 mb-3">
            <div class="col-md-4">
              <input v-model="newOrder.name" class="form-control" placeholder="Test name" style="border-radius: 10px;" />
            </div>
            <div class="col-md-3">
              <select v-model="newOrder.catalog_type" class="form-select" style="border-radius: 10px;">
                <option value="lab_catalog">Lab</option><option value="rad_catalog">Radiology</option>
              </select>
            </div>
            <div class="col-md-3">
              <input v-model="newOrder.instructions" class="form-control" placeholder="Notes" style="border-radius: 10px;" />
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary w-100" style="border-radius: 10px;" @click="addOrder"><i class="fa fa-plus"></i></button>
            </div>
          </div>
          <table v-if="orderItems.length" class="table table-sm table-vcenter fs-xs mb-3 bg-white rounded overflow-hidden shadow-sm">
            <thead class="bg-body-light"><tr><th class="py-2">Test</th><th class="py-2">Type</th><th class="py-2"></th></tr></thead>
            <tbody>
              <tr v-for="(o, i) in orderItems" :key="i">
                <td class="py-2 fw-medium">{{ o.name }}</td>
                <td class="py-2"><span class="badge bg-body-light text-dark">{{ o.catalog_type }}</span></td>
                <td class="py-2 text-end"><button class="btn btn-sm btn-alt-danger rounded-circle" @click="removeOrder(i)"><i class="fa fa-times"></i></button></td>
              </tr>
            </tbody>
          </table>
          <button v-if="orderItems.length" class="btn btn-sm btn-success rounded-pill px-3" @click="submitOrders" :disabled="isLoading">
            <i class="fa fa-paper-plane me-1"></i> Submit Orders
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
