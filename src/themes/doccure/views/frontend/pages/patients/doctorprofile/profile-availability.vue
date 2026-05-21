<template>
  <div class="doc-information-details" id="availability">
    <div
      class="detail-title slider-nav d-flex justify-content-between align-items-center"
    >
      <h4>Availability</h4>
      <div class="nav nav-container slide-2"></div>
    </div>
    <div class="availability-slots-slider owl-carousel">
      <Carousel
        :wrap-around="true"
        :settings="settings"
        :breakpoints="breakpoints"
      >
        <Slide v-for="item in Profile_Availability" :key="item.id">
          <div class="availability-date">
            <div class="book-date">
              <h6>Wed Feb 2024</h6>
              <span>01:00 - 02:00 PM</span>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
import Profile_Availability from "@/themes/doccure/assets/json/profile-availability.json";
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
      Profile_Availability: Profile_Availability,
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
          itemsToShow: 7,
          snapAlign: "start",
        },
      },
    };
  },
};
</script>
