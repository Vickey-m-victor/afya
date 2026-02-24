import { defineStore } from "pinia";
import accessLogService from "~/admin/services/accessLogService";

export const useAccessLogStore = defineStore("accessLog", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await accessLogService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});