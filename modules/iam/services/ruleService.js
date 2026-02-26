import api from "@/utils/api";

const ruleService = {
     getAll(searchQuery = "") {
       // If there is a search query, attach it. Otherwise, just fetch all.
       const url = searchQuery ? `/iam/rbac/rules?q=${searchQuery}` : "/iam/rbac/rules";
       return api.get(url);
     },
  getById(id) {
    return api.get(`/iam/rbac/rule/${id}`);
  },
  create(data) {
    return api.post("/iam/rbac/rule", data);
  },
  update(id, data) {
    return api.put(`/iam/rbac/rule/${id}`, data);
  },
  delete(id) {
    return api.delete(`/iam/rbac/rule/${id}`);
  }
};

export default ruleService;