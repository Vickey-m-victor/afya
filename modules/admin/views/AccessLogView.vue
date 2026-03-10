<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseForm from "@/components/BaseForm.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useAccessLogStore } from "~/admin/stores/accessLogStore";
import { useAlert } from "@/composables/alerts";

const { toastError } = useAlert();
const store = useAccessLogStore();

// --- UI State ---
const showModal = ref(false);

// --- Table Configuration ---
const tableColumns = [
  { name: "User", field: "user" },
  { name: "Description", field: "description" },
  { name: "Ip Address", field: "ip_address" },
  { name: "User Agent", field: "user_agent" },
  { name: "Access Time", field: "access_time" },
  { name: "Actions", field: "actions" },
];

// --- Form Configuration (For Viewing Details) ---
const formData = ref({});

const formFields = reactive([
  { label: "User", type: "text", name: "user" },
  { label: "Description", type: "text", name: "description" },
  { label: "IP Address", type: "text", name: "ip_address" },
  { label: "User Agent", type: "text", name: "user_agent" },
  { label: "Access Time", type: "text", name: "access_time" }
]);

// --- Backend Pagination & Search Handlers ---
let currentQuery = "";

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
const openViewModal = (row) => {
  formData.value = { ...row }; 
  showModal.value = true;
};

onMounted(() => {
  store.fetchAll().catch(() => toastError("Error", "Failed to load data"));
});
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
      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-info me-1" @click="openViewModal(row)" title="View Details">
          <i class="fa fa-eye"></i>
        </button>
      </template>
    </BaseTable>

    <BaseModal 
      :showModal="showModal" 
      title="View AccessLog Details" 
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