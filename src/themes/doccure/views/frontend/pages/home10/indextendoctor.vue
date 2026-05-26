<template>
  <!-- Doctors section -->
  <div class="doctors-section-fifteen">
    <div class="doctor-fifteen-icon">
      <img src="@/themes/doccure/assets/img/fifteen-bg-icon-2.png" alt="Icon" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-fifteen text-center">
            <h2>Our <span>Expert Doctors</span></h2>
            <p>The Great Place Of ENT Hospital Center</p>
          </div>
        </div>
      </div>
      <div
        class="owl-carousel doctor-slider-fifteen owl-theme aos"
        data-aos="fade-up"
      >
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="item in indextendoctor" :key="item.id">
            <div class="item item-fifteen">
              <div class="doctor-profile-widget text-start">
                <div class="doc-pro-img">
                  <router-link to="/doctor-profile">
                    <div class="doctor-profile-img">
                      <img
                        :src="require(`@/themes/doccure/assets/img/doctors/${item.ImageSrc}`)"
                        class="img-fluid"
                        alt="Icon"
                      />
                    </div>
                  </router-link>
                  <div class="doctor-amount">
                    <a
                      href="javascript:void(0)"
                      class="fav-icon"
                      :class="{ selected: item.isFavourite }"
                      @click="toggleFavourite(item)"
                    >
                      <i class="feather-heart"></i>
                    </a>
                  </div>
                  <div class="item-info">
                    <h6>{{ item.YearsExperience }}</h6>
                  </div>
                </div>
                <div class="doc-content-fift">
                  <router-link to="/doctor-profile">{{
                    item.DoctorName
                  }}</router-link>
                  <p>{{ item.Specialization }}</p>
                  <div class="rate-fifteen">
                    <div class="rate-four">
                      <i class="fa-regular fa-star me-2"></i
                      ><span>{{ item.Rating }}</span>
                    </div>
                    <ul>
                      <li>{{ item.Mon }}</li>
                      <li>{{ item.Tue }}</li>
                      <li>{{ item.Wed }}</li>
                      <li>{{ item.Thu }}</li>
                      <li>{{ item.Fri }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <div class="owl-nav">
              <Navigation />
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
  <!-- /blog section -->

  <!-- Pharmacy Section -->
  <section class="pharmacy-section-fifteen">
    <div class="sec-bg">
      <img src="@/themes/doccure/assets/img/bg/tablet-bg.png" class="tablet-left" alt="Img" />
      <img
        src="@/themes/doccure/assets/img/bg/round-tablet-bg.png"
        class="tablet-right"
        alt="Img"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-fifteen text-center">
            <h2>Online <span>Pharmacy Store</span></h2>
            <p>More the quantity, higher the discount. Hurry, Buy Now!</p>
          </div>
        </div>
      </div>
      <div
        class="owl-carousel pharmacy-slider-fifteen owl-theme aos"
        data-aos="fade-up"
      >
        <Carousel
          :wrap-around="true"
          :settings="settingspharmacy"
          :breakpoints="breakpointspharmacy"
        >
          <Slide v-for="item in indextenpharmacy" :key="item.id">
            <div class="item item-fifteen w-100">
              <div class="doctor-profile-widget doctor-profile-widget-fift">
                <div class="doc-pro-img doc-pro-img-fifteen">
                  <router-link to="/doctor-profile">
                    <div class="doctor-profile-img doctor-profile-img-fifteen">
                      <img
                        :src="require(`@/themes/doccure/assets/img/${item.ImageSrc}`)"
                        class="img-fluid"
                        alt="Doctor"
                      />
                    </div>
                  </router-link>
                  <div class="doctor-amount">
                    <a
                      href="javascript:void(0)"
                      class="fav-icon fav-icon-fifteen"
                      :class="{ selected: item.isFavourite }"
                      @click="toggleFavourite1(item)"
                    >
                      <i class="feather-heart"></i>
                    </a>
                  </div>
                  <div class="item-info">
                    <h6>{{ item.Discount }}</h6>
                  </div>
                  <div class="overlay-icons">
                    <router-link to="/cart"
                      ><i class="fa-solid fa-cart-shopping"></i
                    ></router-link>
                    <a href="#"><i class="fa-solid fa-heart"></i></a>
                  </div>
                </div>
                <div
                  class="doc-content-fift d-flex justify-content-between align-items-center"
                >
                  <div class="name-product">
                    <a href="#">{{ item.ProductName }}</a>
                    <p>{{ item.SoldBy }}</p>
                  </div>
                  <h3 class="product-price">{{ item.Price }}</h3>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <div class="owl-nav">
              <Navigation />
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <!-- /Pharmacy section -->

  <!-- Feedback -->
  <section class="feedback-section-fifteen">
    <div class="container">
      <div class="feedback-schedule-all">
        <div class="row">
          <div class="col-lg-5">
            <div class="feedback-inner-main">
              <img
                src="@/themes/doccure/assets/img/feedback-fifteen.png"
                alt="image"
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="feedback-fifteen-content">
              <h3>Consult top doctors online for any health concern</h3>
              <p>Connect within 60secs</p>
              <router-link to="/register">Signup Now</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Feedback -->

  <!-- contact -->
  <section class="appointment-section-fifteen">
    <div class="container">
      <div class="row">
        <div class="col-lg-7">
          <div class="appointment-schedule-main">
            <h2>Book Appointment</h2>
            <h6>More the quantity, higher the discount. Hurry, Buy Now!</h6>
            <p>
              We approach each patient with empathy and understanding,
              recognizing the importance of a supportive and caring environment.
              Striving for excellence in everything we do, we are committed to
              staying at the forefront of medical advancements to provide the
              best possible care.
            </p>
            <ul>
              <li>
                <div class="appointment-schedule-img">
                  <img
                    src="@/themes/doccure/assets/img/icons/experience-4.svg"
                    alt="Experience"
                  />
                  <div class="appoint-inner-img">
                    <img
                      src="@/themes/doccure/assets/img/icons/experience-3.svg"
                      alt="Experience"
                    />
                  </div>
                </div>
                <span>Find Experience Doctors</span>
              </li>
              <li>
                <div class="appointment-schedule-img">
                  <img
                    src="@/themes/doccure/assets/img/icons/experience-5.svg"
                    alt="Experience"
                  />
                  <div class="appoint-inner-img">
                    <img
                      src="@/themes/doccure/assets/img/icons/experience-1.svg"
                      alt="Experience"
                    />
                  </div>
                </div>
                <span>Share your Health Issues</span>
              </li>
              <li>
                <div class="appointment-schedule-img">
                  <img
                    src="@/themes/doccure/assets/img/icons/experience-6.svg"
                    alt="Experience"
                  />
                  <div class="appoint-inner-img">
                    <img
                      src="@/themes/doccure/assets/img/icons/experience-2.svg"
                      alt="Experience"
                    />
                  </div>
                </div>
                <span>Get solution about health</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="appointment-right-image appoint-fift-img">
            <img
              src="@/themes/doccure/assets/img/appointment-ryt-1.png"
              alt="Experience"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /contact -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import indextendoctor from "@/themes/doccure/assets/json/indextendoctor.json";
import indextenpharmacy from "@/themes/doccure/assets/json/indextenpharmacy.json";
import indextenbook from "@/themes/doccure/assets/json/indextenbook.json";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      indextendoctor: indextendoctor,
      indextenpharmacy: indextenpharmacy,
      indextenbook: indextenbook,
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
        // 700px and up
        991: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 2.99,
          snapAlign: "start",
        },
      },
      settingspharmacy: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      breakpointspharmacy: {
        575: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 700px and up
        991: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },
    };
  },
  methods: {
    toggleFavourite(item) {
      item.isFavourite = !item.isFavourite;
    },
    toggleFavourite1(item) {
      item.isFavourite = !item.isFavourite;
    },
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
