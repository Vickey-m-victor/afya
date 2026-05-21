<template>
  <div class="row">
    <!-- Appointment Grid -->
    <div class="col-xl-4 col-lg-6 col-md-6 d-flex">
      <div class="appointment-wrap appointment-grid-wrap">
        <ul>
          <li>
            <div class="appointment-grid-head">
              <div class="patinet-information">
                <router-link to="/patient-profile">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0006</p>
                  <h6>
                    <router-link to="/patient-profile">Anderea Kearns</router-link>
                  </h6>
                  <ul>
                    <li>Age : 40</li>
                    <li>Female</li>
                    <li>B-</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="appointment-info">
            <p><i class="isax isax-clock5"></i>26 Sep 2024 10.20 AM</p>
            <p class="mb-0"><i class="isax isax-location5"></i>San Francisco, USA</p>
          </li>
          <li class="appointment-action">
            <div class="patient-book">
              <p>
                <i class="isax isax-calendar-1"></i>Last Booking
                <span>11 Feb 2024</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- /Appointment Grid -->

    <!-- Appointment Grid -->
    <div class="col-xl-4 col-lg-6 col-md-6 d-flex">
      <div class="appointment-wrap appointment-grid-wrap">
        <ul>
          <li>
            <div class="appointment-grid-head">
              <div class="patinet-information">
                <router-link to="/patient-profile">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0009</p>
                  <h6>
                    <router-link to="/patient-profile">Darrell Tan</router-link>
                  </h6>
                  <ul>
                    <li>Age : 31</li>
                    <li>Male</li>
                    <li>AB+</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="appointment-info">
            <p><i class="isax isax-clock5"></i>25 Aug 2024 10.45 AM</p>
            <p class="mb-0"><i class="isax isax-location5"></i>San Antonio, USA</p>
          </li>
          <li class="appointment-action">
            <div class="patient-book">
              <p>
                <i class="isax isax-calendar-1"></i>Last Booking<span>03 Jan 2024</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- /Appointment Grid -->

    <!-- Appointment Grid -->
    <div class="col-xl-4 col-lg-6 col-md-6 d-flex">
      <div class="appointment-wrap appointment-grid-wrap">
        <ul>
          <li>
            <div class="appointment-grid-head">
              <div class="patinet-information">
                <router-link to="/patient-profile">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/profile-04.jpg"
                    alt="User Image"
                  />
                </router-link>
                <div class="patient-info">
                  <p>#Apt0004</p>
                  <h6>
                    <router-link to="/patient-profile">Catherine Gracey</router-link>
                  </h6>
                  <ul>
                    <li>Age : 36</li>
                    <li>Female</li>
                    <li>AB-</li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="appointment-info">
            <p><i class="isax isax-clock5"></i>18 Oct 2024 12.20 PM</p>
            <p class="mb-0"><i class="isax isax-location5"></i>Los Angeles, USA</p>
          </li>
          <li class="appointment-action">
            <div class="patient-book">
              <p>
                <i class="isax isax-calendar-1"></i>Last Booking
                <span>27 Feb 2024</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- /Appointment Grid -->

    <div class="col-md-12">
      <div class="loader-item text-center">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#view_prescription"
          class="btn btn-load"
          >Load More</a
        >
      </div>
    </div>
  </div>
</template>
