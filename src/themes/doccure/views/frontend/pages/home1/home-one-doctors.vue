<template>
    <!-- Doctor Section -->
    <section class="doctor-section">
        <div class="container">
            <div class="section-header sec-header-one text-center aos" data-aos="fade-up">
                <span class="badge badge-primary">Featured Doctors</span>
                <h2>Our Highlighted Doctors</h2>
            </div>

            <div class="doctors-slider owl-carousel aos" data-aos="fade-up">
                <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
                    <Slide v-for="item in IndexOneDoctors" :key="item.id">
                        <div class="card">
                            <div class="card-img card-img-hover">
                                <router-link to="/doctor-profile"><img :src="require(`@/themes/doccure/assets/img/doctor-grid/${item.Image}`)" alt=""></router-link>
                                <div class="grid-overlay-item d-flex align-items-center justify-content-between">
                                    <span class="badge bg-orange"><i class="fa-solid fa-star me-1"></i>{{item.Rating}}</span>
                                    <a href="javascript:void(0)" class="fav-icon">
                                        <i class="fa fa-heart"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div class="d-flex active-bar align-items-center justify-content-between p-3">
                                    <a href="#" class="text-indigo fw-medium fs-14">{{item.Speciality}}</a>
                                    <span class="badge bg-success-light d-inline-flex align-items-center">
                                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                                        Available
                                    </span>
                                </div>
                                <div class="p-3 pt-0 text-start">
                                    <div class="doctor-info-detail mb-3 pb-3">
                                        <h3 class="mb-1"><router-link to="/doctor-profile">{{item.Name}}</router-link></h3>
                                        <div class="d-flex align-items-center">
                                            <p class="d-flex align-items-center mb-0 fs-14"><i class="isax isax-location me-2"></i>{{item.Location}}</p>
                                            <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                                            <span class="fs-14 fw-medium">30 Min</span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div>
                                            <p class="mb-1">Consultation Fees</p>
                                            <h3 class="text-orange">{{item.Price}}</h3>
                                        </div>
                                        <a href="#" class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill">
                                            <i class="isax isax-calendar-1 me-2"></i>
                                            Book Now
                                        </a>
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
            <div class="doctor-nav nav-bottom owl-nav"></div>
        </div>
    </section>
    <!-- /Doctor Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import IndexOneDoctors from "@/themes/doccure/assets/json/index-one-doctors.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexOneDoctors: IndexOneDoctors,
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
    Slide,
    Navigation,
  },
};
</script>