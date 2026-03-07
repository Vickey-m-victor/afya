<script setup>
import { useTemplateStore } from "@/stores/template";
import { onMounted } from 'vue';

import BaseLayout from "@/layouts/BaseLayout.vue";

// Main store
const store = useTemplateStore();

// Set default elements for this layout
store.setLayout({
  header: true,
  sidebar: true,
  footer: true,
});

onMounted(() => {
  // 1. Keep the main sidebar open so it takes up the 60px mini-width
  store.sidebar({ mode: 'open' }); 
  
  // 2. Set it to 'mini' mode so it starts closed (icons only)
  store.sidebarMini({ mode: 'on' }); 
});

// Set various template options for this layout variation
store.headerStyle({ mode: "light" });
store.mainContent({ mode: "narrow" });
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
