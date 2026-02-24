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
      } finally {
        this.loading = false;
      }
    }
  }
});