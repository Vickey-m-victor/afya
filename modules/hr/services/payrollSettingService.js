import api from "@/utils/api";

const payrollSettingService = {
  getAll(searchQuery = "", page = 1, perPage = 25) {
    const queryParam = searchQuery ? `&q=${searchQuery}` : '';
    const url = `/hr/payroll-settings?page=${page}&per_page=${perPage}${queryParam}`;
    return api.get(url);
  },
  
  getById(id) {
    return api.get(`/hr/payroll-setting/${id}`);
  },
  
  create(data) {
    return api.post(`/hr/payroll-setting`, data);
  },
  
  update(id, data) {
    return api.put(`/hr/payroll-setting/${id}`, data);
  },
  
  delete(id) {
    return api.delete(`/hr/payroll-setting/${id}`);
  }
};

export default payrollSettingService;