import api from "@/utils/api";

const statutoryRateService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/statutory-rates?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/statutory-rates/${id}`);
  },
  
  create(data) {
    return api.post("/hr/statutory-rates", data);
  },
  
  update(id, data) {
    return api.put(`/hr/statutory-rates/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/statutory-rates/${id}`);
  }
};

export default statutoryRateService;