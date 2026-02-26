import { defineStore } from "pinia";
import ruleService from "~/iam/services/ruleService";

export const useRuleStore = defineStore("rule", {
  state: () => ({
    items: [],
    loading: false,
  }),
  actions: {
    async fetchAll(searchQuery) {
      this.loading = true;
      try {
        const response = await ruleService.getAll(searchQuery);
        this.items = response.data?.dataPayload?.data || response.data;
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