<script setup>
import { ref, onMounted } from "vue";
import DataTable from "@/components/DataTable/DataTable.vue";
import { useDataTable } from "@/composables/useDataTable";
import { useApi } from "@/helpers/useApi";
import { useModalStore } from "@/stores/modal";
import RulesForm from "../../../components/RulesForm.vue";

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
  initialSortBy: "rule_name",
  initialSortDir: "asc",
});

const tableColumns = [
  { field: "rule_name", header: "Rule Name", cellClass: "fw-semibold" },
  { field: "description", header: "Description" },
];

const rules = ref([]);
const loading = ref(false);

const fetchRules = async () => {
  loading.value = true;
  const { data: responseData, request, error } = useApi("/iam/rbac/rules", {
    method: "GET",
    autoFetch: false,
  });
  
  try {
    await request(null, buildQueryParams());
    const payload = responseData.value?.dataPayload || responseData.value;
    syncFromResponse(payload);

    // Transform object {rule_key: "description"} to array [{rule_name: "rule_key", description: "description"}]
    const rulesData = payload?.data || {};
    const dataArray = Array.isArray(rulesData) 
      ? rulesData 
      : Object.entries(rulesData).map(([key, value]) => ({
          name: key, // Used as row key/ID
          rule_name: key,
          description: value
        }));
    
    rules.value = dataArray;
    // Fallback for totalCount if backend doesn't paginate rules
    if (!payload?.totalCount) {
      totalCount.value = dataArray.length;
    }
  } catch (err) {
    console.error("Failed to fetch rules:", err);
  } finally {
    loading.value = false;
  }
};

function handleSearch(query) {
  setSearchDebounced(query, fetchRules);
}

function handlePageChange(page) {
  setPage(page);
  fetchRules();
}

function handlePerPageChange(value) {
  setPerPage(value);
  fetchRules();
}

function handleSort(field) {
  setSort(field);
  fetchRules();
}

function handleView(rule) {
  modalStore.openModal({
    component: RulesForm,
    props: {
      formData: { ...rule },
      fieldErrors: {},
      isLoading: false,
      readonly: true,
      hideSubmit: true,
      compact: true,
    },
    title: "View Business Rule",
    size: "md",
    showFooter: false,
    showConfirm: false,
    showCancel: false,
  });
}

function handleEdit(rule) {
  modalStore.openModal({
    component: RulesForm,
    props: {
      formData: { ...rule },
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      onSubmit: handleSubmit,
    },
    title: "Edit Business Rule",
    size: "md",
    showFooter: false,
  });
}

async function handleSubmit(data) {
  modalStore.props.isLoading = true;
  modalStore.props.fieldErrors = {};

  const { request, error } = useApi(`/iam/rbac/rule/${data.name}`, {
    method: "PUT",
    autoFetch: false,
  });

  await request(data);
  modalStore.props.isLoading = false;

  if (error.value) {
    const errors =
      typeof error.value === "object" && !Array.isArray(error.value)
        ? error.value
        : {};
    modalStore.props.fieldErrors = errors;
    return;
  }

  modalStore.closeModal();
  await fetchRules();
}

onMounted(() => {
  fetchRules();
});
</script>

<template>
  <div class="content">
    <DataTable
      title="Business Rules Management"
      :data="rules"
      :columns="tableColumns"
      :loading="loading"
      row-key="name"
      :actions="['view', 'edit']"
      :total-count="totalCount"
      :search-query="searchQuery"
      search-placeholder="Search rules..."
      :show-create="false"
      :paginated="true"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      empty-text="No rules found"
      @view="handleView"
      @edit="handleEdit"
      @search="handleSearch"
      @change-page="handlePageChange"
      @change-per-page="handlePerPageChange"
      @change-sort="handleSort"
    >
      <template #cell-rule_name="{ row }">
        {{ row.rule_name }}
      </template>

      <template #cell-description="{ row }">
        {{ row.description || '-' }}
      </template>
    </DataTable>
  </div>
</template>
