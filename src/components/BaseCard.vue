<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  subtitle: {
    type: String,
    default: "",
  },

  shadow: {
    type: Boolean,
    default: true,
  },

  hover: {
    type: Boolean,
    default: false,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  bodyClass: {
    type: String,
    default: "",
  },

  headerClass: {
    type: String,
    default: "",
  },

  footerClass: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="card"
    :class="[
      shadow ? 'shadow-sm' : '',
      hover ? 'card-hover' : ''
    ]"
  >
    <!-- ✅ Header -->
    <div
      v-if="$slots.header || title"
      class="card-header d-flex justify-content-between align-items-center"
      :class="headerClass"
    >
      <div>
        <slot name="header">
          <h5 class="card-title mb-0">{{ title }}</h5>
          <small v-if="subtitle" class="text-muted">
            {{ subtitle }}
          </small>
        </slot>
      </div>

      <!-- header actions -->
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- ✅ Body -->
    <div class="card-body position-relative" :class="bodyClass">
      <!-- Loading overlay -->
      <div
        v-if="loading"
        class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
        style="z-index: 5"
      >
        <div class="spinner-border text-primary"></div>
      </div>

      <slot />
    </div>

    <!-- ✅ Footer -->
    <div
      v-if="$slots.footer"
      class="card-footer"
      :class="footerClass"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card-hover {
  transition: all 0.18s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
}
</style>