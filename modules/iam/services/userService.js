import api from "@/utils/api";

const userService = {
    getAll(searchQuery = "") {
      // If there is a search query, attach it. Otherwise, just fetch all.
      const url = searchQuery ? `/iam/users?q=${searchQuery}` : "/iam/users";
      return api.get(url);
    },
  getById(username) {
    return api.get(`/iam/user/${username}`); // Endpoint uses username as ID
  },
  create(data) {
    return api.post("/iam/user/create", data); // Fixed path
  },
  // update(username, data) {
  //   return api.put(`/iam/user/${username}`, data); 
  // },
  delete(username) {
    return api.delete(`/iam/user/${username}`); // Fixed path
  },
  toggleStatus(username) {
    return api.patch(`/iam/user/status/${username}`); // Added your toggle status endpoint
  }
};

export default userService;