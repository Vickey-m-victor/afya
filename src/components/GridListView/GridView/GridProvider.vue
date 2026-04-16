<!-- manages state and logic -->
<!-- create, provide data and logic -->
<!-- this will shar everything using provide -->
<script setup>
import { provide, reactive, computed, toRefs } from "vue";

// incoming data from parent using props
const props = defineProps({
  data: { type: Array, required: true }, //rows
  columns: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  totalCount: { type: Number, default: 0 },
  perPage: { type: Number, default: 20 },
  currentPage: { type: Number, default: 1 },
  searchPlaceholder: {
    type: String,
    default: "Search...",
  },
});
// defining the actions
const emit = defineEmits(["sort", "filter", "change-page", "action-click"]);

// Local state for UI changes
// does not come from backend.
// column sorted, filter inputs, sort direction
const state = reactive({
  sortBy: "",
  sortDir: "asc",
  filterModel: {},
});

// pagination logic
const totalPages = computed(
  () => Math.ceil(props.totalCount / props.perPage) || 1
);

// The Context Object that children will inject
const gridContext = {
  ...toRefs(props), // this converts props to reactive references so that children react to pdates
  totalPages,

  // Pass state down
  sortBy: computed(() => state.sortBy),
  sortDir: computed(() => state.sortDir),
  filterModel: state.filterModel,

  // Actions

  // toggle asc/desc
  handleSort(attribute) {
    if (state.sortBy === attribute) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    } else {
      state.sortBy = attribute;
      state.sortDir = "asc";
    }
    emit("sort", { by: state.sortBy, dir: state.sortDir });
  },
  handleFilter() {
    emit("filter", state.filterModel);
  },
  changePage(page) {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
      emit("change-page", page);
    }
  },
  // edit / view/ delete buttons
  handleAction(action, row) {
    emit("action-click", { action, row });
  },
};

// Provide/share the context to all child components
provide("gridContext", gridContext);
</script>

<template>
  <slot></slot>
</template>
