<script setup>
import { ref } from 'vue';
import { useAlertStore } from '@/stores/alert';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['next']);
const alertStore = useAlertStore();

// Initialize with any existing data
const localForm = ref({ ...props.formData.profile });
const fieldErrors = ref({});
const isLoading = ref(false);

const submit = async () => {
  fieldErrors.value = {};
  isLoading.value = true;

  // If there's an existing employee ID we don't need to re-validate draft on Step 1.
  if (props.formData.employee?.employee_id) {
    emit('next', localForm.value);
    isLoading.value = false;
    return;
  }

  isLoading.value = false;
  emit('next', localForm.value);
};
</script>

<template>
  <div>
    <h4 class="mb-4">Personal Information</h4>
    <form @submit.prevent="submit">
      <div class="row g-4">
        <div class="col-md-6">
          <label class="form-label">Title</label>
          <select v-model="localForm.title" class="form-select" :class="{'is-invalid': fieldErrors.title}">
            <option value="">Select Title...</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.title }}</div>
        </div>
        <div class="col-md-4">
          <label class="form-label">First Name</label>
          <input v-model="localForm.first_name" type="text" class="form-control" :class="{'is-invalid': fieldErrors.first_name}">
          <div class="invalid-feedback">{{ fieldErrors.first_name }}</div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Middle Name</label>
          <input v-model="localForm.middle_name" type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <label class="form-label">Last Name</label>
          <input v-model="localForm.last_name" type="text" class="form-control" :class="{'is-invalid': fieldErrors.last_name}">
          <div class="invalid-feedback">{{ fieldErrors.last_name }}</div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Gender</label>
          <select v-model="localForm.gender" class="form-select" :class="{'is-invalid': fieldErrors.gender}">
            <option value="">Select Gender...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div class="invalid-feedback">{{ fieldErrors.gender }}</div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Date of Birth</label>
          <input v-model="localForm.date_of_birth" type="date" class="form-control" :class="{'is-invalid': fieldErrors.date_of_birth}">
          <div class="invalid-feedback">{{ fieldErrors.date_of_birth }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">National ID</label>
          <input v-model="localForm.national_id" type="text" class="form-control" :class="{'is-invalid': fieldErrors.national_id}">
          <div class="invalid-feedback">{{ fieldErrors.national_id }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Passport Number</label>
          <input v-model="localForm.passport_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.passport_number}">
          <div class="invalid-feedback">{{ fieldErrors.passport_number }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Tax PIN</label>
          <input v-model="localForm.tax_pin" type="text" class="form-control" :class="{'is-invalid': fieldErrors.tax_pin}">
          <div class="invalid-feedback">{{ fieldErrors.tax_pin }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Email Address</label>
          <input v-model="localForm.email_address" type="email" class="form-control" :class="{'is-invalid': fieldErrors.email_address}">
          <div class="invalid-feedback">{{ fieldErrors.email_address }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Mobile Number</label>
          <input v-model="localForm.mobile_number" type="text" class="form-control" :class="{'is-invalid': fieldErrors.mobile_number}">
          <div class="invalid-feedback">{{ fieldErrors.mobile_number }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Physical Address</label>
          <input v-model="localForm.physical_address" type="text" class="form-control" :class="{'is-invalid': fieldErrors.physical_address}">
          <div class="invalid-feedback">{{ fieldErrors.physical_address }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Postal Address</label>
          <input v-model="localForm.postal_address" type="text" class="form-control" :class="{'is-invalid': fieldErrors.postal_address}">
          <div class="invalid-feedback">{{ fieldErrors.postal_address }}</div>
        </div>
      </div>
      
      <div class="mt-4 text-end">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <i v-if="isLoading" class="fa fa-spinner fa-spin me-1"></i>
          <span v-else>Next Step <i class="fa fa-arrow-right ms-1"></i></span>
        </button>
      </div>
    </form>
  </div>
</template>
