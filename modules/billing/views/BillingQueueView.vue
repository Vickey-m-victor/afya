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
  // Simple mock — in real use calculate from timestamp
  const times = { "09:02 AM": "54 min", "09:18 AM": "38 min", "09:31 AM": "25 min", "09:45 AM": "11 min", "10:02 AM": "4 min" };
  return times[sinceStr] || "-";
}
</script>

<template>
  <div class="billing-queue">
    <!-- Header -->
    <div class="bq-header">
      <div class="bq-header-inner">
        <div class="bq-header-left">
          <RouterLink :to="{ name: 'billing/dashboard' }" class="back-btn">
            <i class="fa fa-arrow-left"></i>
          </RouterLink>
          <div class="bq-title-block">
            <h1 class="bq-title"><i class="fa fa-users me-2"></i>Billing Queue</h1>
            <span class="bq-badge">{{ queue.length }} Patients Waiting</span>
          </div>
        </div>
        <div class="bq-header-right">
          <div class="bq-search-wrap">
            <i class="fa fa-search bq-search-icon"></i>
            <input
              v-model="searchTerm"
              type="text"
              class="bq-search"
              placeholder="Search patient or MRN…"
            />
          </div>
          <select v-model="filterScheme" class="bq-filter-select">
            <option value="all">All Schemes</option>
            <option value="Cash">Cash</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="NHIF">NHIF</option>
            <option value="Linda Mama">Linda Mama</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Body: two-panel layout -->
    <div class="bq-body">
      <!-- Left: Queue List -->
      <div class="bq-list-panel">
        <div v-if="filteredQueue.length === 0" class="bq-empty">
          <i class="fa fa-inbox fa-2x mb-2 opacity-40"></i>
          <p>No patients matching your search.</p>
        </div>

        <div
          v-for="patient in filteredQueue"
          :key="patient.queue_id"
          class="bq-card"
          :class="{
            'bq-card--selected': selectedPatient?.queue_id === patient.queue_id,
            'bq-card--urgent': patient.priority === 'urgent',
          }"
          @click="selectPatient(patient)"
        >
          <div class="bq-card-top">
            <div class="bq-token" :class="patient.priority === 'urgent' ? 'token-urgent' : 'token-normal'">
              {{ patient.token_number }}
              <span v-if="patient.priority === 'urgent'" class="urgent-dot"></span>
            </div>
            <div class="bq-patient-info">
              <div class="bq-patient-name">{{ patient.patient_name }}</div>
              <div class="bq-patient-sub">
                {{ patient.mrn }} &nbsp;·&nbsp; {{ patient.age }} &nbsp;·&nbsp; {{ patient.gender }}
              </div>
            </div>
            <div class="bq-right-info">
              <span
                class="bq-scheme"
                :style="{ background: patient.scheme_color + '20', color: patient.scheme_color }"
              >{{ patient.payment_scheme }}</span>
              <div class="bq-wait">
                <i class="fa fa-clock me-1 opacity-60"></i>{{ waitTime(patient.waiting_since) }}
              </div>
            </div>
          </div>
          <div class="bq-card-bottom">
            <span class="bq-amount">
              {{ patient.total_amount > 0 ? 'KES ' + fmt(patient.total_amount) : 'Amount TBD' }}
            </span>
            <span class="bq-arrived">Arrived: {{ patient.waiting_since }}</span>
          </div>
        </div>
      </div>

      <!-- Right: Action Panel -->
      <div class="bq-action-panel">
        <!-- Empty state -->
        <div v-if="!selectedPatient" class="bq-action-empty">
          <div class="action-empty-icon">
            <i class="fa fa-hand-point-left"></i>
          </div>
          <p class="action-empty-text">Select a patient from the queue to process their invoice.</p>
        </div>

        <!-- Patient action card -->
        <div v-else class="bq-action-card">
          <!-- Patient Identity -->
          <div class="action-identity">
            <div class="action-avatar">
              {{ selectedPatient.patient_name.charAt(0) }}
            </div>
            <div class="action-id-text">
              <div class="action-name">{{ selectedPatient.patient_name }}</div>
              <div class="action-mrn">{{ selectedPatient.mrn }}</div>
              <div class="action-meta">{{ selectedPatient.age }} · {{ selectedPatient.gender }}</div>
            </div>
          </div>

          <!-- Payment Scheme -->
          <div class="action-section">
            <div class="action-section-title">Payment Scheme</div>
            <span
              class="scheme-pill"
              :style="{ background: selectedPatient.scheme_color + '20', color: selectedPatient.scheme_color, borderColor: selectedPatient.scheme_color + '40' }"
            >
              <i class="fa fa-shield-alt me-1"></i>{{ selectedPatient.payment_scheme }}
            </span>
          </div>

          <!-- Estimated Bill -->
          <div class="action-section">
            <div class="action-section-title">Estimated Amount</div>
            <div class="action-amount">
              {{ selectedPatient.total_amount > 0 ? 'KES ' + fmt(selectedPatient.total_amount) : 'Generating…' }}
            </div>
            <div class="action-amount-note">Full breakdown available in the invoice</div>
          </div>

          <!-- Waiting -->
          <div class="action-section">
            <div class="action-section-title">Waiting Since</div>
            <div class="action-wait">
              <i class="fa fa-clock me-2"></i>
              {{ selectedPatient.waiting_since }} ({{ waitTime(selectedPatient.waiting_since) }})
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="action-buttons">
            <button class="action-btn action-btn-primary" @click="openInvoice">
              <i class="fa fa-file-invoice me-2"></i>Open Invoice & Collect Payment
            </button>
            <button class="action-btn action-btn-secondary">
              <i class="fa fa-history me-2"></i>View Past Invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.billing-queue {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

/* Header */
.bq-header {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  padding: 20px 28px;
  color: #fff;
}
.bq-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
}
.bq-header-left { display: flex; align-items: center; gap: 14px; }
.back-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid rgba(255,255,255,0.25);
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}
.back-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
.bq-title { font-size: 1.3rem; font-weight: 700; margin: 0; color: #fff; }
.bq-badge {
  display: inline-block;
  margin-top: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(255,255,255,0.15);
  padding: 2px 10px;
  border-radius: 99px;
  color: rgba(255,255,255,0.9);
}
.bq-header-right { display: flex; align-items: center; gap: 10px; }
.bq-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.bq-search-icon {
  position: absolute;
  left: 11px;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.55);
}
.bq-search {
  padding: 8px 14px 8px 34px;
  border-radius: 8px;
  border: 1.5px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.85rem;
  width: 240px;
  outline: none;
}
.bq-search::placeholder { color: rgba(255,255,255,0.5); }
.bq-search:focus { border-color: rgba(255,255,255,0.5); }
.bq-filter-select {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
}
.bq-filter-select option { background: #203a43; color: #fff; }

/* Body */
.bq-body {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 0;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  gap: 20px;
  width: 100%;
}
@media (max-width: 900px) {
  .bq-body { grid-template-columns: 1fr; }
}

/* List Panel */
.bq-list-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bq-empty {
  text-align: center;
  color: #94a3b8;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.bq-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px 18px;
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.18s;
}
.bq-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); border-color: #cbd5e1; }
.bq-card--selected { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
.bq-card--urgent  { border-left: 4px solid #ef4444; }

.bq-card-top {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
}
.bq-token {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.04em;
  white-space: nowrap;
  position: relative;
  flex-shrink: 0;
}
.token-normal { background: #eff6ff; color: #2563eb; }
.token-urgent { background: #fef2f2; color: #dc2626; }
.urgent-dot {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  animation: pulse-dot 1.4s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}
.bq-patient-info { flex: 1; }
.bq-patient-name { font-size: 0.95rem; font-weight: 700; color: #0f172a; }
.bq-patient-sub { font-size: 0.75rem; color: #64748b; margin-top: 2px; }
.bq-right-info { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.bq-scheme {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 99px;
}
.bq-wait { font-size: 0.72rem; color: #94a3b8; font-weight: 500; }
.bq-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f8fafc;
}
.bq-amount { font-size: 0.9rem; font-weight: 800; color: #0f172a; }
.bq-arrived { font-size: 0.72rem; color: #94a3b8; }

/* Action Panel */
.bq-action-panel {
  position: sticky;
  top: 90px;
  align-self: start;
}
.bq-action-empty {
  background: #fff;
  border-radius: 14px;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  text-align: center;
}
.action-empty-icon {
  font-size: 2.5rem;
  color: #cbd5e1;
}
.action-empty-text {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
}
.bq-action-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}
.action-identity {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: linear-gradient(135deg, #f8faff, #eef3ff);
  border-bottom: 1px solid #e2e8f0;
}
.action-avatar {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0e82fd, #22ccff);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.action-name { font-size: 1rem; font-weight: 700; color: #0f172a; }
.action-mrn  { font-size: 0.75rem; font-weight: 600; color: #3b82f6; margin-top: 2px; }
.action-meta { font-size: 0.75rem; color: #64748b; margin-top: 1px; }

.action-section { padding: 16px 20px; border-bottom: 1px solid #f8fafc; }
.action-section-title {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
  margin-bottom: 8px;
}
.scheme-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 99px;
  border: 1.5px solid transparent;
}
.action-amount {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}
.action-amount-note { font-size: 0.72rem; color: #94a3b8; margin-top: 4px; }
.action-wait { font-size: 0.85rem; font-weight: 600; color: #334155; }

.action-buttons {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.action-btn {
  width: 100%;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s;
}
.action-btn-primary {
  background: linear-gradient(135deg, #0e82fd, #0565cc);
  color: #fff;
  box-shadow: 0 4px 12px rgba(14,130,253,0.3);
}
.action-btn-primary:hover { box-shadow: 0 6px 18px rgba(14,130,253,0.4); transform: translateY(-1px); }
.action-btn-secondary {
  background: #f8fafc;
  color: #334155;
  border: 1.5px solid #e2e8f0;
}
.action-btn-secondary:hover { background: #f1f5f9; }
</style>
