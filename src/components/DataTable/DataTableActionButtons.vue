<script setup>
import { computed } from 'vue';

const props = defineProps({
  actions: {
    type: Array,
    default: () => ["view", "edit", "delete"],
  },
  actionIcons: {
    type: Object,
    default: () => ({}),
  },
  actionLabels: {
    type: Object,
    default: () => ({}),
  },
  row: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "manage",
  "view",
  "edit",
  "delete",
  "toggleStatus",
  "ban",
  "manageGroups",
  "restore",
]);

const defaultConfig = {
  view: { icon: "fa fa-eye", color: "text-primary", label: "View" },
  edit: { icon: "fa fa-pencil", color: "text-success", label: "Edit" },
  delete: { icon: "fa fa-trash", color: "text-danger", label: "Delete" },
  restore: { icon: "fa fa-trash-restore", color: "text-warning", label: "Restore" },
  manage: { icon: "fa fa-wrench", color: "text-info", label: "Manage" },
  manageGroups: { icon: "fa fa-users", color: "text-info", label: "Groups" },
  toggleStatus: { icon: "fa fa-toggle-on", color: "text-warning", label: "Toggle Status" },
  ban: { icon: "fa fa-ban", color: "text-danger", label: "Ban" },
};

const isDeleted = computed(() => props.row.is_deleted === 1);

const filteredActions = computed(() => {
  const acts = [...props.actions];
  const deleteIndex = acts.indexOf('delete');
  const restoreIndex = acts.indexOf('restore');
  
  if (isDeleted.value) {
    if (deleteIndex > -1 && restoreIndex === -1) {
      acts[deleteIndex] = 'restore';
    }
  } else {
    if (restoreIndex > -1) {
      acts.splice(restoreIndex, 1);
    }
  }
  
  return acts;
});

function getIcon(action, actionIcons) {
  if (action === 'restore' && isDeleted.value) {
    return actionIcons.restore || defaultConfig.restore?.icon || "fa fa-trash-restore";
  }
  if (action === 'delete' && isDeleted.value) {
    return actionIcons.restore || defaultConfig.restore?.icon || "fa fa-trash-restore";
  }
  return actionIcons[action] || defaultConfig[action]?.icon || "fa fa-cog";
}

function getColor(action) {
  if ((action === 'restore' || action === 'delete') && isDeleted.value) {
    return defaultConfig.restore?.color || "text-warning";
  }
  return defaultConfig[action]?.color || "text-secondary";
}

function getLabel(action, actionLabels) {
  if ((action === 'restore' || action === 'delete') && isDeleted.value) {
    return actionLabels.restore || defaultConfig.restore?.label || "Restore";
  }
  return actionLabels[action] || defaultConfig[action]?.label || action;
}

function handleClick(action, row) {
  if ((action === 'delete' || action === 'restore') && isDeleted.value) {
    emit('delete', row);
  } else {
    emit(action, row);
  }
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center gap-2">
    <template v-for="action in filteredActions" :key="action">
      <i
        :class="[getIcon(action, actionIcons), 'action-icon', getColor(action)]"
        @click="handleClick(action, row)"
        :title="getLabel(action, actionLabels)"
      ></i>
    </template>
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
