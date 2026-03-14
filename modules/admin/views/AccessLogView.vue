<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseGridForm from "@/components/BaseGridForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useAccessLogStore } from "~/admin/stores/accessLogStore";
import { useAlert } from "@/composables/alerts";

const { toastError } = useAlert();
const store = useAccessLogStore();

const showModal = ref(false);
let currentQuery = "";

// 💡 Trimmed for the table view
const tableColumns = [
  { name: "User", field: "user" },
  { name: "IP Address", field: "ip_address" },
  { name: "Device / Browser", field: "user_agent" }, // Renamed for clarity
  { name: "Access Time", field: "access_time" },
  { name: "Actions", field: "actions" },
];

const formData = ref({});
const formFields = reactive([
  { label: "User", type: "text", name: "user", col: "col-6" },
  { label: "IP Address", type: "text", name: "ip_address", col: "col-6" },
  { label: "Access Time", type: "text", name: "access_time", col: "col-12" },
  { label: "Description", type: "textarea", name: "description", col: "col-12" },
  { label: "Raw User Agent", type: "textarea", name: "raw_user_agent", col: "col-12" }
]);

const handleSearch = (query) => { currentQuery = query; store.fetchAll(query, 1, store.pagination?.perPage || 25); };
const handlePageChange = (newPage) => { store.fetchAll(currentQuery, newPage, store.pagination?.perPage || 25); };
const handleSizeChange = (newSize) => { store.fetchAll(currentQuery, 1, newSize); };

// 💡 Human-friendly JSON parser for user_agent
const formatUserAgent = (userAgent) => {
  if (!userAgent) return 'N/A';
  try {
    const parsed = typeof userAgent === 'string' ? JSON.parse(userAgent) : userAgent;
    if (parsed.platform && parsed.browser) {
      return `${parsed.platform} • ${parsed.browser} v${parsed.browser_version || ''}`;
    }
    return JSON.stringify(parsed);
  } catch {
    return userAgent; 
  }
};

const openViewModal = (row) => {
  formData.value = { 
    ...row,
    raw_user_agent: typeof row.user_agent === 'object' ? JSON.stringify(row.user_agent, null, 2) : row.user_agent
  }; 
  showModal.value = true;
};

onMounted(() => { store.fetchAll().catch(() => toastError("Error", "Failed to load data")); });
</script>

<template>
  <div class="content">
    <BasePageHeading title="AccessLog Management" />
    <BaseTable
      title="AccessLogs"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
      :pagination="store.pagination" 
      @search="handleSearch"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    >
      <template #cell(user_agent)="{ row }">
        <span class="text-muted fs-sm">{{ formatUserAgent(row.user_agent) }}</span>
      </template>

      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-info me-1" @click="openViewModal(row)" title="View Details">
          <i class="fa fa-eye"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      size="modal-lg"
      title="AccessLog Details" 
      @close="showModal = false"
    >
      <fieldset disabled>
        <BaseGridForm v-model="formData" :fields="formFields" :showSubmit="false" />
      </fieldset>
      <template #footer>
        <button type="button" class="btn btn-sm btn-alt-secondary" @click="showModal = false">Close</button>
      </template>
    </BaseModal>
  </div>
</template>