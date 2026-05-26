<template>
  <!-- Home Banner -->
  <section class="banner-section-fourteen banner-section-twelve">
    <div class="banner-section-twelve-bg">
      <img src="@/themes/doccure/assets/img/bg/home-12-banner-bg-1.png" alt="design-image" />
      <img src="@/themes/doccure/assets/img/bg/home-12-banner-bg-2.png" alt="design-image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div
            class="banner-content banner-content-fourteen aos"
            data-aos="fade-up"
          >
            <h1>We take care of Your Pets</h1>
            <p>
              Ensuring the Health & Happiness of your family member
              throughCompassionate and advanced Veterinary Care
            </p>
            <div class="banner-btns-fourteen">
              <router-link to="/booking" class="btn btn-primary"
                >Start a Consult</router-link
              >
              <router-link to="/booking" class="btn btn-primary"
                >Schedule a Call</router-link
              >
            </div>
          </div>
          <div class="search-box-fourteen aos" data-aos="fade-up">
            <form @submit.prevent="submitForm" class="form-block d-flex">
              <div class="search-input">
                <div class="forms-block">
                  <label class="mb-0">Date</label>
                  <datepicker
                    v-model="startdate"
                    placeholder="Thu, Mar 24, 2023"
                    class="form-control datetimepicker"
                    :editable="true"
                    :clearable="false"
                    :input-format="dateFormat"
                  />
                </div>
              </div>
              <div class="search-input">
                <div class="forms-block mb-0">
                  <label class="location-icon">Location</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="San Diego Branch"
                  />
                </div>
              </div>
              <div class="search-btn">
                <button class="btn btn-primary" type="submit">
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="banner-img banner-img-twelve aos" data-aos="fade-up">
            <img
              src="@/themes/doccure/assets/img/bg/home-12-banner-1.png"
              class="img-fluid"
              alt="dog-image"
            />
            <img
              src="@/themes/doccure/assets/img/bg/home-12-banner-2.png"
              class="img-fluid"
              alt="cat-image"
            />
            <div class="banner-banner-img-twelve-bg">
              <img src="@/themes/doccure/assets/img/bg/dot-1.png" alt="dot-icon" />
              <img src="@/themes/doccure/assets/img/bg/dot-2.png" alt="dot-icon" />
              <img src="@/themes/doccure/assets/img/bg/ring-1.png" alt="ring-icon" />
              <img src="@/themes/doccure/assets/img/bg/ring-2.png" alt="ring-icon" />
            </div>
          </div>
        </div>
        <div class="col-md-12 d-flex justify-content-end">
          <div class="badge-info-bottom">
            <span
              ><img src="@/themes/doccure/assets/img/icons/animal-feet-icon.svg" alt="Img"
            /></span>
            <h6>First Annual Checkup Free</h6>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->

  <!-- services Section -->
  <section class="services-section-fourteen">
    <div class="floating-bg">
      <img src="@/themes/doccure/assets/img/bg/big-paw.png" alt="paw-image" />
      <img src="@/themes/doccure/assets/img/bg/small-paw.png" alt="paw-image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-fourteen service-inner-fourteen">
            <h2>What can We do</h2>
            <p>
              Veterinary care encompasses a wide range of services aimed at
              promoting the health and well-being of animals.
            </p>
          </div>
        </div>
      </div>
      <div class="row row-gap justify-content-center">
        <div
          class="col-lg-3 col-md-4 col-sm-12"
          v-for="service in indexsevenservice"
          :key="service.title"
        >
          <div class="our-services-list w-100">
            <div class="service-icon">
              <img
                :src="require(`@/themes/doccure/assets/img/icons/${service.icon}`)"
                :alt="service.alt"
              />
            </div>
            <h4>{{ service.title }}</h4>
            <p>{{ service.description }}</p>
            <a
              href="#"
              class="more-btn overlay-btns d-inline-flex align-items-center"
              >Learn More<i class="fa-solid fa-circle-arrow-right ms-2"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
    <div class="marquee-title">
      <h3>
        We are Experts in Taking Care of your Pet for over 30 years and still
        going on...
      </h3>
    </div>
    <div class="container">
      <div class="best-quality-sec">
        <div class="row">
          <div class="col-lg-5">
            <div class="img-col">
              <img
                src="@/themes/doccure/assets/img/bg/best-quality-sec-img.png"
                class="img-fluid"
                alt="Img"
              />
            </div>
          </div>
          <div class="col-lg-7 aos" data-aos="fade-up">
            <div class="quality-service-info">
              <div class="section-header-fourteen service-inner-fourteen">
                <h2>
                  Our mission is to provide the best quality services to your
                  Pets
                </h2>
                <p>
                  Treating animals and we are always excited to add to our
                  ever-expanding family. We thank you for consider us and we
                  look forward to hearing from you soon.
                </p>
              </div>
              <ul class="pets-service-list">
                <li>
                  <h3 class="text-blue">
                    <span class="counter animated fadeInDownBig">
                      <vue3-autocounter
                        ref="counter"
                        :startAmount="1"
                        :delay="3"
                        :endAmount="3564"
                        :duration="5"
                        separator=","
                        :autoinit="true" />
                      </span>+
                  </h3>
                  <p>
                    The number of pets successfully treated in our vet clinic
                  </p>
                </li>
                <li>
                  <h3 class="text-yellow">
                    <span class="counter animated fadeInDownBig">
                      <vue3-autocounter
                        ref="counter"
                        :startAmount="1"
                        :delay="3"
                        :endAmount="1654"
                        :duration="5"
                        separator=","
                        :autoinit="true" />
                      </span>+
                  </h3>
                  <p>Happy global customers who trusted us with ease</p>
                </li>
              </ul>
              <router-link to="/search-2" class="learn-more-btn btn btn-primary"
                >Learn More</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /services Section -->
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
import AOS from "aos";
import "aos/dist/aos.css";
import indexsevenservice from "@/themes/doccure/assets/json/indexsevenservice.json";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      indexsevenservice: indexsevenservice,
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
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
        // 700px and up
        991: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/search");
    },
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
