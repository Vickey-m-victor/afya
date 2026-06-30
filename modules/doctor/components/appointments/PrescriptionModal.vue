<template>
  <div>
    <!-- Appointment End Confirmation Modal -->
    <div class="modal fade" id="end_session" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body p-4 text-center">
            <div class="success-icon-wrap mb-4 d-inline-flex align-items-center justify-content-center bg-light-success text-success rounded-circle" style="width: 70px; height: 70px;">
              <i class="fa fa-calendar-check fs-2"></i>
            </div>
            <h3 class="fw-bold mb-2">Session Ended</h3>
            <p class="text-muted mb-4">Your Appointment session has been successfully completed and recorded.</p>
            <div class="d-flex justify-content-center gap-3">
              <RouterLink
                to="/doctor/appointments"
                class="btn btn-outline-secondary px-4 py-2"
                data-bs-dismiss="modal"
              >
                Go to Appointments
              </RouterLink>
              <button
                class="btn btn-primary px-4 py-2"
                data-bs-toggle="modal"
                data-bs-target="#view_prescription"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Details / Prescription Modal -->
    <div class="modal fade" id="view_prescription" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-bottom py-3 px-4">
            <h4 class="modal-title fw-bold text-dark mb-0">Prescription Sheet Details</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4 bg-light-slate">
            <!-- Prescription Box -->
            <div class="prescription-box bg-white p-4 border rounded shadow-sm">
              <!-- Header info -->
              <div class="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4 flex-wrap gap-3">
                <div>
                  <h3 class="fw-bold text-primary mb-1">AFYA365 CLINICS</h3>
                  <p class="text-muted mb-0 fs-sm">16, Wardlow, Buxton, Derbyshire, SK17 8RW.<br/>Phone: 01298 872268</p>
                </div>
                <div class="text-md-end">
                  <p class="fw-semibold text-dark mb-1">Date: {{ currentDate }}</p>
                  <p class="text-muted mb-0 fs-sm">Appointment ID: {{ appointment.idString }}</p>
                </div>
              </div>

              <!-- Doctor and Patient Detail Panel -->
              <div class="row border-bottom pb-4 mb-4">
                <div class="col-md-6 border-end pr-md-4">
                  <h6 class="fw-bold text-dark text-uppercase mb-2">Prescribing Doctor</h6>
                  <h5 class="fw-bold text-dark mb-1">Dr. Edalin Hendry</h5>
                  <p class="text-muted mb-0 fs-sm">BDS, MDS - Oral & Maxillofacial Surgery</p>
                  <p class="text-muted mb-0 fs-sm">Department of Dentistry</p>
                </div>
                <div class="col-md-6 pl-md-4 mt-3 mt-md-0">
                  <h6 class="fw-bold text-dark text-uppercase mb-2">Patient Details</h6>
                  <h5 class="fw-bold text-dark mb-1">{{ appointment.name }}</h5>
                  <p class="text-muted mb-0 fs-sm">Age/Gender: 28 Years / Female</p>
                  <p class="text-muted mb-0 fs-sm">Blood Group: O+ve</p>
                </div>
              </div>

              <!-- Vitals Row -->
              <div class="mb-4">
                <h6 class="fw-bold text-dark text-uppercase mb-3">Vitals</h6>
                <div class="row g-2">
                  <div class="col-6 col-sm-4 col-md-3" v-for="(val, label) in activeVitals" :key="label">
                    <div class="p-2 border rounded bg-light text-center">
                      <span class="d-block fs-xs text-muted fw-semibold text-uppercase">{{ label }}</span>
                      <span class="fw-bold text-dark fs-sm">{{ val || '—' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Previous Medical History -->
              <div class="mb-4" v-if="form.history">
                <h6 class="fw-bold text-dark text-uppercase mb-2">Previous Medical History</h6>
                <p class="text-secondary fs-sm mb-0 p-3 bg-light rounded border-start border-primary border-3">{{ form.history }}</p>
              </div>

              <!-- Clinical Notes -->
              <div class="mb-4" v-if="form.notes || (form.clinicalNotesTags && form.clinicalNotesTags.length)">
                <h6 class="fw-bold text-dark text-uppercase mb-2">Clinical Notes</h6>
                <p class="text-secondary fs-sm mb-2" v-if="form.notes">{{ form.notes }}</p>
                <div class="d-flex flex-wrap gap-1" v-if="form.clinicalNotesTags && form.clinicalNotesTags.length">
                  <span class="badge bg-light-primary text-primary" v-for="tag in form.clinicalNotesTags" :key="tag">{{ tag }}</span>
                </div>
              </div>

              <!-- Complaints & Diagnosis -->
              <div class="mb-4" v-if="form.complaintsTags && form.complaintsTags.length">
                <h6 class="fw-bold text-dark text-uppercase mb-2">Complaints & Diagnosis</h6>
                <div class="table-responsive">
                  <table class="table table-bordered table-sm fs-sm">
                    <thead class="table-light">
                      <tr>
                        <th>Complaint</th>
                        <th>Diagnosis / Findings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="tag in form.complaintsTags" :key="tag">
                        <td class="fw-semibold text-dark">{{ tag }}</td>
                        <td>{{ form.diagnosis[tag] || 'Under evaluation' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Medications -->
              <div class="mb-4" v-if="form.medications && form.medications.length">
                <h6 class="fw-bold text-dark text-uppercase mb-2">Prescribed Medications</h6>
                <div class="table-responsive">
                  <table class="table table-bordered table-sm fs-sm">
                    <thead class="table-light">
                      <tr>
                        <th>SNo</th>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                        <th>Instructions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(med, idx) in form.medications" :key="idx">
                        <td>{{ idx + 1 }}</td>
                        <td class="fw-semibold text-dark">{{ med.name || '—' }} <span class="badge bg-secondary-light text-secondary fs-xs">{{ med.type }}</span></td>
                        <td>{{ med.dosage || '—' }}</td>
                        <td>{{ med.frequency || '—' }}</td>
                        <td>{{ med.duration || '—' }}</td>
                        <td>{{ med.instruction || '—' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Lab Tests -->
              <div class="mb-4" v-if="form.labTestsTags && form.labTestsTags.length">
                <h6 class="fw-bold text-dark text-uppercase mb-2">Laboratory Tests</h6>
                <div class="d-flex flex-wrap gap-1">
                  <span class="badge bg-light-info text-info border border-info" v-for="tag in form.labTestsTags" :key="tag">{{ tag }}</span>
                </div>
              </div>

              <!-- Advice & Follow Up -->
              <div class="row">
                <div class="col-md-6 mb-3 mb-md-0" v-if="form.advice">
                  <h6 class="fw-bold text-dark text-uppercase mb-2">Doctor's Advice</h6>
                  <p class="text-secondary fs-sm mb-0">{{ form.advice }}</p>
                </div>
                <div class="col-md-6" v-if="form.followUp">
                  <h6 class="fw-bold text-dark text-uppercase mb-2">Follow Up Instruction</h6>
                  <p class="text-secondary fs-sm mb-0"><i class="fa fa-calendar-day me-1 text-primary"></i>{{ form.followUp }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top py-3 px-4 d-flex justify-content-between">
            <button
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary" @click="printPrescription">
                <i class="fa fa-print me-1"></i> Print
              </button>
              <button class="btn btn-primary" @click="downloadPrescription">
                <i class="fa fa-download me-1"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  appointment: {
    type: Object,
    default: () => ({})
  },
  form: {
    type: Object,
    default: () => ({})
  }
});

const currentDate = computed(() => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
});

const activeVitals = computed(() => {
  if (!props.form.vitals) return {};
  const v = props.form.vitals;
  return {
    'Temp': v.temperature ? `${v.temperature} °F` : null,
    'Pulse': v.pulse ? `${v.pulse} mmHg` : null,
    'Resp Rate': v.respRate ? `${v.respRate} rpm` : null,
    'SPO2': v.spo2 ? `${v.spo2} %` : null,
    'Height': v.height ? `${v.height} cm` : null,
    'Weight': v.weight ? `${v.weight} kg` : null,
    'Waist': v.waist ? `${v.waist} cm` : null,
    'BMI': v.bmi ? `${v.bmi} kg/cm` : null
  };
});

function printPrescription() {
  window.print();
}

function downloadPrescription() {
  alert("Prescription report download triggered successfully.");
}
</script>

<style scoped>
.bg-light-success {
  background-color: rgba(16, 185, 129, 0.1);
}
.bg-light-primary {
  background-color: rgba(6, 101, 208, 0.1);
}
.bg-light-info {
  background-color: rgba(14, 165, 233, 0.1);
}
.bg-light-slate {
  background-color: #f1f5f9;
}
.prescription-box {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
}
.border-primary {
  border-color: #0665d0 !important;
}
</style>
