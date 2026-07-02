<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const invoiceId = route.params.invoiceId;

const receipt = ref({
  invoice_id: invoiceId,
  receipt_no: "RCP-2026-00041",
  paid_at: new Date().toLocaleString("en-KE"),
  cashier: "Jane Wanjiku",
  patient: { name: "Grace Wambui Mwangi", mrn: "MRN-2026-00082", age: "34 Yrs" },
  payment_method: "M-Pesa",
  reference: "QHE3RT1XZ",
  items: [
    { description: "Consultation Fee (General OPD)", amount: 200 },
    { description: "Malaria Rapid Test (RDT)", amount: 0, note: "Covered by NHIF" },
    { description: "Full Blood Count (FBC)", amount: 0, note: "Covered by NHIF" },
    { description: "Artemether/Lumefantrine 80/480mg Tabs x6", amount: 420 },
    { description: "Paracetamol 500mg Tabs x10", amount: 80 },
  ],
  scheme_cover: 950,
  subtotal: 1650,
  total_paid: 700,
  facility: { name: "Afya365 Medical Centre", address: "Ngong Road, Nairobi", phone: "+254 700 000 000" },
});

function fmt(n) {
  return new Intl.NumberFormat("en-KE", { minimumFractionDigits: 2 }).format(n);
}

function printReceipt() {
  window.print();
}
</script>

<template>
  <div class="receipt-page">
    <!-- Controls (hidden in print) -->
    <div class="receipt-controls no-print">
      <RouterLink :to="{ name: 'billing/queue' }" class="ctrl-btn">
        <i class="fa fa-arrow-left me-2"></i>Back to Queue
      </RouterLink>
      <button class="ctrl-btn ctrl-btn-primary" @click="printReceipt">
        <i class="fa fa-print me-2"></i>Print Receipt
      </button>
    </div>

    <!-- Receipt Card -->
    <div class="receipt-card">
      <!-- Header -->
      <div class="receipt-header">
        <div class="receipt-logo">
          <i class="fa fa-hospital-alt"></i>
        </div>
        <div class="receipt-facility">
          <h2>{{ receipt.facility.name }}</h2>
          <p>{{ receipt.facility.address }}</p>
          <p>{{ receipt.facility.phone }}</p>
        </div>
        <div class="receipt-badge">
          <i class="fa fa-check-circle me-1"></i> PAID
        </div>
      </div>

      <div class="receipt-divider dashed"></div>

      <!-- Meta info -->
      <div class="receipt-meta-grid">
        <div class="meta-block">
          <span class="meta-label">Receipt No.</span>
          <span class="meta-val">{{ receipt.receipt_no }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Invoice Ref.</span>
          <span class="meta-val">{{ receipt.invoice_id }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Date &amp; Time</span>
          <span class="meta-val">{{ receipt.paid_at }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Cashier</span>
          <span class="meta-val">{{ receipt.cashier }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">Patient</span>
          <span class="meta-val">{{ receipt.patient.name }}</span>
        </div>
        <div class="meta-block">
          <span class="meta-label">MRN</span>
          <span class="meta-val">{{ receipt.patient.mrn }}</span>
        </div>
      </div>

      <div class="receipt-divider dashed"></div>

      <!-- Line Items -->
      <div class="receipt-items">
        <div class="items-head">
          <span>Description</span>
          <span class="text-end">Amount</span>
        </div>
        <div v-for="(item, i) in receipt.items" :key="i" class="item-row">
          <div class="item-row-desc">
            {{ item.description }}
            <span v-if="item.note" class="item-note">{{ item.note }}</span>
          </div>
          <span class="text-end fw-600">
            {{ item.amount > 0 ? 'KES ' + fmt(item.amount) : 'Covered' }}
          </span>
        </div>
      </div>

      <div class="receipt-divider"></div>

      <!-- Totals -->
      <div class="receipt-totals">
        <div class="total-row">
          <span>Subtotal</span>
          <span>KES {{ fmt(receipt.subtotal) }}</span>
        </div>
        <div class="total-row text-purple">
          <span>NHIF Scheme Cover</span>
          <span>- KES {{ fmt(receipt.scheme_cover) }}</span>
        </div>
        <div class="total-row total-paid">
          <span>TOTAL PAID</span>
          <span>KES {{ fmt(receipt.total_paid) }}</span>
        </div>
      </div>

      <div class="receipt-divider dashed"></div>

      <!-- Payment method -->
      <div class="receipt-payment-block">
        <div class="payment-method-row">
          <i class="fa fa-mobile-alt text-green me-2"></i>
          <span class="fw-700">{{ receipt.payment_method }}</span>
          <span class="text-muted ms-2">Ref: {{ receipt.reference }}</span>
        </div>
        <div class="receipt-success-note">
          <i class="fa fa-check-circle me-1"></i>
          Payment confirmed. Patient may proceed.
        </div>
      </div>

      <div class="receipt-divider dashed"></div>

      <!-- Footer -->
      <div class="receipt-footer">
        <p>Thank you for choosing {{ receipt.facility.name }}.</p>
        <p>This is an official receipt. Please keep for your records.</p>
        <div class="receipt-barcode">
          |||  ||||||  |||  |||||  |||  ||||||  |||
        </div>
        <p class="receipt-barcode-label">{{ receipt.receipt_no }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.receipt-page {
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  font-family: "Inter", sans-serif;
}

/* Controls */
.receipt-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 560px;
}
.ctrl-btn {
  display: inline-flex;
  align-items: center;
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #334155;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
}
.ctrl-btn:hover { background: #f8fafc; }
.ctrl-btn-primary {
  background: #0e82fd;
  color: #fff;
  border-color: #0e82fd;
  box-shadow: 0 4px 12px rgba(14,130,253,0.25);
  margin-left: auto;
}
.ctrl-btn-primary:hover { background: #0565cc; color: #fff; }

/* Receipt card */
.receipt-card {
  width: 100%;
  max-width: 560px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  overflow: hidden;
  padding: 32px 28px;
}

/* Header */
.receipt-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}
.receipt-logo {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0e82fd, #22ccff);
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.receipt-facility { flex: 1; }
.receipt-facility h2 { font-size: 1rem; font-weight: 800; color: #0f172a; margin: 0 0 2px; }
.receipt-facility p { font-size: 0.72rem; color: #94a3b8; margin: 0; line-height: 1.5; }
.receipt-badge {
  background: #dcfce7;
  color: #16a34a;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 99px;
  flex-shrink: 0;
}

/* Dividers */
.receipt-divider {
  border: none;
  border-top: 1.5px solid #e2e8f0;
  margin: 18px 0;
}
.dashed { border-top-style: dashed; }

/* Meta */
.receipt-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.meta-block { display: flex; flex-direction: column; gap: 2px; }
.meta-label { font-size: 0.68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.meta-val { font-size: 0.82rem; font-weight: 600; color: #0f172a; }

/* Items */
.receipt-items { }
.items-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.68rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 4px;
}
.item-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f8fafc;
  font-size: 0.82rem;
  color: #334155;
}
.item-row:last-child { border-bottom: none; }
.item-row-desc { flex: 1; }
.item-note {
  display: block;
  font-size: 0.68rem;
  color: #9333ea;
  font-style: italic;
  margin-top: 2px;
}

/* Totals */
.receipt-totals { }
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #334155;
  padding: 6px 0;
}
.text-purple { color: #9333ea; }
.total-paid {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  border-top: 2px solid #f1f5f9;
  margin-top: 8px;
  padding-top: 10px;
}

/* Payment */
.receipt-payment-block { }
.payment-method-row {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #334155;
  margin-bottom: 10px;
}
.text-green { color: #16a34a; }
.fw-700 { font-weight: 700; }
.text-muted { color: #94a3b8; }
.ms-2 { margin-left: 8px; }
.receipt-success-note {
  background: #f0fdf4;
  color: #16a34a;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 14px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

/* Footer */
.receipt-footer {
  text-align: center;
  color: #94a3b8;
  font-size: 0.75rem;
  line-height: 1.7;
}
.receipt-barcode {
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #334155;
  margin: 12px 0 4px;
}
.receipt-barcode-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.1em;
}

/* Print styles */
@media print {
  .no-print { display: none !important; }
  .receipt-page { background: #fff; padding: 0; }
  .receipt-card { box-shadow: none; border-radius: 0; }
}
</style>
