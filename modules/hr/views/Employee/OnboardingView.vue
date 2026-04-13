<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlertStore } from '@/stores/alert';
import axiosInstance from '@/helpers/axiosInstance';

import StepPersonalInfo from './onboarding/StepPersonalInfo.vue';
import StepEmployment from './onboarding/StepEmployment.vue';
import StepPayroll from './onboarding/StepPayroll.vue';
import StepDependents from './onboarding/StepDependents.vue';
import StepEducation from './onboarding/StepEducation.vue';
import StepExperience from './onboarding/StepExperience.vue';
import StepDocuments from './onboarding/StepDocuments.vue';
import StepReview from './onboarding/StepReview.vue';

const router = useRouter();
const route = useRoute();
const alertStore = useAlertStore();

const steps = [
  { id: 1, title: 'Personal Info', component: 'personal', icon: 'fa fa-user' },
  { id: 2, title: 'Employment',    component: 'employment', icon: 'fa fa-briefcase' },
  { id: 3, title: 'Payroll',       component: 'payroll', icon: 'fa fa-money-bill-wave' },
  { id: 4, title: 'Dependents',    component: 'dependents', icon: 'fa fa-users', optional: true },
  { id: 5, title: 'Education',     component: 'education', icon: 'fa fa-graduation-cap' },
  { id: 6, title: 'Experience',    component: 'experience', icon: 'fa fa-clock', optional: true },
  { id: 7, title: 'Documents',     component: 'documents', icon: 'fa fa-file-alt' },
  { id: 8, title: 'Review',        component: 'review', icon: 'fa fa-check-circle' },
];

const currentStep = ref(1);
const employeeId = ref(null);
const completedSteps = ref([]);
const isHydrating = ref(true);
const transitionEnabled = ref(true);
const transitionPath = ref('');

const formData = ref({
  profile: {},
  employee: {},
  payroll: {},
  dependents: [],
  educations: [],
  experiences: [],
  documents: [],
});

const currentStepObj = computed(() => steps.find(s => s.id === currentStep.value));
const isOptional = computed(() => currentStepObj.value?.optional === true);
const progressPercent = computed(() => Math.round(((currentStep.value - 1) / (steps.length - 1)) * 100));

function toNumberOrUndefined(value) {
  if (value === null || value === undefined || value === '') return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function normalizeEmploymentFields(employee) {
  return {
    ...employee,
    facility_id: toNumberOrUndefined(employee?.facility_id ?? employee?.facility?.id),
    department_id: toNumberOrUndefined(employee?.department_id ?? employee?.department?.id),
    job_title_id: toNumberOrUndefined(employee?.job_title_id ?? employee?.job_title?.id ?? employee?.jobTitle?.id),
    job_group_id: toNumberOrUndefined(employee?.job_group_id ?? employee?.job_group?.id ?? employee?.jobGroup?.id),
    employment_type_id: toNumberOrUndefined(employee?.employment_type_id ?? employee?.employment_type?.id ?? employee?.employmentType?.id),
    employment_status_id: toNumberOrUndefined(employee?.employment_status_id ?? employee?.employment_status?.id ?? employee?.employmentStatus?.id),
    residential_status_id: toNumberOrUndefined(employee?.residential_status_id ?? employee?.residential_status?.id ?? employee?.residentialStatus?.id),
    work_shift_id: toNumberOrUndefined(employee?.work_shift_id ?? employee?.work_shift?.id ?? employee?.workShift?.id),
    worker_union_id: toNumberOrUndefined(employee?.worker_union_id ?? employee?.worker_union?.id ?? employee?.workerUnion?.id),
    reports_to_employee_id: toNumberOrUndefined(employee?.reports_to_employee_id ?? employee?.reportsToEmployee?.employee_id),
  };
}

function normalizeProfileFields(employee) {
  return {
    ...(employee?.profile || {}),
    title: employee?.profile?.title ?? employee?.title,
    first_name: employee?.profile?.first_name ?? employee?.first_name,
    middle_name: employee?.profile?.middle_name ?? employee?.middle_name,
    last_name: employee?.profile?.last_name ?? employee?.last_name,
    gender: employee?.profile?.gender ?? employee?.gender,
    date_of_birth: employee?.profile?.date_of_birth ?? employee?.date_of_birth,
    national_id: employee?.profile?.national_id ?? employee?.national_id,
    passport_number: employee?.profile?.passport_number ?? employee?.passport_number,
    tax_pin: employee?.profile?.tax_pin ?? employee?.tax_pin,
    email_address: employee?.profile?.email_address ?? employee?.email_address,
    mobile_number: employee?.profile?.mobile_number ?? employee?.mobile_number,
    physical_address: employee?.profile?.physical_address ?? employee?.physical_address,
    postal_address: employee?.profile?.postal_address ?? employee?.postal_address,
  };
}

function resolveResumeStep(onboardingStage) {
  const stage = Number(onboardingStage || 0);
  if (stage <= 0) return 1;
  if (stage === 1) return 2;
  if (stage === 2) return 3;
  return 8;
}

function markCompletedUpTo(stepId) {
  completedSteps.value = [];
  for (let id = 1; id < stepId; id += 1) {
    completedSteps.value.push(id);
  }
}

async function loadExistingEmployee() {
  const routeId = route.params?.id || route.query?.id;
  if (!routeId) return;

  const id = Number(routeId);
  if (!Number.isFinite(id)) return;

  let response = null;
  try {
    response = await axiosInstance({
      method: 'GET',
      url: `/hr/employee/${id}?expand=profile,payrollProfile,dependents,educations,experiences,documents`,
    });
  } catch (err) {
    alertStore.show({
      theme: 'danger',
      type: 'toast',
      message: 'Unable to load employee onboarding progress.'
    });
    return;
  }

  const employee = response?.data?.dataPayload?.data;
  const resolvedEmployeeId = employee?.employee_id || employee?.id;
  if (!resolvedEmployeeId) return;

  employeeId.value = resolvedEmployeeId;
  formData.value.profile = normalizeProfileFields(employee);
  formData.value.employee = normalizeEmploymentFields(employee);
  formData.value.payroll = employee.payrollProfile || employee.payroll || employee.employeePayroll || employee.payroll_profile || {};
  formData.value.dependents = employee.dependents || employee.employeeDependents || [];
  formData.value.educations = employee.educations || employee.employeeEducations || [];
  formData.value.experiences = employee.experiences || employee.employeeExperiences || [];
  formData.value.documents = employee.documents || employee.employeeDocuments || [];
  transitionPath.value = employee?._links?.transition || '';

  const resumeStep = resolveResumeStep(employee.onboarding_stage ?? employee.onboarding_status?.current_stage);
  currentStep.value = resumeStep;
  markCompletedUpTo(resumeStep);
}

function getStepStatus(stepId) {
  if (completedSteps.value.includes(stepId)) return 'completed';
  if (stepId === currentStep.value) return 'active';
  if (stepId < currentStep.value) return 'completed';
  return 'pending';
}

function canNavigateTo(stepId) {
  // Allow nav to any previously visited or completed step
  return stepId <= currentStep.value || completedSteps.value.includes(stepId);
}

function goToStep(stepId) {
  if (canNavigateTo(stepId)) {
    currentStep.value = stepId;
  }
}

async function transitionBackendStage(targetStage) {
  if (!employeeId.value || !transitionEnabled.value) return;
  const endpoints = transitionPath.value
    ? [transitionPath.value]
    : [`/hr/employees/${employeeId.value}/transition`, `/hr/employee/${employeeId.value}/transition`];
  const uniqueEndpoints = [...new Set(endpoints)];
  const methods = ['post', 'put'];

  let response = null;
  let hasRouteMiss = false;
  let lastError = null;

  for (const endpoint of uniqueEndpoints) {
    for (const method of methods) {
      try {
        response = await axiosInstance({
          method,
          url: endpoint,
          data: { target_stage: targetStage },
        });
        lastError = null;
        break;
      } catch (err) {
        const status = err?.response?.status;
        if (status === 404 || status === 405) {
          hasRouteMiss = true;
          if (status === 404) {
            break;
          }
        }
        lastError = err;
      }
    }

    if (response) break;
  }

  if (!response) {
    if (hasRouteMiss) {
      // Keep wizard progression functional even if transition endpoint is unavailable.
      transitionEnabled.value = false;
      return;
    }
    throw new Error(`Transition to stage ${targetStage} failed.`);
  }

  const serverStage = response?.data?.dataPayload?.data?.onboarding_stage;
  if (serverStage !== undefined && Number(serverStage) !== Number(targetStage)) {
    throw new Error(`Expected stage ${targetStage} but got ${serverStage ?? 'unknown'}.`);
  }
}

async function handleNext(payload) {
  try {
    if (currentStep.value === 1) {
      formData.value.profile = payload;
    } else if (currentStep.value === 2) {
      formData.value.employee = payload;
      if (payload.employee_id) employeeId.value = payload.employee_id;
      await transitionBackendStage(2);
    } else if (currentStep.value === 3) {
      formData.value.payroll = payload;
    } else if (currentStep.value === 4) {
      formData.value.dependents = payload;
    } else if (currentStep.value === 5) {
      formData.value.educations = payload;
    } else if (currentStep.value === 6) {
      formData.value.experiences = payload;
    } else if (currentStep.value === 7) {
      formData.value.documents = payload;
      await transitionBackendStage(3);
    }

    if (currentStep.value === steps.length) {
      await transitionBackendStage(5);
    }
  } catch (err) {
    alertStore.show({
      theme: 'danger',
      type: 'toast',
      message: err?.message || 'Unable to progress onboarding stage. Please resolve the form errors and try again.'
    });
    return;
  }

  if (!completedSteps.value.includes(currentStep.value)) {
    completedSteps.value.push(currentStep.value);
  }

  if (currentStep.value < steps.length) {
    currentStep.value++;
  } else {
    alertStore.show({ theme: 'success', type: 'toast', message: 'Employee onboarding submission completed successfully.' });
    router.push({ name: 'hr/employee' });
  }
}

function handleBack() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function handleSkip() {
  if (isOptional.value && currentStep.value < steps.length) {
    if (!completedSteps.value.includes(currentStep.value)) {
      completedSteps.value.push(currentStep.value);
    }
    currentStep.value++;
  }
}

onMounted(async () => {
  try {
    await loadExistingEmployee();
  } finally {
    isHydrating.value = false;
  }
});

watch(
  () => [route.params?.id, route.query?.id],
  async () => {
    isHydrating.value = true;
    try {
      await loadExistingEmployee();
    } finally {
      isHydrating.value = false;
    }
  }
);
</script>

<template>
  <div class="content">
    <div class="block block-rounded">

      <!-- Header -->
      <div class="block-header block-header-default">
        <h3 class="block-title">
          <i class="fa fa-user-plus me-2 text-primary"></i>
          Employee Onboarding Wizard
        </h3>
        <div class="block-options">
          <span class="badge bg-primary-light text-primary fs-sm">
            Step {{ currentStep }} of {{ steps.length }}
          </span>
        </div>
      </div>

      <div class="block-content block-content-full">

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="d-flex justify-content-between mb-1">
            <small class="text-muted fw-semibold">Progress</small>
            <small class="text-muted fw-semibold">{{ progressPercent }}%</small>
          </div>
          <div class="progress" style="height: 6px; border-radius: 99px;">
            <div
              class="progress-bar bg-primary transition-all"
              role="progressbar"
              :style="{ width: progressPercent + '%' }"
              :aria-valuenow="progressPercent"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <!-- Stepper Navigation -->
        <div class="onboarding-steps mb-5">
          <div class="steps-container">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="step-item"
              :class="{
                'is-completed': getStepStatus(step.id) === 'completed',
                'is-active':    getStepStatus(step.id) === 'active',
                'is-pending':   getStepStatus(step.id) === 'pending',
                'is-clickable': canNavigateTo(step.id),
              }"
              @click="goToStep(step.id)"
            >
              <!-- Connector Line -->
              <div v-if="index < steps.length - 1" class="step-connector"></div>

              <!-- Circle -->
              <div class="step-circle">
                <i v-if="getStepStatus(step.id) === 'completed'" class="fa fa-check"></i>
                <i v-else :class="step.icon"></i>
              </div>

              <!-- Label -->
              <div class="step-label">
                <span class="step-title">{{ step.title }}</span>
                <span v-if="step.optional" class="step-optional">Optional</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step Content — use v-show so components stay mounted (prevents re-fetch on back/next) -->
        <div v-if="isHydrating" class="py-5 text-center">
          <span class="spinner-border text-primary" role="status" aria-hidden="true"></span>
          <div class="mt-2 text-muted">Loading onboarding data...</div>
        </div>

        <div v-else class="step-content-wrapper py-2">
          <div v-show="currentStep === 1">
            <StepPersonalInfo
              :form-data="formData"
              @next="handleNext"
            />
          </div>

          <div v-show="currentStep === 2">
            <StepEmployment
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
            />
          </div>

          <div v-show="currentStep === 3">
            <StepPayroll
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
            />
          </div>

          <div v-show="currentStep === 4">
            <StepDependents
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
              @skip="handleSkip"
            />
          </div>

          <div v-show="currentStep === 5">
            <StepEducation
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
              @skip="handleSkip"
            />
          </div>

          <div v-show="currentStep === 6">
            <StepExperience
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
              @skip="handleSkip"
            />
          </div>

          <div v-show="currentStep === 7">
            <StepDocuments
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
              @skip="handleSkip"
            />
          </div>

          <div v-show="currentStep === 8">
            <StepReview
              :form-data="formData"
              :employee-id="employeeId"
              @next="handleNext"
              @back="handleBack"
            />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Stepper ──────────────────────────────────────────── */
.onboarding-steps {
  overflow-x: auto;
  padding-bottom: 4px;
}

.steps-container {
  display: flex;
  align-items: flex-start;
  min-width: max-content;
  position: relative;
  gap: 0;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 80px;
  cursor: default;
}

.step-item.is-clickable {
  cursor: pointer;
}

/* Connector line between circles */
.step-connector {
  position: absolute;
  top: 18px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: #e4e7eb;
  z-index: 0;
  transition: background-color 0.3s ease;
}

.step-item.is-completed .step-connector,
.step-item.is-active .step-connector {
  background-color: #4361ee;
}

/* Circle */
.step-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  position: relative;
  z-index: 1;
  transition: all 0.25s ease;
  border: 2px solid #e4e7eb;
  background-color: #fff;
  color: #9ca3af;
}

.step-item.is-active .step-circle {
  background-color: #4361ee;
  border-color: #4361ee;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.15);
}

.step-item.is-completed .step-circle {
  background-color: #10b981;
  border-color: #10b981;
  color: #fff;
}

.step-item.is-clickable:hover .step-circle {
  border-color: #4361ee;
  color: #4361ee;
}

.step-item.is-completed.is-clickable:hover .step-circle,
.step-item.is-active .step-circle {
  color: #fff;
}

/* Labels */
.step-label {
  margin-top: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.step-title {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  white-space: nowrap;
}

.step-item.is-active .step-title {
  color: #4361ee;
}

.step-item.is-completed .step-title {
  color: #10b981;
}

.step-optional {
  font-size: 9px;
  color: #9ca3af;
  font-style: italic;
}

/* Progress bar animation */
.transition-all {
  transition: width 0.4s ease;
}
</style>
