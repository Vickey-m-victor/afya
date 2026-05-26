<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useApi } from '@/helpers/useApi';
import { parseBackendError, stripCrudSystemFields, withId } from '@/composables/useWarpHelpers';
import { useModalStore } from '@/stores/modal';
import { useAlertStore } from '@/stores/alert';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';

const props = defineProps({
  employeeId: { type: [String, Number], required: true },
  section: { type: String, required: true }, // about | bank | dates | family | emergency
  initialData: { type: Object, default: () => ({}) },
  onSaved: { type: Function, default: null },
});

const modalStore = useModalStore();
const alertStore = useAlertStore();

const sectionConfig = computed(() => {
  const configs = {
    about: {
      title: 'Edit About Employee',
      fields: [
        {
          key: 'facility_id',
          label: 'Facility ID',
          type: 'lazy-select',
          endpoint: '/admin/facility/search-dropdown',
          placeholder: 'Select facility...'
        },
        {
          key: 'department_id',
          label: 'Department ID',
          type: 'lazy-select',
          endpoint: '/hr/department/search',
          placeholder: 'Select department...'
        },
        {
          key: 'job_title_id',
          label: 'Job Title ID',
          type: 'lazy-select',
          endpoint: '/hr/job-title/search',
          placeholder: 'Select job title...'
        },
        {
          key: 'job_group_id',
          label: 'Job Group ID',
          type: 'lazy-select',
          endpoint: '/hr/job-group/search',
          placeholder: 'Select job group...'
        },
        {
          key: 'employment_type_id',
          label: 'Employment Type ID',
          type: 'lazy-select',
          endpoint: '/hr/employment-type/search',
          placeholder: 'Select employment type...'
        },
        {
          key: 'work_shift_id',
          label: 'Work Shift ID',
          type: 'lazy-select',
          endpoint: '/hr/work-shift/search',
          placeholder: 'Select work shift...'
        },
        {
          key: 'reports_to_employee_id',
          label: 'Reports To (Employee ID)',
          type: 'lazy-select',
          endpoint: '/hr/employee/search',
          placeholder: 'Select reporting manager...',
          valueFn: (emp) => emp?.employee_id ?? emp?.id,
          labelFn: (emp) => {
            const names = [emp?.first_name, emp?.last_name].filter(Boolean).join(' ');
            return names || emp?.email_address || emp?.text || String(emp?.employee_id ?? emp?.id ?? '');
          }
        },
      ],
    },
    bank: {
      title: 'Edit Payroll Information',
      fields: [
        { key: 'bank_name', label: 'Bank Name', type: 'text' },
        { key: 'bank_branch', label: 'Bank Branch', type: 'text' },
        { key: 'bank_account_number', label: 'Bank Account Number', type: 'text' },
        { key: 'bank_account_name', label: 'Bank Account Name', type: 'text' },
        { key: 'tax_identification_number', label: 'Tax Identification Number', type: 'text' },
        { key: 'nssf_number', label: 'NSSF Number', type: 'text' },
        { key: 'nhif_number', label: 'NHIF Number', type: 'text' },
        { key: 'pension_number', label: 'Pension Number', type: 'text' },
        {
          key: 'payment_method',
          label: 'Payment Method',
          type: 'select',
          options: [
            { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
            { value: 'CASH', label: 'Cash' },
            { value: 'MOBILE_MONEY', label: 'Mobile Money' },
            { value: 'CHEQUE', label: 'Cheque' },
          ],
        },
      ],
    },
    dates: {
      title: 'Edit Employment Dates',
      fields: [
        { key: 'hire_date', label: 'Hire Date', type: 'date' },
        { key: 'probation_end_date', label: 'Probation End Date', type: 'date' },
        { key: 'confirmation_date', label: 'Confirmation Date', type: 'date' },
        { key: 'termination_date', label: 'Termination Date', type: 'date' },
      ],
    },
    family: {
      title: 'Edit Family Information',
      fields: [
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { value: 'dependent', label: 'Dependent' },
            { value: 'next_of_kin', label: 'Next of Kin' },
            { value: 'beneficiary', label: 'Beneficiary' },
          ],
        },
        { key: 'full_name', label: 'Full Name', type: 'text' },
        {
          key: 'relationship_type_id',
          label: 'Relationship Type',
          type: 'lazy-select',
          endpoint: '/hr/dependent-relationship-type/search',
          placeholder: 'Select relationship...'
        },
        {
          key: 'gender',
          label: 'Gender',
          type: 'select',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ],
        },
        { key: 'date_of_birth', label: 'Date of Birth', type: 'date' },
        { key: 'national_id', label: 'National ID', type: 'text' },
        { key: 'birth_certificate_number', label: 'Birth Certificate Number', type: 'text' },
        { key: 'phone_number', label: 'Phone Number', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'physical_address', label: 'Physical Address', type: 'text' },
        { key: 'city_of_residence', label: 'City of Residence', type: 'text' },
        { key: 'beneficiary_percentage', label: 'Beneficiary Percentage', type: 'number' },
        { key: 'medical_card_number', label: 'Medical Card Number', type: 'text' },
        { key: 'notes', label: 'Notes', type: 'text' },
      ],
    },
    emergency: {
      title: 'Edit Emergency Contacts',
      fields: [
        { key: 'emergency_primary_name', label: 'Primary Contact Name', type: 'text' },
        { key: 'emergency_primary_phone', label: 'Primary Contact Phone', type: 'text' },
        { key: 'emergency_secondary_name', label: 'Secondary Contact Name', type: 'text' },
        { key: 'emergency_secondary_phone', label: 'Secondary Contact Phone', type: 'text' },
      ],
      hint: 'If your backend uses different field names, we can map them here.',
    },
  };

  return configs[props.section] ?? { title: 'Edit', fields: [] };
});

const form = reactive({});
const fieldErrors = ref({});
const formError = ref('');
const saving = ref(false);

watch(
  () => props.initialData,
  () => {
    fieldErrors.value = {};
    formError.value = '';
    const initialDependent = props.initialData?.dependents?.[0] || {};
    // Populate form only with fields relevant to this section
    sectionConfig.value.fields.forEach(({ key }) => {
      if (props.section === 'family') {
        if (key === 'type') {
          form[key] = initialDependent?.[key] ?? 'dependent';
          return;
        }
        form[key] = initialDependent?.[key] ?? '';
        return;
      }
      form[key] = props.initialData?.[key] ?? '';
    });
  },
  { immediate: true, deep: true }
);

const endpointPrimary = computed(() => withId('/hr/employee/{id}', props.employeeId));
const endpointFallback = computed(() => withId('/hr/employees/{id}', props.employeeId));
const payrollEndpoint = computed(() => withId('/hr/employees/{id}/payroll', props.employeeId));
const dependentsEndpoint = computed(() => withId('/hr/employees/{id}/dependents', props.employeeId));

async function save() {
  if (saving.value) return;
  saving.value = true;
  fieldErrors.value = {};
  formError.value = '';
  modalStore.setSubmitting(true);

  try {
    const keys = sectionConfig.value.fields.map((f) => f.key);
    const payload = {};
    for (const k of keys) payload[k] = form[k];

    const cleanedPayload = stripCrudSystemFields(payload);

    if (props.section === 'bank') {
      const payrollApi = useApi(payrollEndpoint.value, { method: 'POST', autoFetch: false });
      await payrollApi.request(cleanedPayload);

      if (!payrollApi.error.value) {
        alertStore.show({ theme: 'success', type: 'toast', message: 'Payroll saved successfully.' });
        if (typeof props.onSaved === 'function') await props.onSaved();
        modalStore.closeModal();
        return;
      }

      const parsed = parseBackendError(payrollApi.error.value);
      fieldErrors.value = parsed.fieldErrors;
      formError.value = parsed.message || 'Payroll request failed.';
      if (!parsed.isValidation) {
        alertStore.show({ theme: 'danger', type: 'toast', message: formError.value });
      }
      return;
    }

    if (props.section === 'family') {
      const dependentPayload = {
        type: form.type || 'dependent',
        full_name: form.full_name || '',
        relationship_type_id: form.relationship_type_id || null,
        gender: form.gender ? String(form.gender).toLowerCase() : null,
        date_of_birth: form.date_of_birth || null,
        national_id: form.national_id || null,
        birth_certificate_number: form.birth_certificate_number || null,
        phone_number: form.phone_number || null,
        email: form.email || null,
        physical_address: form.physical_address || null,
        city_of_residence: form.city_of_residence || null,
        beneficiary_percentage: form.beneficiary_percentage === '' || form.beneficiary_percentage === null
          ? null
          : Number(form.beneficiary_percentage),
        medical_card_number: form.medical_card_number || null,
        notes: form.notes || null,
      };

      const dependentsApi = useApi(dependentsEndpoint.value, { method: 'POST', autoFetch: false });
      await dependentsApi.request({ dependents: [dependentPayload] });

      if (!dependentsApi.error.value) {
        alertStore.show({ theme: 'success', type: 'toast', message: 'Dependent saved successfully.' });
        if (typeof props.onSaved === 'function') await props.onSaved();
        modalStore.closeModal();
        return;
      }

      const parsed = parseBackendError(dependentsApi.error.value);
      fieldErrors.value = parsed.fieldErrors;
      formError.value = parsed.message || 'Dependents request failed.';
      if (!parsed.isValidation) {
        alertStore.show({ theme: 'danger', type: 'toast', message: formError.value });
      }
      return;
    }

    const doPut = async (url) => {
      const api = useApi(url, { method: 'PUT', autoFetch: false });
      await api.request(cleanedPayload);
      return api.error.value;
    };

    const err1 = await doPut(endpointPrimary.value);
    if (!err1) {
      alertStore.show({ theme: 'success', type: 'toast', message: 'Saved successfully.' });
      if (typeof props.onSaved === 'function') await props.onSaved();
      modalStore.closeModal();
      return;
    }

    const err2 = await doPut(endpointFallback.value);
    if (!err2) {
      alertStore.show({ theme: 'success', type: 'toast', message: 'Saved successfully.' });
      if (typeof props.onSaved === 'function') await props.onSaved();
      modalStore.closeModal();
      return;
    }

    const parsed = parseBackendError(err2 ?? err1);
    fieldErrors.value = parsed.fieldErrors;
    formError.value = parsed.message || 'Request failed.';
    if (!parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', message: formError.value });
    }
  } finally {
    saving.value = false;
    modalStore.setSubmitting(false);
  }
}

function errorFor(key) {
  const value = fieldErrors.value?.[key];
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}
</script>

<template>
  <div>
    <div v-if="sectionConfig.hint" class="alert alert-info mb-3">
      {{ sectionConfig.hint }}
    </div>

    <div v-if="formError" class="alert alert-danger mb-3">
      {{ formError }}
    </div>

    <form @submit.prevent="save">
      <div class="row g-3">
        <div
          v-for="field in sectionConfig.fields"
          :key="field.key"
          class="col-md-6"
        >
          <label class="form-label" :for="`field-${field.key}`">{{ field.label }}</label>
          <LazySearchSelect
            v-if="field.type === 'lazy-select'"
            :id="`field-${field.key}`"
            v-model="form[field.key]"
            :endpoint="field.endpoint"
            :placeholder="field.placeholder || 'Select...'"
            :value-fn="field.valueFn"
            :label-fn="field.labelFn"
            :invalid="!!errorFor(field.key)"
            :disabled="saving"
          />
          <input
            v-else-if="field.type !== 'select'"
            :id="`field-${field.key}`"
            v-model="form[field.key]"
            :type="field.type"
            class="form-control"
            :class="{ 'is-invalid': errorFor(field.key) }"
            :disabled="saving"
          />
          <select
            v-else
            :id="`field-${field.key}`"
            v-model="form[field.key]"
            class="form-select"
            :class="{ 'is-invalid': errorFor(field.key) }"
            :disabled="saving"
          >
            <option value="">Select...</option>
            <option
              v-for="opt in field.options || []"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
          <div v-if="errorFor(field.key)" class="invalid-feedback">{{ errorFor(field.key) }}</div>
        </div>
      </div>

      <div class="text-end mt-4">
        <button type="button" class="btn btn-light me-2" :disabled="saving" @click="modalStore.closeModal()">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="saving">
          <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
          {{ saving ? 'Saving...' : 'Save changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

