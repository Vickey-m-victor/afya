<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Form from './form.vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError, stripCrudSystemFields, handleResponseAlert } from '@/composables/useWarpHelpers';

const router = useRouter();
const alertStore = useAlertStore();

const formData = ref({});
const fieldErrors = ref({});
const formError = ref('');
const isLoading = ref(false);

const endpoints = {
  "list": "/hr/employer-types",
  "create": "/hr/employer-type",
  "view": "/hr/employer-type/{id}",
  "update": "/hr/employer-type/{id}",
  "delete": "/hr/employer-type/{id}"
};

async function handleSubmit(payload) {
  isLoading.value = true;
  fieldErrors.value = {};
  formError.value = '';

  const { data: responseData, request, error } = useApi(endpoints.create, {
    method: 'POST',
    autoFetch: false,
  });

  const cleanedPayload = stripCrudSystemFields(payload);
  await request(cleanedPayload);
  isLoading.value = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    fieldErrors.value = parsed.fieldErrors;
    formError.value = parsed.message;
    if (!parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
    }
    return;
  }

  handleResponseAlert(alertStore, responseData.value, 'EmployerType created successfully.');
  router.push({ name: 'hr/employer-type' });
}
</script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">Create EmployerType</h3>
      </div>
      <div class="block-content">
        <Form
          :form-data="formData"
          :error="formError"
          :field-errors="fieldErrors"
          :is-loading="isLoading"
          :readonly="false"
          :hide-submit="false"
          :compact="false"
          :on-submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>