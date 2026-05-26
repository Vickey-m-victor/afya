<template>
  <section class="our-blog-section">
    <div class="container">
      <div class="row">
        <div class="col-md-6 aos" data-aos="fade-up">
          <div class="section-heading">
            <h2>Blogs and News</h2>
            <p>Read Professional Articles and Latest Articles</p>
          </div>
        </div>
        <div class="col-md-6 text-end aos" data-aos="fade-up">
          <div class="owl-nav slide-nav-4 text-end nav-control"></div>
        </div>
      </div>
      <div class="owl-carousel blogs owl-theme">
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="item in IndexThreeBlog" :key="item.id">
            <div class="item">
              <div class="our-blogs">
                <div class="blogs-img">
                  <router-link to="/blog-details"
                    ><img
                      :src="require(`@/themes/doccure/assets/img/blog/${item.Image}`)"
                      alt="Image"
                      class="img-fluid"
                  /></router-link>
                  <div class="blogs-overlay d-flex">
                    <img
                      :src="require(`@/themes/doccure/assets/img/clients/${item.Doctor}`)"
                      alt="Image"
                      class="img-fluid"
                    />
                    <span class="blogs-writter">{{ item.Name }}</span>
                  </div>
                </div>
                <div class="blogs-info">
                  <span class="blog-slug">{{ item.Title }}</span>
                  <h4>
                    <router-link to="/blog-details">{{
                      item.Content
                    }}</router-link>
                  </h4>
                  <p>{{ item.ContentOne }}</p>
                  <div
                    class="blogs-nav d-flex align-items-center justify-content-between"
                  >
                    <span class="blogs-time"
                      ><i class="fa-regular fa-calendar-days"></i>
                      {{ item.Day }}</span
                    >
                    <router-link to="/blog-details" class="blogs-btn btn btn-primary">Read More</router-link>
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
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexThreeBlog from "@/themes/doccure/assets/json/indexthreeblog.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexThreeBlog: IndexThreeBlog,
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
