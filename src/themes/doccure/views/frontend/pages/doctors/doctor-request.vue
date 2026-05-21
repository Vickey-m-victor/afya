<template>
  <div class="main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <!-- Page Content -->
    <div class="content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>

          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Requests</h3>
              <ul>
                <li>
                  <div class="dropdown header-dropdown">
                    <a
                      class="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      Last 7 Days
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="javascript:void(0);" class="dropdown-item"> Today </a>
                      <a href="javascript:void(0);" class="dropdown-item"> This Month </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Last 7 Days
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Request List -->
            <div class="appointment-wrap">
              <ul>
                <li>
                  <div class="patinet-information">
                    <router-link to="/patient-profile">
                      <img
                        src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <div class="patient-info">
                      <p>#Apt0001</p>
                      <h6>
                        <router-link to="/patient-profile">Adrian</router-link>
                      </h6>
                    </div>
                  </div>
                </li>
                <li class="appointment-info">
                  <p><i class="isax isax-clock5"></i>11 Nov 2024 10.45 AM</p>
                  <p class="md-text">Consultation for Dental</p>
                </li>
                <li class="appointment-type">
                  <p class="md-text">Type of Appointment</p>
                  <p><i class="isax isax-video5 text-blue"></i>Video Call</p>
                </li>
                <li>
                  <ul class="request-action">
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="accept-link"
                        data-bs-toggle="modal"
                        data-bs-target="#accept_appointment"
                        ><i class="fa-solid fa-check"></i>Accept</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="reject-link"
                        data-bs-toggle="modal"
                        data-bs-target="#cancel_appointment"
                        ><i class="fa-solid fa-xmark"></i>Reject</a
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- /Request List -->

            <!-- Request List -->
            <div class="appointment-wrap">
              <ul>
                <li>
                  <div class="patinet-information">
                    <router-link to="/patient-profile">
                      <img
                        src="@/themes/doccure/assets/img/doctors-dashboard/profile-02.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <div class="patient-info">
                      <p>#Apt0002</p>
                      <h6>
                        <router-link to="/patient-profile">Kelly</router-link>
                      </h6>
                    </div>
                  </div>
                </li>
                <li class="appointment-info">
                  <p><i class="isax isax-clock5"></i>10 Nov 2024 02.00 PM</p>
                  <p class="md-text">Consultation for Dental</p>
                </li>
                <li class="appointment-type">
                  <p class="md-text">Type of Appointment</p>
                  <p><i class="isax isax-building5 text-green"></i>Direct Visit</p>
                </li>
                <li>
                  <ul class="request-action">
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="accept-link"
                        data-bs-toggle="modal"
                        data-bs-target="#accept_appointment"
                        ><i class="fa-solid fa-check"></i>Accept</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="reject-link"
                        data-bs-toggle="modal"
                        data-bs-target="#cancel_appointment"
                        ><i class="fa-solid fa-xmark"></i>Reject</a
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- /Request List -->

            <!-- Request List -->
            <div class="appointment-wrap">
              <ul>
                <li>
                  <div class="patinet-information">
                    <router-link to="/patient-profile">
                      <img
                        src="@/themes/doccure/assets/img/doctors-dashboard/profile-03.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <div class="patient-info">
                      <p>#Apt0001</p>
                      <h6>
                        <router-link to="/patient-profile">Samuel</router-link>
                      </h6>
                    </div>
                  </div>
                </li>
                <li class="appointment-info">
                  <p><i class="isax isax-clock5"></i>08 Nov 2024 08.30 AM</p>
                  <p class="md-text">Consultation for Dental</p>
                </li>
                <li class="appointment-type">
                  <p class="md-text">Type of Appointment</p>
                  <p><i class="isax isax-call5 text-indigo"></i>Audio Call</p>
                </li>
                <li>
                  <ul class="request-action">
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="accept-link"
                        data-bs-toggle="modal"
                        data-bs-target="#accept_appointment"
                        ><i class="fa-solid fa-check"></i>Accept</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="reject-link"
                        data-bs-toggle="modal"
                        data-bs-target="#cancel_appointment"
                        ><i class="fa-solid fa-xmark"></i>Reject</a
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- /Request List -->

            <!-- Request List -->
            <div class="appointment-wrap">
              <ul>
                <li>
                  <div class="patinet-information">
                    <router-link to="/patient-profile">
                      <img
                        src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg"
                        alt="User Image"
                      />
                    </router-link>
                    <div class="patient-info">
                      <p>#Apt0001</p>
                      <h6>
                        <router-link to="/patient-profile">Anderea</router-link>
                      </h6>
                    </div>
                  </div>
                </li>
                <li class="appointment-info">
                  <p><i class="isax isax-clock5"></i>05 Nov 2024 11.00 AM</p>
                  <p class="md-text">Consultation for Dental</p>
                </li>
                <li class="appointment-type">
                  <p class="md-text">Type of Appointment</p>
                  <p><i class="isax isax-call5 text-indigo"></i>Audio Call</p>
                </li>
                <li>
                  <ul class="request-action">
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="accept-link"
                        data-bs-toggle="modal"
                        data-bs-target="#accept_appointment"
                        ><i class="fa-solid fa-check"></i>Accept</a
                      >
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        class="reject-link"
                        data-bs-toggle="modal"
                        data-bs-target="#cancel_appointment"
                        ><i class="fa-solid fa-xmark"></i>Reject</a
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!-- /Request List -->

            <div class="row">
              <div class="col-md-12">
                <div class="loader-item text-center">
                  <a href="javascript:void(0);" class="btn btn-load">Load More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->

    <indexfooter></indexfooter>
  </div>
  <delete-request-modal></delete-request-modal>
</template>

<script>
export default {
  data() {
    return {
      title: "Doctor",
      text: "Requests",
      text1: "Requests",
    };
  },
};
</script>
