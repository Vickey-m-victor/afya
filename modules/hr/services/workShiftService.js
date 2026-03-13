import api from "@/utils/api";

const workShiftService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/work-shifts?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/work-shift/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/work-shift`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/work-shift/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/work-shift/${id}`);
  }
};

export default workShiftService;