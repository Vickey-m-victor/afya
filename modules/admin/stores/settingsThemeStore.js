import { defineStore } from "pinia";
import settingsThemeService from "~/admin/services/settingsThemeService";

export const useSettingsThemeStore = defineStore("settingsTheme", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await settingsThemeService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await settingsThemeService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await settingsThemeService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await settingsThemeService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});