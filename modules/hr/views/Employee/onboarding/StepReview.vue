<script setup>
const props = defineProps({
  formData: { type: Object, required: true },
  employeeId: { type: [Number, String], required: true }
});

const emit = defineEmits(['next', 'back']);

const countKeys = (obj) => Object.keys(obj || {}).filter(k => obj[k]).length;
</script>

<template>
  <div>
    <h4 class="mb-4">Review & Complete</h4>
    
    <div class="alert alert-success d-flex align-items-center mb-4">
        <i class="fa fa-check-circle fa-2x me-3"></i>
        <div>
            <h5 class="alert-heading mb-1">Onboarding Process Saved</h5>
            <p class="mb-0">All information has been securely saved to the employee record. Please review the summary below and complete the onboarding process.</p>
        </div>
    </div>
    
    <div class="row g-4">
        <div class="col-md-6">
            <div class="card h-100 border">
                <div class="card-header bg-light fw-bold"><i class="fa fa-user me-2 text-muted"></i>Personal Information</div>
                <div class="card-body">
                    <p class="mb-1"><strong>Name:</strong> {{ formData.profile.first_name }} {{ formData.profile.last_name }}</p>
                    <p class="mb-1"><strong>Email:</strong> {{ formData.profile.email_address }}</p>
                    <p class="mb-1"><strong>Phone:</strong> {{ formData.profile.mobile_number || 'N/A' }}</p>
                    <p class="mb-0 fs-sm text-muted">{{ countKeys(formData.profile) }} fields captured</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="card h-100 border">
                <div class="card-header bg-light fw-bold"><i class="fa fa-briefcase me-2 text-muted"></i>Employment Details</div>
                <div class="card-body">
                    <p class="mb-1"><strong>Hire Date:</strong> {{ formData.employee.hire_date }}</p>
                    <p class="mb-1"><strong>Record ID:</strong> #{{ employeeId }}</p>
                    <p class="mb-0 fs-sm text-muted">Core employment details captured successfully.</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="card h-100 border">
                <div class="card-header bg-light fw-bold"><i class="fa fa-money-bill me-2 text-muted"></i>Payroll & statutory</div>
                <div class="card-body">
                    <p class="mb-1"><strong>Bank:</strong> {{ formData.payroll.bank_name || 'Not provided' }}</p>
                    <p class="mb-1"><strong>Payment Method:</strong> {{ formData.payroll.payment_method || 'Not specified' }}</p>
                    <p class="mb-0 fs-sm text-muted">{{ countKeys(formData.payroll) }} fields captured</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="card h-100 border">
                <div class="card-header bg-light fw-bold"><i class="fa fa-folder me-2 text-muted"></i>Additional Records</div>
                <div class="card-body">
                    <ul class="mb-0 ps-3">
                        <li><strong>Dependents:</strong> {{ formData.dependents?.length || 0 }}</li>
                        <li><strong>Education:</strong> {{ formData.educations?.length || 0 }}</li>
                        <li><strong>Experience:</strong> {{ formData.experiences?.length || 0 }}</li>
                        <li><strong>Documents:</strong> {{ formData.documents?.length || 0 }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <div class="mt-5 d-flex justify-content-between border-top pt-4">
      <button type="button" class="btn btn-alt-secondary" @click="emit('back')">
        <i class="fa fa-arrow-left me-1"></i> Back
      </button>
      <button type="button" class="btn btn-success px-4" @click="emit('next')">
        Complete Onboarding <i class="fa fa-check ms-1"></i>
      </button>
    </div>
  </div>
</template>
