import { useApi } from "@/helpers/useApi";

/**
 * Standard outpatient API wrapper.
 * Ensures all calls go through `useApi` for global auth + error handling.
 */
export function useOutpatientApi(path, options = {}) {
  const cleanPath = String(path || "").replace(/^\/+/, "");
  const url = cleanPath.startsWith("outpatient/")
    ? `/${cleanPath}`
    : `/outpatient/${cleanPath}`;

  return useApi(url, {
    autoFetch: false,
    autoAlert: true,
    ...options,
  });
}

