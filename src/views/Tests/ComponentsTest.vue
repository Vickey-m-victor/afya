<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import { tableService } from "@/services/tableService";
import { useAlert } from "@/composables/alerts";
import BaseButton from "@/components/BaseButton.vue";

const { toastError } = useAlert();

const isFetching = ref(true);
const users = ref([]);

const tableColumns = [
  { name: "Name", field: "name" },
  { name: "Email Address", field: "email" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

async function fetchUsers() {
  isFetching.value = true;
  try {
    const response = await tableService.getAll();
    // Assuming your backend returns data in a 'data' field
    users.value = response.data.dataPayload?.data || response.data;
  } catch (error) {
    toastError("Error", "Could not load users from server");
    console.error(error);
  } finally {
    // 4. Turn off the shimmer effect
    isFetching.value = false;
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="content">
    <BaseButton> </BaseButton>
    <BaseTable
      title="Global Users Registry"
      :data="users"
      :columns="tableColumns"
      :loading="isFetching"
      :search-fields="['name', 'email']"
    >
      <template #cell(status)="{ row }">
        <span
          :class="
            row.status === 'Active' ? 'badge bg-success' : 'badge bg-warning'
          "
        >
          {{ row.status }}
        </span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" title="Edit">
          <i class="fa fa-pencil-alt"></i>
        </button>
        <button class="btn btn-sm btn-alt-danger" title="Delete">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>
  </div>
</template>
