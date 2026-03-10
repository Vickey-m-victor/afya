<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useAuditTrailStore } from "~/admin/stores/auditTrailStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useAuditTrailStore();

// --- UI State ---
const showModal = ref(false);
const showDeleted = ref(false);

// --- Table Configuration ---
const tableColumns = [
  { name: "System User", field: "user" },
  { name: "Old Value", field: "old_value" },
  { name: "New Value", field: "new_value" },
  { name: "Audit Time", field: "audit_time" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Audit ID", type: "text", name: "audit_id" },
  { label: "System User", type: "text", name: "user" },
  { label: "Operation", type: "text", name: "operation" },
  { label: "Field Name", type: "text", name: "field_name" },
  { label: "Old Value", type: "text", name: "old_value" },
  { label: "New Value", type: "text", name: "new_value" },
  { label: "IP Address", type: "text", name: "ip_info.ip_address" },
  { label: "Audit Time", type: "text", name: "audit_time" }
]);

// --- Backend Pagination & Search Handlers ---
let currentQuery = "";

const handleSearch = (query) => {
  currentQuery = query;
  store.fetchAll(currentQuery, 1, store.pagination?.perPage || 25, showDeleted.value);
};

const handlePageChange = (newPage) => {
  store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25, showDeleted.value);
};

const handleSizeChange = (newSize) => {
  store.fetchAll(currentQuery, 1, newSize, showDeleted.value);
};

watch(showDeleted, () => {
  store.fetchAll(currentQuery, 1, store.pagination?.perPage || 25, showDeleted.value);
});

// --- Smart Helpers ---
const resolveId = (row) => {
  const id = row.audit_trail_id ?? row.audit_id ?? row.uuid ?? row.id ?? null;
  if (!id) console.warn('Could not resolve ID for row:', row);
  return id;
};

// 💡 NEW: Smart function to guess how your backend marks deleted records
const isDeleted = (row) => {
  return (
    (row.deleted_at !== null && row.deleted_at !== undefined) || 
    row.is_deleted === 1 || 
    row.is_deleted === true || 
    row.status === 0 || 
    row.status === 'deleted' ||
    row.status === 'inactive'
  );
};

// --- Action Handlers ---
const openViewModal = (row) => {
  formData.value = { ...row };
  showModal.value = true;
};

const handleRestore = async (row) => {
  const recordId = resolveId(row);
  if (!recordId) {
    toastError("Error", "Cannot resolve record ID for restore.");
    return;
  }

  const confirmed = await confirmAction("Restore Record?", "Are you sure you want to restore this audit record?");
  if (!confirmed.isConfirmed) return;

  try {
    await store.restore(recordId, currentQuery, store.pagination.currentPage, store.pagination.perPage, showDeleted.value);
    toastSuccess("Restored!", "Record has been successfully restored to active status.");
  } catch {
    toastError("Error", "Failed to restore record.");
  }
};

const handleDelete = async (row) => {
  const recordId = resolveId(row);
  if (!recordId) {
    toastError("Error", "Cannot resolve record ID for delete.");
    return;
  }

  const confirmed = await confirmAction("Delete Record?", "Are you sure? You can restore this record later if needed!");
  if (!confirmed.isConfirmed) return;

  try {
    await store.delete(recordId, currentQuery, store.pagination.currentPage, store.pagination.perPage, showDeleted.value);
    toastSuccess("Moved to Trash!", "Record deleted. You can click the green restore icon to undo this.");
  } catch {
    toastError("Error", "Failed to delete record.");
  }
};

onMounted(() => {
  store.fetchAll().catch(() => toastError("Error", "Failed to load data"));
});
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
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
  

      <template #cell(status)="{ row }">
        <span class="badge" :class="row.status === 'active' ? 'bg-success' : 'bg-warning'">
          {{ row.status || 'N/A' }}
        </span>
      </template>
      <template #cell(actions)="{ row }">
  <button class="btn btn-sm btn-alt-info me-1" @click="openViewModal(row)" title="View Details">
    <i class="fa fa-eye"></i>
  </button>

  <button
    v-if="isDeleted(row)"
    class="btn btn-sm btn-alt-success"
    @click="handleRestore(row)"
    title="Restore Record"
  >
    <i class="fa fa-undo"></i>
  </button>

  <button
    v-else
    class="btn btn-sm btn-alt-danger"
    @click="handleDelete(row)"
    title="Delete Record"
  >
    <i class="fa fa-trash"></i>
  </button>
</template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      title="View Audit Trail Details" 
      @close="showModal = false"
    >
      <BaseForm 
        v-model="formData" 
        :fields="formFields" 
        :showSubmit="false" 
      />
    </BaseModal>
  </div>
</template>