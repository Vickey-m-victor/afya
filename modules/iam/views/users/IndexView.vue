<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import userService from "../../services/userService";
import UsersForm from "../../components/UsersForm.vue";

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
  initialSortBy: "user_id",
  initialSortDir: "desc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "username", header: "Username", cellClass: "fw-semibold" },
  { field: "profile.first_name", header: "First Name" },
  { field: "profile.last_name", header: "Last Name" },
  { field: "profile.email_address", header: "Email" },
  { field: "profile.mobile_number", header: "Mobile" },
  { field: "status", header: "Status", width: "120px", headerClass: "text-center", cellClass: "text-center" },
];

const users = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const modalTitle = ref("");
const modalMode = ref("view");
const formData = ref({});
const fieldErrors = ref({});
const formLoading = ref(false);

const fetchUsers = async () => {
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

    const response = await userService.getUsers(params);
    const payload = response.data?.dataPayload || response.data;

    const dataArray = Array.isArray(payload?.data) 
      ? payload.data 
      : Object.values(payload?.data || {});
    
    users.value = dataArray;
    totalCount.value = payload?.totalCount || 0;
    totalPages.value = payload?.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchUsers);
}

function handlePageChange(page) {
  setPage(page);
  fetchUsers();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchUsers();
}

function handleSort(field) {
  setSort(field);
  fetchUsers();
}

function handleView(user) {
  modalMode.value = "view";
  modalTitle.value = "View User";
  formData.value = { ...user };
  fieldErrors.value = {};
  showModal.value = true;
}

function handleCreate() {
  modalMode.value = "create";
  modalTitle.value = "Create User";
  formData.value = { status: "active" };
  fieldErrors.value = {};
  showModal.value = true;
}

function handleEdit(user) {
  modalMode.value = "edit";
  modalTitle.value = "Edit User";
  formData.value = { ...user };
  fieldErrors.value = {};
  showModal.value = true;
}

async function handleDelete(user) {
  if (!confirm(`Are you sure you want to delete user "${user.username}"?`)) {
    return;
  }

  try {
    await userService.deleteUser(user.username);
    await fetchUsers();
  } catch (error) {
    console.error("Failed to delete user:", error);
    alert("Failed to delete user");
  }
}

async function handleSubmit(data) {
  formLoading.value = true;
  fieldErrors.value = {};

  try {
    if (modalMode.value === "create") {
      await userService.createUser(data);
    } else if (modalMode.value === "edit") {
      await userService.updateUser(data.username, data);
    }

    showModal.value = false;
    await fetchUsers();
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

function statusBadgeClass(status) {
  if (status === "active") return "bg-success";
  if (status === "inactive") return "bg-danger";
  if (status === "suspended") return "bg-warning";
  return "bg-secondary";
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Users Management"
      :data="users"
      :columns="tableColumns"
      :loading="loading"
      row-key="user_id"
      :actions="['view', 'edit', 'delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search users..."
      create-label="New User"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No users found"
      @create="handleCreate"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-username="{ row }">
        <div class="d-flex align-items-center">
          <!-- <div 
            class="rounded-circle bg-primary-light d-flex align-items-center justify-content-center me-2"
            style="width: 32px; height: 32px; min-width: 32px;"
          > -->
            <!-- <i class="fa fa-user text-primary"></i> -->
          </div>
          <span class="">{{ row.username }}</span>
        <!-- </div> -->
      </template>

      <template #cell-profile.first_name="{ row }">
        {{ row.profile?.first_name || '-' }}
      </template>

      <template #cell-profile.last_name="{ row }">
        {{ row.profile?.last_name || '-' }}
      </template>

      <template #cell-profile.email_address="{ row }">
        <span v-if="row.profile?.email_address">
          <i class="fa fa-envelope text-muted me-1"></i>
          {{ row.profile.email_address }}
        </span>
        <span v-else class="text-muted">-</span>
      </template>

      <template #cell-profile.mobile_number="{ row }">
        <span v-if="row.profile?.mobile_number">
          <i class="fa fa-phone text-muted me-1"></i>
          {{ row.profile.mobile_number }}
        </span>
        <span v-else class="text-muted">-</span>
      </template>

      <template #cell-status="{ row }">
        <span 
          class="badge" 
          :class="`bg-${row.status?.theme || 'secondary'}`"
        >
          {{ row.status?.label || row.status || 'Unknown' }}
        </span>
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
            <UsersForm
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
