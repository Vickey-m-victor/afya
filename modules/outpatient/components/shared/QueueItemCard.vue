<script setup>
import QueueStatusBadge from "./QueueStatusBadge.vue";
import PriorityBadge from "./PriorityBadge.vue";

defineProps({
  item: { type: Object, required: true },
  title: { type: String, default: "" },
});
</script>

<template>
  <div class="block block-bordered mb-2">
    <div class="block-content">
      <div class="d-flex align-items-start justify-content-between gap-2">
        <div>
          <div class="fw-semibold">
            {{ title || item.patient_name || item.token_number || `Queue #${item.queue_id}` }}
          </div>
          <div class="text-muted fs-sm">
            Token: <span class="fw-semibold">{{ item.token_number || "-" }}</span>
            <span class="mx-2">|</span>
            Queue: <span class="fw-semibold">{{ item.queue_number || "-" }}</span>
          </div>
        </div>
        <div class="d-flex gap-2 flex-wrap justify-content-end">
          <PriorityBadge v-if="item.priority != null" :priority="item.priority" />
          <QueueStatusBadge v-if="item.status != null" :status="item.status" />
        </div>
      </div>

      <slot name="details" />
      <slot name="actions" />
    </div>
  </div>
</template>

