<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import { useAlertStore } from "@/stores/alert";
import { useAlert } from "@/composables/alerts";

// Import your existing Modals/Forms
import UsersForm from "../../../iam/components/UsersForm.vue";
import UserGroupToggle from "../../../iam/components/UserGroupToggle.vue";
import UserDetailsModal from "../../../iam/components/UserDetailsModal.vue";
import BaseBlock from "@/components/BaseBlock.vue";

// 1. Import the New Grid Components
import GridProvider from "@/components/GridListView/GridView/GridProvider.vue";
import GridTable from "@/components/GridListView/GridView/GridTable.vue";
import GridHeaders from "@/components/GridListView/GridView/GridHeaders.vue";
import GridBody from "@/components/GridListView/GridView/GridBody.vue";
import GridPagination from "@/components/GridListView/GridView/GridPagination.vue";
import ListBody from "@/components/GridListView/ListView/ListBody.vue"; // For the card layout

const modalStore = useModalStore();
const alertStore = useAlertStore();
const { confirmAction } = useAlert();
const router = useRouter();

const layout = ref('table'); // Toggles between 'table' and 'cards'

const {
  searchQuery,
  currentPage,
  perPage,
  sortBy,
  sortDir,
  totalCount,
  totalPages,
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

// 2. Updated Column Definitions for GridProvider
const tableColumns = [
  { attribute: "username", label: "Username", filter: true },
  { attribute: "profile.first_name", label: "First Name", filter: true },
  { attribute: "profile.last_name", label: "Last Name", filter: true },
  { attribute: "profile.email_address", label: "Email" },
  { attribute: "profile.mobile_number", label: "Mobile" },
  { attribute: "status", label: "Status", contentClass: "text-center" },
  // Action column replaces the separate prop
  { class: "ActionColumn", actions: ["view", "manageGroups", "ban", "delete"] }
];

const users = ref([]);
const loading = ref(false);
const togglingUser = ref(null);

// ──────────────────── Data Fetching (Unchanged) ────────────────────

const fetchUsers = async (additionalFilters = {}) => {
  loading.value = true;
  try {
    const { data: responseData, request, error } = useApi("/iam/users", {
      method: "GET",
      autoFetch: false,
    });

    // Merge standard pagination/sorting with the new column filters
    const queryParams = { ...buildQueryParams(), ...additionalFilters };

    await request(null, queryParams);
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

// ──────────────────── Grid Event Handlers ────────────────────

// GridProvider emits { by, dir }
function handleGridSort({ by, dir }) {
  setSort(by); // Assuming your composable handles direction internally, or adapt as needed
  fetchUsers();
}

// GridProvider emits the filter object when a user types in the column headers
function handleGridFilter(filterModel) {
  // Reset to page 1 on new search
  setPage(1); 
  // Pass the column filters directly to the API fetcher
  fetchUsers(filterModel); 
}

// Central Dispatcher for Actions
function handleGridAction({ action, row }) {
  switch (action) {
    case 'view': return handleView(row);
    case 'delete': return handleDelete(row);
    case 'manageGroups': return handleManageGroups(row);
    case 'ban': return handleBan(row);
  }
}

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
      onRefresh: fetchUsers,
    },
    title: `User Details`,
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
    <!--sends raw datato the grid system. -->
    <GridProvider
      :data="users"
      :columns="tableColumns"
      :loading="loading"
      :total-count="totalCount"
      :current-page="currentPage"
      :per-page="perPage"
      @change-page="(page) => { setPage(page); fetchUsers(); }"
      @sort="handleGridSort"
      @filter="handleGridFilter"
      @action-click="handleGridAction"

    >
      
      <BaseBlock title="Users Management" content-full>
        
        <template #options>
          <button 
            class="btn btn-sm btn-alt-secondary me-1" 
            :class="{ 'active': layout === 'cards' }"
            @click="layout = 'cards'"
          >
            <i class="fa fa-th-large"></i>
          </button>
          <button 
            class="btn btn-sm btn-alt-secondary me-3" 
            :class="{ 'active': layout === 'table' }"
            @click="layout = 'table'"
          >
            <i class="fa fa-list"></i>
          </button>

          <button type="button" class="btn btn-sm btn-primary" @click="handleCreate">
            <i class="fa fa-plus me-1"></i> New User
          </button>
        </template>

        <GridTable v-if="layout === 'table'">
          <GridHeaders />
          <GridBody>
            
            <template #cell-username="{ row }">
              <div class="d-flex align-items-center">
                <div class="rounded-circle bg-body-light d-flex align-items-center justify-content-center me-2" style="width: 32px; height: 32px;">
                  <i class="fa fa-user text-muted"></i>
                </div>
                <span class="fw-semibold">{{ row.username }}</span>
              </div>
            </template>

            <template #cell-profile.email_address="{ row }">
              <span v-if="row.profile?.email_address">
                <i class="fa fa-envelope text-muted me-1"></i> {{ row.profile.email_address }}
              </span>
              <span v-else class="text-muted">-</span>
            </template>

            <template #cell-status="{ row }">
              <button
                type="button"
                class="badge border-0 fs-xs py-1 px-3 rounded-pill d-inline-flex align-items-center gap-1"
                :class="statusBadgeClass(row.status)"
                :disabled="togglingUser === row.username"
                @click="handleToggleStatus(row)"
              >
                <i class="fa fa-fw" :class="statusLabel(row.status).toLowerCase() === 'active' ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                {{ statusLabel(row.status) }}
              </button>
            </template>

          </GridBody>
        </GridTable>

        <ListBody v-else>
          <template #card="{ row }">
            <div class="block block-rounded block-bordered h-100 mb-0 shadow-sm">
              <div class="block-content text-center py-4">
                <div class="rounded-circle bg-body-light d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px;">
                  <i class="fa fa-user fa-2x text-primary"></i>
                </div>
                <h4 class="mb-1">{{ row.profile?.first_name }} {{ row.profile?.last_name }}</h4>
                <p class="text-muted fs-sm mb-2">@{{ row.username }}</p>
                <span class="badge" :class="statusBadgeClass(row.status)">{{ statusLabel(row.status) }}</span>
              </div>
              
              <div class="block-content block-content-full bg-body-light mt-auto">
                <div class="d-flex justify-content-center gap-3">
                  <i class="fa fa-eye text-primary cursor-pointer" @click="handleView(row)"></i>
                  <i class="fa fa-users text-info cursor-pointer" @click="handleManageGroups(row)"></i>
                  <i class="fa fa-ban text-danger cursor-pointer" @click="handleBan(row)"></i>
                </div>
              </div>
            </div>
          </template>
        </ListBody>

        <template #footer>
          <div class="p-3 bg-body-light border-top">
            <GridPagination />
          </div>
        </template>

      </BaseBlock>

    </GridProvider>
  </div>
</template>