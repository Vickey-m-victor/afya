<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import { useAlertStore } from "@/stores/alert";
import { useAlert } from "@/composables/alerts";
import UsersForm from "../../components/UsersForm.vue";
import UserGroupToggle from "../../components/UserGroupToggle.vue";
import UserDetailsModal from "../../components/UserDetailsModal.vue";

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
  initialSortBy: "user_id",
  initialSortDir: "desc",
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
const togglingUser = ref(null);

// ──────────────────── Data Fetching ────────────────────

const fetchUsers = async () => {
  loading.value = true;
  try {
    const { data: responseData, request, error } = useApi("/iam/users", {
      method: "GET",
      autoFetch: false,
    });

    await request(null, buildQueryParams());
    if (error.value) throw error.value;

    const payload = responseData.value?.dataPayload || responseData.value;
    syncFromResponse(payload);

    const dataArray = Array.isArray(payload?.data)
      ? payload.data
      : Object.values(payload?.data || {});

    users.value = dataArray;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    loading.value = false;
  }
};

// ──────────────────── Table Event Handlers ────────────────────

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

// ──────────────────── Alert Helpers ────────────────────

function handleResponseAlert(response, fallbackMessage) {
  const payload =
    response?.alertifyPayload ||
    response?.dataPayload?.alertify ||
    response?.data?.alertifyPayload ||
    response?.data?.dataPayload?.alertify;
  if (payload) {
    alertStore.show(payload);
  } else {
    alertStore.show({ theme: "success", type: "toast", message: fallbackMessage });
  }
}

// ──────────────────── View User ────────────────────

async function handleView(user) {
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/users/view', params: { id: user.username } });
    return;
  }

  const { data: detailData, request } = useApi(`/iam/user/${user.username}`, {
    method: "GET",
    autoFetch: false,
  });

  await request();
  const resData = detailData.value;
  const fullUser = resData?.dataPayload?.data || resData?.dataPayload || resData?.data || user;

  modalStore.openModal({
    component: UserDetailsModal,
    props: {
      user: fullUser,
    },
    title: `User Profile`,
    size: "lg",
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
}

// ──────────────────── Create User ────────────────────

function handleCreate() {
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/users/create' });
    return;
  }

  modalStore.openModal({
    component: UsersForm,
    props: {
      formData: {
        username: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email_address: "",
        mobile_number: "",
        password: "",
        confirm_password: "",
      },
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      isCreateMode: true,
      onSubmit: handleSubmit,
    },
    title: "Create New User",
    size: "lg",
    showFooter: false,
  });
}

// ──────────────────── Form Submit (Create only) ────────────────────

async function handleSubmit(data) {
  modalStore.props.isLoading = true;
  modalStore.props.fieldErrors = {};

  const { data: responseData, request, error } = useApi("/iam/user/create", {
    method: "POST",
    autoFetch: false,
  });
  await request(data);

  modalStore.props.isLoading = false;

  if (error.value) {
    const errors =
      typeof error.value === "object" && !Array.isArray(error.value) ? error.value : {};
    modalStore.props.fieldErrors = errors;
    return;
  }

  handleResponseAlert(responseData.value, "User created successfully.");
  modalStore.closeModal();
  await fetchUsers();
}

// ──────────────────── Delete User ────────────────────

async function handleDelete(user) {
  const result = await confirmAction(
    `Delete User "${user.username}"?`,
    "This action cannot be undone. The user will be permanently removed from the system."
  );
  if (!result.isConfirmed) return;

  try {
    const { data: responseData, request, error } = useApi(`/iam/user/${user.username}`, {
      method: "DELETE",
      autoFetch: false,
    });
    await request();
    if (error.value) throw error.value;
    handleResponseAlert(responseData.value, "User deleted successfully.");
    await fetchUsers();
  } catch (err) {
    console.error("Failed to delete user:", err);
    alertStore.show({ theme: "error", type: "toast", message: "Failed to delete user." });
  }
}

// ──────────────────── Toggle Status ────────────────────

async function handleToggleStatus(user) {
  const currentLabel = (user.status?.label || user.status || '').toString().toLowerCase();
  const newStatus = currentLabel === 'active' ? 'inactive' : 'active';

  togglingUser.value = user.username;
  try {
    const { data: responseData, request, error } = useApi(`/iam/user/status/${user.username}`, {
      method: "PATCH",
      autoFetch: false,
    });
    await request({ status: newStatus });
    if (error.value) throw error.value;
    handleResponseAlert(responseData.value, `User ${newStatus === 'active' ? 'activated' : 'deactivated'}.`);
    await fetchUsers();
  } catch (err) {
    console.error("Failed to toggle status:", err);
    alertStore.show({ theme: "danger", type: "toast", message: "Failed to update user status." });
  } finally {
    togglingUser.value = null;
  }
}

// ──────────────────── Ban User ────────────────────

async function handleBan(user) {
  const result = await confirmAction(
    `Ban User "${user.username}"?`,
    "This is a severe action. The user will be banned from the system."
  );
  if (!result.isConfirmed) return;

  try {
    const { data: responseData, request, error } = useApi(`/iam/user/ban/${user.username}`, {
      method: "POST",
      autoFetch: false,
    });
    await request();
    if (error.value) throw error.value;
    handleResponseAlert(responseData.value, "User banned successfully.");
    await fetchUsers();
  } catch (err) {
    console.error("Failed to ban user:", err);
    alertStore.show({ theme: "error", type: "toast", message: "Failed to ban user." });
  }
}

// ──────────────────── Manage Groups ────────────────────

function handleManageGroups(user) {
  modalStore.openModal({
    component: UserGroupToggle,
    title: `Manage Groups — ${user.username}`,
    size: "lg",
    showFooter: false,
    showConfirm: false,
    props: {
      username: user.username,
    },
    position: "center",
  });
}

// ──────────────────── Status Badge ────────────────────

function statusBadgeClass(status) {
  if (status?.theme) return `bg-${status.theme}`;
  const label = (status?.label || status || "").toString().toLowerCase();
  if (label === "active") return "bg-success";
  if (label === "inactive") return "bg-secondary";
  if (label === "suspended") return "bg-warning";
  if (label === "banned") return "bg-danger";
  return "bg-info";
}

function statusLabel(status) {
  return status?.label || status || "Unknown";
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
      :actions="['view', 'manageGroups', 'ban', 'delete']"
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
      @delete="handleDelete"
      @manageGroups="handleManageGroups"
      @toggleStatus="handleToggleStatus"
      @ban="handleBan"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-username="{ row }">
        <div class="d-flex align-items-center">
          <div
            class="rounded-circle bg-body-light d-flex align-items-center justify-content-center me-2"
            style="width: 32px; height: 32px; min-width: 32px;"
          >
            <i class="fa fa-user text-muted"></i>
          </div>
          <span>{{ row.username }}</span>
        </div>
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
        <button
          type="button"
          class="badge border-0 fs-xs py-1 px-3 rounded-pill d-inline-flex align-items-center gap-1"
          :class="statusBadgeClass(row.status)"
          :disabled="togglingUser === row.username"
          :title="statusLabel(row.status) === 'Active' ? 'Click to deactivate' : 'Click to activate'"
          style="cursor: pointer;"
          @click="handleToggleStatus(row)"
        >
          <span
            v-if="togglingUser === row.username"
            class="spinner-border spinner-border-sm"
            style="width: 0.6rem; height: 0.6rem; border-width: 1.5px;"
          ></span>
          <i
            v-else
            class="fa fa-fw"
            :class="statusLabel(row.status).toLowerCase() === 'active' ? 'fa-toggle-on' : 'fa-toggle-off'"
          ></i>
          {{ statusLabel(row.status) }}
        </button>
      </template>
    </DataTable>
  </div>
</template>
