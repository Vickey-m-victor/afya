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
              <th>Account No</th>
              <th>Reason</th>
              <th>Debited / Credited On</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1234</a>
              </td>
              <td>5396 5250 1908 XXXX</td>
              <td>Appointment</td>
              <td>26 Mar 2024</td>
              <td>$300</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1235</a>
              </td>
              <td>6372 4902 4902 XXXX</td>
              <td>Appointment</td>
              <td>28 Mar 2024</td>
              <td>$480</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1236</a>
              </td>
              <td>4892 0204 4924 XXXX</td>
              <td>Appointment</td>
              <td>11 Apr 2024</td>
              <td>$250</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <a href="javascript:void(0);" class="text-blue">#AC-1237</a>
              </td>
              <td>5730 4892 0492 XXXX</td>
              <td>Refund</td>
              <td>18 Apr 2024</td>
              <td>$220</td>
              <td>
                <span class="badge badge-warning-bg">Pending</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-blue">#AC-1238</span>
              </td>
              <td>7922 9024 5824 XXXX</td>
              <td>Appointment</td>
              <td>29 Apr 2024</td>
              <td>$350</td>
              <td>
                <span class="badge badge-success-bg">Completed</span>
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
