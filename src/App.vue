<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { layouts } from "@/layouts/layouts.js";
import GlobalModal from "@/components/GlobalModal.vue";
import GlobalOffcanvas from "@/components/GlobalOffcanvas.vue";

const route = useRoute();

const layoutComponent = computed(() => {
  const layoutName = route.meta?.layout;
  return layouts[layoutName] || layouts.LayoutSimple || null;
});
</script>

<template>
  <component :is="layoutComponent" v-if="layoutComponent" />
  <RouterView v-else />
  
  <!-- Global modal container -->
  <GlobalModal />
  <!-- Global offcanvas container -->
  <GlobalOffcanvas />
</template>

<style lang="scss">
// Main Stylesheet
@import "@/assets/scss/main";

// All color themes are included and available by default
// Feel free to comment out any of them if you won't use them in your project
@import "@/assets/scss/oneui/themes/amethyst";
@import "@/assets/scss/oneui/themes/city";
@import "@/assets/scss/oneui/themes/flat";
@import "@/assets/scss/oneui/themes/modern";
@import "@/assets/scss/oneui/themes/smooth";
</style>
