<script setup>
defineProps({
  status: { type: Number, required: true },
});

const label = (s) => {
  switch (s) {
    case 10:
      return { text: "Waiting", cls: "bg-warning-subtle text-warning-emphasis" };
    case 20:
      return { text: "Called", cls: "bg-info-subtle text-info-emphasis" };
    case 30:
      return { text: "In service", cls: "bg-primary-subtle text-primary-emphasis" };
    case 40:
      return { text: "Completed", cls: "bg-success-subtle text-success-emphasis" };
    case 50:
      return { text: "Skipped", cls: "bg-secondary-subtle text-secondary-emphasis" };
    default:
      return { text: `Status ${s}`, cls: "bg-light text-muted" };
  }
};
</script>

<template>
  <span class="badge" :class="label(status).cls">{{ label(status).text }}</span>
</template>

