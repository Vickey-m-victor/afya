<script setup>
import { ref } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['next']);

// Initialize with any existing data
const localForm = ref({ ...props.formData.profile });
const fieldErrors = ref({});

const validate = () => {
  const errors = {};
  if (!localForm.value.first_name) errors.first_name = 'First name is required';
  if (!localForm.value.last_name) errors.last_name = 'Last name is required';
  if (!localForm.value.email_address) errors.email_address = 'Email is required';
  
  fieldErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const submit = () => {
  if (validate()) {
    emit('next', localForm.value);
  }
};
</script>

<template>
  <div>
    <h4 class="mb-4">Personal Information</h4>
    <form @submit.prevent="submit">
      <div class="row g-4">
        <div class="col-md-4">
          <label class="form-label">Title</label>
          <select v-model="localForm.title" class="form-select">
            <option value="">Select Title...</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">First Name <span class="text-danger">*</span></label>
          <input v-model="localForm.first_name" type="text" class="form-control" :class="{'is-invalid': fieldErrors.first_name}">
          <div class="invalid-feedback">{{ fieldErrors.first_name }}</div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Middle Name</label>
          <input v-model="localForm.middle_name" type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <label class="form-label">Last Name <span class="text-danger">*</span></label>
          <input v-model="localForm.last_name" type="text" class="form-control" :class="{'is-invalid': fieldErrors.last_name}">
          <div class="invalid-feedback">{{ fieldErrors.last_name }}</div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Gender</label>
          <select v-model="localForm.gender" class="form-select">
            <option value="">Select Gender...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Date of Birth</label>
          <input v-model="localForm.date_of_birth" type="date" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">National ID</label>
          <input v-model="localForm.national_id" type="text" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Passport Number</label>
          <input v-model="localForm.passport_number" type="text" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Tax PIN</label>
          <input v-model="localForm.tax_pin" type="text" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Email Address <span class="text-danger">*</span></label>
          <input v-model="localForm.email_address" type="email" class="form-control" :class="{'is-invalid': fieldErrors.email_address}">
          <div class="invalid-feedback">{{ fieldErrors.email_address }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Mobile Number</label>
          <input v-model="localForm.mobile_number" type="text" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Physical Address</label>
          <input v-model="localForm.physical_address" type="text" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Postal Address</label>
          <input v-model="localForm.postal_address" type="text" class="form-control">
        </div>
      </div>
      
      <div class="mt-4 text-end">
        <button type="submit" class="btn btn-primary">
          Next Step <i class="fa fa-arrow-right ms-1"></i>
        </button>
      </div>
    </form>
  </div>
</template>
