<script setup>
import { computed, ref, onMounted } from 'vue';
import { usePatientService } from '../services/patientService';
import BaseDatepicker from "@/components/BaseDatepicker.vue";

const patientService = usePatientService();

const patientsDB = ref([]);
const isLoading = ref(false);
const isSearching = ref(false);
const metaData = ref({ gender: [], marital_status: [] });

const selectedPatient = ref(null);
const isNewPatientMode = ref(false);
const encounterMessage = ref('');
const toast = ref({ show: false, message: '', type: 'info' });

const searchMrn = ref('');
const searchName = ref('');
const searchContact = ref('');

const newPatientForm = ref({
  title: 'Mr',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: 'male',
  phone_number: '',
  email: '',
  kin_name: '',
  kin_relationship: '',
  kin_phone: '',
  emergency_contact: '',
  facility_id: 1,
});

const filteredPatients = computed(() => {
  let filtered = [...patientsDB.value];
  const mrnQuery = searchMrn.value.trim().toLowerCase();
  const nameQuery = searchName.value.trim().toLowerCase();
  const contactQuery = searchContact.value.trim().toLowerCase();

  if (mrnQuery) {
    filtered = filtered.filter(
      (p) => (p.mrn || '').toLowerCase().includes(mrnQuery)
    );
  }

  if (nameQuery) {
    filtered = filtered.filter(
      (p) => (p.name || '').toLowerCase().includes(nameQuery)
    );
  }

  if (contactQuery) {
    filtered = filtered.filter(
      (p) => (p.phone || '').includes(contactQuery)
    );
  }

  return filtered;
});

function showToast(message, type = 'info') {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB');
}

function calculateAge(dobStr) {
  if (!dobStr) return '?';
  const today = new Date();
  const birthDate = new Date(dobStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function extractPatientsList(response) {
  const root = response?.dataPayload ?? response?.payload ?? response ?? {};
  const dataNode = root?.data ?? root;
  const list = dataNode?.data ?? dataNode?.patients ?? dataNode ?? [];

  // Common backend shape: { data: { data: [...], count: n } }
  if (Array.isArray(list?.data)) return list.data;
  if (Array.isArray(list)) return list;
  return [];
}

function extractPatientDetails(response) {
  const root = response?.dataPayload ?? response?.payload ?? response ?? {};
  const dataNode = root?.data ?? root;

  // Typical shapes we might receive:
  // - { payload: { patient, identifiers, contacts, address } }
  // - { dataPayload: { patient, identifiers, contacts, address } }
  // - { dataPayload: { data: { patient, identifiers, contacts, address } } }
  const patient = dataNode?.patient ?? root?.patient ?? null;
  const identifiers = dataNode?.identifiers ?? root?.identifiers ?? [];
  const contacts = dataNode?.contacts ?? root?.contacts ?? [];
  const address = dataNode?.address ?? root?.address ?? null;

  return { patient, identifiers, contacts, address };
}

async function loadPatients() {
  isLoading.value = true;
  try {
    const { data, error } = await patientService.listPatients(50);
    if (error?.value) throw error.value;
    patientsDB.value = extractPatientsList(data.value);
  } catch (e) {
    console.error('Failed to load patients:', e);
  } finally {
    isLoading.value = false;
  }
}

async function loadMeta() {
  try {
    const { data } = await patientService.getMeta();
    if (data.value?.payload) {
      metaData.value = data.value.payload;
    }
  } catch (e) {
    console.error('Failed to load meta:', e);
  }
}

async function searchPatients() {
  const query = searchName.value || searchMrn.value || searchContact.value;
  if (!query) {
    await loadPatients();
    return;
  }
  
  isSearching.value = true;
  try {
    const { data, error } = await patientService.searchPatients(query);
    if (error?.value) throw error.value;
    patientsDB.value = extractPatientsList(data.value);
  } catch (e) {
    console.error('Search failed:', e);
    showToast('Search failed', 'warning');
  } finally {
    isSearching.value = false;
  }
}

async function selectPatient(patient) {
  isLoading.value = true;
  try {
    const patientIdentifier = patient?.patient_id ?? patient?.id;
    if (!patientIdentifier) {
      showToast('Patient record is missing an identifier', 'warning');
      return;
    }

    const { data, error } = await patientService.getPatient(patientIdentifier);
    if (error?.value) throw error.value;

    const details = extractPatientDetails(data.value);
    if (details?.patient) {
      const patientData = details.patient;
      selectedPatient.value = {
        patient_id: patientData.patient_id ?? patientData.id ?? patientIdentifier,
        mrn: details.identifiers?.find((i) => i.type === 'MRN')?.value || patientData.mrn || '-',
        title: patientData.title || 'Mr',
        firstName: patientData.first_name ?? patientData.firstName ?? '',
        lastName: patientData.last_name ?? patientData.lastName ?? '',
        dob: patientData.date_of_birth ?? patientData.dob ?? null,
        gender: patientData.gender ?? '-',
        phone: details.contacts?.find((c) => c.type === 'phone')?.value || patientData.phone || patientData.phone_number || '-',
        email: details.contacts?.find((c) => c.type === 'email')?.value || patientData.email || '-',
        address: details.address ? `${details.address.address}, ${details.address.city}` : (patientData.address || '-'),
        kinName: patientData.kin_name || patientData.kinName || '-',
        kinRelation: patientData.kin_relationship || patientData.kinRelation || '-',
        kinPhone: patientData.kin_phone || patientData.kinPhone || '-',
        emergencyContact: patientData.emergency_contact || patientData.emergencyContact || '-',
        nhif: patientData.nhif_number || patientData.nhif || '-',
      };
      isNewPatientMode.value = false;
      encounterMessage.value = '';
      showToast(`Loaded: ${selectedPatient.value.firstName} ${selectedPatient.value.lastName}`, 'info');
    } else {
      showToast('Patient details not found in response', 'warning');
    }
  } catch (e) {
    console.error('Failed to load patient details:', e);
    showToast('Failed to load patient details', 'warning');
  } finally {
    isLoading.value = false;
  }
}

function clearSearch() {
  searchMrn.value = '';
  searchName.value = '';
  searchContact.value = '';
  loadPatients();
}

function openNewPatient() {
  isNewPatientMode.value = true;
  selectedPatient.value = null;
  encounterMessage.value = '';
  newPatientForm.value = {
    title: 'Mr',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'male',
    phone_number: '',
    email: '',
    kin_name: '',
    kin_relationship: '',
    kin_phone: '',
    emergency_contact: '',
    facility_id: 1,
  };
}

function cancelNewPatient() {
  isNewPatientMode.value = false;
}

async function createPatient() {
  const firstName = newPatientForm.value.first_name.trim();
  const lastName = newPatientForm.value.last_name.trim();

  if (!firstName || !lastName) {
    showToast('Please provide first and last name', 'warning');
    return;
  }

  isLoading.value = true;
  try {
    const { data, error } = await patientService.registerAndStartEncounter({
      first_name: firstName,
      last_name: lastName,
      title: newPatientForm.value.title,
      date_of_birth: newPatientForm.value.date_of_birth || null,
      gender: newPatientForm.value.gender,
      phone_number: newPatientForm.value.phone_number,
      email: newPatientForm.value.email,
      kin_name: newPatientForm.value.kin_name,
      kin_relationship: newPatientForm.value.kin_relationship,
      kin_phone: newPatientForm.value.kin_phone,
      emergency_contact: newPatientForm.value.emergency_contact,
      facility_id: newPatientForm.value.facility_id,
    });

    if (data.value?.payload) {
      const patient = data.value.payload.patient;
      selectedPatient.value = {
        patient_id: patient.patient_id,
        mrn: patient.mrn || '-',
        title: patient.title || 'Mr',
        firstName: patient.first_name,
        lastName: patient.last_name,
        dob: patient.date_of_birth,
        gender: patient.gender,
        phone: patient.phone_number || '-',
        email: patient.email || '-',
        address: '-',
        kinName: patient.kin_name || '-',
        kinRelation: patient.kin_relationship || '-',
        kinPhone: patient.kin_phone || '-',
        emergencyContact: patient.emergency_contact || '-',
        nhif: patient.nhif_number || '-',
      };
      isNewPatientMode.value = false;
      
      const encounter = data.value.payload.encounter;
      const timestamp = new Date().toLocaleString();
      encounterMessage.value = `New encounter opened for ${firstName} ${lastName} at ${timestamp}. (Encounter ID: ${encounter?.encounter_id || 'N/A'})`;
      
      showToast(`Patient registered and sent to triage`, 'success');
      await loadPatients();
    }
  } catch (e) {
    console.error('Failed to create patient:', e);
    showToast(e.message || 'Failed to register patient', 'warning');
  } finally {
    isLoading.value = false;
  }
}

async function createPatientViaEndpoint() {
  const firstName = newPatientForm.value.first_name.trim();
  const lastName = newPatientForm.value.last_name.trim();

  if (!firstName || !lastName) {
    showToast('Please provide first and last name', 'warning');
    return;
  }

  isLoading.value = true;
  try {
    const payload = {
      facility_id: newPatientForm.value.facility_id,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: newPatientForm.value.date_of_birth || null,
      gender: newPatientForm.value.gender === 'male' ? 1 : newPatientForm.value.gender === 'female' ? 2 : 3,
      contacts: newPatientForm.value.phone_number ? [
        {
          type: 'phone',
          value: newPatientForm.value.phone_number.replace(/\D/g, '')
        }
      ] : [],
      identifiers: [],
      encounter_type_id: 1,
      department_id: 2,
    };

    const { data, error } = await patientService.createPatient(payload);

    if (error?.value) {
      const apiError = Array.isArray(error.value)
        ? error.value[0]
        : error.value?.message || error.value?.error || 'Failed to create patient';
      throw new Error(typeof apiError === 'string' ? apiError : 'Failed to create patient');
    }

    const result = data?.value || {};
    const patientData =
      result?.payload?.patient ||
      result?.payload?.data?.patient ||
      result?.payload?.data ||
      result?.dataPayload?.patient ||
      result?.data?.patient ||
      result?.patient ||
      null;

    if (patientData) {
      selectedPatient.value = {
        patient_id: patientData.patient_id,
        mrn: patientData.mrn || '-',
        title: patientData.title || newPatientForm.value.title,
        firstName: patientData.first_name || firstName,
        lastName: patientData.last_name || lastName,
        dob: patientData.date_of_birth,
        gender: patientData.gender,
        phone: newPatientForm.value.phone_number || '-',
        email: '-',
        address: '-',
        kinName: '-',
        kinRelation: '-',
        kinPhone: '-',
        emergencyContact: '-',
        nhif: '-',
      };
    }

    isNewPatientMode.value = false;
    const timestamp = new Date().toLocaleString();
    encounterMessage.value = `Patient created via endpoint at ${timestamp}. (Patient ID: ${patientData?.patient_id || 'N/A'})`;
    showToast('Patient created successfully', 'success');
    await loadPatients();
  } catch (e) {
    console.error('Failed to create patient via endpoint:', e);
    showToast(e?.message || 'Failed to create patient', 'warning');
  } finally {
    isLoading.value = false;
  }
}

async function startEncounter() {
  if (!selectedPatient.value) return;

  const toGenderCode = (g) => {
    const v = String(g || '').trim().toLowerCase();
    if (v === '1' || v === 'male' || v === 'm') return 1;
    if (v === '2' || v === 'female' || v === 'f') return 2;
    if (v === '3' || v === 'other') return 3;
    return null;
  };

  isLoading.value = true;
  try {
    const payload = {
      facility_id: 1,
      first_name: selectedPatient.value.firstName || '',
      last_name: selectedPatient.value.lastName || '',
      date_of_birth: selectedPatient.value.dob || null,
      gender: toGenderCode(selectedPatient.value.gender),
      contacts: [
        ...(selectedPatient.value.phone ? [{ type: 'phone', value: String(selectedPatient.value.phone) }] : []),
        ...(selectedPatient.value.email && selectedPatient.value.email !== '-' ? [{ type: 'email', value: String(selectedPatient.value.email) }] : []),
      ],
      identifiers: [
        ...(selectedPatient.value.mrn && selectedPatient.value.mrn !== '-' ? [{ type: 'MRN', value: String(selectedPatient.value.mrn) }] : []),
        ...(selectedPatient.value.national_id ? [{ type: 'NATIONAL_ID', value: String(selectedPatient.value.national_id) }] : []),
      ],
      encounter_type_id: 1,
      department_id: 2,
    };

    const { data, error } = await patientService.registerAndStartEncounter(payload);
    if (error?.value) throw error.value;

    const root = data.value?.dataPayload ?? data.value?.payload ?? data.value ?? {};
    const payloadResp = root?.data ?? root;

    if (payloadResp?.encounter) {
      const encounter = payloadResp.encounter;
      const timestamp = new Date().toLocaleString();
      encounterMessage.value = `New encounter opened for ${selectedPatient.value.firstName} ${selectedPatient.value.lastName} at ${timestamp}. (Encounter ID: ${encounter?.encounter_id || 'N/A'})`;
      showToast(`Encounter started for ${selectedPatient.value.firstName} ${selectedPatient.value.lastName}`, 'info');
    } else {
      showToast('Encounter started, but encounter details were not returned.', 'info');
    }
  } catch (e) {
    console.error('Failed to start encounter:', e);
    showToast('Failed to start encounter', 'warning');
  } finally {
    isLoading.value = false;
  }
}

function viewHistory() {
  showToast('Loading past encounters...', 'info');
}

function editPatient() {
  showToast('Edit mode - full demographic update available in full EMR', 'info');
}

onMounted(() => {
  loadPatients();
  loadMeta();
});
</script>

<template>
  <div class="content">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
      <div>
        <h2 class="h3 mb-1">Patient Reception</h2>
        <div class="text-muted fs-sm">Main / Reception</div>
      </div>

      <div class="d-inline-flex align-items-center gap-2 px-3 py-2 bg-body-light border rounded">
        <i class="fa fa-user-md text-muted"></i>
        <span class="fw-semibold fs-sm">Clinical EMR</span>
        <span class="text-muted fs-sm">| Outpatient</span>
      </div>
    </div>

    <div class="row g-3">
      <!-- Left: Search + results -->
      <div class="col-12 col-xxl-4 d-flex">
        <BaseBlock class="w-100 mb-0" title="Find patient">
          <template #content>
            <div class="block-content pb-4">
              <div class="vstack gap-3">
                <div>
                  <label class="form-label">MRN / National ID</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-id-card text-muted"></i>
                    </span>
                    <input
                      v-model="searchMrn"
                      type="text"
                      class="form-control"
                      placeholder="e.g., MRN-1001, ID 34567890"
                    />
                  </div>
                </div>

                <div>
                  <label class="form-label">Full name</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-user text-muted"></i>
                    </span>
                    <input
                      v-model="searchName"
                      type="text"
                      class="form-control"
                      placeholder="First or last name"
                    />
                  </div>
                </div>

                <div>
                  <label class="form-label">Phone / Email</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-phone text-muted"></i>
                    </span>
                    <input
                      v-model="searchContact"
                      type="text"
                      class="form-control"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                </div>

                <div class="d-flex flex-wrap gap-2 mb-1">
                  <button type="button" class="btn btn-success" @click="searchPatients" :disabled="isSearching">
                    <i class="fa fa-search me-1"></i>
                    {{ isSearching ? 'Searching...' : 'Search' }}
                  </button>
                  <button type="button" class="btn btn-alt-secondary" @click="clearSearch">
                    <i class="fa fa-eraser me-1"></i>
                    Clear
                  </button>
                  <button type="button" class="btn btn-alt-primary" @click="openNewPatient">
                    <i class="fa fa-user-plus me-1"></i>
                    New Patient
                  </button>
                </div>
              </div>
            </div>

            <div class="block-content block-content-full bg-body-light border-top">
              <div class="d-flex align-items-center justify-content-between">
                <div class="fw-semibold">
                  <i class="fa fa-users me-1"></i>
                  Patient records
                </div>
                <span v-if="isLoading" class="text-muted">
                  <i class="fa fa-spinner fa-spin"></i>
                </span>
              </div>
            </div>

            <div class="block-content pb-4" style="max-height: 520px; overflow-y: auto;">
              <div class="list-group">
                <button
                  v-for="patient in filteredPatients"
                  :key="patient.patient_id"
                  type="button"
                  class="list-group-item list-group-item-action"
                  :class="{ active: selectedPatient && selectedPatient.patient_id === patient.patient_id }"
                  @click="selectPatient(patient)"
                >
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="fw-semibold">
                      {{ patient.name }}
                      <span :class="selectedPatient && selectedPatient.patient_id === patient.patient_id ? 'text-white-75' : 'text-muted'">
                        ({{ patient.mrn }})
                      </span>
                    </div>
                    <i class="fa fa-chevron-right opacity-50"></i>
                  </div>
                  <div class="d-flex flex-wrap gap-3 mt-2 fs-sm">
                    <span><i class="fa fa-phone me-1 opacity-75"></i>{{ patient.phone }}</span>
                    <span><i class="fa fa-calendar me-1 opacity-75"></i>DOB: {{ formatDate(patient.dob) }}</span>
                  </div>
                </button>

                <div v-if="filteredPatients.length === 0 && !isLoading" class="list-group-item text-muted">
                  <i class="fa fa-exclamation-triangle me-1"></i>
                  No matching records. Use New Patient to register.
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>

      <!-- Right: Details / actions -->
      <div class="col-12 col-xxl-8 d-flex">
        <BaseBlock class="w-100 mb-0" title="Patient details">
          <template #content>
            <div class="block-content pb-4">
              <div v-if="!selectedPatient && !isNewPatientMode" class="text-center text-muted py-6">
                <i class="fa fa-hand-point-left fs-1 opacity-50"></i>
                <p class="mt-3 mb-0">Select a patient from the list or create a new one.</p>
                <p class="mb-0">Demographics, NHIF details and encounter actions will appear here.</p>
              </div>

              <template v-if="selectedPatient && !isNewPatientMode">
                <div class="block block-bordered mb-3">
                  <div class="block-header block-header-default">
                    <h3 class="block-title">
                      <i class="fa fa-user-circle me-2 text-muted"></i>
                      Patient Identity
                    </h3>
                  </div>
                  <div class="block-content">
                    <div class="row g-2 fs-sm">
                      <div class="col-md-6"><span class="text-muted">Full name</span><div class="fw-semibold">{{ selectedPatient.title }} {{ selectedPatient.firstName }} {{ selectedPatient.lastName }}</div></div>
                      <div class="col-md-6"><span class="text-muted">MRN / Chart #</span><div class="fw-semibold">{{ selectedPatient.mrn }}</div></div>
                      <div class="col-md-6"><span class="text-muted">Date of Birth</span><div class="fw-semibold">{{ formatDate(selectedPatient.dob) }} ({{ calculateAge(selectedPatient.dob) }} yrs)</div></div>
                      <div class="col-md-6"><span class="text-muted">Gender</span><div class="fw-semibold">{{ selectedPatient.gender }}</div></div>
                      <div class="col-md-6"><span class="text-muted">Phone</span><div class="fw-semibold">{{ selectedPatient.phone }}</div></div>
                      <div class="col-md-6"><span class="text-muted">Email</span><div class="fw-semibold">{{ selectedPatient.email || '-' }}</div></div>
                      <div class="col-12"><span class="text-muted">Address</span><div class="fw-semibold">{{ selectedPatient.address }}</div></div>
                    </div>
                  </div>
                </div>

                <div class="block block-bordered mb-3">
                  <div class="block-header block-header-default">
                    <h3 class="block-title">
                      <i class="fa fa-ambulance me-2 text-muted"></i>
                      Next of Kin & Emergency
                    </h3>
                  </div>
                  <div class="block-content">
                    <div class="row g-2 fs-sm">
                      <div class="col-md-6"><span class="text-muted">Kin name</span><div class="fw-semibold">{{ selectedPatient.kinName }} ({{ selectedPatient.kinRelation }})</div></div>
                      <div class="col-md-6"><span class="text-muted">Kin contact</span><div class="fw-semibold">{{ selectedPatient.kinPhone }}</div></div>
                      <div class="col-12"><span class="text-muted">Emergency contact</span><div class="fw-semibold">{{ selectedPatient.emergencyContact }}</div></div>
                    </div>
                  </div>
                </div>

                <div class="block block-bordered mb-3">
                  <div class="block-header block-header-default">
                    <h3 class="block-title">
                      <i class="fa fa-shield me-2 text-muted"></i>
                      NHIF / Insurance
                    </h3>
                  </div>
                  <div class="block-content">
                    <div class="fs-sm">
                      <div>
                        <span class="text-muted">NHIF Number</span>
                        <div class="fw-semibold">{{ selectedPatient.nhif }}</div>
                      </div>
                      <div class="text-muted mt-2">
                        Insurance scheme: National Hospital Insurance Fund | Status:
                        <span class="text-success fw-semibold">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="block block-bordered mb-0">
                  <div class="block-header block-header-default">
                    <h3 class="block-title">
                      <i class="fa fa-stethoscope me-2 text-muted"></i>
                      Clinical Actions
                    </h3>
                  </div>
                  <div class="block-content">
                    <div class="d-flex flex-wrap gap-2">
                      <button type="button" class="btn btn-success" @click="startEncounter" :disabled="isLoading">
                        <i class="fa fa-hospital me-1"></i>
                        Start New Encounter
                      </button>
                      <button type="button" class="btn btn-alt-secondary" @click="viewHistory">
                        <i class="fa fa-history me-1"></i>
                        Past Encounters
                      </button>
                      <button type="button" class="btn btn-alt-secondary" @click="editPatient">
                        <i class="fa fa-edit me-1"></i>
                        Edit Demographics
                      </button>
                    </div>
                    <div v-if="encounterMessage" class="mt-3 fs-sm text-success">
                      <i class="fa fa-check-circle me-1"></i>
                      {{ encounterMessage }}
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="isNewPatientMode">
                <div>
                  <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <h3 class="h5 mb-0">
                      <i class="fa fa-user-plus me-2 text-muted"></i>
                      Register New Patient
                    </h3>
                    <span class="text-muted fs-sm">Reception</span>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <label class="form-label">Title</label>
                      <select v-model="newPatientForm.title" class="form-select">
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">First name *</label>
                      <input v-model="newPatientForm.first_name" class="form-control" placeholder="First name" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label">Last name *</label>
                      <input v-model="newPatientForm.last_name" class="form-control" placeholder="Last name" />
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Date of birth</label>
                      <BaseDatepicker v-model="newPatientForm.date_of_birth" :config="{ dateFormat: 'Y-m-d' }" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Gender</label>
                      <select v-model="newPatientForm.gender" class="form-select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Phone number</label>
                      <input v-model="newPatientForm.phone_number" class="form-control" placeholder="+254 xxx xxx" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Email</label>
                      <input v-model="newPatientForm.email" type="email" class="form-control" placeholder="email@example.com" />
                    </div>
                  </div>

                  <h4 class="h6 mb-2">Next of Kin</h4>
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Kin full name</label>
                      <input v-model="newPatientForm.kin_name" class="form-control" placeholder="Full name" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Relationship</label>
                      <input v-model="newPatientForm.kin_relationship" class="form-control" placeholder="Spouse, Child..." />
                    </div>
                  </div>

                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Kin phone</label>
                      <input v-model="newPatientForm.kin_phone" class="form-control" placeholder="Contact" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Emergency contact</label>
                      <input v-model="newPatientForm.emergency_contact" class="form-control" placeholder="Alternate number" />
                    </div>
                  </div>

                  <div class="d-flex flex-wrap gap-2 mt-4">
                    <button type="button" class="btn btn-success" @click="createPatient" :disabled="isLoading">
                      <i class="fa fa-save me-1"></i>
                      {{ isLoading ? 'Processing...' : 'Create Patient and Continue' }}
                    </button>
                    <button type="button" class="btn btn-info" @click="createPatientViaEndpoint" :disabled="isLoading">
                      <i class="fa fa-plus-circle me-1"></i>
                      {{ isLoading ? 'Processing...' : 'Create Patient' }}
                    </button>
                    <button type="button" class="btn btn-alt-secondary" @click="cancelNewPatient">
                      <i class="fa fa-times me-1"></i>
                      Cancel
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>

    <transition name="toast-fade">
      <div v-if="toast.show" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1030;">
        <div
          class="alert shadow mb-0 d-flex align-items-center gap-2"
          :class="toast.type === 'success' ? 'alert-success' : toast.type === 'warning' ? 'alert-warning' : 'alert-info'"
          role="alert"
        >
          <i :class="`fa ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle'}`"></i>
          <span class="fw-semibold fs-sm">{{ toast.message }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
