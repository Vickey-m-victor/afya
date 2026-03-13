<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useLeaveTypeStore } from "~/hr/stores/leaveTypeStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useLeaveTypeStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Leave Type Id", field: "leave_type_id" },
  { name: "Name", field: "name" },
  { name: "Default Days", field: "default_days" },
  { name: "Gender Specific", field: "gender_specific" },
  { name: "Paid", field: "paid" },
  { name: "Requires Approval", field: "requires_approval" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Leave Type ID", type: "text", name: "leave_type_id", placeholder: "Enter ID", col: "col-4" },
  { label: "Name", type: "text", name: "name", placeholder: "Enter Leave Name", col: "col-8" },
  { label: "Default Days", type: "text", name: "default_days", placeholder: "Enter Days", col: "col-4" },
  { label: "Gender Specific", type: "text", name: "gender_specific", placeholder: "All/Male/Female", col: "col-8" },
  { label: "Paid Leave", type: "text", name: "paid", placeholder: "Yes/No", col: "col-6" },
  { label: "Requires Approval", type: "text", name: "requires_approval", placeholder: "Yes/No", col: "col-6" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
    const recordId = formData.value.id || formData.value.uuid || formData.value[`leave_type_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "LeaveType updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "LeaveType created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`leave_type_id`]; 
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
    <BasePageHeading title="LeaveType Management" />
    <BaseTable
      title="LeaveTypes"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      :show-index="false"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #header-actions>
        <button class="btn btn-sm btn-primary" @click="openCreateModal">
          <i class="fa fa-plus me-1"></i> Create LeaveType
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
      :title="isEditing ? 'Edit LeaveType' : 'Create LeaveType'" 
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