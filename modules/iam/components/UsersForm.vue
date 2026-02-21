<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
  error: {
    type: Object,
    default: () => ({}),
  },
  fieldErrors: {
    type: Object,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hideSubmit: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  onSubmit: Function,
});

const emit = defineEmits(["submit"]);
const loading = ref(false);

const onSubmit = async () => {
  if (props.onSubmit) {
    loading.value = true;
    try {
      await props.onSubmit(props.formData);
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      loading.value = false;
    }
  } else {
    emit("submit", props.formData);
  }
};

const isSubmitting = computed(() => props.isLoading || loading.value);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Error banner -->
    <div
      v-if="error?.message || (typeof error === 'string' && error)"
      :class="compact ? 'alert alert-danger mb-3' : 'alert alert-danger alert-dismissible mb-4'"
    >
      <h5 v-if="!compact" class="alert-heading mb-2">
        <i class="fa fa-fw fa-times-circle"></i> Error
      </h5>
      <p class="mb-0">{{ typeof error === "string" ? error : error.message }}</p>
    </div>

    <!-- Compact layout for modals -->
    <div v-if="compact" class="compact-form">
      <div class="mb-3">
        <label class="form-label" for="username-input">
          Username <span class="text-danger">*</span>
        </label>
        <input
          type="text"
          class="form-control form-control-sm"
          :class="{ 'is-invalid': fieldErrors?.username }"
          id="username-input"
          v-model="formData.username"
          placeholder="Enter username"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.username" class="invalid-feedback">
          {{ fieldErrors.username }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="email-input">
          Email <span class="text-danger">*</span>
        </label>
        <input
          type="email"
          class="form-control form-control-sm"
          :class="{ 'is-invalid': fieldErrors?.email }"
          id="email-input"
          v-model="formData.email"
          placeholder="Enter email"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.email" class="invalid-feedback">
          {{ fieldErrors.email }}
        </div>
      </div>

      <div class="mb-3" v-if="!readonly">
        <label class="form-label" for="password-input">
          Password <span v-if="!formData.user_id" class="text-danger">*</span>
        </label>
        <input
          type="password"
          class="form-control form-control-sm"
          :class="{ 'is-invalid': fieldErrors?.password }"
          id="password-input"
          v-model="formData.password"
          placeholder="Enter password"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.password" class="invalid-feedback">
          {{ fieldErrors.password }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="status-input">Status</label>
        <select
          class="form-select form-select-sm"
          :class="{ 'is-invalid': fieldErrors?.status }"
          id="status-input"
          v-model="formData.status"
          :disabled="readonly || isSubmitting"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        <div v-if="fieldErrors?.status" class="invalid-feedback">
          {{ fieldErrors.status }}
        </div>
      </div>
    </div>

    <!-- Full layout for standalone pages -->
    <div v-else class="row">
      <div class="col-lg-6 mb-4">
        <label class="form-label" for="username-input-full">
          Username <span class="text-danger">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': fieldErrors?.username }"
          id="username-input-full"
          v-model="formData.username"
          placeholder="Enter username"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.username" class="invalid-feedback">
          {{ fieldErrors.username }}
        </div>
      </div>

      <div class="col-lg-6 mb-4">
        <label class="form-label" for="email-input-full">
          Email <span class="text-danger">*</span>
        </label>
        <input
          type="email"
          class="form-control"
          :class="{ 'is-invalid': fieldErrors?.email }"
          id="email-input-full"
          v-model="formData.email"
          placeholder="Enter email"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.email" class="invalid-feedback">
          {{ fieldErrors.email }}
        </div>
      </div>

      <div class="col-lg-6 mb-4" v-if="!readonly">
        <label class="form-label" for="password-input-full">
          Password <span v-if="!formData.user_id" class="text-danger">*</span>
        </label>
        <input
          type="password"
          class="form-control"
          :class="{ 'is-invalid': fieldErrors?.password }"
          id="password-input-full"
          v-model="formData.password"
          placeholder="Enter password"
          :disabled="readonly || isSubmitting"
        />
        <div v-if="fieldErrors?.password" class="invalid-feedback">
          {{ fieldErrors.password }}
        </div>
      </div>

      <div class="col-lg-6 mb-4">
        <label class="form-label" for="status-input-full">Status</label>
        <select
          class="form-select"
          :class="{ 'is-invalid': fieldErrors?.status }"
          id="status-input-full"
          v-model="formData.status"
          :disabled="readonly || isSubmitting"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
        <div v-if="fieldErrors?.status" class="invalid-feedback">
          {{ fieldErrors.status }}
        </div>
      </div>
    </div>

    <!-- Submit button -->
    <div v-if="!hideSubmit" class="text-center mt-4">
      <button
        type="submit"
        class="btn btn-success"
        :class="{ 'btn-sm': compact }"
        :disabled="isSubmitting"
      >
        <i class="fa fa-save me-1"></i>
        {{ isSubmitting ? "Saving..." : "Save User" }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.compact-form {
  max-width: 100%;
}
</style>
