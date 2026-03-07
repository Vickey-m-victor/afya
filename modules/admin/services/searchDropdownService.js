import api from "@/utils/api";

const searchDropdownService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/admin/facility/search-dropdown?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/admin/facility/search-dropdown/${id}`);
  },
  
  create(data) {
    return api.post("/admin/facility/search-dropdown", data);
  },
  
  update(id, data) {
    return api.put(`/admin/facility/search-dropdown/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/admin/facility/search-dropdown/${id}`);
  }
};

export default searchDropdownService;