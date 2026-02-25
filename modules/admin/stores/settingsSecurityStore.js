import { defineStore } from "pinia";
import settingsSecurityService from "~/admin/services/settingsSecurityService";

export const useSettingsSecurityStore = defineStore("settingsSecurity", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await settingsSecurityService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await settingsSecurityService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await settingsSecurityService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await settingsSecurityService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});