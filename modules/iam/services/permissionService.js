import api from "@/utils/api";

const permissionService = {
     getAll(searchQuery = "") {
       // If there is a search query, attach it. Otherwise, just fetch all.
       const url = searchQuery ? `/iam/rbac/permissions?q=${searchQuery}` : "/iam/rbac/permissions";
       return api.get(url);
     },
  getById(id) {
    return api.get(`/iam/rbac/permissions/${id}`);
  },
  create(data) {
    return api.post("/iam/rbac/permissions", data);
  },
  update(id, data) {
    return api.put(`/iam/rbac/permissions/${id}`, data);
  },
  delete(id) {
    return api.delete(`/iam/rbac/permissions/${id}`);
  }
};

export default permissionService;