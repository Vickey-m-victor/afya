import api from "@/utils/api";

const statutoryRateService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/statutory-rates?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/statutory-rate/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/statutory-rate`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/statutory-rate/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/statutory-rate/${id}`);
  }
};

export default statutoryRateService;