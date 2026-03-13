import api from "@/utils/api";

const leaveTypeService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/leave-types?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/leave-type/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/leave-type`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/leave-type/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/leave-type/${id}`);
  }
};

export default leaveTypeService;