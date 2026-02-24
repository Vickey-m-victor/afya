import { defineStore } from "pinia";
import roleService from "~/iam/services/roleService";

export const useRoleStore = defineStore("role", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await roleService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});