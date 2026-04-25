import { useOutpatientApi } from "./outpatientApi";

export function useConsultationService() {
  async function getQueue({ facility_id }) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "consultation/queue",
      { method: "GET" }
    );
    await request(null, { facility_id });
    return { data, isLoading, error };
  }

  async function nextPatient({ facility_id }) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "consultation/next",
      { method: "POST" }
    );
    // facility_id is a query param even on POST for this endpoint
    await request(null, { facility_id });
    return { data, isLoading, error };
  }

  async function start({ queueId, facility_id }) {
    // backend supports start/{id} (manual) or start?facility_id=... (auto assign)
    const path = queueId ? `consultation/start/${queueId}` : "consultation/start";
    const { data, request, isLoading, error } = useOutpatientApi(path, {
      method: "POST",
    });
    const queryParams = queueId ? {} : { facility_id };
    await request(null, queryParams);
    return { data, isLoading, error };
  }

  async function patientSummary(patientId) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `consultation/patient-summary/${patientId}`,
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  async function complete(queueId, payload) {
    const { data, request, isLoading, error } = useOutpatientApi(
      `consultation/complete/${queueId}`,
      { method: "POST" }
    );
    await request(payload);
    return { data, isLoading, error };
  }

  async function refer(payload) {
    const { data, request, isLoading, error } = useOutpatientApi(
      "consultation/refer",
      { method: "POST" }
    );
    await request(payload);
    return { data, isLoading, error };
  }

  return { getQueue, nextPatient, start, patientSummary, complete, refer };
}
