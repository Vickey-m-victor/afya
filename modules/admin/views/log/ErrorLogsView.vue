<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import ErrorLogDetailModal from "../../components/log/ErrorLogDetailModal.vue";

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
  initialSortBy: "log_time",
  initialSortDir: "desc",
});

const tableColumns = [
  { field: "id", header: "ID", width: "80px", headerClass: "text-center", cellClass: "text-center" },
  { field: "level", header: "Level", width: "110px", headerClass: "text-center", cellClass: "text-center" },
  { field: "category", header: "Category", cellClass: "fw-semibold" },
  { field: "log_time", header: "Log Time", width: "180px" },
  { field: "is_resolved", header: "Status", width: "120px", headerClass: "text-center", cellClass: "text-center" },
];

const logs = ref([]);
const loading = ref(false);

const fetchErrorLogs = async () => {
  loading.value = true;
  const { data: responseData, request } = useApi("/admin/logs/error", {
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
  if (level === "warning") return "bg-warning text-dark";
  if (level === "info") return "bg-info text-dark";
  return "bg-secondary";
}

function resolvedBadgeClass(isResolved) {
  return Number(isResolved) === 1 ? "bg-success" : "bg-danger";
}

function resolvedLabel(isResolved) {
  return Number(isResolved) === 1 ? "Resolved" : "Unresolved";
}

async function handleView(log) {
  modalStore.openModal({
    component: ErrorLogDetailModal,
    props: {
      log,
      onResolved: (id) => {
        const idx = logs.value.findIndex((l) => l.id === id);
        if (idx !== -1) {
          logs.value[idx] = { ...logs.value[idx], is_resolved: 1 };
        }
      },
    },
    title: `Log Entry #${log.id}${log.log_time ? ` - ${log.log_time}` : ""}`,
    size: "xl",
    centered: true,
    scrollable: true,
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
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
  </div>
</template>

<style scoped>
</style>
