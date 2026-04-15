<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useApi } from '@/helpers/useApi';
import { parseBackendError, stripCrudSystemFields, withId } from '@/composables/useWarpHelpers';
import { useModalStore } from '@/stores/modal';
import { useAlertStore } from '@/stores/alert';

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
        { key: 'facility_id', label: 'Facility ID', type: 'number' },
        { key: 'department_id', label: 'Department ID', type: 'number' },
        { key: 'job_title_id', label: 'Job Title ID', type: 'number' },
        { key: 'job_group_id', label: 'Job Group ID', type: 'number' },
        { key: 'employment_type_id', label: 'Employment Type ID', type: 'number' },
        { key: 'work_shift_id', label: 'Work Shift ID', type: 'number' },
        { key: 'reports_to_employee_id', label: 'Reports To (Employee ID)', type: 'number' },
      ],
    },
    bank: {
      title: 'Edit Bank Information',
      fields: [
        { key: 'bank_name', label: 'Bank Name', type: 'text' },
        { key: 'bank_account_number', label: 'Bank Account No', type: 'text' },
        { key: 'bank_branch', label: 'Bank Branch', type: 'text' },
        { key: 'bank_code', label: 'Bank Code', type: 'text' },
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
        { key: 'spouse_name', label: 'Spouse Name', type: 'text' },
        { key: 'number_of_children', label: 'No. of Children', type: 'number' },
        { key: 'next_of_kin', label: 'Next of Kin', type: 'text' },
        { key: 'next_of_kin_relationship', label: 'Relationship', type: 'text' },
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
    // Populate form only with fields relevant to this section
    sectionConfig.value.fields.forEach(({ key }) => {
      form[key] = props.initialData?.[key] ?? '';
    });
  },
  { immediate: true, deep: true }
);

const endpointPrimary = computed(() => withId('/hr/employee/{id}', props.employeeId));
const endpointFallback = computed(() => withId('/hr/employees/{id}', props.employeeId));

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
          <input
            :id="`field-${field.key}`"
            v-model="form[field.key]"
            :type="field.type"
            class="form-control"
            :class="{ 'is-invalid': errorFor(field.key) }"
            :disabled="saving"
          />
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

