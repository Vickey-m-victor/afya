<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 1. Remove the old DataTable and import the new Grid Components
import BaseBlock from '@/components/BaseBlock.vue';
import GridProvider from '@/components/GridListView/GridView/GridProvider.vue';
import GridTable from '@/components/GridListView/GridView/GridTable.vue';
import GridHeaders from '@/components/GridListView/GridView/GridHeaders.vue';
import GridBody from '@/components/GridListView/GridView/GridBody.vue';
import GridPagination from '@/components/GridListView/GridView/GridPagination.vue';
import GridActions from '@/components/GridListView/GridView/GridActions.vue'; // For our custom card
import ListBody from '@/components/GridListView/ListView/ListBody.vue'; 

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

// 2. Add Layout State (Table vs Cards)
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
  initialSortBy: 'department_id',
  initialSortDir: 'desc',
});

// 3. Update Column Definitions (using 'attribute' instead of 'field' + removing filter:true for global search)
const tableColumns = [
  { attribute: "department_name", label: "Department Name" },
  { attribute: "department_code", label: "Department Code" },
  { attribute: "description", label: "Description" },
  { class: "ActionColumn", actions: ["view", "edit", "delete"] }
];

const rows = ref([]);
const loading = ref(false);
const modalMode = ref('create');

const endpoints = {
  "list": "/hr/departments",
  "create": "/hr/department",
  "view": "/hr/department/{id}",
  "update": "/hr/department/{id}",
  "delete": "/hr/department/{id}"
};

function rowId(row) {
  return row.id ?? row.department_id ?? row[Object.keys(row).find((key) => key.endsWith('_id'))];
}

function normalizeRows(items) {
  const list = Array.isArray(items) ? items : Object.values(items || {});
  return list.map((row) => ({
    ...row,
    __rowId: rowId(row),
  }));
}

// ──────────────────── Data Fetching ────────────────────

async function fetchRows(additionalFilters = {}) {
  loading.value = true;

  const { data: responseData, request, error } = useApi(endpoints.list, {
    method: 'GET',
    autoFetch: false,
  });

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

// ──────────────────── Grid Event Handlers ────────────────────

function handleGridSort({ by, dir }) {
  setSort(by);
  fetchRows();
}

function handleGridFilter(filterModel) {
  setPage(1);
  fetchRows(filterModel);
}

function handleGridAction({ action, row }) {
  switch (action) {
    case "view": return handleView(row);
    case "edit": return handleEdit(row);
    case "delete":
    case "restore": return handleDelete(row);
  }
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

// ──────────────────── CRUD Actions ────────────────────

function openFormModal(title, formData = {}, readonly = false, isLoading = false) {
  modalStore.openModal({
    component: Form,
    title,
    size: 'lg',
    showFooter: false,
    props: {
      formData: stripCrudSystemFields(formData),
      error: '',
      fieldErrors: {},
      isLoading,
      readonly,
      hideSubmit: readonly,
      compact: true,
      onSubmit: handleSubmit,
    },
  });
}

function handleCreate() {
  modalMode.value = 'create';
  modalStore.toggleModalUsage(true);

  if (!modalStore.useModal) {
    router.push({ name: 'hr/department/create' });
    return;
  }

  openFormModal('Create Department', {}, false);
}

async function handleView(row) {
  modalMode.value = 'view';
  modalStore.toggleModalUsage(true);

  const id = rowId(row);

  if (!modalStore.useModal) {
    router.push({ name: 'hr/department/view', params: { id } });
    return;
  }

  if (!id) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Record id not found.' });
    return;
  }

  // Open modal immediately with loading state
  openFormModal('View Department', {}, true, true);

  try {
    const { data: responseData, request, error } = useApi(withId(endpoints.view, id), {
      method: 'GET',
      autoFetch: false,
    });

    await request();

    if (error.value) {
      alertStore.show({ theme: 'danger', type: 'toast', message: 'Failed to fetch record details.' });
      modalStore.closeModal();
      return;
    }

    const payload = responseData.value?.dataPayload || responseData.value || {};
    // Update modal props with fetched data and turn off loading
    modalStore.props.formData = stripCrudSystemFields(payload.data || {});
    modalStore.props.isLoading = false;
  } catch (err) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Failed to fetch record details.' });
    modalStore.closeModal();
  }
}

async function handleEdit(row) {
  modalMode.value = 'edit';
  modalStore.toggleModalUsage(true);

  const id = rowId(row);

  if (!modalStore.useModal) {
    router.push({ name: 'hr/department/update', params: { id } });
    return;
  }

  if (!id) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Record id not found.' });
    return;
  }

  // Open modal immediately with loading state
  openFormModal('Edit Department', {}, false, true);

  try {
    const { data: responseData, request, error } = useApi(withId(endpoints.view, id), {
      method: 'GET',
      autoFetch: false,
    });

    await request();

    if (error.value) {
      alertStore.show({ theme: 'danger', type: 'toast', message: 'Failed to fetch record details.' });
      modalStore.closeModal();
      return;
    }

    const payload = responseData.value?.dataPayload || responseData.value || {};
    // Update modal props with fetched data and turn off loading
    modalStore.props.formData = stripCrudSystemFields(payload.data || {});
    modalStore.props.isLoading = false;
  } catch (err) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Failed to fetch record details.' });
    modalStore.closeModal();
  }
}

async function handleDelete(row) {
  const id = rowId(row);
  if (!id) {
    alertStore.show({ theme: 'danger', type: 'toast', message: 'Record id not found.' });
    return;
  }

  // Double-checking both true and 1 to support the restore toggle!
  const isRestore = row.is_deleted === 1 || row.is_deleted === true;

  const result = await confirmAction(
    isRestore ? 'Restore this record?' : 'Delete this record?',
    isRestore ? 'This will restore the deleted record.' : 'This action cannot be undone. The record will be permanently removed.'
  );
  if (!result.isConfirmed) return;

  const deleteUrl = withId(endpoints.delete, id);
  const { data: responseData, request, error } = useApi(deleteUrl, {
    method: isRestore ? 'PATCH' : 'DELETE',
    autoFetch: false,
  });

  await request();

  if (error.value) {
    alertStore.show({ theme: 'danger', type: 'toast', message: `Failed to ${isRestore ? 'restore' : 'delete'} record.` });
    return;
  }

  handleResponseAlert(alertStore, responseData.value, `Department ${isRestore ? 'restored' : 'deleted'} successfully.`);
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
    isEdit ? 'Department updated successfully.' : 'Department created successfully.'
  );

  modalStore.closeModal();
  await fetchRows();
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
      <BaseBlock title="Department Management" content-full>
        
        <template #options>
          <div class="d-flex align-items-center gap-2">
            
            <div class="input-group input-group-sm w-auto me-3">
              <span class="input-group-text bg-body-light border-end-0">
                <i class="fa fa-search text-muted"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0"
                placeholder="Search departments..."
                style="width: 200px"
                :value="searchQuery"
                @input="(e) => handleSearch(e.target.value)"
              />
            </div>

            <button
              class="btn btn-sm btn-alt-secondary"
              :class="{ active: layout === 'cards' }"
              @click="layout = 'cards'"
            >
              <i class="fa fa-th-large"></i>
            </button>
            <button
              class="btn btn-sm btn-alt-secondary me-3"
              :class="{ active: layout === 'table' }"
              @click="layout = 'table'"
            >
              <i class="fa fa-list"></i>
            </button>

            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="handleCreate"
            >
              <i class="fa fa-plus me-1"></i> New Department
            </button>
          </div>
        </template>

        <GridTable v-if="layout === 'table'">
          <GridHeaders />
          <GridBody>
             </GridBody>
        </GridTable>

        <ListBody v-else>
          <template #card="{ row }">
            <div class="block block-rounded block-bordered h-100 mb-0 shadow-sm">
              <div class="block-content text-center py-4">
                
                <div class="rounded-circle bg-body-light d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px">
                  <i class="fa fa-building fa-2x text-primary"></i>
                </div>
                
                <h4 class="mb-1">{{ row.department_name }}</h4>
                <p class="text-muted fs-sm mb-2">{{ row.department_code }}</p>
                
                <span v-if="row.status" class="badge" :class="row.status?.theme ? `bg-${row.status.theme}` : 'bg-info'">
                  {{ row.status?.label || row.status }}
                </span>
                
              </div>

              <div class="block-content block-content-full bg-body-light mt-auto">
                <GridActions :row="row" :actions="['view', 'edit', 'delete']" />
              </div>
            </div>
          </template>
        </ListBody>

        <template #footer>
          <div class="p-3  border-top">
            <GridPagination 
              :per-page-options="perPageOptions"
              @change-per-page="handlePerPageChange" 
            />
          </div>
        </template>

      </BaseBlock>
    </GridProvider>
    
  </div>
</template>