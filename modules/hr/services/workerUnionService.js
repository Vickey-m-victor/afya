import api from "@/utils/api";

const workerUnionService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/worker-unions?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/worker-union/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/worker-union`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/worker-union/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/worker-union/${id}`);
  }
};

export default workerUnionService;