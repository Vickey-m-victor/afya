import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useEncounterStore = defineStore("outpatientEncounter", () => {
  const byId = reactive({});
  const active = ref(null); // { queueId, encounterId, patientId, station }

  function upsert(encounter) {
    if (!encounter?.encounter_id) return;
    byId[encounter.encounter_id] = {
      ...(byId[encounter.encounter_id] || {}),
      ...encounter,
      _cachedAt: new Date().toISOString(),
    };
  }

  function setActive(payload) {
    active.value = payload;
  }

  return { byId, active, upsert, setActive };
});

