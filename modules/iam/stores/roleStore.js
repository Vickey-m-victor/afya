import { defineStore } from "pinia";
import roleService from "~/iam/services/roleService";

export const useRoleStore = defineStore("role", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery="") {
      this.loading = true;
      try {
        const response = await roleService.getAll(searchQuery);
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await roleService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await roleService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await roleService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});