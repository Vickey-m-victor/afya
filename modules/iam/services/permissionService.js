import axiosInstance from "~/omnicore/helpers/axiosInstance";

const permissionService = {
  /**
   * Get all permissions with pagination and search
   * @param {Object} params - Query parameters (page, per-page, _search)
   */
  getPermissions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`/iam/rbac/permissions${queryString ? `?${queryString}` : ""}`);
  },

  /**
   * Get a single permission by name
   * @param {string} name - Permission name
   */
  getPermission(name) {
    return axiosInstance.get(`/iam/rbac/permission/${name}`);
  },

  /**
   * Create a new permission
   * @param {Object} permissionData - Permission data
   */
  createPermission(permissionData) {
    return axiosInstance.post("/iam/rbac/permission", permissionData);
  },

  /**
   * Update an existing permission
   * @param {string} name - Permission name
   * @param {Object} permissionData - Updated permission data
   */
  updatePermission(name, permissionData) {
    return axiosInstance.put(`/iam/rbac/permission/${name}`, permissionData);
  },

  /**
   * Delete a permission
   * @param {string} name - Permission name
   */
  deletePermission(name) {
    return axiosInstance.delete(`/iam/rbac/permission/${name}`);
  },
};

export default permissionService;
