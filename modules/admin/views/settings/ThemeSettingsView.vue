<script setup>
import { ref, reactive, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";
import SettingsLayout from "../../components/settings/SettingsLayout.vue";

const form = reactive({
  defaultPageSize: 25,
  pageSizeLimit: 100,
});

const errors = ref({});
const loading = ref(false);
const saving = ref(false);

async function fetchSettings() {
  loading.value = true;
  const { data, request } = useApi("/admin/settings/theme", {
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
    console.error("Failed to fetch theme settings:", err);
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  saving.value = true;
  errors.value = {};

  const { data, error, request } = useApi("/admin/settings/theme", {
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
    console.error("Failed to save theme settings:", err);
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
      <h5 class="fw-bold mb-1">Theme & Appearance</h5>
      <p class="text-muted fs-sm mb-4">Configure display and pagination preferences.</p>

      <div class="row">
        <!-- Default Page Size -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-defaultPageSize">Default Page Size</label>
          <input
            id="field-defaultPageSize"
            v-model.number="form.defaultPageSize"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.defaultPageSize }"
            min="1"
            placeholder="e.g. 25"
          />
          <div class="form-text">Default number of items shown per page in tables</div>
          <div v-if="errors.defaultPageSize" class="invalid-feedback">
            {{ Array.isArray(errors.defaultPageSize) ? errors.defaultPageSize[0] : errors.defaultPageSize }}
          </div>
        </div>

        <!-- Page Size Limit -->
        <div class="col-lg-6 mb-3">
          <label class="form-label" for="field-pageSizeLimit">Page Size Limit</label>
          <input
            id="field-pageSizeLimit"
            v-model.number="form.pageSizeLimit"
            type="number"
            class="form-control"
            :class="{ 'is-invalid': errors.pageSizeLimit }"
            min="1"
            placeholder="e.g. 100"
          />
          <div class="form-text">Maximum number of items a user can display per page</div>
          <div v-if="errors.pageSizeLimit" class="invalid-feedback">
            {{ Array.isArray(errors.pageSizeLimit) ? errors.pageSizeLimit[0] : errors.pageSizeLimit }}
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
