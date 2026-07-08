import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Initial mock medicines catalog
const initialMedicines = [
  { id: 1, code: "MED001", brand_name: "Panadol", generic_name: "Paracetamol", dosage_form: "Tablet", strength: "500mg", qty: 1500, min_threshold: 200, unit_price: 5.0, expiry_date: "2027-12-31" },
  { id: 2, code: "MED002", brand_name: "Amoxil", generic_name: "Amoxicillin", dosage_form: "Capsule", strength: "250mg", qty: 80, min_threshold: 100, unit_price: 15.0, expiry_date: "2026-10-15" },
  { id: 3, code: "MED003", brand_name: "Nurofen", generic_name: "Ibuprofen", dosage_form: "Tablet", strength: "400mg", qty: 350, min_threshold: 100, unit_price: 8.0, expiry_date: "2027-04-20" },
  { id: 4, code: "MED004", brand_name: "Zyrtec", generic_name: "Cetirizine", dosage_form: "Tablet", strength: "10mg", qty: 500, min_threshold: 50, unit_price: 10.0, expiry_date: "2027-02-05" },
  { id: 5, code: "MED005", brand_name: "Glucophage", generic_name: "Metformin", dosage_form: "Tablet", strength: "500mg", qty: 1200, min_threshold: 150, unit_price: 12.0, expiry_date: "2026-11-12" },
  { id: 6, code: "MED006", brand_name: "Lipitor", generic_name: "Atorvastatin", dosage_form: "Tablet", strength: "20mg", qty: 15, min_threshold: 50, unit_price: 45.0, expiry_date: "2026-07-28" }
];

// Initial mock prescriptions queue
const initialPrescriptions = [
  {
    id: 1,
    prescription_number: "RX-2026-0001",
    patient_name: "Jane Doe",
    mrn: "MRN-2026-0082",
    age: "28 Yrs",
    gender: "Female",
    doctor_name: "Dr. Alice Kamau",
    date: "2026-07-08",
    status: "paid", // pending_payment, paid, dispensed
    items: [
      { id: 1, medicine_id: 1, generic_name: "Paracetamol", brand_name: "Panadol", dosage_form: "Tablet", strength: "500mg", prescribed_qty: 15, dosage: "1x3", duration: "5 Days", dispensed_qty: 0, status: "pending" },
      { id: 2, medicine_id: 2, generic_name: "Amoxicillin", brand_name: "Amoxil", dosage_form: "Capsule", strength: "250mg", prescribed_qty: 21, dosage: "1x3", duration: "7 Days", dispensed_qty: 0, status: "pending" }
    ]
  },
  {
    id: 2,
    prescription_number: "RX-2026-0002",
    patient_name: "John Doe",
    mrn: "MRN-2026-0045",
    age: "35 Yrs",
    gender: "Male",
    doctor_name: "Dr. Alice Kamau",
    date: "2026-07-08",
    status: "paid",
    items: [
      { id: 3, medicine_id: 3, generic_name: "Ibuprofen", brand_name: "Nurofen", dosage_form: "Tablet", strength: "400mg", prescribed_qty: 10, dosage: "1x2", duration: "5 Days", dispensed_qty: 0, status: "pending" }
    ]
  },
  {
    id: 3,
    prescription_number: "RX-2026-0003",
    patient_name: "Mary Smith",
    mrn: "MRN-2026-0103",
    age: "42 Yrs",
    gender: "Female",
    doctor_name: "Dr. Fredrick Otieno",
    date: "2026-07-08",
    status: "pending_payment",
    items: [
      { id: 4, medicine_id: 4, generic_name: "Cetirizine", brand_name: "Zyrtec", dosage_form: "Tablet", strength: "10mg", prescribed_qty: 10, dosage: "1x1", duration: "10 Days", dispensed_qty: 0, status: "pending" },
      { id: 5, medicine_id: 1, generic_name: "Paracetamol", brand_name: "Panadol", dosage_form: "Tablet", strength: "500mg", prescribed_qty: 10, dosage: "1x2", duration: "5 Days", dispensed_qty: 0, status: "pending" }
    ]
  },
  {
    id: 4,
    prescription_number: "RX-2026-0004",
    patient_name: "James Kamau",
    mrn: "MRN-2026-0012",
    age: "61 Yrs",
    gender: "Male",
    doctor_name: "Dr. Alice Kamau",
    date: "2026-07-07",
    status: "dispensed",
    items: [
      { id: 6, medicine_id: 5, generic_name: "Metformin", brand_name: "Glucophage", dosage_form: "Tablet", strength: "500mg", prescribed_qty: 60, dosage: "1x2", duration: "30 Days", dispensed_qty: 60, status: "dispensed" }
    ]
  }
];

export const usePharmacyStore = defineStore("pharmacyStore", () => {
  // Load data from LocalStorage or initialize defaults
  const getStoredData = (key, fallback) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  };

  const saveStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const medicines = ref(getStoredData("afya365_pharmacy_medicines", initialMedicines));
  const prescriptions = ref(getStoredData("afya365_pharmacy_prescriptions", initialPrescriptions));
  
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const pendingPaymentQueue = computed(() => 
    prescriptions.value.filter(p => p.status === "pending_payment")
  );

  const readyToDispenseQueue = computed(() => 
    prescriptions.value.filter(p => p.status === "paid")
  );

  const dispensedQueue = computed(() => 
    prescriptions.value.filter(p => p.status === "dispensed")
  );

  const lowStockCount = computed(() => 
    medicines.value.filter(m => m.qty <= m.min_threshold).length
  );

  const expiringCount = computed(() => {
    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + 90); // 90 days expiry window
    
    return medicines.value.filter(m => {
      const expDate = new Date(m.expiry_date);
      return expDate <= thresholdDate && expDate >= today;
    }).length;
  });

  // Actions
  function saveState() {
    saveStoredData("afya365_pharmacy_medicines", medicines.value);
    saveStoredData("afya365_pharmacy_prescriptions", prescriptions.value);
  }

  async function simulateDelay(ms = 600) {
    isLoading.value = true;
    error.value = null;
    await new Promise(resolve => setTimeout(resolve, ms));
    isLoading.value = false;
  }

  async function fetchPrescriptions() {
    await simulateDelay();
    return prescriptions.value;
  }

  async function fetchPrescriptionById(id) {
    await simulateDelay(300);
    const parsedId = parseInt(id, 10);
    return prescriptions.value.find(p => p.id === parsedId) || null;
  }

  async function fetchMedicines() {
    await simulateDelay();
    return medicines.value;
  }

  async function addMedicine(medicineData) {
    await simulateDelay(500);
    const newId = medicines.value.length ? Math.max(...medicines.value.map(m => m.id)) + 1 : 1;
    const newMed = {
      id: newId,
      code: `MED00${newId}`,
      brand_name: medicineData.brand_name,
      generic_name: medicineData.generic_name,
      dosage_form: medicineData.dosage_form || "Tablet",
      strength: medicineData.strength,
      qty: parseInt(medicineData.qty || 0, 10),
      min_threshold: parseInt(medicineData.min_threshold || 50, 10),
      unit_price: parseFloat(medicineData.unit_price || 0),
      expiry_date: medicineData.expiry_date || "2027-12-31"
    };
    medicines.value.push(newMed);
    saveState();
    return newMed;
  }

  async function receiveStockBatch(stockArray) {
    await simulateDelay(600);
    stockArray.forEach(item => {
      const med = medicines.value.find(m => m.id === parseInt(item.medicine_id, 10));
      if (med) {
        med.qty += parseInt(item.receive_qty, 10);
        if (item.expiry_date) med.expiry_date = item.expiry_date;
        if (item.unit_price) med.unit_price = parseFloat(item.unit_price);
      }
    });
    saveState();
    return true;
  }

  async function dispensePrescription(prescriptionId, dispensedItems) {
    await simulateDelay(800);
    const rx = prescriptions.value.find(p => p.id === parseInt(prescriptionId, 10));
    if (!rx) {
      throw new Error("Prescription not found");
    }

    // Process each item and decrement stock
    dispensedItems.forEach(dispensedItem => {
      const rxItem = rx.items.find(i => i.id === dispensedItem.id);
      if (rxItem) {
        const med = medicines.value.find(m => m.id === rxItem.medicine_id);
        if (med) {
          // Decrement medicine stock quantity
          const actualDispensed = parseInt(dispensedItem.dispensed_qty, 10);
          med.qty = Math.max(0, med.qty - actualDispensed);
          
          rxItem.dispensed_qty = actualDispensed;
          rxItem.status = actualDispensed >= rxItem.prescribed_qty ? "dispensed" : "partially_dispensed";
        }
      }
    });

    rx.status = "dispensed";
    saveState();
    return rx;
  }

  return {
    medicines,
    prescriptions,
    isLoading,
    error,
    pendingPaymentQueue,
    readyToDispenseQueue,
    dispensedQueue,
    lowStockCount,
    expiringCount,
    fetchPrescriptions,
    fetchPrescriptionById,
    fetchMedicines,
    addMedicine,
    receiveStockBatch,
    dispensePrescription
  };
});
