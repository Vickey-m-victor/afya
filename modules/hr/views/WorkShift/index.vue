<script setup>
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
  initialSortBy: 'work_shift_id',
  initialSortDir: 'desc',
});

const tableColumns = [
  {
    "field": "work_shift_id",
    "header": "Work Shift Id"
  },
  {
    "field": "facility_id",
    "header": "Facility Id"
  },
  {
    "field": "shift_name",
    "header": "Shift Name"
  },
  {
    "field": "shift_code",
    "header": "Shift Code"
  },
  {
    "field": "start_time",
    "header": "Start Time"
  },
  {
    "field": "end_time",
    "header": "End Time"
  },
  {
    "field": "duration_hours",
    "header": "Duration Hours"
  },
  {
    "field": "grace_period_minutes",
    "header": "Grace Period Minutes"
  },
  {
    "field": "is_overnight",
    "header": "Is Overnight"
  },
  {
    "field": "is_weekend_shift",
    "header": "Is Weekend Shift"
  },
  {
    "field": "shift_allowance",
    "header": "Shift Allowance"
  },
  {
    "field": "color_code",
    "header": "Color Code"
  },
  {
    "field": "status",
    "header": "Status"
  },
  {
    "field": "shift_type",
    "header": "Shift Type"
  },
  {
    "field": "is_flexible",
    "header": "Is Flexible"
  }
];

const rows = ref([]);
const loading = ref(false);
const modalMode = ref('create');

const endpoints = {
  "list": "/hr/work-shifts",
  "create": "/hr/work-shift",
  "view": "/hr/work-shift/{id}",
  "update": "/hr/work-shift/{id}",
  "delete": "/hr/work-shift/{id}"
};

function rowId(row) {
  return row.id ?? row.work_shift_id ?? row[Object.keys(row).find((key) => key.endsWith('_id'))];
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
    router.push({ name: 'hr/work-shift/create' });
    return;
  }

  openFormModal('Create WorkShift', {}, false);
}

function handleView(row) {
  modalMode.value = 'view';
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    const id = rowId(row);
    router.push({ name: 'hr/work-shift/view', params: { id } });
    return;
  }

  openFormModal('View WorkShift', { ...row }, true);
}

function handleEdit(row) {
  modalMode.value = 'edit';
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    const id = rowId(row);
    router.push({ name: 'hr/work-shift/update', params: { id } });
    return;
  }

  openFormModal('Edit WorkShift', { ...row }, false);
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

  handleResponseAlert(alertStore, responseData.value, 'WorkShift deleted successfully.');
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
      ? 'WorkShift updated successfully.'
      : 'WorkShift created successfully.'
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
</script>

<template>
  <div class="content">
    <DataTable
      title="WorkShift"
      :data="rows"
      :columns="tableColumns"
      :loading="loading"
      row-key="__rowId"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search work-shift..."
      create-label="New WorkShift"
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
</template>