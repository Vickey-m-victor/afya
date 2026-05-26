<template>
  <div class="col-xl-7 d-flex flex-column">
    <div class="dashboard-card flex-fill">
      <div class="dashboard-card-head">
        <div class="header-title">
          <h5>Analytics</h5>
        </div>
        <div class="dropdown-links d-flex align-items-center flex-wrap">
          <div class="dropdown header-dropdown header-dropdown-two">
            <a
              class="dropdown-toggle"
              data-bs-toggle="dropdown"
              href="javascript:void(0);"
            >
              Mar 14 - Mar 21
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <a href="javascript:void(0);" class="dropdown-item"> This Week </a>
              <a href="javascript:void(0);" class="dropdown-item"> This Month </a>
              <a href="javascript:void(0);" class="dropdown-item"> This Year </a>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-card-body pb-1">
        <div class="chart-tabs">
          <ul class="nav" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                href="#"
                data-bs-toggle="tab"
                data-bs-target="#heart-rate"
                aria-selected="false"
                role="tab"
                tabindex="-1"
                >Heart Rate</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                href="#"
                data-bs-toggle="tab"
                data-bs-target="#blood-pressure"
                aria-selected="true"
                role="tab"
                >Blood Pressure</a
              >
            </li>
          </ul>
        </div>
        <div class="tab-content pt-0">
          <!-- Chart -->
          <div class="tab-pane fade active show" id="heart-rate" role="tabpanel">
            <div id="heart-rate-chart">
              <apexchart
                type="bar"
                height="220"
                :options="heartCharts.rateCharts"
                :series="heartCharts.series"
              ></apexchart>
            </div>
          </div>
          <!-- /Chart -->

          <!-- Chart -->
          <div class="tab-pane fade" id="blood-pressure" role="tabpanel">
            <div id="blood-pressure-chart">
              <apexchart
                type="bar"
                height="220"
                :options="bloodCharts.pressureCharts"
                :series="bloodCharts.series"
              ></apexchart>
            </div>
          </div>
          <!-- /Chart -->
        </div>
      </div>
    </div>
    <div class="dashboard-card flex-fill">
      <div class="dashboard-card-head">
        <div class="header-title">
          <h5>Past Appointments</h5>
        </div>
        <div class="card-view-link">
          <div class="owl-nav slide-nav2 text-end nav-control"></div>
        </div>
      </div>
      <div class="dashboard-card-body">
        <div class="past-appointments-slider owl-carousel">
          <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="record in Dashboard_Analytics" :key="record.id">
              <div class="appointment-dash-card past-appointment mt-0 text-start">
                <div class="doctor-fav-list">
                  <div class="doctor-info-profile">
                    <a href="#" class="table-avatar">
                      <img :src="require(`@/themes/doccure/assets/img/${record.Image}`)" alt="Img" />
                    </a>
                    <div class="doctor-name-info">
                      <h5>
                        <a href="#">{{ record.Name }}</a>
                      </h5>
                      <span>{{ record.Specialist }}</span>
                    </div>
                  </div>
                  <span class="bg-orange badge"
                    ><i class="isax isax-video5 me-1"></i>30 Min</span
                  >
                </div>
                <div class="appointment-date-info">
                  <h6>{{ record.Date }}</h6>
                  <ul>
                    <li>
                      <span><i class="isax isax-clock5"></i></span>{{ record.Time }}
                    </li>
                    <li>
                      <span><i class="isax isax-location5"></i></span
                      >{{ record.Location }}
                    </li>
                  </ul>
                </div>
                <div class="card-btns">
                  <router-link
                    to="/patient-appointments"
                    class="btn btn-md btn-outline-primary ms-0 me-3 rounded-pill"
                    >Reschedule</router-link
                  >
                  <router-link
                    to="/patient-appointment-details"
                    class="btn btn-md btn-primary-gradient rounded-pill"
                    >View Details</router-link
                  >
                </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
    <div class="dashboard-card flex-fill">
      <div class="dashboard-card-head">
        <div class="header-title">
          <h5>Dependant</h5>
        </div>
        <div class="card-view-link">
          <a
            href="#"
            class="add-new"
            data-bs-toggle="modal"
            data-bs-target="#add_dependent"
            ><i class="fa-solid fa-circle-plus me-1"></i>Add New</a
          >
          <router-link to="/dependent">View All</router-link>
        </div>
      </div>
      <div class="dashboard-card-body">
        <div class="doctor-fav-list">
          <div class="doctor-info-profile">
            <a href="#" class="table-avatar">
              <img src="@/themes/doccure/assets/img/patients/patient-20.jpg" alt="Img" />
            </a>
            <div class="doctor-name-info">
              <h5><a href="#">Laura</a></h5>
              <span>Mother - 58 years 20 days</span>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <a href="#" class="cal-plus-icon me-2"><i class="isax isax-calendar5"></i></a>
            <router-link to="/dependent" class="cal-plus-icon"
              ><i class="isax isax-eye4"></i
            ></router-link>
          </div>
        </div>
        <div class="doctor-fav-list">
          <div class="doctor-info-profile">
            <a href="#" class="table-avatar">
              <img src="@/themes/doccure/assets/img/patients/patient-21.jpg" alt="Img" />
            </a>
            <div class="doctor-name-info">
              <h5><a href="#">Mathew</a></h5>
              <span>Father - 59 years 15 days</span>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <a href="#" class="cal-plus-icon me-2"><i class="isax isax-calendar5"></i></a>
            <router-link to="/dependent" class="cal-plus-icon"
              ><i class="isax isax-eye4"></i
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Dashboard_Analytics from "@/themes/doccure/assets/json/dashboard-analytics.json";
import { heartCharts, bloodCharts } from "./data";
export default {
  data() {
    return {
      Dashboard_Analytics: Dashboard_Analytics,
      heartCharts: heartCharts,
      bloodCharts: bloodCharts,
      settings: {
        itemsToShow: 1,
        snapAlign: "start",
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
          itemsToShow: 1,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 1,
          snapAlign: "start",
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
