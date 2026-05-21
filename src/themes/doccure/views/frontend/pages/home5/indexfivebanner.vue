<template>
  <!-- Home Banner -->
  <section class="banner-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <div class="banner-content aos" data-aos="fade-up">
            <div class="beat-wrap">
              <span
                ><img src="@/themes/doccure/assets/img/icons/heart-icon.svg" alt="heart-icon"
              /></span>
              <h6>Every Beat, Every Moment</h6>
            </div>
            <h1>Preventive care is essential for <span>Healthy Heart</span></h1>
            <p>
              We can guide you through issues like Cardiac arrest, Heart
              Failure, Peripheral Artery Disease, Arrhythmia, Atrial
              Fibrillation, Cholesterol and High BP.
            </p>
          </div>
          <form action="javascript:void(0)" class="doctor-search">
            <div class="input-box-twelve">
              <div class="search-input input-block search-line">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                />
                <a
                  class="current-loc-icon current_location"
                  href="javascript:void(0);"
                >
                  <i class="fa-solid fa-location-dot"></i>
                </a>
              </div>
              <div class="search-input input-block">
                <datepicker
                  v-model="startdate"
                  placeholder="Select Date"
                  class="form-control datetimepicker"
                  :editable="true"
                  :clearable="false"
                  :input-format="dateFormat"
                />
                <a
                  class="current-loc-icon current_location"
                  href="javascript:void(0);"
                >
                  <i class="fa-solid fa-calendar-days"></i>
                </a>
              </div>
              <div class="input-block">
                <div class="search-btn-info">
                  <router-link to="/search-2">Search Doctor</router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->

  <!-- Service Section -->
  <section class="service-section">
    <div class="bg-shapes">
      <img src="@/themes/doccure/assets/img/bg/cardiac-bg.png" alt="image" />
    </div>
    <div class="container">
      <div class="row mx-auto">
        <div class="col-md-8 mx-auto aos" data-aos="fade-up">
          <div class="section-header-one section-header-slider">
            <h2 class="section-title">We Provide a Best Service For You</h2>
            <p>
              Cardiology services encompass a wide range of medical services
              related to diagnosis, treatment, and management of heart
              conditions & diseases.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="owl-carousel slider-service owl-theme p-0 nav-center">
            <Carousel
              :wrap-around="true"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide
                v-for="(speciality, index) in indexfivespecialities"
                :key="index"
              >
                <div class="service-wrap">
                  <router-link to="/search" class="service-img">
                    <img
                      :src="
                        require(`@/themes/doccure/assets/img/features/${speciality.imageSrc}`)
                      "
                      class="img-fluid"
                      alt="service image"
                    />
                    <div class="service-cont">
                      <h3>{{ speciality.altText }}</h3>
                      <p>{{ speciality.title }}</p>
                    </div>
                  </router-link>
                </div>
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center aos" data-aos="fade-up">
          <router-link to="/search" class="btn btn-primary"
            >View All Services</router-link
          >
        </div>
      </div>
    </div>
  </section>
  <!-- /Service Section -->
</template>

<script>
import { ref } from "vue";
const currentDate = ref(new Date());
import AOS from "aos";
import "aos/dist/aos.css";
import indexfivespecialities from "@/themes/doccure/assets/json/indexfivespecialities.json";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
      indexfivespecialities: indexfivespecialities,
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
          itemsToShow: 3,
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
  methods: {
    submitForm() {
      this.$router.push("/search-2");
    },
  },
};
</script>
