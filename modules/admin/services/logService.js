import axiosInstance from "~/omnicore/helpers/axiosInstance";

function toQueryString(params = {}) {
  return new URLSearchParams(params).toString();
}

function withQuery(path, params = {}) {
  const queryString = toQueryString(params);
  return `${path}${queryString ? `?${queryString}` : ""}`;
}

function normalizePayload(response) {
  const payload = response?.data?.dataPayload || response?.data || {};
  const rawData = payload?.data;

  const data = Array.isArray(rawData) ? rawData : Object.values(rawData || {});

  return {
    data,
    totalCount: payload?.totalCount || 0,
    totalPages: payload?.totalPages || 1,
    currentPage: payload?.currentPage || 1,
    perPage: payload?.perPage || 20,
  };
}

const logService = {
  getAccessLogs(params = {}) {
    return axiosInstance.get(withQuery("/admin/logs/access", params));
  },

  getAccessLog(id) {
    return axiosInstance.get(`/admin/logs/access/${id}`);
  },

  getAuditTrail(params = {}) {
    return axiosInstance.get(withQuery("/admin/audit/trail", params));
  },

  getAuditLog(id) {
    return axiosInstance.get(`/admin/audit/trail/${id}`);
  },

  deleteAuditLog(id) {
    return axiosInstance.delete(`/admin/audit/trail/${id}`);
  },

  restoreAuditLog(id) {
    return axiosInstance.patch(`/admin/audit/trail/${id}`);
  },

  getErrorLogs(params = {}) {
    return axiosInstance.get(withQuery("/admin/logs/error", params));
  },

  getErrorLog(id) {
    return axiosInstance.get(`/admin/logs/error/${id}`);
  },

  resolveErrorLog(id) {
    return axiosInstance.post(`/admin/logs/error/${id}`);
  },

  normalizePayload,
};

export default logService;
