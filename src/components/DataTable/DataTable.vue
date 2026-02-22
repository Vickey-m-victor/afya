<script setup>
import DataTableHeader from "@/components/DataTable/DataTableHeader.vue";
import DataTableBody from "@/components/DataTable/DataTableBody.vue";
import DataTableFooter from "@/components/DataTable/DataTableFooter.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: String,
    default: "id",
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  searchQuery: {
    type: String,
    default: "",
  },
  searchPlaceholder: {
    type: String,
    default: "Search...",
  },
  showCreate: {
    type: Boolean,
    default: true,
  },
  createLabel: {
    type: String,
    default: "New",
  },
  actions: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    default: null,
  },
  paginated: {
    type: Boolean,
    default: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 20,
  },
  perPageOptions: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  emptyText: {
    type: String,
    default: "No data found",
  },
  sortBy: {
    type: String,
    default: "",
  },
  sortDir: {
    type: String,
    default: "asc",
  },
});

const emit = defineEmits([
  "create",
  "view",
  "edit",
  "delete",
  "search",
  "change-page",
  "change-per-page",
  "change-sort",
]);
</script>

<template>
  <BaseBlock :title="title" content-full>
    <DataTableHeader
      :title="title"
      :searchable="searchable"
      :search-query="searchQuery"
      :search-placeholder="searchPlaceholder"
      :show-create="showCreate"
      :create-label="createLabel"
      :total-count="totalCount"
      @search="emit('search', $event)"
      @create="emit('create')"
    >
      <template #toolbar>
        <slot name="toolbar" />
      </template>
    </DataTableHeader>

    <DataTableBody
      :columns="columns"
      :data="data"
      :loading="loading"
      :row-key="rowKey"
      :actions="actions"
      :empty-text="emptyText"
      :sort-by="sortBy"
      :sort-dir="sortDir"
      @view="emit('view', $event)"
      @edit="emit('edit', $event)"
      @delete="emit('delete', $event)"
      @change-sort="emit('change-sort', $event)"
    >
      <template #loading>
        <slot name="loading" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>

      <template
        v-for="column in columns"
        :key="column.field"
        #[`cell-${column.field}`]="slotProps"
      >
        <slot :name="`cell-${column.field}`" v-bind="slotProps">
          {{ slotProps.value }}
        </slot>
      </template>
    </DataTableBody>

    <DataTableFooter
      :paginated="paginated"
      :current-page="currentPage"
      :total-pages="totalPages"
      :per-page="perPage"
      :per-page-options="perPageOptions"
      :total-count="totalCount"
      @change-page="emit('change-page', $event)"
      @change-per-page="emit('change-per-page', $event)"
    />
  </BaseBlock>
</template>
