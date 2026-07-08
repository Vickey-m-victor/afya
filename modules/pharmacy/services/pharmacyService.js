import { usePharmacyStore } from "../stores/pharmacyStore";

export function usePharmacyService() {
  const store = usePharmacyStore();

  async function getQueue() {
    const rxList = await store.fetchPrescriptions();
    return {
      data: {
        value: rxList
      },
      isLoading: { value: store.isLoading },
      error: { value: store.error }
    };
  }

  async function getPrescription(id) {
    const rx = await store.fetchPrescriptionById(id);
    return {
      data: {
        value: rx
      },
      isLoading: { value: store.isLoading },
      error: { value: store.error }
    };
  }

  async function getMedicines() {
    const meds = await store.fetchMedicines();
    return {
      data: {
        value: meds
      },
      isLoading: { value: store.isLoading },
      error: { value: store.error }
    };
  }

  async function addMedicine(payload) {
    const med = await store.addMedicine(payload);
    return {
      data: {
        value: med
      },
      isLoading: { value: store.isLoading },
      error: { value: store.error }
    };
  }

  async function receiveStock(stockArray) {
    const success = await store.receiveStockBatch(stockArray);
    return {
      data: {
        value: success
      },
      isLoading: { value: store.isLoading },
      error: { value: store.error }
    };
  }

  async function dispense(prescriptionId, payload) {
    const rx = await store.dispensePrescription(prescriptionId, payload);
    return {
      data: {
        value: rx
      },
      isLoading: { value: store.isLoading },
      error: { value: store.error }
    };
  }

  return {
    getQueue,
    getPrescription,
    getMedicines,
    addMedicine,
    receiveStock,
    dispense
  };
}
