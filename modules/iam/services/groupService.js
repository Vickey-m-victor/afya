import api from "@/utils/api";

const groupService = {
  getAll(searchQuery = "", page = 1) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/iam/rbac/groups?page=${page}${queryParam}`;
    return api.get(url);
  },
  getById(id) {
    return api.get(`/iam/rbac/groups/${id}`);
  },
  
  create(data) {
    return api.post("/iam/rbac/groups", data);
  },
  update(id, data) {
    return api.put(`/iam/rbac/groups/${id}`, data);
  },
  delete(id) {
    return api.delete(`/iam/rbac/groups/${id}`);
  }
};

export default groupService;