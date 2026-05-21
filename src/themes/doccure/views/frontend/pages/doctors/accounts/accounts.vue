<template>
  <!-- Main Wrapper -->
  <div class="main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <!-- Page Content -->
    <div class="content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>
          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="accunts-sec">
              <div class="dashboard-header">
                <div class="header-back">
                  <h3>Accounts</h3>
                </div>
              </div>
              <div class="account-details-box">
                <div class="row">
                  <div class="col-xxl-6 col-lg-7">
                    <div class="account-payment-info">
                      <h4>Statistics</h4>
                      <div class="row">
                        <div class="col-lg-4 col-md-6">
                          <div class="payment-amount">
                            <h6>
                              <i class="fa-solid fa-file-invoice-dollar text-success"></i
                              >Total Balance
                            </h6>
                            <span>$900</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div class="payment-amount">
                            <h6>
                              <i class="fa-solid fa-money-bill-1 text-orange"></i>Earned
                            </h6>
                            <span>$906</span>
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                          <div class="payment-amount">
                            <h6>
                              <i class="fa-solid fa-circle-question text-pink"></i
                              >Requested
                            </h6>
                            <span>$50</span>
                          </div>
                        </div>
                      </div>
                      <div class="payment-request">
                        <span>Last Payment request : 24 Mar 2023</span>
                        <a
                          href="#payment_request"
                          class="btn btn-blue"
                          data-bs-toggle="modal"
                          >Request Payment</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-xxl-1 d-lg-none d-xxl-block"></div>
                  <div class="col-lg-5">
                    <div class="bank-details-info">
                      <h3>Bank Details</h3>
                      <ul>
                        <li>
                          <h6>Bank Name</h6>
                          <h5>Citi Bank Inc</h5>
                        </li>
                        <li>
                          <h6>Account Number</h6>
                          <h5>5396 5250 1908 XXXX</h5>
                        </li>
                        <li>
                          <h6>Branch Name</h6>
                          <h5>London</h5>
                        </li>
                        <li>
                          <h6>Account Name</h6>
                          <h5>Darren</h5>
                        </li>
                      </ul>
                      <div class="edit-detail-link">
                        <a href="#account_details" data-bs-toggle="modal">Edit Details</a>
                        <a href="#other_accounts" data-bs-toggle="modal"
                          >Other Accounts</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="account-detail-table">
                  <!-- Tab Menu -->
                  <nav class="accounts-tab">
                    <ul class="nav nav-tabs-bottom">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          href="#pat_accounts"
                          data-bs-toggle="tab"
                          >Accounts</a
                        >
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#pat_refundrequest" data-bs-toggle="tab"
                          >Refund Request</a
                        >
                      </li>
                    </ul>
                  </nav>
                  <!-- /Tab Menu -->

                  <!-- Tab Content -->
                  <div class="tab-content pt-0">
                    <!-- Accounts Tab -->
                    <accounts-tab></accounts-tab>
                    <!-- /Accounts Tab -->

                    <!-- Refund Request Tab -->
                    <refund-request-tab></refund-request-tab>
                    <!-- /Refund Request Tab -->
                  </div>
                  <!-- Tab Content -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->
    <doctor-footer></doctor-footer>
  </div>
  <accounts-modal></accounts-modal>
</template>
<script>
export default {
  data() {
    return {
      title: "Doctor",
      text: "Accounts",
      text1: "Accounts",
    };
  },
};
</script>
