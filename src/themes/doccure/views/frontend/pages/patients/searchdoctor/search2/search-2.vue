<template>
  <div class="main-wrapper search-page">
    <patient-header></patient-header>
    <div class="breadcrumb-bar overflow-visible">
      <div class="container">
        <div class="row align-items-center inner-banner">
          <div class="col-md-12 col-12 text-center">
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/index"><i class="isax isax-home-15"></i></router-link>
                </li>
                <li class="breadcrumb-item">Doctor</li>
                <li class="breadcrumb-item active">Doctor List</li>
              </ol>
              <h2 class="breadcrumb-title">Doctor List</h2>
            </nav>
          </div>
        </div>
        <div class="bg-primary-gradient rounded-pill doctors-search-box">
          <div class="search-box-one rounded-pill">
            <form action="#">
              <div class="search-input search-line">
                <i class="isax isax-hospital5 bficon"></i>
                <div class="mb-0">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search for Doctors, Hospitals, Clinics"
                  />
                </div>
              </div>
              <div class="search-input search-map-line">
                <i class="isax isax-location5"></i>
                <div class="mb-0">
                  <input type="text" class="form-control" placeholder="Location" />
                </div>
              </div>
              <div class="search-input search-calendar-line">
                <i class="isax isax-calendar-tick5"></i>
                <div class="mb-0">
                  <datepicker
                    v-model="startdate"
                    class="datetimepicker form-control"
                    :editable="true"
                    :clearable="false"
                    :input-format="dateFormat"
                  />
                </div>
              </div>
              <div class="form-search-btn">
                <button
                  class="btn btn-primary d-inline-flex align-items-center rounded-pill"
                  type="submit"
                >
                  <i class="isax isax-search-normal-15 me-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="breadcrumb-bg">
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-bg-01.png"
          alt="img"
          class="breadcrumb-bg-01"
        />
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-bg-02.png"
          alt="img"
          class="breadcrumb-bg-02"
        />
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-icon.png"
          alt="img"
          class="breadcrumb-bg-03"
        />
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-icon.png"
          alt="img"
          class="breadcrumb-bg-04"
        />
      </div>
    </div>

    <div class="content mt-5">
      <div class="container">
        <div class="row">
          <search2filter></search2filter>
          <div class="col-lg-9">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="mb-4">
                  <h3>Showing <span class="text-secondary">450</span> Doctors For You</h3>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center justify-content-end mb-4">
                  <div class="doctor-filter-availability me-2">
                    <p>Availability</p>
                    <div class="status-toggle status-tog">
                      <input type="checkbox" id="status_6" class="check" />
                      <label for="status_6" class="checktoggle">checkbox</label>
                    </div>
                  </div>
                  <div class="dropdown header-dropdown me-2">
                    <a
                      class="dropdown-toggle sort-dropdown"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                      aria-expanded="false"
                    >
                      <span>Sort By</span>Price (Low to High)
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="javascript:void(0);" class="dropdown-item">
                        Price (Low to High)
                      </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        Price (High to Low)
                      </a>
                    </div>
                  </div>
                  <router-link
                    to="/doctor-grid"
                    @click="redirectReloadSearch"
                    class="btn btn-sm head-icon me-2"
                    ><i class="isax isax-grid-7"></i
                  ></router-link>
                  <router-link to="/search-2" class="btn btn-sm head-icon active me-2"
                    ><i class="isax isax-row-vertical"></i
                  ></router-link>
                  <router-link
                    to="/map-list"
                    @click="redirectReloadSearchOne"
                    class="btn btn-sm head-icon"
                    ><i class="isax isax-location"></i
                  ></router-link>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12" v-for="item in search2" :key="item.id">
                <div class="card doctor-list-card">
                  <div class="d-md-flex align-items-center">
                    <div class="card-img card-img-hover">
                      <router-link to="/doctor-profile"
                        ><img
                          :src="require(`@/themes/doccure/assets/img/doctor-grid/${item.DoctorImg}`)"
                          alt=""
                      /></router-link>
                      <div
                        class="grid-overlay-item d-flex align-items-center justify-content-between"
                      >
                        <span class="badge bg-orange"
                          ><i class="fa-solid fa-star me-1"></i>{{ item.Star }}</span
                        >
                        <a href="javascript:void(0)" class="fav-icon">
                          <i class="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                    <div class="card-body p-0">
                      <div
                        class="d-flex align-items-center justify-content-between border-bottom p-3"
                      >
                        <a href="#" class="text-teal fw-medium fs-14">{{
                          item.Speciality
                        }}</a>
                        <span :class="item.class">
                          <i class="fa-solid fa-circle fs-5 me-1"></i>
                          {{ item.Available }}
                        </span>
                      </div>
                      <div class="p-3">
                        <div class="doctor-info-detail pb-3">
                          <div class="row align-items-center gy-3">
                            <div class="col-sm-6">
                              <div>
                                <h6 class="d-flex align-items-center mb-1">
                                  <router-link to="/doctor-profile">{{
                                    item.DoctorName
                                  }}</router-link>
                                  <i class="isax isax-tick-circle5 text-success ms-2"></i>
                                </h6>
                                <p class="mb-2">{{ item.Speciality }}</p>
                                <p class="d-flex align-items-center mb-0 fs-14">
                                  <i class="isax isax-location me-2"></i
                                  >{{ item.Location }}
                                  <a
                                    href="#"
                                    class="text-primary text-decoration-underline ms-2"
                                    >Get Direction</a
                                  >
                                </p>
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div>
                                <p class="d-flex align-items-center mb-0 fs-14 mb-2">
                                  <i class="isax isax-language-circle text-dark me-2"></i
                                  >{{ item.Langauge }}
                                </p>
                                <p class="d-flex align-items-center mb-0 fs-14 mb-2">
                                  <i class="isax isax-like-1 text-dark me-2"></i
                                  >{{ item.percentage }}
                                </p>
                                <p class="d-flex align-items-center mb-0 fs-14">
                                  <i class="isax isax-archive-14 text-dark me-2"></i
                                  >{{ item.Years }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mt-3"
                        >
                          <div class="d-flex align-items-center flex-wrap row-gap-3">
                            <div class="me-3">
                              <p class="mb-1">Consultation Fees</p>
                              <h3 class="text-orange">{{ item.Price }}</h3>
                            </div>
                            <p class="mb-0">
                              Next available at <br />{{ item.AvailableTime }}
                            </p>
                          </div>
                          <router-link
                            to="/booking"
                            class="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                          >
                            <i class="isax isax-calendar-1 me-2"></i>
                            Book Appointment
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="pagination dashboard-pagination mt-md-3 mt-0 mb-4">
                  <ul>
                    <li>
                      <a href="#" class="page-link prev">Prev</a>
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
                      <a href="#" class="page-link next">Next</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-lg-12 theiaStickySidebar">
      <search2map></search2map>
    </div>

    <indexfooter></indexfooter>
  </div>
</template>
<script>
import search2 from "@/themes/doccure/assets/json/searchdoctor/search2.json";
import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      title: "Search Doctors",
      text: "Home",
      text1: "Search Doctors",
      search2: search2,
      Sort: ["A to Z", "B to Z", "C to Z", "D to Z", "E to Z"],
      isFavourite: false,
      startdate: currentDate,
    };
  },
  methods: {
    toggleFavourite(item) {
      item.isFavourite = !item.isFavourite;
    },
    redirectReloadSearch() {
      this.$router.push({ path: "/doctor-grid" }).then(() => {
        this.$router.go();
      });
    },
    redirectReloadSearchOne() {
      this.$router.push({ path: "/map-list" }).then(() => {
        this.$router.go();
      });
    },
  },
  mounted() {
    const mapListButton = document.getElementById("map-list");
    if (mapListButton) {
      mapListButton.addEventListener("click", function () {
        var container = this.closest(".container");
        if (container) {
          container.classList.add("container-fluid");
          container.classList.remove("container");
        }

        var mapView = document.querySelector(".map-view");
        if (mapView) {
          mapView.classList.remove("col-xl-12");
          mapView.classList.add("col-xl-9");
        }

        var mapRight = document.querySelector(".map-right");
        if (mapRight) {
          mapRight.style.display = "block";
        }

        var timeSlotSlider = document.getElementsByClassName("time-slot-slider")[0];
        if (timeSlotSlider && timeSlotSlider.slick && timeSlotSlider.slick.refresh) {
          timeSlotSlider.slick.refresh();
        }
      });
    }
  },
};
</script>
