<template>
  <div class="search-header">
    <div class="search-field">
      <input type="text" class="form-control" placeholder="Search" />
      <span class="search-icon"
        ><i class="fa-solid fa-magnifying-glass"></i
      ></span>
    </div>
  </div>

  <div class="custom-table">
    <div class="table-responsive">
      <table class="table table-center mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Appt Date</th>
            <th>Booking Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/patient-upcoming-appointment"
                >#Apt123</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">Edalin Hendry</router-link>
              </h2>
            </td>
            <td>24 Mar 2024</td>
            <td>21 Mar 2024</td>
            <td>$300</td>
            <td>
              <span class="badge badge-yellow status-badge">Upcoming</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/patient-upcoming-appointment"
                >#Apt124</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-05.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">John Homes</router-link>
              </h2>
            </td>
            <td>17 Mar 2024</td>
            <td>14 Mar 2024</td>
            <td>$450</td>
            <td>
              <span class="badge badge-yellow status-badge">Upcoming</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/patient-upcoming-appointment"
                >#Apt125</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-03.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">Shanta Neill</router-link>
              </h2>
            </td>
            <td>11 Mar 2024</td>
            <td>07 Mar 2024</td>
            <td>$250</td>
            <td>
              <span class="badge badge-yellow status-badge">Upcoming</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/patient-upcoming-appointment"
                >#Apt126</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-08.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">Anthony Tran</router-link>
              </h2>
            </td>
            <td>26 Feb 2024</td>
            <td>23 Feb 2024</td>
            <td>$320</td>
            <td>
              <span class="badge badge-yellow status-badge">Upcoming</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/patient-upcoming-appointment"
                >#Apt127</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-01.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">Susan Lingo</router-link>
              </h2>
            </td>
            <td>18 Feb 2024</td>
            <td>15 Feb 2024</td>
            <td>$480</td>
            <td>
              <span class="badge badge-yellow status-badge">Upcoming</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/patient-upcoming-appointment"
                >#Apt128</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-09.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">Joseph Boyd</router-link>
              </h2>
            </td>
            <td>10 Feb 2024</td>
            <td>07 Feb 2024</td>
            <td>$260</td>
            <td>
              <span class="badge badge-danger status-badge">Cancelled</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-blue-600"
                to="/atient-upcoming-appointment"
                >#Apt128</router-link
              >
            </td>
            <td>
              <h2 class="table-avatar">
                <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                  <img
                    class="avatar-img rounded-3"
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-07.jpg"
                    alt="User Image"
                  />
                </router-link>
                <router-link to="/doctor-profile">Juliet Gabriel</router-link>
              </h2>
            </td>
            <td>28 Jan 2024</td>
            <td>25 Jan 2024</td>
            <td>$350</td>
            <td>
              <span class="badge badge-green status-badge">Completed</span>
            </td>
            <td>
              <div class="action-item">
                <a href="javascript:void(0);">
                  <i class="fa-solid fa-link"></i>
                </a>
              </div>
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
</template>
