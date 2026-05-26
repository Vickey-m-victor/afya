<template>
  <div class="row">
    <div class="col-md-12">
      <div class="blog-slide-fourteen owl-carousel">
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="record in BlogSection" :key="record.id">
            <div
              class="blog-grid-fourteen"
            >
              <div class="blog-grig-img">
                <router-link to="/blog-details"
                  ><img
                    :src="require(`@/themes/doccure/assets/img/blog/${record.Image}`)"
                    alt="Img"
                /></router-link>
              </div>
              <div class="blog-grid-content">
                <div class="grid-head">
                  <span :class="record.BadgeClass">{{ record.Title }}</span>
                  <span>{{ record.Date }}</span>
                </div>
                <h4>
                  <router-link to="/blog-details">{{
                    record.Topic
                  }}</router-link>
                </h4>
                <p>
                  {{ record.Content }}
                </p>
                <div class="grid-footer">
                  <span><i class="feather-eye"></i>{{ record.Views }}</span>
                  <router-link to="/blog-details"
                    >Read More<i class="feather-arrow-right-circle"></i
                  ></router-link>
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
  </div>
</template>

<script>
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import BlogSection from "@/themes/doccure/assets/json/blog-section.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      BlogSection: BlogSection,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
        loop: true,
        margin: 24,
      },

      breakpoints: {
        575: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 700px and up
        767: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        // 991px and up
        991: {
          itemsToShow: 3,
          snapAlign: "start",
        },
        // 1024 and up
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
};
</script>
