<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { usePublicHolidayStore } from "~/hr/stores/publicHolidayStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = usePublicHolidayStore();

// --- UI State ---
const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

// --- Table Configuration ---
const tableColumns = [
  { name: "Holiday Id", field: "holiday_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Holiday Name", field: "holiday_name" },
  { name: "Holiday Date", field: "holiday_date" },
  { name: "Is Recurring", field: "is_recurring" },
  { name: "Is Paid", field: "is_paid" },
  { name: "Double Pay If Worked", field: "double_pay_if_worked" },
  { name: "Description", field: "description" },
  { name: "Status", field: "status" },
  { name: "Is Deleted", field: "is_deleted" },
  { name: "Created At", field: "created_at" },
  { name: "Updated At", field: "updated_at" },
  { name: "Created By", field: "created_by" },
  { name: "Updated By", field: "updated_by" },
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
  const recordId = row.id || row.uuid || row[`public_holiday_id`]; 
  
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
    const recordId = formData.value.id || formData.value.uuid || formData.value[`public_holiday_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "PublicHoliday updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "PublicHoliday created successfully!");
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
    <BasePageHeading title="PublicHoliday Management" />

    <BaseTable
      title="PublicHolidays"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination"
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #header-actions>
        <BaseButton label="Create PublicHoliday" variant="primary" @click="openCreateModal" />
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
      :title="isEditing ? 'Edit PublicHoliday' : 'Create PublicHoliday'" 
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