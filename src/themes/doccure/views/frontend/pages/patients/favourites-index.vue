<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-xl-3 theiaStickySidebar">
            <!-- Profile Sidebar -->
            <profilesidebar></profilesidebar>
            <!-- / Profile Sidebar -->
          </div>
          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Favourites</h3>
              <ul class="header-list-btns">
                <li>
                  <div class="input-block dash-search-input">
                    <input type="text" class="form-control" placeholder="Search" />
                    <span class="search-icon"
                      ><i class="isax isax-search-normal"></i
                    ></span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Favourites -->
            <div class="row">
              <div
                class="col-md-6 col-lg-4"
                v-for="item in patientfavourite"
                :key="item.id"
              >
                <div class="profile-widget patient-favour">
                  <div class="fav-head">
                    <a href="javascript:void(0)" class="fav-btn favourite-btn">
                      <span
                        class="favourite-icon"
                        :class="{ favourite: item.isFavourite }"
                        @click="toggleFavourite(item)"
                      >
                        <i class="isax isax-heart5"></i>
                      </span>
                    </a>
                    <div class="doc-img">
                      <router-link to="/doctor-profile">
                        <img
                          class="img-fluid"
                          alt="User Image"
                          :src="require(`@/themes/doccure/assets/img/doctors/${item.DoctorImg}`)"
                        />
                      </router-link>
                    </div>
                    <div class="pro-content">
                      <h3 class="title">
                        <router-link to="/doctor-profile">{{
                          item.DoctorName
                        }}</router-link>
                        <i class="isax isax-tick-circle5 verified"></i>
                      </h3>
                      <p class="speciality">
                        {{ item.speciality }}
                      </p>
                      <div class="rating">
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star filled me-1"></i>
                        <i :class="item.Class"></i>
                        <span class="d-inline-block average-rating">{{
                          item.Views
                        }}</span>
                      </div>
                      <ul class="available-info">
                        <li>
                          <span><i class="isax isax-calendar5 me-1"></i></span
                          >{{ item.Available }}
                        </li>
                        <li>
                          <span><i class="isax isax-location5 me-1"></i></span
                          >{{ item.Location }}
                        </li>
                      </ul>
                      <div class="last-book">
                        <p>{{ item.Booking }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="fav-footer">
                    <div class="row row-sm">
                      <div class="col-6">
                        <router-link
                          to="/doctor-profile"
                          class="btn btn-md btn-light w-100"
                          >View Details</router-link
                        >
                      </div>
                      <div class="col-6">
                        <router-link
                          to="/booking"
                          class="btn btn-md btn-outline-primary w-100"
                          >Book Now</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Favourites -->

            <div class="col-md-12">
              <div class="loader-item text-center">
                <a href="javascript:void(0);" class="btn btn-load">Load More</a>
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
import patientfavourite from "@/themes/doccure/assets/json/patientfavourites.json";

export default {
  data() {
    return {
      title: "Patient",
      text: "Favourites",
      text1: "Favourites",
      patientfavourite: patientfavourite,
      isFavourite: false,
    };
  },
  methods: {
    toggleFavourite(item) {
      item.isFavourite = !item.isFavourite;
    },
  },
};
</script>
