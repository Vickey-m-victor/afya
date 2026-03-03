<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import ScheduleTaskModal from "../../components/task/ScheduleTaskModal.vue";
import { useAlert } from "@/composables/alerts";

const modalStore = useModalStore();
const { confirmAction } = useAlert();

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
  initialSortBy: "task_id",
  initialSortDir: "desc",
  searchDebounceMs: 300,
});

const tableColumns = [
  {
    field: "task_id",
    header: "ID",
    width: "70px",
    headerClass: "text-center",
    cellClass: "text-center",
  },
  {
    field: "task_title",
    header: "Task Title",
    cellClass: "fw-semibold",
  },
  {
    field: "job_class",
    header: "Service",
  },
  {
    field: "is_recurring",
    header: "Recurring",
    width: "100px",
    headerClass: "text-center",
    cellClass: "text-center",
  },
  {
    field: "next_run_at",
    header: "Next Run",
    width: "180px",
  },
  {
    field: "status",
    header: "Status",
    width: "120px",
    headerClass: "text-center",
    cellClass: "text-center",
  },
];

const tasks = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const fetchTasks = async () => {
  loading.value = true;
  const { data: responseData, request } = useApi("/admin/task/manager", {
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
    const payload =
      responseData.value?.dataPayload || responseData.value || {};
    const rawData = payload?.data;

    const data = Array.isArray(rawData)
      ? rawData
      : Object.values(rawData || {});

    tasks.value = data;
    totalCount.value = payload?.totalCount || 0;
    totalPages.value = payload?.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchTasks);
}

function handlePageChange(page) {
  setPage(page);
  fetchTasks();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchTasks();
}

function handleSort(field) {
  setSort(field);
  fetchTasks();
}

function handleCreate() {
  let submitFn = null;

  modalStore.openModal({
    component: ScheduleTaskModal,
    props: {
      registerSubmit: (fn) => {
        submitFn = fn;
      },
    },
    title: "Schedule New Task",
    size: "lg",
    centered: true,
    scrollable: true,
    showFooter: true,
    showConfirm: true,
    showCancel: true,
    confirmText: "Schedule Task",
    cancelText: "Cancel",
    closeOnConfirm: false,
    onConfirm: async () => {
      if (submitFn) {
        const result = await submitFn();
        if (result) {
          modalStore.closeModal(true);
          fetchTasks();
        }
      }
    },
  });
}

async function handleDelete(task) {
  const result = await confirmAction(
    `Delete Task "${task.task_title}"?`,
    "This will permanently remove the scheduled task."
  );
  if (!result.isConfirmed) return;

  const { request } = useApi(`/admin/task/manager/${task.task_id}`, {
    method: "DELETE",
    autoFetch: false,
    autoAlert: true,
  });

  try {
    await request();
    fetchTasks();
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
}

async function handleView(task) {
  // View details in a simple read-only modal
  modalStore.openModal({
    component: null,
    title: `Task: ${task.task_title}`,
    size: "md",
    centered: true,
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
}

function statusBadge(status) {
  if (status === 10) return { class: "bg-success", label: "Running" };
  if (status === 9) return { class: "bg-danger", label: "Stopped" };
  return { class: "bg-info", label: "Scheduled" };
}

function formatDatetime(val) {
  if (!val) return "-";
  try {
    return new Date(val).toLocaleString();
  } catch {
    return val;
  }
}

function serviceName(row) {
  return row?.short_name || row?.job_class || "-";
}

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div class="content">

    <DataTable
      title="Scheduled Tasks"
      :data="tasks"
      :columns="tableColumns"
      :loading="loading"
      row-key="task_id"
      :actions="['delete']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search tasks..."
      :show-create="true"
      create-label="Schedule Task"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No scheduled tasks found"
      @create="handleCreate"
      @delete="handleDelete"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <!-- Service column -->
      <template #cell-job_class="{ row }">
        {{ serviceName(row) }}
      </template>

      <!-- Recurring badge -->
      <template #cell-is_recurring="{ row }">
        <span
          class="badge fs-xs rounded-pill"
          :class="row.is_recurring ? 'bg-success-light text-success' : 'bg-secondary-light text-secondary'"
        >
          {{ row.is_recurring ? "Yes" : "No" }}
        </span>
      </template>

      <!-- Next Run -->
      <template #cell-next_run_at="{ row }">
        <span class="fs-sm text-muted">
          <i class="fa fa-calendar-alt me-1"></i>
          {{ formatDatetime(row.next_run_at) }}
        </span>
      </template>

      <!-- Status badge -->
      <template #cell-status="{ row }">
        <span
          class="badge fs-xs py-1 px-3 rounded-pill"
          :class="statusBadge(row.status).class"
        >
          {{ statusBadge(row.status).label }}
        </span>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.bg-success-light {
  background-color: rgba(40, 167, 69, 0.12);
}

.bg-secondary-light {
  background-color: rgba(108, 117, 125, 0.12);
}
</style>
