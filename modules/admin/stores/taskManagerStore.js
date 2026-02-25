import { defineStore } from "pinia";
import taskManagerService from "~/admin/services/taskManagerService";

export const useTaskManagerStore = defineStore("taskManager", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const response = await taskManagerService.getAll();
        this.items = response.data?.dataPayload?.data || response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await taskManagerService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    async update(id, payload) {
      const response = await taskManagerService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await taskManagerService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});