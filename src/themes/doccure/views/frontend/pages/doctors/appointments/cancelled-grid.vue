<template>
  <div class="row">
    <!-- Appointment Grid -->
    <div class="col-xl-4 col-lg-6 col-md-12 d-flex">
      <div class="appointment-wrap appointment-grid-wrap">
        <ul>
          <li>
            <div class="appointment-grid-head">
              <div class="patinet-information">
                <router-link to="/doctor-cancelled-appointment-2">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0001</p>
                  <h6>
                    <router-link to="/doctor-cancelled-appointment-2">Adrian</router-link>
                  </h6>
                </div>
              </div>
              <div class="grid-user-msg">
                <span class="video-icon"
                  ><a href="#"><i class="fa-solid fa-video"></i></a
                ></span>
              </div>
            </div>
          </li>
          <li class="appointment-info">
            <p><i class="isax isax-clock5"></i>11 Nov 2024 10.45 AM</p>
            <ul class="d-flex apponitment-types">
              <li>General Visit</li>
            </ul>
          </li>
          <li class="appointment-detail-btn">
            <router-link to="/doctor-cancelled-appointment-2" class="start-link w-100"
              >View Details</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- /Appointment Grid -->

    <!-- Appointment Grid -->
    <div class="col-xl-4 col-lg-6 col-md-12 d-flex">
      <div class="appointment-wrap appointment-grid-wrap">
        <ul>
          <li>
            <div class="appointment-grid-head">
              <div class="patinet-information">
                <router-link to="/doctor-cancelled-appointment-2">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-02.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0002</p>
                  <h6>
                    <router-link to="/doctor-cancelled-appointment-2"
                      >Kelly Stevens</router-link
                    >
                  </h6>
                </div>
              </div>
              <div class="grid-user-msg">
                <span class="video-icon"
                  ><a href="#"><i class="fa-solid fa-video"></i></a
                ></span>
              </div>
            </div>
          </li>
          <li class="appointment-info">
            <p><i class="isax isax-clock5"></i>05 Nov 2024 11.50 AM</p>
            <ul class="d-flex apponitment-types">
              <li>General Visit</li>
            </ul>
          </li>
          <li class="appointment-detail-btn">
            <router-link to="/doctor-cancelled-appointment-2" class="start-link w-100"
              >View Details</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- /Appointment Grid -->

    <!-- Appointment Grid -->
    <div class="col-xl-4 col-lg-6 col-md-12 d-flex">
      <div class="appointment-wrap appointment-grid-wrap">
        <ul>
          <li>
            <div class="appointment-grid-head">
              <div class="patinet-information">
                <router-link to="/doctor-cancelled-appointment">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-03.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0003</p>
                  <h6>
                    <router-link to="/doctor-cancelled-appointment"
                      >Samuel James</router-link
                    >
                  </h6>
                </div>
              </div>
              <div class="grid-user-msg">
                <span class="video-icon"
                  ><a href="#"><i class="fa-solid fa-video"></i></a
                ></span>
              </div>
            </div>
          </li>
          <li class="appointment-info">
            <p><i class="isax isax-clock5"></i>27 Oct 2024 09.30 AM</p>
            <ul class="d-flex apponitment-types">
              <li>General Visit</li>
            </ul>
          </li>
          <li class="appointment-detail-btn">
            <router-link to="/doctor-cancelled-appointment" class="start-link w-100"
              >View Details</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- /Appointment Grid -->
    <div class="col-md-12">
      <div class="loader-item text-center">
        <a href="javascript:void(0);" class="btn btn-load">Load More</a>
      </div>
    </div>
  </div>
</template>
