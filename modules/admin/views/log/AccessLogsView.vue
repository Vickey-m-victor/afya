<script setup>
import { ref, onMounted } from "vue";
import DataTable from "#/components/DataTable/DataTable.vue";
import { useDataTable } from "#/composables/useDataTable";
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
  initialSortBy: "access_time",
  initialSortDir: "desc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "access_id", header: "ID", width: "90px", headerClass: "text-center", cellClass: "text-center" },
  { field: "user", header: "User", cellClass: "fw-semibold" },
  { field: "description", header: "Description" },
  { field: "ip_address", header: "IP Address" },
  { field: "user_agent", header: "Agent" },
  { field: "access_time", header: "Access Time", width: "180px" },
];

const logs = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const selectedLog = ref(null);

const fetchAccessLogs = async () => {
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

    const response = await logService.getAccessLogs(params);
    const payload = logService.normalizePayload(response);

    logs.value = payload.data;
    totalCount.value = payload.totalCount;
    totalPages.value = payload.totalPages;
  } catch (error) {
    console.error("Failed to fetch access logs:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchAccessLogs);
}

function handlePageChange(page) {
  setPage(page);
  fetchAccessLogs();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchAccessLogs();
}

function handleSort(field) {
  setSort(field);
  fetchAccessLogs();
}

function accessIp(row) {
  return row?.ip_info?.ip_address || "-";
}

function accessAgent(row) {
  const platform = row?.user_agent?.platform;
  const browser = row?.user_agent?.browser;
  const browserVersion = row?.user_agent?.browser_version;

  if (!platform && !browser && !browserVersion) return "-";
  const browserLabel = browserVersion ? `${browser || ""} ${browserVersion}`.trim() : browser || "-";
  return `${platform || "-"} / ${browserLabel}`;
}

async function handleView(log) {
  try {
    const response = await logService.getAccessLog(log.access_id);
    const payload = response.data?.dataPayload || response.data || {};
    selectedLog.value = payload?.data || payload;
  } catch (error) {
    console.error("Failed to fetch access log details:", error);
    selectedLog.value = log;
  }

  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedLog.value = null;
}

onMounted(() => {
  fetchAccessLogs();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Access Logs"
      :data="logs"
      :columns="tableColumns"
      :loading="loading"
      row-key="access_id"
      :actions="['view']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search access logs..."
      :show-create="false"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No access logs found"
      @view="handleView"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-ip_address="{ row }">
        <code>{{ accessIp(row) }}</code>
      </template>

      <template #cell-user_agent="{ row }">
        {{ accessAgent(row) }}
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
            <h5 class="modal-title">Access Log Details</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body" v-if="selectedLog">
            <dl class="row mb-0">
              <dt class="col-sm-3">ID</dt>
              <dd class="col-sm-9">{{ selectedLog.access_id }}</dd>

              <dt class="col-sm-3">User</dt>
              <dd class="col-sm-9">{{ selectedLog.user || '-' }}</dd>

              <dt class="col-sm-3">Description</dt>
              <dd class="col-sm-9">{{ selectedLog.description || '-' }}</dd>

              <dt class="col-sm-3">IP Address</dt>
              <dd class="col-sm-9"><code>{{ selectedLog?.ip_info?.ip_address || '-' }}</code></dd>

              <dt class="col-sm-3">IP Info</dt>
              <dd class="col-sm-9">{{ selectedLog?.ip_info?.message || '-' }}</dd>

              <dt class="col-sm-3">User Agent</dt>
              <dd class="col-sm-9">{{ accessAgent(selectedLog) }}</dd>

              <dt class="col-sm-3">Access Time</dt>
              <dd class="col-sm-9">{{ selectedLog.access_time || '-' }}</dd>
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
</style>
