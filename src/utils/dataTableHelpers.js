export function buildColumnConfig(columns = []) {
  return columns.map((column) => ({
    field: column.field,
    header: column.header || column.field,
    width: column.width,
    headerClass: column.headerClass || "",
    cellClass: column.cellClass || "",
  }));
}

export function parseAPIResponse(response) {
  const payload = response?.data?.dataPayload || response?.data || {};

  return {
    data: payload.data || [],
    totalCount: payload.totalCount || 0,
    totalPages: payload.totalPages || 1,
    currentPage: payload.currentPage || 1,
  };
}

export function normalizeColumns(columns = []) {
  return columns
    .filter((column) => column && column.field)
    .map((column) => ({
      ...column,
      header: column.header || column.field,
    }));
}
