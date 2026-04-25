<script setup>
defineProps({
  priority: { type: Number, required: true },
});

const label = (p) => {
  switch (p) {
    case 3:
      return { text: "Emergency", cls: "bg-danger-subtle text-danger-emphasis" };
    case 2:
      return { text: "Urgent", cls: "bg-warning-subtle text-warning-emphasis" };
    case 1:
    default:
      return { text: "Normal", cls: "bg-light text-muted" };
  }
};
</script>

<template>
  <span class="badge" :class="label(priority).cls">{{ label(priority).text }}</span>
</template>

