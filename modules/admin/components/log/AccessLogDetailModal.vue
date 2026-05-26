<script setup>
import { onMounted, ref } from 'vue';
import { useApi } from '@/helpers/useApi';

const props = defineProps({
  accessId: {
    type: [String, Number],
    required: true,
  },
  summary: {
    type: Object,
    default: null,
  },
});

const selectedLog = ref(props.summary ? { ...props.summary } : { access_id: props.accessId });

function accessAgent(row) {
  const platform = row?.user_agent?.platform;
  const browser = row?.user_agent?.browser;
  const browserVersion = row?.user_agent?.browser_version;

  if (!platform && !browser && !browserVersion) return '-';
  const browserLabel = browserVersion ? `${browser || ''} ${browserVersion}`.trim() : browser || '-';
  return `${platform || '-'} / ${browserLabel}`;
}

async function fetchDetail() {
  const { data: responseData, request } = useApi(`/admin/logs/access/${props.accessId}`, {
    method: 'GET',
    autoFetch: false,
  });

  try {
    await request();
    const payload = responseData.value?.dataPayload || responseData.value || {};
    const detail = payload?.data || payload;
    if (detail && typeof detail === 'object') {
      selectedLog.value = { ...selectedLog.value, ...detail };
    }
  } catch (_) {
    // Fall back to summary
  }
}

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <div v-if="selectedLog">
    <dl class="row mb-0">
      <dt class="col-sm-3">ID</dt>
      <dd class="col-sm-9">{{ selectedLog.access_id }}</dd>

      <dt class="col-sm-3">User</dt>
      <dd class="col-sm-9">{{ selectedLog.user || '-' }}</dd>

      <dt class="col-sm-3">Description</dt>
      <dd class="col-sm-9">{{ selectedLog.description || '-' }}</dd>

      <dt class="col-sm-3">IP Address</dt>
      <dd class="col-sm-9"><code>{{ selectedLog?.ip_info?.ip_address || '-' }}</code></dd>

      <dt class="col-sm-3">IP Info</dt>
      <dd class="col-sm-9">{{ selectedLog?.ip_info?.message || '-' }}</dd>

      <dt class="col-sm-3">User Agent</dt>
      <dd class="col-sm-9">{{ accessAgent(selectedLog) }}</dd>

      <dt class="col-sm-3">Access Time</dt>
      <dd class="col-sm-9">{{ selectedLog.access_time || '-' }}</dd>
    </dl>
  </div>
</template>
