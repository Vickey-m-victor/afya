import api from "@/utils/api";

const workShiftService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/work-shifts?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/work-shifts/${id}`);
  },
  
  create(data) {
    return api.post("/hr/work-shifts", data);
  },
  
  update(id, data) {
    return api.put(`/hr/work-shifts/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/work-shifts/${id}`);
  }
};

export default workShiftService;