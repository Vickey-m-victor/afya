import api from "@/utils/api";

const jobTitleService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/job-titles?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/job-title/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/job-title`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/job-title/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/job-title/${id}`);
  }
};

export default jobTitleService;