<template>
  <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <router-view v-else></router-view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DoccureAssets from '@/themes/doccure/DoccureAssets.js';

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  await DoccureAssets.register();
  isLoading.value = false;
});

onUnmounted(() => {
  DoccureAssets.cleanup();
});
</script>

<style scoped>
/* Any layout specific overrides that don't belong in global Doccure styles */
</style>
