<script setup>
import { onMounted, ref } from 'vue';
import { useApi } from '@/helpers/useApi';
import { useAlertStore } from '@/stores/alert';

const props = defineProps({
  log: {
    type: Object,
    required: true,
  },
  onResolved: {
    type: Function,
    default: null,
  },
});

const alertStore = useAlertStore();

const selectedLog = ref({ ...props.log });
const resolving = ref(false);

function levelBadgeClass(level) {
  if (level === 'danger' || level === 'error') return 'bg-danger';
  if (level === 'warning') return 'bg-warning text-dark';
  if (level === 'info') return 'bg-info text-dark';
  return 'bg-secondary';
}

async function fetchDetail() {
  const logId = selectedLog.value?.id;
  if (!logId) return;

  const { data: responseData, request } = useApi(`/admin/logs/error/${logId}`, {
    method: 'GET',
    autoFetch: false,
  });

  try {
    await request();
    const payload = responseData.value?.dataPayload || responseData.value || {};
    const detail = payload?.data || payload;

    if (detail && typeof detail === 'object' && !detail['stack-trace']) {
      selectedLog.value = { ...selectedLog.value, ...detail };
    }
  } catch (_) {
    // Known backend issue can break this endpoint; silently fall back to list data
  }
}

async function handleResolve() {
  if (!selectedLog.value || resolving.value) return;
  if (Number(selectedLog.value.is_resolved) === 1) return;

  resolving.value = true;
  const { request, error } = useApi(`/admin/logs/error/${selectedLog.value.id}`, {
    method: 'POST',
    autoFetch: false,
  });

  await request();
  resolving.value = false;

  if (error.value) {
    alertStore.error('Failed to resolve error log.');
    return;
  }

  alertStore.success('Error log marked as resolved.');
  selectedLog.value = { ...selectedLog.value, is_resolved: 1 };

  if (typeof props.onResolved === 'function') {
    props.onResolved(selectedLog.value.id);
  }
}

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <div v-if="selectedLog" class="pt-2">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
      <div class="d-flex flex-column">
        <h4 class="mb-0" :class="`text-${selectedLog.level}`">
          {{ selectedLog.category || '-' }}
        </h4>
        <div class="text-muted fs-sm mt-1">
          <span class="me-2">#{{ selectedLog.id }}</span>
          <span>{{ selectedLog.log_time || '-' }}</span>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <span
          class="badge fs-sm py-1 px-3 rounded-pill"
          :class="Number(selectedLog.is_resolved) === 1 ? 'bg-success' : 'bg-primary'"
        >
          <i
            :class="
              Number(selectedLog.is_resolved) === 1
                ? 'fa fa-fw fa-check-circle'
                : 'fa fa-fw fa-hourglass-half'
            "
          ></i>
          {{ Number(selectedLog.is_resolved) === 1 ? 'Resolved' : 'Pending' }}
        </span>

        <button
          v-if="Number(selectedLog.is_resolved) !== 1"
          class="btn btn-sm btn-outline-success"
          :disabled="resolving"
          @click="handleResolve"
        >
          <span v-if="resolving" class="spinner-border spinner-border-sm me-1"></span>
          <i v-else class="fa fa-check-circle me-1"></i>
          {{ resolving ? 'Resolving...' : 'Resolve' }}
        </button>
      </div>
    </div>

    <div class="block-content">
      <pre
        v-if="selectedLog.message"
        class="bg-body-light rounded p-3 mb-3"
        style="max-height: 350px; overflow-y: auto;"
      ><code>{{ selectedLog.message }}</code></pre>
      <pre v-else class="bg-body-light rounded p-3 mb-3 text-muted"><code>Error message not available</code></pre>
    </div>

    <div class="alert alert-info d-flex align-items-center mb-0" role="alert">
      <div class="flex-shrink-0">
        <i class="fa fa-fw fa-info-circle"></i>
      </div>
      <div class="flex-grow-1 ms-3">
        <p class="mb-0">
          <strong>Level:</strong>
          <span class="badge ms-1" :class="levelBadgeClass(selectedLog.level)">{{ selectedLog.level || '-' }}</span>
          <span class="mx-2">|</span>
          <strong>Time:</strong> {{ selectedLog.log_time || '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}
code {
  font-size: 0.85rem;
}
</style>
