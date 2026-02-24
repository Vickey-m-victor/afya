import api from "@/utils/api";

const settingsThemeService = {
  getAll() {
    return api.get("/admin/settings/theme");
  },
  getById(id) {
    return api.get(`/admin/settings/theme/${id}`);
  },
  create(data) {
    return api.post("/admin/settings/theme", data);
  },
  update(id, data) {
    return api.put(`/admin/settings/theme/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/settings/theme/${id}`);
  }
};

export default settingsThemeService;