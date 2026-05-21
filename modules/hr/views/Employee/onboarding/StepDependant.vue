<script setup>
import { ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError } from '@/composables/useWarpHelpers';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';

// 1. IMPORT THE REPEATER COMPONENT
import FormRepeater from "@/components/DynamicForm/FormRepeater.vue"

const props = defineProps({
  formData: { type: Object, required: true },
  employeeId: { type: [Number, String], required: true }
});

const emit = defineEmits(['next', 'back', 'skip']);
const alertStore = useAlertStore();

// 2. DEFINE THE BLANK TEMPLATE
// The FormRepeater needs to know what to push when the user clicks "Add"
const blankDependent = { type: 'dependent', full_name: '', relationship_type_id: null };

const normalizeDependentForApi = (row) => {
  const relationshipTypeId = 1;
  const type = row?.type === 'dependent' || row?.type === 'next_of_kin' || row?.type === 'beneficiary' ? row.type : 'dependent';
  const beneficiaryPercentage = type === 'beneficiary' ? (row?.beneficiary_percentage ?? null) : null;
  const asLower = (value) => value ? String(value).toLowerCase() : null;
  const toNumberOrNull = (value) => Number.isFinite(Number(value)) ? Number(value) : null;

  return {
    type, full_name: row?.full_name ?? '', relationship_type_id: relationshipTypeId,
    gender: asLower(row?.gender), date_of_birth: row?.date_of_birth ?? null,
    national_id: row?.national_id ?? null, birth_certificate_number: row?.birth_certificate_number ?? null,
    phone_number: row?.phone_number ?? null, email: row?.email ?? null,
    physical_address: row?.physical_address ?? null, city_of_residence: row?.city_of_residence ?? null,
    beneficiary_percentage: toNumberOrNull(beneficiaryPercentage),
    medical_card_number: row?.medical_card_number ?? null, notes: row?.notes ?? null,
  };
};

// 3. THE ARRAY (Still managed by v-model)
const dependents = ref(
  props.formData.dependents?.length 
    ? props.formData.dependents.map(normalizeDependentForApi)
    : [{ ...blankDependent }]
);

const fieldErrors = ref({});
const isLoading = ref(false);

// NOTE: addRow() and removeRow() were DELETED! FormRepeater handles them now.

const getFieldError = (index, field) => {
  return fieldErrors.value[`dependents.${index}.${field}`] 
      || fieldErrors.value[`dependents[${index}].${field}`]
      || fieldErrors.value[field];
};

const validateDependents = (rows) => {
  const errors = {};
  rows.forEach((d, index) => {
    if (!d.type) errors[`dependents.${index}.type`] = 'Type is required';
    if (!d.full_name || !String(d.full_name).trim()) errors[`dependents.${index}.full_name`] = 'Full name is required';
    if (d.type === 'beneficiary') {
      const num = Number(d.beneficiary_percentage);
      if (!Number.isFinite(num)) errors[`dependents.${index}.beneficiary_percentage`] = 'Beneficiary percentage is required';
      else if (num < 0 || num > 100) errors[`dependents.${index}.beneficiary_percentage`] = 'Beneficiary percentage must be between 0 and 100';
    }
  });
  return errors;
};

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;
  
  const payloadDependents = dependents.value
    .filter((d) => Boolean(String(d?.full_name ?? '').trim() || String(d?.phone_number ?? '').trim() || String(d?.email ?? '').trim()))
    .map(normalizeDependentForApi);
  
  if (payloadDependents.length === 0) {
      isLoading.value = false;
      return emit('next', []);
  }

  const clientErrors = validateDependents(payloadDependents);
  if (Object.keys(clientErrors).length > 0) {
    fieldErrors.value = clientErrors;
    isLoading.value = false;
    return;
  }

  const endpoint = `/hr/employees/${props.employeeId}/dependents`;
  const { request, error } = useApi(endpoint, { method: 'POST', autoFetch: false });
  await request({ dependents: payloadDependents });
  
  isLoading.value = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    fieldErrors.value = parsed.fieldErrors;
    if (!parsed.isValidation) alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
    return;
  }
  emit('next', payloadDependents);
};
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      
      <FormRepeater
        v-model="dependents"
        :empty-row="blankDependent"
        title="Dependents, Next of Kin & Beneficiaries"
        add-button-text="Add Person"
        empty-message="No records added. You can skip this step or add a person."
      >
        <template #default="{ item, index }">
          <div class="row g-3">
              <div class="col-md-3">
                  <label class="form-label">Type</label>
                  <select v-model="item.type" class="form-select" :class="{'is-invalid': getFieldError(index, 'type')}">
                      <option value="dependent">Dependent</option>
                      <option value="next_of_kin">Next of Kin</option>
                      <option value="beneficiary">Beneficiary</option>
                  </select>
                  <div class="invalid-feedback">{{ getFieldError(index, 'type') }}</div>
              </div>
              <div class="col-md-5">
                  <label class="form-label">Full Name</label>
                  <input v-model="item.full_name" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'full_name')}">
                  <div class="invalid-feedback">{{ getFieldError(index, 'full_name') }}</div>
              </div>
              <div class="col-md-4">
                  <label class="form-label">Relationship</label>
                  <LazySearchSelect
                    v-model="item.relationship_type_id"
                    endpoint="/hr/dependent-relationship-type/search"
                    placeholder="Select..."
                    :disabled="isLoading"
                    :invalid="!!getFieldError(index, 'relationship_type_id')"
                  />
                  <div class="invalid-feedback">{{ getFieldError(index, 'relationship_type_id') }}</div>
              </div>
              
              <div class="col-md-3">
                  <label class="form-label">Phone Number</label>
                  <input v-model="item.phone_number" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'phone_number')}">
                  <div class="invalid-feedback">{{ getFieldError(index, 'phone_number') }}</div>
              </div>
              <div class="col-md-3">
                  <label class="form-label">Date of Birth</label>
                  <input v-model="item.date_of_birth" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'date_of_birth')}">
              </div>
              <div class="col-md-6">
                  <label class="form-label">Physical Address</label>
                  <input v-model="item.physical_address" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'physical_address')}">
                  <div class="invalid-feedback">{{ getFieldError(index, 'physical_address') }}</div>
              </div>
              <div class="col-md-3 align-self-end text-end" v-if="item.type === 'beneficiary'">
                  <label class="form-label d-block text-start">Beneficiary %</label>
                  <input v-model.number="item.beneficiary_percentage" type="number" min="0" max="100" class="form-control d-inline-block w-100" placeholder="e.g. 50">
              </div>
          </div>
        </template>
      </FormRepeater>

      <div class="mt-4 d-flex justify-content-between">
        <button type="button" class="btn btn-alt-secondary" @click="emit('back')">
          <i class="fa fa-arrow-left me-1"></i> Back
        </button>
        <div>
            <button type="button" class="btn btn-alt-primary me-2" @click="emit('skip')">
              Skip
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
              Save & Next <i class="fa fa-arrow-right ms-1"></i>
            </button>
        </div>
      </div>
    </form>
  </div>
</template>