<template>
  <div class="dashboard-card w-100">
    <div class="dashboard-card-head">
      <div class="header-title">
        <h5>Reports</h5>
      </div>
    </div>
    <div class="dashboard-card-body">
      <div class="account-detail-table">
        <!-- Tab Menu -->
        <nav class="patient-dash-tab border-0 pb-0">
          <ul class="nav nav-tabs-bottom">
            <li class="nav-item">
              <a class="nav-link active" href="#appoint-tab" data-bs-toggle="tab"
                >Appointments</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#medical-tab" data-bs-toggle="tab"
                >Medical Records</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#prsc-tab" data-bs-toggle="tab">Prescriptions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#invoice-tab" data-bs-toggle="tab">Invoices</a>
            </li>
          </ul>
        </nav>
        <!-- /Tab Menu -->

        <!-- Tab Content -->
        <div class="tab-content pt-0">
          <!-- Appointments Tab -->
          <div id="appoint-tab" class="tab-pane fade show active">
            <div class="custom-new-table">
              <div class="table-responsive">
                <table class="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="javascript:void(0);"
                          ><span class="link-primary">#AP1236</span></a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-24.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/doctor-profile"
                            >Dr. Robert Womack</router-link
                          >
                        </h2>
                      </td>
                      <td>21 Mar 2024, 10:30 AM</td>
                      <td>Video call</td>
                      <td>
                        <span
                          class="badge badge-xs p-2 badge-soft-purple inline-flex align-items-center"
                          ><i class="fa-solid fa-circle me-1 fs-5"></i>Upcoming</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="javascript:void(0);"
                          ><span class="link-primary">#AP3656</span></a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-23.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/doctor-profile"
                            >Dr. Patricia Cassidy</router-link
                          >
                        </h2>
                      </td>
                      <td>28 Mar 2024, 11:40 AM</td>
                      <td>Clinic Visit</td>
                      <td>
                        <span
                          class="badge badge-xs p-2 badge-soft-purple inline-flex align-items-center"
                          ><i class="fa-solid fa-circle me-1 fs-5"></i>Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="javascript:void(0);"
                          ><span class="link-primary">#AP1246</span></a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-22.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/doctor-profile">Dr. Kevin Evans</router-link>
                        </h2>
                      </td>
                      <td>02 Apr 2024, 09:20 AM</td>
                      <td>Audio Call</td>
                      <td>
                        <span
                          class="badge badge-xs p-2 badge-soft-success inline-flex align-items-center"
                          ><i class="fa-solid fa-circle me-1 fs-5"></i>Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="javascript:void(0);"
                          ><span class="link-primary">#AP6985</span></a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-25.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/doctor-profile">Dr. Lisa Keating</router-link>
                        </h2>
                      </td>
                      <td>15 Apr 2024, 04:10 PM</td>
                      <td>Clinic Visit</td>
                      <td>
                        <span
                          class="badge badge-xs p-2 badge-soft-danger inline-flex align-items-center"
                          ><i class="fa-solid fa-circle me-1 fs-5"></i>Cancelled</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a href="javascript:void(0);"
                          ><span class="link-primary">#AP3659</span></a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-26.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/doctor-profile">Dr. John Hammer</router-link>
                        </h2>
                      </td>
                      <td>10 May 2024, 06:00 PM</td>
                      <td>Video Call</td>
                      <td>
                        <span
                          class="badge badge-xs p-2 badge-soft-purple inline-flex align-items-center"
                          ><i class="fa-solid fa-circle me-1 fs-5"></i>Upcoming</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- /Appointments Tab -->

          <!-- Medical Records Tab -->
          <div class="tab-pane fade" id="medical-tab">
            <div class="custom-table">
              <div class="table-responsive">
                <table class="table table-center mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Record For</th>
                      <th>Comments</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="javascript:void(0);" class="link-primary">#MR1236</a>
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon"
                          >Electro cardiography</a
                        >
                      </td>
                      <td>24 Mar 2024</td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link
                            to="/patient-details"
                            class="avatar avatar-sm me-2"
                          >
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/patient-details">Hendrita Clark</router-link>
                        </h2>
                      </td>
                      <td>Take Good Rest</td>
                      <td>
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#view_report"
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
                        <a href="javascript:void(0);" class="link-primary">#MR3656</a>
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon"
                          >Complete Blood Count</a
                        >
                      </td>
                      <td>10 Apr 2024</td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link
                            to="/patient-details"
                            class="avatar avatar-sm me-2"
                          >
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/dependent/dependent-01.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/patient-details">Laura Stewart</router-link>
                        </h2>
                      </td>
                      <td>Stable, no change</td>
                      <td>
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#view_report"
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
                        <a href="javascript:void(0);" class="link-primary">#MR1246</a>
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon"
                          >Blood Glucose Test</a
                        >
                      </td>
                      <td>19 Apr 2024</td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link
                            to="/patient-details"
                            class="avatar avatar-sm me-2"
                          >
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/dependent/dependent-02.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/patient-details">Mathew Charles </router-link>
                        </h2>
                      </td>
                      <td>All Clear</td>
                      <td>
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#view_report"
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
                        <a href="javascript:void(0);" class="link-primary">#MR6985</a>
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon"
                          >Liver Function Tests</a
                        >
                      </td>
                      <td>27 Apr 2024</td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link
                            to="/patient-details"
                            class="avatar avatar-sm me-2"
                          >
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/dependent/dependent-03.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/patient-details"
                            >Christopher Joseph</router-link
                          >
                        </h2>
                      </td>
                      <td>Stable, no change</td>
                      <td>
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#view_report"
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
                      <td><a href="#" class="link-primary">#MR3659</a></td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon">Blood Cultures</a>
                      </td>
                      <td>10 May 2024</td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link
                            to="/patient-details"
                            class="avatar avatar-sm me-2"
                          >
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/dependent/dependent-04.jpg"
                              alt="User Image"
                            />
                          </router-link>
                          <router-link to="/patient-details">Elisa Salcedo</router-link>
                        </h2>
                      </td>
                      <td>Take Good Rest</td>
                      <td>
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#view_report"
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
          </div>
          <!-- /Medical Records Tab -->

          <!-- Prescriptions Tab -->
          <div class="tab-pane fade" id="prsc-tab">
            <div class="custom-table">
              <div class="table-responsive">
                <table class="table table-center mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Prescriped By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="link-primary">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_prescription"
                          >#P1236</a
                        >
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon prescription"
                          >Prescription</a
                        >
                      </td>
                      <td>21 Mar 2024, 10:30 AM</td>
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
                      <td class="link-primary">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_prescription"
                          >#P3656</a
                        >
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon prescription"
                          >Prescription</a
                        >
                      </td>
                      <td>28 Mar 2024, 11:40 AM</td>
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
                      <td class="link-primary">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_prescription"
                          >#P1246</a
                        >
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon prescription"
                          >Prescription</a
                        >
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
                      <td class="link-primary">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_prescription"
                          >#P6985</a
                        >
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon prescription"
                          >Prescription</a
                        >
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
                      <td class="link-primary">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#view_prescription"
                          >#P3659</a
                        >
                      </td>
                      <td>
                        <a href="javascript:void(0);" class="lab-icon prescription"
                          >Prescription</a
                        >
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
          </div>
          <!-- Prescriptions Tab -->

          <!--Invoices Tab -->
          <div class="tab-pane fade" id="invoice-tab">
            <div class="custom-table">
              <div class="table-responsive">
                <table class="table table-center mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Doctor</th>
                      <th>Appointment Date</th>
                      <th>Booked on</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view"
                          class="link-primary"
                          >#INV1236</a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-21.jpg"
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
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#invoice_view"
                          >
                            <i class="isax isax-link-2"></i>
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
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view"
                          class="link-primary"
                          >#NV3656</a
                        >
                      </td>
                      <td>
                        <h2 class="table-avatar">
                          <router-link to="/doctor-profile" class="avatar avatar-sm me-2">
                            <img
                              class="avatar-img rounded-3"
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-13.jpg"
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
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#invoice_view"
                          >
                            <i class="isax isax-link-2"></i>
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
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view"
                          class="link-primary"
                          >#INV1246</a
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
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#invoice_view"
                          >
                            <i class="isax isax-link-2"></i>
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
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view"
                          class="link-primary"
                          >#INV6985</a
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
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#invoice_view"
                          >
                            <i class="isax isax-link-2"></i>
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
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#invoice_view"
                          class="link-primary"
                          >#INV3659</a
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
                        <div class="action-item">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="modal"
                            data-bs-target="#invoice_view"
                          >
                            <i class="isax isax-link-2"></i>
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
          </div>
          <!-- Invoices Tab -->
        </div>
        <!-- Tab Content -->
      </div>
    </div>
  </div>
</template>
