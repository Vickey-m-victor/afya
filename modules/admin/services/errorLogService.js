import api from "@/utils/api";

const errorLogService = {
  getAll() {
    return api.get("/admin/logs/error");
  },
  getById(id) {
    return api.get(`/admin/logs/error/${id}`);
  },
  create(data) {
    return api.post("/admin/logs/error", data);
  },
  update(id, data) {
    return api.put(`/admin/logs/error/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/logs/error/${id}`);
  }
};

export default errorLogService;