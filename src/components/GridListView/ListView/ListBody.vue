<!-- card layout -->
<script setup>
import { inject } from 'vue';

// inject
const grid = inject('gridContext');

const data = grid.data;
const loading = grid.loading;
const handleAction = grid.handleAction;

// Default Action Icons
const actionConfig = {
  view: { icon: "fa fa-eye", color: "text-primary" },
  edit: { icon: "fa fa-pencil", color: "text-success" },
  delete: { icon: "fa fa-trash", color: "text-danger" }
};
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
              <div class="d-flex justify-content-end gap-2">
                <i v-for="action in ['view', 'edit', 'delete']" 
                   :key="action"
                   class="action-icon"
                   :class="[actionConfig[action]?.icon, actionConfig[action]?.color]"
                   style="cursor: pointer;"
                   @click="handleAction(action, row)"
                ></i>
              </div>
            </div>
          </div>
        </slot>
        
      </div>
    </div>

  </div>
</template>