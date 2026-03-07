import api from "@/utils/api";

const workerUnionService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/worker-unions?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/worker-unions/${id}`);
  },
  
  create(data) {
    return api.post("/hr/worker-unions", data);
  },
  
  update(id, data) {
    return api.put(`/hr/worker-unions/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/worker-unions/${id}`);
  }
};

export default workerUnionService;