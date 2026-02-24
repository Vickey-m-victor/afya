import { defineStore } from "pinia";
import settingsMailerService from "~/admin/services/settingsMailerService";

export const useSettingsMailerStore = defineStore("settingsMailer", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await settingsMailerService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});