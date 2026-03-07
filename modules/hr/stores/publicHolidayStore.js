import { defineStore } from "pinia";
import publicHolidayService from "~/hr/services/publicHolidayService";

export const usePublicHolidayStore = defineStore("publicHoliday", {
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
    async fetchAll(searchQuery = "", page = 1, perPage = 25) {
      this.loading = true;
      this.items = []; 
      
      try {
        const response = await publicHolidayService.getAll(searchQuery, page, perPage);
        const payload = response.data?.dataPayload;
        
        if (Array.isArray(payload?.data)) {
          this.items = payload.data;
        } else if (payload?.data && typeof payload.data === 'object') {
          this.items = Object.values(payload.data); 
        } else {
          this.items = [];
        }

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
      const response = await publicHolidayService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    
    async update(id, payload) {
      const response = await publicHolidayService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    
    async delete(id) {
      const response = await publicHolidayService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});