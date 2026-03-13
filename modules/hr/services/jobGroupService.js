import api from "@/utils/api";

const jobGroupService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/job-groups?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/job-group/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/job-group`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/job-group/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/job-group/${id}`);
  }
};

export default jobGroupService;