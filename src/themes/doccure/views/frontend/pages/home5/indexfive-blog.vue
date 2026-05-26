<template>
  <!-- Blog Section -->
  <section class="section section-blogs cardio-blogs">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header-one aos" data-aos="fade-up">
        <h2 class="section-title">Latest News</h2>
        <p>
          Have a look on our news & Articles will help you to understand about
          the health
        </p>
      </div>
      <!-- /Section Header -->

      <div class="owl-carousel blog-slider nav-center">
        <!-- Blog Post -->
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="(record, index) in IndexFive_Blog" :key="index">
            <div class="blog grid-blog aos text-start" data-aos="fade-up">
              <div class="blog-image">
                <router-link to="/blog-details"
                  ><img
                    class="img-fluid"
                    :src="require(`@/themes/doccure/assets/img/blog/${record.Image}`)"
                    alt="Post Image"
                /></router-link>
                <div class="post-author">
                  <router-link to="/doctor-profile"
                    ><img
                      :src="require(`@/themes/doccure/assets/img/${record.DoctorImage}`)"
                      alt="Post Author"
                    /><span>{{ record.Name }}</span></router-link
                  >
                </div>
              </div>
              <div class="blog-content">
                <div class="blog-slug">{{ record.Title }}</div>
                <h3 class="blog-title">
                  <router-link to="/blog-details">{{
                    record.Topic
                  }}</router-link>
                </h3>
                <p class="mb-0">
                  {{ record.Content }}
                </p>
              </div>
            </div>
          </Slide>
          <template #addons> <Navigation /> </template>
        </Carousel>
        <!-- /Blog Post -->
      </div>
      <div class="view-all text-center aos" data-aos="fade-up">
        <router-link to="/blog-list" class="btn btn-primary"
          >All Articles</router-link
        >
      </div>
    </div>
  </section>
  <!-- /Blog Section -->
</template>
<script>
import IndexFive_Blog from "@/themes/doccure/assets/json/indexfive-blog.json";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexFive_Blog: IndexFive_Blog,
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
          snapAlign: "center",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>
