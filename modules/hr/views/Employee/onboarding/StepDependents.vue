<script setup>
import { ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError } from '@/composables/useWarpHelpers';

const props = defineProps({
  formData: { type: Object, required: true },
  employeeId: { type: [Number, String], required: true }
});

const emit = defineEmits(['next', 'back', 'skip']);
const alertStore = useAlertStore();

// Init with one blank row if empty
const dependents = ref(
  props.formData.dependents?.length 
    ? [...props.formData.dependents] 
    : [{ type: 'dependent', full_name: '', relationship_type_id: null }]
);

const fieldErrors = ref({});
const isLoading = ref(false);
const { data: relData } = useApi('/hr/dependent-relationship-type/search', { autoFetch: true, autoAlert: false });

const getRelTypes = () => relData.value?.dataPayload?.data || [];

const addRow = () => {
  dependents.value.push({ type: 'dependent', full_name: '', relationship_type_id: null });
};

const removeRow = (index) => {
  dependents.value.splice(index, 1);
};

const getFieldError = (index, field) => {
  return fieldErrors.value[`dependents.${index}.${field}`] 
      || fieldErrors.value[`dependents[${index}].${field}`]
      || fieldErrors.value[field];
};

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;
  
  // Clean empty rows if they submitted a single empty row by accident
  const payloadDependents = dependents.value.filter(d => d.full_name || d.relationship_type_id || d.phone_number);
  
  if (payloadDependents.length === 0) {
      isLoading.value = false;
      return emit('next', []);
  }

  const endpoint = `/hr/employees/${props.employeeId}/dependents`;
  const { request, error } = useApi(endpoint, { method: 'POST', autoFetch: false });
  // The API expects { dependents: [...] }
  await request({ dependents: payloadDependents });
  
  isLoading.value = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    fieldErrors.value = parsed.fieldErrors;
    if (!parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
    }
    return;
  }
  
  emit('next', payloadDependents);
};
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Dependents, Next of Kin & Beneficiaries</h4>
        <button type="button" class="btn btn-sm btn-alt-success" @click="addRow">
            <i class="fa fa-plus me-1"></i> Add Person
        </button>
    </div>
    
    <form @submit.prevent="submit">
      <div v-if="dependents.length === 0" class="alert alert-info py-2">
          No records added. You can skip this step or add a person.
      </div>
      
      <div v-for="(item, index) in dependents" :key="index" class="card mb-3 border">
          <div class="card-header bg-light py-2 d-flex justify-content-between align-items-center">
              <span class="fs-sm fw-semibold">Record #{{ index + 1 }}</span>
              <button type="button" class="btn btn-sm btn-danger px-2 py-1" @click="removeRow(index)">
                  <i class="fa fa-trash"></i>
              </button>
          </div>
          <div class="card-body">
              <div class="row g-3">
                  <div class="col-md-3">
                      <label class="form-label">Type <span class="text-danger">*</span></label>
                      <select v-model="item.type" class="form-select" :class="{'is-invalid': getFieldError(index, 'type')}">
                          <option value="dependent">Dependent</option>
                          <option value="next_of_kin">Next of Kin</option>
                          <option value="beneficiary">Beneficiary</option>
                      </select>
                      <div class="invalid-feedback">{{ getFieldError(index, 'type') }}</div>
                  </div>
                  <div class="col-md-5">
                      <label class="form-label">Full Name <span class="text-danger">*</span></label>
                      <input v-model="item.full_name" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'full_name')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'full_name') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Relationship <span class="text-danger">*</span></label>
                      <select v-model.number="item.relationship_type_id" class="form-select" :class="{'is-invalid': getFieldError(index, 'relationship_type_id')}">
                          <option :value="null">Select...</option>
                          <option v-for="rel in getRelTypes()" :key="rel.id" :value="rel.id">{{ rel.relationship_name || rel.name || rel.text }}</option>
                      </select>
                      <div class="invalid-feedback">{{ getFieldError(index, 'relationship_type_id') }}</div>
                  </div>
                  
                  <!-- Optional fields -->
                  <div class="col-md-3">
                      <label class="form-label">Phone Number</label>
                      <input v-model="item.phone_number" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'phone_number')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'phone_number') }}</div>
                  </div>
                  <div class="col-md-3">
                      <label class="form-label">Date of Birth</label>
                      <input v-model="item.date_of_birth" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'date_of_birth')}">
                  </div>
                  <div class="col-md-3 align-self-end text-end" v-if="item.type === 'beneficiary'">
                      <label class="form-label d-block text-start">Beneficiary %</label>
                      <input v-model.number="item.beneficiary_percentage" type="number" min="0" max="100" class="form-control d-inline-block w-100" placeholder="e.g. 50">
                  </div>
              </div>
          </div>
      </div>
      
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
