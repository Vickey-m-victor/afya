import api from "@/utils/api";

const taskManagerService = {
  getAll() {
    return api.get("/admin/task/manager");
  },
  getById(id) {
    return api.get(`/admin/task/manager/${id}`);
  },
  create(data) {
    return api.post("/admin/task/manager", data);
  },
  update(id, data) {
    return api.put(`/admin/task/manager/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/task/manager/${id}`);
  }
};

export default taskManagerService;