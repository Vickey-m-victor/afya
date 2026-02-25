import { defineStore } from "pinia";
import settingsGeneralService from "~/admin/services/settingsGeneralService";

export const useSettingsGeneralStore = defineStore("settingsGeneral", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await settingsGeneralService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await settingsGeneralService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await settingsGeneralService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await settingsGeneralService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});