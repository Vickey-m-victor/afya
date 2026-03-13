<script setup>
import { ref, watch } from "vue";
// 💡 Notice we completely removed "vue-dataset" imports!
import BasePagination from "@/components/BasePagination.vue";

const props = defineProps({
  data: { type: Array, required: true, default: () => [] },
  columns: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  title: { type: String, default: "" },
  pagination: {
    type: Object,
    default: () => ({ currentPage: 1, totalPages: 1, perPage: 25, totalCount: 0 })
  },
  showIndex: { type: Boolean, default: true }
});

const emit = defineEmits(["search", "page-change", "size-change"]);

const searchQuery = ref("");
let debounceTimer = null;

// Search Logic
watch(searchQuery, (newValue) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => emit("search", newValue), 500);
});

// Entries per page Logic
const selectedSize = ref(props.pagination.perPage || 25);
const changeSize = () => emit("size-change", selectedSize.value);

// Allows fields like "profile.email_address" to render properly without crashing
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
</script>

<template>
  <BaseBlock content-full>
    <div class="d-flex justify-content-end mb-3">
      <slot name="header-actions"></slot>
    </div>

    <div class="d-flex justify-content-between mb-3">
      <div class="col-md-2">
        <select class="form-select" v-model="selectedSize" @change="changeSize">
          <option :value="10">10 </option>
          <option :value="25">25 </option>
          <option :value="50">50 </option>
          <option :value="100">100 </option>
        </select>
      </div>
      <div class="col-md-4">
        <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery" />
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped mb-0">
        <thead>
          <tr>
            <th v-if="showIndex" style="width: 50px">#</th>
            <th v-for="(col, index) in columns" :key="col.field">{{ col.name }}</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr v-for="n in 5" :key="`shimmer-${n}`">
            <td v-for="i in columns.length + 1" :key="`cell-${i}`"><div class="shimmer"></div></td>
          </tr>
        </tbody>

        <tbody v-else-if="!data || data.length === 0">
          <tr>
            <td :colspan="columns.length + 1" class="text-center py-5 text-muted">No records found.</td>
          </tr>
        </tbody>

        <tbody v-else class="fs-sm">
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <th scope="row">{{ (pagination.currentPage - 1) * pagination.perPage + rowIndex + 1 }}</th>
            <td v-for="col in columns" :key="col.field">
              <slot :name="`cell(${col.field})`" :row="row" :index="rowIndex">
                {{ getNestedValue(row, col.field) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BasePagination 
      :current-page="pagination.currentPage"
      :total-pages="pagination.totalPages"
      :per-page="pagination.perPage"
      :total-items="pagination.totalCount"
      @page-change="(page) => emit('page-change', page)"
    />
  </BaseBlock>
</template>

<style scoped>
.shimmer { height: 12px; background: #f6f7f8; background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%); background-repeat: no-repeat; background-size: 800px 100%; display: inline-block; position: relative; width: 100%; animation: shimmer 1.5s linear infinite forwards; }
@keyframes shimmer { 0% { background-position: -468px 0; } 100% { background-position: 468px 0; } }
</style>