import { defineStore } from "pinia";
import groupService from "~/iam/services/groupService";

export const useGroupStore = defineStore("group", {
  state: () => ({
    items: [],
    loading: false,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      perPage: 25,
      totalCount: 0
    }
  }),
  actions: {
    async fetchAll(searchQuery = "", page = 1) {
      this.loading = true;
      this.items = []; 
      
      try {
        // 💡 FIX 2: Just call the service method with both parameters!
        const response = await groupService.getAll(searchQuery, page); 
        
        const payload = response.data?.dataPayload;
        this.items = Array.isArray(payload?.data) ? payload.data : [];
        
        // Save the pagination info!
        if (payload) {
          this.pagination = {
            currentPage: payload.currentPage || 1,
            totalPages: payload.totalPages || 1,
            perPage: payload.perPage || 25,
            totalCount: payload.totalCount || 0
          };
        }
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
    // ... update and delete remain exactly the same
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
