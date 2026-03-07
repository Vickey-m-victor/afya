import api from "@/utils/api";

const permissionService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    
    // 💡 FIX: Changed `perPage` to `per-page` (with a hyphen) so the backend stops ignoring it!
    const url = `/iam/rbac/permissions?page=${page}&per-page=${perPage}${queryParam}`;
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