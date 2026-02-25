<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useTaskManagerStore } from "~/admin/stores/taskManagerStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useTaskManagerStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);

// --- Table Configuration ---
const tableColumns = [
  { name: "Task ID", field: "task_id" },
  { name: "Task Title", field: "task_title" },
  { name: "Service Name", field: "service_name" },
  { name: "Label", field: "status.label" },
  { name: "Theme", field: "status.theme" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});

const formFields = reactive([
  { label: "Task Title", type: "text", name: "task_title", placeholder: "Enter Task Title..." },
  { label: "Service", type: "text", name: "system_service", placeholder: "Enter Service..." },
  { label: "Is Recurring", type: "text", name: "is_recurring", placeholder: "Enter Is Recurring..." },
  { label: "Schedule Type", type: "text", name: "schedule_type", placeholder: "Enter Schedule Type..." },
  { label: "Schedule Value", type: "text", name: "schedule_value", placeholder: "Enter Schedule Value..." },
  { label: "Recipient Email", type: "text", name: "service_payload.to", placeholder: "Enter Recipient Email..." },
  { label: "CC Email", type: "text", name: "service_payload.cc", placeholder: "Enter CC Email..." },
  { label: "Email Subject", type: "text", name: "service_payload.subject", placeholder: "Enter Email Subject..." },
  { label: "Email Body", type: "text", name: "service_payload.body", placeholder: "Enter Email Body..." },
  { label: "Email Template", type: "text", name: "service_payload.template", placeholder: "Enter Email Template..." },
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
  const recordId = row.id || row.uuid || row[`task_manager_id`]; 
  
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

const handleSave = async () => {
  try {
    if (isEditing.value) {
      // Assuming ID field. Adjust if your backend uses a custom ID name
      const recordId = formData.value.id || formData.value.uuid || formData.value[`task_manager_id`];
      await store.update(recordId, formData.value);
      toastSuccess("Success", "TaskManager updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "TaskManager created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

onMounted(() => {
  store.fetchAll().catch(() => toastError("Error", "Failed to load data"));
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="TaskManager Management" />

    <BaseTable
      title="TaskManagers"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
    >
      <template #header-actions>
        <BaseButton label="Create TaskManager" variant="primary" @click="openCreateModal" />
      </template>

      <template #cell(status)="{ row }">
        <span class="badge" :class="row.status === 'active' ? 'bg-success' : 'bg-warning'">
          {{ row.status || 'N/A' }}
        </span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" @click="openEditModal(row)">
          <i class="fa fa-pencil-alt"></i>
        </button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      :title="isEditing ? 'Edit TaskManager' : 'Create TaskManager'" 
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