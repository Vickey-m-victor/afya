<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content">
      <div class="container">
        <div class="row">
          <!-- Profile Sidebar -->
          <div class="col-lg-4 col-xl-3 theiaStickySidebar">
            <!-- Profile Sidebar -->
            <profilesidebar></profilesidebar>
            <!-- /Profile Sidebar -->
          </div>
          <!-- / Profile Sidebar -->
          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <div class="header-back">
                <router-link to="/appointments" class="back-arrow"
                  ><i class="fa-solid fa-arrow-left"></i
                ></router-link>
                <h3>Appointment Details</h3>
              </div>
            </div>
            <div class="appointment-details-wrap">
              <!-- Appointment Detail Card -->
              <div class="appointment-wrap appointment-detail-card">
                <ul>
                  <li>
                    <div class="patinet-information">
                      <a href="#">
                        <img
                          src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="patient-info">
                        <p>#Apt0001</p>
                        <h6><a href="#">Dr Edalin Hendry</a></h6>
                        <div class="mail-info-patient">
                          <ul>
                            <li><i class="isax isax-sms5"></i>edalin@example.com</li>
                            <li><i class="isax isax-call5"></i> +1 504 368 6874</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="appointment-info">
                    <div class="person-info">
                      <p>Type of Appointment</p>
                      <ul class="d-flex apponitment-types">
                        <li>
                          <i class="isax isax-hospital5 text-green"></i>Direct Visit
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="appointment-action">
                    <div class="detail-badge-info">
                      <span class="badge bg-secondary">Upcoming</span>
                    </div>
                    <div class="consult-fees">
                      <h6>Consultation Fees : $200</h6>
                    </div>
                    <ul>
                      <li>
                        <a href="#"><i class="isax isax-messages-25"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="isax isax-close-circle5"></i></a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul class="detail-card-bottom-info">
                  <li>
                    <h6>Appointment Date & Time</h6>
                    <span>22 Jul 2023 - 12:00 pm</span>
                  </li>
                  <li>
                    <h6>Clinic Location</h6>
                    <span>Adrian’s Dentistry</span>
                  </li>
                  <li>
                    <h6>Location</h6>
                    <span>Newyork, United States</span>
                  </li>
                  <li>
                    <h6>Visit Type</h6>
                    <span>General</span>
                  </li>
                  <li>
                    <div class="start-btn">
                      <a href="#" class="btn btn-md btn-primary-gradient rounded-pill"
                        >Start Session</a
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <!-- /Appointment Detail Card -->

              <div class="recent-appointments">
                <h5 class="head-text">Recent Appointments</h5>
                <!-- Appointment List -->
                <div class="appointment-wrap">
                  <ul>
                    <li>
                      <div class="patinet-information">
                        <a href="#">
                          <img
                            src="@/themes/doccure/assets/img/doctors/doctor-15.jpg"
                            alt="User Image"
                          />
                        </a>
                        <div class="patient-info">
                          <p>#Apt0002</p>
                          <h6><a href="#">Dr.Shanta Nesmith</a></h6>
                        </div>
                      </div>
                    </li>
                    <li class="appointment-info">
                      <p><i class="isax isax-clock5"></i>11 Nov 2024 10.45 AM</p>
                      <ul class="d-flex apponitment-types">
                        <li>General Visit</li>
                        <li>Chat</li>
                      </ul>
                    </li>
                    <li class="mail-info-patient">
                      <ul>
                        <li><i class="isax isax-sms5"></i>shanta@example.com</li>
                        <li><i class="isax isax-call5"></i> +1 504 368 6874</li>
                      </ul>
                    </li>
                    <li class="appointment-action">
                      <ul>
                        <li>
                          <a href="#"><i class="isax isax-eye4"></i></a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <!-- /Appointment List -->
                <!-- Appointment List -->
                <div class="appointment-wrap">
                  <ul>
                    <li>
                      <div class="patinet-information">
                        <a href="#">
                          <img
                            src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                            alt="User Image"
                          />
                        </a>
                        <div class="patient-info">
                          <p>#Apt0003</p>
                          <h6><a href="#">Dr.John Ewel</a></h6>
                        </div>
                      </div>
                    </li>
                    <li class="appointment-info">
                      <p><i class="isax isax-clock5"></i>27 Oct 2024 09.30 AM</p>
                      <ul class="d-flex apponitment-types">
                        <li>General Visit</li>
                        <li>Video Call</li>
                      </ul>
                    </li>
                    <li class="mail-info-patient">
                      <ul>
                        <li><i class="isax isax-sms5"></i>john@example.com</li>
                        <li><i class="isax isax-call5"></i> +1 749 104 6291</li>
                      </ul>
                    </li>
                    <li class="appointment-action">
                      <ul>
                        <li>
                          <a href="#"><i class="isax isax-eye4"></i></a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <!-- /Appointment List -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Patient",
      text: "Appointments",
      text1: "Appointments",
    };
  },
};
</script>
