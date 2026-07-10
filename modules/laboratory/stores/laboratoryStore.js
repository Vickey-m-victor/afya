import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Initial mock reagents catalog
const initialReagents = [
  { id: 1, code: "RG-001", name: "HbA1c Test Kit", description: "Reagent kits for Glycated Hemoglobin testing", qty: 250, min_threshold: 50, unit_price: 350.0, expiry_date: "2027-05-18" },
  { id: 2, code: "RG-002", name: "LFT Reagent Pack", description: "Enzymatic reagents for ALT and AST testing", qty: 180, min_threshold: 40, unit_price: 500.0, expiry_date: "2026-12-10" },
  { id: 3, code: "RG-003", name: "CBC Diluent & Lyse Pack", description: "Hematology analyzer diluent fluids", qty: 35, min_threshold: 10, unit_price: 4500.0, expiry_date: "2027-02-15" },
  { id: 4, code: "RG-004", name: "Creatinine Reagent Pack", description: "Reagents for Jaffé creatinine measurements", qty: 120, min_threshold: 30, unit_price: 250.0, expiry_date: "2026-11-20" },
  { id: 5, code: "RG-005", name: "Urea Enzyme Pack", description: "Urease enzymatic tests for BUN measurements", qty: 90, min_threshold: 25, unit_price: 300.0, expiry_date: "2027-08-30" },
  { id: 6, code: "RG-006", name: "Glucose Strip Box", description: "Box of 100 chemical test strips for blood sugar", qty: 15, min_threshold: 20, unit_price: 800.0, expiry_date: "2026-09-05" },
  { id: 7, code: "RG-007", name: "Urinalysis Strip Tube", description: "10-Parameter urine analysis test strip tubes", qty: 45, min_threshold: 15, unit_price: 600.0, expiry_date: "2026-08-14" }
];

// Initial mock lab orders queue
const initialLabOrders = [
  {
    id: 1,
    lab_number: "LAB-2026-0001",
    patient_name: "Jane Doe",
    mrn: "MRN-2026-0082",
    age: "28 Yrs",
    gender: "Female",
    doctor_name: "Dr. Alice Kamau",
    date: "2026-07-08",
    status: "paid", // pending_payment, paid, completed
    remarks: "",
    items: [
      { id: 1, test_name: "Hemoglobin A1c (HbA1c)", value: "", ref_range: "4.0 - 5.6", unit: "%", status: "pending", cost: 1200, reagent_id: 1 },
      { id: 2, test_name: "Liver Function Tests (LFTs)", value: "", ref_range: "ALT: 7-56 U/L, AST: 10-40 U/L", unit: "U/L", status: "pending", cost: 2500, reagent_id: 2 }
    ]
  },
  {
    id: 2,
    lab_number: "LAB-2026-0002",
    patient_name: "John Doe",
    mrn: "MRN-2026-0045",
    age: "35 Yrs",
    gender: "Male",
    doctor_name: "Dr. Alice Kamau",
    date: "2026-07-08",
    status: "paid",
    remarks: "",
    items: [
      { id: 3, test_name: "Full Blood Count (FBC)", value: "", ref_range: "Hb: 12.0 - 17.5 g/dL, WBC: 4.5 - 11.0", unit: "g/dL", status: "pending", cost: 1500, reagent_id: 3 }
    ]
  },
  {
    id: 3,
    lab_number: "LAB-2026-0003",
    patient_name: "Mary Smith",
    mrn: "MRN-2026-0103",
    age: "42 Yrs",
    gender: "Female",
    doctor_name: "Dr. Fredrick Otieno",
    date: "2026-07-08",
    status: "pending_payment",
    remarks: "",
    items: [
      { id: 4, test_name: "Basic Metabolic Panel (BMP)", value: "", ref_range: "Creatinine: 0.6 - 1.2 mg/dL", unit: "mg/dL", status: "pending", cost: 1800, reagent_id: 4 }
    ]
  },
  {
    id: 4,
    lab_number: "LAB-2026-0004",
    patient_name: "James Kamau",
    mrn: "MRN-2026-0012",
    age: "61 Yrs",
    gender: "Male",
    doctor_name: "Dr. Alice Kamau",
    date: "2026-07-07",
    status: "completed",
    remarks: "HbA1c value is slightly high, suggesting glucose intolerance. Recommend clinical correlation.",
    items: [
      { id: 5, test_name: "Hemoglobin A1c (HbA1c)", value: "6.2", ref_range: "4.0 - 5.6", unit: "%", status: "completed", cost: 1200, reagent_id: 1 }
    ]
  }
];

export const useLaboratoryStore = defineStore("laboratoryStore", () => {
  // Load data from LocalStorage or initialize defaults
  const getStoredData = (key, fallback) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  };

  const saveStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const reagents = ref(getStoredData("afya365_lab_reagents", initialReagents));
  const labOrders = ref(getStoredData("afya365_lab_orders", initialLabOrders));
  
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const pendingPaymentQueue = computed(() => 
    labOrders.value.filter(o => o.status === "pending_payment")
  );

  const readyToTestQueue = computed(() => 
    labOrders.value.filter(o => o.status === "paid")
  );

  const completedQueue = computed(() => 
    labOrders.value.filter(o => o.status === "completed")
  );

  const lowStockReagentsCount = computed(() => 
    reagents.value.filter(r => r.qty <= r.min_threshold).length
  );

  const expiringReagentsCount = computed(() => {
    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + 90); // 90 days expiry window
    
    return reagents.value.filter(r => {
      const expDate = new Date(r.expiry_date);
      return expDate <= thresholdDate && expDate >= today;
    }).length;
  });

  // Actions
  function saveState() {
    saveStoredData("afya365_lab_reagents", reagents.value);
    saveStoredData("afya365_lab_orders", labOrders.value);
  }

  async function simulateDelay(ms = 600) {
    isLoading.value = true;
    error.value = null;
    await new Promise(resolve => setTimeout(resolve, ms));
    isLoading.value = false;
  }

  async function fetchLabOrders() {
    await simulateDelay();
    return labOrders.value;
  }

  async function fetchLabOrderById(id) {
    await simulateDelay(300);
    const parsedId = parseInt(id, 10);
    return labOrders.value.find(o => o.id === parsedId) || null;
  }

  async function fetchReagents() {
    await simulateDelay();
    return reagents.value;
  }

  async function addReagent(reagentData) {
    await simulateDelay(500);
    const newId = reagents.value.length ? Math.max(...reagents.value.map(r => r.id)) + 1 : 1;
    const newReagent = {
      id: newId,
      code: `RG-00${newId}`,
      name: reagentData.name,
      description: reagentData.description || "",
      qty: parseInt(reagentData.qty || 0, 10),
      min_threshold: parseInt(reagentData.min_threshold || 10, 10),
      unit_price: parseFloat(reagentData.unit_price || 0),
      expiry_date: reagentData.expiry_date || "2027-12-31"
    };
    reagents.value.push(newReagent);
    saveState();
    return newReagent;
  }

  async function receiveStockBatch(stockArray) {
    await simulateDelay(600);
    stockArray.forEach(item => {
      const reagent = reagents.value.find(r => r.id === parseInt(item.reagent_id, 10));
      if (reagent) {
        reagent.qty += parseInt(item.receive_qty, 10);
        if (item.expiry_date) reagent.expiry_date = item.expiry_date;
        if (item.unit_price) reagent.unit_price = parseFloat(item.unit_price);
      }
    });
    saveState();
    return true;
  }

  async function saveLabResults(orderId, resultsPayload, remarks) {
    await simulateDelay(800);
    const order = labOrders.value.find(o => o.id === parseInt(orderId, 10));
    if (!order) {
      throw new Error("Laboratory order not found");
    }

    // Process each item and fill details
    resultsPayload.forEach(resultItem => {
      const orderItem = order.items.find(i => i.id === resultItem.id);
      if (orderItem) {
        orderItem.value = resultItem.value;
        orderItem.status = "completed";

        // Decrement corresponding reagent kit/pack
        if (orderItem.reagent_id) {
          const reagent = reagents.value.find(r => r.id === orderItem.reagent_id);
          if (reagent) {
            reagent.qty = Math.max(0, reagent.qty - 1);
          }
        }
      }
    });

    order.remarks = remarks;
    order.status = "completed";
    saveState();
    return order;
  }

  return {
    reagents,
    labOrders,
    isLoading,
    error,
    pendingPaymentQueue,
    readyToTestQueue,
    completedQueue,
    lowStockReagentsCount,
    expiringReagentsCount,
    fetchLabOrders,
    fetchLabOrderById,
    fetchReagents,
    addReagent,
    receiveStockBatch,
    saveLabResults
  };
});
