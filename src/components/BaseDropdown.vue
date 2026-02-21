<script setup>
import { computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },

  label: {
    type: String,
    default: "Actions",
  },

  variant: {
    type: String,
    default: "btn-alt-secondary",
  },

  size: {
    type: String,
    default: "btn-sm",
  },

  align: {
    type: String,
    default: "end", // start | end | center
  },

  menuClass: {
    type: String,
    default: "fs-sm",
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["select"]);

const alignmentClass = computed(() => {
  if (props.align === "start") return "dropdown-menu-start";
  if (props.align === "center") return "dropdown-menu-center";
  return "dropdown-menu-end";
});

const wrapperClass = computed(() => {
  if (props.align === "center") return "dropdown-center";
  return "dropdown";
});

function handleClick(item) {
  if (item.disabled) return;
  emit("select", item);
}
</script>

<template>
  <div :class="wrapperClass">
    <!-- Trigger -->
    <button
      class="btn dropdown-toggle"
      :class="[variant, size]"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      :disabled="disabled"
    >
      <slot name="trigger">
        {{ label }}
      </slot>
    </button>

    <!-- Menu -->
    <div class="dropdown-menu" :class="[alignmentClass, menuClass]">
      <!-- ✅ Auto items mode -->
      <template v-if="items.length">
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.divider" class="dropdown-divider"></div>
          <RouterLink
            v-if="item.to"
            :to="item.to"
            class="dropdown-item d-flex align-items-center"
          >
            <i v-if="item.icon" :class="item.icon + ' me-2'"></i>
            {{ item.label }}
          </RouterLink>
          <button
            v-else
            type="button"
            class="dropdown-item d-flex align-items-center"
            :class="{ disabled: item.disabled }"
            @click="handleClick(item)"
          >
            <i v-if="item.icon" :class="item.icon + ' me-2'"></i>
            {{ item.label }}
          </button>
        </template>
      </template>

      <!-- ✅ Rich content mode (VERY IMPORTANT) -->
      <slot v-else />
    </div>
  </div>
</template>
