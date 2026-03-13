import api from "@/utils/api";

const publicHolidayService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/public-holidays?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/public-holiday/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/public-holiday`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/public-holiday/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/public-holiday/${id}`);
  }
};

export default publicHolidayService;