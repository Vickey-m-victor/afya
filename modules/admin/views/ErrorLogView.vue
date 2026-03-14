<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useErrorLogStore } from "~/admin/stores/errorLogStore";
import { useAlert } from "@/composables/alerts";

const { toastSuccess, toastError, confirmAction } = useAlert();
const store = useErrorLogStore();

const showModal = ref(false);
let currentQuery = "";

const tableColumns = [
  { name: "Error Log ID", field: "id" },
  { name: "Level", field: "level" },
  { name: "Category", field: "category" },
  { name: "Log Time", field: "log_time" },
  { name: "Is Resolved", field: "is_resolved" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "Error Log ID", type: "text", name: "id", col: "col-4" },
  { label: "Level", type: "text", name: "level", col: "col-4" },
  { label: "Category", type: "text", name: "category", col: "col-4" },
  { label: "Log Time", type: "text", name: "log_time", col: "col-6" },
  { label: "Is Resolved", type: "text", name: "is_resolved", col: "col-6" },
  { label: "Error Details", type: "textarea", name: "details", col: "col-12" }, // Catch-all for full error stack
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query); };

const openViewModal = (row) => {
  formData.value = { ...row }; 
  showModal.value = true;
};

const handleDelete = async (row) => {
  const recordId = row.id || row.uuid || row[`error_log_id`]; 
  const confirmed = await confirmAction("Are you sure?", "You won't be able to revert this!");
  if (confirmed.isConfirmed) {
    try { await store.delete(recordId); toastSuccess("Deleted!", "Record has been deleted."); } catch { toastError("Error", "Failed to delete record."); }
  }
};

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
</script>

<template>
  <div class="content">
    <BasePageHeading title="Error Log Management" />
    <BaseTable
      title="Error Logs"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :show-index="false"
      @search="handleSearch"
    >
      <template #cell(status)="{ row }">
        <span v-if="row.status" class="badge" :class="`bg-${row.status.theme || 'primary'}`">{{ row.status.label || 'N/A' }}</span>
        <span v-else class="text-muted">N/A</span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-info me-1" @click="openViewModal(row)" title="View Details">
          <i class="fa fa-eye"></i> View
        </button>
        <button class="btn btn-sm btn-alt-danger" @click="handleDelete(row)" title="Delete">
          <i class="fa fa-trash"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal :showModal="showModal" size="modal-lg" title="View Error Details" @close="showModal = false">
      <BaseGridForm v-model="formData" :fields="formFields" :showSubmit="false" />
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary" @click="showModal = false">Close</button>
      </template>
    </BaseModal>
  </div>
</template>