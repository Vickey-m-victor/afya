<template>
  <!-- Treatments Section -->
  <section class="impression-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="impression-img aos" data-aos="fade-down">
            <div class="impress-img">
              <img
                src="@/themes/doccure/assets/img/dentist-01.jpg"
                class="img-fluid"
                alt="Img"
              />
            </div>
            <div class="impress-img2">
              <img
                src="@/themes/doccure/assets/img/dentist-02.jpg"
                class="img-fluid"
                alt="Img"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="impression-content aos" data-aos="fade-down">
            <div class="section-header">
              <h2>First Impressions Begin with <span>Smile</span></h2>
              <p>
                The goal of our clinic is to provide friendly, caring dentistry
                and the highest level of general, cosmetic, and specialist
                dental treatments. With dental practices throughout the world,
                we are growing our clinic with just one goal in mind – to offer
                affordable, high quality dental care around the world.
              </p>
            </div>
            <div class="impress-list">
              <div class="impress-wrap">
                <h6>Free Dental Checkup</h6>
              </div>
              <div class="impress-wrap">
                <h6>Professional Doctors</h6>
              </div>
              <div class="impress-wrap">
                <h6>Emergency Care on consultation</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="treatment-sec">
        <div class="row">
          <div class="col-md-8">
            <div class="section-header">
              <h2>What <span>Dental Treatments</span> Do We Offer?</h2>
            </div>
          </div>
          <div class="col-md-4">
            <div class="owl-nav slide-nav slide-nav-02 text-end"></div>
          </div>
        </div>
        <div class="row">
          <div class="ol-md-12">
            <div class="owl-carousel treatment-slider">
              <Carousel
                :wrap-around="true"
                :settings="settings"
                :breakpoints="breakpoints"
              >
                <Slide v-for="item in FourteenTreatment" :key="item.id">
                  <div class="treatment-item aos" data-aos="fade-down">
                    <div class="treatment-img">
                      <a href="javascript:void(0);">
                        <img
                          :src="require(`@/themes/doccure/assets/img/service/${item.Image}`)"
                          alt="Img"
                        />
                      </a>
                    </div>
                    <div class="treatment-content text-start">
                      <h4><a href="javascript:void(0);">{{item.Title}}</a></h4>
                      <p>
                        {{item.Content}}
                      </p>
                      <a href="javascript:void(0);" class="btn btn-gray"
                        >Learn more</a
                      >
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
  </section>
  <!-- /Treatments Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import FourteenTreatment from "@/themes/doccure/assets/json/fourteen-treatments.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
        FourteenTreatment: FourteenTreatment,
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
          itemsToShow: 2,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 2,
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
