import { useApi } from '@/helpers/useApi';

export function usePatientService() {
  const facilityId = 1;

  async function listPatients(limit = 20) {
    const { data, request, isLoading, error } = useApi('outpatient/registration/list', {
      method: 'GET',
      queryParams: { limit },
      autoAlert: true,
    });
    await request();
    return { data, isLoading, error };
  }

  async function searchPatients(query, facilityIdVal = facilityId) {
    const { data, request, isLoading, error } = useApi('/outpatient/registration/search', {
      method: 'GET',
      queryParams: { q: query, facility_id: facilityIdVal },
      autoAlert: true,
    });
    await request();
    return { data, isLoading, error };
  }

  async function getPatient(patientId) {
    const { data, request, isLoading, error } = useApi(`/outpatient/registration/${patientId}`, {
      method: 'GET',
      autoAlert: true,
    });
    await request();
    return { data, isLoading, error };
  }

  async function getMeta() {
    const { data, request, isLoading, error } = useApi('/outpatient/registration/meta', {
      method: 'GET',
      autoAlert: true,
    });
    await request();
    return { data, isLoading, error };
  }

  async function createPatient(patientData) {
    const { data, request, isLoading, error } = useApi('/outpatient/registration', {
      method: 'POST',
      autoAlert: true,
    });
    await request(patientData);
    return { data, isLoading, error };
  }

  async function registerAndStartEncounter(patientData) {
    const { data, request, isLoading, error } = useApi('/outpatient/registration/start-encounter', {
      method: 'POST',
      autoAlert: true,
    });
    await request(patientData);
    return { data, isLoading, error };
  }

  async function findOrCreate(patientData) {
    const { data, request, isLoading, error } = useApi('/outpatient/registration/find-or-create', {
      method: 'POST',
      autoAlert: true,
    });
    await request(patientData);
    return { data, isLoading, error };
  }

  return {
    listPatients,
    searchPatients,
    getPatient,
    getMeta,
    createPatient,
    registerAndStartEncounter,
    findOrCreate,
  };
}
