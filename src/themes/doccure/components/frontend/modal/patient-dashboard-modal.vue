<template>
  <!-- Add Dependent Modal-->
  <div class="modal fade custom-modals" id="add_dependent">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Dependant</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="javascript:void(0)">
          <div class="add-dependent">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-wrap pb-0">
                    <div class="change-avatar img-upload">
                      <div class="profile-img">
                        <i class="fa-solid fa-file-image"></i>
                      </div>
                      <div class="upload-img">
                        <h5>Profile Image</h5>
                        <div class="imgs-load d-flex align-items-center">
                          <div class="change-photo">
                            Upload New
                            <input type="file" class="upload" />
                          </div>
                          <a href="#" class="upload-remove">Remove</a>
                        </div>
                        <p>Your Image should Below 4 MB, Accepted format jpg,png,svg</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Name</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Relationship</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label"
                      >DOB <span class="text-danger">*</span></label
                    >
                    <div class="form-icon">
                      <datepicker
                        v-model="startdate"
                        class="form-control datetimepicker"
                        :editable="true"
                        :input-format="dateFormat"
                        placeholder="Select Date"
                        :clearable="false"
                      />
                      <span class="icon"
                        ><i class="fa-regular fa-calendar-days"></i
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Select Gender</label>
                    <vue-select :options="FemaSel" id="femasel" placeholder="Select" />
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
  <!-- /Add Dependent Modal-->

  <!--View Invoice -->
  <div class="modal fade custom-modals" id="invoice_view">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">View Invoice</h3>
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
  <!-- /View Invoice -->

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
            ch
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
export default {
  data() {
    return {
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
      FemaSel: ["Select", "Male", "Female"],
    };
  },
};
</script>
