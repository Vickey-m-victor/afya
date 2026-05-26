import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useTriageService } from "../services/triageService";
import { unwrapData } from "../services/models";

export const useTriageQueueStore = defineStore("triageQueue", () => {
  const items = ref([]);
  const total = ref(0);
  const isLoading = ref(false);
  const error = ref(null);
  const lastFetchedAt = ref(null);

  const waiting = computed(() => items.value.filter((i) => i.status === 10));
  const called = computed(() => items.value.filter((i) => i.status === 20));
  const inService = computed(() => items.value.filter((i) => i.status === 30));

  async function fetchQueue({ facility_id }) {
    isLoading.value = true;
    error.value = null;
    try {
      const api = useTriageService();
      const res = await api.getQueue({ facility_id });
      if (res.error?.value) throw res.error.value;

      const payload = unwrapData(res.data?.value);
      items.value = payload?.items ?? payload?.data ?? [];
      total.value = payload?.total ?? items.value.length;
      lastFetchedAt.value = new Date().toISOString();
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    items,
    total,
    isLoading,
    error,
    lastFetchedAt,
    waiting,
    called,
    inService,
    fetchQueue,
  };
});

