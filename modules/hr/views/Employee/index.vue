<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 1. Grid Components
import BaseBlock from '@/components/BaseBlock.vue';
import GridProvider from '@/components/GridListView/GridView/GridProvider.vue';
import GridTable from '@/components/GridListView/GridView/GridTable.vue';
import GridHeaders from '@/components/GridListView/GridView/GridHeaders.vue';
import GridBody from '@/components/GridListView/GridView/GridBody.vue';
import GridPagination from '@/components/GridListView/GridView/GridPagination.vue';
import GridActions from '@/components/GridListView/GridView/GridActions.vue'; 
import ListBody from '@/components/GridListView/ListView/ListBody.vue'; 

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

const layout = ref("table");

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

// Updated Column Definitions
const tableColumns = [
  { attribute: "facility_name", label: "Facility" },
  { attribute: "employment_type_name", label: "Employment Type" },
  { attribute: "department_name", label: "Department" },
  { attribute: "job_title_name", label: "Job Title" },
  { attribute: "job_group_name", label: "Job Group" },
  { attribute: "hire_date", label: "Hire Date" },
  { attribute: "probation_end_date", label: "Probation End Date" },
  { attribute: "confirmation_date", label: "Confirmation Date" },
  { attribute: "termination_date", label: "Termination Date" },
  { class: "ActionColumn", actions: ["view", "edit", "delete"] }
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
  const preferredKeys = ['employee_id', 'employeeId', 'hr_employee_id', 'hrEmployeeId', 'id'];
  for (const key of preferredKeys) {
    const value = row?.[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  const candidate = row?.employee_number ?? row?.employeeNo ?? null;
  return candidate || null;
}

function normalizeRows(items) {
  const list = Array.isArray(items) ? items : Object.values(items || {});
  return list.map((row) => ({
    ...row,
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

async function fetchRows(additionalFilters = {}) {
  loading.value = true;
  const { data: responseData, request, error } = useApi(endpoints.list, { method: 'GET', autoFetch: false });
  try {
    const queryParams = { ...buildQueryParams(), ...additionalFilters };
    await request(null, queryParams);
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

// Grid Dispatchers
function handleGridSort({ by, dir }) { setSort(by); fetchRows(); }
function handleGridFilter(filterModel) { setPage(1); fetchRows(filterModel); }
function handleGridAction({ action, row }) {
  switch (action) {
    case "view": return handleView(row);
    case "edit": return handleEdit(row);
    case "delete":
    case "restore": return handleDelete(row);
  }
}

function handleSearch(query) { setSearchDebounced(query, fetchRows); }
function handlePageChange(page) { setPage(page); fetchRows(); }
function handlePerPageChange(value) { setPerPage(value); fetchRows(); }

function openFormModal(title, formData = {}, readonly = false) {
  modalStore.openModal({
    component: Form, title, size: 'lg', showFooter: false,
    props: { formData: stripCrudSystemFields(formData), error: '', fieldErrors: {}, isLoading: false, readonly, hideSubmit: readonly, compact: true, onSubmit: handleSubmit },
  });
}

function handleCreate() {
  modalStore.openModal({
    component: QuickCreateEmployeeModal,
    title: 'New Employee', size: 'xl', showFooter: false, scrollable: true,
    props: { onCreated: async () => { await fetchRows(); } },
  });
}

function handleView(row) {
  const id = rowId(row);
  if (!id) return alertStore.show({ theme: 'danger', type: 'toast', message: 'Employee id not found.' });
  router.push({ name: 'hr/employee/view', params: { id } });
}

function handleEdit(row) {
  const stage = Number(row?.onboarding_stage ?? row?.onboarding_status?.current_stage ?? 0);
  const isIncompleteOnboarding = stage > 0 && stage < 5;
  const id = rowId(row);

  if (isIncompleteOnboarding || !modalStore.useModal) {
    router.push({ name: 'hr/employee/onboard', query: { id } });
    return;
  }
  modalMode.value = 'edit';
  modalStore.toggleModalUsage(true);
  openFormModal('Edit Employee', { ...row }, false);
}

async function handleDelete(row) {
  const id = rowId(row);
  if (!id) return alertStore.show({ theme: 'danger', type: 'toast', message: 'Record id not found.' });

  const isRestore = row.is_deleted === 1 || row.is_deleted === true; // BUG FIXED HERE
  const result = await confirmAction(
    isRestore ? 'Restore this record?' : 'Delete this record?',
    isRestore ? 'The record will be restored.' : 'This action cannot be undone.'
  );
  if (!result.isConfirmed) return;

  const deleteUrl = withId(endpoints.delete, id);
  const { data: responseData, request, error } = useApi(deleteUrl, { method: isRestore ? 'PATCH' : 'DELETE', autoFetch: false });
  await request();

  if (error.value) return alertStore.show({ theme: 'danger', type: 'toast', message: `Failed to ${isRestore ? 'restore' : 'delete'} record.` });
  handleResponseAlert(alertStore, responseData.value, `Employee ${isRestore ? 'restored' : 'deleted'} successfully.`);
  await fetchRows();
}

async function handleSubmit(payload) {
  const isEdit = modalMode.value === 'edit';
  const id = rowId(payload);
  modalStore.props.isLoading = true; modalStore.props.fieldErrors = {}; modalStore.props.error = '';

  const endpoint = isEdit && id ? withId(endpoints.update, id) : endpoints.create;
  const method = isEdit ? 'PUT' : 'POST';
  const { data: responseData, request, error } = useApi(endpoint, { method, autoFetch: false });

  const cleanedPayload = stripCrudSystemFields(payload);
  await request(cleanedPayload);
  modalStore.props.isLoading = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    modalStore.props.fieldErrors = parsed.fieldErrors;
    modalStore.props.error = parsed.message;
    if (!parsed.isValidation) alertStore.show({ theme: 'danger', type: 'toast', message: parsed.message });
    return;
  }
  handleResponseAlert(alertStore, responseData.value, isEdit ? 'Employee updated successfully.' : 'Employee created successfully.');
  modalStore.closeModal(); await fetchRows();
}

onMounted(fetchRows);
</script>

<template>
  <div class="content">
    <GridProvider
      :data="rows"
      :columns="tableColumns"
      :loading="loading"
      :total-count="totalCount"
      :current-page="currentPage"
      :per-page="perPage"
      @change-page="handlePageChange"
      @sort="handleGridSort"
      @filter="handleGridFilter"
      @action-click="handleGridAction"
    >
      <BaseBlock title="Employee Directory" content-full>
        <template #options>
          <div class="d-flex align-items-center gap-2">
            <div class="input-group input-group-sm w-auto me-3">
              <span class="input-group-text bg-body-light border-end-0"><i class="fa fa-search text-muted"></i></span>
              <input type="text" class="form-control border-start-0" placeholder="Search employees..." style="width: 200px" :value="searchQuery" @input="(e) => handleSearch(e.target.value)" />
            </div>
            <button class="btn btn-sm btn-alt-secondary" :class="{ active: layout === 'cards' }" @click="layout = 'cards'"><i class="fa fa-th-large"></i></button>
            <button class="btn btn-sm btn-alt-secondary me-3" :class="{ active: layout === 'table' }" @click="layout = 'table'"><i class="fa fa-list"></i></button>
            <button type="button" class="btn btn-sm btn-primary" @click="handleCreate"><i class="fa fa-plus me-1"></i> New Employee</button>
          </div>
        </template>

        <GridTable v-if="layout === 'table'">
          <GridHeaders />
          <GridBody />
        </GridTable>

        <ListBody v-else>
          <template #card="{ row }">
            <div class="block block-rounded block-bordered h-100 mb-0 shadow-sm">
              <div class="block-content text-center py-4">
                <div class="rounded-circle bg-body-light d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px">
                  <i class="fa fa-user fa-2x text-primary"></i>
                </div>
                <h5 class="mb-1">{{ row.first_name }} {{ row.last_name }}</h5>
                <p class="text-muted fs-sm mb-1">{{ row.job_title_name || 'No Title' }}</p>
                <span class="badge bg-info mt-2">{{ row.department_name || 'No Department' }}</span>
              </div>
              <div class="block-content block-content-full bg-body-light mt-auto">
                <GridActions :row="row" :actions="['view', 'edit', 'delete']" />
              </div>
            </div>
          </template>
        </ListBody>

        <template #footer>
          <div class="p-3 bg-body-light border-top">
            <GridPagination :per-page-options="perPageOptions" @change-per-page="handlePerPageChange" />
          </div>
        </template>
      </BaseBlock>
    </GridProvider>
  </div>
</template>