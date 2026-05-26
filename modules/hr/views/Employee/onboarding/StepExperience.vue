<script setup>
import { ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError } from '@/composables/useWarpHelpers';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';

const props = defineProps({
  formData: { type: Object, required: true },
  employeeId: { type: [Number, String], required: true }
});

const emit = defineEmits(['next', 'back', 'skip']);
const alertStore = useAlertStore();

const experiences = ref(
  props.formData.experiences?.length 
    ? [...props.formData.experiences] 
    : [{ employer_name: '', employer_type_id: null, job_title: '', department: '', start_date: '', end_date: '', is_current_employer: false }]
);

const fieldErrors = ref({});
const isLoading = ref(false);
// Employer types are loaded lazily by LazySearchSelect.

const addRow = () => {
  experiences.value.push({ employer_name: '', employer_type_id: null, job_title: '', department: '', start_date: '', end_date: '', is_current_employer: false });
};

const removeRow = (index) => {
  experiences.value.splice(index, 1);
};

const getFieldError = (index, field) => {
  return fieldErrors.value[`experiences.${index}.${field}`] 
      || fieldErrors.value[`experiences[${index}].${field}`]
      || fieldErrors.value[field];
};

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;
  
  const validExperiences = experiences.value.filter(e => e.employer_name || e.job_title);
  
  if (validExperiences.length === 0) {
      isLoading.value = false;
      return emit('next', []);
  }

  let successful = [];
  let hasError = false;

  for (let i = 0; i < validExperiences.length; i++) {
        const item = validExperiences[i];
        if (item.id) {
            successful.push(item);
            continue; 
        }
        
        const endpoint = `/hr/employees/${props.employeeId}/experiences`;
        const { request, error } = useApi(endpoint, { method: 'POST', autoFetch: false });
        await request(item);
        
        if (error.value) {
            const parsed = parseBackendError(error.value);
            for (const [key, val] of Object.entries(parsed.fieldErrors)) {
                fieldErrors.value[`experiences.${i}.${key}`] = val;
            }
            if (!parsed.isValidation) {
                alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
            }
            hasError = true;
        } else {
            successful.push(item);
        }
  }
  
  isLoading.value = false;

  if (hasError) return;
  emit('next', successful);
};
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Previous Work Experience</h4>
        <button type="button" class="btn btn-sm btn-alt-success" @click="addRow">
            <i class="fa fa-plus me-1"></i> Add Experience
        </button>
    </div>
    
    <form @submit.prevent="submit">
      <div v-if="experiences.length === 0" class="alert alert-info py-2">
          No records added. You can skip this step or add an employer.
      </div>
      
      <div v-for="(item, index) in experiences" :key="index" class="card mb-3 border">
          <div class="card-header bg-light py-2 d-flex justify-content-between align-items-center">
              <span class="fs-sm fw-semibold">Employer #{{ index + 1 }}</span>
              <button type="button" class="btn btn-sm btn-danger px-2 py-1" @click="removeRow(index)">
                  <i class="fa fa-trash"></i>
              </button>
          </div>
          <div class="card-body">
              <div class="row g-3">
                  <div class="col-md-5">
                      <label class="form-label">Employer Name</label>
                      <input v-model="item.employer_name" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'employer_name')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'employer_name') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Employer Type</label>
                      <LazySearchSelect
                        v-model="item.employer_type_id"
                        endpoint="/hr/employer-type/search"
                        placeholder="Select..."
                        :disabled="isLoading"
                        :invalid="!!getFieldError(index, 'employer_type_id')"
                      />
                      <div class="invalid-feedback">{{ getFieldError(index, 'employer_type_id') }}</div>
                  </div>

                  <div class="col-md-3">
                      <label class="form-label">Job Title</label>
                      <input v-model="item.job_title" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'job_title')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'job_title') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Department</label>
                      <input v-model="item.department" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'department')}">
                  </div>
                  
                  <div class="col-md-3">
                      <label class="form-label">Start Date</label>
                      <input v-model="item.start_date" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'start_date')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'start_date') }}</div>
                  </div>
                  <div class="col-md-3">
                      <label class="form-label">End Date</label>
                      <input v-model="item.end_date" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'end_date')}" :disabled="item.is_current_employer">
                  </div>
                  
                  <div class="col-md-6 pt-4 d-flex align-items-center">
                      <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" v-model="item.is_current_employer" :id="'current_' + index">
                          <label class="form-check-label" :for="'current_' + index">I currently work here</label>
                      </div>
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
