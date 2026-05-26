<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import RolesForm from "../../../components/RolesForm.vue";
import AssignmentManager from "../../../components/AssignmentManager.vue";
import { useAlertStore } from "@/stores/alert";
import { useAlert } from "@/composables/alerts";

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
  initialSortBy: "role_name",
  initialSortDir: "asc",
});

const tableColumns = [
  { field: "role_name", header: "Name", cellClass: "fw-semibold" },
  { field: "role_id", header: "Role ID" },
  { field: "ruleName", header: "Rule Name" },
];

const roles = ref([]);
const loading = ref(false);

const modalMode = ref("view");
const selectedRole = ref(null);

const fetchRoles = async () => {
  loading.value = true;
  try {
    const { data: responseData, request, error } = useApi("/iam/rbac/roles", {
      method: "GET",
      autoFetch: false,
    });

    await request(null, buildQueryParams());

    if (error.value) {
      throw error.value;
    }

    const payload = responseData.value?.dataPayload || responseData.value;
    syncFromResponse(payload);

    const dataArray = Array.isArray(payload?.data) 
      ? payload.data 
      : Object.values(payload?.data || {});
    
    roles.value = dataArray;
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
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/roles/view', params: { id: role.role_id } });
    return;
  }

  modalStore.openModal({
    component: RolesForm,
    props: {
      formData: { ...role },
      fieldErrors: {},
      isLoading: false,
      readonly: true,
      hideSubmit: true,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "View Role",
    size: "md",
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
}

function handleCreate() {
  modalMode.value = "create";
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/roles/create' });
    return;
  }

  modalStore.openModal({
    component: RolesForm,
    props: {
      formData: {},
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "Create Role",
    size: "md",
    showFooter: false,
  });
}

function handleEdit(role) {
  modalMode.value = "edit";
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/roles/update', params: { id: role.role_id } });
    return;
  }

  modalStore.openModal({
    component: RolesForm,
    props: {
      formData: { ...role },
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "Edit Role",
    size: "md",
    showFooter: false,
  });
}

async function handleDelete(role) {
  const result = await confirmAction(
    `Delete Role "${role.role_name}"?`,
    "This will permanently remove the role and its permission assignments."
  );
  if (!result.isConfirmed) return;

  try {
    const { request, error } = useApi(`/iam/rbac/role/${role.role_id}`, {
      method: "DELETE",
      autoFetch: false,
    });

    await request();
    if (error.value) {
      throw error.value;
    }

    await fetchRoles();
  } catch (error) {
    console.error("Failed to delete role:", error);
    alertStore.show({ theme: "error", type: "toast", message: "Failed to delete role." });
  }
}

function normalizeAssignmentItems(items) {
  return Object.entries(items || {}).map(([id, item]) => ({
    id,
    label: item?.display_name || id,
    type: item?.type || "",
  }));
}

function normalizeAlertify(payload, fallbackType, fallbackMessage) {
  if (!payload) {
    return {
      type: fallbackType,
      message: fallbackMessage,
    };
  }

  const type = payload.theme || payload.type || fallbackType;
  return {
    type,
    title: payload.title,
    message: payload.message || fallbackMessage,
    options: payload.options,
  };
}

function handleResponseAlert(response, fallbackMessage) {
  const payload = response?.alertifyPayload || response?.dataPayload?.alertify || response?.data?.alertifyPayload || response?.data?.dataPayload?.alertify;
  const normalized = normalizeAlertify(payload, "success", fallbackMessage);
  alertStore.show(normalized);
}

function handleErrorAlert(error, fallbackMessage) {
  const payload = error?.alertifyPayload;
  const normalized = normalizeAlertify(payload, "error", fallbackMessage);
  alertStore.show(normalized);
}

async function loadRoleAssignments(roleId) {
  const { data: responseData, request, error } = useApi(`/iam/rbac/role/${roleId}`, {
    method: "GET",
    autoFetch: false,
  });
  await request();
  if (error.value) throw error.value;
  const roleData = responseData.value?.dataPayload?.data || {};
  const items = roleData.items || {};
  return {
    available: normalizeAssignmentItems(items.available),
    assigned: normalizeAssignmentItems(items.assigned),
  };
}

async function handleManagePermissions(role) {
  selectedRole.value = role;

  modalStore.openModal({
    component: AssignmentManager,
    title: `Manage Permissions: ${role.role_name || role.role_id}`,
    size: "xl",
    showFooter: false,
    showConfirm: false,
    showCancel: false,
    props: {
      availableItems: [],
      assignedItems: [],
      isLoading: true,
      isSubmitting: false,
      availableLabel: "Available Permissions",
      assignedLabel: "Assigned Permissions",
      onAssign: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        const { data: responseData, request, error } = useApi(
          `/iam/rbac/role/assign/${role.role_id}`,
          { method: "POST", autoFetch: false }
        );
        await request({ permissions: selectedIds });
        if (error.value) {
          handleErrorAlert(error.value, "Failed to assign permissions.");
        } else {
          handleResponseAlert(responseData.value, "Permissions assigned successfully.");
          await fetchRoles();
        }
        await reloadRoleAssignmentsIntoModal(role.role_id);
      },
      onRemove: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        const { data: responseData, request, error } = useApi(
          `/iam/rbac/role/remove/${role.role_id}`,
          { method: "POST", autoFetch: false }
        );
        await request({ permissions: selectedIds });
        if (error.value) {
          handleErrorAlert(error.value, "Failed to remove permissions.");
        } else {
          handleResponseAlert(responseData.value, "Permissions removed successfully.");
          await fetchRoles();
        }
        await reloadRoleAssignmentsIntoModal(role.role_id);
      },
    },
  });

  await reloadRoleAssignmentsIntoModal(role.role_id);
}

async function reloadRoleAssignmentsIntoModal(roleId) {
  modalStore.props.isLoading = true;
  modalStore.props.isSubmitting = false;
  try {
    const data = await loadRoleAssignments(roleId);
    modalStore.props.availableItems = data.available;
    modalStore.props.assignedItems = data.assigned;
  } catch (err) {
    console.error("Failed to reload role assignments:", err);
    modalStore.props.availableItems = [];
    modalStore.props.assignedItems = [];
  } finally {
    modalStore.props.isLoading = false;
  }
}

async function handleSubmit(data) {
  modalStore.props.isLoading = true;
  modalStore.props.fieldErrors = {};

  let apiError = null;

  if (modalMode.value === "create") {
    const { request, error } = useApi("/iam/rbac/role", {
      method: "POST",
      autoFetch: false,
    });
    await request(data);
    apiError = error.value;
  } else if (modalMode.value === "edit") {
    const { request, error } = useApi(`/iam/rbac/role/${data.role_id}`, {
      method: "PUT",
      autoFetch: false,
    });
    await request(data);
    apiError = error.value;
  }

  modalStore.props.isLoading = false;

  if (apiError) {
    const errors =
      typeof apiError === "object" && !Array.isArray(apiError) ? apiError : {};
    modalStore.props.fieldErrors = errors;
    return;
  }

  modalStore.closeModal();
  await fetchRoles();
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
      :actions="['view', 'edit', 'manage', 'delete']"
      :action-icons="{ manage: 'fa fa-key' }"
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
      @manage="handleManagePermissions"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-role_name="{ row }">
        <!-- <i class="fa fa-user-shield text-primary me-2"></i> -->
        {{ row.role_name }}
      </template>

      <template #cell-role_id="{ row }">
        <code class="text-muted">{{ row.role_id }}</code>
      </template>

      <template #cell-ruleName="{ row }">
        {{ row.ruleName || '-' }}
      </template>
    </DataTable>

  </div>
</template>
