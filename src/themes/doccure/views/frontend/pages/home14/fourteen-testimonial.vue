<template>
  <!-- Testimonial Section -->
  <section class="question-section dentist-home-testi">
    <div class="section-bg">
      <img
        src="@/themes/doccure/assets/img/bg/testi-left-bg.png"
        class="testi-bg-left"
        alt="Img"
      />
      <img
        src="@/themes/doccure/assets/img/bg/testi-right-bg.png"
        class="testi-bg-right"
        alt="Img"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header text-center aos" data-aos="fade-down">
            <h2>What Our <span>Happy Customers</span> Says</h2>
          </div>
          <div class="customer-slider owl-carousel">
            <Carousel
              :wrap-around="true"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide v-for="item in FourteenTestimonial" :key="item.id">
                <div class="customer-wrap">
                  <div class="customer-infos">
                    <img :src="require(`@/themes/doccure/assets/img/clients/${item.Image}`)" alt="Img" />
                    <h6>{{item.Name}}</h6>
                    <p>{{item.Location}}</p>
                  </div>
                  <p>
                    {{item.Content}}
                  </p>
                  <div class="rating">
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star"></i>
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
  </section>
  <!-- /Testimonial Section -->
</template>

<script>
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import FourteenTestimonial from "@/themes/doccure/assets/json/fourteen-testimonial.json";
import "vue3-carousel/dist/carousel.css";

export default {
  data() {
    return {
      FourteenTestimonial: FourteenTestimonial,
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
};
</script>