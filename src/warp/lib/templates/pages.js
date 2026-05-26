function formatResourceName(resource) {
  return resource.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function toTitleCase(value) {
  return String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function inferIdExpression(resource) {
  const snake = formatResourceName(resource).replace(/-/g, '_');
  return `row.id ?? row.${snake}_id ?? row[Object.keys(row).find((key) => key.endsWith('_id'))]`;
}

function normalizeColumns(tableColumns = []) {
  const baseColumns = (tableColumns || []).map((column) => ({
    field: column.key,
    header: column.label || toTitleCase(column.key),
  }));

  return baseColumns.filter((column) => column.field !== 'id');
}

function normalizeApiPath(path = '') {
  const value = String(path || '').trim();
  if (!value) return '';

  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.replace(/^\/v1(?=\/|$)/, '') || '/';
}

function stripTemplateSegments(path = '') {
  return String(path || '').replace(/\/\{[^}]+\}/g, '');
}

function resolveEndpoint(endpoints = {}, routeKey = '', moduleName = '') {
  const fallback = `/${moduleName}/${routeKey}`;
  const list = normalizeApiPath(stripTemplateSegments(endpoints.list || fallback));
  const create = normalizeApiPath(stripTemplateSegments(endpoints.create || list));
  const view = normalizeApiPath(endpoints.view || `${list}/{id}`);
  const update = normalizeApiPath(endpoints.update || view);
  const remove = normalizeApiPath(endpoints.delete || view);

  return {
    list,
    create,
    view,
    update,
    delete: remove,
  };
}

export function createPageTemplate(resource, moduleName, endpoints = {}, routeKey = '') {
  return `<script setup>
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

const endpoints = ${JSON.stringify(resolveEndpoint(endpoints, routeKey || formatResourceName(resource), moduleName), null, 2)};

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

  handleResponseAlert(alertStore, responseData.value, '${toTitleCase(resource)} created successfully.');
  router.push({ name: '${moduleName}/${routeKey || formatResourceName(resource)}' });
}
<\/script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">Create ${toTitleCase(resource)}</h3>
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
<\/template>`;
}

export function updatePageTemplate(resource, moduleName, endpoints = {}, routeKey = '') {
  return `<script setup>
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
const endpoints = ${JSON.stringify(resolveEndpoint(endpoints, routeKey || formatResourceName(resource), moduleName), null, 2)};
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

  handleResponseAlert(alertStore, responseData.value, '${toTitleCase(resource)} updated successfully.');
  router.push({ name: '${moduleName}/${routeKey || formatResourceName(resource)}' });
}
<\/script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">Update ${toTitleCase(resource)}</h3>
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
<\/template>`;
}

export function viewPageTemplate(resource, moduleName, endpoints = {}, routeKey = '') {
  return `<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form from './form.vue';
import { useApi } from '@/helpers/useApi';
import { withId } from '@/composables/useWarpHelpers';

const route = useRoute();
const router = useRouter();

const formData = ref({});

const id = route.params.id;
const endpoints = ${JSON.stringify(resolveEndpoint(endpoints, routeKey || formatResourceName(resource), moduleName), null, 2)};
const viewUrl = withId(endpoints.view, id);

const { data, isLoading } = useApi(viewUrl, {
  method: 'GET',
  autoFetch: true,
});

watch(data, () => {
  const payload = data.value?.dataPayload || data.value || {};
  formData.value = payload?.data || payload || {};
});
<\/script>

<template>
  <div class="content">
    <div class="block block-rounded">
      <div class="block-header block-header-default">
        <h3 class="block-title">View ${toTitleCase(resource)}</h3>
        <div class="block-options">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="router.push({ name: '${moduleName}/${routeKey || formatResourceName(resource)}/update', params: { id } })"
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
<\/template>`;
}

export function indexPageTemplate(resource, tableColumns, moduleName, endpoints = {}, routeKey = '') {
  const columns = normalizeColumns(tableColumns);
  const idExpr = inferIdExpression(resource);

  return `<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from '@/components/DataTable/DataTable.vue';
import { useDataTable } from '@/composables/useDataTable';
import { useApi } from '@/helpers/useApi';
import { useModalStore } from '@/stores/modal';
import { useAlertStore } from '@/stores/alert';
import { useAlert } from '@/composables/alerts';
import { parseBackendError, stripCrudSystemFields, withId, handleResponseAlert } from '@/composables/useWarpHelpers';
import Form from './form.vue';

const modalStore = useModalStore();
const alertStore = useAlertStore();
const { confirmAction } = useAlert();
const router = useRouter();

const {
  searchQuery,
  currentPage,
  perPage,
  sortBy,
  sortDir,
  totalCount,
  totalPages,
  perPageOptions,
  setSearchDebounced,
  setPage,
  setPerPage,
  setSort,
  syncFromResponse,
  buildQueryParams,
} = useDataTable({
  initialSortBy: '${columns[0]?.field || 'id'}',
  initialSortDir: 'desc',
});

const tableColumns = ${JSON.stringify(columns, null, 2)};

const rows = ref([]);
const loading = ref(false);
const modalMode = ref('create');

const endpoints = ${JSON.stringify(resolveEndpoint(endpoints, routeKey || formatResourceName(resource), moduleName), null, 2)};

function rowId(row) {
  return ${idExpr};
}

function normalizeRows(items) {
  const list = Array.isArray(items) ? items : Object.values(items || {});
  return list.map((row) => ({
    ...row,
    __rowId: rowId(row),
  }));
}

async function fetchRows() {
  loading.value = true;

  const { data: responseData, request, error } = useApi(endpoints.list, {
    method: 'GET',
    autoFetch: false,
  });

  try {
    await request(null, buildQueryParams());
    if (error.value) throw error.value;
    const payload = responseData.value?.dataPayload || responseData.value || {};
    syncFromResponse(payload);
    rows.value = normalizeRows(payload?.data);
  } catch (err) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Failed to fetch records.' });
  } finally {
    loading.value = false;
  }
}

function openFormModal(title, formData = {}, readonly = false) {
  modalStore.openModal({
    component: Form,
    title,
    size: 'lg',
    showFooter: false,
    props: {
      formData: stripCrudSystemFields(formData),
      error: '',
      fieldErrors: {},
      isLoading: false,
      readonly,
      hideSubmit: readonly,
      compact: true,
      onSubmit: handleSubmit,
    },
  });
}

function handleCreate() {
  modalMode.value = 'create';
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: '${moduleName}/${routeKey || formatResourceName(resource)}/create' });
    return;
  }

  openFormModal('Create ${toTitleCase(resource)}', {}, false);
}

function handleView(row) {
  modalMode.value = 'view';
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    const id = rowId(row);
    router.push({ name: '${moduleName}/${routeKey || formatResourceName(resource)}/view', params: { id } });
    return;
  }

  openFormModal('View ${toTitleCase(resource)}', { ...row }, true);
}

function handleEdit(row) {
  modalMode.value = 'edit';
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    const id = rowId(row);
    router.push({ name: '${moduleName}/${routeKey || formatResourceName(resource)}/update', params: { id } });
    return;
  }

  openFormModal('Edit ${toTitleCase(resource)}', { ...row }, false);
}

async function handleDelete(row) {
  const id = rowId(row);
  if (!id) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Record id not found.' });
    return;
  }

  const result = await confirmAction(
    'Delete this record?',
    'This action cannot be undone. The record will be permanently removed.'
  );
  if (!result.isConfirmed) return;

  const deleteUrl = withId(endpoints.delete, id);
  const { data: responseData, request, error } = useApi(deleteUrl, {
    method: 'DELETE',
    autoFetch: false,
  });

  await request();

  if (error.value) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Failed to delete record.' });
    return;
  }

  handleResponseAlert(alertStore, responseData.value, '${toTitleCase(resource)} deleted successfully.');
  await fetchRows();
}

async function handleSubmit(payload) {
  const isEdit = modalMode.value === 'edit';
  const id = rowId(payload);

  modalStore.props.isLoading = true;
  modalStore.props.fieldErrors = {};
  modalStore.props.error = '';

  const endpoint = isEdit && id
    ? withId(endpoints.update, id)
    : endpoints.create;
  const method = isEdit ? 'PUT' : 'POST';

  const { data: responseData, request, error } = useApi(endpoint, {
    method,
    autoFetch: false,
  });

  const cleanedPayload = stripCrudSystemFields(payload);
  await request(cleanedPayload);
  modalStore.props.isLoading = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    modalStore.props.fieldErrors = parsed.fieldErrors;
    modalStore.props.error = parsed.message;
    if (!parsed.isValidation) {
      alertStore.show({
        theme: 'danger',
        type: 'toast',
        message: parsed.message || 'Request failed.',
      });
    }
    return;
  }

  handleResponseAlert(
    alertStore,
    responseData.value,
    isEdit
      ? '${toTitleCase(resource)} updated successfully.'
      : '${toTitleCase(resource)} created successfully.'
  );

  modalStore.closeModal();
  await fetchRows();
}

function handleSearch(query) {
  setSearchDebounced(query, fetchRows);
}

function handlePageChange(page) {
  setPage(page);
  fetchRows();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchRows();
}

function handleSort(field) {
  setSort(field);
  fetchRows();
}

onMounted(fetchRows);
<\/script>

<template>
  <div class="content">
    <DataTable
      title="${toTitleCase(resource)}"
      :data="rows"
      :columns="tableColumns"
      :loading="loading"
      row-key="__rowId"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search ${routeKey || formatResourceName(resource)}..."
      create-label="New ${toTitleCase(resource)}"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No records found"
      @create="handleCreate"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    />
  </div>
<\/template>`;
}
