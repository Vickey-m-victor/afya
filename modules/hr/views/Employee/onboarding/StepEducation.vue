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

const educations = ref(
  props.formData.educations?.length 
    ? [...props.formData.educations] 
    : [{
        education_level_id: null,
        institution_name: '',
        field_of_study: '',
        qualification_name: '',
        grade_gpa: '',
        start_date: '',
        completion_date: '',
        is_currently_studying: false,
        is_verified: true,
        notes: '',
      }]
);

const fieldErrors = ref({});
const isLoading = ref(false);
// Education levels are loaded lazily by LazySearchSelect.

const addRow = () => {
  educations.value.push({
    education_level_id: null,
    institution_name: '',
    field_of_study: '',
    qualification_name: '',
    grade_gpa: '',
    start_date: '',
    completion_date: '',
    is_currently_studying: false,
    is_verified: true,
    notes: '',
  });
};

const normalizeEducationForApi = (row) => {
  const toBool = (value, fallback = false) => {
    if (value === true || value === false) return value;
    if (value === null || value === undefined || value === '') return fallback;
    const s = String(value).toLowerCase();
    if (s === 'true' || s === '1' || s === 'yes') return true;
    if (s === 'false' || s === '0' || s === 'no') return false;
    return fallback;
  };

  return {
    education_level_id: row?.education_level_id ?? null,
    institution_name: row?.institution_name ?? '',
    field_of_study: row?.field_of_study ?? null,
    qualification_name: row?.qualification_name ?? '',
    grade_gpa: row?.grade_gpa ?? null,
    start_date: row?.start_date ?? null,
    completion_date: row?.completion_date ?? null,
    // These are NOT NULL in DB (per backend error) so always send booleans
    is_currently_studying: toBool(row?.is_currently_studying, false),
    is_verified: toBool(row?.is_verified, true),
    notes: row?.notes ?? null,
  };
};

const removeRow = (index) => {
  educations.value.splice(index, 1);
};

const getFieldError = (index, field) => {
  return fieldErrors.value[`educations.${index}.${field}`] 
      || fieldErrors.value[`educations[${index}].${field}`]
      || fieldErrors.value[field];
};

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;
  
  const validEducations = educations.value.filter(e =>
    e.institution_name ||
    e.qualification_name ||
    e.education_level_id ||
    e.field_of_study ||
    e.grade_gpa ||
    e.notes
  );
  
  if (validEducations.length === 0) {
      isLoading.value = false;
      return emit('next', []);
  }

  // The endpoint `/hr/employees/{id}/educations` probably expects a single object or bulk?
  // Let's assume bulk is supported or we iterate. Wait, in OpenAPI it says bulk adds education?
  // Actually, the API says "Adds an education record" and expects `EmployeeEducation` object (not array).
  // I need to loop them if it only supports one at a time.
  let successful = [];
  let hasError = false;

  for (let i = 0; i < validEducations.length; i++) {
        const item = normalizeEducationForApi(validEducations[i]);

        if (item.id) { // already added from a previous back-forward? Skip or update?
            successful.push(item);
            continue; 
        }
        
        const endpoint = `/hr/employees/${props.employeeId}/educations`;
        const { request, error } = useApi(endpoint, { method: 'POST', autoFetch: false });
        await request(item);
        
        if (error.value) {
            const parsed = parseBackendError(error.value);
            // Prefix errors with array index for UI
            for (const [key, val] of Object.entries(parsed.fieldErrors)) {
                fieldErrors.value[`educations.${i}.${key}`] = val;
            }
            if (!parsed.isValidation) {
                alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
            }
            hasError = true;
        } else {
            successful.push(item); // Note: ideally we merge with response ID
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
        <h4 class="mb-0">Education History</h4>
        <button type="button" class="btn btn-sm btn-alt-success" @click="addRow">
            <i class="fa fa-plus me-1"></i> Add Education
        </button>
    </div>
    
    <form @submit.prevent="submit">
      <div v-if="educations.length === 0" class="alert alert-info py-2">
          No records added. You can skip this step or add an institution.
      </div>
      
      <div v-for="(item, index) in educations" :key="index" class="card mb-3 border">
          <div class="card-header bg-light py-2 d-flex justify-content-between align-items-center">
              <span class="fs-sm fw-semibold">Education #{{ index + 1 }}</span>
              <button type="button" class="btn btn-sm btn-danger px-2 py-1" @click="removeRow(index)">
                  <i class="fa fa-trash"></i>
              </button>
          </div>
          <div class="card-body">
              <div class="row g-3">
                  <div class="col-md-4">
                      <label class="form-label">Level</label>
                      <LazySearchSelect
                        v-model="item.education_level_id"
                        endpoint="/hr/education-level/search"
                        placeholder="Select..."
                        :disabled="isLoading"
                        :invalid="!!getFieldError(index, 'education_level_id')"
                      />
                      <div class="invalid-feedback">{{ getFieldError(index, 'education_level_id') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Institution Name</label>
                      <input v-model="item.institution_name" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'institution_name')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'institution_name') }}</div>
                  </div>
                  <div class="col-md-4">
                      <label class="form-label">Qualification Earned</label>
                      <input v-model="item.qualification_name" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'qualification_name')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'qualification_name') }}</div>
                  </div>
                  <div class="col-md-6">
                        <label class="form-label">Field of Study</label>
                      <input v-model="item.field_of_study" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'field_of_study')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'field_of_study') }}</div>
                  </div>
                  <div class="col-md-3">
                      <label class="form-label">Start Date</label>
                      <input v-model="item.start_date" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'start_date')}">
                  </div>
                  <div class="col-md-3">
                      <label class="form-label">Completion Date</label>
                      <input v-model="item.completion_date" type="date" class="form-control" :class="{'is-invalid': getFieldError(index, 'completion_date')}">
                  </div>
                  <div class="col-md-3">
                      <label class="form-label">Grade / GPA</label>
                      <input v-model="item.grade_gpa" type="text" class="form-control" :class="{'is-invalid': getFieldError(index, 'grade_gpa')}">
                      <div class="invalid-feedback">{{ getFieldError(index, 'grade_gpa') }}</div>
                  </div>
                  <div class="col-md-3 d-flex align-items-end">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="item.is_currently_studying" :id="'studying_' + index">
                        <label class="form-check-label" :for="'studying_' + index">Currently studying</label>
                      </div>
                  </div>
                  <div class="col-md-12">
                      <label class="form-label">Notes</label>
                      <textarea v-model="item.notes" rows="2" class="form-control" :class="{'is-invalid': getFieldError(index, 'notes')}"></textarea>
                      <div class="invalid-feedback">{{ getFieldError(index, 'notes') }}</div>
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
