<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useStatutoryRateStore } from "~/hr/stores/statutoryRateStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useStatutoryRateStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

// --- Table Configuration ---
const tableColumns = [
  { name: "Statutory Rate Id", field: "statutory_rate_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Name", field: "name" },
  { name: "Authority", field: "authority" },
  { name: "Type", field: "type" },
  { name: "Employee Rate", field: "employee_rate" },
  { name: "Employer Rate", field: "employer_rate" },
  { name: "Effective From", field: "effective_from" },
  { name: "Effective To", field: "effective_to" },
  { name: "Status", field: "status" },
  // { name: "Is Deleted", field: "is_deleted" },
  // { name: "Created At", field: "created_at" },
  // { name: "Updated At", field: "updated_at" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});
const formFields = reactive([
  { label: "", type: "text", name: "statutory_rate_id", placeholder: "Enter " },
  { label: "", type: "text", name: "facility_id", placeholder: "Enter " },
  { label: "", type: "text", name: "name", placeholder: "Enter " },
  { label: "", type: "text", name: "authority", placeholder: "Enter " },
  { label: "", type: "text", name: "type", placeholder: "Enter " },
  { label: "", type: "text", name: "employee_rate", placeholder: "Enter " },
  { label: "", type: "text", name: "employer_rate", placeholder: "Enter " },
  { label: "", type: "text", name: "effective_from", placeholder: "Enter " },
  { label: "", type: "text", name: "effective_to", placeholder: "Enter " },
  { label: "", type: "text", name: "status", placeholder: "Enter " },
  { label: "", type: "text", name: "is_deleted", placeholder: "Enter " },
  { label: "", type: "text", name: "created_at", placeholder: "Enter " },
  { label: "", type: "text", name: "updated_at", placeholder: "Enter " },
]);


// --- Handlers ---
const handleSearch = (query) => {
  currentQuery = query;
  store.fetchAll(query, 1, store.pagination?.perPage || 25);
};

const handlePageChange = (newPage) => {
  store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25);
};

const handleSizeChange = (newSize) => {
  store.fetchAll(currentQuery, 1, newSize);
};

// --- Action Handlers ---
const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {}; 
  showModal.value = true;
};

const openEditModal = (row) => {
  isEditing.value = true;
  formData.value = { ...row }; 
  showModal.value = true;
};

const handleSave = async () => {
  try {
    const recordId = formData.value.id || formData.value.uuid || formData.value[`statutory_rate_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "StatutoryRate updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "StatutoryRate created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`statutory_rate_id`]; 
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

onMounted(() => {
  store.fetchAll().catch(() => toastError("Error", "Failed to load data"));
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="StatutoryRate Management" />

    <BaseTable
      title="StatutoryRates"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #header-actions>
        <button class="btn btn-sm btn-primary" @click="openCreateModal">
          <i class="fa fa-plus me-1"></i> Create StatutoryRate
        </button>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary me-1" @click="openEditModal(row)" title="Edit">
          <i class="fa fa-pencil-alt"></i>
        </button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)" title="Delete">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      :title="isEditing ? 'Edit StatutoryRate' : 'Create StatutoryRate'" 
      @close="showModal = false"
    >
      <BaseForm 
        v-model="formData" 
        :fields="formFields" 
        :showSubmit="false" 
      />
      
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary me-2" @click="showModal = false">
          Cancel
        </button>
        <button type="button" class="btn btn-sm btn-primary" @click="handleSave">
          {{ isEditing ? 'Update' : 'Save' }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>