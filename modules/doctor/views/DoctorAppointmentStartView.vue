<template>
  <div class="bg-body-light">
    <!-- Breadcrumb Area -->
    <DoctorBreadcrumb title="Start Appointment" :items="breadcrumbItems" />

    <!-- Main Content -->
    <div class="content content-boxed pb-5 mt-4">
      <div class="row">
        <!-- Profile Sidebar -->
        <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
          <div class="stickysidebar">
            <DoctorSidebar />
          </div>
        </div>

        <!-- Appointment Details and Input Forms -->
        <div class="col-md-7 col-lg-8 col-xl-9">
          <!-- Back header -->
          <div class="dashboard-header mb-4 pb-2 border-bottom d-flex align-items-center justify-content-between flex-wrap">
            <div class="d-flex align-items-center gap-3">
              <RouterLink to="/doctor/appointments" class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                <i class="fa fa-arrow-left"></i>
              </RouterLink>
              <h3 class="mb-0 text-dark fw-bold">Appointment Details</h3>
            </div>
          </div>

          <!-- Appointment Detail Card -->
          <div class="appointment-detail-card shadow-sm">
            <ul>
              <li>
                <div class="patinet-information">
                  <a href="javascript:void(0)">
                    <img :src="appointment.avatar" alt="Patient Image" />
                  </a>
                  <div class="patient-info">
                    <p class="mb-1 text-primary fw-semibold">{{ appointment.idString }}</p>
                    <h6 class="mb-2 fw-bold"><a href="javascript:void(0)" class="text-dark">{{ appointment.name }}</a></h6>
                    <div class="mail-info-patient">
                      <ul class="list-unstyled mb-0 d-flex gap-3 fs-xs text-muted">
                        <li><i class="fa fa-envelope me-1 text-secondary"></i>{{ appointment.email }}</li>
                        <li><i class="fa fa-phone me-1 text-secondary"></i>{{ appointment.phone }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="appointment-info mt-3 mt-md-0">
                <div class="person-info mb-2">
                  <p class="mb-1 text-muted fs-xs fw-semibold uppercase">Person with patient</p>
                  <span class="badge bg-light text-dark border px-2 py-1">Andrew (45)</span>
                </div>
                <div class="person-info">
                  <p class="mb-1 text-muted fs-xs fw-semibold uppercase">Type of Appointment</p>
                  <span class="badge bg-light text-dark border px-2 py-1"><i class="fa fa-hospital me-1 text-success"></i>Direct Visit</span>
                </div>
              </li>
              <li class="appointment-action mt-3 mt-md-0 text-md-end">
                <div class="detail-badge-info mb-2">
                  <span class="badge bg-warning text-dark px-3 py-1 rounded">Upcoming</span>
                </div>
                <div class="consult-fees">
                  <h6 class="mb-0 fw-bold text-dark fs-sm">Consultation Fees: $200</h6>
                </div>
              </li>
            </ul>
            <ul class="detail-card-bottom-info">
              <li>
                <h6>Appointment Date & Time</h6>
                <span>22 Jul 2026 - 12:00 pm</span>
              </li>
              <li>
                <h6>Clinic Location</h6>
                <span>Adrian’s Dentistry</span>
              </li>
              <li>
                <h6>Location</h6>
                <span>New York, United States</span>
              </li>
              <li>
                <h6>Visit Type</h6>
                <span>General</span>
              </li>
              <li>
                <div class="start-btn mt-1">
                  <span class="btn btn-secondary btn-sm px-3 py-1 fw-bold cursor-default" style="cursor: default;">Inprogress</span>
                </div>
              </li>
            </ul>
          </div>
          <!-- /Appointment Detail Card -->

          <!-- Create Appointment Forms -->
          <div class="create-appointment-details">
            <!-- Timer countdown -->
            <div class="session-end-head d-flex justify-content-between align-items-center shadow-sm">
              <h6 class="mb-0"><span class="fw-bold"><i class="fa fa-hourglass-half me-1"></i>Session Ends in</span>{{ timerString }}</h6>
            </div>

            <h5 class="fw-bold mb-3 text-dark">Create Appointment Details</h5>

            <div class="create-details-card shadow-sm">
              <div class="create-details-card-head">
                <h5 class="mb-0 fw-bold">Patient Information Summary</h5>
              </div>
              <div class="p-3 bg-light border-bottom">
                <div class="row text-center text-md-start">
                  <div class="col-6 col-md-3 border-end">
                    <span class="d-block fs-xs text-muted fw-semibold">Age / Gender</span>
                    <span class="fw-bold text-dark">28 Years / Female</span>
                  </div>
                  <div class="col-6 col-md-3 border-end">
                    <span class="d-block fs-xs text-muted fw-semibold">Address</span>
                    <span class="fw-bold text-dark">New York, US</span>
                  </div>
                  <div class="col-6 col-md-3 border-end">
                    <span class="d-block fs-xs text-muted fw-semibold">Blood Group</span>
                    <span class="fw-bold text-dark">O+ve</span>
                  </div>
                  <div class="col-6 col-md-3">
                    <span class="d-block fs-xs text-muted fw-semibold">No of Visits</span>
                    <span class="fw-bold text-dark">0</span>
                  </div>
                </div>
              </div>

              <div class="create-details-card-body">
                <form @submit.prevent>
                  <!-- Vitals Set -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Patient Vitals</h5>
                    </div>
                    <div class="row g-3">
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">Temperature</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.temperature" type="text" class="form-control" placeholder="Eg: 97.8" />
                            <span class="input-group-text">F</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">Pulse</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.pulse" type="text" class="form-control" placeholder="Eg: 64" />
                            <span class="input-group-text">mmHg</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">Respiratory Rate</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.respRate" type="text" class="form-control" placeholder="Eg: 16" />
                            <span class="input-group-text">rpm</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">SPO2</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.spo2" type="text" class="form-control" placeholder="Eg: 98" />
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">Height</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.height" type="text" class="form-control" placeholder="Eg: 159" />
                            <span class="input-group-text">cm</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">Weight</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.weight" type="text" class="form-control" placeholder="Eg: 64" />
                            <span class="input-group-text">Kg</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">Waist</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.waist" type="text" class="form-control" placeholder="Eg: 97.8" />
                            <span class="input-group-text">cm</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-4 col-xl-3">
                        <div class="input-block input-block-new">
                          <label class="form-label">BMI</label>
                          <div class="input-text-field">
                            <input v-model="form.vitals.bmi" type="text" class="form-control" placeholder="Eg: 25.1" />
                            <span class="input-group-text">kg/cm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Medical History -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Previous Medical History</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <textarea v-model="form.history" class="form-control" rows="3" placeholder="Enter patient previous medical history..."></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Clinical Notes Input Text -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Clinical Notes Comments</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <textarea v-model="form.notes" class="form-control" rows="3" placeholder="Enter clinical notes..."></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Clinical Notes Tags -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Clinical Notes Tags</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <TagsInput v-model="form.clinicalNotesTags" placeholder="Type clinical note and press Enter" />
                      </div>
                    </div>
                  </div>

                  <!-- Laboratory Tests -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Laboratory Tests</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <TagsInput v-model="form.labTestsTags" placeholder="Type laboratory test name and press Enter" />
                      </div>
                    </div>
                  </div>

                  <!-- Complaints -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Complaints</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <TagsInput v-model="form.complaintsTags" placeholder="Type patient complaint and press Enter" />
                      </div>
                    </div>
                  </div>

                  <!-- Diagnosis (dynamic list based on complaints) -->
                  <div class="start-appointment-set" v-if="form.complaintsTags && form.complaintsTags.length">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Diagnosis Details</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div v-for="tag in form.complaintsTags" :key="tag" class="input-field-set align-items-center mb-3">
                          <label class="form-label mb-0 fw-semibold text-dark">{{ tag }}</label>
                          <input
                            v-model="form.diagnosis[tag]"
                            type="text"
                            class="form-control"
                            placeholder="Enter Diagnosis description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Medications -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Medications</h5>
                    </div>
                    <div class="row meditation-row">
                      <Medications v-model="form.medications" />
                    </div>
                  </div>

                  <!-- Advice -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Doctor's Advice</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <textarea v-model="form.advice" class="form-control" rows="3" placeholder="Enter advice for patient..."></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Follow Up -->
                  <div class="start-appointment-set">
                    <div class="form-bg-title">
                      <h5 class="fw-bold mb-3">Follow Up Instruction</h5>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <textarea v-model="form.followUp" class="form-control" rows="3" placeholder="Enter follow up details (eg: 3 months from now)..."></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Save buttons -->
                  <div class="col-md-12">
                    <div class="form-set-button">
                      <RouterLink to="/doctor/appointments" class="btn btn-light px-4 py-2 border">Cancel</RouterLink>
                      <button
                        class="btn btn-primary px-4 py-2"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#end_session"
                      >
                        Save & End Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <PrescriptionModal :appointment="appointment" :form="form" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import DoctorSidebar from '../components/DoctorSidebar.vue';
import DoctorBreadcrumb from '../components/DoctorBreadcrumb.vue';
import TagsInput from '../components/appointments/TagsInput.vue';
import Medications from '../components/appointments/Medications.vue';
import PrescriptionModal from '../components/appointments/PrescriptionModal.vue';

const breadcrumbItems = [
  { name: 'Home', route: '/' },
  { name: 'Doctor', route: '/doctor/dashboard' },
  { name: 'Appointments', route: '/doctor/appointments' },
  { name: 'Start Appointment', route: null }
];

const appointment = reactive({
  id: 2,
  idString: "#Apt0002",
  name: "Kelly Joseph",
  avatar: "/assets/media/avatars/patient2.png",
  email: "kelly@example.com",
  phone: "+1 832 891 8403"
});

const form = reactive({
  vitals: {
    temperature: "97.8",
    pulse: "64",
    respRate: "16",
    spo2: "98",
    height: "159",
    weight: "64",
    waist: "97.8",
    bmi: "25.1"
  },
  history: "The patient has a history of type 2 diabetes mellitus diagnosed in 2018, well-controlled on metformin.",
  notes: "Patient presents with a 3-day history of worsening cough and mild fever.",
  clinicalNotesTags: ["Skin Allergy"],
  labTestsTags: ["Hemoglobin A1c (HbA1c)", "Liver Function Tests (LFTs)"],
  complaintsTags: ["Fever", "Headache", "Stomach Pain"],
  diagnosis: {
    "Fever": "Acute viral fever",
    "Headache": "Tension headache",
    "Stomach Pain": "Mild gastroenteritis"
  },
  medications: [
    { name: "Ecosprin 75MG", type: "Oral Tab", dosage: "75 mg", frequency: "1-0-0-1", duration: "1 Month", instruction: "Take after meals" },
    { name: "Ramistar XL 2.5", type: "Oral Tab", dosage: "2.5 mg", frequency: "1-0-0-0", duration: "1 Month", instruction: "Take in the morning" }
  ],
  advice: "Avoid cold water. Rest and take light meals.",
  followUp: "Review after 3 months. Lab test for blood glucose level before arrival."
});

// Countdown Timer logic
const timeLeft = ref(480); // 8 minutes in seconds
const timerString = ref('08M:00S');
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
      const mins = Math.floor(timeLeft.value / 60).toString().padStart(2, '0');
      const secs = (timeLeft.value % 60).toString().padStart(2, '0');
      timerString.value = `${mins}M:${secs}S`;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.appointment-detail-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: #fff;
  padding: 24px;
  margin-bottom: 24px;
}
.appointment-detail-card > ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}
@media (max-width: 991.98px) {
  .appointment-detail-card > ul {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
.patinet-information {
  display: flex;
  align-items: center;
  min-width: 175px;
}
.patinet-information img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 15px;
  object-fit: cover;
}
.detail-card-bottom-info {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 20px 0 0 0;
  margin: 20px 0 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
}
@media (max-width: 767.98px) {
  .detail-card-bottom-info {
    flex-direction: column;
    gap: 16px;
  }
}
.detail-card-bottom-info li h6 {
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 4px;
}
.detail-card-bottom-info li span {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.session-end-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}
.session-end-head h6 {
  margin-bottom: 0;
  font-size: 14px;
  color: #991b1b;
  font-weight: 600;
}
.session-end-head h6 span {
  color: #ef4444;
  margin-right: 8px;
}

.create-details-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  margin-bottom: 24px;
  overflow: hidden;
}
.create-details-card-head {
  background: #f8fafc;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 20px;
}
.create-details-card-head h5 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0;
}
.patient-info-box .info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.patient-info-box .info-list li {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.patient-info-box .info-list li h6 {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-top: 4px;
  margin-bottom: 0;
}

.create-details-card-body {
  padding: 24px;
}
.start-appointment-set {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.start-appointment-set:last-child {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}
.form-bg-title {
  margin-bottom: 20px;
}
.form-bg-title h5 {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0;
  position: relative;
  padding-left: 10px;
}
.form-bg-title h5::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 14px;
  background: #0665d0;
  border-radius: 20px;
}

.input-block-new {
  margin-bottom: 20px;
}
.input-block-new label {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 6px;
}
.input-text-field {
  display: flex;
  position: relative;
}
.input-text-field .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 42px;
  border-color: #cbd5e1;
}
.input-text-field .input-group-text {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-left: 0;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.input-field-set {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}
@media (max-width: 575.98px) {
  .input-field-set {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
.input-field-set label {
  width: 120px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0;
  flex-shrink: 0;
}

.form-set-button {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}
</style>
