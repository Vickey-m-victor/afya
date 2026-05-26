<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import AccessLogDetailModal from "../../components/log/AccessLogDetailModal.vue";

const modalStore = useModalStore();

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

const fetchAccessLogs = async () => {
  loading.value = true;
  const { data: responseData, request } = useApi("/admin/logs/access", {
    method: "GET",
    autoFetch: false,
  });

  try {
    const params = {
      page: currentPage.value,
      "per-page": perPage.value,
    };

    if (sortBy.value) {
      params.sort = sortDir.value === "desc" ? `-${sortBy.value}` : sortBy.value;
    }

    if (searchQuery.value) {
      params.q = searchQuery.value;
    }

    await request(null, params);
    const payload = responseData.value?.dataPayload || responseData.value || {};
    const rawData = payload?.data;

    const data = Array.isArray(rawData) ? rawData : Object.values(rawData || {});

    logs.value = data;
    totalCount.value = payload?.totalCount || 0;
    totalPages.value = payload?.totalPages || 1;
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
  modalStore.openModal({
    component: AccessLogDetailModal,
    props: {
      accessId: log.access_id,
      summary: log,
    },
    title: `Access Log #${log.access_id}`,
    size: "lg",
    centered: true,
    scrollable: false,
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
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
  </div>
</template>
