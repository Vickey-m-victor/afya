<script setup>
import { ref, reactive, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";
import SettingsLayout from "../../components/settings/SettingsLayout.vue";

const form = reactive({
  from_name: "",
  smtp_server: "",
  smtp_port: 587,
  smtp_username: "",
  smtp_password: "",
  email_encryption: "tls",
});

const errors = ref({});
const loading = ref(false);
const saving = ref(false);

const encryptionOptions = [
  { value: "none", label: "None" },
  { value: "ssl", label: "SSL" },
  { value: "tls", label: "TLS" },
];

async function fetchSettings() {
  loading.value = true;
  const { data, request } = useApi("/admin/settings/mailer", {
    method: "GET",
    autoFetch: false,
  });

  try {
    await request();
    const settings = data.value?.dataPayload?.data || data.value?.dataPayload || {};
    Object.keys(form).forEach((key) => {
      if (settings[key] !== undefined) {
        form[key] = settings[key];
      }
    });
  } catch (err) {
    console.error("Failed to fetch mailer settings:", err);
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  saving.value = true;
  errors.value = {};

  const { data, error, request } = useApi("/admin/settings/mailer", {
    method: "POST",
    autoFetch: false,
    autoAlert: true,
  });

  try {
    await request({ ...form });

    if (error.value) {
      if (typeof error.value === "object" && !Array.isArray(error.value)) {
        errors.value = error.value;
      }
    } else {
      const settings = data.value?.dataPayload?.data || {};
      Object.keys(form).forEach((key) => {
        if (settings[key] !== undefined) {
          form[key] = settings[key];
        }
      });
    }
  } catch (err) {
    console.error("Failed to save mailer settings:", err);
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
      <h5 class="fw-bold mb-1">Mailer Settings</h5>
      <p class="text-muted fs-sm mb-4">Configure your SMTP server and email delivery settings.</p>

      <div class="row">
        <!-- From Name -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-from_name">From Name</label>
          <input
            id="field-from_name"
            v-model="form.from_name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.from_name }"
            placeholder="e.g. System Mailer"
          />
          <div v-if="errors.from_name" class="invalid-feedback">
            {{ Array.isArray(errors.from_name) ? errors.from_name[0] : errors.from_name }}
          </div>
        </div>

        <!-- SMTP Server -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-smtp_server">SMTP Server</label>
          <input
            id="field-smtp_server"
            v-model="form.smtp_server"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.smtp_server }"
            placeholder="e.g. mail.example.com"
          />
          <div v-if="errors.smtp_server" class="invalid-feedback">
            {{ Array.isArray(errors.smtp_server) ? errors.smtp_server[0] : errors.smtp_server }}
          </div>
        </div>

        <!-- SMTP Port -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-smtp_port">Port</label>
          <input
            id="field-smtp_port"
            v-model.number="form.smtp_port"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.smtp_port }"
            placeholder="e.g. 587"
          />
          <div class="form-text">Typically 465 for SSL or 587 for TLS</div>
          <div v-if="errors.smtp_port" class="invalid-feedback">
            {{ Array.isArray(errors.smtp_port) ? errors.smtp_port[0] : errors.smtp_port }}
          </div>
        </div>

        <!-- Encryption -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-email_encryption">Encryption</label>
          <select
            id="field-email_encryption"
            v-model="form.email_encryption"
            class="form-select"
            :class="{ 'is-invalid': errors.email_encryption }"
          >
            <option
              v-for="opt in encryptionOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
          <div v-if="errors.email_encryption" class="invalid-feedback">
            {{ Array.isArray(errors.email_encryption) ? errors.email_encryption[0] : errors.email_encryption }}
          </div>
        </div>

        <!-- SMTP Username -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-smtp_username">SMTP Username</label>
          <input
            id="field-smtp_username"
            v-model="form.smtp_username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.smtp_username }"
            placeholder="e.g. noreply@example.com"
          />
          <div v-if="errors.smtp_username" class="invalid-feedback">
            {{ Array.isArray(errors.smtp_username) ? errors.smtp_username[0] : errors.smtp_username }}
          </div>
        </div>

        <!-- SMTP Password -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-smtp_password">Password</label>
          <input
            id="field-smtp_password"
            v-model="form.smtp_password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.smtp_password }"
            placeholder="Enter SMTP password"
          />
          <div v-if="errors.smtp_password" class="invalid-feedback">
            {{ Array.isArray(errors.smtp_password) ? errors.smtp_password[0] : errors.smtp_password }}
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
