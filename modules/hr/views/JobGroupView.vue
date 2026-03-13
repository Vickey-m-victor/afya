<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useJobGroupStore } from "~/hr/stores/jobGroupStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useJobGroupStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Job Group Id", field: "job_group_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Group Name", field: "group_name" },
  { name: "Group Code", field: "group_code" },
  { name: "Status", field: "status" },
  { name: "Group Description", field: "group_description" },
  { name: "Level", field: "level" },
  { name: "Min Salary", field: "min_salary" },
  { name: "Max Salary", field: "max_salary" },
  { name: "Default Salary", field: "default_salary" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Job Group ID", type: "text", name: "job_group_id", placeholder: "Enter Group ID", col: "col-4" },
  { label: "Facility ID", type: "text", name: "facility_id", placeholder: "Enter Facility ID", col: "col-8" },
  { label: "Group Name", type: "text", name: "group_name", placeholder: "Enter Name", col: "col-6" },
  { label: "Group Code", type: "text", name: "group_code", placeholder: "Enter Code", col: "col-6" },
  { label: "Status", type: "badge", name: "status", col: "col-4" },
  { label: "Level", type: "text", name: "level", placeholder: "Enter Level", col: "col-8" },
  { label: "Min Salary", type: "text", name: "min_salary", placeholder: "Enter Min", col: "col-4" },
  { label: "Max Salary", type: "text", name: "max_salary", placeholder: "Enter Max", col: "col-4" },
  { label: "Default Salary", type: "text", name: "default_salary", placeholder: "Enter Default", col: "col-4" },
  { label: "Group Description", type: "textarea", name: "group_description", placeholder: "Enter Description", col: "col-12" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
    const recordId = formData.value.id || formData.value.uuid || formData.value[`job_group_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "JobGroup updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "JobGroup created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`job_group_id`]; 
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
    <BasePageHeading title="JobGroup Management" />
    <BaseTable
      title="JobGroups"
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
          <i class="fa fa-plus me-1"></i> Create JobGroup
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
      size="modal-lg"
      :title="isEditing ? 'Edit JobGroup' : 'Create JobGroup'" 
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