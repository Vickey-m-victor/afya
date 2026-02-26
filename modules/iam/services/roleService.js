import api from "@/utils/api";

const roleService = {
     getAll(searchQuery = "") {
       // If there is a search query, attach it. Otherwise, just fetch all.
       const url = searchQuery ? `/iam/rbac/roles?q=${searchQuery}` : "/iam/rbac/roles";
       return api.get(url);
     },
  getById(id) {
    return api.get(`/iam/rbac/roles/${id}`);
  },
  create(data) {
    return api.post("/iam/rbac/roles", data);
  },
  update(id, data) {
    return api.put(`/iam/rbac/roles/${id}`, data);
  },
  delete(id) {
    return api.delete(`/iam/rbac/roles/${id}`);
  }
};

export default roleService;