import api from "@/utils/api";

const roleService = {
  getAll() {
    return api.get("/iam/rbac/roles");
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