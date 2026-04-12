<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores/alert';
import { useApi } from '@/helpers/useApi';

import StepPersonalInfo from './onboarding/StepPersonalInfo.vue';
import StepEmployment from './onboarding/StepEmployment.vue';
import StepPayroll from './onboarding/StepPayroll.vue';
import StepDependents from './onboarding/StepDependents.vue';
import StepEducation from './onboarding/StepEducation.vue';
import StepExperience from './onboarding/StepExperience.vue';
import StepDocuments from './onboarding/StepDocuments.vue';
import StepReview from './onboarding/StepReview.vue';

const router = useRouter();
const alertStore = useAlertStore();

const steps = [
  { id: 1, title: 'Personal Info', component: 'personal', icon: 'fa fa-user' },
  { id: 2, title: 'Employment',    component: 'employment', icon: 'fa fa-briefcase' },
  { id: 3, title: 'Payroll',       component: 'payroll', icon: 'fa fa-money-bill-wave' },
  { id: 4, title: 'Dependents',    component: 'dependents', icon: 'fa fa-users', optional: true },
  { id: 5, title: 'Education',     component: 'education', icon: 'fa fa-graduation-cap', optional: true },
  { id: 6, title: 'Experience',    component: 'experience', icon: 'fa fa-clock', optional: true },
  { id: 7, title: 'Documents',     component: 'documents', icon: 'fa fa-file-alt', optional: true },
  { id: 8, title: 'Review',        component: 'review', icon: 'fa fa-check-circle' },
];

const currentStep = ref(1);
const employeeId = ref(null);
const completedSteps = ref([]);

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
  if (!employeeId.value) return;
  const endpoint = `/hr/employee/${employeeId.value}/transition`;
  const { request, error } = useApi(endpoint, { method: 'PUT', autoFetch: false, autoAlert: false });
  await request({ target_stage: targetStage });
  if (error.value) {
    console.warn(`Backend transition to stage ${targetStage} failed or not yet implemented.`, error.value);
  }
}

async function handleNext(payload) {
  if (currentStep.value === 1) {
    formData.value.profile = payload;
  } else if (currentStep.value === 2) {
    formData.value.employee = payload;
    if (payload.employee_id) employeeId.value = payload.employee_id;
    await transitionBackendStage(2); // Wait for EMPLOYMENT_DETAILS transition
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
    await transitionBackendStage(3); // Wait for PENDING_APPROVAL transition
  }

  if (currentStep.value === steps.length) {
    await transitionBackendStage(4); // Trigger ACTIVE stage before completing
  }

  if (!completedSteps.value.includes(currentStep.value)) {
    completedSteps.value.push(currentStep.value);
  }

  if (currentStep.value < steps.length) {
    currentStep.value++;
  } else {
    alertStore.show({ theme: 'success', type: 'toast', message: 'Employee onboarding completed successfully!' });
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
        <div class="step-content-wrapper py-2">
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
