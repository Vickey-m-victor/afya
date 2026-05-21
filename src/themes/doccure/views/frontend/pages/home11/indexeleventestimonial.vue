<template>
  <!-- Testimonal Section -->
  <div class="testimonal-section-sixteen">
    <div class="bg-img">
      <img
        src="@/themes/doccure/assets/img/bg/vector-bg-06.png"
        class="sec-vector"
        alt="Img"
      />
      <img
        src="@/themes/doccure/assets/img/bg/vector-bg-06.png"
        class="sec-vector-two"
        alt="Img"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-sixteen text-center">
            <p>what our Patients say?</p>
            <h2>Testimonial</h2>
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-md-5">
          <div class="testi-img">
            <img
              src="@/themes/doccure/assets/img/testimonial-2.jpg"
              alt="Testimonial"
              class="img-fluid"
            />
            <span class="testi-icon"
              ><i class="fa-solid fa-quote-left"></i
            ></span>
            <span class="rounded-img"
              ><img src="@/themes/doccure/assets/img/bg/rounded-circle-01.png" alt="Img"
            /></span>
          </div>
        </div>
        <div class="col-md-7">
          <div class="owl-carousel patient-review-slider">
            <Carousel
              :wrap-around="true"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide v-for="item in IndexElevenTestimonial" :key="item.id">
                <div class="testimonial-wrap text-start">
                  <h4>{{ item.Title }}</h4>
                  <p>
                    I recently had liposuction done at Doccure, and the care I
                    received was exceptional from start to finish. The staff was
                    friendly, and the surgeons were not only skilled but also
                    compassionate. They addressed all my concerns, provided
                    detailed pre and post-op instructions, and the results are
                    truly remarkable. I highly recommend Doccure for anyone
                    considering cosmetic procedures.
                  </p>
                  <div class="testimonial-user">
                    <h6>{{ item.Name }}</h6>
                    <p>{{ item.Location }}</p>
                  </div>
                </div>
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Testimonal Section -->

  <!-- Feedback -->
  <section class="feedback-section-sixteen">
    <div class="container">
      <div class="feedback-schedule-all">
        <span class="rounded-img"
          ><img src="@/themes/doccure/assets/img/bg/rounded-circle-02.png" alt="Img"
        /></span>
        <div class="row align-items-center">
          <div class="col-lg-12">
            <div class="feedback-fifteen-content text-center">
              <h3>Focus On Your Own Body Shape</h3>
              <p>
                It's easy to list, simple to manage and, best of all, free to
                list!
              </p>
              <div class="feedback-btns justify-content-center">    
                <router-link to="/appointments" class="btn btn-primary"
                  >Make An Appointment</router-link
                >
                <router-link to="/booking-2" class="btn btn-primarytwo"
                  ><i class="feather-plus me-2"></i>Get Free Check-up</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Feedback -->

</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexElevenTestimonial from "@/themes/doccure/assets/json/indexeleventestimonial.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexElevenTestimonial: IndexElevenTestimonial,
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
