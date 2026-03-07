import api from "@/utils/api";

const departmentService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/departments?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/departments/${id}`);
  },
  
  create(data) {
    return api.post("/hr/departments", data);
  },
  
  update(id, data) {
    return api.put(`/hr/departments/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/departments/${id}`);
  }
};

export default departmentService;