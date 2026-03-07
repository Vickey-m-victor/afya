import api from "@/utils/api";

const searchDropdownService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/department/search-dropdown?page=${page}&per-page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/department/search-dropdown/${id}`);
  },
  
  create(data) {
    return api.post("/hr/department/search-dropdown", data);
  },
  
  update(id, data) {
    return api.put(`/hr/department/search-dropdown/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/department/search-dropdown/${id}`);
  }
};

export default searchDropdownService;