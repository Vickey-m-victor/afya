<script setup>
import { ref, onMounted } from "vue";
import DataTable from "#/components/DataTable/DataTable.vue";
import { useDataTable } from "#/composables/useDataTable";
import ruleService from "../../../services/ruleService";
import RulesForm from "../../../components/RulesForm.vue";

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
  initialSortBy: "rule_name",
  initialSortDir: "asc",
  searchDebounceMs: 300,
});

const tableColumns = [
  { field: "rule_name", header: "Rule Name", cellClass: "fw-semibold" },
  { field: "description", header: "Description" },
];

const rules = ref([]);
const loading = ref(false);
const totalCount = ref(0);
const totalPages = ref(1);

const showModal = ref(false);
const modalTitle = ref("");
const modalMode = ref("view");
const formData = ref({});
const fieldErrors = ref({});
const formLoading = ref(false);

const fetchRules = async () => {
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

    const response = await ruleService.getRules(params);
    const payload = response.data?.dataPayload || response.data;

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
    totalCount.value = payload?.totalCount || dataArray.length;
    totalPages.value = payload?.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch rules:", error);
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
  modalMode.value = "view";
  modalTitle.value = "View Business Rule";
  formData.value = { ...rule };
  fieldErrors.value = {};
  showModal.value = true;
}

function handleEdit(rule) {
  modalMode.value = "edit";
  modalTitle.value = "Edit Business Rule";
  formData.value = { ...rule };
  fieldErrors.value = {};
  showModal.value = true;
}

async function handleSubmit(data) {
  formLoading.value = true;
  fieldErrors.value = {};

  try {
    await ruleService.updateRule(data.name, data);
    showModal.value = false;
    await fetchRules();
  } catch (error) {
    console.error("Form submission error:", error);

    if (error.response?.data?.errorPayload?.errors) {
      fieldErrors.value = error.response.data.errorPayload.errors;
    }

    throw error;
  } finally {
    formLoading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
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
        <i class="fa fa-gavel text-secondary me-2"></i>
        {{ row.rule_name }}
      </template>

      <template #cell-description="{ row }">
        {{ row.description || '-' }}
      </template>
    </DataTable>

    <div
      class="modal"
      :class="{ show: showModal }"
      :style="{ display: showModal ? 'block' : 'none' }"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <RulesForm
              :formData="formData"
              :fieldErrors="fieldErrors"
              :isLoading="formLoading"
              :readonly="modalMode === 'view'"
              :hideSubmit="modalMode === 'view'"
              :compact="true"
              :onSubmit="handleSubmit"
            />
          </div>
          <div class="modal-footer" v-if="modalMode === 'view'">
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
