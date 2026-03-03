<script setup>
import { ref, watch } from "vue";
import { Dataset, DatasetItem, DatasetShow } from "vue-dataset";
import BasePagination from "@/components/BasePagination.vue"
const props = defineProps({
  data: { type: Array, required: true, default: () => [] },
  columns: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  title: { type: String, default: "" },
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      totalPages: 1,
      perPage: 25,
      totalCount: 0
    })
  }
});

// 💡 NEW: Added "search" to the emitted events
const emit = defineEmits(["click", "close", "refresh", "search", "page-change"]);



// --- Backend Search Logic (Debounce) ---
const searchQuery = ref("");
let debounceTimer = null;

// Watch the input. Every time it changes, restart the 500ms timer.
watch(searchQuery, (newValue) => {
  clearTimeout(debounceTimer); // Stop the previous timer
  debounceTimer = setTimeout(() => {
    // If 500ms pass without typing, tell the parent view to search the backend!
    emit("search", newValue);
  }, 500);
});

const onSort = (event, index) => {
  // Sorting logic
};
</script>

<template>
  <BaseBlock content-full>
    <Dataset
      v-slot="{ ds }"
      :ds-data="Array.isArray(data) ? data : []"
      :ds-search="''"
    >
      <div class="d-flex justify-content-end me-3">
        <slot name="header-actions"></slot>
      </div>
      <div
        class="d-flex justify-content-between"
        :data-page-count="ds.dsPagecount"
      >
        <div id="datasetLength" class="col-md-1 py-2">
          <DatasetShow />
        </div>
        <div class="col-md-4 py-2">
          <input
            type="text"
            class="form-control"
            placeholder="Search ..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <hr />
      <div class="table-responsive">
        <table class="table table-striped mb-0">
          <thead>
            <tr>
              <th scope="col" style="width: 50px">ID</th>
              <th
                v-for="(col, index) in columns"
                :key="col.field"
                @click="onSort($event, index)"
                style="cursor: pointer"
              >
                {{ col.name }}
              </th>
            </tr>
          </thead>

          <tbody v-if="loading" key="shimmer-body">
            <tr v-for="n in 5" :key="`shimmer-${n}`">
              <td v-for="i in columns.length + 1" :key="`cell-${i}`">
                <div class="shimmer"></div>
              </td>
            </tr>
          </tbody>

          <tbody
            v-else-if="!loading && (!data || data.length === 0)"
            key="empty-body"
          >
            <tr>
              <td
                :colspan="columns.length + 1"
                class="text-center py-5 text-muted"
              >
                <i class="fa fa-folder-open fs-1 mb-3 opacity-50"></i>
                <p class="mb-0">No records found.</p>
              </td>
            </tr>
          </tbody>

          <DatasetItem
            v-show="!loading && data && data.length > 0"
            tag="tbody"
            class="fs-sm"
            key="dataset-body"
          >
            <template #default="{ row, rowIndex }">
              <tr>
                <th scope="row">{{ rowIndex + 1 }}</th>
                <td v-for="col in columns" :key="col.field">
                  <slot
                    :name="`cell(${col.field})`"
                    :row="row"
                    :index="rowIndex"
                  >
                    {{ row[col.field] }}
                  </slot>
                </td>
              </tr>
            </template>
          </DatasetItem>
        </table>
      </div>
      <div
        class="d-flex flex-md-row flex-column justify-content-between align-items-center"
      >
      <BasePagination 
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :per-page="pagination.perPage"
        :total-items="pagination.totalCount"
        :show-info="true"
        type="numbers"
        @page-change="(page) => emit('page-change', page)"
      />
      </div>
    </Dataset>
  </BaseBlock>
</template>

<style scoped>
.shimmer {
  height: 12px;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  display: inline-block;
  position: relative;
  width: 100%;
  animation: shimmer 1.5s linear infinite forwards;
}

@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
