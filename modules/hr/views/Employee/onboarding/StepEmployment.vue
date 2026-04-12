<script setup>
import { ref, onMounted } from 'vue';
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
    default: null
  }
});

const emit = defineEmits(['next', 'back']);
const alertStore = useAlertStore();

const localForm = ref({ ...props.formData.employee });
const fieldErrors = ref({});
const isLoading = ref(false);

const options = ref({
  departments: [],
  jobTitles: [],
  jobGroups: [],
  employmentTypes: [],
  employmentStatuses: [],
  residentialStatuses: [],
  workShifts: [],
  workerUnions: [],
  employees: []
});

const { batchRequest } = useApi('', { autoFetch: false });

onMounted(async () => {
  const results = await batchRequest([
    { url: '/hr/department/search',           requestName: 'departments' },
    { url: '/hr/job-title/search',            requestName: 'jobTitles' },
    { url: '/hr/job-group/search',            requestName: 'jobGroups' },
    { url: '/hr/employment-type/search',      requestName: 'employmentTypes' },
    { url: '/hr/employment-status/search',    requestName: 'employmentStatuses' },
    { url: '/hr/residential-status/search',   requestName: 'residentialStatuses' },
    { url: '/hr/work-shift/search',           requestName: 'workShifts' },
    { url: '/hr/worker-union/search',         requestName: 'workerUnions' },
    { url: '/hr/employee/search',             requestName: 'employees' },
  ], { autoAlert: false });

  results.forEach(res => {
    if (res.success && res.data?.dataPayload?.data) {
      options.value[res.requestName] = res.data.dataPayload.data;
    }
  });
});

// Resolve the label for each dropdown item based on known field names
const getOptionLabel = (opt, type) => {
  if (!opt) return 'Unknown';
  if (opt.text) return opt.text;
  const map = {
    departments:        opt.department_name,
    jobTitles:          opt.job_title_name,
    jobGroups:          opt.job_group_name,
    employmentTypes:    opt.employment_type_name,
    employmentStatuses: opt.employment_status_name,
    residentialStatuses:opt.residential_status_name,
    workShifts:         opt.shift_name || opt.work_shift_name,
    workerUnions:       opt.union_name || opt.worker_union_name,
  };
  return map[type] || opt.name || opt.text || Object.values(opt).find(v => typeof v === 'string' && v.length > 0) || 'Unknown';
};

const getOptionValue = (opt, fallbackKeys = []) => {
  if (!opt) return undefined;
  if (opt.id !== undefined && opt.id !== null) return Number(opt.id);
  for (const key of fallbackKeys) {
    if (opt[key] !== undefined && opt[key] !== null) {
      return Number(opt[key]);
    }
  }
  return undefined;
};

// Employees use employee_id (not id) as the PK
const getEmployeeLabel = (emp) => {
  if (!emp) return 'Unknown';
  if (emp.text) return emp.text;
  const names = [emp.first_name, emp.last_name].filter(Boolean).join(' ');
  return names || emp.email_address || String(emp.employee_id || emp.id || '');
};

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;

  const employeeData = stripCrudSystemFields(localForm.value);
  // Auto-inject dummy status to bypass backend validation rule before backend overwrites it
  if (!employeeData.employment_status_id && options.value.employmentStatuses?.length) {
    employeeData.employment_status_id = getOptionValue(options.value.employmentStatuses[0], ['employment_status_id']);
  } else if (!employeeData.employment_status_id) {
    employeeData.employment_status_id = 1; 
  }

  const payload = {
    profile: props.formData.profile,
    employee: employeeData
  };

  const endpoint = props.employeeId ? `/hr/employee/${props.employeeId}` : '/hr/employee';
  const method   = props.employeeId ? 'PUT' : 'POST';

  const submitApi = useApi(endpoint, { method, autoFetch: false });
  await submitApi.request(payload);

  isLoading.value = false;

  if (submitApi.error.value) {
    const parsed = parseBackendError(submitApi.error.value);
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

  const responseData = submitApi.data.value?.dataPayload?.data || {};
  const newEmployeeId = responseData.employee_id || props.employeeId;

  emit('next', { ...localForm.value, employee_id: newEmployeeId });
};
</script>

<template>
  <div>
    <h4 class="mb-1">Employment Details</h4>
    <p class="text-muted fs-sm mb-4">Set up the employee's role, reporting structure, and employment conditions.</p>

    <form @submit.prevent="submit">
      <div class="row g-4">

        <!-- Department -->
        <div class="col-md-6">
          <label class="form-label">Department</label>
          <select v-model.number="localForm.department_id" class="form-select" :class="{'is-invalid': fieldErrors.department_id}">
            <option :value="undefined">Select Department...</option>
            <option
              v-for="opt in options.departments"
              :key="getOptionValue(opt, ['department_id'])"
              :value="getOptionValue(opt, ['department_id'])"
            >
              {{ getOptionLabel(opt, 'departments') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.department_id }}</div>
        </div>

        <!-- Job Title -->
        <div class="col-md-6">
          <label class="form-label">Job Title <span class="text-danger">*</span></label>
          <select v-model.number="localForm.job_title_id" class="form-select" :class="{'is-invalid': fieldErrors.job_title_id}">
            <option :value="undefined">Select Title...</option>
            <option
              v-for="opt in options.jobTitles"
              :key="getOptionValue(opt, ['job_title_id'])"
              :value="getOptionValue(opt, ['job_title_id'])"
            >
              {{ getOptionLabel(opt, 'jobTitles') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.job_title_id }}</div>
        </div>

        <!-- Job Group -->
        <div class="col-md-6">
          <label class="form-label">Job Group</label>
          <select v-model.number="localForm.job_group_id" class="form-select" :class="{'is-invalid': fieldErrors.job_group_id}">
            <option :value="undefined">Select Group...</option>
            <option
              v-for="opt in options.jobGroups"
              :key="getOptionValue(opt, ['job_group_id'])"
              :value="getOptionValue(opt, ['job_group_id'])"
            >
              {{ getOptionLabel(opt, 'jobGroups') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.job_group_id }}</div>
        </div>

        <!-- Employment Type -->
        <div class="col-md-6">
          <label class="form-label">Employment Type <span class="text-danger">*</span></label>
          <select v-model.number="localForm.employment_type_id" class="form-select" :class="{'is-invalid': fieldErrors.employment_type_id}">
            <option :value="undefined">Select Type...</option>
            <option
              v-for="opt in options.employmentTypes"
              :key="getOptionValue(opt, ['employment_type_id'])"
              :value="getOptionValue(opt, ['employment_type_id'])"
            >
              {{ getOptionLabel(opt, 'employmentTypes') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.employment_type_id }}</div>
        </div>



        <!-- Residential Status -->
        <div class="col-md-6">
          <label class="form-label">Residential Status</label>
          <select v-model.number="localForm.residential_status_id" class="form-select" :class="{'is-invalid': fieldErrors.residential_status_id}">
            <option :value="undefined">Select Residential Status...</option>
            <option
              v-for="opt in options.residentialStatuses"
              :key="getOptionValue(opt, ['residential_status_id'])"
              :value="getOptionValue(opt, ['residential_status_id'])"
            >
              {{ getOptionLabel(opt, 'residentialStatuses') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.residential_status_id }}</div>
        </div>

        <!-- Work Shift -->
        <div class="col-md-6">
          <label class="form-label">Work Shift</label>
          <select v-model.number="localForm.work_shift_id" class="form-select" :class="{'is-invalid': fieldErrors.work_shift_id}">
            <option :value="undefined">Select Shift...</option>
            <option
              v-for="opt in options.workShifts"
              :key="getOptionValue(opt, ['work_shift_id'])"
              :value="getOptionValue(opt, ['work_shift_id'])"
            >
              {{ getOptionLabel(opt, 'workShifts') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.work_shift_id }}</div>
        </div>

        <!-- Worker Union -->
        <div class="col-md-6">
          <label class="form-label">Worker Union</label>
          <select v-model.number="localForm.worker_union_id" class="form-select" :class="{'is-invalid': fieldErrors.worker_union_id}">
            <option :value="undefined">Select Union...</option>
            <option
              v-for="opt in options.workerUnions"
              :key="getOptionValue(opt, ['worker_union_id'])"
              :value="getOptionValue(opt, ['worker_union_id'])"
            >
              {{ getOptionLabel(opt, 'workerUnions') }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.worker_union_id }}</div>
        </div>

        <!-- Manager (Reports To) -->
        <div class="col-md-6">
          <label class="form-label">Manager (Reports To)</label>
          <select v-model.number="localForm.reports_to_employee_id" class="form-select" :class="{'is-invalid': fieldErrors.reports_to_employee_id}">
            <option :value="undefined">Select Manager...</option>
            <option
              v-for="emp in options.employees"
              :key="getOptionValue(emp, ['employee_id'])"
              :value="getOptionValue(emp, ['employee_id'])"
            >
              {{ getEmployeeLabel(emp) }}
            </option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.reports_to_employee_id }}</div>
        </div>

        <!-- Divider -->
        <div class="col-12"><hr class="my-1"></div>

        <!-- Hire Date -->
        <div class="col-md-4">
          <label class="form-label">Hire Date <span class="text-danger">*</span></label>
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
