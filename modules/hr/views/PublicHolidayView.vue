<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { usePublicHolidayStore } from "~/hr/stores/publicHolidayStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = usePublicHolidayStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

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
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Holiday ID", type: "text", name: "holiday_id", placeholder: "Enter ID", col: "col-4" },
  { label: "Facility ID", type: "text", name: "facility_id", placeholder: "Enter Facility ID", col: "col-8" },
  { label: "Holiday Name", type: "text", name: "holiday_name", placeholder: "Enter Name", col: "col-8" },
  { label: "Holiday Date", type: "text", name: "holiday_date", placeholder: "YYYY-MM-DD", col: "col-4" },
  { label: "Is Recurring", type: "text", name: "is_recurring", placeholder: "Yes/No", col: "col-4" },
  { label: "Is Paid", type: "text", name: "is_paid", placeholder: "Yes/No", col: "col-4" },
  { label: "Double Pay If Worked", type: "text", name: "double_pay_if_worked", placeholder: "Yes/No", col: "col-4" },
  { label: "Status", type: "badge", name: "status", col: "col-4" },
  { label: "Description", type: "textarea", name: "description", placeholder: "Enter Description", col: "col-12" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
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

const handleDelete = async (row) => {
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

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
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
          <i class="fa fa-plus me-1"></i> Create Holiday
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
      :title="isEditing ? 'Edit PublicHoliday' : 'Create PublicHoliday'" 
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