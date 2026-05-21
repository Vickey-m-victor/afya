<template>
  <div class="doc-information-details" id="awards">
    <div
      class="detail-title slider-nav d-flex justify-content-between align-items-center"
    >
      <h4>Awards</h4>
      <div class="nav nav-container slide-3"></div>
    </div>
    <div class="awards-slider owl-carousel">
      <Carousel
        :wrap-around="true"
        :settings="settings"
        :breakpoints="breakpoints"
      >
        <Slide v-for="item in Profile_Awards" :key="item.id">
          <div class="award-card text-start">
            <div class="award-card-info">
              <span
                ><img
                  :src="require(`@/themes/doccure/assets/img/icons/${item.Image}`)"
                  alt="Img"
              /></span>
              <h5>{{ item.Name }}</h5>
              <p>
                {{ item.Content }}
              </p>
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
import Profile_Awards from "@/themes/doccure/assets/json/profile-awards.json";
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
      Profile_Awards: Profile_Awards,
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
          itemsToShow: 2,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
    };
  },
};
</script>