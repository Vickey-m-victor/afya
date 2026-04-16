<!-- sorting, filtering -->
<script setup>
import { inject, computed } from 'vue';

// Grab data and methods from the Provider
const grid = inject('gridContext');

const columns = grid.columns;
const sortBy = grid.sortBy;
const sortDir = grid.sortDir;
const filterModel = grid.filterModel;
const handleSort = grid.handleSort;
const handleFilter = grid.handleFilter;
const hasFilters = computed(() => columns.value.some(col => col.filter));
</script>

<template>
  <thead>
    <tr>
      <th
        v-for="(col, index) in columns"
        :key="'th-' + index"
        :class="col.headerClass"
        :style="{ width: col.width, cursor: (col.sortable !== false && col.attribute) ? 'pointer' : 'default' }"
        @click="col.sortable !== false && col.attribute ? handleSort(col.attribute) : null"
      >
        <div class="d-flex align-items-center justify-content-between gap-2">
          <span>{{ col.label || col.attribute }}</span>
          <!-- icon change based on state -->
          <i v-if="col.sortable !== false && col.attribute" 
             :class="[
               'fa', 
               sortBy === col.attribute ? (sortDir === 'desc' ? 'fa-sort-down' : 'fa-sort-up') : 'fa-sort text-muted'
             ]">
          </i>
        </div>
      </th>
    </tr>
<!-- v-if has filters will allow each column cn optionally show filter input -->
    <tr v-if="hasFilters" class="bg-body-light">
      <td v-for="(col, index) in columns" :key="'filter-' + index" class="py-2">
        <input 
          v-if="col.filter"
          type="text" 
          class="form-control form-control-sm"
          v-model="filterModel[col.attribute]"
          placeholder="Filter..."
          @keyup.enter="handleFilter"
          @blur="handleFilter"
        />
      </td>
    </tr>
  </thead>
</template>