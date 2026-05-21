<template>
  <!-- Testimonials -->
  <div class="testimonial-section-ten need-to-know-section">
    <div class="section-floating-bg">
      <img src="@/themes/doccure/assets/img/bg/hexagen-group-1.png" alt="design-image" />
      <img src="@/themes/doccure/assets/img/bg/hexagon-group-2.png" alt="design-image" />
    </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="section-header-one section-header-slider text-center">
            <h2 class="section-title">What Our Patients Say</h2>
            <p>
              Very happy with his care and would recommend to anyone else.
              Professional and informative.
            </p>
          </div>
        </div>
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="owl-carousel testimonial-sliders nav-center">
            <Carousel
              :wrap-around="true"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide
                v-for="(record, index) in indexfivetestimonial"
                :key="index"
              >
                <div class="testimonial-card text-start" >
                  <div class="testimonial-user-details">
                    <div class="d-flex align-items-center">
                      <div class="testimonial-user-img">
                        <img
                          :src="require(`@/themes/doccure/assets/img/clients/${record.Image}`)"
                          class="img-fluid"
                          alt="Martin Philips"
                        />
                      </div>
                      <div class="testimonial-user-name">
                        <h5>{{ record.Name }}</h5>
                        <p>{{ record.Location }}</p>
                      </div>
                    </div>
                    <div class="rating">
                      <i class="fa-solid fa-star filled me-1"></i>
                      <i class="fa-solid fa-star filled me-1"></i>
                      <i class="fa-solid fa-star filled me-1"></i>
                      <i class="fa-solid fa-star filled me-1"></i>
                      <i class="fa-solid fa-star filled me-1"></i>
                    </div>
                  </div>
                  <div class="testmonial-user-coments">
                    <h6>{{ record.Title }}</h6>
                    <p>
                      {{ record.Content }}
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
      </div>
    </div>
  </div>
  <!-- /Testimonials -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import indexfivetestimonial from "@/themes/doccure/assets/json/indexfivetestimonial.json";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      indexfivetestimonial: indexfivetestimonial,
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
