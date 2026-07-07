<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// --- Mock billing queue (replace with useBillingService().getBillingQueue()) ---
const queue = ref([
  {
    queue_id: 101,
    encounter_id: 501,
    token_number: "B-001",
    patient_name: "Grace Wambui Mwangi",
    mrn: "MRN-2026-00082",
    age: "34 Yrs",
    gender: "Female",
    payment_scheme: "NHIF",
    scheme_color: "#9C27B0",
    waiting_since: "09:02 AM",
    priority: "normal",
    total_amount: 4800,
    status: "waiting",
  },
  {
    queue_id: 102,
    encounter_id: 502,
    token_number: "B-002",
    patient_name: "James Omondi Otieno",
    mrn: "MRN-2026-00057",
    age: "52 Yrs",
    gender: "Male",
    payment_scheme: "Cash",
    scheme_color: "#2196F3",
    waiting_since: "09:18 AM",
    priority: "normal",
    total_amount: 1250,
    status: "waiting",
  },
  {
    queue_id: 103,
    encounter_id: 503,
    token_number: "B-003",
    patient_name: "Mary Njoki Kamau",
    mrn: "MRN-2026-00104",
    age: "27 Yrs",
    gender: "Female",
    payment_scheme: "Linda Mama",
    scheme_color: "#E91E63",
    waiting_since: "09:31 AM",
    priority: "normal",
    total_amount: 0,
    status: "waiting",
  },
  {
    queue_id: 104,
    encounter_id: 504,
    token_number: "B-004",
    patient_name: "David Mutua Kioko",
    mrn: "MRN-2026-00033",
    age: "61 Yrs",
    gender: "Male",
    payment_scheme: "M-Pesa",
    scheme_color: "#4CAF50",
    waiting_since: "09:45 AM",
    priority: "urgent",
    total_amount: 12600,
    status: "waiting",
  },
  {
    queue_id: 105,
    encounter_id: 505,
    token_number: "B-005",
    patient_name: "Faith Achieng Odhiambo",
    mrn: "MRN-2026-00091",
    age: "19 Yrs",
    gender: "Female",
    payment_scheme: "Cash",
    scheme_color: "#2196F3",
    waiting_since: "10:02 AM",
    priority: "normal",
    total_amount: 600,
    status: "waiting",
  },
]);

const selectedPatient = ref(null);
const searchTerm = ref("");
const filterScheme = ref("all");

const filteredQueue = computed(() => {
  let list = [...queue.value];
  if (searchTerm.value.trim()) {
    const q = searchTerm.value.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.patient_name.toLowerCase().includes(q) ||
        p.mrn.toLowerCase().includes(q) ||
        p.token_number.toLowerCase().includes(q)
    );
  }
  if (filterScheme.value !== "all") {
    list = list.filter((p) => p.payment_scheme === filterScheme.value);
  }
  // Sort urgent to top
  return list.sort((a, b) => (b.priority === "urgent" ? 1 : 0) - (a.priority === "urgent" ? 1 : 0));
});

function selectPatient(patient) {
  selectedPatient.value = patient;
}

function openInvoice() {
  if (!selectedPatient.value) return;
  router.push({
    name: "billing/invoice",
    params: { encounterId: selectedPatient.value.encounter_id },
  });
}

function fmt(n) {
  return new Intl.NumberFormat("en-KE", { minimumFractionDigits: 2 }).format(n);
}

function waitTime(sinceStr) {
  const times = {
    "09:02 AM": "54 min",
    "09:18 AM": "38 min",
    "09:31 AM": "25 min",
    "09:45 AM": "11 min",
    "10:02 AM": "4 min",
  };
  return times[sinceStr] || "-";
}
</script>

<template>
  <BasePageHeading title="Billing Queue" :subtitle="`${queue.length} Patients Waiting`">
    <template #extra>
      <div class="d-flex align-items-center gap-2">
        <RouterLink :to="{ name: 'billing/dashboard' }" class="btn btn-sm btn-alt-secondary">
          <i class="fa fa-arrow-left me-1"></i> Back to Dashboard
        </RouterLink>
        <div class="input-group input-group-sm w-auto">
          <span class="input-group-text bg-body-light"><i class="fa fa-search text-muted"></i></span>
          <input
            v-model="searchTerm"
            type="text"
            class="form-control"
            placeholder="Search patient or MRN…"
            style="min-width: 200px"
          />
        </div>
        <select v-model="filterScheme" class="form-select form-select-sm w-auto">
          <option value="all">All Schemes</option>
          <option value="Cash">Cash</option>
          <option value="M-Pesa">M-Pesa</option>
          <option value="NHIF">NHIF</option>
          <option value="Linda Mama">Linda Mama</option>
        </select>
      </div>
    </template>
  </BasePageHeading>

  <div class="content">
    <div class="row">
      <!-- Left: Queue List -->
      <div class="col-md-7 col-lg-8">
        <div v-if="filteredQueue.length === 0" class="text-center py-5 text-muted">
          <i class="fa fa-inbox fa-3x mb-3 text-muted opacity-50"></i>
          <p class="fs-sm mb-0">No patients matching your search.</p>
        </div>

        <div
          v-for="patient in filteredQueue"
          :key="patient.queue_id"
          class="block block-rounded block-link-shadow border cursor-pointer mb-2"
          :class="{
            'border-primary border-2 shadow-sm': selectedPatient?.queue_id === patient.queue_id,
            'border-start border-4 border-danger': patient.priority === 'urgent' && selectedPatient?.queue_id !== patient.queue_id,
            'border-start border-4 border-primary': patient.priority !== 'urgent' && selectedPatient?.queue_id !== patient.queue_id
          }"
          @click="selectPatient(patient)"
        >
          <div class="block-content block-content-full">
            <div class="d-flex align-items-start justify-content-between">
              <div class="d-flex align-items-center">
                <!-- Token badge -->
                <span
                  class="badge px-3 py-2 rounded me-3"
                  :class="patient.priority === 'urgent' ? 'bg-danger-light text-danger' : 'bg-primary-light text-primary'"
                >
                  {{ patient.token_number }}
                </span>
                <div>
                  <h4 class="fs-sm fw-bold text-dark mb-1">{{ patient.patient_name }}</h4>
                  <p class="fs-xs text-muted mb-0">
                    {{ patient.mrn }} &nbsp;·&nbsp; {{ patient.age }} &nbsp;·&nbsp; {{ patient.gender }}
                  </p>
                </div>
              </div>
              <div class="text-end">
                <span
                  class="badge px-2 py-1 rounded-pill mb-1"
                  :style="{ background: patient.scheme_color + '15', color: patient.scheme_color }"
                >
                  {{ patient.payment_scheme }}
                </span>
                <p class="fs-xs text-muted mb-0">
                  <i class="fa fa-clock me-1 text-muted"></i>{{ waitTime(patient.waiting_since) }}
                </p>
              </div>
            </div>
            
            <div class="d-flex justify-content-between align-items-center border-top mt-3 pt-2">
              <span class="fs-sm fw-bold text-dark">
                {{ patient.total_amount > 0 ? 'KES ' + fmt(patient.total_amount) : 'Amount TBD' }}
              </span>
              <span class="fs-xs text-muted">Arrived: {{ patient.waiting_since }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Action Panel -->
      <div class="col-md-5 col-lg-4">
        <!-- Empty state -->
        <div v-if="!selectedPatient" class="text-center py-5 bg-white rounded border shadow-sm">
          <i class="fa fa-hand-point-left fa-3x mb-3 text-muted opacity-50"></i>
          <p class="fs-sm text-muted px-4 mb-0">Select a patient from the queue to process their invoice.</p>
        </div>

        <!-- Patient action card -->
        <BaseBlock v-else class="mb-0 shadow-sm" header-bg>
          <template #title>
            <h3 class="block-title fs-sm">Patient Summary</h3>
          </template>
          <!-- Patient Identity -->
          <div class="d-flex align-items-center p-3 bg-body-light border-bottom mb-3 rounded-top">
            <div class="item item-circle bg-primary text-white fw-bold me-3" style="width: 48px; height: 48px;">
              {{ selectedPatient.patient_name.charAt(0) }}
            </div>
            <div>
              <h4 class="fs-sm fw-bold text-dark mb-1">{{ selectedPatient.patient_name }}</h4>
              <p class="fs-xs text-primary mb-1">{{ selectedPatient.mrn }}</p>
              <p class="fs-xs text-muted mb-0">{{ selectedPatient.age }} · {{ selectedPatient.gender }}</p>
            </div>
          </div>

          <div class="p-2">
            <!-- Payment Scheme -->
            <div class="mb-3">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Payment Scheme</span>
              <span
                class="badge px-3 py-2 fs-xs fw-semibold border"
                :style="{ background: selectedPatient.scheme_color + '10', color: selectedPatient.scheme_color, borderColor: selectedPatient.scheme_color + '30' }"
              >
                <i class="fa fa-shield-alt me-1"></i>{{ selectedPatient.payment_scheme }}
              </span>
            </div>

            <!-- Estimated Bill -->
            <div class="mb-3">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Estimated Amount</span>
              <div class="fs-4 fw-bold text-dark">
                {{ selectedPatient.total_amount > 0 ? 'KES ' + fmt(selectedPatient.total_amount) : 'Generating…' }}
              </div>
              <p class="fs-xs text-muted mb-0">Full breakdown available in the invoice</p>
            </div>

            <!-- Waiting -->
            <div class="mb-4">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Waiting Since</span>
              <div class="fs-sm fw-semibold text-dark">
                <i class="fa fa-clock me-2 text-muted"></i>
                {{ selectedPatient.waiting_since }} ({{ waitTime(selectedPatient.waiting_since) }})
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="d-flex flex-column gap-2">
              <button class="btn btn-primary w-100 py-2 fs-sm fw-bold" @click="openInvoice">
                <i class="fa fa-file-invoice me-2"></i>Open Invoice
              </button>
              <button class="btn btn-alt-secondary w-100 py-2 fs-sm fw-bold">
                <i class="fa fa-history me-2"></i>View Past Invoices
              </button>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
