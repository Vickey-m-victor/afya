<template>
  <!-- Home Banner -->
  <section class="doctor-search-section doctor-search-eleven">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 aos" data-aos="fade-up">
          <div class="banner-header">
            <p>Take Eye Care Solution from Experts</p>
            <h1>Eye care & holistic Care experts</h1>
          </div>
          <div class="search-box-fourteen aos" data-aos="fade-up">
            <form @submit.prevent="submitForm" class="form-block d-flex">
              <div class="search-input">
                <div class="forms-block">
                  <label class="mb-0">Date</label>
                  <datepicker
                    v-model="startdate"
                    class="datetimepicker form-control"
                    :editable="true"
                    :clearable="false"
                    :input-format="dateFormat"
                  />
                </div>
              </div>
              <div class="search-input">											
                <div class="forms-block mb-0">
                  <label class="location-icon">Location</label>
                  <input type="text" class="form-control" placeholder="San Diego Branch">
                </div>
              </div>
              <div class="search-btn">
                <button class="btn btn-primary" type="submit">Book Appointment</button>
              </div>
            </form>
          </div>
          <div class="banner-users">
            <h6><img src="@/themes/doccure/assets/img/icons/star.svg" alt="img">4.8 Well Experienced</h6>
            <ul>
              <li>
                <router-link to="doctor-profile"><img src="@/themes/doccure/assets/img/doctor-profiles/doc-profile-01.jpg" alt="img"></router-link>
              </li>
              <li>
                <router-link to="doctor-profile"><img src="@/themes/doccure/assets/img/doctor-profiles/doc-profile-02.jpg" alt="img"></router-link>
              </li>
              <li>
                <router-link to="doctor-profile"><img src="@/themes/doccure/assets/img/doctor-profiles/doc-profile-03.jpg" alt="img"></router-link>
              </li>
              <li>
                <router-link to="doctor-profile"><img src="@/themes/doccure/assets/img/doctor-profiles/doc-profile-04.jpg" alt="img"></router-link>
              </li>
              <li>
                <router-link to="doctor-profile"><img src="@/themes/doccure/assets/img/doctor-profiles/doc-profile-05.jpg" alt="img"></router-link>
              </li>
              <li>
                <router-link to="doctor-profile"><img src="@/themes/doccure/assets/img/doctor-profiles/doc-profile-06.jpg" alt="img"></router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6 aos" data-aos="fade-up">
          <img src="@/themes/doccure/assets/img/banner-11.png" class="img-fluid dr-img dr-eye-home-img" alt="eye-doctor">
        </div>
      </div>
    </div>
    <div class="ban-bg">
      <img src="@/themes/doccure/assets/img/bg/eyecare-home-bg-01.png" class="bg-01" alt="Img">
    </div>
  </section>
  <!-- /Home Banner -->

  <!-- Specialties Section -->
  <section class="special-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="section-heading sec-heading-eye text-center">
            <h2><span>Our</span> Specialties</h2>
            <p>The Great Place Of Eyecare Hospital Center</p>
          </div>
        </div>
      </div>
      <div class="owl-carousel special owl-them aos" data-aos="fade-up">
        <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="item in indexSixBanner" :key="item.id">
            <div class="item">
              <div class="special-item">
                <div class="special-img">
                  <router-link to="/consultation"
                    ><img
                      :src="require(`@/themes/doccure/assets/img/clinic/${item.Image}`)"
                      alt="eye-clinic"
                      class="img-fluid"
                  /></router-link>
                </div>
                <div class="special-icon">
                  <router-link to="/consultation"
                    ><i class="fa-solid fa-circle-chevron-right"></i
                  ></router-link>
                </div>
                <h6>
                  <router-link to="/consultation">{{ item.Title }}</router-link>
                </h6>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <!-- /Specialties Section -->
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import indexSixBanner from "@/themes/doccure/assets/json/indexsixbanner.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      indexSixBanner: indexSixBanner,
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
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
          itemsToShow: 3,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 4,
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
      this.$router.push("/booking-2");
    },
  },
};
</script>
