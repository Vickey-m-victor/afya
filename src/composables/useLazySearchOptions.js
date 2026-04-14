import { computed, ref } from 'vue';
import { useApi } from '@/helpers/useApi';

const cache = new Map();
const inflight = new Map();

function stableKey(endpoint, params) {
  const p = params ? JSON.stringify(params) : '';
  return `${endpoint}::${p}`;
}

function inferValueKey(item) {
  if (!item || typeof item !== 'object') return 'id';
  if ('id' in item) return 'id';
  const keys = Object.keys(item);
  const idLike = keys.find((k) => k.endsWith('_id'));
  return idLike || keys[0] || 'id';
}

function inferLabelKey(item) {
  if (!item || typeof item !== 'object') return 'name';
  const preferred = [
    'name',
    'text',
    'title',
    'label',
    'group_name',
    'title_name',
    'relationship_name',
    'education_level_name',
    'department_name',
    'facility_name',
    'employment_type_name',
    'employment_status_name',
    'residential_status_name',
    'shift_name',
    'work_shift_name',
    'union_name',
    'worker_union_name',
  ];
  for (const k of preferred) {
    if (k in item) return k;
  }
  const keys = Object.keys(item);
  const nameLike = keys.find((k) => k.endsWith('_name'));
  if (nameLike) return nameLike;
  const firstString = keys.find((k) => typeof item[k] === 'string' && String(item[k]).trim().length > 0);
  return firstString || 'name';
}

function normalizeItems(items, valueKey, labelKey, valueFn, labelFn) {
  const list = Array.isArray(items) ? items : Object.values(items || {});
  if (list.length === 0) return [];
  const vKey = valueKey || inferValueKey(list[0]);
  const lKey = labelKey || inferLabelKey(list[0]);

  return list.map((raw) => ({
    value: typeof valueFn === 'function' ? valueFn(raw) : raw?.[vKey],
    label: typeof labelFn === 'function'
      ? labelFn(raw)
      : (raw?.[lKey] ?? raw?.name ?? raw?.text ?? String(raw?.[vKey] ?? '')),
    raw,
  }));
}

/**
 * Lazy-load options from a standard `/search` endpoint.
 * Assumes response shape: { dataPayload: { data: [...] } }
 *
 * IMPORTANT: uses `autoAlert: false` to prevent backend alertify payloads from spamming UI.
 */
export function useLazySearchOptions(endpoint, {
  params = null,
  valueKey = null,
  labelKey = null,
  valueFn = null,
  labelFn = null,
  cacheTtlMs = 10 * 60 * 1000, // 10 minutes
} = {}) {
  const key = computed(() => stableKey(endpoint, params));
  const options = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const loadedAt = ref(null);

  const isStale = () => {
    if (!loadedAt.value) return true;
    return Date.now() - loadedAt.value > cacheTtlMs;
  };

  const load = async (force = false) => {
    if (!endpoint) return;
    if (!force && !isStale() && options.value.length) return;

    const cached = cache.get(key.value);
    if (!force && cached && Date.now() - cached.loadedAt <= cacheTtlMs) {
      options.value = cached.options;
      loadedAt.value = cached.loadedAt;
      error.value = null;
      return;
    }

    if (inflight.has(key.value)) {
      return await inflight.get(key.value);
    }

    loading.value = true;
    error.value = null;

    const task = (async () => {
      try {
        const { data, request, error: apiError } = useApi(endpoint, {
          method: 'GET',
          autoFetch: false,
          autoAlert: false,
        });
        await request(null, params || {});
        if (apiError.value) {
          error.value = apiError.value;
          return;
        }

        const items = data.value?.dataPayload?.data ?? data.value?.data ?? [];
        const normalized = normalizeItems(items, valueKey, labelKey, valueFn, labelFn);
        options.value = normalized;
        loadedAt.value = Date.now();
        cache.set(key.value, { options: normalized, loadedAt: loadedAt.value });
      } finally {
        loading.value = false;
        inflight.delete(key.value);
      }
    })();

    inflight.set(key.value, task);
    return await task;
  };

  const clear = () => {
    cache.delete(key.value);
    options.value = [];
    loadedAt.value = null;
    error.value = null;
  };

  return {
    options,
    loading,
    error,
    load,
    clear,
    loadedAt,
  };
}

