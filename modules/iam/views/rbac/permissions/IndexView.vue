<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import PermissionsForm from "../../../components/PermissionsForm.vue";
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
  initialSortBy: "permission_name",
  initialSortDir: "asc",
});

const tableColumns = [
  { field: "permission_name", header: "Name", cellClass: "fw-semibold" },
  { field: "permission_id", header: "Permission ID" },
  { field: "description", header: "Description" },
];

const permissions = ref([]);
const loading = ref(false);

const modalMode = ref("view");
const selectedPermission = ref(null);

const fetchPermissions = async () => {
  loading.value = true;
  try {
    const { data: responseData, request, error } = useApi("/iam/rbac/permissions", {
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
    
    permissions.value = dataArray;
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
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/permissions/view', params: { id: permission.permission_id } });
    return;
  }

  modalStore.openModal({
    component: PermissionsForm,
    props: {
      formData: { ...permission },
      fieldErrors: {},
      isLoading: false,
      readonly: true,
      hideSubmit: true,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "View Permission",
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
    router.push({ name: 'iam/rbac/permissions/create' });
    return;
  }

  modalStore.openModal({
    component: PermissionsForm,
    props: {
      formData: {},
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "Create Permission",
    size: "md",
    showFooter: false,
  });
}

function handleEdit(permission) {
  modalMode.value = "edit";
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/permissions/update', params: { id: permission.permission_id } });
    return;
  }

  modalStore.openModal({
    component: PermissionsForm,
    props: {
      formData: { ...permission },
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "Edit Permission",
    size: "md",
    showFooter: false,
  });
}

async function handleDelete(permission) {
  const result = await confirmAction(
    `Delete Permission "${permission.permission_name}"?`,
    "This will permanently remove the permission."
  );
  if (!result.isConfirmed) return;

  try {
    const { request, error } = useApi(`/iam/rbac/permission/${permission.permission_id}`, {
      method: "DELETE",
      autoFetch: false,
    });
    await request();
    if (error.value) {
      throw error.value;
    }

    await fetchPermissions();
  } catch (error) {
    console.error("Failed to delete permission:", error);
    alertStore.show({ theme: "error", type: "toast", message: "Failed to delete permission." });
  }
}

function normalizeRoles(payloadData) {
  const rows = Array.isArray(payloadData) ? payloadData : Object.values(payloadData || {});
  return rows.map((role) => ({
    id: role.role_id || role.name,
    label: role.role_name || role.description || role.role_id || role.name,
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

async function loadPermissionAssignments(permissionId) {
  const { data: rolesResponseData, request: fetchRolesReq, error: rolesError } = useApi("/iam/rbac/roles", {
    method: "GET",
    autoFetch: false,
  });
  await fetchRolesReq(null, { "per-page": 1000 });
  if (rolesError.value) throw rolesError.value;

  const rolesPayload = rolesResponseData.value?.dataPayload || rolesResponseData.value;
  const roles = normalizeRoles(rolesPayload?.data);

  const roleAssignmentChecks = await Promise.all(
    roles.map(async (role) => {
      try {
        const { data: detailData, request: fetchRoleDetail, error: detailError } = useApi(`/iam/rbac/role/${role.id}`, {
          method: "GET",
          autoFetch: false,
        });
        await fetchRoleDetail();
        if (detailError.value) return { ...role, isAssigned: false };
        const roleData = detailData.value?.dataPayload?.data || {};
        const assignedMap = roleData.items?.assigned || {};
        return {
          ...role,
          isAssigned: Object.prototype.hasOwnProperty.call(assignedMap, permissionId),
        };
      } catch {
        return { ...role, isAssigned: false };
      }
    })
  );

  return {
    available: roleAssignmentChecks.filter((item) => !item.isAssigned),
    assigned: roleAssignmentChecks.filter((item) => item.isAssigned),
  };
}

async function handleManage(permission) {
  selectedPermission.value = permission;

  modalStore.openModal({
    component: AssignmentManager,
    title: `Manage Roles: ${permission.permission_name || permission.permission_id}`,
    size: "xl",
    showFooter: false,
    showConfirm: false,
    showCancel: false,
    props: {
      availableItems: [],
      assignedItems: [],
      isLoading: true,
      isSubmitting: false,
      availableLabel: "Available Roles",
      assignedLabel: "Assigned Roles",
      onAssign: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        try {
          const responses = await Promise.all(
            selectedIds.map(async (roleId) => {
              const { data: responseData, request, error } = useApi(`/iam/rbac/role/assign/${roleId}`, {
                method: "POST",
                autoFetch: false,
              });
              await request({ permissions: [permission.permission_id] });
              if (error.value) throw error.value;
              return responseData.value;
            })
          );
          responses.forEach((r) => handleResponseAlert(r, "Permission assigned successfully."));
        } catch (err) {
          handleErrorAlert(err, "Failed to assign permission.");
        }
        await reloadPermissionAssignmentsIntoModal(permission.permission_id);
      },
      onRemove: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        try {
          const responses = await Promise.all(
            selectedIds.map(async (roleId) => {
              const { data: responseData, request, error } = useApi(`/iam/rbac/role/remove/${roleId}`, {
                method: "POST",
                autoFetch: false,
              });
              await request({ permissions: [permission.permission_id] });
              if (error.value) throw error.value;
              return responseData.value;
            })
          );
          responses.forEach((r) => handleResponseAlert(r, "Permission removed successfully."));
        } catch (err) {
          handleErrorAlert(err, "Failed to remove permission.");
        }
        await reloadPermissionAssignmentsIntoModal(permission.permission_id);
      },
    },
  });

  await reloadPermissionAssignmentsIntoModal(permission.permission_id);
}

async function reloadPermissionAssignmentsIntoModal(permissionId) {
  modalStore.props.isLoading = true;
  modalStore.props.isSubmitting = false;
  try {
    const data = await loadPermissionAssignments(permissionId);
    modalStore.props.availableItems = data.available;
    modalStore.props.assignedItems = data.assigned;
  } catch (err) {
    console.error("Failed to reload permission assignments:", err);
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
    const { request, error } = useApi("/iam/rbac/permission", {
      method: "POST",
      autoFetch: false,
    });
    await request(data);
    apiError = error.value;
  } else if (modalMode.value === "edit") {
    const { request, error } = useApi(`/iam/rbac/permission/${data.permission_id}`, {
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
  await fetchPermissions();
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
      :actions="['view', 'edit', 'manage', 'delete']"
      :action-icons="{ manage: 'fa fa-link' }"
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
      @manage="handleManage"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-permission_name="{ row }">
        <!-- <i class="fa fa-key text-warning me-2"></i> -->
        {{ row.permission_name }}
      </template>

      <template #cell-permission_id="{ row }">
        <code class="text-muted">{{ row.permission_id }}</code>
      </template>

      <template #cell-description="{ row }">
        {{ row.description || '-' }}
      </template>
    </DataTable>

  </div>
</template>
