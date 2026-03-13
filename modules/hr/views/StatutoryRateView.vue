<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useStatutoryRateStore } from "~/hr/stores/statutoryRateStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useStatutoryRateStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Rate Id", field: "statutory_rate_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Name", field: "name" },
  { name: "Authority", field: "authority" },
  { name: "Type", field: "type" },
  { name: "Employee Rate", field: "employee_rate" },
  { name: "Employer Rate", field: "employer_rate" },
  { name: "Effective From", field: "effective_from" },
  { name: "Effective To", field: "effective_to" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Rate ID", type: "text", name: "statutory_rate_id", placeholder: "Enter ID", col: "col-4" },
  { label: "Facility ID", type: "text", name: "facility_id", placeholder: "Enter Facility ID", col: "col-8" },
  { label: "Rate Name", type: "text", name: "name", placeholder: "Enter Name", col: "col-6" },
  { label: "Authority", type: "text", name: "authority", placeholder: "Enter Authority (e.g. KRA)", col: "col-6" },
  { label: "Type", type: "text", name: "type", placeholder: "Fixed/Percentage", col: "col-4" },
  { label: "Employee Rate", type: "text", name: "employee_rate", placeholder: "Enter Rate", col: "col-4" },
  { label: "Employer Rate", type: "text", name: "employer_rate", placeholder: "Enter Rate", col: "col-4" },
  { label: "Effective From", type: "text", name: "effective_from", placeholder: "YYYY-MM-DD", col: "col-4" },
  { label: "Effective To", type: "text", name: "effective_to", placeholder: "YYYY-MM-DD", col: "col-4" },
  { label: "Status", type: "badge", name: "status", col: "col-4" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

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

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
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
          <i class="fa fa-plus me-1"></i> Create Rate
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
      :title="isEditing ? 'Edit StatutoryRate' : 'Create StatutoryRate'" 
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