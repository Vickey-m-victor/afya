import api from "@/utils/api";

const jobGroupService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/job-groups?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/job-groups/${id}`);
  },
  
  create(data) {
    return api.post("/hr/job-groups", data);
  },
  
  update(id, data) {
    return api.put(`/hr/job-groups/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/job-groups/${id}`);
  }
};

export default jobGroupService;