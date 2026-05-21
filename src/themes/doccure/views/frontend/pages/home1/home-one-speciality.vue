<template>
    <!-- Speciality Section -->
    <section class="speciality-section">
        <div class="container">
            <div class="section-header sec-header-one text-center aos" data-aos="fade-up">
                <span class="badge badge-primary">Top Specialties</span>
                <h2>Highlighting the Care & Support</h2>
            </div>
            <div class="owl-carousel spciality-slider aos" data-aos="fade-up">
                <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
                    <Slide v-for="item in IndexOneSpeciality" :key="item.id">
                        <div class="spaciality-item">
                            <div class="spaciality-img">
                                <img :src="require(`@/themes/doccure/assets/img/specialities/${item.Image}`)" alt="img">
                                <span class="spaciality-icon">
                                    <img :src="require(`@/themes/doccure/assets/img/specialities/${item.Icon}`)" alt="img">
                                </span>
                            </div>
                            <h6><router-link to="/doctor-grid">{{item.Title}}</router-link></h6>
                            <p class="mb-0">{{item.Doctors}}</p>
                        </div>
                    </Slide>
                    <template #addons>
                    <Navigation />
                    </template>
                </Carousel>
            </div>
            <div class="spciality-nav nav-bottom owl-nav"></div>
        </div>
    </section>
    <!-- /Speciality Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import IndexOneSpeciality from "@/themes/doccure/assets/json/index-one-speciality.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexOneSpeciality: IndexOneSpeciality,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        575: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 4,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 6,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 8,
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