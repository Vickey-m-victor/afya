<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useAccessLogStore } from "~/admin/stores/accessLogStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useAccessLogStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);

// --- Table Configuration ---
const tableColumns = [
  { name: "Access Id", field: "access_id" },
  { name: "User ", field: "user" },
  { name: "Description", field: "description" },
  { name: "Ip Address", field: "ip_address" },
  { name: "User Agent", field: "user_agent" },
  { name: "Access Time", field: "access_time" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});

const formFields = reactive([
]);

// --- Handlers ---
const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {}; // Clear form for new entry
  showModal.value = true;
};

// 💡 NEW: Edit Handler
const openEditModal = (row) => {
  isEditing.value = true;
  formData.value = { ...row }; // Copy row data into form
  showModal.value = true;
};

// 💡 NEW: Delete Handler
const handleDelete = async (row) => {
  // Assuming the ID field is 'id' or 'uuid'. Adjust if your backend uses something like 'role_id'
  const recordId = row.id || row.uuid || row[`access_log_id`]; 
  
  const confirmed = await confirmAction("Are you sure?", "You won't be able to revert this!");
  if (confirmed.isConfirmed) {
    try {
      await store.delete(recordId);
      toastSuccess("Deleted!", "Record has been deleted.");
    } catch (error) {
      toastError("Error", "Failed to delete record.");
    }
  }
};
const handleSearch = (query) => {
  // Pass the query to your store to fetch new data
  store.fetchAll(query);
};
const handleSave = async () => {
  try {
    if (isEditing.value) {
      // Assuming ID field. Adjust if your backend uses a custom ID name
      const recordId = formData.value.id || formData.value.uuid || formData.value[`access_log_id`];
      await store.update(recordId, formData.value);
      toastSuccess("Success", "AccessLog updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "AccessLog created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message);
  }
};

onMounted(() => {
  store.fetchAll().catch(() => toastError("Error", "Failed to load data"));
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="AccessLog Management" />

    <BaseTable
      title="AccessLogs"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      @search="handleSearch"
    >
      <!-- <template #header-actions>
        <BaseButton label="Create AccessLog" variant="primary" @click="openCreateModal" />
      </template> -->

      <template #cell(status)="{ row }">
        <span class="badge" :class="row.status === 'active' ? 'bg-success' : 'bg-warning'">
          {{ row.status || 'N/A' }}
        </span>
      </template>

      <template #cell(actions)="{ row }">
        <!-- <button class="btn btn-sm btn-alt-primary me-1" @click="openEditModal(row)">
          <i class="fa fa-pencil-alt"></i>
        </button> -->
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      :title="isEditing ? 'Edit AccessLog' : 'Create AccessLog'" 
      @close="showModal = false"
    >
      <BaseForm 
        v-model="formData" 
        :fields="formFields" 
        submitLabel="Save" 
        @submit="handleSave" 
      />
    </BaseModal>
  </div>
</template>