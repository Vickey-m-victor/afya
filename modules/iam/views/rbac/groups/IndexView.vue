<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "#/components/DataTable/DataTable.vue";
import { useDataTable } from "#/composables/useDataTable";
import groupService from "../../../services/groupService";
import GroupsForm from "../../../components/GroupsForm.vue";

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
  initialSortBy: "group_name",
  initialSortDir: "asc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "group_name", header: "Name", cellClass: "fw-semibold" },
  { field: "group_id", header: "Group ID" },
  { field: "description", header: "Description" },
  { field: "ruleName", header: "Rule Name" },
  { field: "manage", header: "Manage", width: "90px", headerClass: "text-center", cellClass: "text-center", sortable: false },
];

const groups = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const modalTitle = ref("");
const modalMode = ref("view");
const formData = ref({});
const fieldErrors = ref({});
const formLoading = ref(false);

const fetchGroups = async () => {
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

    const response = await groupService.getGroups(params);
    const payload = response.data?.dataPayload || response.data;

    const dataArray = Array.isArray(payload?.data) 
      ? payload.data 
      : Object.values(payload?.data || {});
    
    groups.value = dataArray;
    totalCount.value = payload?.totalCount || 0;
    totalPages.value = payload?.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch groups:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchGroups);
}

function handlePageChange(page) {
  setPage(page);
  fetchGroups();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchGroups();
}

function handleSort(field) {
  setSort(field);
  fetchGroups();
}

function handleView(group) {
  modalMode.value = "view";
  modalTitle.value = "View Group";
  formData.value = { ...group };
  fieldErrors.value = {};
  showModal.value = true;
}

function handleCreate() {
  modalMode.value = "create";
  modalTitle.value = "Create Group";
  formData.value = {};
  fieldErrors.value = {};
  showModal.value = true;
}

function handleEdit(group) {
  modalMode.value = "edit";
  modalTitle.value = "Edit Group";
  formData.value = { ...group };
  fieldErrors.value = {};
  showModal.value = true;
}

async function handleDelete(group) {
  if (!confirm(`Are you sure you want to delete group "${group.group_name}"?`)) {
    return;
  }

  try {
    await groupService.deleteGroup(group.group_id);
    await fetchGroups();
  } catch (error) {
    console.error("Failed to delete group:", error);
    alert("Failed to delete group");
  }
}

function handleManageUsers(group) {
  router.push(`/iam/rbac/groups/${group.group_id}/users`);
}

async function handleSubmit(data) {
  formLoading.value = true;
  fieldErrors.value = {};

  try {
    if (modalMode.value === "create") {
      await groupService.createGroup(data);
    } else if (modalMode.value === "edit") {
      await groupService.updateGroup(data.group_id, data);
    }

    showModal.value = false;
    await fetchGroups();
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
  fetchGroups();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Groups Management"
      :data="groups"
      :columns="tableColumns"
      :loading="loading"
      row-key="group_id"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search groups..."
      create-label="New Group"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No groups found"
      @create="handleCreate"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-group_name="{ row }">
        <i class="fa fa-users text-info me-2"></i>
        {{ row.group_name }}
      </template>

      <template #cell-group_id="{ row }">
        <code class="text-muted">{{ row.group_id }}</code>
      </template>

      <template #cell-description="{ row }">
        {{ row.description || '-' }}
      </template>

      <template #cell-ruleName="{ row }">
        {{ row.ruleName || '-' }}
      </template>

      <template #cell-manage="{ row }">
        <button
          type="button"
          class="btn btn-sm btn-alt-info"
          @click="handleManageUsers(row)"
        >
          <i class="fa fa-user"></i>
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
            <GroupsForm
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
