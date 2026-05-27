<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="doccure-wrapper" >
  <router-view> </router-view>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DoccureAssets from '@/themes/doccure/DoccureAssets.js';

const isLoading = ref(true);

// Define a unique ID for our dynamic style tag
const DOCCURE_CSS_ID = 'doccure-theme-styles';

onMounted(async () => {
  isLoading.value = true;

  // 1. Add the body class
  document.body.classList.add('doccure-theme-active');

  // 2. Dynamically inject the SCSS file
  // In dev mode, Vite handles .scss imports seamlessly via the URL.
  // In production, the build config ensures it's available.
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.id = DOCCURE_CSS_ID;
  // This imports the SCSS file directly through Vite's pipeline
  styleLink.href = new URL('@/themes/doccure/assets/scss/main.scss', import.meta.url).href;
  
  document.head.appendChild(styleLink);

  // 3. Register other assets
  await DoccureAssets.register();
  isLoading.value = false;
});

onUnmounted(() => {
  // 1. Remove the body class
  document.body.classList.remove('doccure-theme-active');
  
  // 2. Remove the injected CSS from the <head>
  const existingStyle = document.getElementById(DOCCURE_CSS_ID);
  if (existingStyle) {
    existingStyle.remove();
  }

  // 3. Cleanup other assets
  DoccureAssets.cleanup();
});
</script>
