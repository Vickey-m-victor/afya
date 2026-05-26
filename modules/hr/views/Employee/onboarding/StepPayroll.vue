<script setup>
import { ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError, stripCrudSystemFields } from '@/composables/useWarpHelpers';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  employeeId: {
    type: [Number, String],
    required: true
  }
});

const emit = defineEmits(['next', 'back']);
const alertStore = useAlertStore();

const localForm = ref({ ...props.formData.payroll });
const fieldErrors = ref({});
const isLoading = ref(false);

function hasExistingPayrollProfile() {
  return !!(props.formData.payroll && Object.keys(props.formData.payroll).length && props.formData.payroll.employee_id);
}

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;

  if (hasExistingPayrollProfile()) {
    isLoading.value = false;
    emit('next', localForm.value);
    return;
  }
  
  const payload = stripCrudSystemFields(localForm.value);
  const endpoint = `/hr/employees/${props.employeeId}/payroll`;
  
  // Payroll is usually a POST for creating the profile or an upsert
  const { request, error } = useApi(endpoint, { method: 'POST', autoFetch: false });
  await request(payload);
  
  isLoading.value = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    fieldErrors.value = parsed.fieldErrors;
    if (!parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
    }
    return;
  }
  
  emit('next', localForm.value);
};
</script>

<template>
  <div>
    <h4 class="mb-4">Payroll & Statutory Information</h4>
    <form @submit.prevent="submit">
      <div class="row g-4">
        <!-- Banking -->
        <div class="col-md-6">
          <label class="form-label">Bank Name</label>
          <input v-model="localForm.bank_name" type="text" class="form-control" :class="{'is-invalid': fieldErrors.bank_name}">
          <div class="invalid-feedback">{{ fieldErrors.bank_name }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Bank Branch</label>
          <input v-model="localForm.bank_branch" type="text" class="form-control" :class="{'is-invalid': fieldErrors.bank_branch}">
          <div class="invalid-feedback">{{ fieldErrors.bank_branch }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Account Number</label>
          <input v-model="localForm.bank_account_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.bank_account_number}">
          <div class="invalid-feedback">{{ fieldErrors.bank_account_number }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Account Name</label>
          <input v-model="localForm.bank_account_name" type="text" class="form-control" :class="{'is-invalid': fieldErrors.bank_account_name}">
          <div class="invalid-feedback">{{ fieldErrors.bank_account_name }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Payment Method</label>
          <select v-model="localForm.payment_method" class="form-select" :class="{'is-invalid': fieldErrors.payment_method}">
            <option value="">Select Method...</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="MOBILE">Mobile Money</option>
            <option value="CASH">Cash</option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.payment_method }}</div>
        </div>

        <div class="col-md-12"><hr></div>

        <!-- Statutory -->
        <div class="col-md-6">
          <label class="form-label">Tax ID Number (KRA PIN)</label>
          <input v-model="localForm.tax_identification_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.tax_identification_number}">
          <div class="invalid-feedback">{{ fieldErrors.tax_identification_number }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">NSSF Number</label>
          <input v-model="localForm.nssf_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.nssf_number}">
          <div class="invalid-feedback">{{ fieldErrors.nssf_number }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">NHIF Number</label>
          <input v-model="localForm.nhif_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.nhif_number}">
          <div class="invalid-feedback">{{ fieldErrors.nhif_number }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Pension Number</label>
          <input v-model="localForm.pension_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.pension_number}">
          <div class="invalid-feedback">{{ fieldErrors.pension_number }}</div>
        </div>
      </div>
      
      <div class="mt-4 d-flex justify-content-between">
        <button type="button" class="btn btn-alt-secondary" @click="emit('back')">
          <i class="fa fa-arrow-left me-1"></i> Back
        </button>
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
          Next Step <i class="fa fa-arrow-right ms-1"></i>
        </button>
      </div>
    </form>
  </div>
</template>
