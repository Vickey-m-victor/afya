<template>
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
                An account of the present illness, which includes the
                circumstances surrounding the onset of recent health changes and
                the chronology of subsequent events that have led the patient to
                seek medicine
              </p>
            </div>
            <!-- /Invoice Information -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
