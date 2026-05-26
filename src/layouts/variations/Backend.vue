<script setup>
import { useTemplateStore } from "@/stores/template";

import BaseLayout from "@/layouts/BaseLayout.vue";

// Main store
const store = useTemplateStore();

// Set default elements for this layout
store.setLayout({
  header: true,
  sidebar: true,
  footer: true,
});

// Ensure sidebar is fully open (not mini) on load
store.sidebar({ mode: 'open' });
store.sidebarMini({ mode: 'off' });

// Set various template options for this layout variation
store.headerStyle({ mode: "light" });
store.mainContent({ mode: "narrow" });
</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
