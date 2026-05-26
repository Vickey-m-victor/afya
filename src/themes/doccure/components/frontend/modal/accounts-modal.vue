<template>
  <!-- Payment Request Moodal -->
  <div
    class="modal fade custom-modal custom-modal-two modal-lg"
    id="payment_request"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Payment Request
            <span class="text-danger request-id">Request ID : #RQ-1323</span>
          </h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i class="fa-solid fa-x"></i></span>
          </button>
        </div>
        <div class="modal-body">
          <form action="javascript:void(0)">
            <div class="input-block input-block-new">
              <label class="form-label">Request Amount</label>
              <input type="text" class="form-control" />
            </div>
            <div class="input-block input-block-new">
              <label class="form-label">Description</label>
              <textarea rows="3" class="form-control"></textarea>
            </div>
            <div class="form-set-button">
              <button class="btn btn-light" type="button">Cancel</button>
              <button class="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Payment Request Moodal -->

  <!-- Account Details Modal-->
  <div
    class="modal fade custom-modal custom-modal-two modal-lg"
    id="account_details"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Account Details</h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i class="fa-solid fa-x"></i></span>
          </button>
        </div>
        <div class="modal-body">
          <form action="javascript:void(0)">
            <div class="input-block input-block-new">
              <label class="form-label">Bank Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="input-block input-block-new">
              <label class="form-label">Branch Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="input-block input-block-new">
              <label class="form-label">Account Number</label>
              <input type="text" class="form-control" />
            </div>
            <div class="input-block input-block-new">
              <label class="form-label">Account Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-set-button">
              <button class="btn btn-light" type="button">Cancel</button>
              <button class="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Account Details Modal-->

  <!-- Other Accounts Modal-->
  <div
    class="modal fade custom-modal custom-modal-two modal-lg"
    id="other_accounts"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Other Accounts</h5>
          <button type="button" data-bs-dismiss="modal" aria-label="Close">
            <span><i class="fa-solid fa-x"></i></span>
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
                    <a href="javascript:void(0);">Current</a>
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
                    <a href="javascript:void(0);">Change to default</a>
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
                    <a href="javascript:void(0);">Change to default</a>
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
                    <a href="javascript:void(0);">Change to default</a>
                  </li>
                </ul>
              </li>
            </ul>
            <a href="" class="btn btn-blue w-100 mt-2" data-bs-dismiss="modal"
              >Close</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Other Accounts Modal-->

  <!-- Request Completed Modal-->
  <div
    class="modal fade custom-modal custom-modal-two"
    id="request_details_modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Request Details
            <span class="badge badge-success-bg">Completed</span>
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
                <span class="text-blue">$300</span>
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
                I recently completed a series of dental treatments with
                Dr.Edalin Hendry, and I couldn't be more pleased with the
                results. From my very first appointment.
              </p>
            </div>
            <a href="" class="btn btn-blue w-100" data-bs-dismiss="modal"
              >Close</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Request Completed Modal-->

  <!-- Request Cancel Modal-->
  <div
    class="modal fade custom-modal custom-modal-two"
    id="request_cancel_modal"
  >
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
                  <h6><router-link to="/doctor-upcoming-appointment">Adrian</router-link></h6>
                </div>
              </div>
              <div class="email-info">
                <ul>
                  <li><i class="fa-solid fa-envelope"></i>adran@example.com</li>
                  <li><i class="fa-solid fa-phone"></i>+1 504 368 6874</li>
                </ul>
              </div>
            </div>
            <div class="cancellation-fees">
              <h6>Consultation Fees : $200</h6>
              <div class="cancellation-info">
                <div class="appointment-type">
                  <p class="md-text">Type of Appointment</p>
                  <p>
                    <i class="fa-solid fa-building text-green"></i>Direct Visit
                  </p>
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
                I have an urgent surgery, while our Appointment so i am
                rejecting appointment
              </p>
              <span class="text-danger">Cancelled By You on 23 Mar 2024</span>
            </div>
            <span class="text-blue refund">Status : Refund Accepted</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Request Cancel Modal-->
</template>
