<template>
  <!-- Accounts Tab -->
  <div class="tab-pane fade" id="pat_refundrequest">
    <ul class="header-list-btns d-inline-block mb-4">
      <li>
        <div class="input-block dash-search-input">
          <input type="text" class="form-control" placeholder="Search" />
          <span class="search-icon"
            ><i class="fa-solid fa-magnifying-glass"></i
          ></span>
        </div>
      </li>
    </ul>
    <div class="custom-new-table">
      <div class="table-responsive">
        <table class="table table-hover table-center mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Appointment Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1234</a>
              </td>
              <td>
                <div class="table-avtatar">
                  <router-link to="/doctor-profile"
                    ><img
                      src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg"
                      alt="Img"
                    />Edalin Hendry</router-link
                  >
                </div>
              </td>
              <td>24 Mar 2024 - 10:30 AM</td>
              <td>$300</td>
              <td>
                <span class="badge badge-warning-bg">Pending</span>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <a href="#" class="account-action"
                    ><i class="fa-solid fa-link"></i
                  ></a>
                </div>
              </td>
              <td>
                <span
                  ><a
                    href="#refund-request"
                    data-bs-toggle="modal"
                    class="text-blue"
                    >Initiate Payment</a
                  ></span
                >
              </td>
            </tr>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1235</a>
              </td>
              <td>
                <div class="table-avtatar">
                  <router-link to="/doctor-profile"
                    ><img
                      src="@/themes/doccure/assets/img/doctors/doctor-thumb-01.jpg"
                      alt="Img"
                    />Shanta Neill</router-link
                  >
                </div>
              </td>
              <td>28 Mar 2024 - 11:15 AM</td>
              <td>$250</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <a
                    href="#request_details_modal"
                    class="account-action"
                    data-bs-toggle="modal"
                    ><i class="fa-solid fa-link"></i
                  ></a>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1236</a>
              </td>
              <td>
                <div class="table-avtatar">
                  <router-link to="/doctor-profile"
                    ><img
                      src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                      alt="Img"
                    />Anthony Tran</router-link
                  >
                </div>
              </td>
              <td>02 Apr 2024 - 04:15 PM</td>
              <td>$380</td>
              <td>
                <span class="badge badge-danger-bg">Cancelled</span>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <a
                    href="#request_cancel_modal"
                    class="account-action"
                    data-bs-toggle="modal"
                    ><i class="fa-solid fa-link"></i
                  ></a>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination dashboard-pagination">
      <ul>
        <li>
          <a href="#" class="page-link"
            ><i class="fa-solid fa-chevron-left"></i
          ></a>
        </li>
        <li>
          <a href="#" class="page-link">1</a>
        </li>
        <li>
          <a href="#" class="page-link active">2</a>
        </li>
        <li>
          <a href="#" class="page-link">3</a>
        </li>
        <li>
          <a href="#" class="page-link">4</a>
        </li>
        <li>
          <a href="#" class="page-link">...</a>
        </li>
        <li>
          <a href="#" class="page-link"
            ><i class="fa-solid fa-chevron-right"></i
          ></a>
        </li>
      </ul>
    </div>
    <!-- /Pagination -->
  </div>
  <!-- /Accounts Tab -->
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
