import { defineStore } from "pinia";
import ruleService from "~/iam/services/ruleService";

export const useRuleStore = defineStore("rule", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery="") {
      this.loading = true;
      
      // 💡 FIX 3: Instantly clear array to prevent Ghost Data
      this.items = []; 
      
      try {
        const response = await ruleService.getAll(searchQuery);
        let fetchedData = response.data?.dataPayload?.data || response.data;
        
        // 💡 FIX 4: Safety check! If the backend returns null/Object, force it to be an empty array []
        this.items = Array.isArray(fetchedData) ? fetchedData : [];
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async create(payload) {
      const response = await ruleService.create(payload);
      await this.fetchAll(); 
      return response;
    },
    // ... update and delete remain exactly the same
    async update(id, payload) {
      const response = await ruleService.update(id, payload);
      await this.fetchAll(); 
      return response;
    },
    async delete(id) {
      const response = await ruleService.delete(id);
      await this.fetchAll(); 
      return response;
    }
  }
});