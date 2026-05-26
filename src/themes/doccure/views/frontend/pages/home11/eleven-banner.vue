<template>
    <!-- Home Banner -->
  <section class="banner-section-sixteen">
    <div class="banner-slidersurgery">
      <div class="owl-carousel banner-sliderssurgery owl-theme ">
        <Carousel :wrap-around="true" :autoplay="3000" :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="item in ElevenBanner" :key="item.id">
                <div class="item item-slidersurgery">
                <img :src="require(`@/themes/doccure/assets/img/${item.Image}`)" class="img-fluid" alt="Img">
                </div>
            </Slide>
          <template #addons>
          </template>
        </Carousel>
      </div>
    </div>
    <div class="container">
      <div class="costomic-banner-content">
        <div class="row">
          <div class="col-lg-6">
            <div class="banner-content banner-content-sixteen">
              <h1>Perfect Face Surgery For Everyone</h1>
              <p>
                We enhance your natural beauty, boost your confidence & provide a 
                positive and personalized experience throughout your cosmetic surgery journey.
              </p>
              <div class="banner-btns-sixteen">
                <router-link to="/booking-2" class="btn btn-primary me-2">Make an Appointment</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import ElevenBanner from "@/themes/doccure/assets/json/index-eleven-banner.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
        ElevenBanner: ElevenBanner,
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
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide
  },
};
</script>
