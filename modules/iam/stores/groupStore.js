import { defineStore } from "pinia";
import groupService from "~/iam/services/groupService";

export const useGroupStore = defineStore("group", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery) {
      this.loading = true;
      try {
        const response = await groupService.getAll(searchQuery);
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await groupService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await groupService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await groupService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});