import { defineStore } from "pinia";
import auditTrailService from "~/admin/services/auditTrailService";

export const useAuditTrailStore = defineStore("auditTrail", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery = "") {
      this.loading = true;
      try {
        const response = await auditTrailService.getAll(searchQuery);
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await auditTrailService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await auditTrailService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await auditTrailService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});