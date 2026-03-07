import api from "@/utils/api";

const publicHolidayService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/public-holidays?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/public-holidays/${id}`);
  },
  
  create(data) {
    return api.post("/hr/public-holidays", data);
  },
  
  update(id, data) {
    return api.put(`/hr/public-holidays/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/public-holidays/${id}`);
  }
};

export default publicHolidayService;