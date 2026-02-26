<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import UsersForm from "~/iam/components/UsersForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useUserStore } from "~/iam/stores/userStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useUserStore();

const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({});

const tableColumns = [
  { name: "Username", field: "username" },
  { name: "Email address", field: "profile.email_address" },
  { name: "Phone number", field: "profile.phone_number" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {}; 
  showModal.value = true;
};

const openEditModal = (row) => {
  isEditing.value = true;
  // Flatten the profile object so it easily maps to our form inputs
  formData.value = { 
    ...row, 
    first_name: row.profile?.first_name,
    middle_name: row.profile?.middle_name,
    last_name: row.profile?.last_name,
    mobile_number: row.profile?.phone_number,
    email_address: row.profile?.email_address
  }; 
  showModal.value = true;
};

const handleDelete = async (row) => {
  // Your backend uses the username as the identifier for User actions
  const recordId = row.username; 
  
  const confirmed = await confirmAction("Are you sure?", "You won't be able to revert this!");
  if (confirmed.isConfirmed) {
    try {
      await store.delete(recordId);
      toastSuccess("Deleted!", "User has been deleted.");
    } catch (error) {
      toastError("Error", "Failed to delete user.");
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
      await store.update(formData.value.username, formData.value);
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
      @search="handleSearch"
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
      <UsersForm 
        v-model="formData" 
        submitLabel="Save" 
        @submit="handleSave" 
      />
    </BaseModal>
  </div>
</template>