import { defineStore } from "pinia";
import { ref } from "vue";
import { useConsultationService } from "../services/consultationService";
import { unwrapData } from "../services/models";

export const useConsultationQueueStore = defineStore("consultationQueue", () => {
  const items = ref([]);
  const currentPatient = ref(null);
  const total = ref(0);
  const isLoading = ref(false);
  const error = ref(null);
  const lastFetchedAt = ref(null);

  async function fetchQueue({ facility_id }) {
    isLoading.value = true;
    error.value = null;
    try {
      const api = useConsultationService();
      const res = await api.getQueue({ facility_id });
      if (res.error?.value) throw res.error.value;

      const payload = unwrapData(res.data?.value);
      items.value = payload?.items ?? [];
      currentPatient.value = payload?.current_patient ?? null;
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
    currentPatient,
    total,
    isLoading,
    error,
    lastFetchedAt,
    fetchQueue,
  };
});

