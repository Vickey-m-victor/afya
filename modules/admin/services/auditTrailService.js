import api from "@/utils/api";

const auditTrailService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/admin/audit/trail?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  getById(id) {
    return api.get(`/admin/audit/trail/${id}`);
  },
  create(data) {
    return api.post("/admin/audit/trail", data);
  },
  update(id, data) {
    return api.put(`/admin/audit/trail/${id}`, data);
  },
  delete(id) {
    return api.delete(`/admin/audit/trail/${id}`);
  },
  // 💡 Exactly matches your cURL command!
  restore(id) {
    return api.patch(`/admin/audit/trail/${id}`); 
  }
};

export default auditTrailService;