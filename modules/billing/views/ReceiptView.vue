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
  <BasePageHeading title="Receipt" :subtitle="`Receipt No. ${receipt.receipt_no}`" class="no-print">
    <template #extra>
      <RouterLink :to="{ name: 'billing/queue' }" class="btn btn-sm btn-alt-secondary me-2">
        <i class="fa fa-arrow-left me-1"></i> Back to Queue
      </RouterLink>
      <button class="btn btn-sm btn-primary" @click="printReceipt">
        <i class="fa fa-print me-1"></i> Print Receipt
      </button>
    </template>
  </BasePageHeading>

  <div class="content">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="receipt-card p-4 p-sm-5 bg-white rounded border shadow-sm">
          <!-- Facility Header -->
          <div class="d-flex align-items-start gap-3 mb-4">
            <div class="item item-circle bg-primary text-white" style="width: 48px; height: 48px;">
              <i class="fa fa-hospital-alt fs-5"></i>
            </div>
            <div class="flex-grow-1">
              <h2 class="fs-sm fw-bold text-dark mb-1">{{ receipt.facility.name }}</h2>
              <p class="fs-xs text-muted mb-0">{{ receipt.facility.address }}</p>
              <p class="fs-xs text-muted mb-0">{{ receipt.facility.phone }}</p>
            </div>
            <span class="badge bg-success-light text-success px-3 py-2 rounded-pill fw-bold">
              <i class="fa fa-check-circle me-1"></i> PAID
            </span>
          </div>

          <hr class="border-top border-dashed my-3" />

          <!-- Meta Grid -->
          <div class="row g-3 fs-sm my-2">
            <div class="col-6">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Receipt No.</span>
              <span class="fw-bold text-dark fs-xs">{{ receipt.receipt_no }}</span>
            </div>
            <div class="col-6">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Invoice Ref.</span>
              <span class="fw-bold text-dark fs-xs">{{ receipt.invoice_id }}</span>
            </div>
            <div class="col-6">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Date &amp; Time</span>
              <span class="fw-semibold text-dark fs-xs">{{ receipt.paid_at }}</span>
            </div>
            <div class="col-6">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Cashier</span>
              <span class="fw-semibold text-dark fs-xs">{{ receipt.cashier }}</span>
            </div>
            <div class="col-6">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">Patient</span>
              <span class="fw-bold text-dark fs-xs">{{ receipt.patient.name }}</span>
            </div>
            <div class="col-6">
              <span class="text-uppercase text-muted fs-xs fw-bold d-block mb-1">MRN</span>
              <span class="fw-semibold text-dark fs-xs">{{ receipt.patient.mrn }}</span>
            </div>
          </div>

          <hr class="border-top border-dashed my-3" />

          <!-- Line Items -->
          <div class="my-3">
            <div class="d-flex justify-content-between border-bottom pb-2 mb-2 text-uppercase text-muted fs-xs fw-bold">
              <span>Description</span>
              <span class="text-end">Amount</span>
            </div>
            <div v-for="(item, i) in receipt.items" :key="i" class="d-flex justify-content-between align-items-start py-2 fs-sm border-bottom border-light">
              <div class="flex-grow-1 text-dark fw-semibold">
                {{ item.description }}
                <span v-if="item.note" class="d-block fs-xs text-purple fw-normal mt-1">{{ item.note }}</span>
              </div>
              <span class="fw-bold text-dark ms-3">
                {{ item.amount > 0 ? 'KES ' + fmt(item.amount) : 'Covered' }}
              </span>
            </div>
          </div>

          <!-- Totals -->
          <div class="my-3">
            <div class="d-flex justify-content-between py-1 fs-sm">
              <span class="text-muted">Subtotal</span>
              <span class="fw-semibold text-dark">KES {{ fmt(receipt.subtotal) }}</span>
            </div>
            <div class="d-flex justify-content-between py-1 fs-sm text-purple">
              <span>NHIF Scheme Cover</span>
              <span class="fw-bold">- KES {{ fmt(receipt.scheme_cover) }}</span>
            </div>
            <div class="d-flex justify-content-between py-2 border-top mt-2 fs-5">
              <span class="fw-bold text-dark">TOTAL PAID</span>
              <span class="fw-bold text-primary">KES {{ fmt(receipt.total_paid) }}</span>
            </div>
          </div>

          <hr class="border-top border-dashed my-3" />

          <!-- Payment Block -->
          <div class="bg-body-light p-3 rounded mb-3">
            <div class="d-flex align-items-center fs-sm fw-bold text-dark mb-2">
              <i class="fa fa-mobile-alt text-success me-2 fs-5"></i>
              <span>{{ receipt.payment_method }}</span>
              <span class="text-muted fw-semibold ms-2">Ref: {{ receipt.reference }}</span>
            </div>
            <div class="alert alert-success fs-xs fw-semibold p-2 mb-0 d-flex align-items-center">
              <i class="fa fa-check-circle me-2"></i>
              Payment confirmed. Patient may proceed.
            </div>
          </div>

          <hr class="border-top border-dashed my-3" />

          <!-- Footer -->
          <div class="text-center text-muted fs-xs">
            <p class="mb-1">Thank you for choosing {{ receipt.facility.name }}.</p>
            <p class="mb-3">This is an official receipt. Please keep for your records.</p>
            <div class="fs-xs letter-spacing-2 text-dark font-monospace mb-1">
              |||  ||||||  |||  |||||  |||  ||||||  |||
            </div>
            <p class="mb-0 fw-bold">{{ receipt.receipt_no }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-dashed {
  border-top-style: dashed !important;
}
@media print {
  .no-print {
    display: none !important;
  }
  .content {
    padding: 0 !important;
  }
  .receipt-card {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>
