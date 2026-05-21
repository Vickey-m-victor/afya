<template>
  <!-- Service Section -->
  <section class="why-us-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="clinic-partner-sec mt-0">
            <div class="section-header text-center aos" data-aos="fade-down">
              <h5>Our Clinics Partners</h5>
            </div>
            <div class="partners-info">
              <ul class="owl-carousel partners-sliders">
                <Carousel
                  :wrap-around="true"
                  :autoplay="3000"
                  :settings="settings"
                  :breakpoints="breakpoints"
                >
                  <Slide v-for="item in FourteenPartners" :key="item.id">
                    <li>
                      <a href="javascript:void(0);">
                        <img
                          class="img-fluid"
                          :src="require(`@/themes/doccure/assets/img/partners/${item.Image}`)"
                          alt="partners"
                        />
                      </a>
                    </li>
                  </Slide>
                  <template #addons>
                  </template>
                </Carousel>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="section-header text-center aos" data-aos="fade-down">
        <h2>Why We Are <span>Different</span></h2>
        <p>
          We are a private health care dedicated to providing quality dental
          care in cosmetic, restorative, and general dentistry.
        </p>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6 d-flex" v-for="item in FourteenService" :key="item.id">
          <div class="expert-wrap flex-fill aos" data-aos="fade-down">
            <div class="expert-img">
              <img :src="require(`@/themes/doccure/assets/img/service/${item.Image}`)" alt="Img" />
            </div>
            <div class="expert-content">
              <h4>{{item.Title}}</h4>
              <p>
                {{item.Content}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Service Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import FourteenPartners from "@/themes/doccure/assets/json/fourteen-partners.json";
import FourteenService from "@/themes/doccure/assets/json/fourteen-service.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      FourteenPartners: FourteenPartners,
      FourteenService: FourteenService,
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
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
