import api from "@/utils/api";

const departmentService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/departments?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/department/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/department`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/department/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/department/${id}`);
  }
};

export default departmentService;