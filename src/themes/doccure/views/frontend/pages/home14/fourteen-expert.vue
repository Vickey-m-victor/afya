<template>
  <!-- Expert Section -->
  <section class="experts-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-8">
          <div class="section-header">
            <h2>Our <span>Experts</span></h2>
            <p>
              We are a private health care dedicated to providing quality dental
              care in cosmetic, restorative, and general dentistry.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="expert-slider owl-carousel">
            <Carousel
              :wrap-around="true"
              :autoplay="3000"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide v-for="item in FourteenExpert" :key="item.id">
                <div class="expert-profile aos" data-aos="fade-down">
                  <div class="expert-img">
                    <router-link to="doctor-profile"
                      ><img
                        :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)"
                        alt="Img"
                    /></router-link>
                  </div>
                  <div class="expert-info text-start">
                    <h5>
                      <router-link to="doctor-profile">{{
                        item.Name
                      }}</router-link>
                    </h5>
                    <p>{{ item.Title }}</p>
                  </div>
                </div>
              </Slide>
              <template #addons> 
                <Navigation />
              </template>
            </Carousel>
          </div>
          <div class="view-button text-center">
            <router-link to="doctor-profile" class="btn btn-viewall"
              >View All Doctors</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="counter-sec">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-sm-6 aos" data-aos="fade-down">
            <div class="count-wrap">
              <h2>
                <vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="0"
                  :delay="3"
                  :endAmount="300"
                  :duration="5"
                  separator=","
                  :autoinit="true"
                />
                <span class="count-icon">+</span>
              </h2>
              <p>Clinics</p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 aos" data-aos="fade-down">
            <div class="count-wrap">
              <h2>
                <vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="0"
                  :delay="3"
                  :endAmount="22"
                  :duration="5"
                  separator=","
                  :autoinit="true"
                />
                <span class="count-icon">+</span>
              </h2>
              <p>Countries</p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 aos" data-aos="fade-down">
            <div class="count-wrap">
              <h2>
                <vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="0"
                  :delay="3"
                  :endAmount="45"
                  :duration="5"
                  separator=","
                  :autoinit="true"
                />
                <span class="count-icon">+</span>
              </h2>
              <p>Years of Service</p>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 aos" data-aos="fade-down">
            <div class="count-wrap">
              <h2>
                <vue3-autocounter
                  class="counter"
                  ref="counter"
                  :startAmount="0"
                  :delay="3"
                  :endAmount="105"
                  :duration="5"
                  separator=","
                  :autoinit="true"
                />                
                <span class="count-icon">+</span>
              </h2>
              <p>Experienced Doctors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Expert Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import FourteenExpert from "@/themes/doccure/assets/json/fourteen-expert.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
        FourteenExpert: FourteenExpert,
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
          itemsToShow: 2,
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
