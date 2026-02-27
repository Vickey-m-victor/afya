import { defineStore } from "pinia";
import accessLogService from "~/admin/services/accessLogService";

export const useAccessLogStore = defineStore("accessLog", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery = "") {
      this.loading = true;
      try {
        const response = await accessLogService.getAll(searchQuery);
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await accessLogService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await accessLogService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await accessLogService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});