import { useOutpatientApi } from "./outpatientApi";

export function useRegistrationService() {
  async function listPatients(limit = 10) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "registration/list",
      { method: "GET" }
    );
    await request(null, { limit });
    return { data, isLoading, error };
  }

  async function getMeta() {
    const { data, request, isLoading, error } = useOutpatientApi(
      "registration/meta",
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function searchPatients({ facility_id, q }) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "registration/search",
      { method: "GET" }
    );
    await request(null, { facility_id, q });
    return { data, isLoading, error };
  }

  async function getPatient(patientId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `registration/${patientId}`,
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function registerOnly(payload) {
    const { data, request, isLoading, error } = useOutpatientApi("registration", {
      method: "POST",
    });
    await request(payload);
    return { data, isLoading, error };
  }

  async function findOrCreate(payload) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "registration/find-or-create",
      { method: "POST" }
    );
    await request(payload);
    return { data, isLoading, error };
  }

  async function registerAndStartEncounter(payload) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "registration/start-encounter",
      { method: "POST" }
    );
    await request(payload);
    return { data, isLoading, error };
  }

  return {
    listPatients,
    getMeta,
    searchPatients,
    getPatient,
    registerOnly,
    findOrCreate,
    registerAndStartEncounter,
  };
}
