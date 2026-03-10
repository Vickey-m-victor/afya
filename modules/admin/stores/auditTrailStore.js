import { defineStore } from "pinia";
import auditTrailService from "~/admin/services/auditTrailService";

export const useAuditTrailStore = defineStore("auditTrail", {
  state: () => ({
    items: [],
    loading: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      perPage: 25,
      totalCount: 0,
    },
  }),
  actions: {
    // 💡 Accepts all 4 parameters and passes them to the Service
    async fetchAll(searchQuery = "", page = 1, perPage = 25) {
      this.loading = true;
      this.items = [];

      try {
        const response = await auditTrailService.getAll(
          searchQuery,
          page,
          perPage,
          
        );
        const payload = response.data?.dataPayload;

        if (Array.isArray(payload?.data)) {
          this.items = payload.data;
        } else if (payload?.data && typeof payload.data === "object") {
          this.items = Object.values(payload.data);
        } else {
          this.items = [];
        }

        if (payload) {
          this.pagination = {
            currentPage: payload.currentPage || 1,
            totalPages: payload.totalPages || 1,
            perPage: payload.perPage || 25,
            totalCount: payload.totalCount || 0,
          };
        }
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
    // In auditTrailStore.js — update delete and restore actions only
    async delete(id, searchQuery = "", page = 1, perPage = 25) {
      const response = await auditTrailService.delete(id);
      await this.fetchAll(searchQuery, page, perPage);  // no showDeleted
      return response;
    },

    async restore(id, searchQuery = "", page = 1, perPage = 25) {
      const response = await auditTrailService.restore(id);
      await this.fetchAll(searchQuery, page, perPage); 
      return response;
    }

  },
});
