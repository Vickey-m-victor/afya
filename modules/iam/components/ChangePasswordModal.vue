<script setup>
import { ref, reactive, computed, watch } from "vue";
import authService from "@/services/authService";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "success"]);

const formData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const fieldErrors = ref({});

const rules = computed(() => {
  return {
    currentPassword: {
      required,
      minLength: minLength(6),
    },
    newPassword: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAs: sameAs(formData.newPassword),
    },
  };
});

const v$ = useVuelidate(rules, formData);

watch(() => props.show, (newVal) => {
  if (newVal) {
    // Reset form when modal opens
    formData.currentPassword = "";
    formData.newPassword = "";
    formData.confirmPassword = "";
    errorMessage.value = "";
    fieldErrors.value = {};
    v$.value.$reset();
  }
});

async function handleSubmit() {
  const result = await v$.value.$validate();
  
  if (!result) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  fieldErrors.value = {};

  try {
    await authService.changePassword({
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
      confirm_password: formData.confirmPassword,
    });
    
    emit("success");
    handleClose();
  } catch (error) {
    console.error("Change password failed:", error);
    
    if (error.response?.data?.errorPayload?.errors) {
      fieldErrors.value = error.response.data.errorPayload.errors;
    } else {
      errorMessage.value = error.response?.data?.errorPayload?.message || 
                          error.response?.data?.message ||
                          "Failed to change password. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
}

function handleClose() {
  emit("close");
}
</script>

<template>
  <div
    class="modal"
    :class="{ show: show }"
    :style="{ display: show ? 'block' : 'none' }"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="fa fa-lock me-2"></i>
            Change Password
          </h5>
          <button 
            type="button" 
            class="btn-close" 
            @click="handleClose"
            :disabled="isLoading"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center mb-3">
            <i class="fa fa-times-circle me-2"></i>
            <div>{{ errorMessage }}</div>
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- Current Password -->
            <div class="mb-3">
              <label class="form-label" for="current-password">
                Current Password <span class="text-danger">*</span>
              </label>
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.currentPassword.$errors.length || fieldErrors?.current_password }"
                id="current-password"
                v-model="formData.currentPassword"
                placeholder="Enter current password"
                :disabled="isLoading"
                @blur="v$.currentPassword.$touch"
              />
              <div v-if="v$.currentPassword.$errors.length" class="invalid-feedback">
                <span v-if="v$.currentPassword.required.$invalid">Current password is required</span>
                <span v-else-if="v$.currentPassword.minLength.$invalid">
                  Password must be at least 6 characters
                </span>
              </div>
              <div v-if="fieldErrors?.current_password" class="invalid-feedback d-block">
                {{ fieldErrors.current_password }}
              </div>
            </div>

            <!-- New Password -->
            <div class="mb-3">
              <label class="form-label" for="new-password">
                New Password <span class="text-danger">*</span>
              </label>
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.newPassword.$errors.length || fieldErrors?.new_password }"
                id="new-password"
                v-model="formData.newPassword"
                placeholder="Enter new password"
                :disabled="isLoading"
                @blur="v$.newPassword.$touch"
              />
              <div v-if="v$.newPassword.$errors.length" class="invalid-feedback">
                <span v-if="v$.newPassword.required.$invalid">New password is required</span>
                <span v-else-if="v$.newPassword.minLength.$invalid">
                  Password must be at least 6 characters
                </span>
              </div>
              <div v-if="fieldErrors?.new_password" class="invalid-feedback d-block">
                {{ fieldErrors.new_password }}
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="form-label" for="confirm-password">
                Confirm New Password <span class="text-danger">*</span>
              </label>
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.confirmPassword.$errors.length || fieldErrors?.confirm_password }"
                id="confirm-password"
                v-model="formData.confirmPassword"
                placeholder="Confirm new password"
                :disabled="isLoading"
                @blur="v$.confirmPassword.$touch"
              />
              <div v-if="v$.confirmPassword.$errors.length" class="invalid-feedback">
                <span v-if="v$.confirmPassword.required.$invalid">Please confirm your password</span>
                <span v-else-if="v$.confirmPassword.sameAs.$invalid">
                  Passwords do not match
                </span>
              </div>
              <div v-if="fieldErrors?.confirm_password" class="invalid-feedback d-block">
                {{ fieldErrors.confirm_password }}
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="handleClose"
            :disabled="isLoading"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="handleSubmit"
            :disabled="isLoading"
          >
            <i class="fa fa-check me-1"></i>
            {{ isLoading ? 'Changing...' : 'Change Password' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop" :class="{ show: show }" v-if="show"></div>
</template>

<style scoped>
.modal.show {
  display: block;
}

.modal-backdrop.show {
  opacity: 0.5;
}
</style>
