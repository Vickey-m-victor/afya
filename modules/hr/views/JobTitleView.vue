<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useJobTitleStore } from "~/hr/stores/jobTitleStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useJobTitleStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Job Title Id", field: "job_title_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Department Id", field: "department_id" },
  { name: "Reports To", field: "reports_to_title_id" },
  { name: "Job Group Id", field: "job_group_id" },
  { name: "Status", field: "status" },
  { name: "Title Name", field: "title_name" },
  { name: "Title Code", field: "title_code" },
  { name: "Requires License", field: "requires_license" },
  { name: "License Type", field: "license_type" },
  { name: "Is Clinical", field: "is_clinical" },
  { name: "Is Supervisory", field: "is_supervisory" },
  { name: "Title Description", field: "title_description" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Job Title ID", type: "text", name: "job_title_id", placeholder: "Enter Title ID", col: "col-4" },
  { label: "Facility ID", type: "text", name: "facility_id", placeholder: "Enter Facility ID", col: "col-4" },
  { label: "Department ID", type: "text", name: "department_id", placeholder: "Enter Dept ID", col: "col-4" },
  { label: "Title Name", type: "text", name: "title_name", placeholder: "Enter Title Name", col: "col-8" },
  { label: "Title Code", type: "text", name: "title_code", placeholder: "Enter Code", col: "col-4" },
  { label: "Reports To Title ID", type: "text", name: "reports_to_title_id", placeholder: "Enter Supervisor ID", col: "col-6" },
  { label: "Job Group ID", type: "text", name: "job_group_id", placeholder: "Enter Group ID", col: "col-6" },
  { label: "Status", type: "badge", name: "status", col: "col-4" },
  { label: "Requires License", type: "text", name: "requires_license", placeholder: "Yes/No", col: "col-4" },
  { label: "License Type", type: "text", name: "license_type", placeholder: "Enter Type", col: "col-4" },
  { label: "Is Clinical", type: "text", name: "is_clinical", placeholder: "Yes/No", col: "col-6" },
  { label: "Is Supervisory", type: "text", name: "is_supervisory", placeholder: "Yes/No", col: "col-6" },
  { label: "Title Description", type: "textarea", name: "title_description", placeholder: "Enter Description", col: "col-12" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
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

const handleDelete = async (row) => {
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

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
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
      :show-index="false"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #cell(status)="{ row }">
        <span v-if="row.status" class="badge" :class="`bg-${row.status.theme || 'primary'}`">
          {{ row.status.label || 'N/A' }}
        </span>
        <span v-else class="text-muted">N/A</span>
      </template>

      <template #header-actions>
        <button class="btn btn-sm btn-primary" @click="openCreateModal">
          <i class="fa fa-plus me-1"></i> Create JobTitle
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
      size="modal-xl"
      :title="isEditing ? 'Edit JobTitle' : 'Create JobTitle'" 
      @close="showModal = false"
    >
      <BaseGridForm v-model="formData" :fields="formFields" :showSubmit="false" />
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary me-2" @click="showModal = false">Cancel</button>
        <button type="button" class="btn btn-sm btn-primary" @click="handleSave">{{ isEditing ? 'Update' : 'Save' }}</button>
      </template>
    </BaseModal>
  </div>
</template>