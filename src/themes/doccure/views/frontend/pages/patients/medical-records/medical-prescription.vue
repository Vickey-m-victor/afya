<template>
  <div class="tab-pane fade" id="prescription">
    <div class="search-header">
      <div class="search-field">
        <input type="text" class="form-control" placeholder="Search" />
        <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      </div>
    </div>

    <div class="custom-table">
      <div class="table-responsive">
        <table class="table table-center mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Prescriped By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  class="text-blue-600"
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#view_prescription"
                  >#PR-123</a
                >
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon prescription">
                  <span><i class="fa-solid fa-prescription"></i></span>Prescription
                </a>
              </td>
              <td>24 Mar 2024, 10:30 AM</td>
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
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_prescription"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a href="javascript:void(0);">
                    <i class="isax isax-import"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i class="isax isax-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  class="text-blue-600"
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#view_prescription"
                  >#PR-124</a
                >
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon prescription">
                  <span><i class="fa-solid fa-prescription"></i></span>Prescription
                </a>
              </td>
              <td>27 Mar 2024, 11:15 AM</td>
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
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_prescription"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a href="javascript:void(0);">
                    <i class="isax isax-import"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i class="isax isax-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  class="text-blue-600"
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#view_prescription"
                  >#PR-125</a
                >
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon prescription">
                  <span><i class="fa-solid fa-prescription"></i></span>Prescription
                </a>
              </td>
              <td>11 Apr 2024, 09:00 AM</td>
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
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_prescription"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a href="javascript:void(0);">
                    <i class="isax isax-import"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i class="isax isax-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  class="text-blue-600"
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#view_prescription"
                  >#PR-126</a
                >
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon prescription">
                  <span><i class="fa-solid fa-prescription"></i></span>Prescription
                </a>
              </td>
              <td>15 Apr 2024, 02:30 PM</td>
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
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_prescription"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a href="javascript:void(0);">
                    <i class="isax isax-import"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i class="isax isax-trash"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  class="text-blue-600"
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#view_prescription"
                  >#PR-127</a
                >
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon prescription">
                  <span><i class="fa-solid fa-prescription"></i></span>Prescription
                </a>
              </td>
              <td>23 Apr 2024, 06:40 PM</td>
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
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_prescription"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a href="javascript:void(0);">
                    <i class="isax isax-import"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_modal"
                  >
                    <i class="isax isax-trash"></i>
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
          <a href="#" class="page-link"><i class="fa-solid fa-chevron-left"></i></a>
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
          <a href="#" class="page-link"><i class="fa-solid fa-chevron-right"></i></a>
        </li>
      </ul>
    </div>
    <!-- /Pagination -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
