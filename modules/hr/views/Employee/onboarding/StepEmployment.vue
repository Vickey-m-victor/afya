<script setup>
import { ref } from 'vue';
import axiosInstance from '@/helpers/axiosInstance';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError, stripCrudSystemFields, handleResponseAlert } from '@/composables/useWarpHelpers';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  employeeId: {
    type: [Number, String],
    default: null
  }
});

const emit = defineEmits(['next', 'back']);
const alertStore = useAlertStore();

const localForm = ref({ ...props.formData.employee });
const fieldErrors = ref({});
const isLoading = ref(false);

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;

  const employeeData = stripCrudSystemFields(localForm.value);
  // Auto-inject dummy status to bypass backend validation rule before backend overwrites it
  if (!employeeData.employment_status_id) employeeData.employment_status_id = 1;

  const payload = {
    profile: props.formData.profile,
    employee: employeeData
  };

  const isUpdate = !!props.employeeId;
  const endpoint = isUpdate ? `/hr/employee/${props.employeeId}` : '/hr/employee';
  const method   = isUpdate ? 'PUT' : 'POST';
  const requestPayload = isUpdate ? employeeData : payload;

  let apiResponse = null;
  let apiError = null;
  try {
    apiResponse = await axiosInstance({
      method,
      url: endpoint,
      data: requestPayload,
    });
  } catch (err) {
    apiError = err;
  }

  isLoading.value = false;

  if (apiError) {
    const parsed = parseBackendError(apiError.response?.data || apiError);
    fieldErrors.value = parsed.fieldErrors;
    
    // If validation fails on Step 1 profile fields, they won't be visible here, so we must show an alert
    const profileErrorKeys = ['first_name', 'last_name', 'email_address', 'mobile_number', 'national_id'];
    const hasProfileErrors = profileErrorKeys.some(key => parsed.fieldErrors[key]);
    
    if (!parsed.isValidation || hasProfileErrors) {
      alertStore.show({ 
        theme: 'danger', 
        type: 'toast', 
        message: hasProfileErrors ? 'Personal Information is incomplete. Please go back to Step 1.' : (parsed.message || 'Request failed.')
      });
    }
    return;
  }

  const responseData = apiResponse?.data?.dataPayload?.data || {};
  const newEmployeeId = responseData.employee_id || props.employeeId;

  if (!isUpdate) {
    handleResponseAlert(
      alertStore,
      apiResponse?.data,
      'Draft employee created successfully.'
    );
  }

  emit('next', { ...localForm.value, employee_id: newEmployeeId });
};
</script>

<template>
  <div>
    <h4 class="mb-1">Employment Details</h4>
    <p class="text-muted fs-sm mb-4">Set up the employee's role, reporting structure, and employment conditions.</p>

    <form @submit.prevent="submit">
      <div class="row g-4">

        <!-- Facility -->
        <div class="col-md-6">
          <label class="form-label">Facility ID</label>
          <LazySearchSelect
            v-model="localForm.facility_id"
            endpoint="/admin/facility/search-dropdown"
            placeholder="Select Facility..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.facility_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.facility_id }}</div>
        </div>

        <!-- Department -->
        <div class="col-md-6">
          <label class="form-label">Department</label>
          <LazySearchSelect
            v-model="localForm.department_id"
            endpoint="/hr/department/search"
            placeholder="Select Department..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.department_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.department_id }}</div>
        </div>

        <!-- Job Title -->
        <div class="col-md-6">
          <label class="form-label">Job Title</label>
          <LazySearchSelect
            v-model="localForm.job_title_id"
            endpoint="/hr/job-title/search"
            placeholder="Select Title..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.job_title_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.job_title_id }}</div>
        </div>

        <!-- Job Group -->
        <div class="col-md-6">
          <label class="form-label">Job Group</label>
          <LazySearchSelect
            v-model="localForm.job_group_id"
            endpoint="/hr/job-group/search"
            placeholder="Select Group..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.job_group_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.job_group_id }}</div>
        </div>

        <!-- Employment Type -->
        <div class="col-md-6">
          <label class="form-label">Employment Type</label>
          <LazySearchSelect
            v-model="localForm.employment_type_id"
            endpoint="/hr/employment-type/search"
            placeholder="Select Type..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.employment_type_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.employment_type_id }}</div>
        </div>



        <!-- Residential Status -->
        <div class="col-md-6">
          <label class="form-label">Residential Status</label>
          <LazySearchSelect
            v-model="localForm.residential_status_id"
            endpoint="/hr/residential-status/search"
            placeholder="Select Residential Status..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.residential_status_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.residential_status_id }}</div>
        </div>

        <!-- Work Shift -->
        <div class="col-md-6">
          <label class="form-label">Work Shift</label>
          <LazySearchSelect
            v-model="localForm.work_shift_id"
            endpoint="/hr/work-shift/search"
            placeholder="Select Shift..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.work_shift_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.work_shift_id }}</div>
        </div>

        <!-- Worker Union -->
        <div class="col-md-6">
          <label class="form-label">Worker Union</label>
          <LazySearchSelect
            v-model="localForm.worker_union_id"
            endpoint="/hr/worker-union/search"
            placeholder="Select Union..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.worker_union_id"
          />
          <div class="invalid-feedback">{{ fieldErrors.worker_union_id }}</div>
        </div>

        <!-- Manager (Reports To) -->
        <div class="col-md-6">
          <label class="form-label">Manager (Reports To)</label>
          <LazySearchSelect
            v-model="localForm.reports_to_employee_id"
            endpoint="/hr/employee/search"
            placeholder="Select Manager..."
            :disabled="isLoading"
            :invalid="!!fieldErrors.reports_to_employee_id"
            :value-fn="(emp) => emp?.employee_id ?? emp?.id"
            :label-fn="(emp) => {
              const names = [emp?.first_name, emp?.last_name].filter(Boolean).join(' ');
              return names || emp?.email_address || emp?.text || String(emp?.employee_id ?? emp?.id ?? '');
            }"
          />
          <div class="invalid-feedback">{{ fieldErrors.reports_to_employee_id }}</div>
        </div>

        <!-- Divider -->
        <div class="col-12"><hr class="my-1"></div>

        <!-- Hire Date -->
        <div class="col-md-4">
          <label class="form-label">Hire Date</label>
          <input v-model="localForm.hire_date" type="date" class="form-control" :class="{'is-invalid': fieldErrors.hire_date}">
          <div class="invalid-feedback">{{ fieldErrors.hire_date }}</div>
        </div>

        <!-- Probation End Date -->
        <div class="col-md-4">
          <label class="form-label">Probation End Date</label>
          <input v-model="localForm.probation_end_date" type="date" class="form-control" :class="{'is-invalid': fieldErrors.probation_end_date}">
          <div class="invalid-feedback">{{ fieldErrors.probation_end_date }}</div>
        </div>

        <!-- Confirmation Date -->
        <div class="col-md-4">
          <label class="form-label">Confirmation Date</label>
          <input v-model="localForm.confirmation_date" type="date" class="form-control" :class="{'is-invalid': fieldErrors.confirmation_date}">
          <div class="invalid-feedback">{{ fieldErrors.confirmation_date }}</div>
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
