<template>
  <!-- Payment Moodal -->
  <div class="modal fade custom-modals" id="payment_request">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Payment</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="#">
          <div class="modal-body pb-0">
            <div class="mb-3">
              <label class="form-label"
                >Enter Amount <span class="text-danger">*</span></label
              >
              <input type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label"
                >Select Payment Gateway <span class="text-danger">*</span></label
              >
              <vue-select :options="PatientGate" id="patientgate" placeholder="Select" />
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a
                href="#"
                class="btn btn-md btn-dark rounded-pill"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-md btn-primary-gradient rounded-pill">
                Add to Wallet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Payment Moodal -->

  <!-- Account Details Modal-->
  <div class="modal fade custom-modals" id="add_card">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Card</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="#">
          <div class="modal-body pb-0">
            <div class="mb-3">
              <label class="form-label"
                >Card Holder Name <span class="text-danger">*</span></label
              >
              <input type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label"
                >Card Number <span class="text-danger">*</span></label
              >
              <input type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label"
                >Expire Date <span class="text-danger">*</span></label
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
                <span class="icon"><i class="isax isax-calendar-1"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">CVV <span class="text-danger">*</span></label>
              <input type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Branch <span class="text-danger">*</span></label>
              <vue-select :options="BranchPati" id="branchpati" placeholder="Select" />
            </div>
          </div>
          <div class="modal-footer">
            <div
              class="modal-btn d-flex align-items-center justify-content-between flex-wrap gap-3 w-100"
            >
              <div class="form-check d-flex">
                <input class="form-check-input" type="checkbox" id="mark" />
                <label class="form-check-label fs-14 ms-2" for="mark">
                  Mark as Default
                </label>
              </div>
              <div>
                <a
                  href="#"
                  class="btn btn-md btn-dark rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  >Cancel</a
                >
                <button
                  type="submit"
                  class="btn btn-md btn-primary-gradient rounded-pill"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Account Details Modal-->

  <!-- Account Details Modal-->
  <div class="modal fade custom-modals" id="edit_card">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Card</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="#">
          <div class="modal-body pb-0">
            <div class="mb-3">
              <label class="form-label"
                >Card Holder Name <span class="text-danger">*</span></label
              >
              <input type="text" class="form-control" value="Darren" />
            </div>
            <div class="mb-3">
              <label class="form-label"
                >Card Number <span class="text-danger">*</span></label
              >
              <input type="text" class="form-control" value="5396 5250 1908 1647" />
            </div>
            <div class="mb-3">
              <label class="form-label"
                >Expire Date <span class="text-danger">*</span></label
              >
              <div class="form-icon">
                <datepicker
                  v-model="startdateOne"
                  class="form-control datetimepicker"
                  :editable="true"
                  :input-format="dateFormat"
                  placeholder="Select Date"
                  :clearable="false"
                />
                <span class="icon"><i class="isax isax-calendar-1"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">CVV <span class="text-danger">*</span></label>
              <input type="text" class="form-control" value="556" />
            </div>
            <div class="mb-3">
              <label class="form-label">Branch <span class="text-danger">*</span></label>
              <vue-select :options="BwrPati" id="bwrpati" placeholder="London" />
            </div>
          </div>
          <div class="modal-footer">
            <div
              class="modal-btn d-flex align-items-center justify-content-between flex-wrap gap-3 w-100"
            >
              <div class="form-check d-flex">
                <input class="form-check-input" type="checkbox" id="mark1" checked />
                <label class="form-check-label fs-14 ms-2" for="mark1">
                  Mark as Default
                </label>
              </div>
              <div>
                <a
                  href="#"
                  class="btn btn-md btn-dark rounded-pill"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  >Cancel</a
                >
                <button
                  type="submit"
                  class="btn btn-md btn-primary-gradient rounded-pill"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Account Details Modal-->

  <!-- Other Accounts Modal-->
  <div class="modal fade custom-modals modal-lg" id="other_accounts">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Other Accounts</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="other-accounts-info">
            <ul>
              <li>
                <ul class="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>Citi Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>5396 5250 1908 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>London</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Current</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul class="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>HDFC Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>7382 4924 4924 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>New York</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Change to default</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul class="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>Union Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>8934 4902 9024 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>Chicago</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Change to default</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul class="other-bank-info">
                  <li>
                    <h6>Name</h6>
                    <span>KVB Bank Inc</span>
                  </li>
                  <li>
                    <h6>Account No</h6>
                    <span>5892 4920 4829 XXXX</span>
                  </li>
                  <li>
                    <h6>Branch</h6>
                    <span>Austin</span>
                  </li>
                  <li>
                    <h6>Name on Bank Account</h6>
                    <span>Edalin Hendry</span>
                  </li>
                  <li>
                    <a href="#">Change to default</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-btn text-end">
            <button
              type="submit"
              class="btn btn-md btn-primary-gradient rounded-pill"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Other Accounts Modal-->

  <!-- Request Completed Modal-->
  <div class="modal fade custom-modal custom-modal-two" id="request_details_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Request Details <span class="badge badge-success-bg">Completed</span>
          </h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i class="fa-solid fa-x"></i></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="completed-request">
            <ul>
              <li>
                <h6>ID</h6>
                <span>#AC-1234</span>
              </li>
              <li>
                <h6>Requested on</h6>
                <span>24 Mar 2024</span>
              </li>
              <li>
                <h6>Credited Date</h6>
                <span>24 Mar 2024</span>
              </li>
              <li>
                <h6>Amount</h6>
                <span class="link-primary">$300</span>
              </li>
            </ul>
            <div class="bank-detail">
              <h4>Bank Details</h4>
              <div class="accont-information">
                <h6>Name</h6>
                <span>Citi Bank Inc</span>
              </div>
              <div class="accont-information">
                <h6>Account No</h6>
                <span>5396 5250 1908 XXXX</span>
              </div>
              <div class="accont-information">
                <h6>Branch</h6>
                <span>London</span>
              </div>
            </div>
            <div class="request-des">
              <h4>Reqeust Description</h4>
              <p>
                I recently completed a series of dental treatments with Dr.Edalin Hendry,
                and I couldn't be more pleased with the results. From my very first
                appointment.
              </p>
            </div>
            <a href="#" class="btn btn-primary prime-btn w-100" data-bs-dismiss="modal"
              >Close</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Request Completed Modal-->

  <!-- Request Cancel Modal-->
  <div class="modal fade custom-modal custom-modal-two" id="request_cancel_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Request Details <span class="badge badge-danger-bg">Cancelled</span>
          </h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i class="fa-solid fa-x"></i></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="cancelled-request">
            <div class="canceled-user-info d-flex align-items-center">
              <div class="patinet-information">
                <router-link to="/doctor-upcoming-appointment">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0001</p>
                  <h6>
                    <router-link to="/doctor-upcoming-appointment">Adrian</router-link>
                  </h6>
                </div>
              </div>
              <div class="email-info">
                <ul>
                  <li><i class="isax isax-sms5"></i>adran@example.com</li>
                  <li><i class="isax isax-call5"></i>+1 504 368 6874</li>
                </ul>
              </div>
            </div>
            <div class="cancellation-fees">
              <h6>Consultation Fees : $200</h6>
              <div class="cancellation-info">
                <div class="appointment-type">
                  <p class="md-text">Type of Appointment</p>
                  <p><i class="fa-solid fa-building text-green"></i>Direct Visit</p>
                </div>
                <div class="appointment-type">
                  <p class="md-text">Clinic Location</p>
                  <p>Adrian’s Dentistry</p>
                </div>
              </div>
            </div>
            <div class="cancel-reason">
              <h5>Reason</h5>
              <p>
                I have an urgent surgery, while our Appointment so i am rejecting
                appointment
              </p>
              <span class="text-danger">Cancelled By You on 23 Mar 2024</span>
            </div>
            <div class="refund-status">
              <span class="link-primary refund">Status : Initiated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Request Cancel Modal-->

  <!-- Refund Request Modal-->
  <div class="modal fade info-modal" id="refund-request">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="success-wrap text-center">
            <span class="icon-success"><i class="fa-solid fa-calendar-check"></i></span>
            <h3>Refund initiated Successfully</h3>
            <p>Your Payment will be credited in your bank account in 3 working days</p>
            <a href="#" class="btn btn-primary prime-btn" data-bs-dismiss="modal">Okay</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Refund Request Modal-->
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
      BwrPati: ["Select", "London", "Newyork"],
      PatientGate: ["Select", "Card,", "Paypal"],
      BranchPati: ["Select", "London", "Newyork"],
    };
  },
};
</script>
