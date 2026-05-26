<template>
  <!-- Home Banner -->
  <section class="banner-section-fourteen">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-lg-8">
          <div class="banner-content banner-content-fourteen aos" data-aos="fade-up">
            <h1>
              Empowering Your Journey to Parenthood, Discover Fertility Solutions Today!
            </h1>
            <div class="banner-btns-fourteen">
              <router-link to="/booking" class="btn btn-primary"
                ><i class="fa-solid fa-calendar-days"></i>Meet Our Specialist</router-link
              >
              <router-link to="/booking-2" class="btn btn-primarytwo"
                ><i class="fa-solid fa-phone"></i>Schedule a Call</router-link
              >
            </div>
            <div class="search-box-fourteen aos" data-aos="fade-up">
              <form @submit.prevent="submitForm" class="form-block d-flex">
                <div class="search-input">
                  <div class="forms-block">
                    <label>Date</label>
                    <datepicker
                      v-model="startdate"
                      class="form-control datetimepicker"
                      :editable="true"
                      :input-format="dateFormat"
                      placeholder="Select Date"
                      :clearable="false"
                    />
                  </div>
                </div>
                <div class="search-input">
                  <div class="forms-block mb-0">
                    <label>Location</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="San Diego Branch"
                    />
                  </div>
                </div>
                <div class="search-btn">
                  <button class="btn btn-primary" type="submit">Book Appointment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="banner-img banner-img-fourteen aos" data-aos="fade-up">
            <img src="@/themes/doccure/assets/img/banner-six-2.png" class="img-fluid" alt="Banner" />
            <div class="banner-img1 banner-imgfourteen">
              <img
                src="@/themes/doccure/assets/img/icons/ban-six-icon1.svg"
                class="img-fluid"
                alt="Icon"
              />
            </div>
            <div class="banner-img2">
              <img
                src="@/themes/doccure/assets/img/icons/ban-six-icon3.svg"
                class="img-fluid"
                alt="Icon"
              />
            </div>
            <div class="banner-img3 banner-imgfourteen3">
              <img
                src="@/themes/doccure/assets/img/icons/ban-six-icon2.svg"
                class="img-fluid"
                alt="Icon"
              />
            </div>
            <div class="banner-imgfourteen4">
              <img
                src="@/themes/doccure/assets/img/icons/ban-img-icon-4.svg"
                class="img-fluid"
                alt="Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-imgfourteen5">
      <img src="@/themes/doccure/assets/img/icons/ban-img-icon5.svg" class="img-fluid" alt="Icon" />
    </div>
    <div class="banner-imgfourteen6">
      <img src="@/themes/doccure/assets/img/icons/ban-img-icon6.svg" class="img-fluid" alt="Icon" />
    </div>
  </section>
  <!-- /Home Banner -->

  <!-- Benifit Section -->
  <section class="benifit-section">
    <div class="bg-shapes">
      <img src="@/themes/doccure/assets/img/bg/benefit-bg.png" alt="image" class="img-fluid" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-header-fourteen text-center aos" data-aos="fade-up">
            <h2>Benefits <span>With Us</span></h2>
            <p>
              Pregnancy services typically refer to a range of medical, emotional, and
              practical support provided to individuals who are pregnant or planning a
              pregnancy.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="benifit-wrap flex-fill">
            <span>
              <img src="@/themes/doccure/assets/img/icons/benefit-icon-01.svg" alt="img" />
            </span>
            <h5>Qualified Doctors</h5>
            <p>Meet Our Trusted Team of Experienced Doctors.</p>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="benifit-wrap flex-fill">
            <span>
              <img src="@/themes/doccure/assets/img/icons/benefit-icon-02.svg" alt="img" />
            </span>
            <h5>Modern Equipments</h5>
            <p>Experience Cutting-Edge Technology for Superior Care.</p>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="benifit-wrap flex-fill">
            <span>
              <img src="@/themes/doccure/assets/img/icons/benefit-icon-03.svg" alt="img" />
            </span>
            <h5>Individual Approach</h5>
            <p>Experience Personalized Care Like Never Before.</p>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="benifit-wrap flex-fill">
            <span>
              <img src="@/themes/doccure/assets/img/icons/benefit-icon-04.svg" alt="img" />
            </span>
            <h5>Qualified Doctors</h5>
            <p>Urgent Help When You Need It Most</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Benifit Section -->

  <!-- services Section -->
  <section class="services-section-fourteen">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-header-fourteen text-center aos" data-aos="fade-up">
            <h2>Services <span>We Provide</span></h2>
            <p>
              Pregnancy services typically refer to a range of medical, emotional, and
              practical support provided to individuals who are pregnant or planning a
              pregnancy.
            </p>
          </div>
        </div>
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="fertility-slider owl-carousel nav-center">
            <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
              <Slide v-for="item in IndexNineServices" :key="item.id">
                <div class="card service-inner-fourt-all w-100">
                  <div class="card-body service-inner-fourt-main text-start">
                    <div class="service-inner-item">
                      <router-link to="/search">
                        <div class="service-inner-img">
                          <img
                            :src="require(`@/themes/doccure/assets/img/service/${item.Image}`)"
                            class="img-fluid"
                            alt="image"
                          />
                        </div>
                      </router-link>
                      <div class="service-body">
                        <span class="service-icon">
                          <img
                            :src="require(`@/themes/doccure/assets/img/icons/${item.CareImage}`)"
                            class="img-fluid"
                            alt="image"
                          />
                        </span>
                        <span class="service-icon-img">
                          <img
                            :src="require(`@/themes/doccure/assets/img/icons/${item.CareBigImage}`)"
                            class="img-fluid"
                            alt="image"
                          />
                        </span>
                        <h4>
                          <router-link
                            to="/search"
                            class="service-inner-right-fourt-care"
                            >{{ item.Title }}</router-link
                          >
                        </h4>
                        <p>
                          {{ item.Content }}
                        </p>
                        <router-link to="/search" class="service-link"
                          >Learn More<i class="fa-solid fa-chevron-right"></i
                        ></router-link>
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
          <div class="btn-sec text-center">
            <router-link to="/search" class="btn btn-primary"
              >Browse all services<i class="fa-solid fa-chevron-right"></i
            ></router-link>
          </div>
        </div>
        <div class="bg-shapes">
          <img
            src="@/themes/doccure/assets/img/icons/ban-img-icon7.svg"
            alt="image"
            class="img-fluid shape-1"
          />
          <img
            src="@/themes/doccure/assets/img/icons/ban-img-icon8.svg"
            alt="image"
            class="img-fluid shape-2"
          />
          <img
            src="@/themes/doccure/assets/img/icons/ban-img-icon9.svg"
            alt="image"
            class="img-fluid shape-3"
          />
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
import IndexNineServices from "@/themes/doccure/assets/json/indexnineservices.json";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexNineServices: IndexNineServices,
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
        991: {
          itemsToShow: 1,
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
    Pagination,
    Navigation,
  },
  methods: {
    submitForm() {
      this.$router.push("/search-2");
    },
  },
};
</script>
