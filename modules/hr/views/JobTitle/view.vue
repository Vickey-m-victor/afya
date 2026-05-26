<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from './form.vue';
import { useApi } from '@/helpers/useApi';
import { withId } from '@/composables/useWarpHelpers';

const route = useRoute();
const router = useRouter();

const formData = ref({});

const id = route.params.id;
const endpoints = {
  "list": "/hr/job-titles",
  "create": "/hr/job-title",
  "view": "/hr/job-title/{id}",
  "update": "/hr/job-title/{id}",
  "delete": "/hr/job-title/{id}"
};
const viewUrl = withId(endpoints.view, id);

const { data, isLoading } = useApi(viewUrl, {
  method: 'GET',
  autoFetch: true,
});

watch(data, () => {
  const payload = data.value?.dataPayload || data.value || {};
  formData.value = payload?.data || payload || {};
});
</script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">View JobTitle</h3>
        <div class="block-options">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="router.push({ name: 'hr/job-title/update', params: { id } })"
          >
            Edit
          </button>
        </div>
      </div>
      <div class="block-content">
        <Form
          :form-data="formData"
          :is-loading="isLoading"
          :readonly="true"
          :hide-submit="true"
          :compact="false"
        />
      </div>
    </div>
  </div>
</template>