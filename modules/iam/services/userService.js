import api from "@/utils/api";

const userService = {
  getAll() {
    return api.get("/iam/users");
  },
  getById(username) {
    return api.get(`/iam/user/${username}`); // Endpoint uses username as ID
  },
  create(data) {
    return api.post("/iam/user/create", data); // Fixed path
  },
  update(username, data) {
    // Note: I didn't see an exact PUT endpoint in your list, assuming it might be this based on convention
    return api.put(`/iam/user/${username}`, data); 
  },
  delete(username) {
    return api.delete(`/iam/user/${username}`); // Fixed path
  },
  toggleStatus(username) {
    return api.patch(`/iam/user/status/${username}`); // Added your toggle status endpoint
  }
};

export default userService;