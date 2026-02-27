import api from "@/utils/api";

const errorLogService = {
  getAll(searchQuery = "") {
       // If there is a search query, attach it. Otherwise, just fetch all.
       const url = searchQuery ? `/admin/logs/error?q=${searchQuery}` : "/admin/logs/error";
       return api.get(url);
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