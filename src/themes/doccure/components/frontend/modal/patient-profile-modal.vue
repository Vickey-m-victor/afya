<template>
  <!--View Prescription -->
  <div class="modal fade custom-modals" id="view_prescription">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">View Prescription</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body pb-0">
          <div class="prescribe-download">
            <h5>21 Mar 2024</h5>
            <ul>
              <li>
                <a href="javascript:void(0);" class="print-link"
                  ><i class="fa-solid fa-print"></i
                ></a>
              </li>
              <li>
                <a href="#" class="btn btn-primary prime-btn">Download</a>
              </li>
            </ul>
          </div>
          <div class="view-prescribe invoice-content">
            <div class="invoice-item">
              <div class="row">
                <div class="col-md-6">
                  <div class="invoice-logo">
                    <img src="@/themes/doccure/assets/img/logo.png" alt="logo" />
                  </div>
                </div>
                <div class="col-md-6">
                  <p class="invoice-details">
                    <strong>Prescription ID :</strong> #PR-123 <br />
                    <strong>Issued:</strong> 21 Mar 2024
                  </p>
                </div>
              </div>
            </div>

            <!-- Invoice Item -->
            <div class="invoice-item">
              <div class="row">
                <div class="col-md-6">
                  <div class="invoice-info">
                    <h6 class="customer-text">Doctor Details</h6>
                    <p class="invoice-details invoice-details-two">
                      Edalin Hendry <br />
                      806 Twin Willow Lane, <br />
                      Newyork, USA <br />
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="invoice-info invoice-info2">
                    <h6 class="customer-text">Patient Details</h6>
                    <p class="invoice-details">
                      Adrian Marshall <br />
                      299 Star Trek Drive,<br />
                      Florida, 32405, USA <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Invoice Item -->

            <!-- Invoice Item -->
            <div class="invoice-item invoice-table-wrap">
              <div class="row">
                <div class="col-md-12">
                  <h6>Prescription Details</h6>
                  <div class="table-responsive">
                    <table class="invoice-table table table-bordered">
                      <thead>
                        <tr>
                          <th>Medicine Name</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                          <th>Duration</th>
                          <th>Timings</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Ecosprin 75MG [Asprin 75 MG Oral Tab]</td>
                          <td>75 mg <span>Oral Tab</span></td>
                          <td>1-0-0-1</td>
                          <td>1 month</td>
                          <td>Before Meal</td>
                        </tr>
                        <tr>
                          <td>Alexer 90MG Tab</td>
                          <td>90 mg <span>Oral Tab</span></td>
                          <td>1-0-0-1</td>
                          <td>1 month</td>
                          <td>Before Meal</td>
                        </tr>
                        <tr>
                          <td>Ramistar XL2.5</td>
                          <td>60 mg <span>Oral Tab</span></td>
                          <td>1-0-0-0</td>
                          <td>1 month</td>
                          <td>After Meal</td>
                        </tr>
                        <tr>
                          <td>Metscore</td>
                          <td>90 mg <span>Oral Tab</span></td>
                          <td>1-0-0-1</td>
                          <td>1 month</td>
                          <td>After Meal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Invoice Item -->

            <!-- Invoice Information -->
            <div class="other-info">
              <h4>Other information</h4>
              <p class="text-muted mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed
                dictum ligula, cursus blandit risus. Maecenas eget metus non tellus
                dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus.
                Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum.
                Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.
              </p>
            </div>
            <div class="other-info">
              <h4>Follow Up</h4>
              <p class="text-muted mb-0">
                Follow u p after 3 months, Have to come on empty stomach
              </p>
            </div>
            <div class="prescriber-info">
              <h6>Dr. Edalin Hendry</h6>
              <p>Dept of Cardiology</p>
            </div>
            <!-- /Invoice Information -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /View Prescription -->

  <!--View Prescription -->
  <div class="modal fade custom-modals" id="view_bill">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-end">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body pb-0">
          <div class="prescribe-download">
            <h5>View Billing</h5>
            <ul>
              <li>
                <a href="javascript:void(0);" class="print-link"
                  ><i class="fa-solid fa-print"></i
                ></a>
              </li>
              <li>
                <a href="#" class="btn btn-primary prime-btn">Download</a>
              </li>
            </ul>
          </div>
          <div class="view-prescribe invoice-content">
            <div class="invoice-item">
              <div class="row">
                <div class="col-md-6">
                  <div class="invoice-logo">
                    <img src="@/themes/doccure/assets/img/logo.png" alt="logo" />
                  </div>
                </div>
                <div class="col-md-6">
                  <p class="invoice-details">
                    <strong>Invoice No : </strong> #INV005<br />
                    <strong>Issued:</strong> 21 Mar 2024
                  </p>
                </div>
              </div>
            </div>

            <!-- Invoice Item -->
            <div class="invoice-item">
              <div class="row">
                <div class="col-md-4">
                  <div class="invoice-info">
                    <h6 class="customer-text">Billing From</h6>
                    <p class="invoice-details invoice-details-two">
                      Edalin Hendry <br />
                      806 Twin Willow Lane, <br />
                      Newyork, USA <br />
                    </p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="invoice-info">
                    <h6 class="customer-text">Billing To</h6>
                    <p class="invoice-details invoice-details-two">
                      Richard Wilson <br />
                      299 Star Trek Drive<br />
                      Florida, 32405, USA<br />
                    </p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="invoice-info invoice-info2">
                    <h6 class="customer-text">Payment Method</h6>
                    <p class="invoice-details">
                      Debit Card <br />
                      XXXXXXXXXXXX-2541<br />
                      HDFC Bank<br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Invoice Item -->

            <!-- Invoice Item -->
            <div class="invoice-item invoice-table-wrap">
              <div class="row">
                <div class="col-md-12">
                  <h6>Invoice Details</h6>
                  <div class="table-responsive">
                    <table class="invoice-table table table-bordered">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Quatity</th>
                          <th>VAT</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>General Consultation</td>
                          <td>1</td>
                          <td>$0</td>
                          <td>$150</td>
                        </tr>
                        <tr>
                          <td>Video Call</td>
                          <td>1</td>
                          <td>$0</td>
                          <td>$100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 col-xl-4 ms-auto">
                  <div class="table-responsive">
                    <table class="invoice-table-two table">
                      <tbody>
                        <tr>
                          <th>Subtotal:</th>
                          <td><span>$350</span></td>
                        </tr>
                        <tr>
                          <th>Discount:</th>
                          <td><span>-10%</span></td>
                        </tr>
                        <tr>
                          <th>Total Amount:</th>
                          <td><span>$315</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Invoice Item -->

            <!-- Invoice Information -->
            <div class="other-info mb-0">
              <h4>Other information</h4>
              <p class="text-muted mb-0">
                An account of the present illness, which includes the circumstances
                surrounding the onset of recent health changes and the chronology of
                subsequent events that have led the patient to seek medicine
              </p>
            </div>
            <!-- /Invoice Information -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /View Prescription -->

  <!-- Add Medical Records Modal -->
  <div class="modal fade custom-modals" id="add_medical_records">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Medical Record</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Title</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Select Patient</label>
                  <vue-select
                    :options="Patient"
                    id="selectpatients"
                    placeholder="Select Patient"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label"
                    >Start Date <span class="text-danger">*</span></label
                  >
                  <datepicker
                    v-model="startdate"
                    class="form-control datetimepicker"
                    :editable="true"
                    :input-format="dateFormat"
                    placeholder="Select Date"
                    :clearable="false"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Hospital Name</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-wrap">
                  <label class="col-form-label"
                    >Symptoms <span class="text-danger">*</span></label
                  >
                  <div class="input-block input-block-new mb-0">
                    <input
                      class="input-tags form-control"
                      id="inputBox3"
                      type="text"
                      data-role="tagsinput"
                      placeholder="Type New"
                      name="Label"
                      value="Fever, Headache"
                    />
                    <a href="#" class="input-text save-btn">Save</a>
                  </div>
                </div>
                <div class="form-wrap mb-0">
                  <label class="col-form-label">Report</label>
                  <div class="upload-file">
                    <input type="file" />
                    <p>Drop files or Click to upload</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a href="#" class="btn btn-gray">Cancel</a>
              <button type="submit" class="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Medical Records Modal -->

  <div class="modal fade custom-modals" id="edit_medical_records">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Edit Medical Record</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Title</label>
                  <input type="text" class="form-control" value="Echocardiogram	" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Select Patient</label>
                  <vue-select
                    :options="PatientOne"
                    id="selectpatientsone"
                    placeholder="Adrian Marshall"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label"
                    >Start Date <span class="text-danger">*</span></label
                  >
                  <datepicker
                    v-model="startdateOne"
                    class="form-control datetimepicker"
                    :editable="true"
                    :input-format="dateFormat"
                    placeholder="Select Date"
                    :clearable="false"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Hospital Name</label>
                  <input type="text" class="form-control" value="ENT Hospital" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-wrap">
                  <label class="col-form-label"
                    >Symptoms <span class="text-danger">*</span></label
                  >
                  <div class="input-block input-block-new mb-0">
                    <input
                      class="input-tags form-control"
                      id="inputBox3"
                      type="text"
                      data-role="tagsinput"
                      placeholder="Type New"
                      name="Label"
                      value="Fever, Headache"
                    />
                    <a href="#" class="input-text save-btn">Save</a>
                  </div>
                </div>
                <div class="form-wrap mb-0">
                  <label class="col-form-label">Report</label>
                  <div class="upload-file">
                    <input type="file" />
                    <p>Drop files or Click to upload</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a
                href="#"
                class="btn btn-gray"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Add Prescription -->
  <div class="modal fade custom-modals" id="add_prescription">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Prescription</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="patient-wrap">
              <div class="patient-info mt-0">
                <img src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg" alt="img" />
                <div class="user-patient">
                  <h6>#P0016</h6>
                  <h5>Adrian Marshall</h5>
                  <ul>
                    <li>Age : 42</li>
                    <li>Male</li>
                    <li>AB+ve</li>
                  </ul>
                </div>
              </div>
              <div class="patient-book patien-inv">
                <h6>#INV0001</h6>
                <p>1 November 2023</p>
              </div>
            </div>
            <div class="add-prescripe-info">
              <div class="row prescripe-cont">
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Name</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Type</label>
                    <vue-select :options="Type" id="patienttype" placeholder="Select" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Dosage</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Frequency</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Duration</label>
                    <vue-select
                      :options="Duration"
                      id="patientsduration"
                      placeholder="Select"
                    />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="d-flex align-items-center">
                    <div class="form-wrap w-100">
                      <label class="col-form-label">Instruction</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-wrap ms-2">
                      <label class="col-form-label d-block">&nbsp;</label>
                      <a href="#" @click="deleteMedications(index)" class="trash"
                        ><i class="fa-solid fa-trash-can"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row prescripe-cont"
                v-for="(Medications, index) in Medications"
                :key="index"
              >
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Name</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Type</label>
                    <vue-select :options="Type" placeholder="Select" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Dosage</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Frequency</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Duration</label>
                    <vue-select :options="Duration" placeholder="Select" />
                  </div>
                </div>
                <div class="col-xl-2 xol-lg-3 col-md-6">
                  <div class="d-flex align-items-center">
                    <div class="form-wrap w-100">
                      <label class="col-form-label">Instruction</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-wrap ms-2">
                      <label class="col-form-label d-block">&nbsp;</label>
                      <a href="#" @click="deleteMedications(index)" class="trash"
                        ><i class="fa-solid fa-trash-can"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-end">
              <a href="#" @click="addMedications" class="add-prescribe">Add More</a>
            </div>
            <div class="wrap-sign">
              <div class="row">
                <div class="col-md-12">
                  <div class="sign-wrapper">
                    <div class="upload-sign">
                      <p>Click here to sign</p>
                    </div>
                    <div class="info-name">
                      <h6>( Dr. Darren Elder )</h6>
                      <p>Signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a href="#" class="btn btn-gray">Cancel</a>
              <button type="submit" class="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Prescription -->

  <!-- Add Billing -->
  <div class="modal fade custom-modals" id="add_billing">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Billing</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="patient-wrap">
              <div class="patient-info">
                <img src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg" alt="img" />
                <div class="user-patient">
                  <h6>#P0016</h6>
                  <h5>Adrian Marshall</h5>
                  <ul>
                    <li>Age : 42</li>
                    <li>Male</li>
                    <li>AB+ve</li>
                  </ul>
                </div>
              </div>
              <div class="patient-book patien-inv">
                <h6>#INV0001</h6>
                <p>1 November 2023</p>
              </div>
            </div>
            <div class="add-billing-info">
              <div class="row bill-cont">
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label"
                      >Title <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="d-flex align-items-center">
                    <div class="form-wrap w-100">
                      <label class="col-form-label">Amount</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-wrap ms-2">
                      <label class="col-form-label d-block">&nbsp;</label>
                      <a href="#" class="trash">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-end">
              <a href="#" class="add-bill">Add More</a>
            </div>
            <div class="wrap-sign">
              <div class="row">
                <div class="col-md-12">
                  <div class="sign-wrapper">
                    <div class="upload-sign">
                      <p>Click here to sign</p>
                    </div>
                    <div class="info-name">
                      <h6>( Dr. Darren Elder )</h6>
                      <p>Signature</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a href="#" class="btn btn-gray">Cancel</a>
              <button type="submit" class="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Billing -->
</template>

<script>
import { ref } from "vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
export default {
  data() {
    return {
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
      Patient: ["Select Patient", "Adrian Marshall", "Kelly Stevens", "Catherine Gracey"],
      PatientOne: [
        "Select Patient",
        "Adrian Marshall",
        "Kelly Stevens",
        "Catherine Gracey",
      ],
      Type: ["Select", "Visit", "Online"],
      Duration: ["Select", "1 Month", "1 Day"],
      Medications: [],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/patient-profile");
    },
    addMedications() {
      this.Medications.push({});
    },
    deleteMedications(index) {
      this.Medications.splice(index, 1);
    },
  },
};
</script>
