import api from "@/utils/api";

const auditTrailService = {
  getAll() {
    return api.get("/admin/audit/trail");
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
  }
};

export default auditTrailService;