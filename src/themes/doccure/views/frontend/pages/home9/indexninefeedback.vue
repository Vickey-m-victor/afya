<template>
  <!-- Feedback -->
  <section class="clients-section-fourteen">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="client-inner-main">
            <img
              src="@/themes/doccure/assets/img/bg/feedback-six.png"
              alt="image"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="section-header-fourteen">
            <h2>Our Happy <span>Clients</span></h2>
            <p>Our clients feedback about us</p>
          </div>
          <div
            class="owl-carousel feedback-slider-fourteen owl-theme aos"
            data-aos="fade-up"
          >
            <Carousel
              :wrap-around="true"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide v-for="record in IndexNineFeedback" :key="record.id">
                <div class="card feedback-card">
                  <div class="card-body feedback-card-body text-start">
                    <div class="feedback-inner-main">
                      <div class="rating rating-fourteen">
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star filled me-1"></i>
                        <i class="fas fa-star me-1"></i>
                      </div>
                      <p>
                        {{ record.Content }}
                      </p>
                      <h4>{{ record.Name }}</h4>
                      <h6>{{ record.Location }}</h6>
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
  <!-- /Feedback -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexNineFeedback from "@/themes/doccure/assets/json/indexninefeedback.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexNineFeedback: IndexNineFeedback,
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
