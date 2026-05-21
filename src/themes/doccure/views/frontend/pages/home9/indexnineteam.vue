<template>
  <!-- Choose us -->
  <section class="choose-us-fourteen">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="choose-us-image aos" data-aos="fade-up">
            <img
              src="@/themes/doccure/assets/img/choose-us-six.png"
              alt="image"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="choose-content aos" data-aos="fade-up">
            <div class="section-header-fourteen">
              <h6>Why Choose us</h6>
              <h2>
                We’ll Ensure You Always Get the Best <span>Treatment.</span>
              </h2>
              <p>
                We are effectively communicate the compassionate care,
                expertise, and comprehensive services offered by your fertility
                hospital, inspiring hope and confidence in patients seeking
                assistance with their fertility challenges.
              </p>
            </div>
            <ul>
              <li>
                Core of our mission is commitment to excellence in patient care.
              </li>
              <li>
                We strive to enhance the quality of life for individuals of all
                ages
              </li>
              <li>Addressing with precision & latest medical advancements.</li>
            </ul>
            <div class="choose-list">
              <div class="num-item">
                <h3>500+</h3>
                <h5>Doctors Available</h5>
              </div>
              <div class="num-item">
                <h3>2k+</h3>
                <h5>Appointments</h5>
              </div>
              <div class="num-item">
                <h3>100%</h3>
                <h5>Patient Satisfaction</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-shapes">
        <img
          src="@/themes/doccure/assets/img/icons/bg-icon-01.svg"
          alt="image"
          class="img-fluid shape-1"
        />
        <img
          src="@/themes/doccure/assets/img/icons/bg-icon-02.svg"
          alt="image"
          class="img-fluid shape-2"
        />
      </div>
    </div>
  </section>
  <!-- /Choose us -->

  <!-- Team Section -->
  <div class="team-section-fourteen">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div
            class="section-header-fourteen text-center aos"
            data-aos="fade-up"
          >
            <h2>Qualified <span>Doctors</span></h2>
            <p>
              Pregnancy services typically refer to a range of medical,
              emotional, and practical support provided to individuals who are
              pregnant or planning a pregnancy.
            </p>
          </div>
        </div>
      </div>
      <div
        class="owl-carousel team-fourteen-slider nav-center owl-theme aos"
        data-aos="fade-up"
      >
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="record in IndexNineTeam" :key="record.id">
            <div class="item">
              <div class="our-doctors-card text-start">
                <div class="doctors-header">
                  <router-link to="/doctor-profile"
                    ><img
                      :src="require(`@/themes/doccure/assets/img/doctors/${record.Image}`)"
                      alt="Dr. Marie Wells"
                      class="img-fluid"
                  /></router-link>
                </div>
                <div class="doctors-body">
                  <router-link to="/doctor-profile">
                    <h4>{{ record.Name }}</h4>
                  </router-link>
                  <p>{{ record.Specialty }}</p>
                  <div class="rating">
                    <i class="fas fa-star filled me-1"></i>
                    <i class="fas fa-star filled me-1"></i>
                    <i class="fas fa-star filled me-1"></i>
                    <i :class="record.StarClass"></i>
                    <i :class="record.StarClassOne"></i>
                    <span class="d-inline-block">{{ record.Rating }}</span>
                  </div>
                  <div class="location">
                    <p><i class="feather-map-pin"></i>{{ record.Location }}</p>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span class="view-btn" tabindex="0">{{
                      record.Price
                    }}</span>
                    <router-link to="/booking" class="btn book-btn btn-primary btn-primary"
                      >Consult Now</router-link
                    >
                  </div>
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
    <div class="bg-shapes">
      <img src="@/themes/doccure/assets/img/bg/benefit-bg.png" alt="image" class="img-fluid" />
    </div>
  </div>
  <!-- /Team Section -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexNineTeam from "@/themes/doccure/assets/json/indexnineteam.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexNineTeam: IndexNineTeam,
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
};
</script>
