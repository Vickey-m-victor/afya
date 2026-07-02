import { useApi } from "@/helpers/useApi";

/**
 * Standard billing API wrapper.
 * Ensures all calls go through `useApi` for global auth + error handling.
 */
export function useBillingApi(path, options = {}) {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  const url = cleanPath.startsWith("billing/")
    ? `/${cleanPath}`
    : `/billing/${cleanPath}`;

  return useApi(url, {
    autoFetch: false,
    autoAlert: true,
    ...options,
  });
}
