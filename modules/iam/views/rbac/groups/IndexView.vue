<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import GroupsForm from "../../../components/GroupsForm.vue";
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
  initialSortBy: "group_name",
  initialSortDir: "asc",
});

const tableColumns = [
  { field: "group_name", header: "Name", cellClass: "fw-semibold" },
  { field: "group_id", header: "Group ID" },
  { field: "description", header: "Description" },
  { field: "ruleName", header: "Rule Name" },
];

const groups = ref([]);
const loading = ref(false);

const modalMode = ref("view");
const selectedGroup = ref(null);

const fetchGroups = async () => {
  loading.value = true;
  try {
    const { data: responseData, request, error } = useApi("/iam/rbac/groups", {
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
    
    groups.value = dataArray;
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
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/groups/view', params: { id: group.group_id } });
    return;
  }

  modalStore.openModal({
    component: GroupsForm,
    props: {
      formData: { ...group },
      fieldErrors: {},
      isLoading: false,
      readonly: true,
      hideSubmit: true,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "View Group",
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
    router.push({ name: 'iam/rbac/groups/create' });
    return;
  }

  modalStore.openModal({
    component: GroupsForm,
    props: {
      formData: {},
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "Create Group",
    size: "md",
    showFooter: false,
  });
}

function handleEdit(group) {
  modalMode.value = "edit";
  modalStore.toggleModalUsage(true); // set to false to navigate to page

  if (!modalStore.useModal) {
    router.push({ name: 'iam/rbac/groups/update', params: { id: group.group_id } });
    return;
  }

  modalStore.openModal({
    component: GroupsForm,
    props: {
      formData: { ...group },
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit
    },
    title: "Edit Group",
    size: "md",
    showFooter: false,
  });
}

async function handleDelete(group) {
  const result = await confirmAction(
    `Delete Group "${group.group_name}"?`,
    "This will permanently remove the group and its role assignments."
  );
  if (!result.isConfirmed) return;

  try {
    const { request, error } = useApi(`/iam/rbac/group/${group.group_id}`, {
      method: "DELETE",
      autoFetch: false,
    });

    await request();
    if (error.value) {
      throw error.value;
    }

    await fetchGroups();
  } catch (error) {
    console.error("Failed to delete group:", error);
    alertStore.show({ theme: "error", type: "toast", message: "Failed to delete group." });
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

async function loadGroupAssignments(groupId) {
  const { data: responseData, request, error } = useApi(`/iam/rbac/group/${groupId}`, {
    method: "GET",
    autoFetch: false,
  });
  await request();
  if (error.value) throw error.value;
  const groupData = responseData.value?.dataPayload?.data || {};
  const items = groupData.items || {};
  return {
    available: normalizeAssignmentItems(items.available),
    assigned: normalizeAssignmentItems(items.assigned),
  };
}

async function handleManageUsers(group) {
  selectedGroup.value = group;

  modalStore.openModal({
    component: AssignmentManager,
    title: `Manage Roles: ${group.group_name || group.group_id}`,
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
        const { data: responseData, request, error } = useApi(
          `/iam/rbac/group/assign/${group.group_id}`,
          { method: "POST", autoFetch: false }
        );
        await request({ roles: selectedIds });
        if (error.value) {
          handleErrorAlert(error.value, "Failed to assign roles.");
        } else {
          handleResponseAlert(responseData.value, "Roles assigned successfully.");
          await fetchGroups();
        }
        await reloadGroupAssignmentsIntoModal(group.group_id);
      },
      onRemove: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        const { data: responseData, request, error } = useApi(
          `/iam/rbac/group/remove/${group.group_id}`,
          { method: "POST", autoFetch: false }
        );
        await request({ roles: selectedIds });
        if (error.value) {
          handleErrorAlert(error.value, "Failed to remove roles.");
        } else {
          handleResponseAlert(responseData.value, "Roles removed successfully.");
          await fetchGroups();
        }
        await reloadGroupAssignmentsIntoModal(group.group_id);
      },
    },
  });

  await reloadGroupAssignmentsIntoModal(group.group_id);
}

async function reloadGroupAssignmentsIntoModal(groupId) {
  modalStore.props.isLoading = true;
  modalStore.props.isSubmitting = false;
  try {
    const data = await loadGroupAssignments(groupId);
    modalStore.props.availableItems = data.available;
    modalStore.props.assignedItems = data.assigned;
  } catch (err) {
    console.error("Failed to reload group assignments:", err);
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
    const { request, error } = useApi("/iam/rbac/group", {
      method: "POST",
      autoFetch: false,
    });
    await request(data);
    apiError = error.value;
  } else if (modalMode.value === "edit") {
    const { request, error } = useApi(`/iam/rbac/group/${data.group_id}`, {
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
  await fetchGroups();
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
      :actions="['view', 'edit', 'manage', 'delete']"
      :action-icons="{ manage: 'fa fa-user' }"
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
      @manage="handleManageUsers"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-group_name="{ row }">
        <!-- <i class="fa fa-users text-info me-2"></i> -->
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
    </DataTable>

  </div>
</template>
