<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useUserStore } from "~/iam/stores/userStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useUserStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);

// --- Table Configuration ---
const tableColumns = [
  { name: "Username", field: "username" },
  // { name: "First name", field: "profile.first_name" },
  // { name: "Middle name", field: "profile.middle_name" },
  // { name: "Last name", field: "profile.last_name" },
  { name: "Email address", field: "profile.email_address" },
  { name: "Phone number", field: "profile.phone_number" },
  // { name: "Profile picture", field: "profile.profile_picture" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});

const formFields = reactive([
{ label: "Username", type: "text", name: "username", placeholder: "Enter user name" },
{ label: "First Name", type: "text", name: "first_name", placeholder: "Enter first name" },
{ label: "Middle Name", type: "text", name: "middle_name", placeholder: "Enter middle name" },
{ label: "Last Name", type: "text", name: "last_name", placeholder: "Enter rule last" },
{ label: "Email address", type: "text", name: "email_address", placeholder: "Enter email address" },
{ label: "Phone Number", type: "text", name: "phone_number", placeholder: "Enter phone number" },


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
  const recordId = row.id || row.uuid || row[`user_id`]; 
  
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
      const recordId = formData.value.id || formData.value.uuid || formData.value[`user_id`];
      await store.update(recordId, formData.value);
      toastSuccess("Success", "User updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "User created successfully!");
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
    <BasePageHeading title="User Management" />

    <BaseTable
      title="Users"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
    >
      <template #header-actions>
        <BaseButton label="Create User" variant="primary" @click="openCreateModal" />
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
      :title="isEditing ? 'Edit User' : 'Create User'" 
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