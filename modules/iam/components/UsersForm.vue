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
  isCreateMode: {
    type: Boolean,
    default: false,
  },
  onSubmit: Function,
});

const emit = defineEmits(["submit"]);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

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
  <form @submit.prevent="onSubmit" class="user-form">

    <!-- Error banner -->
    <div
      v-if="error?.message || (typeof error === 'string' && error)"
      class="alert alert-danger d-flex align-items-center gap-2 mb-4 py-2 px-3"
      role="alert"
    >
      <i class="fa fa-circle-exclamation fs-sm"></i>
      <span class="fs-sm">{{ typeof error === "string" ? error : error.message }}</span>
    </div>

    <!-- Account section -->
    <div class="mb-1">
      <p class="fs-xs fw-semibold text-muted text-uppercase tracking-wider mb-3">
        <i class="fa fa-user-circle me-1"></i> Account
      </p>
      <div class="row g-3">

        <!-- Username -->
        <div class="col-md-6">
          <label class="form-label fw-medium" for="uf-username">
            Username <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <div class="input-group">
            <span class="input-group-text bg-body-light border-end-0">
              <i class="fa fa-at text-muted fs-sm"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0 ps-0"
              :class="{ 'is-invalid': fieldErrors?.username }"
              id="uf-username"
              v-model="formData.username"
              placeholder="username"
              autocomplete="username"
              :disabled="readonly || isSubmitting"
            />
            <div v-if="fieldErrors?.username" class="invalid-feedback">
              {{ fieldErrors.username }}
            </div>
          </div>
        </div>

        <!-- Email Address -->
        <div class="col-md-6">
          <label class="form-label fw-medium" for="uf-email">
            Email Address <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <div class="input-group">
            <span class="input-group-text bg-body-light border-end-0">
              <i class="fa fa-envelope text-muted fs-sm"></i>
            </span>
            <input
              type="email"
              class="form-control border-start-0 ps-0"
              :class="{ 'is-invalid': fieldErrors?.email_address }"
              id="uf-email"
              v-model="formData.email_address"
              placeholder="name@example.com"
              autocomplete="email"
              :disabled="readonly || isSubmitting"
            />
            <div v-if="fieldErrors?.email_address" class="invalid-feedback">
              {{ fieldErrors.email_address }}
            </div>
          </div>
        </div>

        <!-- Mobile Number -->
        <div class="col-md-6">
          <label class="form-label fw-medium" for="uf-mobile">
            Mobile <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <div class="input-group">
            <span class="input-group-text bg-body-light border-end-0">
              <i class="fa fa-phone text-muted fs-sm"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0 ps-0"
              :class="{ 'is-invalid': fieldErrors?.mobile_number }"
              id="uf-mobile"
              v-model="formData.mobile_number"
              placeholder="+254 7XX XXX XXX"
              :disabled="readonly || isSubmitting"
            />
            <div v-if="fieldErrors?.mobile_number" class="invalid-feedback">
              {{ fieldErrors.mobile_number }}
            </div>
          </div>
        </div>


      </div>
    </div>

    <hr class="my-4 opacity-10" />

    <!-- Personal info section -->
    <div class="mb-1">
      <p class="fs-xs fw-semibold text-muted text-uppercase tracking-wider mb-3">
        <i class="fa fa-id-card me-1"></i> Personal Info
      </p>
      <div class="row g-3">

        <!-- First Name -->
        <div class="col-md-4">
          <label class="form-label fw-medium" for="uf-firstname">
            First Name <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldErrors?.first_name }"
            id="uf-firstname"
            v-model="formData.first_name"
            placeholder="First"
            :disabled="readonly || isSubmitting"
          />
          <div v-if="fieldErrors?.first_name" class="invalid-feedback">
            {{ fieldErrors.first_name }}
          </div>
        </div>

        <!-- Middle Name -->
        <div class="col-md-4">
          <label class="form-label fw-medium" for="uf-middlename">
            Middle Name <span class="text-muted fw-normal fs-xs">(optional)</span>
          </label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldErrors?.middle_name }"
            id="uf-middlename"
            v-model="formData.middle_name"
            placeholder="Middle"
            :disabled="readonly || isSubmitting"
          />
          <div v-if="fieldErrors?.middle_name" class="invalid-feedback">
            {{ fieldErrors.middle_name }}
          </div>
        </div>

        <!-- Last Name -->
        <div class="col-md-4">
          <label class="form-label fw-medium" for="uf-lastname">
            Last Name <span v-if="!readonly" class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': fieldErrors?.last_name }"
            id="uf-lastname"
            v-model="formData.last_name"
            placeholder="Last"
            :disabled="readonly || isSubmitting"
          />
          <div v-if="fieldErrors?.last_name" class="invalid-feedback">
            {{ fieldErrors.last_name }}
          </div>
        </div>

      </div>
    </div>

    <!-- Password section (hidden when readonly or in edit mode) -->
    <template v-if="!readonly && isCreateMode">
      <hr class="my-4 opacity-10" />

      <div class="mb-1">
        <p class="fs-xs fw-semibold text-muted text-uppercase tracking-wider mb-3">
          <i class="fa fa-lock me-1"></i> Password
        </p>
        <div class="row g-3">

          <!-- Password -->
          <div class="col-md-6">
            <label class="form-label fw-medium" for="uf-password">
              Password <span v-if="isCreateMode" class="text-danger">*</span>
            </label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': fieldErrors?.password }"
                id="uf-password"
                v-model="formData.password"
                :placeholder="isCreateMode ? 'new password' : 'leave blank to keep current'"
                autocomplete="new-password"
                :disabled="isSubmitting"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <i class="fa fa-fw" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
              <div v-if="fieldErrors?.password" class="invalid-feedback">
                {{ fieldErrors.password }}
              </div>
            </div>
            <div v-if="isCreateMode" class="form-text text-muted">
              Minimum 8 characters — mix of upper, lower, number and symbol.
            </div>
          </div>

          <!-- Confirm Password (create mode only) -->
          <div class="col-md-6" v-if="isCreateMode">
            <label class="form-label fw-medium" for="uf-confirm-password">
              Confirm Password <span class="text-danger">*</span>
            </label>
            <div class="input-group">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': fieldErrors?.confirm_password }"
                id="uf-confirm-password"
                v-model="formData.confirm_password"
                placeholder="repeat password"
                autocomplete="new-password"
                :disabled="isSubmitting"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
              >
                <i class="fa fa-fw" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
              <div v-if="fieldErrors?.confirm_password" class="invalid-feedback">
                {{ fieldErrors.confirm_password }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </template>

    <!-- Submit -->
    <div v-if="!hideSubmit" class="d-flex justify-content-end mt-4 pt-2 border-top">
      <button type="submit" class="btn btn-primary px-4" :disabled="isSubmitting">
        <i class="fa me-2" :class="isSubmitting ? 'fa-circle-notch fa-spin' : 'fa-check'"></i>
        {{ isSubmitting ? "Saving…" : isCreateMode ? "Create User" : "Save Changes" }}
      </button>
    </div>

  </form>
</template>
