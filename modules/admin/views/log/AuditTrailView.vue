<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import AuditTrailDetailModal from "../../components/log/AuditTrailDetailModal.vue";

const modalStore = useModalStore();

const {
  searchQuery,
  currentPage,
  perPage,
  sortBy,
  sortDir,
  totalCount,
  totalPages,
  perPageOptions,
  setSearchDebounced,
  setPage,
  setPerPage,
  setSort,
  syncFromResponse,
  buildQueryParams,
} = useDataTable({
  initialSortBy: "audit_time",
  initialSortDir: "desc",
});

const tableColumns = [
  { field: "audit_id", header: "ID", width: "80px", headerClass: "text-center", cellClass: "text-center" },
  { field: "user", header: "User", cellClass: "fw-semibold" },
  { field: "operation", header: "Operation", width: "120px", headerClass: "text-center", cellClass: "text-center" },
  { field: "request_method", header: "Method", width: "110px", headerClass: "text-center", cellClass: "text-center" },
  { field: "field_name", header: "Field" },
  { field: "new_value", header: "New Value" },
  { field: "audit_time", header: "Audit Time", width: "180px" },
];

const logs = ref([]);
const loading = ref(false);

const fetchAuditTrail = async () => {
  loading.value = true;
  const { data: responseData, request } = useApi("/admin/audit/trail", {
    method: "GET",
    autoFetch: false,
  });

  try {
    await request(null, buildQueryParams());
    const payload = responseData.value?.dataPayload || responseData.value || {};
    syncFromResponse(payload);
    const rawData = payload?.data;
    logs.value = Array.isArray(rawData) ? rawData : Object.values(rawData || {});
  } catch (error) {
    console.error("Failed to fetch audit trail:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchAuditTrail);
}

function handlePageChange(page) {
  setPage(page);
  fetchAuditTrail();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchAuditTrail();
}

function handleSort(field) {
  setSort(field);
  fetchAuditTrail();
}

function operationBadgeClass(operation) {
  if (operation === "CREATE") return "bg-success";
  if (operation === "UPDATE") return "bg-primary";
  if (operation === "DELETE") return "bg-danger";
  return "bg-secondary";
}

function methodBadgeClass(method) {
  if (method === "GET") return "bg-info text-dark";
  if (method === "POST") return "bg-primary";
  if (method === "PATCH" || method === "PUT") return "bg-warning text-dark";
  if (method === "DELETE") return "bg-danger";
  return "bg-secondary";
}

function truncateValue(value, maxLength = 40) {
  if (value === null || value === undefined) return "-";
  const s = String(value);
  return s.length > maxLength ? `${s.slice(0, maxLength)}…` : s;
}

async function handleView(log) {
  modalStore.openModal({
    component: AuditTrailDetailModal,
    props: {
      auditId: log.audit_id,
      summary: log,
    },
    title: `Audit Entry #${log.audit_id}`,
    size: "xl",
    centered: true,
    scrollable: true,
    bodyClass: "p-0",
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
}

onMounted(() => {
  fetchAuditTrail();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Audit Trail"
      :data="logs"
      :columns="tableColumns"
      :loading="loading"
      row-key="audit_id"
      :actions="['view']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search audit logs..."
      :show-create="false"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No audit logs found"
      @view="handleView"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-operation="{ row }">
        <span class="badge" :class="operationBadgeClass(row.operation)">
          {{ row.operation || '-' }}
        </span>
      </template>

      <template #cell-request_method="{ row }">
        <span class="badge" :class="methodBadgeClass(row.request_method)">
          {{ row.request_method || '-' }}
        </span>
      </template>

      <template #cell-new_value="{ row }">
        <span :title="row.new_value || ''">{{ truncateValue(row.new_value) }}</span>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
