<template>
  <!-- services Section -->
  <section class="services-section-thirteen common-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-thirteen">
            <h2>Our Services</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-4 col-md-6"
          v-for="item in IndexEightService"
          :key="item.id"
        >
          <div class="service-thirteen-main">
            <div class="service-thirteen-all">
              <div class="service-img-thirteen">
                <img
                  :src="require(`@/themes/doccure/assets/img/${item.Image}`)"
                  alt="Service"
                />
              </div>
              <div class="service-inner-contents">
                <h5>{{ item.Title }}</h5>
                <p>{{ item.Content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /services Section -->

  <!-- Our Doctors -->
  <div class="our-doctor-thirteen common-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-thirteen">
            <h2>Our Doctors</h2>
          </div>
        </div>
      </div>
      <div
        class="owl-carousel our-slider-thirteen owl-theme aos"
        data-aos="fade-up"
      >
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="record in IndexEightDoctor" :key="record.id">
            <div class="item">
              <div class="our-doctors-card text-start">
                <div class="doctors-header">
                  <router-link to="/doctor-profile"
                    ><img
                      :src="require(`@/themes/doccure/assets/img/doctors/${record.Image}`)"
                      alt="Dr. Marie Wells"
                      class="img-fluid"
                  /></router-link>
                </div>
                <div class="doctors-body">
                  <router-link to="/doctor-profile">
                    <h4>{{ record.Name }}</h4>
                  </router-link>
                  <p>{{ record.Title }}</p>
                  <div class="rating">
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star filled"></i>
                    <i class="fas fa-star"></i>
                    <span class="d-inline-block">{{ record.Star }}</span>
                  </div>
                  <div class="location">
                    <p>
                      <i class="fas fa-map-marker-alt"></i>{{ record.Location }}
                    </p>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <span class="view-btn" tabindex="0">{{
                      record.Amount
                    }}</span>
                    <router-link to="/booking" class="btn book-btn btn-primary"
                      >Consult Now</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <div class="owl-dots">
              <Pagination />
            </div>
          </template>
        </Carousel>
      </div>
    </div>
    <div class="our-doctor-thirteen-one">
      <img src="@/themes/doccure/assets/img/bg/pluse-1.png" alt="pluse" />
      <img src="@/themes/doccure/assets/img/bg/pluse-3.png" alt="pluse" />
      <img src="@/themes/doccure/assets/img/bg/pluse-2.png" alt="pluse" />
      <img src="@/themes/doccure/assets/img/bg/pluse-3.png" alt="pluse" />
    </div>
  </div>
  <!-- /Our Doctors -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import IndexEightService from "@/themes/doccure/assets/json/indexeightservice.json";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexEightDoctor from "@/themes/doccure/assets/json/indexeightdoctor.json";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      IndexEightService: IndexEightService,
      IndexEightDoctor: IndexEightDoctor,
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

  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
