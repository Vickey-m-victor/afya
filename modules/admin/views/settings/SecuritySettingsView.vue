<script setup>
import { ref, reactive, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";
import SettingsLayout from "../../components/settings/SettingsLayout.vue";

const form = reactive({
  otp_expiry: 1,
  trusted_device_duration: 30,
  maximum_login_attempts: 5,
  profile_lock_duration: 15,
  two_factor_auth: false,
});

const errors = ref({});
const loading = ref(false);
const saving = ref(false);

const numberFields = [
  {
    key: "otp_expiry",
    label: "OTP Expiry",
    description: "OTP expiry time in minutes",
    min: 1,
    max: 60,
    suffix: "minutes",
  },
  {
    key: "trusted_device_duration",
    label: "Trusted Device Duration",
    description: "How long a device remains trusted",
    min: 1,
    max: 60,
    suffix: "days",
  },
  {
    key: "maximum_login_attempts",
    label: "Maximum Login Attempts",
    description: "Max allowed login attempts before lockout",
    min: 1,
    max: 20,
    suffix: "attempts",
  },
  {
    key: "profile_lock_duration",
    label: "Account Lock Duration",
    description: "How long an account stays locked after exceeding login attempts",
    min: 1,
    max: 1440,
    suffix: "minutes",
  },
];

async function fetchSettings() {
  loading.value = true;
  const { data, request } = useApi("/admin/settings/security", {
    method: "GET",
    autoFetch: false,
  });

  try {
    await request();
    const settings = data.value?.dataPayload?.data || data.value?.dataPayload || {};
    Object.keys(form).forEach((key) => {
      if (settings[key] !== undefined) {
        if (key === "two_factor_auth") {
          form[key] = !!settings[key];
        } else {
          form[key] = settings[key];
        }
      }
    });
  } catch (err) {
    console.error("Failed to fetch security settings:", err);
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  saving.value = true;
  errors.value = {};

  const { data, error, request } = useApi("/admin/settings/security", {
    method: "POST",
    autoFetch: false,
    autoAlert: true,
  });

  try {
    const payload = {
      ...form,
      two_factor_auth: form.two_factor_auth ? 1 : 0,
    };
    await request(payload);

    if (error.value) {
      if (typeof error.value === "object" && !Array.isArray(error.value)) {
        errors.value = error.value;
      }
    } else {
      const settings = data.value?.dataPayload?.data || {};
      Object.keys(form).forEach((key) => {
        if (settings[key] !== undefined) {
          if (key === "two_factor_auth") {
            form[key] = !!settings[key];
          } else {
            form[key] = settings[key];
          }
        }
      });
    }
  } catch (err) {
    console.error("Failed to save security settings:", err);
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  fetchSettings();
});
</script>

<template>
  <SettingsLayout>
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-3">Loading settings...</p>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="saveSettings">
      <h5 class="fw-bold mb-1">Privacy & Security</h5>
      <p class="text-muted fs-sm mb-4">Configure authentication, login policies, and security preferences.</p>

      <div class="row">
        <!-- Number fields -->
        <div
          v-for="field in numberFields"
          :key="field.key"
          class="col-lg-6 mb-3"
        >
          <label class="form-label" :for="'field-' + field.key">
            {{ field.label }}
          </label>
          <div class="input-group">
            <input
              :id="'field-' + field.key"
              v-model.number="form[field.key]"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors[field.key] }"
              :min="field.min"
              :max="field.max"
            />
            <span class="input-group-text text-muted fs-sm">{{ field.suffix }}</span>
            <div v-if="errors[field.key]" class="invalid-feedback">
              {{ Array.isArray(errors[field.key]) ? errors[field.key][0] : errors[field.key] }}
            </div>
          </div>
          <div class="form-text">{{ field.description }} ({{ field.min }}–{{ field.max }})</div>
        </div>

        <!-- Two-Factor Auth Toggle -->
        <div class="col-12 mb-3">
          <div class="p-3 bg-body-light rounded border">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h6 class="fw-bold mb-1">Two-Factor Authentication</h6>
                <p class="text-muted fs-sm mb-0">
                  Require users to verify their identity with a second factor when logging in.
                </p>
              </div>
              <div class="form-check form-switch ms-3">
                <input
                  id="field-two_factor_auth"
                  v-model="form.two_factor_auth"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  style="width: 3em; height: 1.5em;"
                />
              </div>
            </div>
            <div v-if="errors.two_factor_auth" class="text-danger fs-sm mt-1">
              {{ Array.isArray(errors.two_factor_auth) ? errors.two_factor_auth[0] : errors.two_factor_auth }}
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end pt-3 border-top mt-2">
        <button
          type="submit"
          class="btn btn-primary px-4"
          :disabled="saving"
        >
          <span v-if="saving">
            <span class="spinner-border spinner-border-sm me-1" role="status"></span>
            Saving...
          </span>
          <span v-else>
            <i class="fa fa-save me-1"></i> Save Settings
          </span>
        </button>
      </div>
    </form>
  </SettingsLayout>
</template>
