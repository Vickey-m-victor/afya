<!--  this will render actual table rows, empty , loading states -->
<script setup>
import { inject } from 'vue';
import GridActions from './GridActions.vue'; // Import the component
// Now it has access to everything from provider.
const grid = inject('gridContext');

const data = grid.data;
const columns = grid.columns;
const loading = grid.loading;
const currentPage = grid.currentPage;
const perPage = grid.perPage;


function resolveAttribute(row, attribute) {
  if (!attribute) return null;
  return attribute.split('.').reduce((o, i) => (o ? o[i] : null), row);
}

</script>

<template>
  <tbody>
    <tr v-if="loading">
      <td :colspan="columns.length" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </td>
    </tr>

    <tr v-else-if="!data.length">
      <td :colspan="columns.length" class="text-center text-muted py-4">
        No records found.
      </td>
    </tr>

    <tr v-else v-for="(row, rowIndex) in data" :key="row.id || rowIndex">
      <td v-for="(col, colIndex) in columns" :key="'td-' + colIndex" :class="col.contentClass">
        
        <slot :name="`cell-${col.attribute}`" :row="row">
          
          <template v-if="col.class === 'SerialColumn'">
            <span class="text-muted fw-semibold">{{ ((currentPage - 1) * perPage) + rowIndex + 1 }}</span>
          </template>

          <template v-else-if="col.class === 'ActionColumn'">
            <GridActions :row="row" :actions="col.actions" />
          </template>

          <span v-else-if="col.value" v-html="col.value(row)"></span>
          
          <template v-else>{{ resolveAttribute(row, col.attribute) }}</template>
        </slot>

      </td>
    </tr>
  </tbody>
</template>