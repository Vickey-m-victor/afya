import api from "@/utils/api";

const settingsGeneralService = {
  getAll() {
    return api.get("/admin/settings/general");
  },
  getById(id) {
    return api.get(`/admin/settings/general/${id}`);
  },
  create(data) {
    return api.post("/admin/settings/general", data);
  },
  update(id, data) {
    return api.put(`/admin/settings/general/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/settings/general/${id}`);
  }
};

export default settingsGeneralService;