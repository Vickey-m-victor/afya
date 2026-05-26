<script setup>
import { ref, reactive, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";
import SettingsLayout from "../../components/settings/SettingsLayout.vue";

const form = reactive({
  business_name: "",
  physical_address: "",
  postal_address: "",
  email_address: "",
  website: "",
  primary_mobile_number: "",
});

const errors = ref({});
const loading = ref(false);
const saving = ref(false);

const fields = [
  { key: "business_name", label: "Business Name", type: "text", placeholder: "e.g. Acme Corp" },
  { key: "physical_address", label: "Physical Address", type: "text", placeholder: "e.g. Mombasa" },
  { key: "postal_address", label: "Postal Address", type: "text", placeholder: "e.g. 0000" },
  { key: "email_address", label: "Email Address", type: "email", placeholder: "e.g. info@example.com" },
  { key: "website", label: "Website", type: "url", placeholder: "e.g. https://example.com" },
  { key: "primary_mobile_number", label: "Primary Mobile Number", type: "tel", placeholder: "e.g. +254700000000" },
];

async function fetchSettings() {
  loading.value = true;
  const { data, request } = useApi("/admin/settings/general", {
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
    console.error("Failed to fetch general settings:", err);
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  saving.value = true;
  errors.value = {};

  const { data, error, request } = useApi("/admin/settings/general", {
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
    console.error("Failed to save general settings:", err);
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
      <h5 class="fw-bold mb-1">General Settings</h5>
      <p class="text-muted fs-sm mb-4">Configure your business information and contact details.</p>

      <div class="row">
        <div
          v-for="field in fields"
          :key="field.key"
          class="col-lg-6 mb-3"
        >
          <label class="form-label" :for="'field-' + field.key">
            {{ field.label }}
          </label>
          <input
            :id="'field-' + field.key"
            v-model="form[field.key]"
            :type="field.type"
            class="form-control"
            :class="{ 'is-invalid': errors[field.key] }"
            :placeholder="field.placeholder"
          />
          <div v-if="errors[field.key]" class="invalid-feedback">
            {{ Array.isArray(errors[field.key]) ? errors[field.key][0] : errors[field.key] }}
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
