<script setup>
import { onMounted, ref } from 'vue';
import { useApi } from '@/helpers/useApi';

const props = defineProps({
  auditId: {
    type: [String, Number],
    required: true,
  },
  summary: {
    type: Object,
    default: null,
  },
});

const selectedLog = ref(props.summary ? { ...props.summary } : { audit_id: props.auditId });
const detailLoading = ref(false);
const activeTab = ref('metadata');

function formatJson(value) {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') {
    const str = JSON.stringify(value, null, 2);
    return str === '{}' || str === '[]' ? '-' : str;
  }
  return String(value);
}

function isEmpty(value) {
  if (value === null || value === undefined || value === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

async function fetchDetail() {
  detailLoading.value = true;

  const { data: responseData, request } = useApi(`/admin/audit/trail/${props.auditId}`, {
    method: 'GET',
    autoFetch: false,
  });

  try {
    await request();
    const payload = responseData.value?.dataPayload || responseData.value || {};
    const detail = payload?.data || payload;
    if (detail && typeof detail === 'object') {
      selectedLog.value = { audit_id: props.auditId, ...detail };
    }
  } finally {
    detailLoading.value = false;
  }
}

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <div v-if="selectedLog">
    <div v-if="detailLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-2 mb-0">Loading details...</p>
    </div>

    <div v-else class="p-0">
      <div class="block row g-0">
        <ul class="nav nav-tabs nav-tabs-block flex-md-column col-md-2 border-end" role="tablist">
          <li class="nav-item d-md-flex flex-md-column" role="presentation">
            <button
              class="nav-link text-md-start"
              :class="{ active: activeTab === 'metadata' }"
              @click="activeTab = 'metadata'"
            >
              Audit Metadata
            </button>
          </li>
          <li class="nav-item d-md-flex flex-md-column" role="presentation">
            <button
              class="nav-link text-md-start"
              :class="{ active: activeTab === 'user' }"
              @click="activeTab = 'user'"
            >
              User Information
            </button>
          </li>
          <li class="nav-item d-md-flex flex-md-column" role="presentation">
            <button
              class="nav-link text-md-start"
              :class="{ active: activeTab === 'request' }"
              @click="activeTab = 'request'"
            >
              Request Context
            </button>
          </li>
          <li class="nav-item d-md-flex flex-md-column" role="presentation">
            <button
              class="nav-link text-md-start"
              :class="{ active: activeTab === 'data' }"
              @click="activeTab = 'data'"
            >
              Data Change
            </button>
          </li>
        </ul>

        <div class="tab-content col-md-10">
          <div class="block-content tab-pane" :class="{ active: activeTab === 'metadata' }">
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 30%;">Audit Time</th>
                  <td>{{ selectedLog.audit_time || '-' }}</td>
                </tr>
                <tr>
                  <th>Operation</th>
                  <td>{{ selectedLog.operation || '-' }}</td>
                </tr>
                <tr>
                  <th>Field Name</th>
                  <td>{{ selectedLog.field_name || '-' }}</td>
                </tr>
                <tr v-if="selectedLog.process_time">
                  <th>Process Time</th>
                  <td>{{ selectedLog.process_time }}</td>
                </tr>
                <tr v-if="selectedLog.memory_used">
                  <th>Memory Used</th>
                  <td>{{ selectedLog.memory_used }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="block-content tab-pane" :class="{ active: activeTab === 'user' }">
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 30%;">User</th>
                  <td>{{ selectedLog.user || 'Anonymous' }}</td>
                </tr>
                <tr>
                  <th>IP Address</th>
                  <td>{{ selectedLog.ip_info?.ip_address || '-' }}</td>
                </tr>
                <tr v-if="selectedLog.user_agent?.browser">
                  <th>Browser</th>
                  <td>
                    {{ selectedLog.user_agent.browser }} - v{{ selectedLog.user_agent.browser_version || '?' }}
                  </td>
                </tr>
                <tr v-if="selectedLog.user_agent?.platform">
                  <th>Platform</th>
                  <td>{{ selectedLog.user_agent.platform }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="block-content tab-pane" :class="{ active: activeTab === 'request' }">
            <template v-if="selectedLog.request_context">
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 30%;">Request Method</th>
                    <td>{{ selectedLog.request_context.request_method || '-' }}</td>
                  </tr>
                  <tr>
                    <th>Route</th>
                    <td>{{ selectedLog.request_context.request_route || '-' }}</td>
                  </tr>
                  <tr>
                    <th>URL</th>
                    <td>
                      <a :href="selectedLog.request_context.url" target="_blank">{{
                        selectedLog.request_context.url || '-'
                      }}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <div v-else class="p-4 text-muted">Request context is not available for this record.</div>
          </div>

          <div class="block-content tab-pane" :class="{ active: activeTab === 'data' }">
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 30%;">Old Value</th>
                  <td class="text-danger">
                    <pre v-if="selectedLog.old_value" class="mb-0">{{ selectedLog.old_value }}</pre>
                    <span v-else>—</span>
                  </td>
                </tr>
                <tr>
                  <th>New Value</th>
                  <td class="text-success">
                    <pre v-if="selectedLog.new_value" class="mb-0">{{ selectedLog.new_value }}</pre>
                    <span v-else>—</span>
                  </td>
                </tr>
                <tr
                  v-if="
                    selectedLog.request_context?.query_params &&
                    !isEmpty(selectedLog.request_context.query_params)
                  "
                >
                  <th>Query Params</th>
                  <td>
                    <pre class="mb-0">{{ formatJson(selectedLog.request_context.query_params) }}</pre>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-break: break-word;
}

.nav-tabs-block .nav-link {
  border-radius: 0;
  padding: 0.75rem 1rem;
}

.nav-tabs-block .nav-link.active {
  background-color: #fff;
  border-color: transparent;
  font-weight: 600;
}

.tab-pane {
  display: none;
  padding: 1rem;
}

.tab-pane.active {
  display: block;
}
</style>
