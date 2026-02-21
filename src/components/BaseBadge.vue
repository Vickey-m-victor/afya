<script setup>
const props = defineProps({
  label: String,

  variant: {
    type: String,
    default: "primary",
  },

  pill: {
    type: Boolean,
    default: false,
  },
  
  dot: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <span
    class="badge"
    :class="[
      `bg-${variant}`,
      pill ? 'rounded-pill' : ''
    ]"
  >
    <span v-if="dot" class="badge-dot me-1"></span>
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped>
.badge-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  vertical-align: middle;
}
</style>