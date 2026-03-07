import { defineStore } from "pinia";
import permissionService from "~/iam/services/permissionService";

export const usePermissionStore = defineStore("permission", {
  state: () => ({
    items: [],
    loading: false,
    // 💡 FIX 1: Add pagination state
    pagination: {
      currentPage: 1,
      totalPages: 1,
      perPage: 25,
      totalCount: 0
    }
  }),
  actions: {
    // 💡 FIX 3: Make sure fetchAll accepts perPage
    async fetchAll(searchQuery = "", page = 1, perPage = 25) {
      this.loading = true;
      this.items = []; 
      
      try {
        // 💡 FIX 4: Pass perPage into the Service
        const response = await permissionService.getAll(searchQuery, page, perPage);
        const payload = response.data?.dataPayload;
        
        // Handle Arrays (Page 1) and Objects (Page 2+)
        if (Array.isArray(payload?.data)) {
          this.items = payload.data;
        } else if (payload?.data && typeof payload.data === 'object') {
          this.items = Object.values(payload.data); 
        } else {
          this.items = [];
        }

        // Save Pagination
        if (payload) {
          this.pagination = {
            currentPage: payload.currentPage || 1,
            totalPages: payload.totalPages || 1,
            perPage: payload.perPage || 25,
            totalCount: payload.totalCount || 0
          };
        }
      } catch (error) {
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
    // ... update and delete remain exactly the same
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