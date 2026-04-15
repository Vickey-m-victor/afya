<!-- The logic & state engine -->

<script setup>
import { provide, reactive, computed, toRefs } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  totalCount: { type: Number, default: 0 },
  perPage: { type: Number, default: 20 },
  currentPage: { type: Number, default: 1 },
});

const emit = defineEmits(['sort', 'filter', 'change-page', 'action-click']);

// Local state for UI changes
const state = reactive({
  sortBy: '',
  sortDir: 'asc',
  filterModel: {}
});

const totalPages = computed(() => Math.ceil(props.totalCount / props.perPage) || 1);

// The Context Object that children will inject
const gridContext = {
  // Pass props down reactively
  ...toRefs(props),
  totalPages,
  
  // Pass state down
  sortBy: computed(() => state.sortBy),
  sortDir: computed(() => state.sortDir),
  filterModel: state.filterModel,

  // Actions
  handleSort(attribute) {
    if (state.sortBy === attribute) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortBy = attribute;
      state.sortDir = 'asc';
    }
    emit('sort', { by: state.sortBy, dir: state.sortDir });
  },
  handleFilter() {
    emit('filter', state.filterModel);
  },
  changePage(page) {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
      emit('change-page', page);
    }
  },
  handleAction(action, row) {
    emit('action-click', { action, row });
  }
};

// Provide the context to all child components
provide('gridContext', gridContext);
</script>

<template>
  <slot></slot>
</template>