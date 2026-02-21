<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "#/components/DataTable/DataTable.vue";
import { useDataTable } from "#/composables/useDataTable";
import roleService from "../../../services/roleService";
import RolesForm from "../../../components/RolesForm.vue";

const router = useRouter();

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
  initialSortBy: "role_name",
  initialSortDir: "asc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "role_name", header: "Name", cellClass: "fw-semibold" },
  { field: "role_id", header: "Role ID" },
  { field: "ruleName", header: "Rule Name" },
  { field: "manage", header: "Manage", width: "90px", headerClass: "text-center", cellClass: "text-center", sortable: false },
];

const roles = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const modalTitle = ref("");
const modalMode = ref("view");
const formData = ref({});
const fieldErrors = ref({});
const formLoading = ref(false);

const fetchRoles = async () => {
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

    const response = await roleService.getRoles(params);
    const payload = response.data?.dataPayload || response.data;

    const dataArray = Array.isArray(payload?.data) 
      ? payload.data 
      : Object.values(payload?.data || {});
    
    roles.value = dataArray;
    totalCount.value = payload?.totalCount || 0;
    totalPages.value = payload?.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchRoles);
}

function handlePageChange(page) {
  setPage(page);
  fetchRoles();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchRoles();
}

function handleSort(field) {
  setSort(field);
  fetchRoles();
}

function handleView(role) {
  modalMode.value = "view";
  modalTitle.value = "View Role";
  formData.value = { ...role };
  fieldErrors.value = {};
  showModal.value = true;
}

function handleCreate() {
  modalMode.value = "create";
  modalTitle.value = "Create Role";
  formData.value = {};
  fieldErrors.value = {};
  showModal.value = true;
}

function handleEdit(role) {
  modalMode.value = "edit";
  modalTitle.value = "Edit Role";
  formData.value = { ...role };
  fieldErrors.value = {};
  showModal.value = true;
}

async function handleDelete(role) {
  if (!confirm(`Are you sure you want to delete role "${role.role_name}"?`)) {
    return;
  }

  try {
    await roleService.deleteRole(role.role_id);
    await fetchRoles();
  } catch (error) {
    console.error("Failed to delete role:", error);
    alert("Failed to delete role");
  }
}

function handleManagePermissions(role) {
  router.push(`/iam/rbac/roles/${role.role_id}/permissions`);
}

async function handleSubmit(data) {
  formLoading.value = true;
  fieldErrors.value = {};

  try {
    if (modalMode.value === "create") {
      await roleService.createRole(data);
    } else if (modalMode.value === "edit") {
      await roleService.updateRole(data.role_id, data);
    }

    showModal.value = false;
    await fetchRoles();
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
  fetchRoles();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Roles Management"
      :data="roles"
      :columns="tableColumns"
      :loading="loading"
      row-key="role_id"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search roles..."
      create-label="New Role"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No roles found"
      @create="handleCreate"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-role_name="{ row }">
        <i class="fa fa-user-shield text-primary me-2"></i>
        {{ row.role_name }}
      </template>

      <template #cell-role_id="{ row }">
        <code class="text-muted">{{ row.role_id }}</code>
      </template>

      <template #cell-ruleName="{ row }">
        {{ row.ruleName || '-' }}
      </template>

      <template #cell-manage="{ row }">
        <button
          type="button"
          class="btn btn-sm btn-alt-info"
          @click="handleManagePermissions(row)"
        >
          <i class="fa fa-key"></i>
        </button>
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
            <RolesForm
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
