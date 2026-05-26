<template>
  <!-- Home Banner -->
  <section class="doctor-search-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7 aos" data-aos="fade-up">
          <div class="doctor-search">
            <div class="banner-header">
              <h2><span>Search Doctor,</span> Make an Appointment</h2>
              <p>Access to expert physicians and surgeons, advanced technologies and top-quality surgery facilities right here.</p>
            </div>
            <div class="doctor-form">
              <form action="#" class="doctor-search">
                <div class="input-box-twelve">
                  <div class="search-input input-block">
                    <input type="text" class="form-control" placeholder="Location"> 
                    <a class="current-loc-icon current_location" href="javascript:void(0);">
                      <i class="isax isax-location"></i>
                    </a>
                  </div>
                  <div class="search-input input-block">											
                    <vue-select
                      :options="CardSel"
                      id="cardsel"
                      placeholder="Select Department"
                    />	
                    <a class="current-loc-icon current_location" href="javascript:void(0);">
                      <i class="isax isax-user-tag"></i>
                    </a>
                  </div>
                  <div class="input-block">
                    <div class="search-btn-info">
                      <router-link to="/search-2" class="btn btn-primary">
                        <i class="isax isax-search-normal"></i>Search
                      </router-link>
                    </div>
                  </div>										
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-5 aos" data-aos="fade-up">
          <img src="@/themes/doccure/assets/img/banner/doctor-banner.png" class="img-fluid dr-img" alt="doctor-image">
        </div>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->

  <!-- Clinic Section -->
  <section class="clinics-section">
    <div class="shapes">
      <img
        src="@/themes/doccure/assets/img/shapes/shape-1.png"
        alt="Image"
        class="img-fluid shape-1"
      />
      <img
        src="@/themes/doccure/assets/img/shapes/shape-2.png"
        alt="Image"
        class="img-fluid shape-2"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 aos" data-aos="fade-up">
          <div class="section-heading">
            <h2>Clinic & Specialities</h2>
            <p>
              Access to expert physicians and surgeons, advanced technologies
              and top-quality surgery facilities right here.
            </p>
          </div>
        </div>
        <div class="col-md-6 text-end aos" data-aos="fade-up">
          <div class="owl-nav slide-nav-1 text-end nav-control"></div>
        </div>
      </div>
      <div class="owl-carousel clinics owl-theme">
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="item in indexThreeBanner" :key="item.id">
            <div class="item">
              <div class="clinic-item">
                <div class="clinics-card">
                  <div class="clinics-img">
                    <img
                      :src="require(`@/themes/doccure/assets/img/clinic/${item.Image}`)"
                      alt="Image"
                    />
                  </div>
                  <div class="clinics-info">
                    <span class="clinic-img">
                      <img
                        :src="require(`@/themes/doccure/assets/img/category/${item.Logo}`)"
                        alt="kidney-image"
                        class="img-fluid"
                      />
                    </span>
                    <a href="#"
                      ><span>{{ item.Title }}</span></a
                    >
                  </div>
                </div>
                <div class="clinics-icon">
                  <a href="javascript:;"
                    ><i class="fas fa-long-arrow-alt-right"></i
                  ></a>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <!-- /Clinic Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import indexThreeBanner from "@/themes/doccure/assets/json/indexthreebanner.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      CardSel: ["Select Department", "Cardiology", "Neurology", "Urology"],
      indexThreeBanner: indexThreeBanner,
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
          itemsToShow: 6,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
