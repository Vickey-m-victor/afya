import axiosInstance from "~/omnicore/helpers/axiosInstance";

const ruleService = {
  /**
   * Get all rules with pagination and search
   * @param {Object} params - Query parameters (page, per-page, _search)
   */
  getRules(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`/iam/rbac/rules${queryString ? `?${queryString}` : ""}`);
  },

  /**
   * Get a single rule by ID
   * @param {string|number} id - Rule ID
   */
  getRule(id) {
    return axiosInstance.get(`/iam/rbac/rule/${id}`);
  },

  /**
   * Update an existing rule
   * @param {string|number} id - Rule ID
   * @param {Object} ruleData - Updated rule data (rule_name, description)
   */
  updateRule(id, ruleData) {
    return axiosInstance.put(`/iam/rbac/rule/${id}`, ruleData);
  },
};

export default ruleService;
