<script setup>
import { reactive, ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { useModalStore } from '@/stores/modal';
import { parseBackendError, handleResponseAlert } from '@/composables/useWarpHelpers';
import LazySearchSelect from '@/components/inputs/LazySearchSelect.vue';
import BaseDatepicker from "@/components/BaseDatepicker.vue";

const props = defineProps({
  onCreated: { type: Function, default: null },
});

const alertStore = useAlertStore();
const modalStore = useModalStore();

const form = reactive({
  profile: {
    title: 'Mr.',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: 'Male',
    date_of_birth: '',
    physical_address: '',
    postal_address: '',
    national_id: '',
    passport_number: '',
    tax_pin: '',
    email_address: '',
    mobile_number: '',
    avatar_url: '',
  },
  employee: {
    facility_id: null,
    employment_type_id: null,
    residential_status_id: null,
    department_id: null,
    job_title_id: null,
    job_group_id: null,
    work_shift_id: null,
    reports_to_employee_id: 0,
    hire_date: '',
    probation_end_date: '',
    confirmation_date: '',
    termination_date: null,
  },
});

const isLoading = ref(false);
const fieldErrors = ref({});
const formError = ref('');

const getErr = (path) =>
  fieldErrors.value?.[path] ||
  fieldErrors.value?.[path.replace('.', '_')] ||
  '';

async function submit() {
  if (isLoading.value) return;
  isLoading.value = true;
  fieldErrors.value = {};
  formError.value = '';
  modalStore.setSubmitting(true);

  const payload = {
    profile: { ...form.profile },
    employee: { ...form.employee },
  };

  const { data, request, error } = useApi('/hr/employee', {
    method: 'POST',
    autoFetch: false,
  });

  await request(payload);

  isLoading.value = false;
  modalStore.setSubmitting(false);

  if (error.value) {
    const parsed = parseBackendError(error.value);
    fieldErrors.value = parsed.fieldErrors || {};
    formError.value = parsed.message || '';
    if (!parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
    }
    return;
  }

  handleResponseAlert(alertStore, data.value, 'Employee created successfully.');
  if (typeof props.onCreated === 'function') {
    await props.onCreated(data.value);
  }
  modalStore.closeModal();
}
</script>

<template>
  <form @submit.prevent="submit">
    <div v-if="formError" class="alert alert-danger mb-3">{{ formError }}</div>

    <div class="row g-3">
      <div class="col-12">
        <h6 class="mb-1">Profile</h6>
        <div class="text-muted fs-sm">Basic personal information.</div>
      </div>

      <div class="col-md-3">
        <label class="form-label">Title</label>
        <select v-model="form.profile.title" class="form-select" :disabled="isLoading">
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Dr.">Dr.</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label">First Name</label>
        <input v-model="form.profile.first_name" class="form-control" :disabled="isLoading" :class="{ 'is-invalid': getErr('first_name') || getErr('profile.first_name') }" />
        <div class="invalid-feedback">{{ getErr('profile.first_name') || getErr('first_name') }}</div>
      </div>

      <div class="col-md-3">
        <label class="form-label">Middle Name</label>
        <input v-model="form.profile.middle_name" class="form-control" :disabled="isLoading" />
      </div>

      <div class="col-md-3">
        <label class="form-label">Last Name</label>
        <input v-model="form.profile.last_name" class="form-control" :disabled="isLoading" :class="{ 'is-invalid': getErr('last_name') || getErr('profile.last_name') }" />
        <div class="invalid-feedback">{{ getErr('profile.last_name') || getErr('last_name') }}</div>
      </div>

      <div class="col-md-3">
        <label class="form-label">Gender</label>
        <select v-model="form.profile.gender" class="form-select" :disabled="isLoading">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label">Date of Birth</label>
        <BaseDatepicker v-model="form.profile.date_of_birth" :config="{ dateFormat: 'Y-m-d' }" class="form-control" :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Email Address</label>
        <input v-model="form.profile.email_address" type="email" class="form-control" :disabled="isLoading" :class="{ 'is-invalid': getErr('email_address') || getErr('profile.email_address') }" />
        <div class="invalid-feedback">{{ getErr('profile.email_address') || getErr('email_address') }}</div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Mobile Number</label>
        <input v-model="form.profile.mobile_number" class="form-control" :disabled="isLoading" :class="{ 'is-invalid': getErr('mobile_number') || getErr('profile.mobile_number') }" />
        <div class="invalid-feedback">{{ getErr('profile.mobile_number') || getErr('mobile_number') }}</div>
      </div>

      <div class="col-md-6">
        <label class="form-label">National ID</label>
        <input v-model="form.profile.national_id" class="form-control" :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">KRA PIN</label>
        <input v-model="form.profile.tax_pin" class="form-control" :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Physical Address</label>
        <input v-model="form.profile.physical_address" class="form-control" :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Postal Address</label>
        <input v-model="form.profile.postal_address" class="form-control" :disabled="isLoading" />
      </div>

      <div class="col-12"><hr class="my-2" /></div>

      <div class="col-12">
        <h6 class="mb-1">Employment</h6>
        <div class="text-muted fs-sm">Job placement & dates.</div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Facility</label>
        <LazySearchSelect v-model="form.employee.facility_id" endpoint="/admin/facility/search-dropdown" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Department</label>
        <LazySearchSelect v-model="form.employee.department_id" endpoint="/hr/department/search" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Job Title</label>
        <LazySearchSelect v-model="form.employee.job_title_id" endpoint="/hr/job-title/search" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Job Group</label>
        <LazySearchSelect v-model="form.employee.job_group_id" endpoint="/hr/job-group/search" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Employment Type</label>
        <LazySearchSelect v-model="form.employee.employment_type_id" endpoint="/hr/employment-type/search" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Residential Status</label>
        <LazySearchSelect v-model="form.employee.residential_status_id" endpoint="/hr/residential-status/search" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Work Shift</label>
        <LazySearchSelect v-model="form.employee.work_shift_id" endpoint="/hr/work-shift/search" placeholder="Select..." :disabled="isLoading" />
      </div>

      <div class="col-md-6">
        <label class="form-label">Reports To (Employee)</label>
        <LazySearchSelect
          v-model="form.employee.reports_to_employee_id"
          endpoint="/hr/employee/search"
          placeholder="Select..."
          :disabled="isLoading"
          :value-fn="(emp) => emp?.employee_id ?? emp?.id"
          :label-fn="(emp) => {
            const names = [emp?.first_name, emp?.last_name].filter(Boolean).join(' ');
            return names || emp?.email_address || emp?.text || String(emp?.employee_id ?? emp?.id ?? '');
          }"
        />
        <div class="form-text">Use 0 if no manager.</div>
      </div>

      <div class="col-md-3">
        <label class="form-label">Hire Date</label>
        <input v-model="form.employee.hire_date" type="date" class="form-control" :disabled="isLoading" />
      </div>
      <div class="col-md-3">
        <label class="form-label">Probation End</label>
        <input v-model="form.employee.probation_end_date" type="date" class="form-control" :disabled="isLoading" />
      </div>
      <div class="col-md-3">
        <label class="form-label">Confirmation Date</label>
        <input v-model="form.employee.confirmation_date" type="date" class="form-control" :disabled="isLoading" />
      </div>
      <div class="col-md-3">
        <label class="form-label">Termination Date</label>
        <input v-model="form.employee.termination_date" type="date" class="form-control" :disabled="isLoading" />
      </div>
    </div>

    <div class="text-end mt-4">
      <button type="button" class="btn btn-light me-2" :disabled="isLoading" @click="modalStore.closeModal()">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
        Create Employee
      </button>
    </div>
  </form>
</template>

