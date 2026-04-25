<script setup>
import QueueItemCard from "./QueueItemCard.vue";

defineProps({
  items: { type: Array, default: () => [] },
  emptyText: { type: String, default: "No items." },
});
</script>

<template>
  <div v-if="items?.length">
    <QueueItemCard v-for="it in items" :key="it.queue_id" :item="it">
      <template #details>
        <div class="mt-2 text-muted fs-sm" v-if="it.chief_complaint">
          <span class="fw-semibold">Complaint:</span> {{ it.chief_complaint }}
        </div>
      </template>
      <template #actions>
        <div class="mt-3">
          <slot name="actions" :item="it" />
        </div>
      </template>
    </QueueItemCard>
  </div>
  <div v-else class="text-muted text-center py-4">
    {{ emptyText }}
  </div>
</template>

