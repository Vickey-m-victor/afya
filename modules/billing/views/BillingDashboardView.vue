<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// --- Mock Stats (replace with API calls when backend is ready) ---
const stats = ref({
  collected_today: 48600,
  pending_invoices: 14,
  patients_waiting: 7,
  insurance_pending: 3,
});

// --- Mock chart (daily collection trend) ---
const chartDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
const chartValues = [32000, 41500, 28000, 55000, 47000, 19000, 48600];
const maxValue = Math.max(...chartValues);

// --- Mock recent transactions ---
const recentTransactions = ref([
  {
    id: "INV-0041",
    patient: "Grace Mwangi",
    amount: 4800,
    method: "M-Pesa",
    method_icon: "fa-mobile-alt",
    method_color: "#4CAF50",
    time: "09:14 AM",
    status: "paid",
  },
  {
    id: "INV-0040",
    patient: "James Otieno",
    amount: 1250,
    method: "Cash",
    method_icon: "fa-money-bill-wave",
    method_color: "#2196F3",
    time: "08:55 AM",
    status: "paid",
  },
  {
    id: "INV-0039",
    patient: "Mary Njoki",
    amount: 8400,
    method: "NHIF",
    method_icon: "fa-shield-alt",
    method_color: "#9C27B0",
    time: "08:30 AM",
    status: "pending",
  },
  {
    id: "INV-0038",
    patient: "Peter Kamau",
    amount: 3200,
    method: "M-Pesa",
    method_icon: "fa-mobile-alt",
    method_color: "#4CAF50",
    time: "08:05 AM",
    status: "paid",
  },
  {
    id: "INV-0037",
    patient: "Alice Wanjiku",
    amount: 600,
    method: "Cash",
    method_icon: "fa-money-bill-wave",
    method_color: "#2196F3",
    time: "07:44 AM",
    status: "waived",
  },
]);

function fmt(n) {
  return new Intl.NumberFormat("en-KE", { minimumFractionDigits: 2 }).format(n);
}

function barHeight(val) {
  return Math.round((val / maxValue) * 100);
}

function goToQueue() {
  router.push({ name: "billing/queue" });
}
</script>

<template>
  <div class="billing-dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-inner">
        <div class="header-left">
          <div class="header-icon">
            <i class="fa fa-file-invoice-dollar"></i>
          </div>
          <div>
            <h1 class="page-title">Billing Dashboard</h1>
            <p class="page-subtitle">
              Finance & Revenue · {{ new Date().toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) }}
            </p>
          </div>
        </div>
        <div class="header-actions">
          <button class="btn-outline-billing" @click="goToQueue">
            <i class="fa fa-users me-2"></i>Open Billing Queue
          </button>
          <RouterLink :to="{ name: 'billing/queue' }" class="btn-primary-billing">
            <i class="fa fa-plus me-2"></i>New Invoice
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="dashboard-body">
      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card stat-green">
          <div class="stat-icon"><i class="fa fa-coins"></i></div>
          <div class="stat-content">
            <div class="stat-label">Collected Today</div>
            <div class="stat-value">KES {{ fmt(stats.collected_today) }}</div>
            <div class="stat-trend up"><i class="fa fa-arrow-up"></i> 12% vs yesterday</div>
          </div>
        </div>
        <div class="stat-card stat-orange">
          <div class="stat-icon"><i class="fa fa-file-invoice"></i></div>
          <div class="stat-content">
            <div class="stat-label">Pending Invoices</div>
            <div class="stat-value">{{ stats.pending_invoices }}</div>
            <div class="stat-trend neutral"><i class="fa fa-clock"></i> Awaiting payment</div>
          </div>
        </div>
        <div class="stat-card stat-blue">
          <div class="stat-icon"><i class="fa fa-user-clock"></i></div>
          <div class="stat-content">
            <div class="stat-label">Patients Waiting</div>
            <div class="stat-value">{{ stats.patients_waiting }}</div>
            <div class="stat-trend neutral"><i class="fa fa-door-open"></i> At billing desk</div>
          </div>
        </div>
        <div class="stat-card stat-purple">
          <div class="stat-icon"><i class="fa fa-shield-alt"></i></div>
          <div class="stat-content">
            <div class="stat-label">Insurance Claims</div>
            <div class="stat-value">{{ stats.insurance_pending }}</div>
            <div class="stat-trend neutral"><i class="fa fa-hourglass-half"></i> Pending verification</div>
          </div>
        </div>
      </div>

      <!-- Chart + Transactions -->
      <div class="main-grid">
        <!-- Collection Trend Chart -->
        <div class="card-panel">
          <div class="panel-header">
            <div class="panel-title">
              <i class="fa fa-chart-bar me-2"></i>Daily Collection Trend
            </div>
            <span class="panel-subtitle">This week</span>
          </div>
          <div class="panel-body">
            <div class="bar-chart">
              <div
                v-for="(day, i) in chartDays"
                :key="day"
                class="bar-group"
                :class="{ today: i === chartDays.length - 1 }"
              >
                <div class="bar-amount">KES {{ Math.round(chartValues[i] / 1000) }}K</div>
                <div class="bar-wrapper">
                  <div
                    class="bar-fill"
                    :style="{ height: barHeight(chartValues[i]) + '%' }"
                  ></div>
                </div>
                <div class="bar-label">{{ day }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Method Breakdown -->
        <div class="card-panel">
          <div class="panel-header">
            <div class="panel-title">
              <i class="fa fa-pie-chart me-2"></i>Payment Methods
            </div>
            <span class="panel-subtitle">Today</span>
          </div>
          <div class="panel-body">
            <div class="method-list">
              <div class="method-item">
                <div class="method-dot" style="background:#4CAF50"></div>
                <div class="method-label">M-Pesa</div>
                <div class="method-bar-wrap">
                  <div class="method-bar" style="width:58%; background:#4CAF50"></div>
                </div>
                <div class="method-pct">58%</div>
              </div>
              <div class="method-item">
                <div class="method-dot" style="background:#2196F3"></div>
                <div class="method-label">Cash</div>
                <div class="method-bar-wrap">
                  <div class="method-bar" style="width:27%; background:#2196F3"></div>
                </div>
                <div class="method-pct">27%</div>
              </div>
              <div class="method-item">
                <div class="method-dot" style="background:#9C27B0"></div>
                <div class="method-label">NHIF/Insurance</div>
                <div class="method-bar-wrap">
                  <div class="method-bar" style="width:15%; background:#9C27B0"></div>
                </div>
                <div class="method-pct">15%</div>
              </div>
            </div>
            <div class="method-footer">
              <div class="method-total">
                <span class="method-total-label">Total Transactions</span>
                <span class="method-total-val">34</span>
              </div>
              <div class="method-total">
                <span class="method-total-label">Average Bill</span>
                <span class="method-total-val">KES 1,429</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="card-panel mt-4">
        <div class="panel-header">
          <div class="panel-title">
            <i class="fa fa-receipt me-2"></i>Recent Transactions
          </div>
          <RouterLink :to="{ name: 'billing/queue' }" class="panel-link">
            View All <i class="fa fa-arrow-right ms-1"></i>
          </RouterLink>
        </div>
        <div class="panel-body p-0">
          <div class="transactions-table">
            <div class="tx-header">
              <span>Invoice</span>
              <span>Patient</span>
              <span>Method</span>
              <span>Time</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            <div
              v-for="tx in recentTransactions"
              :key="tx.id"
              class="tx-row"
            >
              <span class="tx-id">{{ tx.id }}</span>
              <span class="tx-patient">{{ tx.patient }}</span>
              <span class="tx-method">
                <i class="fa" :class="tx.method_icon" :style="{ color: tx.method_color }"></i>
                {{ tx.method }}
              </span>
              <span class="tx-time">{{ tx.time }}</span>
              <span class="tx-amount">KES {{ fmt(tx.amount) }}</span>
              <span class="tx-status">
                <span
                  class="status-badge"
                  :class="{
                    'badge-paid': tx.status === 'paid',
                    'badge-pending': tx.status === 'pending',
                    'badge-waived': tx.status === 'waived',
                  }"
                >{{ tx.status }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---------- Base ---------- */
.billing-dashboard {
  min-height: 100vh;
  background: #f5f7fa;
  font-family: "Inter", sans-serif;
}

/* ---------- Page Header ---------- */
.page-header {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  padding: 28px 32px;
  color: #fff;
}
.page-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
}
.page-subtitle {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 2px 0 0;
}
.header-actions {
  display: flex;
  gap: 12px;
}
.btn-outline-billing {
  padding: 9px 18px;
  border-radius: 8px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}
.btn-outline-billing:hover {
  background: rgba(255, 255, 255, 0.15);
}
.btn-primary-billing {
  padding: 9px 18px;
  border-radius: 8px;
  background: #0e82fd;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s;
}
.btn-primary-billing:hover {
  background: #0a67cc;
  color: #fff;
}

/* ---------- Dashboard Body ---------- */
.dashboard-body {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 32px;
}

/* ---------- Stat Cards ---------- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}
@media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px)  { .stats-grid { grid-template-columns: 1fr; } }

.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 22px 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border-left: 4px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.1);
}
.stat-green  { border-left-color: #22c55e; }
.stat-orange { border-left-color: #f97316; }
.stat-blue   { border-left-color: #3b82f6; }
.stat-purple { border-left-color: #a855f7; }

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}
.stat-green  .stat-icon { background: #dcfce7; color: #16a34a; }
.stat-orange .stat-icon { background: #ffedd5; color: #ea580c; }
.stat-blue   .stat-icon { background: #dbeafe; color: #2563eb; }
.stat-purple .stat-icon { background: #f3e8ff; color: #9333ea; }

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
}
.stat-trend {
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.stat-trend.up     { color: #16a34a; }
.stat-trend.down   { color: #dc2626; }
.stat-trend.neutral { color: #64748b; }

/* ---------- Main Grid ---------- */
.main-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 20px;
}
@media (max-width: 900px) { .main-grid { grid-template-columns: 1fr; } }

/* ---------- Card Panel ---------- */
.card-panel {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
}
.panel-header {
  padding: 18px 22px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}
.panel-subtitle {
  font-size: 0.78rem;
  color: #94a3b8;
  font-weight: 500;
}
.panel-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.panel-link:hover { color: #1d4ed8; }
.panel-body {
  padding: 22px;
}

/* ---------- Bar Chart ---------- */
.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 180px;
  gap: 8px;
}
.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  gap: 4px;
}
.bar-group.today .bar-fill {
  background: linear-gradient(to top, #0e82fd, #22ccff);
}
.bar-amount {
  font-size: 0.65rem;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
}
.bar-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.bar-fill {
  width: 100%;
  border-radius: 6px 6px 0 0;
  background: #cbd5e1;
  transition: height 0.4s ease;
}
.bar-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: #64748b;
}

/* ---------- Payment Methods ---------- */
.method-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
}
.method-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.method-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.method-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  width: 110px;
  flex-shrink: 0;
}
.method-bar-wrap {
  flex: 1;
  height: 8px;
  background: #f1f5f9;
  border-radius: 99px;
  overflow: hidden;
}
.method-bar {
  height: 100%;
  border-radius: 99px;
  transition: width 0.5s ease;
}
.method-pct {
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f172a;
  width: 36px;
  text-align: right;
}
.method-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 16px;
}
.method-total {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.method-total-label {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 500;
}
.method-total-val {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}

/* ---------- Transactions Table ---------- */
.transactions-table {
  width: 100%;
}
.tx-header,
.tx-row {
  display: grid;
  grid-template-columns: 100px 1fr 110px 80px 120px 90px;
  padding: 12px 22px;
  gap: 12px;
  align-items: center;
  font-size: 0.82rem;
}
.tx-header {
  background: #f8fafc;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  border-bottom: 1px solid #f1f5f9;
}
.tx-row {
  border-bottom: 1px solid #f8fafc;
  transition: background 0.15s;
}
.tx-row:hover { background: #f8fafc; }
.tx-row:last-child { border-bottom: none; }
.tx-id     { font-weight: 700; color: #3b82f6; }
.tx-patient { font-weight: 600; color: #0f172a; }
.tx-method  { display: flex; align-items: center; gap: 6px; color: #334155; }
.tx-time    { color: #94a3b8; }
.tx-amount  { font-weight: 700; color: #0f172a; }
.status-badge {
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: capitalize;
}
.badge-paid    { background: #dcfce7; color: #16a34a; }
.badge-pending { background: #fff7ed; color: #ea580c; }
.badge-waived  { background: #f1f5f9; color: #64748b; }

.mt-4 { margin-top: 1.5rem !important; }
</style>
