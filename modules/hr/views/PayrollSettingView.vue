<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { usePayrollSettingStore } from "~/hr/stores/payrollSettingStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = usePayrollSettingStore();

const showModal = ref(false);
const isEditing = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Payroll Setting Id", field: "payroll_setting_id" },
  { name: "Facility Id", field: "facility_id" },
  { name: "Pay Cycle", field: "pay_cycle" },
  { name: "Currency", field: "currency" },
  { name: "Overtime Rate", field: "overtime_rate" },
  { name: "Tax Calculation", field: "tax_calculation_method" },
  { name: "Status", field: "status" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Setting ID", type: "text", name: "payroll_setting_id", placeholder: "Enter Setting ID", col: "col-4" },
  { label: "Facility ID", type: "text", name: "facility_id", placeholder: "Enter Facility ID", col: "col-8" },
  { label: "Pay Cycle", type: "text", name: "pay_cycle", placeholder: "Weekly/Monthly", col: "col-6" },
  { label: "Currency", type: "text", name: "currency", placeholder: "Enter Currency", col: "col-6" },
  { label: "Overtime Rate", type: "text", name: "overtime_rate", placeholder: "Enter Rate multiplier", col: "col-4" },
  { label: "Tax Calc Method", type: "text", name: "tax_calculation_method", placeholder: "Enter Method", col: "col-4" },
  { label: "Status", type: "badge", name: "status", col: "col-4" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

const openCreateModal = () => { isEditing.value = false; formData.value = {}; showModal.value = true; };
const openEditModal = (row) => { isEditing.value = true; formData.value = { ...row }; showModal.value = true; };

const handleSave = async () => {
  try {
    const recordId = formData.value.id || formData.value.uuid || formData.value[`payroll_setting_id`];
    if (isEditing.value) {
      await store.update(recordId, formData.value);
      toastSuccess("Success", "PayrollSetting updated successfully!");
    } else {
      await store.create(formData.value);
      toastSuccess("Success", "PayrollSetting created successfully!");
    }
    showModal.value = false;
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save data");
  }
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`payroll_setting_id`]; 
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
    <BasePageHeading title="PayrollSetting Management" />
    <BaseTable
      title="PayrollSettings"
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
          <i class="fa fa-plus me-1"></i> Create Setting
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
      :title="isEditing ? 'Edit PayrollSetting' : 'Create PayrollSetting'" 
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