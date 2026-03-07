<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useJobTitleStore } from "~/hr/stores/jobTitleStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useJobTitleStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

// --- Table Configuration ---
const tableColumns = [
  { name: "Job Title Id", field: "job_title_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Department Id", field: "department_id" },
  { name: "Reports To Title Id", field: "reports_to_title_id" },
  { name: "Job Group Id", field: "job_group_id" },
  { name: "Status", field: "status" },
  { name: "Title Name", field: "title_name" },
  { name: "Title Code", field: "title_code" },
  { name: "Title Description", field: "title_description" },
  { name: "Requires License", field: "requires_license" },
  { name: "License Type", field: "license_type" },
  { name: "Is Clinical", field: "is_clinical" },
  { name: "Is Supervisory", field: "is_supervisory" },
  { name: "Is Deleted", field: "is_deleted" },
  { name: "Created At", field: "created_at" },
  { name: "Updated At", field: "updated_at" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration ---
const formData = ref({});

const formFields = reactive([
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

const handleDelete = async (row) => {
  // Adjust if your backend uses a custom ID name
  const recordId = row.id || row.uuid || row[`job_title_id`]; 
  
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
    // Adjust if your backend uses a custom ID name
    const recordId = formData.value.id || formData.value.uuid || formData.value[`job_title_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "JobTitle updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "JobTitle created successfully!");
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
    <BasePageHeading title="JobTitle Management" />

    <BaseTable
      title="JobTitles"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #header-actions>
        <BaseButton label="Create JobTitle" variant="primary" @click="openCreateModal" />
      </template>

      <template #cell(status)="{ row }">
        <span class="badge" :class="row.status === 'active' ? 'bg-success' : 'bg-warning'">
          {{ row.status || 'N/A' }}
        </span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-info me-1" @click="toastSuccess('View', 'View Logic Here')" title="View">
          <i class="fa fa-eye"></i>
        </button>
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
      :title="isEditing ? 'Edit JobTitle' : 'Create JobTitle'" 
      @close="showModal = false"
    >
      <BaseForm 
        v-model="formData" 
        :fields="formFields" 
        :submitLabel="isEditing ? 'Update' : 'Save'" 
        @submit="handleSave" 
      />
    </BaseModal>
  </div>
</template>