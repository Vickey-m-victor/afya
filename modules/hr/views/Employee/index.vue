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
import QuickCreateEmployeeModal from './QuickCreateEmployeeModal.vue';

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
  initialSortBy: 'facility_id',
  initialSortDir: 'desc',
});

const tableColumns = [
  {
    "field": "facility_name",
    "header": "Facility"
  },
  {
    "field": "employment_type_name",
    "header": "Employment Type"
  },

  {
    "field": "department_name",
    "header": "Department"
  },
  {
    "field": "job_title_name",
    "header": "Job Title"
  },
  {
    "field": "job_group_name",
    "header": "Job Group"
  },

  {
    "field": "hire_date",
    "header": "Hire Date"
  },
  {
    "field": "probation_end_date",
    "header": "Probation End Date"
  },
  {
    "field": "confirmation_date",
    "header": "Confirmation Date"
  },
  {
    "field": "termination_date",
    "header": "Termination Date"
  }
];

const rows = ref([]);
const loading = ref(false);
const modalMode = ref('create');

const endpoints = {
  "list": "/hr/employees",
  "create": "/hr/employees/payroll",
  "view": "/hr/employee/{id}",
  "update": "/hr/employee/{id}",
  "delete": "/hr/employee/{id}"
};

function rowId(row) {
  if (!row || typeof row !== 'object') return null;

  // Be strict: avoid accidentally using `facility_id`, `department_id`, etc.
  const preferredKeys = [
    'employee_id',
    'employeeId',
    'hr_employee_id',
    'hrEmployeeId',
    'id',
  ];

  for (const key of preferredKeys) {
    const value = row?.[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }

  // As a last resort, accept obvious variants (but still avoid random *_id fields)
  const candidate = row?.employee_number ?? row?.employeeNo ?? null;
  return candidate || null;
}

function normalizeRows(items) {
  const list = Array.isArray(items) ? items : Object.values(items || {});
  return list.map((row) => ({
    ...row,
    // Flatten nested lookup objects from API so DataTable can render them
    facility_id: row?.facility_id ?? row?.facility?.id ?? null,
    facility_name: row?.facility_name ?? row?.facility?.name ?? null,
    employment_type_id: row?.employment_type_id ?? row?.employment_type?.id ?? null,
    employment_type_name: row?.employment_type_name ?? row?.employment_type?.name ?? null,
    residential_status_id: row?.residential_status_id ?? row?.residential_status?.id ?? null,
    residential_status_name: row?.residential_status_name ?? row?.residential_status?.name ?? null,
    department_id: row?.department_id ?? row?.department?.id ?? null,
    department_name: row?.department_name ?? row?.department?.name ?? null,
    job_title_id: row?.job_title_id ?? row?.job_title?.id ?? null,
    job_title_name: row?.job_title_name ?? row?.job_title?.name ?? null,
    job_group_id: row?.job_group_id ?? row?.job_group?.id ?? null,
    job_group_name: row?.job_group_name ?? row?.job_group?.name ?? null,
    work_shift_id: row?.work_shift_id ?? row?.work_shift?.id ?? null,
    work_shift_name: row?.work_shift_name ?? row?.work_shift?.name ?? null,
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
  modalStore.openModal({
    component: QuickCreateEmployeeModal,
    title: 'New Employee',
    size: 'xl',
    showFooter: false,
    scrollable: true,
    props: {
      onCreated: async () => {
        await fetchRows();
      },
    },
  });
}

function handleView(row) {
  const id = rowId(row);
  if (!id) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Employee id not found for this row.' });
    return;
  }
  router.push({ name: 'hr/employee/view', params: { id } });
}

function handleEdit(row) {
  const stage = Number(row?.onboarding_stage ?? row?.onboarding_status?.current_stage ?? 0);
  const isIncompleteOnboarding = stage > 0 && stage < 5;

  if (isIncompleteOnboarding) {
    const id = rowId(row);
    router.push({ name: 'hr/employee/onboard', query: { id } });
    return;
  }

  modalMode.value = 'edit';
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    const id = rowId(row);
    router.push({ name: 'hr/employee/onboard', query: { id } });
    return;
  }

  openFormModal('Edit Employee', { ...row }, false);
}

async function handleDelete(row) {
  const id = rowId(row);
  if (!id) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Record id not found.' });
    return;
  }

  const isRestore = row.is_deleted === 1;
  const result = await confirmAction(
    isRestore ? 'Restore this record?' : 'Delete this record?',
    isRestore ? 'The record will be restored and become active again.' : 'This action cannot be undone. The record will be permanently removed.'
  );
  if (!result.isConfirmed) return;

  const deleteUrl = withId(endpoints.delete, id);
  const { data: responseData, request, error } = useApi(deleteUrl, {
    method: isRestore ? 'PATCH' : 'DELETE',
    autoFetch: false,
  });

  await request();

  if (error.value) {
    alertStore.show({ theme: 'danger', type: 'toast', message: isRestore ? 'Failed to restore record.' : 'Failed to delete record.' });
    return;
  }

  handleResponseAlert(alertStore, responseData.value, isRestore ? 'Employee restored successfully.' : 'Employee deleted successfully.');
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
      ? 'Employee updated successfully.'
      : 'Employee created successfully.'
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
      title="Employee"
      :data="rows"
      :columns="tableColumns"
      :loading="loading"
      row-key="__rowId"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search employee..."
      create-label="New Employee"
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