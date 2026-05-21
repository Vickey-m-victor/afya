<template>
    <!-- Testimonial Section -->
    <section class="testimonial-section-one">
        <div class="container">
            <div class="section-header sec-header-one text-center aos" data-aos="fade-up">
                <span class="badge badge-primary">Testimonials</span>
                <h2>15k Users Trust Doccure Worldwide</h2>
            </div>

            <!-- Testimonial Slider -->
            <div class="owl-carousel testimonials-slider aos" data-aos="fade-up">
                <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
                    <Slide v-for="item in IndexOneTestimonial" :key="item.id">
                        <div class="card shadow-none mb-0">
                            <div class="card-body text-start">
                                <div class="d-flex align-items-center mb-4">
                                    <div class="rating d-flex">
                                        <i class="fa-solid fa-star filled me-1"></i>
                                        <i class="fa-solid fa-star filled me-1"></i>
                                        <i class="fa-solid fa-star filled me-1"></i>
                                        <i class="fa-solid fa-star filled me-1"></i>
                                        <i class="fa-solid fa-star filled"></i>
                                    </div>
                                    <span>
                                        <img src="@/themes/doccure/assets/img/icons/quote-icon.svg" alt="img">
                                    </span>
                                </div>
                                <h6 class="fs-16 fw-medium mb-2">{{item.Title}}</h6>
                                <p>{{item.Content}}</p>
                                <div class="d-flex align-items-center">
                                    <a href="javascript:void(0);" class="avatar avatar-lg">
                                        <img :src="require(`@/themes/doccure/assets/img/patients/${item.Image}`)" class="rounded-circle" alt="img">
                                    </a>
                                    <div class="ms-2">
                                        <h6 class="mb-1"><a href="javascript:void(0);">{{item.Name}}</a></h6>
                                        <p class="fs-14 mb-0">United States</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slide>
                </Carousel>
            </div>
            <!-- /Testimonial Slider -->

            <!-- Counter -->
            <div class="testimonial-counter">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-gap-4">
                    <div class="counter-item text-center aos" data-aos="fade-up">
                        <h6 class="display-6"><span class="count-digit">500</span>+</h6>
                        <p>Doctors Available</p>
                    </div>
                    <div class="counter-item text-center aos" data-aos="fade-up">
                        <h6 class="display-6 secondary-count"><span class="count-digit">18</span>+</h6>
                        <p>Specialities</p>
                    </div>
                    <div class="counter-item text-center aos" data-aos="fade-up">
                        <h6 class="display-6 purple-count"><span class="count-digit">30</span>K</h6>
                        <p>Bookings Done</p>
                    </div>
                    <div class="counter-item text-center aos" data-aos="fade-up">
                        <h6 class="display-6 pink-count"><span class="count-digit">97</span>+</h6>
                        <p>Hospitals & Clinic</p>
                    </div>
                    <div class="counter-item text-center  aos" data-aos="fade-up">
                        <h6 class="display-6 warning-count"><span class="count-digit">317</span>+</h6>
                        <p>Lab Tests Available</p>
                    </div>
                </div>
            </div>
            <!-- /Counter -->

        </div>
    </section>
    <!-- /Testimonial Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Slide } from "vue3-carousel";
import IndexOneTestimonial from "@/themes/doccure/assets/json/home-one-testimonial.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexOneTestimonial: IndexOneTestimonial,
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
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
  components: {
    Carousel,
    Slide
  },
};
</script>