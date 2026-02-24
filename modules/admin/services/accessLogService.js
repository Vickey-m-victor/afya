import api from "@/utils/api";

const accessLogService = {
  getAll() {
    return api.get("/admin/logs/access");
  },
  getById(id) {
    return api.get(`/admin/logs/access/${id}`);
  },
  create(data) {
    return api.post("/admin/logs/access", data);
  },
  update(id, data) {
    return api.put(`/admin/logs/access/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/logs/access/${id}`);
  }
};

export default accessLogService;