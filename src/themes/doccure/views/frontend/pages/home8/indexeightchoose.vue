<template>
  <!-- Why Choose Us -->
  <section class="choose-us-section-thirteen common-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-thirteen">
            <h2>Why Choose Us?</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="choose-us-inner-all aos" data-aos="fade-up">
            <div class="choose-us-thirteen-img">
              <img
                src="@/themes/doccure/assets/img/bg/doctor-bg.jpg"
                alt="Doctor"
                class="img-fluid"
              />
              <div class="choose-us-thirteen-imgone">
                <img src="@/themes/doccure/assets/img/bg/atom-bond.png" alt="Doctor" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <ul>
            <li class="aos" data-aos="fade-up">
              <div class="choose-us-content-thirteen">
                <div class="chooseus-contents">
                  <i class="feather-upload-cloud"></i>
                </div>
                <div class="chooseus-content-ryt">
                  <h5>Latest diagnostics and technology</h5>
                  <p>
                    We offering the latest in diagnostic technology, ensuring
                    cutting-edge and accurate healthcare solutions for our
                    patients.
                  </p>
                </div>
              </div>
            </li>
            <li class="aos" data-aos="fade-up">
              <div class="choose-us-content-thirteen">
                <div class="chooseus-contents">
                  <i class="feather-underline"></i>
                </div>
                <div class="chooseus-content-ryt">
                  <h5>Full breadth of paediatric care</h5>
                  <p>
                    Comprehensive services prioritize the health, development,
                    and well-being of your child at every stage of growth.
                  </p>
                </div>
              </div>
            </li>
            <li class="aos" data-aos="fade-up">
              <div class="choose-us-content-thirteen">
                <div class="chooseus-contents">
                  <i class="feather-type"></i>
                </div>
                <div class="chooseus-content-ryt">
                  <h5>Immunisation clinic</h5>
                  <p>
                    Dedicated to providing a safe and effective environment for
                    vaccinations to safeguard your health and the community.
                  </p>
                </div>
              </div>
            </li>
            <li class="aos" data-aos="fade-up">
              <div class="choose-us-content-thirteen">
                <div class="chooseus-contents">
                  <i class="feather-message-square"></i>
                </div>
                <div class="chooseus-content-ryt">
                  <h5>Paediatric theatres on every ward</h5>
                  <p>
                    Pediatric theaters on every ward, equipped to provide
                    specialized and immediate medical attention for children.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="choose-us-thirteen-bg">
        <img src="@/themes/doccure/assets/img/bg/rainbow-2.png" alt="img" />
        <img src="@/themes/doccure/assets/img/icons/choose-icon.svg" alt="img" />
      </div>
    </div>
  </section>
  <!-- /Why Choose Us -->

  <section class="client-us-section-thirteen common-padding">
    <div class="client-us-section-thirteenone aos" data-aos="fade-right">
      <img src="@/themes/doccure/assets/img/bg/cloud-2.png" alt="Cloud" />
      <img src="@/themes/doccure/assets/img/bg/rainbow-2.png" alt="Rainbow" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-thirteen">
            <h2>What Our Client Says?</h2>
          </div>
        </div>
      </div>
      <div class="owl-carousel client-says-thirteen owl-theme">
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="item in IndexEightClient" :key="item.id">
            <div class="client-says-all mb-5">
              <div class="clients-says-content text-start">
                <p>"{{ item.Content }}"</p>
                <h4>
                  {{ item.Name }}
                </h4>
                <p class="location-thirteen">
                  <i class="fa-solid fa-location-dot"></i> {{ item.Location }}
                </p>
                <div class="client-says-imagesone">
                  <img src="@/themes/doccure/assets/img/icons/rainbow-3.svg" alt="Rainbow" />
                  <img src="@/themes/doccure/assets/img/icons/rainbow-4.svg" alt="Rainbow" />
                </div>
              </div>
              <div class="client-says-images">
                <img
                  :src="require(`@/themes/doccure/assets/img/${item.Image}`)"
                  alt="img-fluid"
                />
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
  </section>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import IndexEightChoose from "@/themes/doccure/assets/json/indexeightchoose.json";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexEightClient from "@/themes/doccure/assets/json/indexeightclient.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexEightChoose: IndexEightChoose,
      IndexEightClient: IndexEightClient,
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
