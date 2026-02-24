import api from "@/utils/api";

const userService = {
  getAll() {
    return api.get("/iam/users");
  },
  getById(id) {
    return api.get(`/iam/users/${id}`);
  },
  create(data) {
    return api.post("/iam/users", data);
  },
  update(id, data) {
    return api.put(`/iam/users/${id}`, data);
  },
  delete(id) {
    return api.delete(`/iam/users/${id}`);
  }
};

export default userService;