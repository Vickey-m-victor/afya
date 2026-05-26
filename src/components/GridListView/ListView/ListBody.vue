<!-- card layout -->
<script setup>
import { inject } from "vue";
import GridActions from "../GridView/GridActions.vue"; // <-- Import the new component
// inject
const grid = inject("gridContext");

const data = grid.data;
const loading = grid.loading;
</script>

<template>
  <div class="list-body-container p-3">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="!data.length" class="text-center text-muted py-4">
      No records found.
    </div>

    <div v-else class="row g-4">
      <div v-for="row in data" :key="row.id" class="col-sm-6 col-xl-4">
        <!-- parent can customize card layout -->
        <slot name="card" :row="row">
          <div class="block block-rounded block-bordered h-100 mb-0">
            <div class="block-content">
              <pre class="fs-sm">{{ row }}</pre>
            </div>
            <div class="block-content block-content-full bg-body-light mt-auto">
              <GridActions :row="row" :actions="['view', 'edit', 'delete']" />
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
