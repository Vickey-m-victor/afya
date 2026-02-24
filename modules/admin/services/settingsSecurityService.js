import api from "@/utils/api";

const settingsSecurityService = {
  getAll() {
    return api.get("/admin/settings/security");
  },
  getById(id) {
    return api.get(`/admin/settings/security/${id}`);
  },
  create(data) {
    return api.post("/admin/settings/security", data);
  },
  update(id, data) {
    return api.put(`/admin/settings/security/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/settings/security/${id}`);
  }
};

export default settingsSecurityService;