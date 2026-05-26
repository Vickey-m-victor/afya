<template>
  <div class="doc-information-details" id="insurence">
    <div
      class="detail-title slider-nav d-flex justify-content-between align-items-center"
    >
      <h4>Insurance Accepted (6)</h4>
      <div class="nav nav-container slide-1"></div>
    </div>
    <div class="insurence-logo-slider owl-carousel">
      <Carousel
        :wrap-around="true"
        :settings="settings"
        :breakpoints="breakpoints"
      >
        <Slide v-for="item in Profile_Insurence" :key="item.id">
          <div class="insurence-logo">
            <span
              ><img
                :src="require(`@/themes/doccure/assets/img/icons/${item.Image}`)"
                alt="Img"
            /></span>
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
import Profile_Insurence from "@/themes/doccure/assets/json/profile-insurence.json";
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
      Profile_Insurence: Profile_Insurence,
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
          itemsToShow: 6,
          snapAlign: "start",
        },
      },
    };
  },
};
</script>
