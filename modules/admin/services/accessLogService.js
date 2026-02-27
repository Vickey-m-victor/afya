import api from "@/utils/api";

const accessLogService = {
 getAll(searchQuery = "") {
      // If there is a search query, attach it. Otherwise, just fetch all.
      const url = searchQuery ? `/admin/logs/access?q=${searchQuery}` : "/admin/logs/access";
      return api.get(url);
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