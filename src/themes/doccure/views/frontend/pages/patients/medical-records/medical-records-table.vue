<template>
  <div class="tab-pane fade show active" id="medical">
    <div class="search-header">
      <div class="search-field">
        <input type="text" class="form-control" placeholder="Search" />
        <span class="search-icon"><i class="isax isax-search-normal"></i></span>
      </div>
      <div>
        <a
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#add_medical_records"
          class="btn btn-primary prime-btn"
          >Add Medical Record</a
        >
      </div>
    </div>

    <div class="custom-table">
      <div class="table-responsive">
        <table class="table table-center mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a class="text-blue-600" href="javascript:void(0);">#MR-123</a>
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon">
                  <span><i class="fa-solid fa-paperclip"></i></span>Lab Report
                </a>
              </td>
              <td>24 Mar 2024</td>
              <td>Glucose Test V12</td>
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_report"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_medical_records"
                  >
                    <i class="isax isax-edit-2"></i>
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
                <a class="text-blue-600" href="javascript:void(0);">#MR-124</a>
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon">
                  <span><i class="fa-solid fa-paperclip"></i></span>Lab Report
                </a>
              </td>
              <td>27 Mar 2024</td>
              <td>Complete Blood Count(CBC)</td>
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_report"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_medical_records"
                  >
                    <i class="isax isax-edit-2"></i>
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
                <a class="text-blue-600" href="javascript:void(0);">#MR-125</a>
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon">
                  <span><i class="fa-solid fa-paperclip"></i></span>Lab Report
                </a>
              </td>
              <td>10 Apr 2024</td>
              <td>Echocardiogram</td>
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_report"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_medical_records"
                  >
                    <i class="isax isax-edit-2"></i>
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
                <a class="text-blue-600" href="javascript:void(0);">#MR-126</a>
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon">
                  <span><i class="fa-solid fa-paperclip"></i></span>Lab Report
                </a>
              </td>
              <td>19 Apr 2024</td>
              <td>COVID-19 Test</td>
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_report"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_medical_records"
                  >
                    <i class="isax isax-edit-2"></i>
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
                <a class="text-blue-600" href="javascript:void(0);">#MR-127</a>
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon">
                  <span><i class="fa-solid fa-paperclip"></i></span>Lab Report
                </a>
              </td>
              <td>27 Apr 2024</td>
              <td>Allergy Tests</td>
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_report"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_medical_records"
                  >
                    <i class="isax isax-edit-2"></i>
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
                <a class="text-blue-600" href="javascript:void(0);">#MR-128</a>
              </td>
              <td>
                <a href="javascript:void(0);" class="lab-icon">
                  <span><i class="fa-solid fa-paperclip"></i></span>Lab Report
                </a>
              </td>
              <td>02 May 2024</td>
              <td>Lipid Panel</td>
              <td>
                <div class="action-item">
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#view_report"
                  >
                    <i class="isax isax-link-2"></i>
                  </a>
                  <a
                    href="javascript:void(0);"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_medical_records"
                  >
                    <i class="isax isax-edit-2"></i>
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
