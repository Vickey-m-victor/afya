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
  initialSortBy: "log_time",
  initialSortDir: "desc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "id", header: "ID", width: "90px", headerClass: "text-center", cellClass: "text-center" },
  { field: "level", header: "Level", width: "120px", headerClass: "text-center", cellClass: "text-center" },
  { field: "category", header: "Category", cellClass: "fw-semibold" },
  { field: "log_time", header: "Log Time", width: "180px" },
  { field: "is_resolved", header: "Resolved", width: "120px", headerClass: "text-center", cellClass: "text-center" },
];

const logs = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const selectedLog = ref(null);

const fetchErrorLogs = async () => {
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

    const response = await logService.getErrorLogs(params);
    const payload = logService.normalizePayload(response);

    logs.value = payload.data;
    totalCount.value = payload.totalCount;
    totalPages.value = payload.totalPages;
  } catch (error) {
    console.error("Failed to fetch error logs:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchErrorLogs);
}

function handlePageChange(page) {
  setPage(page);
  fetchErrorLogs();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchErrorLogs();
}

function handleSort(field) {
  setSort(field);
  fetchErrorLogs();
}

function levelBadgeClass(level) {
  if (level === "danger" || level === "error") return "bg-danger";
  if (level === "warning") return "bg-warning";
  if (level === "info") return "bg-info";
  return "bg-secondary";
}

function resolvedBadgeClass(isResolved) {
  return Number(isResolved) === 1 ? "bg-success" : "bg-danger";
}

function resolvedLabel(isResolved) {
  return Number(isResolved) === 1 ? "Yes" : "No";
}

async function handleView(log) {
  try {
    const response = await logService.getErrorLog(log.id);
    const payload = response.data?.dataPayload || response.data || {};
    selectedLog.value = payload?.data || payload;
  } catch (error) {
    console.error("Failed to fetch error log details:", error);
    selectedLog.value = log;
  }

  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedLog.value = null;
}

onMounted(() => {
  fetchErrorLogs();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Error Logs"
      :data="logs"
      :columns="tableColumns"
      :loading="loading"
      row-key="id"
      :actions="['view']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search error logs..."
      :show-create="false"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No error logs found"
      @view="handleView"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-level="{ row }">
        <span class="badge" :class="levelBadgeClass(row.level)">
          {{ row.level || '-' }}
        </span>
      </template>

      <template #cell-is_resolved="{ row }">
        <span class="badge" :class="resolvedBadgeClass(row.is_resolved)">
          {{ resolvedLabel(row.is_resolved) }}
        </span>
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
            <h5 class="modal-title">Error Log Details</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body" v-if="selectedLog">
            <dl class="row mb-0">
              <dt class="col-sm-3">ID</dt>
              <dd class="col-sm-9">{{ selectedLog.id }}</dd>

              <dt class="col-sm-3">Level</dt>
              <dd class="col-sm-9">{{ selectedLog.level || '-' }}</dd>

              <dt class="col-sm-3">Category</dt>
              <dd class="col-sm-9">{{ selectedLog.category || '-' }}</dd>

              <dt class="col-sm-3">Resolved</dt>
              <dd class="col-sm-9">{{ resolvedLabel(selectedLog.is_resolved) }}</dd>

              <dt class="col-sm-3">Log Time</dt>
              <dd class="col-sm-9">{{ selectedLog.log_time || '-' }}</dd>
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
