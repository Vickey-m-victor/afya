<template>
  <ul class="date-slider slick mb-4">
    <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="item in Booking" :key="item.id">
        <div>
          <h4>{{ item.Day }}</h4>
          <p>{{ item.Month }}</p>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </ul>
</template>
<script>
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import Booking from "@/themes/doccure/assets/json/booking/booking-2.json";
import "vue3-carousel/dist/carousel.css";

export default {
  data() {
    return {
      Booking: Booking,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        575: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 4,
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
    Slide,
    Pagination,
    Navigation,
  },
};
</script>
