<template>
  <!-- Testimonial Section -->
  <section class="testimonial-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="testimonial-slider slick">
            <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
              <Slide v-for="item in IndexTestimonial" :key="item.id">
                <div class="testimonial-grid">
									<div class="testimonial-info">
										<div class="testimonial-img">
											<img :src="require(`@/themes/doccure/assets/img/clients/${item.Image}`)" class="img-fluid" alt="John Doe">
										</div>
										<div class="testimonial-content">
											<div class="section-header-one section-header section-inner-header testimonial-header">
												<h5>Testimonials</h5>
												<h2 class="section-title">What Our Client Says</h2>
											</div>
											<div class="testimonial-details">
												<p>
                          {{item.Content}}
                        </p>
												<h6><span class="d-block">{{ item.Name }}</span> {{ item.Location }}</h6>
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
      </div>
    </div>
  </section>
  <!-- /Testimonial Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexTestimonial from "@/themes/doccure/assets/json/indextestimonial.json";
import "vue3-carousel/dist/carousel.css";

export default {
  data() {
    return {
      IndexTestimonial: IndexTestimonial,
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
          itemsToShow: 1,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 1,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
};
</script>
