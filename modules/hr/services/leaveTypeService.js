import api from "@/utils/api";

const leaveTypeService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/leave-types?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/leave-types/${id}`);
  },
  
  create(data) {
    return api.post("/hr/leave-types", data);
  },
  
  update(id, data) {
    return api.put(`/hr/leave-types/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/leave-types/${id}`);
  }
};

export default leaveTypeService;