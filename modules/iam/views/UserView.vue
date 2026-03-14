<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useUserStore } from "~/iam/stores/userStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useUserStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";
let originalUsername = ""; // 💡 NEW: Remembers the ID for updates

const formData = ref({});

const tableColumns = [
  { name: "Username", field: "username" },
  { name: "Email Address", field: "profile.email_address" },
  { name: "Phone Number", field: "profile.phone_number" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

const formFields = reactive([
  { label: "First Name", type: "text", name: "first_name", placeholder: "Enter First Name", col: "col-4" },
  { label: "Middle Name", type: "text", name: "middle_name", placeholder: "Enter Middle Name", col: "col-4" },
  { label: "Last Name", type: "text", name: "last_name", placeholder: "Enter Last Name", col: "col-4" },
  { label: "Mobile Number", type: "text", name: "mobile_number", placeholder: "Enter Phone", col: "col-4" },
  { label: "Email Address", type: "email", name: "email_address", placeholder: "Enter Email", col: "col-8" },
  { label: "Username", type: "text", name: "username", placeholder: "Enter Username", col: "col-5" },
  { label: "Status", type: "badge", name: "status", col: "col-7" },
  { label: "Password", type: "password", name: "password", placeholder: "Enter Password", col: "col-6" },
  { label: "Confirm Password", type: "password", name: "confirm_password", placeholder: "Confirm Password", col: "col-6" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => {
  isEditing.value = false;
  originalUsername = "";
  formData.value = {}; 
  showModal.value = true;
};

const openEditModal = (row) => {
  isEditing.value = true;
  originalUsername = row.username; // 💡 Save the real ID before they edit it!
  
  formData.value = { 
    ...row, 
    first_name: row.profile?.first_name,
    middle_name: row.profile?.middle_name,
    last_name: row.profile?.last_name,
    mobile_number: row.profile?.phone_number, // Matches API mapped name
    email_address: row.profile?.email_address
  }; 
  showModal.value = true;
};
const handleSave = async () => {
  console.log("1. Save button clicked!");
  
  try {
    // 💡 FIX: Flattened the payload! No more "profile: {}" wrapper.
    const payload = {
      username: formData.value.username,
      password: formData.value.password,
      confirm_password: formData.value.confirm_password,
      first_name: formData.value.first_name,
      middle_name: formData.value.middle_name,
      last_name: formData.value.last_name,
      mobile_number: formData.value.mobile_number, // Matches the exact backend error key
      email_address: formData.value.email_address
    };

    console.log("2. Payload successfully built:", payload);

    if (isEditing.value) {
  
      await store.update(originalUsername, payload);
      toastSuccess("Success", "User updated successfully!");
    } else {
      await store.create(payload);
      toastSuccess("Success", "User created successfully!");
    }
    
    showModal.value = false;
    
  } catch (error) {

    toastError("Error", error);
  }
};

const handleDelete = async (row) => {
  const recordId = row.username; 
  const confirmed = await confirmAction("Are you sure?", "You won't be able to revert this!");
  if (confirmed.isConfirmed) {
    try { await store.delete(recordId); toastSuccess("Deleted!", "User has been deleted."); } catch { toastError("Error", "Failed to delete user."); }
  }
};

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
</script>

<template>
  <div class="content">
    <BasePageHeading title="User Management" />
    <BaseTable
      title="Users"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #header-actions>
        <button class="btn btn-sm btn-primary" @click="openCreateModal"><i class="fa fa-plus me-1"></i> Create User</button>
      </template>

      <template #cell(status)="{ row }">
        <span v-if="row.status" class="badge" :class="`bg-${row.status.theme || 'primary'}`">{{ row.status.label || 'N/A' }}</span>
        <span v-else class="text-muted">N/A</span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-info me-1" @click="openEditModal(row)" title="View Details">
          <i class="fa fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)" title="Delete">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      size="modal-xl"
      :title="isEditing ? 'View/Edit User' : 'Create User'" 
      @close="showModal = false"
    >
      <BaseGridForm 
        v-model="formData" 
        :fields="formFields"
        :showSubmit="false" 
        @submit="handleSave"  />
      
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary me-2" @click="showModal = false">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary" @click="handleSave">{{ isEditing ? 'Update' : 'Save' }}</button>
      </template>
    </BaseModal>
  </div>
</template>