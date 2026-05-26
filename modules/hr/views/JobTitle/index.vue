<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import BaseBlock from "@/components/BaseBlock.vue";
import GridProvider from "@/components/GridListView/GridView/GridProvider.vue";
import GridTable from "@/components/GridListView/GridView/GridTable.vue";
import GridHeaders from "@/components/GridListView/GridView/GridHeaders.vue";
import GridBody from "@/components/GridListView/GridView/GridBody.vue";
import GridPagination from "@/components/GridListView/GridView/GridPagination.vue";
import GridActions from "@/components/GridListView/GridView/GridActions.vue";
import ListBody from "@/components/GridListView/ListView/ListBody.vue";

import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import { useAlertStore } from "@/stores/alert";
import { useAlert } from "@/composables/alerts";
import {
  parseBackendError,
  stripCrudSystemFields,
  withId,
  handleResponseAlert,
} from "@/composables/useWarpHelpers";
import Form from "./form.vue";

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
  initialSortBy: "job_title_id",
  initialSortDir: "desc",
});

// Converted column definitions
const tableColumns = [
  { attribute: "title_name", label: "Title Name" },
  { attribute: "title_code", label: "Title Code" },
  { attribute: "requires_license", label: "Requires License" },
  { attribute: "is_clinical", label: "Is Clinical" },
  { attribute: "is_supervisory", label: "Is Supervisory" },
  { attribute: "status", label: "Status" },
  { class: "ActionColumn", actions: ["view", "edit", "delete"] },
];

const rows = ref([]);
const loading = ref(false);
const modalMode = ref("create");

const endpoints = {
  list: "/hr/job-titles",
  create: "/hr/job-title",
  view: "/hr/job-title/{id}",
  update: "/hr/job-title/{id}",
  delete: "/hr/job-title/{id}",
};

function rowId(row) {
  return (
    row.id ??
    row.job_title_id ??
    row[Object.keys(row).find((key) => key.endsWith("_id"))]
  );
}

function normalizeRows(items) {
  const list = Array.isArray(items) ? items : Object.values(items || {});
  return list.map((row) => ({ ...row, __rowId: rowId(row) }));
}

async function fetchRows(additionalFilters = {}) {
  loading.value = true;
  const {
    data: responseData,
    request,
    error,
  } = useApi(endpoints.list, { method: "GET", autoFetch: false });
  try {
    const queryParams = { ...buildQueryParams(), ...additionalFilters };
    await request(null, queryParams);
    if (error.value) throw error.value;
    const payload = responseData.value?.dataPayload || responseData.value || {};
    syncFromResponse(payload);
    rows.value = normalizeRows(payload?.data);
  } catch (err) {
    alertStore.show({
      theme: "danger",
      type: "toast",
      message: "Failed to fetch records.",
    });
  } finally {
    loading.value = false;
  }
}

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
    case "view":
      return handleView(row);
    case "edit":
      return handleEdit(row);
    case "delete":
    case "restore":
      return handleDelete(row);
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

function openFormModal(title, formData = {}, readonly = false) {
  modalStore.openModal({
    component: Form,
    title,
    size: "lg",
    showFooter: false,
    props: {
      formData: stripCrudSystemFields(formData),
      error: "",
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
  modalMode.value = "create";
  modalStore.toggleModalUsage(true);
  if (!modalStore.useModal) return router.push({ name: "hr/job-title/create" });
  openFormModal("Create JobTitle", {}, false);
}

async function handleView(row) {
  modalMode.value = "view";
  modalStore.toggleModalUsage(true);
  const id = rowId(row);
  if (!modalStore.useModal)
    return router.push({ name: "hr/job-title/view", params: { id } });
  if (!id)
    return alertStore.show({
      theme: "danger",
      type: "toast",
      message: "Record id not found.",
    });

  const {
    data: responseData,
    request,
    error,
  } = useApi(withId(endpoints.view, id), { method: "GET", autoFetch: false });
  await request();
  if (error.value)
    return alertStore.show({
      theme: "danger",
      type: "toast",
      message: "Failed to fetch record details.",
    });

  const payload = responseData.value?.dataPayload || responseData.value || {};
  openFormModal("View JobTitle", payload.data || {}, true);
}

async function handleEdit(row) {
  modalMode.value = "edit";
  modalStore.toggleModalUsage(true);
  const id = rowId(row);
  if (!modalStore.useModal)
    return router.push({ name: "hr/job-title/update", params: { id } });
  if (!id)
    return alertStore.show({
      theme: "danger",
      type: "toast",
      message: "Record id not found.",
    });

  const {
    data: responseData,
    request,
    error,
  } = useApi(withId(endpoints.view, id), { method: "GET", autoFetch: false });
  await request();
  if (error.value)
    return alertStore.show({
      theme: "danger",
      type: "toast",
      message: "Failed to fetch record details.",
    });

  const payload = responseData.value?.dataPayload || responseData.value || {};
  openFormModal("Edit JobTitle", payload.data || {}, false);
}

async function handleDelete(row) {
  const id = rowId(row);
  if (!id)
    return alertStore.show({
      theme: "danger",
      type: "toast",
      message: "Record id not found.",
    });

  const isRestore = row.is_deleted === 1 || row.is_deleted === true; // BUG FIXED
  const result = await confirmAction(
    isRestore ? "Restore this record?" : "Delete this record?",
    isRestore ? "The record will be restored." : "This action cannot be undone."
  );
  if (!result.isConfirmed) return;

  const deleteUrl = withId(endpoints.delete, id);
  const {
    data: responseData,
    request,
    error,
  } = useApi(deleteUrl, {
    method: isRestore ? "PATCH" : "DELETE",
    autoFetch: false,
  });
  await request();

  if (error.value)
    return alertStore.show({
      theme: "danger",
      type: "toast",
      message: `Failed to ${isRestore ? "restore" : "delete"} record.`,
    });
  handleResponseAlert(
    alertStore,
    responseData.value,
    `JobTitle ${isRestore ? "restored" : "deleted"} successfully.`
  );
  await fetchRows();
}

async function handleSubmit(payload) {
  const isEdit = modalMode.value === "edit";
  const id = rowId(payload);
  modalStore.props.isLoading = true;
  modalStore.props.fieldErrors = {};
  modalStore.props.error = "";

  const endpoint =
    isEdit && id ? withId(endpoints.update, id) : endpoints.create;
  const method = isEdit ? "PUT" : "POST";
  const {
    data: responseData,
    request,
    error,
  } = useApi(endpoint, { method, autoFetch: false });

  const cleanedPayload = stripCrudSystemFields(payload);
  await request(cleanedPayload);
  modalStore.props.isLoading = false;

  if (error.value) {
    const parsed = parseBackendError(error.value);
    modalStore.props.fieldErrors = parsed.fieldErrors;
    modalStore.props.error = parsed.message;
    if (!parsed.isValidation)
      alertStore.show({
        theme: "danger",
        type: "toast",
        message: parsed.message,
      });
    return;
  }

  handleResponseAlert(
    alertStore,
    responseData.value,
    isEdit ? "JobTitle updated successfully." : "JobTitle created successfully."
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
      <BaseBlock title="Job Titles" content-full>
        <template #options>
          <div class="d-flex align-items-center gap-2">
            <div class="input-group input-group-sm w-auto me-3">
              <span class="input-group-text bg-body-light border-end-0"
                ><i class="fa fa-search text-muted"></i
              ></span>
              <input
                type="text"
                class="form-control border-start-0"
                placeholder="Search titles..."
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
              <i class="fa fa-plus me-1"></i> New JobTitle
            </button>
          </div>
        </template>
        <GridTable v-if="layout === 'table'">
          <GridHeaders />
          <GridBody>
            <template #cell-status="{ row }">
              <span
                class="badge px-3 py-1 rounded-pill"
                :class="
                  row.status?.theme
                    ? `bg-${row.status.theme}`
                    : row.status?.label === 'Active'
                      ? 'bg-success'
                      : 'bg-danger'
                "
              >
                {{ row.status?.label || row.status || "Unknown" }}
              </span>
            </template>
          </GridBody>
        </GridTable>
        <ListBody v-else>
          <template #card="{ row }">
            <div
              class="block block-rounded block-bordered h-100 mb-0 shadow-sm"
            >
              <div class="block-content text-center py-4">
                <div
                  class="rounded-circle bg-body-light d-inline-flex align-items-center justify-content-center mb-3"
                  style="width: 64px; height: 64px"
                >
                  <i class="fa fa-id-badge fa-2x text-primary"></i>
                </div>
                <h4 class="mb-1">{{ row.title_name }}</h4>
                <p class="text-muted fs-sm mb-2">{{ row.title_code }}</p>
                <span 
                class="badge px-3 py-1 rounded-pill" 
                :class="row.status?.theme ? `bg-${row.status.theme}` : (row.status?.label === 'Active' ? 'bg-success' : 'bg-danger')"
              >
                {{ row.status?.label || row.status || 'Unknown' }}
              </span>
                <div class="d-flex gap-2 justify-content-center mt-2">
                  <span v-if="row.is_clinical" class="badge bg-danger"
                    >Clinical</span
                  >
                  <span v-if="row.is_supervisory" class="badge bg-info"
                    >Supervisory</span
                  >
                </div>
              </div>
              <div
                class="block-content block-content-full bg-body-light mt-auto"
              >
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
