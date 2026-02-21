<script setup>
defineProps({
  actions: {
    type: Array,
    default: () => ["view", "edit", "delete"],
  },
  row: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["view", "edit", "delete"]);
</script>

<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <i
      v-if="actions.includes('view')"
      class="fa fa-eye action-icon text-primary"
      @click="emit('view', row)"
      title="View"
    ></i>

    <i
      v-if="actions.includes('edit')"
      class="fa fa-pencil action-icon text-success"
      @click="emit('edit', row)"
      title="Edit"
    ></i>

    <i
      v-if="actions.includes('delete')"
      class="fa fa-trash action-icon text-danger"
      @click="emit('delete', row)"
      title="Delete"
    ></i>
  </div>
</template>

<style scoped>
.action-icon {
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.action-icon:hover {
  transform: scale(1.2);
}
</style>
