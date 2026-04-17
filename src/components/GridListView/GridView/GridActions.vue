<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  row: { type: Object, required: true },
  actions: { type: Array, default: () => ['view', 'edit', 'delete'] }
});

// Inject the provider so we can trigger the actions directly!
const grid = inject('gridContext');

const actionConfig = {
  view: { icon: "fa fa-eye", color: "text-primary", label: "View" },
  edit: { icon: "fa fa-pencil", color: "text-success", label: "Edit" },
  delete: { icon: "fa fa-trash", color: "text-danger", label: "Delete" },
  restore: { icon: "fa fa-rotate-left", color: "text-secondary", label: "Restore" },
  manageGroups: { icon: "fa fa-users", color: "text-info", label: "Groups" },
  ban: { icon: "fa fa-ban", color: "text-danger", label: "Ban" }
};

const isDeleted = computed(() => props.row.is_deleted === 1 || props.row.is_deleted === true);

// The logic to swap Delete for Restore
const filteredActions = computed(() => {
  const acts = [...props.actions];
  const deleteIndex = acts.indexOf("delete");
  const restoreIndex = acts.indexOf("restore");

  if (isDeleted.value) {
    if (deleteIndex > -1 && restoreIndex === -1) {
      acts[deleteIndex] = "restore";
    }
  } else {
    if (restoreIndex > -1) {
      acts.splice(restoreIndex, 1);
    }
  }
  return acts;
});

function handleClick(action) {
  // Call the provider's action handler directly
  grid.handleAction(action, props.row);
}
</script>

<template>
  <div class="d-flex justify-content-center gap-2">
    <i v-for="action in filteredActions" 
       :key="action"
       class="action-icon"
       :class="[actionConfig[action]?.icon, actionConfig[action]?.color]"
       :title="actionConfig[action]?.label || action"
       @click="handleClick(action)"
    ></i>
  </div>
</template>

<style scoped>
.action-icon {
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.action-icon:hover {
  transform: scale(1.2);
}
</style>