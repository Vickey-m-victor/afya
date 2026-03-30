<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from './form.vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';
import { parseBackendError, stripCrudSystemFields, withId, handleResponseAlert } from '@/composables/useWarpHelpers';

const route = useRoute();
const router = useRouter();
const alertStore = useAlertStore();

const formData = ref({});
const fieldErrors = ref({});
const formError = ref('');
const isSubmitting = ref(false);

const id = route.params.id;
const endpoints = {
  "list": "/hr/employees",
  "create": "/hr/employees/payroll",
  "view": "/hr/employee/{id}",
  "update": "/hr/employee/{id}",
  "delete": "/hr/employee/{id}"
};
const viewUrl = withId(endpoints.view, id);
const updateUrl = withId(endpoints.update, id);

const { data, request, isLoading } = useApi(viewUrl, {
  method: 'GET',
  autoFetch: true,
});

watch(data, () => {
  const payload = data.value?.dataPayload || data.value || {};
  formData.value = payload?.data || payload || {};
});

async function handleSubmit(payload) {
  isSubmitting.value = true;
  fieldErrors.value = {};
  formError.value = '';

  const { data: responseData, request: updateRequest, error } = useApi(updateUrl, {
    method: 'PUT',
    autoFetch: false,
  });

  const cleanedPayload = stripCrudSystemFields(payload);
  await updateRequest(cleanedPayload);
  isSubmitting.value = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    fieldErrors.value = parsed.fieldErrors;
    formError.value = parsed.message;
    if (!parsed.isValidation) {
      alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message || 'Request failed.' });
    }
    return;
  }

  handleResponseAlert(alertStore, responseData.value, 'Employee updated successfully.');
  router.push({ name: 'hr/employee' });
}
</script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">Update Employee</h3>
      </div>
      <div class="block-content">
        <Form
          :form-data="formData"
          :error="formError"
          :field-errors="fieldErrors"
          :is-loading="isLoading || isSubmitting"
          :readonly="false"
          :hide-submit="false"
          :compact="false"
          :on-submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>