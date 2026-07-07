<script setup>
import { useSlots } from "vue";
import DataTable from "./DataTable/DataTable.vue";

const props = defineProps({
  title: { type: String, default: "" },
  data: { type: Array, default: () => [] },
  columns: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  pagination: { type: Object, default: () => ({}) }
});

const emit = defineEmits(["search", "page-change", "size-change"]);

const slots = useSlots();

function getSlotName(field) {
  if (slots[`cell(${field})`]) {
    return `cell(${field})`;
  }
  if (slots[`cell-${field}`]) {
    return `cell-${field}`;
  }
  return null;
}
</script>

<template>
  <DataTable
    :title="title"
    :data="data"
    :columns="columns"
    :loading="loading"
    :total-count="pagination?.total || 0"
    :current-page="pagination?.currentPage || 1"
    :total-pages="pagination?.lastPage || 1"
    :per-page="pagination?.perPage || 20"
    @search="emit('search', $event)"
    @change-page="emit('page-change', $event)"
    @change-per-page="emit('size-change', $event)"
  >
    <template #toolbar>
      <slot name="header-actions" />
    </template>

    <template
      v-for="col in columns"
      :key="col.field"
      #[`cell-${col.field}`]="slotProps"
    >
      <slot
        v-if="getSlotName(col.field)"
        :name="getSlotName(col.field)"
        v-bind="slotProps"
      />
      <template v-else-if="slotProps.value && typeof slotProps.value === 'object' && slotProps.value.label">
        <span :class="`badge bg-${slotProps.value.theme || 'secondary'}`">{{ slotProps.value.label }}</span>
      </template>
      <template v-else>{{ slotProps.value }}</template>
    </template>
  </DataTable>
</template>
