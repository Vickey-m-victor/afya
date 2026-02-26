import { defineStore } from "pinia";
import permissionService from "~/iam/services/permissionService";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery) {
      this.loading = true;
      try {
        const response = await permissionService.getAll(searchQuery);
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await permissionService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await permissionService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await permissionService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});