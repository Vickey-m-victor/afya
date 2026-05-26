<template>
  <div class="main-wrapper">
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
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="mb-4">
              <h3>Showing <span class="text-secondary">450</span> Doctors For You</h3>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-center justify-content-end mb-4">
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
              <router-link to="/doctor-grid" class="btn btn-sm head-icon me-2"
                ><i class="isax isax-grid-7"></i
              ></router-link>
              <router-link to="/search-2" class="btn btn-sm head-icon me-2"
                ><i class="isax isax-row-vertical"></i
              ></router-link>
              <router-link
                to="/map-list"
                @click="redirectReloadmaplist"
                class="btn btn-sm head-icon active"
                ><i class="isax isax-location"></i
              ></router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-9">
            <div class="row align-items-center mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-sm-4 col-6">
                    <div class="mb-4">
                      <vue-select
                        :options="Psychiatrymap"
                        id="psychiatrymap"
                        placeholder="Specialities"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-6">
                    <div class="mb-4">
                      <vue-select
                        :options="StatPaimap"
                        id="statpaimap"
                        placeholder="Reviews"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4 col-6">
                    <div class="mb-4">
                      <vue-select
                        :options="DentalSelmap"
                        id="dentalselmap"
                        placeholder="Clinic"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="text-end mb-3">
                  <a href="#" class="fw-medium text-secondary text-decoration-underline"
                    >Clear All</a
                  >
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3"
            >
              <div class="doctor-filter-availability">
                <p>Availability</p>
                <div class="status-toggle status-tog">
                  <input type="checkbox" id="status_6" class="check" />
                  <label for="status_6" class="checktoggle">checkbox</label>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <router-link
                  to="/map-grid"
                  @click="redirectReloadmapgrid"
                  class="btn btn-sm head-icon me-2"
                  ><i class="isax isax-grid-7"></i
                ></router-link>
                <router-link
                  to="/map-list"
                  @click="redirectReloadmaplist"
                  class="btn btn-sm head-icon active"
                  ><i class="isax isax-row-vertical"></i
                ></router-link>
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
          <div class="col-lg-3">
            <div id="map" class="map-listing"></div>
          </div>
        </div>
      </div>
      <!-- /content-left-->

      <!-- /map-right-->
    </div>
    <footerindex />
  </div>
</template>
<script>
import search2 from "@/themes/doccure/assets/json/searchdoctor/search2.json";
const icons = {
  default: require("@/themes/doccure/assets/img/marker.png"),
};

const locations = [
  {
    id: "01",
    doc_name: "Dr. Michael Brown",
    speciality: "Psychologist",
    address: "Minneapolis, MN",
    lat: 53.470692,
    lng: -2.220328,
    icons: "default",
    profile_link: "profile.html",
    total_review: "17",
    image: "doctor-grid/doctor-grid-01.jpg",
  },
  {
    id: "02",
    doc_name: "Dr. Darren Elder",
    speciality: "Psychologist",
    address: "Newyork, USA",
    lat: 53.469189,
    lng: -2.199262,
    icons: "default",
    profile_link: "profile.html",
    total_review: "35",
    image: "doctors/doctor-02.jpg",
  },
  {
    id: "03",
    doc_name: "Dr. Deborah Angel",
    speciality: "Psychologist",
    address: "Georgia, USA",
    lat: 53.468665,
    lng: -2.189269,
    icons: "default",
    profile_link: "profile.html",
    total_review: "27",
    image: "doctors/doctor-03.jpg",
  },
  {
    id: "04",
    doc_name: "Dr. Sofia Brient",
    speciality: "Psychologist",
    address: "Louisiana, USA",
    lat: 53.463894,
    lng: -2.17788,
    icons: "default",
    profile_link: "profile.html",
    total_review: "4",
    image: "doctors/doctor-04.jpg",
  },
  {
    id: "05",
    doc_name: "Dr. Marvin Campbell",
    speciality: "Psychologist",
    address: "Michigan, USA",
    lat: 53.466359,
    lng: -2.213314,
    icons: "default",
    profile_link: "profile.html",
    total_review: "66",
    image: "doctors/doctor-05.jpg",
  },
  {
    id: "06",
    doc_name: "Dr. Katharine Berthold",
    speciality: "Psychologist",
    address: "Texas, USA",
    lat: 53.463906,
    lng: -2.213271,
    icons: "default",
    profile_link: "profile.html",
    total_review: "52",
    image: "doctors/doctor-06.jpg",
  },
  {
    id: "07",
    doc_name: "Dr. Linda Tobin",
    speciality: "Psychologist",
    address: "Kansas, USA",
    lat: 53.461974,
    lng: -2.210661,
    icons: "default",
    profile_link: "profile.html",
    total_review: "43",
    image: "doctors/doctor-07.jpg",
  },
  {
    id: "08",
    doc_name: "Dr. Paul Richard",
    speciality: "Psychologist",
    address: "California, USA",
    lat: 53.458785,
    lng: -2.188532,
    icons: "default",
    profile_link: "profile.html",
    total_review: "49",
    image: "doctors/doctor-08.jpg",
  },
  {
    id: "09",
    doc_name: "Dr. John Gibbs",
    speciality: "Psychologist",
    address: "Oklahoma, USA",
    lat: 53.4558571,
    lng: -2.1950372,
    icons: "default",
    profile_link: "profile.html",
    total_review: "112",
    image: "doctors/doctor-09.jpg",
  },
  {
    id: 10,
    doc_name: "Dr. Olga Barlow",
    speciality: "Psychologist",
    address: "Montana, USA",
    lat: 53.45885,
    lng: -2.194549,
    icons: "default",
    profile_link: "profile.html",
    total_review: "65",
    image: "doctors/doctor-10.jpg",
  },
  {
    id: 11,
    doc_name: "Dr. Julia Washington",
    speciality: "Psychologist",
    address: "Oklahoma, USA",
    lat: 53.461733,
    lng: -2.194502,
    icons: "default",
    profile_link: "profile.html",
    total_review: "5",
    image: "doctors/doctor-11.jpg",
  },
  {
    id: 12,
    doc_name: "Dr. Shaun Aponte",
    speciality: "Psychologist",
    address: "Indiana, USA",
    lat: 53.460548,
    lng: -2.190956,
    icons: "default",
    profile_link: "profile.html",
    total_review: "5",
    image: "doctors/doctor-12.jpg",
  },
];

import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      search2: search2,
      Psychiatrymap: [
        "Specialities",
        "Urology",
        "Psychiatry",
        "Psychiatry",
        "Cardiology",
      ],
      StatPaimap: ["Reviews", "5 Star", "4 Star", "3 Star"],
      DentalSelmap: [
        "Clinic",
        "Bright Smiles Dental Clinic",
        "Family Care Clinic",
        "Express Health Clinic",
      ],
      // Sort: ["Rating", "Popular", "Latest", "Free"],
      icons: icons,
      locations: locations,
      startdate: currentDate,
    };
  },
  methods: {
    redirectReloadmapgrid() {
      this.$router.push({ path: "/map-grid" }).then(() => {
        this.$router.go();
      });
    },
    redirectReloadmaplist() {
      this.$router.push({ path: "/map-list" }).then(() => {
        this.$router.go();
      });
    },
  },
  mounted() {
    google.maps.visualRefresh = true;
    var slider,
      infowindow = null;
    var bounds = new google.maps.LatLngBounds();
    var map,
      current = 0;

    function show() {
      infowindow.close();
      if (!map.slide) {
        return;
      }
      var next, marker;
      if (locations.length == 0) {
        return;
      } else if (locations.length == 1) {
        next = 0;
      }
      if (locations.length > 1) {
        do {
          next = Math.floor(Math.random() * locations.length);
        } while (next == current);
      }
      current = next;
      marker = locations[next];
      setInfo(marker);
      infowindow.open(map, marker);
    }

    function initialize() {
      var bounds = new google.maps.LatLngBounds();
      var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(53.470692, -2.220328),
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      map.slide = true;

      setMarkers(map, locations);
      infowindow = new google.maps.InfoWindow({
        content: "loading...",
      });
      google.maps.event.addListener(infowindow, "closeclick", function () {
        infowindow.close();
      });
      slider = window.setTimeout(show, 3000);
    }
    function setInfo(marker) {
      var content =
        '<div class="card border-0" style="width: 100%; display: inline-block;">' +
        '<div class="card-body">' +
        '<div class="doc-img d-flex align-items-center">' +
        '<a href="' +
        marker.profile_link +
        '" class="avatar flex-shrink-0 me-2 avatar-xl avatar-rounded" tabindex="0" target="_blank">' +
        '<img class="img-fluid" alt="' +
        marker.doc_name +
        '" src="' +
        require(`@/themes/doccure/assets/img/${marker.image}`) +
        '">' +
        "</a>" +
        "<div>" +
        '<h6 class="title fs-16 mb-1">' +
        '<a href="' +
        marker.profile_link +
        '" tabindex="0">' +
        marker.doc_name +
        "</a>" +
        '<span class="badge bg-orange mt-1"><i class="fa-solid fa-star me-1"></i>5.0</span>' +
        "</h6>" +
        '<p class="speciality text-indigo">' +
        marker.speciality +
        "</p>" +
        "</div>" +
        "</div>" +
        '<div class="pro-content">' +
        '<ul class="available-info">' +
        '<li><i class="fas fa-map-marker-alt"></i> ' +
        marker.address +
        " </li>" +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</div>";
      infowindow.setContent(content);
    }

    function setMarkers(map, markers) {
      for (var i = 0; i < markers.length; i++) {
        var item = markers[i];
        var latlng = new google.maps.LatLng(item.lat, item.lng);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          doc_name: item.doc_name,
          address: item.address,
          speciality: item.speciality,
          next_available: item.next_available,
          amount: item.amount,
          profile_link: item.profile_link,
          total_review: item.total_review,
          animation: google.maps.Animation.DROP,
          icon: icons[item.icons],
          image: item.image,
        });
        bounds.extend(marker.position);
        markers[i] = marker;
        google.maps.event.addListener(marker, "click", function () {
          setInfo(this);
          infowindow.open(map, this);
          window.clearTimeout(slider);
        });
      }
      map.fitBounds(bounds);
      google.maps.event.addListener(map, "zoom_changed", function () {
        if (map.zoom > 16) map.slide = false;
      });
    }

    google.maps.event.addDomListener(window, "load", initialize);
  },
};
</script>
