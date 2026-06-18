<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import { tableService } from "@/services/tableService"; //
import { useAlert } from "@/composables/alerts"; //

const { toastError } = useAlert();
const users = ref([]);
const isFetching = ref(true);

const tableColumns = [
  { name: "Name", field: "name" },
  { name: "Email", field: "email" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

//get data from backend.
async function fetchUsers() {
  isFetching.value = true;
  try {
    const response = await tableService.getAll(); //
    const rawData = response.data.dataPayload?.data;

    if (Array.isArray(rawData)) {
      users.value = rawData.map((user) => ({
        name: `${user.profile?.first_name} ${user.profile?.last_name}`,
        email: user.profile?.email_address,
        status: user.status === "active" ? "Active" : "Inactive",
        ...user,
      }));
    } else if (rawData) {
      // Handling single object payload for testing
      users.value = [
        {
          name: `${rawData.profile?.first_name} ${rawData.profile?.last_name}`,
          email: rawData.profile?.email_address,
          status: rawData.status === "active" ? "Active" : "Inactive",
        },
      ];
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    toastError("Error", errorMsg); //
  } finally {
    isFetching.value = false;
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="content">
    <BaseTable
      title="Users"
      :data="users"
      :columns="tableColumns"
      :loading="isFetching"
    >
      <!-- Status badge -->
      <template #cell(status)="{ row }">
        <span
          :class="
            row.status === 'Active' ? 'badge bg-success' : 'badge bg-warning'
          "
        >
          {{ row.status }}
        </span>
      </template>

      <!-- Actions buttons -->
      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1">
          <i class="fa fa-pencil-alt"></i>
        </button>
      </template>

      <!-- Table slot for "Create User" -->
      <template #header-actions>
        <button class="btn btn-primary">Create User</button>
      </template>
    </BaseTable>
  </div>
</template>
