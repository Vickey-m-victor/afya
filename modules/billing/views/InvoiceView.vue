<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const encounterId = route.params.encounterId;

// --- Mock invoice data (replace with useBillingService().getInvoice(encounterId)) ---
const invoice = ref({
  invoice_id: "INV-2026-0041",
  encounter_id: encounterId,
  patient: { name: "Grace Wambui Mwangi", mrn: "MRN-2026-00082", age: "34 Yrs", gender: "Female" },
  payment_scheme: "NHIF",
  items: [
    { id: 1, description: "Consultation Fee (General OPD)", category: "consultation", qty: 1, unit_price: 500, discount: 0, covered_by_scheme: 300 },
    { id: 2, description: "Malaria Rapid Test (RDT)", category: "lab", qty: 1, unit_price: 350, discount: 0, covered_by_scheme: 350 },
    { id: 3, description: "Full Blood Count (FBC)", category: "lab", qty: 1, unit_price: 600, discount: 0, covered_by_scheme: 600 },
    { id: 4, description: "Artemether/Lumefantrine 80/480mg Tabs x6", category: "pharmacy", qty: 1, unit_price: 420, discount: 0, covered_by_scheme: 0 },
    { id: 5, description: "Paracetamol 500mg Tabs x10", category: "pharmacy", qty: 1, unit_price: 80, discount: 0, covered_by_scheme: 0 },
  ],
});

const paymentMethod = ref("mpesa");
const mpesaPhone = ref("254");
const cashTendered = ref("");
const processingPayment = ref(false);
const discountPercent = ref(0);

const subtotal = computed(() =>
  invoice.value.items.reduce((s, i) => s + i.unit_price * i.qty, 0)
);
const totalDiscount = computed(() =>
  invoice.value.items.reduce((s, i) => s + i.discount, 0) +
  Math.round((subtotal.value * discountPercent.value) / 100)
);
const schemeCovers = computed(() =>
  invoice.value.items.reduce((s, i) => s + i.covered_by_scheme, 0)
);
const totalDue = computed(() =>
  Math.max(0, subtotal.value - totalDiscount.value - schemeCovers.value)
);
const cashChange = computed(() => {
  const tendered = parseFloat(cashTendered.value) || 0;
  return Math.max(0, tendered - totalDue.value);
});

function categoryLabel(cat) {
  return { consultation: "Consultation", lab: "Laboratory", pharmacy: "Pharmacy", radiology: "Radiology" }[cat] || cat;
}
function categoryColor(cat) {
  return { consultation: "#3b82f6", lab: "#8b5cf6", pharmacy: "#10b981", radiology: "#f59e0b" }[cat] || "#64748b";
}
function fmt(n) {
  return new Intl.NumberFormat("en-KE", { minimumFractionDigits: 2 }).format(n);
}

async function confirmPayment() {
  processingPayment.value = true;
  // TODO: call useBillingService().processPayment(invoice.value.invoice_id, payload)
  await new Promise((r) => setTimeout(r, 1500)); // mock delay
  processingPayment.value = false;
  router.push({ name: "billing/receipt", params: { invoiceId: invoice.value.invoice_id } });
}
</script>

<template>
  <div class="invoice-view">
    <!-- Header -->
    <div class="inv-header">
      <div class="inv-header-inner">
        <div class="inv-header-left">
          <RouterLink :to="{ name: 'billing/queue' }" class="back-btn">
            <i class="fa fa-arrow-left"></i>
          </RouterLink>
          <div>
            <h1 class="inv-title">Invoice &amp; Payment</h1>
            <p class="inv-subtitle">{{ invoice.invoice_id }} &nbsp;·&nbsp; Encounter #{{ encounterId }}</p>
          </div>
        </div>
        <div class="inv-patient-chip">
          <div class="chip-avatar">{{ invoice.patient.name.charAt(0) }}</div>
          <div>
            <div class="chip-name">{{ invoice.patient.name }}</div>
            <div class="chip-meta">{{ invoice.patient.mrn }} · {{ invoice.patient.age }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="inv-body">
      <!-- Line Items -->
      <div class="inv-panel">
        <div class="panel-hd">
          <span><i class="fa fa-list me-2"></i>Bill Items</span>
          <span class="panel-hd-meta">{{ invoice.items.length }} items</span>
        </div>
        <div class="items-table">
          <div class="items-thead">
            <span>Description</span>
            <span>Category</span>
            <span class="text-end">Unit Price</span>
            <span class="text-end">Scheme Covers</span>
            <span class="text-end">Patient Pays</span>
          </div>
          <div v-for="item in invoice.items" :key="item.id" class="items-row">
            <span class="item-desc">{{ item.description }}</span>
            <span>
              <span class="cat-badge" :style="{ background: categoryColor(item.category) + '20', color: categoryColor(item.category) }">
                {{ categoryLabel(item.category) }}
              </span>
            </span>
            <span class="text-end fw-600">KES {{ fmt(item.unit_price) }}</span>
            <span class="text-end text-purple">
              {{ item.covered_by_scheme > 0 ? '- KES ' + fmt(item.covered_by_scheme) : '—' }}
            </span>
            <span class="text-end fw-700">KES {{ fmt(Math.max(0, item.unit_price - item.covered_by_scheme)) }}</span>
          </div>
        </div>

        <!-- Totals -->
        <div class="totals-block">
          <div class="totals-row">
            <span>Subtotal</span>
            <span>KES {{ fmt(subtotal) }}</span>
          </div>
          <div class="totals-row text-purple">
            <span><i class="fa fa-shield-alt me-1"></i>{{ invoice.payment_scheme }} Covers</span>
            <span>- KES {{ fmt(schemeCovers) }}</span>
          </div>
          <div class="totals-row">
            <div class="discount-input-row">
              <span>Discount</span>
              <div class="discount-control">
                <input v-model.number="discountPercent" type="number" min="0" max="100" class="discount-field" />
                <span>%</span>
              </div>
            </div>
            <span class="text-danger">- KES {{ fmt(totalDiscount) }}</span>
          </div>
          <div class="totals-row totals-due">
            <span>Total Due</span>
            <span>KES {{ fmt(totalDue) }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Panel -->
      <div class="pay-panel">
        <div class="panel-hd"><i class="fa fa-credit-card me-2"></i>Collect Payment</div>

        <!-- Method selector -->
        <div class="method-tabs">
          <button :class="['method-tab', paymentMethod === 'mpesa' && 'active-green']" @click="paymentMethod = 'mpesa'">
            <i class="fa fa-mobile-alt me-1"></i>M-Pesa
          </button>
          <button :class="['method-tab', paymentMethod === 'cash' && 'active-blue']" @click="paymentMethod = 'cash'">
            <i class="fa fa-money-bill-wave me-1"></i>Cash
          </button>
          <button :class="['method-tab', paymentMethod === 'card' && 'active-orange']" @click="paymentMethod = 'card'">
            <i class="fa fa-credit-card me-1"></i>Card
          </button>
          <button :class="['method-tab', paymentMethod === 'insurance' && 'active-purple']" @click="paymentMethod = 'insurance'">
            <i class="fa fa-shield-alt me-1"></i>Insurance
          </button>
        </div>

        <!-- M-Pesa STK -->
        <div v-if="paymentMethod === 'mpesa'" class="pay-form">
          <label class="pay-label">M-Pesa Phone Number</label>
          <div class="pay-input-wrap">
            <span class="pay-prefix">🇰🇪</span>
            <input v-model="mpesaPhone" type="text" class="pay-input" placeholder="2547XXXXXXXX" />
          </div>
          <div class="pay-amount-display">
            <span class="pay-amount-label">Amount to push</span>
            <span class="pay-amount-val">KES {{ fmt(totalDue) }}</span>
          </div>
          <p class="pay-note">An STK push will be sent to the patient's phone. Confirm once they approve the prompt.</p>
        </div>

        <!-- Cash -->
        <div v-else-if="paymentMethod === 'cash'" class="pay-form">
          <label class="pay-label">Total Due</label>
          <div class="pay-amount-display">
            <span class="pay-amount-label">Amount</span>
            <span class="pay-amount-val">KES {{ fmt(totalDue) }}</span>
          </div>
          <label class="pay-label mt-3">Cash Tendered</label>
          <input v-model="cashTendered" type="number" class="pay-input" placeholder="Enter cash received" />
          <div v-if="cashChange > 0" class="change-display">
            <i class="fa fa-coins me-2"></i>Change: <strong>KES {{ fmt(cashChange) }}</strong>
          </div>
        </div>

        <!-- Card -->
        <div v-else-if="paymentMethod === 'card'" class="pay-form">
          <div class="pay-amount-display">
            <span class="pay-amount-label">Card Charge</span>
            <span class="pay-amount-val">KES {{ fmt(totalDue) }}</span>
          </div>
          <label class="pay-label">POS Reference / Approval Code</label>
          <input type="text" class="pay-input" placeholder="Enter POS approval code" />
        </div>

        <!-- Insurance -->
        <div v-else class="pay-form">
          <div class="pay-amount-display">
            <span class="pay-amount-label">Claim Amount</span>
            <span class="pay-amount-val">KES {{ fmt(totalDue) }}</span>
          </div>
          <label class="pay-label">Member ID / Claim Number</label>
          <input type="text" class="pay-input" placeholder="e.g. NHIF-000123456" />
          <label class="pay-label mt-3">Authorization Code</label>
          <input type="text" class="pay-input" placeholder="Pre-auth code from insurer" />
        </div>

        <!-- Confirm -->
        <button
          class="confirm-btn"
          :disabled="processingPayment || totalDue <= 0"
          @click="confirmPayment"
        >
          <span v-if="processingPayment"><i class="fa fa-spinner fa-spin me-2"></i>Processing…</span>
          <span v-else><i class="fa fa-check-circle me-2"></i>Confirm Payment · KES {{ fmt(totalDue) }}</span>
        </button>

        <button class="waive-btn">
          <i class="fa fa-percent me-1"></i>Apply Waiver / Write-off
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.invoice-view { min-height: 100vh; background: #f5f7fa; font-family: "Inter", sans-serif; }

/* Header */
.inv-header {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  padding: 20px 28px; color: #fff;
}
.inv-header-inner {
  max-width: 1400px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
}
.inv-header-left { display: flex; align-items: center; gap: 14px; }
.back-btn {
  width: 36px; height: 36px; border-radius: 8px;
  border: 1.5px solid rgba(255,255,255,0.25); background: transparent;
  color: #fff; display: flex; align-items: center; justify-content: center;
  text-decoration: none; cursor: pointer;
}
.back-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
.inv-title { font-size: 1.25rem; font-weight: 700; margin: 0; color: #fff; }
.inv-subtitle { font-size: 0.78rem; color: rgba(255,255,255,0.6); margin: 2px 0 0; }

.inv-patient-chip {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,0.12); border-radius: 10px; padding: 10px 16px;
}
.chip-avatar {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,0.2); color: #fff;
  font-weight: 800; font-size: 1.1rem;
  display: flex; align-items: center; justify-content: center;
}
.chip-name { font-size: 0.9rem; font-weight: 700; color: #fff; }
.chip-meta { font-size: 0.72rem; color: rgba(255,255,255,0.65); }

/* Body */
.inv-body {
  max-width: 1400px; margin: 0 auto; padding: 24px 28px;
  display: grid; grid-template-columns: 1fr 360px; gap: 20px;
}
@media (max-width: 960px) { .inv-body { grid-template-columns: 1fr; } }

/* Panel shared */
.inv-panel, .pay-panel {
  background: #fff; border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden;
}
.panel-hd {
  padding: 16px 20px; font-size: 0.9rem; font-weight: 700; color: #0f172a;
  border-bottom: 1px solid #f1f5f9;
  display: flex; align-items: center; justify-content: space-between;
}
.panel-hd-meta { font-size: 0.75rem; color: #94a3b8; font-weight: 500; }

/* Items table */
.items-thead, .items-row {
  display: grid;
  grid-template-columns: 2fr 100px 110px 120px 110px;
  padding: 11px 20px; gap: 12px; align-items: center; font-size: 0.82rem;
}
.items-thead {
  background: #f8fafc; font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;
}
.items-row { border-bottom: 1px solid #f8fafc; }
.items-row:hover { background: #fafcff; }
.items-row:last-child { border-bottom: none; }
.item-desc { font-weight: 600; color: #334155; }
.cat-badge {
  font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 99px;
}
.text-end { text-align: right; }
.text-purple { color: #9333ea; }
.fw-600 { font-weight: 600; }
.fw-700 { font-weight: 700; }

/* Totals */
.totals-block { padding: 16px 20px; border-top: 2px solid #f1f5f9; }
.totals-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0; font-size: 0.85rem; border-bottom: 1px solid #f8fafc; color: #334155;
}
.totals-row:last-child { border-bottom: none; }
.totals-due {
  font-size: 1.1rem; font-weight: 800; color: #0f172a;
  border-top: 2px solid #f1f5f9; margin-top: 8px; padding-top: 12px;
}
.text-danger { color: #dc2626; }
.text-purple { color: #9333ea; }
.discount-input-row { display: flex; align-items: center; gap: 12px; }
.discount-control {
  display: flex; align-items: center; gap: 4px;
  font-size: 0.82rem; font-weight: 600; color: #64748b;
}
.discount-field {
  width: 56px; padding: 4px 8px; border-radius: 6px;
  border: 1.5px solid #e2e8f0; font-size: 0.82rem; text-align: center; outline: none;
}

/* Pay Panel */
.pay-panel { padding: 0; }
.pay-panel > .panel-hd { padding: 16px 20px; }

.method-tabs {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 8px; padding: 16px 20px; border-bottom: 1px solid #f1f5f9;
}
.method-tab {
  padding: 8px 12px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  background: #f8fafc; font-size: 0.8rem; font-weight: 600;
  color: #64748b; cursor: pointer; transition: all 0.15s;
  display: flex; align-items: center; justify-content: center;
}
.method-tab:hover { background: #f1f5f9; }
.active-green { border-color: #22c55e; background: #f0fdf4; color: #16a34a; }
.active-blue  { border-color: #3b82f6; background: #eff6ff; color: #2563eb; }
.active-orange{ border-color: #f97316; background: #fff7ed; color: #ea580c; }
.active-purple{ border-color: #a855f7; background: #faf5ff; color: #9333ea; }

.pay-form { padding: 16px 20px; }
.pay-label {
  display: block; font-size: 0.75rem; font-weight: 700;
  color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px;
}
.mt-3 { margin-top: 12px; }
.pay-input-wrap { position: relative; display: flex; align-items: center; }
.pay-prefix {
  position: absolute; left: 12px; font-size: 1rem; line-height: 1;
}
.pay-input {
  width: 100%; padding: 10px 14px 10px 38px;
  border-radius: 8px; border: 1.5px solid #e2e8f0;
  font-size: 0.9rem; outline: none; transition: border-color 0.15s;
}
.pay-input:focus { border-color: #3b82f6; }
.pay-amount-display {
  display: flex; justify-content: space-between; align-items: center;
  background: #f8fafc; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px;
}
.pay-amount-label { font-size: 0.75rem; font-weight: 600; color: #64748b; }
.pay-amount-val { font-size: 1.2rem; font-weight: 800; color: #0f172a; }
.pay-note { font-size: 0.75rem; color: #94a3b8; margin-top: 10px; line-height: 1.5; }
.change-display {
  margin-top: 12px; padding: 10px 14px; border-radius: 8px;
  background: #f0fdf4; color: #16a34a; font-size: 0.85rem; font-weight: 600;
}

.confirm-btn {
  width: calc(100% - 40px); margin: 8px 20px 8px;
  padding: 14px; border-radius: 10px; border: none;
  background: linear-gradient(135deg, #0e82fd, #0565cc);
  color: #fff; font-size: 0.9rem; font-weight: 700; cursor: pointer;
  box-shadow: 0 4px 14px rgba(14,130,253,0.35); transition: all 0.18s;
  display: flex; align-items: center; justify-content: center;
}
.confirm-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(14,130,253,0.4); }
.confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.waive-btn {
  width: calc(100% - 40px); margin: 0 20px 20px;
  padding: 10px; border-radius: 10px; border: 1.5px solid #e2e8f0;
  background: #f8fafc; color: #64748b; font-size: 0.82rem; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.waive-btn:hover { background: #f1f5f9; }
</style>
