<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useAuditTrailStore } from "~/admin/stores/auditTrailStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useAuditTrailStore();

const showModal = ref(false);
const showDeleted = ref(false);
let currentQuery = "";

// --- Trimmed Table Configuration ---
const tableColumns = [
  { name: "Audit ID", field: "audit_id" },
  { name: "System User", field: "user" },
  { name: "Operation", field: "operation" },
  { name: "Field Name", field: "field_name" },
  { name: "Audit Time", field: "audit_time" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Audit ID", type: "text", name: "audit_id", col: "col-4" },
  { label: "System User", type: "text", name: "user", col: "col-4" },
  { label: "Operation", type: "text", name: "operation", col: "col-4" },
  { label: "Field Name", type: "text", name: "field_name", col: "col-4" },
  { label: "IP Address", type: "text", name: "ip_address", col: "col-4" },
  { label: "Audit Time", type: "text", name: "audit_time", col: "col-4" },
  { label: "Old Value", type: "textarea", name: "old_value", col: "col-6" },
  { label: "New Value", type: "textarea", name: "new_value", col: "col-6" },
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(currentQuery, 1, store.pagination?.perPage || 25, showDeleted.value); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25, showDeleted.value); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize, showDeleted.value); };

watch(showDeleted, () => { store.fetchAll(currentQuery, 1, store.pagination?.perPage || 25, showDeleted.value); });

const resolveId = (row) => row.audit_trail_id ?? row.audit_id ?? row.uuid ?? row.id ?? null;
const isDeleted = (row) => (row.deleted_at !== null && row.deleted_at !== undefined) || row.is_deleted === 1 || row.is_deleted === true || row.status === 0 || row.status === 'deleted' || row.status === 'inactive';

const openViewModal = (row) => {
  // Beautifully format the complex JSON strings for the textarea viewer
  formData.value = { 
    ...row,
    ip_address: typeof row.ip_info === 'object' ? row.ip_info?.ip_address : row.ip_info,
    old_value: typeof row.old_value === 'object' ? JSON.stringify(row.old_value, null, 2) : row.old_value,
    new_value: typeof row.new_value === 'object' ? JSON.stringify(row.new_value, null, 2) : row.new_value,
  };
  showModal.value = true;
};

const handleRestore = async (row) => {
  const recordId = resolveId(row);
  if (!recordId) return toastError("Error", "Cannot resolve record ID.");
  const confirmed = await confirmAction("Restore Record?", "Are you sure you want to restore this audit record?");
  if (confirmed.isConfirmed) {
    try { await store.restore(recordId, currentQuery, store.pagination.currentPage, store.pagination.perPage, showDeleted.value); toastSuccess("Restored!", "Record restored."); } catch { toastError("Error", "Failed to restore record."); }
  }
};

const handleDelete = async (row) => {
  const recordId = resolveId(row);
  if (!recordId) return toastError("Error", "Cannot resolve record ID.");
  const confirmed = await confirmAction("Delete Record?", "Are you sure?");
  if (confirmed.isConfirmed) {
    try { await store.delete(recordId, currentQuery, store.pagination.currentPage, store.pagination.perPage, showDeleted.value); toastSuccess("Moved to Trash!", "Record deleted."); } catch { toastError("Error", "Failed to delete record."); }
  }
};

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
</script>

<template>
  <div class="content">
    <BasePageHeading title="Audit Trail Management" />
    <BaseTable
      title="Audit Trails"
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
        <span class="badge" :class="row.status === 'active' ? 'bg-success' : 'bg-warning'">{{ row.status || 'N/A' }}</span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-info me-1" @click="openViewModal(row)" title="View Details"><i class="fa fa-eye"></i></button>
        <button v-if="isDeleted(row)" class="btn btn-sm btn-alt-success" @click="handleRestore(row)" title="Restore"><i class="fa fa-undo"></i></button>
        <button v-else class="btn btn-sm btn-alt-danger" @click="handleDelete(row)" title="Delete"><i class="fa fa-trash"></i></button>
      </template>
    </BaseTable>

    <BaseModal :showModal="showModal" size="modal-lg" title="View Audit Trail Details" @close="showModal = false">
      <BaseGridForm v-model="formData" :fields="formFields" :showSubmit="false" />
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary" @click="showModal = false">Close</button>
      </template>
    </BaseModal>
  </div>
</template>