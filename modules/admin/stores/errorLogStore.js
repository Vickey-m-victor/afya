import { defineStore } from "pinia";
import errorLogService from "~/admin/services/errorLogService";

export const useErrorLogStore = defineStore("errorLog", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await errorLogService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await errorLogService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await errorLogService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await errorLogService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});