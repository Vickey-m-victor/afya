import { defineStore } from "pinia";
import userService from "~/iam/services/userService";

export const useUserStore = defineStore("user", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await userService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await userService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await userService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await userService.delete(id);
      await this.fetchAll(); 
      return response;
    },
    async ban(id) {
      const response = await userService.ban(id);
      await this.fetchAll(); 
      return response;
    },
    async restore(id) {
      const response = await userService.restore(id);
      await this.fetchAll(); 
      return response;
    }
  }
});