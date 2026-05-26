<template>
  <div class="col-xl-5 d-flex flex-column">
    <div class="dashboard-card flex-fill">
      <div class="dashboard-card-head">
        <div class="header-title">
          <h5>Appointment</h5>
        </div>
        <div class="card-view-link">
          <div class="owl-nav slide-nav text-end nav-control"></div>
        </div>
      </div>
      <div class="dashboard-card-body">
        <div class="apponiment-dates">
          <ul class="appointment-calender-slider owl-carousel">
            <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
              <Slide v-for="record in Dashboard_Appointment" :key="record.id">
                <li>
                  <a href="#" :class="record.Class">
                    <h5>
                      {{ record.Number }} <span>{{ record.Date }}</span>
                    </h5>
                  </a>
                </li>
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </ul>
          <div class="appointment-dash-card">
            <div class="doctor-fav-list">
              <div class="doctor-info-profile">
                <a href="#" class="table-avatar">
                  <img
                    src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg"
                    alt="Img"
                  />
                </a>
                <div class="doctor-name-info">
                  <h5><a href="#">Dr.Edalin Hendry</a></h5>
                  <span class="fs-12 fw-medium">Dentist</span>
                </div>
              </div>
              <a href="#" class="cal-plus-icon"><i class="isax isax-hospital5"></i></a>
            </div>
            <div class="date-time">
              <p><i class="isax isax-clock5"></i>21 Mar 2024 - 10:30 PM</p>
            </div>
            <div class="card-btns gap-3">
              <router-link to="/chat" class="btn btn-md btn-light rounded-pill"
                ><i class="isax isax-messages-25"></i>Chat Now</router-link
              >
              <router-link
                to="/patient-appointments"
                class="btn btn-md btn-primary-gradient rounded-pill"
                ><i class="isax isax-calendar-tick5"></i>Attend</router-link
              >
            </div>
          </div>
          <div class="appointment-dash-card">
            <div class="doctor-fav-list">
              <div class="doctor-info-profile">
                <a href="#" class="table-avatar">
                  <img src="@/themes/doccure/assets/img/doctors/doctor-17.jpg" alt="Img" />
                </a>
                <div class="doctor-name-info">
                  <h5><a href="#">Dr.Juliet Gabriel</a></h5>
                  <span class="fs-12 fw-medium">Cardiologist</span>
                </div>
              </div>
              <a href="#" class="cal-plus-icon"><i class="isax isax-video5"></i></a>
            </div>
            <div class="date-time">
              <p><i class="isax isax-clock5"></i>22 Mar 2024 - 10:30 PM</p>
            </div>
            <div class="card-btns gap-3">
              <router-link to="/chat" class="btn btn-md btn-light rounded-pill"
                ><i class="isax isax-messages-25"></i>Chat Now</router-link
              >
              <router-link
                to="/patient-appointments"
                class="btn btn-md btn-primary-gradient rounded-pill"
                ><i class="isax isax-calendar-tick5"></i>Attend</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard-card flex-fill">
      <div class="dashboard-card-head">
        <div class="header-title">
          <h5>Notifications</h5>
        </div>
        <div class="card-view-link">
          <a href="#">View All</a>
        </div>
      </div>
      <div class="dashboard-card-body">
        <div class="table-responsive">
          <table class="table dashboard-table">
            <tbody>
              <tr>
                <td>
                  <div class="table-noti-info">
                    <div class="table-noti-icon color-violet">
                      <i class="fa-solid fa-bell"></i>
                    </div>

                    <div class="table-noti-message">
                      <h6>
                        <a href="#"
                          >Booking Confirmed on <span> 21 Mar 2024 </span> 10:30 AM</a
                        >
                      </h6>
                      <span class="message-time">Just Now</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-noti-info">
                    <div class="table-noti-icon color-blue">
                      <i class="fa-solid fa-star"></i>
                    </div>

                    <div class="table-noti-message">
                      <h6>
                        <a href="#"
                          >You have a <span> New </span> Review for your Appointment
                        </a>
                      </h6>
                      <span class="message-time">5 Days ago</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-noti-info">
                    <div class="table-noti-icon color-red">
                      <i class="isax isax-calendar-tick5"></i>
                    </div>

                    <div class="table-noti-message">
                      <h6>
                        <a href="#"
                          >You have Appointment with <span> Ahmed </span> by 01:20 PM
                        </a>
                      </h6>
                      <span class="message-time">12:55 PM</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-noti-info">
                    <div class="table-noti-icon color-yellow">
                      <i class="fa-solid fa-money-bill-1-wave"></i>
                    </div>

                    <div class="table-noti-message">
                      <h6>
                        <a href="#"
                          >Sent an amount of <span> $200 </span> for an Appointment by
                          01:20 PM
                        </a>
                      </h6>
                      <span class="message-time">2 Days ago</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-noti-info">
                    <div class="table-noti-icon color-blue">
                      <i class="fa-solid fa-star"></i>
                    </div>

                    <div class="table-noti-message">
                      <h6>
                        <a href="#"
                          >You have a <span> New </span> Review for your Appointment
                        </a>
                      </h6>
                      <span class="message-time">5 Days ago</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Dashboard_Appointment from "@/themes/doccure/assets/json/dashboard-appointment.json";
export default {
  data() {
    return {
      Dashboard_Appointment: Dashboard_Appointment,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        575: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "center",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>
