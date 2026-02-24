import api from "@/utils/api";

const settingsMailerService = {
  getAll() {
    return api.get("/admin/settings/mailer");
  },
  getById(id) {
    return api.get(`/admin/settings/mailer/${id}`);
  },
  create(data) {
    return api.post("/admin/settings/mailer", data);
  },
  update(id, data) {
    return api.put(`/admin/settings/mailer/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/settings/mailer/${id}`);
  }
};

export default settingsMailerService;