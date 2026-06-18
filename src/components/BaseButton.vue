<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "lg",
  },
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: String,
    default: 'button' // can be submit, button
  },
  label: String,
});

const emit = defineEmits(["refresh", "save", "ok", "update", "click"]);

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <button
    :type="type"
    @click="$emit('click')"
    class="btn"
    :class="[
      `btn-${variant}`,
      size ? `btn-${size}` : ''
    ]"
    v-click-ripple
  >
    <slot name="icon"></slot>
    {{ label }}
    <slot></slot>
  </button>
</template>
