<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useRoleStore } from "~/iam/stores/roleStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useRoleStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);

// --- Table Configuration ---
const tableColumns = [
  { name: "Role ID", field: "role_id" },
  { name: "Role Name", field: "role_name" },
  { name: "Description", field: "description" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});

const formFields = reactive([
{ label: "Role ID", type: "text", name: "role_id", placeholder: "Enter role id" },
{ label: "Role Name", type: "text", name: "role_name", placeholder: "Enter role name" },
{ label: "Description", type: "text", name: "description", placeholder: "Enter description" },


]);

const handleSearch = (query) => {
  // Pass the query to your store to fetch new data
  store.fetchAll(query);
};
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
  const recordId = row.id || row.uuid || row[`role_id`]; 
  
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
      const recordId = formData.value.id || formData.value.uuid || formData.value[`role_id`];
      await store.update(recordId, formData.value);
      toastSuccess("Success", "Role updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "Role created successfully!");
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
    <BasePageHeading title="Role Management" />

    <BaseTable
      title="Roles"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      @search="handleSearch"

    >
      <template #header-actions>
        <BaseButton label="Create Role" variant="primary" @click="openCreateModal" />
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
      :title="isEditing ? 'Edit Role' : 'Create Role'" 
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