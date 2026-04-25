import { defineStore } from "pinia";
import { ref } from "vue";

export const useOutpatientContextStore = defineStore("outpatientContext", () => {
  const facilityId = ref(1);

  function setFacilityId(id) {
    const n = Number(id);
    facilityId.value = Number.isFinite(n) ? n : 1;
  }

  return { facilityId, setFacilityId };
});

