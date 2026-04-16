<script setup>
import { onMounted, reactive, ref } from "vue";
import { useApi } from "@/helpers/useApi";
import { useAlertStore } from "@/stores/alert";
import { useModalStore } from "@/stores/modal";

const props = defineProps({
  registerSubmit: {
    type: Function,
    default: null,
  },
});

const formData = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const errorMessage = ref("");
const fieldErrors = ref({});
const alertStore = useAlertStore();
const modalStore = useModalStore();

function normalizeFieldErrors(errors) {
  if (!errors) return {};

  return {
    currentPassword: errors.currentPassword || errors.current_password,
    newPassword: errors.newPassword || errors.new_password,
    confirmPassword: errors.confirmPassword || errors.confirm_password,
    confirmNewPassword: errors.confirmNewPassword || errors.confirm_new_password,
  };
}

function resetForm() {
  formData.currentPassword = "";
  formData.newPassword = "";
  formData.confirmPassword = "";
  errorMessage.value = "";
  fieldErrors.value = {};
}

onMounted(() => {
  resetForm();
  if (typeof props.registerSubmit === "function") {
    props.registerSubmit(handleSubmit);
  }
});

async function handleSubmit() {
  const shouldManageSubmitting = !modalStore.isSubmitting;
  if (shouldManageSubmitting) {
    modalStore.setSubmitting(true);
  }
  errorMessage.value = "";
  fieldErrors.value = {};

  const { request, error } = useApi("/iam/auth/change-password", {
    method: "PUT",
    autoFetch: false,
  });

  try {
    const response = await request({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmPassword,
    });

    // useApi does not throw by default; it sets `error.value`.
    // Treat any populated error state or error-like response as failure.
    const backendErrors =
      error.value ||
      response?.errorPayload?.errors ||
      response?.errors ||
      null;

    if (backendErrors) {
      if (typeof backendErrors === "object" && !Array.isArray(backendErrors)) {
        fieldErrors.value = normalizeFieldErrors(backendErrors);
      } else if (Array.isArray(backendErrors) && backendErrors.length) {
        errorMessage.value = backendErrors[0];
      } else {
        errorMessage.value = "Failed to change password. Please try again.";
      }

      if (errorMessage.value) {
        alertStore.show({
          type: "error",
          title: "Change Password Failed",
          message: errorMessage.value,
        });
      }

      return false;
    }

    const successPayload = response?.alertifyPayload || response?.dataPayload?.alertify;
    if (successPayload) {
      alertStore.show({
        type: successPayload.theme || successPayload.type || "success",
        title: successPayload.title,
        message: successPayload.message,
        options: successPayload.options,
      });
    }

    return {
      alert: successPayload,
      forceLogout: response?.dataPayload?.forceLogout || response?.forceLogout || successPayload?.forceLogout,
    };
  } catch (err) {
    console.error("Change password failed:", err);
    
    if (err?.errorPayload?.errors) {
      fieldErrors.value = normalizeFieldErrors(err.errorPayload.errors);
    } else {
      errorMessage.value = err?.errorPayload?.message || 
                          err?.message ||
                          "Failed to change password. Please try again.";
    }

    const errorPayload = err?.alertifyPayload;
    if (errorPayload || errorMessage.value) {
      alertStore.show({
        type: errorPayload?.theme || errorPayload?.type || "error",
        title: errorPayload?.title || "Change Password Failed",
        message: errorPayload?.message || errorMessage.value,
        options: errorPayload?.options,
      });
    }
    return false;
  } finally {
    if (shouldManageSubmitting) {
      modalStore.setSubmitting(false);
    }
  }
}
</script>

<template>
  <div>
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
          :class="{ 'is-invalid': fieldErrors?.currentPassword }"
          id="current-password"
          v-model="formData.currentPassword"
          placeholder="Enter current password"
          :disabled="modalStore.isSubmitting"
        />
        <div v-if="fieldErrors?.currentPassword" class="invalid-feedback d-block">
          {{ fieldErrors.currentPassword }}
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
          :class="{ 'is-invalid': fieldErrors?.newPassword }"
          id="new-password"
          v-model="formData.newPassword"
          placeholder="Enter new password"
          :disabled="modalStore.isSubmitting"
        />
        <div v-if="fieldErrors?.newPassword" class="invalid-feedback d-block">
          {{ fieldErrors.newPassword }}
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
          :class="{ 'is-invalid': fieldErrors?.confirmPassword || fieldErrors?.confirmNewPassword }"
          id="confirm-password"
          v-model="formData.confirmPassword"
          placeholder="Confirm new password"
          :disabled="modalStore.isSubmitting"
        />
        <div v-if="fieldErrors?.confirmPassword || fieldErrors?.confirmNewPassword" class="invalid-feedback d-block">
          {{ fieldErrors.confirmPassword || fieldErrors.confirmNewPassword }}
        </div>
      </div>
      <button type="submit" class="d-none" aria-hidden="true"></button>
    </form>
  </div>
</template>
