<script setup>
import { computed, ref } from 'vue';

const patientsDB = ref([
  {
    id: 'P1001',
    mrn: 'MRN-1001',
    title: 'Mr',
    firstName: 'James',
    lastName: 'Mwangi',
    dob: '1985-06-12',
    gender: 'Male',
    phone: '+254 712 345678',
    email: 'james.mwangi@email.com',
    nhif: 'NHIF-28736452',
    kinName: 'Mary Mwangi',
    kinRelation: 'Spouse',
    kinPhone: '+254 723 987654',
    address: 'Nairobi, Kilimani',
    nextOfKinContact: '+254 723 987654',
    emergencyContact: '+254 722 111222'
  },
  {
    id: 'P1002',
    mrn: 'MRN-1002',
    title: 'Ms',
    firstName: 'Aisha',
    lastName: 'Hassan',
    dob: '1992-11-03',
    gender: 'Female',
    phone: '+254 700 123456',
    email: 'aisha.h@afya.co.ke',
    nhif: 'NHIF-99234817',
    kinName: 'Omar Hassan',
    kinRelation: 'Brother',
    kinPhone: '+254 710 445566',
    address: 'Mombasa, Nyali',
    nextOfKinContact: '+254 710 445566',
    emergencyContact: '+254 733 998877'
  },
  {
    id: 'P1003',
    mrn: 'MRN-1003',
    title: 'Mrs',
    firstName: 'Grace',
    lastName: 'Otieno',
    dob: '1978-02-20',
    gender: 'Female',
    phone: '+254 722 998877',
    email: 'grace.otieno@clinic.com',
    nhif: 'NHIF-55678322',
    kinName: 'Peter Otieno',
    kinRelation: 'Husband',
    kinPhone: '+254 721 334455',
    address: 'Kisumu, Milimani',
    nextOfKinContact: '+254 721 334455',
    emergencyContact: '+254 722 998877'
  }
]);

const selectedPatient = ref(null);
const isNewPatientMode = ref(false);
const encounterMessage = ref('');
const toast = ref({ show: false, message: '', type: 'info' });

const searchMrn = ref('');
const searchName = ref('');
const searchContact = ref('');

const newPatientForm = ref({
  title: 'Mr',
  firstName: '',
  lastName: '',
  dob: '',
  gender: 'Male',
  phone: '',
  email: '',
  nhif: '',
  kinName: '',
  kinRelation: '',
  kinPhone: '',
  emergency: ''
});

const filteredPatients = computed(() => {
  let filtered = [...patientsDB.value];
  const mrnQuery = searchMrn.value.trim().toLowerCase();
  const nameQuery = searchName.value.trim().toLowerCase();
  const contactQuery = searchContact.value.trim().toLowerCase();

  if (mrnQuery) {
    filtered = filtered.filter(
      (p) => p.mrn.toLowerCase().includes(mrnQuery) || (p.nhif && p.nhif.toLowerCase().includes(mrnQuery))
    );
  }

  if (nameQuery) {
    filtered = filtered.filter(
      (p) => p.firstName.toLowerCase().includes(nameQuery) || p.lastName.toLowerCase().includes(nameQuery)
    );
  }

  if (contactQuery) {
    filtered = filtered.filter(
      (p) => p.phone.includes(contactQuery) || (p.email || '').toLowerCase().includes(contactQuery)
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
  return new Date(dateStr).toLocaleDateString('en-GB');
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

function selectPatient(patient) {
  selectedPatient.value = patient;
  isNewPatientMode.value = false;
  encounterMessage.value = '';
  showToast(`Loaded: ${patient.firstName} ${patient.lastName}`, 'info');
}

function clearSearch() {
  searchMrn.value = '';
  searchName.value = '';
  searchContact.value = '';
}

function openNewPatient() {
  isNewPatientMode.value = true;
  selectedPatient.value = null;
  encounterMessage.value = '';
  newPatientForm.value = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    nhif: '',
    kinName: '',
    kinRelation: '',
    kinPhone: '',
    emergency: ''
  };
}

function cancelNewPatient() {
  isNewPatientMode.value = false;
}

function createPatient() {
  const firstName = newPatientForm.value.firstName.trim();
  const lastName = newPatientForm.value.lastName.trim();

  if (!firstName || !lastName) {
    showToast('Please provide first and last name', 'warning');
    return;
  }

  const newId = `P${patientsDB.value.length + 1001}`;
  const newMrn = `MRN-${3000 + patientsDB.value.length + 1}`;
  const newPatient = {
    id: newId,
    mrn: newMrn,
    title: newPatientForm.value.title,
    firstName,
    lastName,
    dob: newPatientForm.value.dob || '2000-01-01',
    gender: newPatientForm.value.gender,
    phone: newPatientForm.value.phone,
    email: newPatientForm.value.email,
    nhif: newPatientForm.value.nhif,
    kinName: newPatientForm.value.kinName,
    kinRelation: newPatientForm.value.kinRelation,
    kinPhone: newPatientForm.value.kinPhone,
    address: 'Address to update',
    emergencyContact: newPatientForm.value.emergency,
    nextOfKinContact: newPatientForm.value.kinPhone
  };

  patientsDB.value.push(newPatient);
  selectedPatient.value = newPatient;
  isNewPatientMode.value = false;
  showToast(`Patient ${newPatient.firstName} ${newPatient.lastName} created (MRN: ${newPatient.mrn})`, 'success');
}

function startEncounter() {
  if (!selectedPatient.value) return;
  const timeStamp = new Date().toLocaleString();
  encounterMessage.value = `New encounter opened for ${selectedPatient.value.firstName} ${selectedPatient.value.lastName} at ${timeStamp}. (Outpatient visit - Triage ready)`;
  showToast(`Encounter started for ${selectedPatient.value.firstName} ${selectedPatient.value.lastName}`, 'info');
}

function viewHistory() {
  showToast('Demo: Past encounters: Last visit 2025-02-10 (General checkup)', 'info');
}

function editPatient() {
  showToast('Feature: edit mode - full demographic update available in full EMR', 'info');
}
</script>

<template>
  <div class="content reception-page">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
      <div>
        <h2 class="mb-1">Patient Reception Console</h2>
        <div class="text-muted fs-sm">Main Module / Reception / Patient Access Hub</div>
      </div>
      <div class="badge-clinic">
        <i class="fa fa-user-md me-2"></i>
        Clinical EMR | Outpatient Ready
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-xxl-4 d-flex">
        <BaseBlock class="w-100 border-0 shadow-sm block-rounded-4">
          <template #content>
            <div class="block-content block-content-full p-4">
              <div class="search-title mb-4">
                <i class="fa fa-search text-success me-2"></i>
                Find or create patient
              </div>

              <div class="vstack gap-3">
                <div>
                  <label class="form-label fw-semibold fs-sm">MRN / National ID</label>
                  <div class="position-relative">
                    <i class="fa fa-id-card field-icon"></i>
                    <input v-model="searchMrn" type="text" class="form-control rounded-pill px-5" placeholder="e.g., MRN-1001, ID 34567890" />
                  </div>
                </div>

                <div>
                  <label class="form-label fw-semibold fs-sm">Full name</label>
                  <div class="position-relative">
                    <i class="fa fa-user field-icon"></i>
                    <input v-model="searchName" type="text" class="form-control rounded-pill px-5" placeholder="First or last name" />
                  </div>
                </div>

                <div>
                  <label class="form-label fw-semibold fs-sm">Phone / Email</label>
                  <div class="position-relative">
                    <i class="fa fa-phone field-icon"></i>
                    <input v-model="searchContact" type="text" class="form-control rounded-pill px-5" placeholder="+254 7XX XXX XXX" />
                  </div>
                </div>

                <div class="d-flex flex-wrap gap-2 pt-1">
                  <button type="button" class="btn btn-success rounded-pill" @click="showToast('Search applied', 'info')">
                    <i class="fa fa-search me-1"></i>
                    Search
                  </button>
                  <button type="button" class="btn btn-alt-secondary rounded-pill" @click="clearSearch">
                    <i class="fa fa-eraser me-1"></i>
                    Clear
                  </button>
                  <button type="button" class="btn btn-alt-primary rounded-pill" @click="openNewPatient">
                    <i class="fa fa-user-plus me-1"></i>
                    New Patient
                  </button>
                </div>
              </div>

              <hr class="my-4" />

              <div class="fw-semibold mb-3">
                <i class="fa fa-users me-1"></i>
                Patient records
              </div>

              <div class="patient-list">
                <div
                  v-for="patient in filteredPatients"
                  :key="patient.id"
                  class="patient-card"
                  :class="{ active: selectedPatient && selectedPatient.id === patient.id }"
                  @click="selectPatient(patient)"
                >
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="fw-bold">{{ patient.firstName }} {{ patient.lastName }} ({{ patient.mrn }})</div>
                    <i class="fa fa-chevron-right text-muted"></i>
                  </div>
                  <div class="patient-meta mt-2">
                    <span><i class="fa fa-phone me-1"></i>{{ patient.phone }}</span>
                    <span><i class="fa fa-calendar me-1"></i>DOB: {{ formatDate(patient.dob) }}</span>
                    <span><i class="fa fa-id-card me-1"></i>NHIF: {{ patient.nhif || '-' }}</span>
                  </div>
                </div>

                <div v-if="filteredPatients.length === 0" class="patient-card text-muted">
                  <i class="fa fa-exclamation-triangle me-1"></i>
                  No matching records. Use New Patient to register.
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>

      <div class="col-12 col-xxl-8 d-flex">
        <BaseBlock class="w-100 border-0 shadow-sm block-rounded-4">
          <template #content>
            <div class="block-content block-content-full p-4">
              <div v-if="!selectedPatient && !isNewPatientMode" class="text-center text-muted py-6">
                <i class="fa fa-hand-point-left fs-1 opacity-50"></i>
                <p class="mt-3 mb-0">Select a patient from the list or create a new one.</p>
                <p>Demographics, NHIF details and encounter actions will appear here.</p>
              </div>

              <template v-if="selectedPatient && !isNewPatientMode">
                <div class="section-card">
                  <div class="section-title"><i class="fa fa-user-circle me-2"></i>Patient Identity</div>
                  <div class="info-row"><div class="info-label">Full name</div><div class="info-value">{{ selectedPatient.title }} {{ selectedPatient.firstName }} {{ selectedPatient.lastName }}</div></div>
                  <div class="info-row"><div class="info-label">MRN / Chart #</div><div class="info-value"><strong>{{ selectedPatient.mrn }}</strong> <span class="active-badge"><i class="fa fa-check-circle me-1"></i>Active</span></div></div>
                  <div class="info-row"><div class="info-label">Date of Birth</div><div class="info-value">{{ formatDate(selectedPatient.dob) }} ({{ calculateAge(selectedPatient.dob) }} yrs)</div></div>
                  <div class="info-row"><div class="info-label">Gender</div><div class="info-value">{{ selectedPatient.gender }}</div></div>
                  <div class="info-row"><div class="info-label">Phone / Email</div><div class="info-value">{{ selectedPatient.phone }} / {{ selectedPatient.email || '-' }}</div></div>
                  <div class="info-row"><div class="info-label">Address</div><div class="info-value">{{ selectedPatient.address || 'Not specified' }}</div></div>
                </div>

                <div class="section-card">
                  <div class="section-title"><i class="fa fa-ambulance me-2"></i>Next of Kin and Emergency</div>
                  <div class="info-row"><div class="info-label">Kin name</div><div class="info-value">{{ selectedPatient.kinName || '-' }} ({{ selectedPatient.kinRelation || '-' }})</div></div>
                  <div class="info-row"><div class="info-label">Kin contact</div><div class="info-value">{{ selectedPatient.kinPhone || selectedPatient.nextOfKinContact || '-' }}</div></div>
                  <div class="info-row"><div class="info-label">Emergency contact</div><div class="info-value">{{ selectedPatient.emergencyContact || selectedPatient.kinPhone || '-' }}</div></div>
                </div>

                <div class="section-card">
                  <div class="section-title"><i class="fa fa-shield me-2"></i>NHIF / Insurance</div>
                  <div class="nhif-detail">
                    <div><i class="fa fa-id-card me-1"></i>NHIF Number: <strong>{{ selectedPatient.nhif || 'Not registered' }}</strong></div>
                    <div class="small text-muted mt-2">Insurance scheme: National Hospital Insurance Fund | Status: <span class="text-success fw-semibold">Active</span></div>
                  </div>
                </div>

                <div class="section-card mb-0">
                  <div class="section-title"><i class="fa fa-stethoscope me-2"></i>Clinical Actions</div>
                  <div class="d-flex flex-wrap gap-2">
                    <button type="button" class="btn btn-success rounded-pill" @click="startEncounter">
                      <i class="fa fa-hospital me-1"></i>
                      Start New Encounter
                    </button>
                    <button type="button" class="btn btn-alt-secondary rounded-pill" @click="viewHistory">
                      <i class="fa fa-history me-1"></i>
                      Past Encounters
                    </button>
                    <button type="button" class="btn btn-alt-secondary rounded-pill" @click="editPatient">
                      <i class="fa fa-edit me-1"></i>
                      Edit Demographics
                    </button>
                  </div>
                  <div v-if="encounterMessage" class="mt-3 small text-success">
                    <i class="fa fa-check-circle me-1"></i>
                    {{ encounterMessage }}
                  </div>
                </div>
              </template>

              <template v-if="isNewPatientMode">
                <div class="section-card mb-0">
                  <div class="section-title"><i class="fa fa-user-plus me-2"></i>Register New Patient (Reception)</div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <label class="form-label fw-semibold fs-sm">Title</label>
                      <select v-model="newPatientForm.title" class="form-select rounded-pill">
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Ms</option>
                        <option>Dr</option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-semibold fs-sm">First name *</label>
                      <input v-model="newPatientForm.firstName" class="form-control rounded-pill" placeholder="First name" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label fw-semibold fs-sm">Last name *</label>
                      <input v-model="newPatientForm.lastName" class="form-control rounded-pill" placeholder="Last name" />
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Date of birth</label>
                      <input v-model="newPatientForm.dob" type="date" class="form-control rounded-pill" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Gender</label>
                      <select v-model="newPatientForm.gender" class="form-select rounded-pill">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Phone number</label>
                      <input v-model="newPatientForm.phone" class="form-control rounded-pill" placeholder="+254 xxx xxx" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Email</label>
                      <input v-model="newPatientForm.email" class="form-control rounded-pill" placeholder="email@example.com" />
                    </div>
                  </div>

                  <div class="row g-3 mb-4">
                    <div class="col-12">
                      <label class="form-label fw-semibold fs-sm">NHIF number (optional)</label>
                      <input v-model="newPatientForm.nhif" class="form-control rounded-pill" placeholder="NHIF-XXXXXXXX" />
                    </div>
                  </div>

                  <div class="section-title"><i class="fa fa-users me-2"></i>Next of Kin</div>

                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Kin full name</label>
                      <input v-model="newPatientForm.kinName" class="form-control rounded-pill" placeholder="Full name" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Relationship</label>
                      <input v-model="newPatientForm.kinRelation" class="form-control rounded-pill" placeholder="Spouse, Child..." />
                    </div>
                  </div>

                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Kin phone</label>
                      <input v-model="newPatientForm.kinPhone" class="form-control rounded-pill" placeholder="Contact" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label fw-semibold fs-sm">Emergency contact</label>
                      <input v-model="newPatientForm.emergency" class="form-control rounded-pill" placeholder="Alternate number" />
                    </div>
                  </div>

                  <div class="d-flex flex-wrap gap-2 mt-4">
                    <button type="button" class="btn btn-success rounded-pill" @click="createPatient">
                      <i class="fa fa-save me-1"></i>
                      Create Patient and Continue
                    </button>
                    <button type="button" class="btn btn-alt-secondary rounded-pill" @click="cancelNewPatient">
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
      <div v-if="toast.show" class="toast-msg" :class="`toast-${toast.type}`">
        <i :class="`fa ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle'}`"></i>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.reception-page {
  --rx-bg: #eef2f7;
  --rx-primary: #1e8f5e;
  --rx-primary-strong: #0f6e46;
  --rx-muted: #5e7a93;
  --rx-border: #cfdfed;
  --rx-panel: #ffffff;
  --rx-soft: #f9fbfd;
}

.reception-page {
  background: radial-gradient(circle at 20% 10%, rgba(30, 143, 94, 0.08), transparent 40%),
    radial-gradient(circle at 90% 5%, rgba(11, 94, 126, 0.08), transparent 30%),
    var(--rx-bg);
  min-height: calc(100vh - 92px);
}

.block-rounded-4 {
  border-radius: 1.4rem;
}

.badge-clinic {
  background: var(--rx-panel);
  border: 1px solid var(--rx-border);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.search-title {
  font-size: 1.15rem;
  font-weight: 700;
  border-left: 4px solid var(--rx-primary);
  padding-left: 0.75rem;
}

.field-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  color: #8aa0b5;
  z-index: 2;
}

.patient-list {
  max-height: 480px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.patient-card {
  background: var(--rx-soft);
  border: 1px solid #e4edf4;
  border-radius: 1rem;
  padding: 0.9rem;
  margin-bottom: 0.7rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.patient-card:hover {
  background: #edf5fa;
  border-color: #bfd9e8;
}

.patient-card.active {
  border-color: #8bc3a6;
  box-shadow: 0 0 0 2px rgba(30, 143, 94, 0.15);
}

.patient-meta {
  font-size: 0.78rem;
  color: #527a9b;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.section-card {
  background: #f9fafc;
  border: 1px solid #eef3f8;
  border-radius: 1rem;
  padding: 1rem 1.1rem;
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.85rem;
  border-bottom: 2px solid #e0ebf3;
  padding-bottom: 0.45rem;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.55rem;
  font-size: 0.9rem;
}

.info-label {
  width: 140px;
  font-weight: 600;
  color: #2b5a7a;
}

.info-value {
  flex: 1;
  color: #1f3b4c;
}

.active-badge {
  background: #e1f7ed;
  color: #0e6e48;
  border-radius: 999px;
  padding: 0.15rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 700;
  margin-left: 0.5rem;
}

.nhif-detail {
  background: #eef3fc;
  border-radius: 0.9rem;
  padding: 0.75rem;
}

.toast-msg {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #fff;
  z-index: 1030;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
}

.toast-info {
  background: #1f3b4c;
}

.toast-success {
  background: #0e6e48;
}

.toast-warning {
  background: #a76812;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 767.98px) {
  .patient-list {
    max-height: 360px;
  }

  .info-label {
    width: 100%;
    margin-bottom: 0.1rem;
  }
}
</style>
