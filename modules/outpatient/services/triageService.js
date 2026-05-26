import { useOutpatientApi } from "./outpatientApi";

export function useTriageService() {
  async function getQueue({ facility_id }) {
    const { data, request, isLoading, error } = useOutpatientApi("triage/queue", {
      method: "GET",
    });
    await request(null, { facility_id });
    return { data, isLoading, error };
  }

  async function callPatient(queueId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `triage/${queueId}/call`,
      { method: "POST" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function startTriage(queueId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `triage/${queueId}/start`,
      { method: "POST" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function capture(payload) {
    const { data, request, isLoading, error } = useOutpatientApi("triage/capture", {
      method: "POST",
    });
    await request(payload);
    return { data, isLoading, error };
  }

  async function initiateOrders(payload) {
    const { data, request, isLoading, error } = useOutpatientApi("triage/orders", {
      method: "POST",
    });
    await request(payload);
    return { data, isLoading, error };
  }

  async function emergencyBypass(queueId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `triage/${queueId}/emergency`,
      { method: "POST" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function viewQueue(queueId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `triage/${queueId}`,
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function patientSummary(patientId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `triage/patient/${patientId}/summary`,
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  return {
    getQueue,
    viewQueue,
    callPatient,
    startTriage,
    capture,
    initiateOrders,
    emergencyBypass,
    patientSummary,
  };
}
