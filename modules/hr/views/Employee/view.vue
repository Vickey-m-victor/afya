<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/helpers/useApi';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const formData = ref({});

// Prefer expand so we can render human-friendly names (profile, facility, department, etc)
const viewUrl = computed(
  () => `/hr/employee/${id}?expand=profile,facility,department,job_title,job_group,employment_type,work_shift`
);

const { data, isLoading } = useApi(viewUrl, {
  method: 'GET',
  autoFetch: true,
});

watch(
  data,
  () => {
    const payload = data.value?.dataPayload || data.value || {};
    formData.value = payload?.data || payload || {};
  },
  { immediate: true }
);

const profile = computed(() => formData.value?.profile || {});
const fullName = computed(() =>
  [profile.value?.title, profile.value?.first_name, profile.value?.middle_name, profile.value?.last_name]
    .filter(Boolean)
    .join(' ')
    .trim()
);

const jobTitleName = computed(() => formData.value?.job_title?.name ?? formData.value?.job_title_name ?? null);
const jobGroupName = computed(() => formData.value?.job_group?.name ?? formData.value?.job_group_name ?? null);
const facilityName = computed(() => formData.value?.facility?.name ?? formData.value?.facility_name ?? null);
const departmentName = computed(() => formData.value?.department?.name ?? formData.value?.department_name ?? null);
const employmentTypeName = computed(() => formData.value?.employment_type?.name ?? formData.value?.employment_type_name ?? null);
const workShiftName = computed(() => formData.value?.work_shift?.name ?? formData.value?.work_shift_name ?? null);
</script>

<template>
  <div class="content">

    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div class="my-auto mb-2">
            <h6 class="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0">
                <a href="javascript:void(0);" @click.prevent="router.push({ name: 'hr/employee' })" class="text-body d-flex align-items-center">
                    <i class="ti ti-arrow-left me-2"></i>Employee Details
                </a>
            </h6>
        </div>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
            <div class="mb-2">
                <a href="javascript:void(0);" class="btn btn-primary d-flex align-items-center"><i class="ti ti-circle-plus me-2"></i>Bank & Statutory</a>
            </div>
            <div class="head-icons ms-2">
                <a href="javascript:void(0);" class="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
                    <i class="ti ti-chevrons-up"></i>
                </a>
            </div>
        </div>
    </div>
    <!-- /Breadcrumb -->

    <div v-if="isLoading" class="text-center py-5">
      <span class="spinner-border text-primary" role="status" aria-hidden="true"></span>
      <div class="mt-2 text-muted">Loading employee details...</div>
    </div>

    <div v-else class="row">
        <div class="col-xl-4 theiaStickySidebar">
            <div class="card card-bg-1">
                <div class="card-body p-0">
                    <span class="avatar avatar-xl avatar-rounded border border-2 border-white m-auto d-flex mb-2">
                        <img v-if="profile.avatar" :src="profile.avatar" class="w-auto h-auto" alt="Img">
                        <span v-else class="w-100 h-100 d-flex align-items-center justify-content-center rounded-circle bg-body-light text-muted">
                            <i class="ti ti-user fs-2 text-muted"></i>
                        </span>
                    </span>
                    <div class="text-center px-3 pb-3 border-bottom">
                        <div class="mb-3">
                            <h5 class="d-flex align-items-center justify-content-center mb-1">{{ fullName || '—' }}<i class="ti ti-discount-check-filled text-success ms-1"></i></h5>
                            <span class="badge badge-soft-dark fw-medium me-2">
                                <i class="ti ti-point-filled me-1"></i>{{ jobTitleName || '—' }}
                            </span>
                            <span class="badge badge-soft-secondary fw-medium">{{ jobGroupName || '—' }}</span>
                        </div>
                        <div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="d-inline-flex align-items-center">
                                    <i class="ti ti-id me-2"></i>
                                    Employee ID
                                </span>
                                <p class="text-dark">{{ formData.employee_number ?? '—' }}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="d-inline-flex align-items-center">
                                    <i class="ti ti-star me-2"></i>
                                    Team
                                </span>
                                <p class="text-dark">{{ departmentName || '—' }}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <span class="d-inline-flex align-items-center">
                                    <i class="ti ti-calendar-check me-2"></i>
                                    Date Of Join
                                </span>
                                <p class="text-dark">{{ formData.hire_date || '—' }}</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="d-inline-flex align-items-center">
                                    <i class="ti ti-calendar-check me-2"></i>
                                    Report Office
                                </span>
                                <div class="d-flex align-items-center">
                                    <span class="avatar avatar-sm avatar-rounded mx-1 me-2 bg-body-light d-flex align-items-center justify-content-center">
                                        <i class="ti ti-building-hospital text-primary"></i>
                                    </span>
                                    <p class="text-gray-9 mb-0">{{ facilityName || '—' }}</p>
                                </div>
                            </div>
                            <div class="row gx-2 mt-3">
                                <div class="col-6">
                                    <div>
                                        <a href="javascript:void(0);" @click.prevent="router.push({ name: 'hr/employee/update', params: { id } })" class="btn btn-dark w-100"><i class="ti ti-edit me-1"></i>Edit Info</a>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div>
                                        <a href="javascript:void(0);" class="btn btn-primary w-100"><i class="ti ti-message-heart me-1"></i>Message</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Basic information -->
                    <div class="p-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <h6>Basic information</h6>
                            <a href="javascript:void(0);" @click.prevent="router.push({ name: 'hr/employee/update', params: { id } })" class="btn btn-icon btn-sm"><i class="ti ti-edit"></i></a>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-phone me-2"></i>
                                Phone
                            </span>
                            <p class="text-dark">{{ profile.mobile_number || formData.mobile_number || '—' }}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-mail-check me-2"></i>
                                Email
                            </span>
                            <a href="javascript:void(0);" class="text-info d-inline-flex align-items-center"><span>{{ profile.email_address || formData.email_address || '—' }}</span><i class="ti ti-copy text-dark ms-2"></i></a>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-gender-male me-2"></i>
                                Gender
                            </span>
                            <p class="text-dark text-end">{{ profile.gender || formData.gender || '—' }}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-cake me-2"></i>
                                Birthday
                            </span>
                            <p class="text-dark text-end">{{ profile.date_of_birth || formData.date_of_birth || '—' }}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-map-pin-check me-2"></i>
                                Address
                            </span>
                            <p class="text-dark text-end">{{ profile.physical_address || formData.physical_address || '—' }}</p>
                        </div>
                    </div>
                    
                    <!-- Personal Information -->
                    <div class="p-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <h6>Personal Information</h6>
                            <a href="javascript:void(0);" @click.prevent="router.push({ name: 'hr/employee/update', params: { id } })" class="btn btn-icon btn-sm"><i class="ti ti-edit"></i></a>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-e-passport me-2"></i>
                                Passport No
                            </span>
                            <p class="text-dark">{{ profile.passport_number || formData.passport_number || '—' }}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-id-badge-2 me-2"></i>
                                National ID
                            </span>
                            <p class="text-dark">{{ profile.national_id || formData.national_id || '—' }}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-receipt-tax me-2"></i>
                                KRA PIN
                            </span>
                            <p class="text-dark text-end">{{ profile.tax_pin || formData.tax_pin || '—' }}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-flag me-2"></i>
                                Nationality
                            </span>
                            <p class="text-dark text-end">—</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-bookmark-plus me-2"></i>
                                Religion
                            </span>
                            <p class="text-dark text-end">—</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="d-inline-flex align-items-center">
                                <i class="ti ti-hotel-service me-2"></i>
                                Marital status
                            </span>
                            <p class="text-dark text-end">—</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6>Emergency Contact Number</h6>
                <a href="javascript:void(0);" class="btn btn-icon btn-sm"><i class="ti ti-edit"></i></a>
            </div>
            <div class="card">
                <div class="card-body p-0">
                    <div class="p-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <span class="d-inline-flex align-items-center">
                                    Primary
                                </span>
                                <h6 class="d-flex align-items-center fw-medium mt-1">— <span class="d-inline-flex mx-1"><i class="ti ti-point-filled text-danger" ></i></span>—</h6>
                            </div>
                            <p class="text-dark">—</p>
                        </div>
                    </div>
                    <div class="p-3 border-bottom">
                        <div class="d-flex align-items-center justify-content-between">
                            <div>
                                <span class="d-inline-flex align-items-center">
                                    Secondary
                                </span>
                                <h6 class="d-flex align-items-center fw-medium mt-1">— <span class="d-inline-flex mx-1"><i class="ti ti-point-filled text-danger" ></i></span>—</h6>
                            </div>
                            <p class="text-dark">—</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-xl-8">
            <div>
                <div class="tab-content custom-accordion-items">
                    <div class="tab-pane active show" id="bottom-justified-tab1" role="tabpanel">
                        <div class="accordion accordions-items-seperate" id="accordionExample">
                            
                            <div class="accordion-item">
                                <div class="accordion-header" id="headingOne">
                                    <div class="accordion-button">
                                        <div class="d-flex align-items-center flex-fill">
                                            <h5>About Employee</h5>
                                            <a href="javascript:void(0);" @click.prevent="router.push({ name: 'hr/employee/update', params: { id } })" class="btn btn-sm btn-icon ms-auto"><i class="ti ti-edit"></i></a>
                                            <a href="javascript:void(0);" class="d-flex align-items-center collapsed collapse-arrow" data-bs-toggle="collapse" data-bs-target="#primaryBorderOne" aria-expanded="false" aria-controls="primaryBorderOne">
                                                <i class="ti ti-chevron-down fs-18"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div id="primaryBorderOne" class="accordion-collapse collapse show border-top" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body mt-2">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Facility</span>
                                                    <span class="text-dark">{{ facilityName || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Department</span>
                                                    <span class="text-dark">{{ departmentName || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Job Title</span>
                                                    <span class="text-dark">{{ jobTitleName || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Employment Type</span>
                                                    <span class="text-dark">{{ employmentTypeName || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Work Shift</span>
                                                    <span class="text-dark">{{ workShiftName || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Reports To (Employee Id)</span>
                                                    <span class="text-dark">{{ formData.reports_to_employee_id ?? '—' }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Employment Dates previously headingTwo, we can place it here to match existing data -->
                            <div class="accordion-item">
                                <div class="accordion-header" id="headingDates">
                                    <div class="accordion-button collapsed">
                                        <div class="d-flex align-items-center flex-fill">
                                            <h5>Employment Dates</h5>
                                            <a href="javascript:void(0);" class="d-flex align-items-center ms-auto collapsed collapse-arrow" data-bs-toggle="collapse" data-bs-target="#primaryBorderDates" aria-expanded="false" aria-controls="primaryBorderDates">
                                                <i class="ti ti-chevron-down fs-18"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div id="primaryBorderDates" class="accordion-collapse collapse border-top" aria-labelledby="headingDates" data-bs-parent="#accordionExample">
                                    <div class="accordion-body mt-2">
                                        <div class="row g-3">
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Hire Date</span>
                                                    <span class="text-dark">{{ formData.hire_date || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Probation End Date</span>
                                                    <span class="text-dark">{{ formData.probation_end_date || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Confirmation Date</span>
                                                    <span class="text-dark">{{ formData.confirmation_date || '—' }}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="d-flex align-items-center justify-content-between">
                                                    <span class="text-muted">Termination Date</span>
                                                    <span class="text-dark">{{ formData.termination_date || '—' }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <div class="accordion-header" id="headingTwo">
                                    <div class="accordion-button collapsed">
                                        <div class="d-flex align-items-center flex-fill">
                                            <h5>Bank Information</h5>
                                            <a href="javascript:void(0);" class="btn btn-sm btn-icon ms-auto"><i class="ti ti-edit"></i></a>
                                            <a href="javascript:void(0);" class="d-flex align-items-center collapsed collapse-arrow"  data-bs-toggle="collapse" data-bs-target="#primaryBorderTwo" aria-expanded="false" aria-controls="primaryBorderTwo">
                                                <i class="ti ti-chevron-down fs-18"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div id="primaryBorderTwo" class="accordion-collapse collapse border-top" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Bank Name</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Bank account no</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">IFSC Code</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Branch</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <div class="accordion-header" id="headingThree">
                                    <div class="accordion-button collapsed">
                                        <div class="d-flex align-items-center justify-content-between flex-fill">
                                            <h5>Family Information</h5>														
                                            <div class="d-flex">
                                                <a href="javascript:void(0);" class="btn btn-icon btn-sm"><i class="ti ti-edit"></i></a>
                                                <a href="javascript:void(0);" class="d-flex align-items-center collapsed collapse-arrow" data-bs-toggle="collapse" data-bs-target="#primaryBorderThree" aria-expanded="false" aria-controls="primaryBorderThree">
                                                    <i class="ti ti-chevron-down fs-18"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>                                       
                                </div>
                                <div id="primaryBorderThree" class="accordion-collapse collapse border-top" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Name</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Relationship</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Date of birth</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                            <div class="col-md-3">
                                                <span class="d-inline-flex align-items-center">Phone</span>
                                                <h6 class="d-flex align-items-center fw-medium mt-1">—</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="accordion-item">
                                        <div class="row">												
                                            <div class="accordion-header" id="headingFour">
                                                <div class="accordion-button collapsed">
                                                    <div class="d-flex align-items-center justify-content-between flex-fill">
                                                        <h5>Education Details</h5>														
                                                        <div class="d-flex">
                                                            <a href="javascript:void(0);" class="btn btn-icon btn-sm"><i class="ti ti-edit"></i></a>
                                                            <a href="javascript:void(0);" class="d-flex align-items-center collapsed collapse-arrow" data-bs-toggle="collapse" data-bs-target="#primaryBorderFour" aria-expanded="false" aria-controls="primaryBorderFour">
                                                                <i class="ti ti-chevron-down fs-18"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>                                       
                                            </div>
                                            <div id="primaryBorderFour" class="accordion-collapse collapse border-top" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div>
                                                        <div class="mb-3">
                                                            <div class="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <span class="d-inline-flex align-items-center fw-normal">—</span>
                                                                    <h6 class="d-flex align-items-center mt-1">—</h6>
                                                                </div>
                                                                <p class="text-dark">—</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="accordion-item">
                                        <div class="row">												
                                            <div class="accordion-header" id="headingFive">
                                                <div class="accordion-button collapsed">
                                                    <div class="d-flex align-items-center justify-content-between flex-fill">
                                                        <h5>Experience</h5>														
                                                        <div class="d-flex">
                                                            <a href="javascript:void(0);" class="btn btn-icon btn-sm"><i class="ti ti-edit"></i></a>
                                                            <a href="javascript:void(0);" class="d-flex align-items-center collapsed collapse-arrow" data-bs-toggle="collapse" data-bs-target="#primaryBorderFive" aria-expanded="false" aria-controls="primaryBorderFive">
                                                                <i class="ti ti-chevron-down fs-18"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>                                       
                                            </div>
                                            <div id="primaryBorderFive" class="accordion-collapse collapse border-top" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <div>
                                                        <div class="mb-3">
                                                            <div class="d-flex align-items-center justify-content-between">
                                                                <div>
                                                                    <h6 class="d-inline-flex align-items-center fw-medium">—</h6>
                                                                    <span class="d-flex align-items-center badge bg-secondary-transparent mt-1"><i class="ti ti-point-filled me-1"></i>—</span>
                                                                </div>
                                                                <p class="text-dark">—</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>			
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.page-breadcrumb .right-content .btn {
  white-space: nowrap;
}

.card-bg-1 {
  background: linear-gradient(135deg, rgba(66, 165, 245, 0.12), rgba(13, 110, 253, 0.06));
  border: 0;
  border-radius: 0.5rem;
}

.employee-avatar {
  margin-top: 1.25rem;
}

.badge-soft-dark {
  background-color: rgba(33, 37, 41, 0.08);
  color: #212529;
}

.badge-soft-secondary {
  background-color: rgba(108, 117, 125, 0.12);
  color: #6c757d;
}

.accordions-items-seperate .accordion-item {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 0.75rem;
}

.accordions-items-seperate .accordion-button {
  background: var(--bs-body-bg);
  box-shadow: none;
}

.collapse-arrow {
  color: var(--bs-primary);
  text-decoration: none;
  padding: 0.25rem 0.25rem;
}
</style>