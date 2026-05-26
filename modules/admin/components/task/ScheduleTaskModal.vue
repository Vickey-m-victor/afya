<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";
import { useAlertStore } from "@/stores/alert";
import { useModalStore } from "@/stores/modal";

const props = defineProps({
  registerSubmit: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(["saved"]);
const alertStore = useAlertStore();
const modalStore = useModalStore();

// Form
const form = reactive({
  task_title: "",
  system_service: "",
  is_recurring: false,
  schedule_type: "interval",
  schedule_value: "",
  service_payload: {},
});

const errors = ref({});
const services = ref([]);
const payloadFields = ref([]);
const loadingServices = ref(false);
const loadingFields = ref(false);

// Schedule presets
const presets = [
  { label: "Run Once", icon: "fa-play", type: "interval", value: "0", recurring: false },
  { label: "Every 5 Min", icon: "fa-forward", type: "interval", value: "300", recurring: true },
  { label: "Hourly", icon: "fa-clock", type: "interval", value: "3600", recurring: true },
  { label: "Daily", icon: "fa-calendar-day", type: "cron", value: "0 0 * * *", recurring: true },
];

function applyPreset(preset) {
  form.is_recurring = preset.recurring;
  form.schedule_type = preset.type;
  form.schedule_value = preset.value;
}

// Fetch services list
async function fetchServices() {
  loadingServices.value = true;
  const { data, request } = useApi("/admin/task/services", {
    method: "GET",
    autoFetch: false,
  });

  try {
    await request();
    const payload = data.value?.dataPayload?.data || data.value?.dataPayload || [];
    services.value = Array.isArray(payload) ? payload : Object.values(payload);
  } catch (err) {
    console.error("Failed to fetch services:", err);
  } finally {
    loadingServices.value = false;
  }
}

// Fetch payload fields when service changes
watch(
  () => form.system_service,
  async (newVal) => {
    payloadFields.value = [];
    form.service_payload = {};
    if (!newVal) return;

    loadingFields.value = true;
    const { data, request } = useApi(`/admin/task/services/${encodeURIComponent(newVal)}`, {
      method: "GET",
      autoFetch: false,
    });

    try {
      await request();
      const fields = data.value?.dataPayload?.data || data.value?.dataPayload || [];
      payloadFields.value = Array.isArray(fields) ? fields : Object.values(fields);
      // Initialize payload keys
      payloadFields.value.forEach((f) => {
        if (f.type === "tagsInput") {
          form.service_payload[f.key || f.name] = [];
        } else {
          form.service_payload[f.key || f.name] = "";
        }
      });
    } catch (err) {
      console.error("Failed to fetch payload fields:", err);
    } finally {
      loadingFields.value = false;
    }
  }
);

// Tags input helpers
function addTag(fieldKey, event) {
  const val = event.target.value.trim();
  if (!val) return;
  if (!Array.isArray(form.service_payload[fieldKey])) {
    form.service_payload[fieldKey] = [];
  }
  if (!form.service_payload[fieldKey].includes(val)) {
    form.service_payload[fieldKey].push(val);
  }
  event.target.value = "";
}

function removeTag(fieldKey, index) {
  form.service_payload[fieldKey].splice(index, 1);
}

// Submit
onMounted(() => {
  fetchServices();
  if (typeof props.registerSubmit === "function") {
    props.registerSubmit(handleSubmit);
  }
});

async function handleSubmit() {
  const shouldManageSubmitting = !modalStore.isSubmitting;
  if (shouldManageSubmitting) modalStore.setSubmitting(true);

  errors.value = {};

  const { data, error, request } = useApi("/admin/task/manager", {
    method: "POST",
    autoFetch: false,
    autoAlert: true,
  });

  try {
    const payload = {
      task_title: form.task_title,
      system_service: form.system_service,
      is_recurring: form.is_recurring ? 1 : 0,
      schedule_type: form.schedule_type,
      schedule_value: form.schedule_value,
      service_payload: form.service_payload,
    };

    await request(payload);

    if (error.value) {
      if (typeof error.value === "object" && !Array.isArray(error.value)) {
        errors.value = error.value;
      }
      return false;
    }

    emit("saved");
    return true;
  } catch (err) {
    console.error("Failed to schedule task:", err);
    return false;
  } finally {
    if (shouldManageSubmitting) modalStore.setSubmitting(false);
  }
}

function getFieldError(key) {
  return errors.value?.[key] || errors.value?.["service_payload." + key];
}
</script>

<template>
  <div>
    <!-- Quick Schedule Presets -->
    <div class="mb-4">
      <label class="form-label fw-semibold fs-sm text-uppercase text-muted mb-2">
        Quick Schedule
      </label>
      <div class="d-flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset.label"
          type="button"
          class="btn btn-sm"
          :class="
            form.schedule_type === preset.type &&
            form.schedule_value === preset.value &&
            form.is_recurring === preset.recurring
              ? 'btn-primary'
              : 'btn-alt-secondary'
          "
          @click="applyPreset(preset)"
          :disabled="modalStore.isSubmitting"
        >
          <i class="fa me-1" :class="preset.icon"></i>
          {{ preset.label }}
        </button>
      </div>
    </div>

    <hr class="my-3" />

    <!-- Task Title -->
    <div class="mb-3">
      <label class="form-label" for="task-title">
        Task Title <span class="text-danger">*</span>
      </label>
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.task_title }"
        id="task-title"
        v-model="form.task_title"
        placeholder="e.g. Daily Email Notification"
        :disabled="modalStore.isSubmitting"
      />
      <div v-if="errors.task_title" class="invalid-feedback d-block">
        {{ errors.task_title }}
      </div>
    </div>

    <!-- Service + Recurring Row -->
    <div class="row mb-3">
      <div class="col-sm-9">
        <label class="form-label" for="system-service">
          System Service <span class="text-danger">*</span>
        </label>
        <select
          class="form-select"
          :class="{ 'is-invalid': errors.system_service }"
          id="system-service"
          v-model="form.system_service"
          :disabled="modalStore.isSubmitting || loadingServices"
        >
          <option value="">
            {{ loadingServices ? "Loading services..." : "--- Select Service ---" }}
          </option>
          <option v-for="svc in services" :key="svc.key" :value="svc.key">
            {{ svc.label }}
          </option>
        </select>
        <div v-if="errors.system_service" class="invalid-feedback d-block">
          {{ errors.system_service }}
        </div>
      </div>
      <div class="col-sm-3">
        <label class="form-label" for="is-recurring">Is Recurring</label>
        <div class="form-check form-switch mt-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="is-recurring"
            v-model="form.is_recurring"
            :disabled="modalStore.isSubmitting"
          />
          <label class="form-check-label" for="is-recurring">
            {{ form.is_recurring ? "Yes" : "No" }}
          </label>
        </div>
      </div>
    </div>

    <!-- Schedule Fields (always visible for clarity) -->
    <div class="row mb-3">
      <div class="col-sm-6">
        <label class="form-label" for="schedule-type">Schedule Type</label>
        <select
          class="form-select"
          :class="{ 'is-invalid': errors.schedule_type }"
          id="schedule-type"
          v-model="form.schedule_type"
          :disabled="modalStore.isSubmitting"
        >
          <option value="interval">Interval (seconds)</option>
          <option value="cron">Cron Expression</option>
        </select>
        <div v-if="errors.schedule_type" class="invalid-feedback d-block">
          {{ errors.schedule_type }}
        </div>
      </div>
      <div class="col-sm-6">
        <label class="form-label" for="schedule-value">
          {{ form.schedule_type === "cron" ? "Cron Expression" : "Interval (seconds)" }}
        </label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.schedule_value }"
          id="schedule-value"
          v-model="form.schedule_value"
          :placeholder="form.schedule_type === 'cron' ? '0 */5 * * *' : '300'"
          :disabled="modalStore.isSubmitting"
        />
        <div v-if="errors.schedule_value" class="invalid-feedback d-block">
          {{ errors.schedule_value }}
        </div>
        <div class="form-text" v-if="form.schedule_type === 'cron'">
          e.g. <code>0 */5 * * *</code> = every 5 minutes
        </div>
      </div>
    </div>

    <!-- Dynamic Payload Fields -->
    <div v-if="form.system_service" class="mt-3">
      <hr class="my-3" />
      <label class="form-label fw-semibold fs-sm text-uppercase text-muted mb-2">
        <i class="fa fa-puzzle-piece me-1"></i> Service Payload
      </label>

      <div v-if="loadingFields" class="text-center py-3">
        <div class="spinner-border spinner-border-sm text-primary me-1" role="status"></div>
        Loading fields...
      </div>

      <div v-else-if="payloadFields.length === 0" class="text-muted fs-sm py-2">
        No payload fields required for this service.
      </div>

      <div v-else>
        <div
          v-for="field in payloadFields"
          :key="field.key || field.name"
          class="mb-3"
        >
          <label class="form-label" :for="'payload-' + (field.key || field.name)">
            {{ field.label || field.name }}
          </label>

          <!-- Dropdown -->
          <select
            v-if="field.type === 'dropDownList' && field.predefinedOptions"
            class="form-select"
            :class="{ 'is-invalid': getFieldError(field.key || field.name) }"
            :id="'payload-' + (field.key || field.name)"
            v-model="form.service_payload[field.key || field.name]"
            :disabled="modalStore.isSubmitting"
          >
            <option value="">Select {{ field.label || field.name }}</option>
            <option
              v-for="(optLabel, optKey) in field.predefinedOptions"
              :key="optKey"
              :value="optKey"
            >
              {{ optLabel }}
            </option>
          </select>

          <!-- Tags Input -->
          <div
            v-else-if="field.type === 'tagsInput'"
            class="tags-input-container"
          >
            <div
              class="form-control d-flex flex-wrap gap-1 align-items-center"
              :class="{ 'is-invalid': getFieldError(field.key || field.name) }"
              style="min-height: 46px; cursor: text"
              @click="$refs['tagInput-' + (field.key || field.name)]?.[0]?.focus()"
            >
              <span
                v-for="(tag, idx) in (form.service_payload[field.key || field.name] || [])"
                :key="idx"
                class="badge bg-primary d-inline-flex align-items-center gap-1 py-1 px-2"
              >
                {{ tag }}
                <button
                  type="button"
                  class="btn-close btn-close-white"
                  style="font-size: 0.5rem"
                  @click.stop="removeTag(field.key || field.name, idx)"
                  :disabled="modalStore.isSubmitting"
                ></button>
              </span>
              <input
                :ref="'tagInput-' + (field.key || field.name)"
                type="text"
                class="border-0 flex-grow-1"
                style="outline: none; min-width: 120px"
                :placeholder="field.placeholder || 'Type and press Enter...'"
                :disabled="modalStore.isSubmitting"
                @keydown.enter.prevent="addTag(field.key || field.name, $event)"
                @keydown.comma.prevent="addTag(field.key || field.name, $event)"
              />
            </div>
          </div>

          <!-- Text Input (default) -->
          <input
            v-else
            type="text"
            class="form-control"
            :class="{ 'is-invalid': getFieldError(field.key || field.name) }"
            :id="'payload-' + (field.key || field.name)"
            v-model="form.service_payload[field.key || field.name]"
            :placeholder="field.placeholder || ''"
            :disabled="modalStore.isSubmitting"
          />

          <div
            v-if="getFieldError(field.key || field.name)"
            class="invalid-feedback d-block"
          >
            {{ getFieldError(field.key || field.name) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden submit for form -->
    <button type="submit" class="d-none" aria-hidden="true"></button>
  </div>
</template>

<style scoped>
.tags-input-container .badge {
  font-size: 0.8rem;
  font-weight: 500;
}

.tags-input-container .btn-close {
  padding: 0;
  margin: 0;
}
</style>
