<template>
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
        <form>
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
                    :options="PatientGracey"
                    id="patiegracey"
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
                    class="datetimepicker form-control"
                    :editable="true"
                    :clearable="false"
                    :input-format="dateFormat"
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
                <label class="col-form-label"
                  >Symptoms <span class="text-danger">*</span></label
                >
                <div class="input-block input-block-new">
                  <vue3-tags-input
                    class="input-tags form-control"
                    type="text"
                    id="inputBox"
                    placeholder="Type New"
                    data-role="tagsinput"
                    name="Label"
                    value="Fever,Headache,Stomach Pain"
                    :tags="tags"
                  />

                  <a href="#" class="input-text save-btn">Save</a>
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
  <!-- /Add Medical Records Modal -->

  <!-- Edit Medical Records Modal -->
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
                  <input type="text" class="form-control" value="Glucose Test V12" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-wrap">
                  <label class="col-form-label">Select Patient</label>
                  <vue-select
                    :options="PatientGraceyone"
                    id="patietone"
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
                    class="datetimepicker form-control"
                    :editable="true"
                    :clearable="false"
                    :input-format="dateFormat"
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
                <label class="col-form-label"
                  >Symptoms <span class="text-danger">*</span></label
                >
                <div class="input-block input-block-new">
                  <vue3-tags-input
                    class="input-tags form-control"
                    type="text"
                    id="inputBox"
                    placeholder="Type New"
                    data-role="tagsinput"
                    name="Label"
                    value="Fever,Headache,Stomach Pain"
                    :tags="tags"
                  />
                  <a href="#" class="input-text save-btn">Save</a>
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
  <!-- /Edit Medical Records Modal -->

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
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
import Vue3TagsInput from "vue3-tags-input";
export default {
  components: {
    Vue3TagsInput,
  },
  data() {
    return {
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
      PatientGracey: [
        "Select Patient",
        "Adrian Marshall",
        "Kelly Stevens",
        "Catherine Gracey",
      ],
      PatientGraceyone: [
        "Select Patient",
        "Adrian Marshall",
        "Kelly Stevens",
        "Catherine Gracey",
      ],
      tags: ["Fever", "Headache", "Stomach", "Pain"],
    };
  },
};
</script>
