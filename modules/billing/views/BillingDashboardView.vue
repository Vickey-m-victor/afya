<script setup>
import { ref, computed } from "vue";
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
  <BasePageHeading title="Billing Dashboard" subtitle="Finance & Revenue">
    <template #extra>
      <button class="btn btn-alt-secondary me-2" @click="goToQueue">
        <i class="fa fa-users me-1"></i> Open Billing Queue
      </button>
      <RouterLink :to="{ name: 'billing/queue' }" class="btn btn-primary">
        <i class="fa fa-plus me-1"></i> New Invoice
      </RouterLink>
    </template>
  </BasePageHeading>

  <div class="content">
    <!-- Stat Cards -->
    <div class="row">
      <!-- Collected Today -->
      <div class="col-sm-6 col-xxl-3 mb-4">
        <BaseBlock class="h-100 mb-0 border-start border-4 border-success">
          <div class="block-content block-content-full d-flex align-items-center justify-content-between">
            <div>
              <p class="fs-xs fw-semibold text-muted text-uppercase mb-1">Collected Today</p>
              <p class="fs-4 fw-bold text-dark mb-1">KES {{ fmt(stats.collected_today) }}</p>
              <p class="fs-xs fw-semibold text-success mb-0">
                <i class="fa fa-arrow-up me-1"></i>12% vs yesterday
              </p>
            </div>
            <div class="item item-circle bg-success-light text-success rounded-circle" style="width: 48px; height: 48px;">
              <i class="fa fa-coins fs-5"></i>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Pending Invoices -->
      <div class="col-sm-6 col-xxl-3 mb-4">
        <BaseBlock class="h-100 mb-0 border-start border-4 border-warning">
          <div class="block-content block-content-full d-flex align-items-center justify-content-between">
            <div>
              <p class="fs-xs fw-semibold text-muted text-uppercase mb-1">Pending Invoices</p>
              <p class="fs-4 fw-bold text-dark mb-1">{{ stats.pending_invoices }}</p>
              <p class="fs-xs fw-semibold text-muted mb-0">
                <i class="fa fa-clock me-1"></i>Awaiting payment
              </p>
            </div>
            <div class="item item-circle bg-warning-light text-warning rounded-circle" style="width: 48px; height: 48px;">
              <i class="fa fa-file-invoice fs-5"></i>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Patients Waiting -->
      <div class="col-sm-6 col-xxl-3 mb-4">
        <BaseBlock class="h-100 mb-0 border-start border-4 border-info">
          <div class="block-content block-content-full d-flex align-items-center justify-content-between">
            <div>
              <p class="fs-xs fw-semibold text-muted text-uppercase mb-1">Patients Waiting</p>
              <p class="fs-4 fw-bold text-dark mb-1">{{ stats.patients_waiting }}</p>
              <p class="fs-xs fw-semibold text-muted mb-0">
                <i class="fa fa-door-open me-1"></i>At billing desk
              </p>
            </div>
            <div class="item item-circle bg-info-light text-info rounded-circle" style="width: 48px; height: 48px;">
              <i class="fa fa-user-clock fs-5"></i>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Insurance Claims -->
      <div class="col-sm-6 col-xxl-3 mb-4">
        <BaseBlock class="h-100 mb-0 border-start border-4 border-indigo">
          <div class="block-content block-content-full d-flex align-items-center justify-content-between">
            <div>
              <p class="fs-xs fw-semibold text-muted text-uppercase mb-1">Insurance Claims</p>
              <p class="fs-4 fw-bold text-dark mb-1">{{ stats.insurance_pending }}</p>
              <p class="fs-xs fw-semibold text-muted mb-0">
                <i class="fa fa-hourglass-half me-1"></i>Pending verification
              </p>
            </div>
            <div class="item item-circle bg-indigo-light text-indigo rounded-circle" style="width: 48px; height: 48px;">
              <i class="fa fa-shield-alt fs-5"></i>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>

    <!-- Chart + Breakdown -->
    <div class="row">
      <!-- Collection Trend Chart -->
      <div class="col-xl-8 mb-4">
        <BaseBlock title="Daily Collection Trend" subtitle="This week" class="h-100 mb-0">
          <div class="bar-chart py-3">
            <div
              v-for="(day, i) in chartDays"
              :key="day"
              class="bar-group"
              :class="{ today: i === chartDays.length - 1 }"
            >
              <div class="bar-amount fs-xs">KES {{ Math.round(chartValues[i] / 1000) }}K</div>
              <div class="bar-wrapper">
                <div
                  class="bar-fill"
                  :style="{ height: barHeight(chartValues[i]) + '%' }"
                ></div>
              </div>
              <div class="bar-label fs-xs fw-semibold">{{ day }}</div>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Payment Method Breakdown -->
      <div class="col-xl-4 mb-4">
        <BaseBlock title="Payment Methods" subtitle="Today" class="h-100 mb-0">
          <div class="py-2">
            <div class="mb-3">
              <div class="d-flex align-items-center justify-content-between fs-sm fw-semibold mb-1">
                <span class="d-flex align-items-center">
                  <span class="d-inline-block rounded-circle bg-success me-2" style="width: 8px; height: 8px;"></span>
                  M-Pesa
                </span>
                <span>58%</span>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-success" role="progressbar" style="width: 58%;" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center justify-content-between fs-sm fw-semibold mb-1">
                <span class="d-flex align-items-center">
                  <span class="d-inline-block rounded-circle bg-info me-2" style="width: 8px; height: 8px;"></span>
                  Cash
                </span>
                <span>27%</span>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-info" role="progressbar" style="width: 27%;" aria-valuenow="27" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div class="mb-4">
              <div class="d-flex align-items-center justify-content-between fs-sm fw-semibold mb-1">
                <span class="d-flex align-items-center">
                  <span class="d-inline-block rounded-circle bg-primary me-2" style="width: 8px; height: 8px;"></span>
                  NHIF/Insurance
                </span>
                <span>15%</span>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 15%;" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            
            <div class="border-top pt-3 d-flex justify-content-between">
              <div>
                <span class="text-muted fs-xs fw-semibold text-uppercase d-block mb-1">Total Transactions</span>
                <span class="fs-5 fw-bold text-dark">34</span>
              </div>
              <div class="text-end">
                <span class="text-muted fs-xs fw-semibold text-uppercase d-block mb-1">Average Bill</span>
                <span class="fs-5 fw-bold text-dark">KES 1,429</span>
              </div>
            </div>
          </div>
        </BaseBlock>
      </div>
    </div>

    <!-- Recent Transactions -->
    <BaseBlock title="Recent Transactions" header-bg>
      <template #options>
        <RouterLink :to="{ name: 'billing/queue' }" class="btn btn-sm btn-alt-secondary">
          View All <i class="fa fa-arrow-right ms-1"></i>
        </RouterLink>
      </template>

      <div class="table-responsive">
        <table class="table table-vcenter table-hover table-striped table-borderless mb-0">
          <thead>
            <tr class="text-uppercase fs-xs">
              <th class="fw-bold">Invoice</th>
              <th class="fw-bold">Patient</th>
              <th class="fw-bold">Method</th>
              <th class="fw-bold">Time</th>
              <th class="fw-bold">Amount</th>
              <th class="fw-bold text-center" style="width: 100px;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in recentTransactions" :key="tx.id">
              <td class="fw-semibold fs-sm text-primary">
                {{ tx.id }}
              </td>
              <td class="fw-semibold fs-sm text-dark">
                {{ tx.patient }}
              </td>
              <td class="fs-sm">
                <i class="fa me-1" :class="tx.method_icon" :style="{ color: tx.method_color }"></i>
                {{ tx.method }}
              </td>
              <td class="text-muted fs-sm">
                {{ tx.time }}
              </td>
              <td class="fw-bold fs-sm text-dark">
                KES {{ fmt(tx.amount) }}
              </td>
              <td class="text-center">
                <span
                  class="badge px-3 py-1 rounded-pill"
                  :class="{
                    'bg-success-light text-success': tx.status === 'paid',
                    'bg-warning-light text-warning': tx.status === 'pending',
                    'bg-body-light text-muted': tx.status === 'waived',
                  }"
                >
                  {{ tx.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseBlock>
  </div>
</template>

<style scoped>
/* ---------- Bar Chart ---------- */
.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
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
</style>
