import api from "@/utils/api";

const facilitieService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/admin/facilities?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/admin/facilities/${id}`);
  },
  
  create(data) {
    return api.post("/admin/facilities", data);
  },
  
  update(id, data) {
    return api.put(`/admin/facilities/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/admin/facilities/${id}`);
  }
};

export default facilitieService;