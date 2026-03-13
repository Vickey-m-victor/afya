<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useWorkShiftStore } from "~/hr/stores/workShiftStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useWorkShiftStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

// --- Table Configuration ---
const tableColumns = [
  { name: "Work Shift Id", field: "work_shift_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Shift Name", field: "shift_name" },
  { name: "Shift Code", field: "shift_code" },
  { name: "Start Time", field: "start_time" },
  { name: "End Time", field: "end_time" },
  { name: "Duration Hours", field: "duration_hours" },
  { name: "Grace Period Minutes", field: "grace_period_minutes" },
  { name: "Is Overnight", field: "is_overnight" },
  { name: "Is Weekend Shift", field: "is_weekend_shift" },
  { name: "Shift Allowance", field: "shift_allowance" },
  { name: "Color Code", field: "color_code" },
  { name: "Status", field: "status" },
  { name: "Shift Type", field: "shift_type" },
  { name: "Is Flexible", field: "is_flexible" },
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
    const recordId = formData.value.id || formData.value.uuid || formData.value[`work_shift_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "WorkShift updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "WorkShift created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`work_shift_id`]; 
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
    <BasePageHeading title="WorkShift Management" />

    <BaseTable
      title="WorkShifts"
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
          <i class="fa fa-plus me-1"></i> Create WorkShift
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
      :title="isEditing ? 'Edit WorkShift' : 'Create WorkShift'" 
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