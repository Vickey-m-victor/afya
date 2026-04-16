<!-- the layout of the table -->
<script setup>
defineProps({
  tableClass: { 
    type: String, 
    default: "table table-bordered table-striped table-vcenter table-hover mb-0" 
  }
});
</script>

<template>
  <div class="table-responsive">
    <table :class="tableClass">
      <slot></slot>
    </table>
  </div>
</template>