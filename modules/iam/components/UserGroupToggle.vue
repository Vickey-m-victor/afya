<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";
import { useAlertStore } from "@/stores/alert";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const alertStore = useAlertStore();
const groups = ref([]);
const loading = ref(true);
const processing = ref({});

async function loadGroups() {
  loading.value = true;
  try {
    const {
      data: groupsResponseData,
      request: groupsRequest,
      error: groupsError,
    } = useApi("/iam/rbac/groups", {
      method: "GET",
      autoFetch: false,
    });

    const {
      data: userResponseData,
      request: userRequest,
      error: userError,
    } = useApi(`/iam/user/${props.username}`, {
      method: "GET",
      autoFetch: false,
    });

    await Promise.all([
      groupsRequest(null, { "per-page": 1000 }),
      userRequest(),
    ]);

    if (groupsError.value) throw groupsError.value;
    if (userError.value) throw userError.value;

    const groupsPayload =
      groupsResponseData.value?.dataPayload || groupsResponseData.value || {};
    const groupsData = groupsPayload?.data;

    const groupEntries = Array.isArray(groupsData)
      ? groupsData.map((group) => {
          const key =
            group?.group_id || group?.id || group?.group_name || group?.name || "";
          return [String(key), group];
        })
      : Object.entries(groupsData || {});

    const userPayload =
      userResponseData.value?.dataPayload || userResponseData.value?.data || {};
    const assignedMap = userPayload.items?.assigned || {};

    const assignedIndex = new Set();
    Object.entries(assignedMap).forEach(([id, group]) => {
      assignedIndex.add(String(id));
      if (group?.group_id) assignedIndex.add(String(group.group_id));
      if (group?.group_name) assignedIndex.add(String(group.group_name));
      if (group?.name) assignedIndex.add(String(group.name));
    });

    groups.value = groupEntries
      .map(([entryKey, rawGroup]) => {
        const group =
          rawGroup && typeof rawGroup === "object"
            ? rawGroup
            : {
                group_name: String(rawGroup || entryKey),
                description: String(rawGroup || ""),
              };

        const groupName =
          group?.group_name || group?.name || group?.display_name || String(entryKey || "");
        const rowId = group?.group_id || group?.id || entryKey || groupName;
        if (!rowId || !groupName) return null;

        const isAssigned =
          assignedIndex.has(String(rowId)) ||
          (groupName && assignedIndex.has(String(groupName)));

        return {
          id: String(rowId),
          label: String(groupName),
          description: group?.description || "",
          assigned: isAssigned,
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error("Failed to load user groups:", err);
    alertStore.show({
      theme: "error",
      type: "toast",
      message: "Failed to load groups.",
    });
  } finally {
    loading.value = false;
  }
}

async function toggleGroup(group) {
  processing.value[group.id] = true;
  const action = group.assigned ? "remove" : "assign";
  const url = `/iam/user/${action}/${props.username}/${encodeURIComponent(group.id)}`;

  try {
    const { data: responseData, request, error } = useApi(url, {
      method: "POST",
      autoFetch: false,
    });
    await request();

    if (error.value) {
      alertStore.show({
        theme: "error",
        type: "toast",
        message: `Failed to ${action} group "${group.label}".`,
      });
    } else {
      // Show backend response alert
      const payload =
        responseData.value?.alertifyPayload ||
        responseData.value?.dataPayload?.alertify;
      if (payload) {
        alertStore.show(payload);
      }
      // Toggle the local state
      group.assigned = !group.assigned;
    }
  } catch (err) {
    console.error(`Failed to ${action} group:`, err);
    alertStore.show({
      theme: "error",
      type: "toast",
      message: `Failed to ${action} group "${group.label}".`,
    });
  } finally {
    processing.value[group.id] = false;
  }
}

onMounted(() => {
  loadGroups();
});
</script>

<template>
  <div>
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!groups.length" class="text-center text-muted py-4">
      <p class="mb-0">No groups available.</p>
    </div>

    <div v-else class="row">
      <div v-for="group in groups" :key="group.id" class="col-lg-4">
        <div class="form-check form-switch form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`group-${group.id}`"
            :checked="group.assigned"
            :disabled="processing[group.id]"
            @change="toggleGroup(group)"
          />
          <label class="form-check-label" :for="`group-${group.id}`">
            {{ group.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
