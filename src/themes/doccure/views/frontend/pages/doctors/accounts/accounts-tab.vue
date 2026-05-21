<template>
  <div id="pat_accounts" class="tab-pane fade show active">
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
              <th>Requested Date</th>
              <th>Account No</th>
              <th>Credited On</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="#"><span class="text-blue">#AC-1234</span></a>
              </td>
              <td>24 Mar 2024</td>
              <td>5396 5250 1908 XXXX</td>
              <td>26 Mar 2024</td>
              <td>$300</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
              <td>
                <a
                  href="#request_details_modal"
                  class="account-action"
                  data-bs-toggle="modal"
                  ><i class="isax isax-link-2"></i
                ></a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#"><span class="text-blue">#AC-1235</span></a>
              </td>
              <td>28 Mar 2024</td>
              <td>8833 8942 9013 XXXX</td>
              <td>30 Mar 2024</td>
              <td>$400</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
              <td>
                <a
                  href="#request_details_modal"
                  class="account-action"
                  data-bs-toggle="modal"
                  ><i class="isax isax-link-2"></i
                ></a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#"><span class="text-blue">#AC-1236</span></a>
              </td>
              <td>02 Apr 2024</td>
              <td>8920 4041 4725 XXXX</td>
              <td>04 Apr 2024</td>
              <td>$350</td>
              <td>
                <span class="badge badge-danger-bg">Cancelled</span>
              </td>
              <td>
                <a
                  href="#request_cancel_modal"
                  class="account-action"
                  data-bs-toggle="modal"
                  ><i class="isax isax-link-2"></i
                ></a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#"><span class="text-blue">#AC-1237</span></a>
              </td>
              <td>10 Apr 2024</td>
              <td>5730 4892 0492 XXXX</td>
              <td>12 Apr 2024</td>
              <td>$220</td>
              <td>
                <span class="badge badge-warning-bg">Pending</span>
              </td>
              <td>
                <a href="#" class="account-action"
                  ><i class="isax isax-link-2"></i
                ></a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="#"><span class="text-blue">#AC-1238</span></a>
              </td>
              <td>16 Apr 2024</td>
              <td>7922 9024 5824 XXXX</td>
              <td>18 Apr 2024</td>
              <td>$470</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
              <td>
                <a
                  href="#request_details_modal"
                  class="account-action"
                  data-bs-toggle="modal"
                  ><i class="isax isax-link-2"></i
                ></a>
              </td>
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
</template>
