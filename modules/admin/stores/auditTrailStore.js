import { defineStore } from "pinia";
import auditTrailService from "~/admin/services/auditTrailService";

export const useAuditTrailStore = defineStore("auditTrail", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await auditTrailService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});