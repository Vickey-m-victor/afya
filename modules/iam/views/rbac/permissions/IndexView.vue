<script setup>
import { ref, onMounted } from "vue";
import DataTable from "#/components/DataTable/DataTable.vue";
import { useDataTable } from "#/composables/useDataTable";
import permissionService from "../../../services/permissionService";
import PermissionsForm from "../../../components/PermissionsForm.vue";

const {
  searchQuery,
  currentPage,
  perPage,
  sortBy,
  sortDir,
  perPageOptions,
  setSearchDebounced,
  setPage,
  setPerPage,
  setSort,
} = useDataTable({
  initialPage: 1,
  initialPerPage: 20,
  perPageOptions: [10, 20, 50, 100],
  initialSortBy: "permission_name",
  initialSortDir: "asc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "permission_name", header: "Name", cellClass: "fw-semibold" },
  { field: "permission_id", header: "Permission ID" },
  { field: "description", header: "Description" },
];

const permissions = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const modalTitle = ref("");
const modalMode = ref("view");
const formData = ref({});
const fieldErrors = ref({});
const formLoading = ref(false);

const fetchPermissions = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      "per-page": perPage.value,
      sort_by: sortBy.value,
      sort_dir: sortDir.value,
    };

    if (searchQuery.value) {
      params._search = searchQuery.value;
    }

    const response = await permissionService.getPermissions(params);
    const payload = response.data?.dataPayload || response.data;

    const dataArray = Array.isArray(payload?.data) 
      ? payload.data 
      : Object.values(payload?.data || {});
    
    permissions.value = dataArray;
    totalCount.value = payload?.totalCount || 0;
    totalPages.value = payload?.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch permissions:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchPermissions);
}

function handlePageChange(page) {
  setPage(page);
  fetchPermissions();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchPermissions();
}

function handleSort(field) {
  setSort(field);
  fetchPermissions();
}

function handleView(permission) {
  modalMode.value = "view";
  modalTitle.value = "View Permission";
  formData.value = { ...permission };
  fieldErrors.value = {};
  showModal.value = true;
}

function handleCreate() {
  modalMode.value = "create";
  modalTitle.value = "Create Permission";
  formData.value = {};
  fieldErrors.value = {};
  showModal.value = true;
}

function handleEdit(permission) {
  modalMode.value = "edit";
  modalTitle.value = "Edit Permission";
  formData.value = { ...permission };
  fieldErrors.value = {};
  showModal.value = true;
}

async function handleDelete(permission) {
  if (!confirm(`Are you sure you want to delete permission "${permission.permission_name}"?`)) {
    return;
  }

  try {
    await permissionService.deletePermission(permission.permission_id);
    await fetchPermissions();
  } catch (error) {
    console.error("Failed to delete permission:", error);
    alert("Failed to delete permission");
  }
}

async function handleSubmit(data) {
  formLoading.value = true;
  fieldErrors.value = {};

  try {
    if (modalMode.value === "create") {
      await permissionService.createPermission(data);
    } else if (modalMode.value === "edit") {
      await permissionService.updatePermission(data.permission_id, data);
    }

    showModal.value = false;
    await fetchPermissions();
  } catch (error) {
    console.error("Form submission error:", error);

    if (error.response?.data?.errorPayload?.errors) {
      fieldErrors.value = error.response.data.errorPayload.errors;
    }

    throw error;
  } finally {
    formLoading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
}

onMounted(() => {
  fetchPermissions();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Permissions Management"
      :data="permissions"
      :columns="tableColumns"
      :loading="loading"
      row-key="permission_id"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search permissions..."
      create-label="New Permission"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No permissions found"
      @create="handleCreate"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-permission_name="{ row }">
        <i class="fa fa-key text-warning me-2"></i>
        {{ row.permission_name }}
      </template>

      <template #cell-permission_id="{ row }">
        <code class="text-muted">{{ row.permission_id }}</code>
      </template>

      <template #cell-description="{ row }">
        {{ row.description || '-' }}
      </template>
    </DataTable>

    <div
      class="modal"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <PermissionsForm
              :formData="formData"
              :fieldErrors="fieldErrors"
              :isLoading="formLoading"
              :readonly="modalMode === 'view'"
              :hideSubmit="modalMode === 'view'"
              :compact="true"
              :onSubmit="handleSubmit"
            />
          </div>
          <div class="modal-footer" v-if="modalMode === 'view'">
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" :class="{ show: showModal }" v-if="showModal"></div>
  </div>
</template>

<style scoped>
.modal.show {
  display: block;
}

.modal-backdrop.show {
  opacity: 0.5;
}
</style>
