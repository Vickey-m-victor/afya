<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import logService from "../../services/logService";

const {
  searchQuery,
  currentPage,
  perPage,
  sortBy,
  sortDir,
  perPageOptions,
  setSearchDebounced,
  setPage,
  setPerPage,
  setSort,
} = useDataTable({
  initialPage: 1,
  initialPerPage: 20,
  perPageOptions: [10, 20, 50, 100],
  initialSortBy: "audit_time",
  initialSortDir: "desc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "audit_id", header: "ID", width: "90px", headerClass: "text-center", cellClass: "text-center" },
  { field: "user", header: "User", cellClass: "fw-semibold" },
  { field: "operation", header: "Operation", width: "120px", headerClass: "text-center", cellClass: "text-center" },
  { field: "request_method", header: "Method", width: "120px", headerClass: "text-center", cellClass: "text-center" },
  { field: "field_name", header: "Field" },
  { field: "new_value", header: "New Value" },
  { field: "audit_time", header: "Audit Time", width: "180px" },
];

const logs = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const selectedLog = ref(null);

const fetchAuditTrail = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      "per-page": perPage.value,
      sort_by: sortBy.value,
      sort_dir: sortDir.value,
    };

    if (searchQuery.value) {
      params._search = searchQuery.value;
    }

    const response = await logService.getAuditTrail(params);
    const payload = logService.normalizePayload(response);

    logs.value = payload.data;
    totalCount.value = payload.totalCount;
    totalPages.value = payload.totalPages;
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
  if (method === "GET") return "bg-info";
  if (method === "POST") return "bg-primary";
  if (method === "PATCH" || method === "PUT") return "bg-warning";
  if (method === "DELETE") return "bg-danger";
  return "bg-secondary";
}

function truncateValue(value, maxLength = 40) {
  if (value === null || value === undefined) return "-";
  const stringValue = String(value);
  return stringValue.length > maxLength ? `${stringValue.slice(0, maxLength)}...` : stringValue;
}

async function handleView(log) {
  try {
    const response = await logService.getAuditLog(log.audit_id);
    const payload = response.data?.dataPayload || response.data || {};
    selectedLog.value = payload?.data || payload;
  } catch (error) {
    console.error("Failed to fetch audit log details:", error);
    selectedLog.value = log;
  }

  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedLog.value = null;
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

    <div
      class="modal"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Audit Log Details</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body" v-if="selectedLog">
            <dl class="row mb-0">
              <dt class="col-sm-3">ID</dt>
              <dd class="col-sm-9">{{ selectedLog.audit_id }}</dd>

              <dt class="col-sm-3">User</dt>
              <dd class="col-sm-9">{{ selectedLog.user || '-' }}</dd>

              <dt class="col-sm-3">Operation</dt>
              <dd class="col-sm-9">{{ selectedLog.operation || '-' }}</dd>

              <dt class="col-sm-3">Request Method</dt>
              <dd class="col-sm-9">{{ selectedLog.request_method || '-' }}</dd>

              <dt class="col-sm-3">Field</dt>
              <dd class="col-sm-9">{{ selectedLog.field_name || '-' }}</dd>

              <dt class="col-sm-3">Old Value</dt>
              <dd class="col-sm-9"><pre class="mb-0 text-wrap">{{ selectedLog.old_value ?? '-' }}</pre></dd>

              <dt class="col-sm-3">New Value</dt>
              <dd class="col-sm-9"><pre class="mb-0 text-wrap">{{ selectedLog.new_value ?? '-' }}</pre></dd>

              <dt class="col-sm-3">IP Address</dt>
              <dd class="col-sm-9"><code>{{ selectedLog?.ip_info?.ip_address || '-' }}</code></dd>

              <dt class="col-sm-3">Audit Time</dt>
              <dd class="col-sm-9">{{ selectedLog.audit_time || '-' }}</dd>
            </dl>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" :class="{ show: showModal }" v-if="showModal"></div>
  </div>
</template>

<style scoped>
.modal.show {
  display: block;
}

.modal-backdrop.show {
  opacity: 0.5;
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
