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
      } finally {
        this.loading = false;
      }
    }
  }
});