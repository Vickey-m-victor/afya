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

function methodIcon(m) {
  return {
    mpesa: "fa fa-mobile-alt",
    cash: "fa fa-money-bill-wave",
    card: "fa fa-credit-card",
    insurance: "fa fa-shield-alt",
  }[m];
}

function methodLabel(m) {
  return {
    mpesa: "M-Pesa",
    cash: "Cash",
    card: "Card",
    insurance: "Insurance",
  }[m];
}

function methodClass(m) {
  return {
    mpesa: "btn-success",
    cash: "btn-primary",
    card: "btn-warning",
    insurance: "btn-info",
  }[m];
}
</script>

<template>
  <BasePageHeading title="Invoice &amp; Payment" :subtitle="`${invoice.invoice_id} · Encounter #${encounterId}`">
    <template #extra>
      <RouterLink :to="{ name: 'billing/queue' }" class="btn btn-sm btn-alt-secondary">
        <i class="fa fa-arrow-left me-1"></i> Back to Queue
      </RouterLink>
    </template>
  </BasePageHeading>

  <div class="content">
    <div class="row">
      <!-- Line Items -->
      <div class="col-lg-8 mb-4">
        <BaseBlock title="Bill Items" header-bg class="mb-0">
          <template #options>
            <span class="badge bg-primary">{{ invoice.items.length }} items</span>
          </template>

          <div class="table-responsive">
            <table class="table table-vcenter table-hover table-striped table-borderless mb-0">
              <thead>
                <tr class="text-uppercase fs-xs">
                  <th class="fw-bold">Description</th>
                  <th class="fw-bold">Category</th>
                  <th class="fw-bold text-end" style="width: 120px;">Unit Price</th>
                  <th class="fw-bold text-end" style="width: 140px;">Scheme Covers</th>
                  <th class="fw-bold text-end" style="width: 120px;">Patient Pays</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in invoice.items" :key="item.id">
                  <td class="fw-semibold fs-sm text-dark">{{ item.description }}</td>
                  <td>
                    <span
                      class="badge"
                      :style="{ background: categoryColor(item.category) + '15', color: categoryColor(item.category) }"
                    >
                      {{ categoryLabel(item.category) }}
                    </span>
                  </td>
                  <td class="text-end fw-semibold fs-sm text-dark">KES {{ fmt(item.unit_price) }}</td>
                  <td class="text-end text-purple fs-sm">
                    {{ item.covered_by_scheme > 0 ? '- KES ' + fmt(item.covered_by_scheme) : '—' }}
                  </td>
                  <td class="text-end fw-bold fs-sm text-dark">
                    KES {{ fmt(Math.max(0, item.unit_price - item.covered_by_scheme)) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div class="block-content block-content-full bg-body-light border-top mt-4">
            <div class="row justify-content-end">
              <div class="col-sm-6 col-md-5 col-lg-6 col-xl-5">
                <div class="d-flex justify-content-between py-1 fs-sm">
                  <span class="text-muted fw-semibold">Subtotal</span>
                  <span class="fw-bold text-dark">KES {{ fmt(subtotal) }}</span>
                </div>
                <div class="d-flex justify-content-between py-1 fs-sm text-purple">
                  <span class="fw-semibold">
                    <i class="fa fa-shield-alt me-1"></i>{{ invoice.payment_scheme }} Covers
                  </span>
                  <span class="fw-bold">- KES {{ fmt(schemeCovers) }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-top my-1">
                  <div class="d-flex align-items-center">
                    <span class="text-muted fs-sm fw-semibold me-2">Discount</span>
                    <div class="input-group input-group-sm" style="width: 80px;">
                      <input v-model.number="discountPercent" type="number" min="0" max="100" class="form-control text-center" />
                      <span class="input-group-text">%</span>
                    </div>
                  </div>
                  <span class="text-danger fw-bold fs-sm">- KES {{ fmt(totalDiscount) }}</span>
                </div>
                <div class="d-flex justify-content-between py-2 fs-5">
                  <span class="fw-bold text-dark">Total Due</span>
                  <span class="fw-bold text-primary">KES {{ fmt(totalDue) }}</span>
                </div>
              </div>
            </div>
          </div>
        </BaseBlock>
      </div>

      <!-- Payment Panel -->
      <div class="col-lg-4">
        <!-- Patient Details Summary Block -->
        <BaseBlock title="Patient Info" header-bg class="mb-4">
          <div class="d-flex align-items-center py-2">
            <div class="item item-circle bg-primary text-white fw-bold me-3" style="width: 44px; height: 44px;">
              {{ invoice.patient.name.charAt(0) }}
            </div>
            <div>
              <h4 class="fs-sm fw-bold text-dark mb-1">{{ invoice.patient.name }}</h4>
              <p class="fs-xs text-primary mb-1">{{ invoice.patient.mrn }}</p>
              <p class="fs-xs text-muted mb-0">{{ invoice.patient.age }} · {{ invoice.patient.gender }}</p>
            </div>
          </div>
        </BaseBlock>

        <!-- Collect Payment Form -->
        <BaseBlock title="Collect Payment" header-bg class="mb-0">
          <!-- Method Selection grid -->
          <div class="row g-2 mb-3">
            <div class="col-6" v-for="method in ['mpesa', 'cash', 'card', 'insurance']" :key="method">
              <button
                type="button"
                class="btn w-100 text-start py-2 fs-xs fw-semibold"
                :class="paymentMethod === method ? methodClass(method) : 'btn-alt-secondary'"
                @click="paymentMethod = method"
              >
                <i :class="methodIcon(method)" class="me-1"></i>
                {{ methodLabel(method) }}
              </button>
            </div>
          </div>

          <!-- Form contents based on method -->
          <!-- M-Pesa -->
          <div v-if="paymentMethod === 'mpesa'" class="mb-3">
            <label class="form-label fs-xs fw-bold text-uppercase text-muted">M-Pesa Phone Number</label>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text">🇰🇪</span>
              <input v-model="mpesaPhone" type="text" class="form-control" placeholder="2547XXXXXXXX" />
            </div>
            <div class="bg-body-light p-3 rounded mb-3 d-flex justify-content-between align-items-center">
              <span class="fs-xs fw-semibold text-muted">Amount to push</span>
              <span class="fs-5 fw-bold text-dark">KES {{ fmt(totalDue) }}</span>
            </div>
            <p class="fs-xs text-muted mb-0 leading-relaxed">
              An STK push prompt will be sent to the patient's phone. Please wait and confirm approval.
            </p>
          </div>

          <!-- Cash -->
          <div v-else-if="paymentMethod === 'cash'" class="mb-3">
            <div class="bg-body-light p-3 rounded mb-3 d-flex justify-content-between align-items-center">
              <span class="fs-xs fw-semibold text-muted">Total Due</span>
              <span class="fs-5 fw-bold text-dark">KES {{ fmt(totalDue) }}</span>
            </div>
            <label class="form-label fs-xs fw-bold text-uppercase text-muted">Cash Tendered</label>
            <input v-model="cashTendered" type="number" class="form-control form-control-sm mb-3" placeholder="Enter cash received" />
            <div v-if="cashChange > 0" class="alert alert-success fs-xs fw-semibold p-2 mb-0 d-flex align-items-center">
              <i class="fa fa-coins me-2"></i>Change: <strong class="ms-1">KES {{ fmt(cashChange) }}</strong>
            </div>
          </div>

          <!-- Card -->
          <div v-else-if="paymentMethod === 'card'" class="mb-3">
            <div class="bg-body-light p-3 rounded mb-3 d-flex justify-content-between align-items-center">
              <span class="fs-xs fw-semibold text-muted">Card Charge</span>
              <span class="fs-5 fw-bold text-dark">KES {{ fmt(totalDue) }}</span>
            </div>
            <label class="form-label fs-xs fw-bold text-uppercase text-muted">POS Reference / Approval Code</label>
            <input type="text" class="form-control form-control-sm" placeholder="Enter POS approval code" />
          </div>

          <!-- Insurance -->
          <div v-else class="mb-3">
            <div class="bg-body-light p-3 rounded mb-3 d-flex justify-content-between align-items-center">
              <span class="fs-xs fw-semibold text-muted">Claim Amount</span>
              <span class="fs-5 fw-bold text-dark">KES {{ fmt(totalDue) }}</span>
            </div>
            <div class="mb-2">
              <label class="form-label fs-xs fw-bold text-uppercase text-muted">Member ID / Claim Number</label>
              <input type="text" class="form-control form-control-sm" placeholder="e.g. NHIF-000123456" />
            </div>
            <div>
              <label class="form-label fs-xs fw-bold text-uppercase text-muted">Authorization Code</label>
              <input type="text" class="form-control form-control-sm" placeholder="Pre-auth code from insurer" />
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="border-top pt-3 mt-3">
            <button
              class="btn btn-primary w-100 py-2 fs-sm fw-bold mb-2"
              :disabled="processingPayment || totalDue <= 0"
              @click="confirmPayment"
            >
              <span v-if="processingPayment"><i class="fa fa-spinner fa-spin me-2"></i>Processing…</span>
              <span v-else><i class="fa fa-check-circle me-2"></i>Confirm Payment · KES {{ fmt(totalDue) }}</span>
            </button>

            <button class="btn btn-sm btn-alt-danger w-100 fw-bold">
              <i class="fa fa-percent me-1"></i>Apply Waiver / Write-off
            </button>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No custom scoped CSS needed as standard Bootstrap 5 and OneUI utilities are utilized. */
</style>
