<template>
  <!-- Our Doctor -->
  <section class="our-doctor-section">
    <div class="section-floating-bg">
      <img src="@/themes/doccure/assets/img/bg/hexagen-group-1.png" alt="design-image" />
      <img src="@/themes/doccure/assets/img/bg/hexagon-group-2.png" alt="design-image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="section-header-one section-header-slider">
            <h2 class="section-title mb-0">Our Specialist Doctors</h2>
          </div>
        </div>
      </div>
      <div
        class="owl-carousel doctor-slider-ten nav-center owl-theme aos"
        data-aos="fade-up"
      >
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="item in indexFiveDoctor" :key="item.id">
            <div class="module-border-wrap">
              <div class="listing-card">
                <div class="listing-img">
                  <router-link to="/doctor-profile"
                    ><img
                      :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)"
                      class="img-fluid"
                      alt="Jonathan Behar"
                  /></router-link>
                  <div :class="['fav-item', { selected: item.favorite }]">
                    <div class="featured-rating">
                      <i class="fa fa-star"></i> <span>4.5</span>
                    </div>
                    <a
                      href="javascript:void(0)"
                      class="fav-icon"
                      :class="['fav-icon', { selected: item.favorite }]"
                      @click="toggleFavorite(item)"
                    >
                      <i class="fa fa-heart"></i>
                    </a>
                  </div>
                </div>
                <div class="listing-content">
                  <div class="listing-details">
                    <div class="listing-category">
                      <a
                        href="javascript:void(0);"
                        class="listing-category-tag tag-green"
                        >{{ item.Badge }}</a
                      >
                      <a
                        href="javascript:void(0);"
                        class="listing-category-tag tag-purple"
                        >{{ item.Badge1 }}</a
                      >
                    </div>
                    <div class="listing-profile-details">
                      <div class="listing-floating-img">
                        <img
                          src="@/themes/doccure/assets/img/bg/ecg-wave.png"
                          alt="ecg-wave"
                        />
                      </div>
                      <div class="listing-user">
                        <div class="listing-user-details text-start">
                          <h6>
                            <router-link to="/doctor-profile"
                              >{{ item.Name }}
                            </router-link>
                          </h6>
                          <span>{{ item.Text }}</span>
                        </div>
                      </div>
                      <div class="listing-btn">
                        <router-link to="/booking-2" class="btn consult-btn"
                          >Book Now</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
          </template>
        </Carousel>
      </div>
    </div>
  </section>
  <!-- /Our Doctor -->

  <!-- Steps To Follow-->
  <section class="specialities-section-one">
    <div class="bg-shapes">
      <img src="@/themes/doccure/assets/img/bg/circle-bg.png" alt="image" />
      <img src="@/themes/doccure/assets/img/bg/steps-bg-02.png" alt="image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="section-header-one section-header-slider">
            <h2 class="section-title mb-0">Why Choose Doccure?</h2>
          </div>
        </div>
      </div>
      <div class="specialities-block aos" data-aos="fade-up">
        <div class="row rows-col-5">
          <div class="col-xl col-lg-4 col-sm-6 col-12 d-flex">
            <div class="specialities-item flex-fill">
              <div class="specialities-img">
                <div class="hexogen">
                  <img
                    src="@/themes/doccure/assets/img/icons/health-care-love.svg"
                    alt="heart-icon"
                  />
                </div>
              </div>
              <p>Personalized Health care</p>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-sm-6 col-12 d-flex">
            <div class="specialities-item flex-fill">
              <div class="specialities-img">
                <div class="hexogen">
                  <img
                    src="@/themes/doccure/assets/img/icons/user-doctor.svg"
                    alt="male-doctor-icon"
                  />
                </div>
              </div>
              <p>World-Leading Experts for your Care</p>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-sm-6 col-12 d-flex">
            <div class="specialities-item flex-fill">
              <div class="specialities-img">
                <div class="hexogen">
                  <img
                    src="@/themes/doccure/assets/img/icons/healthcare.svg"
                    alt="stethoscope-icon"
                  />
                </div>
              </div>
              <p>Regular Check Up of your Heart</p>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-sm-6 col-12 d-flex">
            <div class="specialities-item flex-fill">
              <div class="specialities-img">
                <div class="hexogen">
                  <img src="@/themes/doccure/assets/img/icons/drugs.svg" alt="medicine-icon" />
                </div>
              </div>
              <p>Treatment For Complex Conditions</p>
            </div>
          </div>
          <div class="col-xl col-lg-4 col-sm-6 col-12 d-flex">
            <div class="specialities-item flex-fill">
              <div class="specialities-img">
                <div class="hexogen">
                  <img
                    src="@/themes/doccure/assets/img/icons/syringe.svg"
                    alt="syringe-icon"
                  />
                </div>
              </div>
              <p>Minimally Invasive Procedures</p>
            </div>
          </div>
        </div>
      </div>
      <div class="specialities-wrap">
        <div class="row">
          <div class="col-lg-7">
            <div class="special-content">
              <h2>Don’t Make Delay on your Life</h2>
              <h4>Book An Appointment Today</h4>
              <p>
                If you have a primary care physician, you can reach out to their
                office and explain that you would like to see a cardiologist.
                They can typically provide referrals and help you schedule an
                appointment.
              </p>
              <div class="special-btn">
                <a href="#" class="btn btn-primary">Start a Consult</a>
                <a href="#" class="btn btn-outline-primary">Click Our Plan</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Steps To Follow -->
  <!-- Steps To Follow-->
  <section class="need-to-know-section steps-to-follow">
    <div class="bg-shapes">
      <img src="@/themes/doccure/assets/img/bg/steps-bg.png" alt="image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-7 mx-auto">
          <div class="section-header-one section-header-slider text-center">
            <h2 class="section-title">Steps For New Patients</h2>
            <p>
              Connect with your chosen healthcare professional at the scheduled
              time. After your appointment, follow any post-visit instructions
              provided by the doctor.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6 aos" data-aos="fade-up">
          <div class="box-detail">
            <div class="steps-list-box">
              <div class="steps-list-img">
                <span>1</span>
                <img
                  src="@/themes/doccure/assets/img/icons/hreat-pulse.svg"
                  class="img-fluid"
                  alt="heart-pulse"
                />
              </div>
              <h6>Choose Your Doctor</h6>
              <p>Lorem Ipsum is simply dummy text of the printing..</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 aos" data-aos="fade-up">
          <div class="box-detail">
            <div class="steps-list-box">
              <div class="steps-list-img">
                <span>2</span>
                <img
                  src="@/themes/doccure/assets/img/icons/hreat-pulse.svg"
                  class="img-fluid"
                  alt="heart-pulse"
                />
              </div>
              <h6>Set Appointment</h6>
              <p>After choose your preferred doctor, set your appointment.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 aos" data-aos="fade-up">
          <div class="box-detail">
            <div class="steps-list-box">
              <div class="steps-list-img">
                <span>3</span>
                <img
                  src="@/themes/doccure/assets/img/icons/hreat-pulse.svg"
                  class="img-fluid"
                  alt="heart-pulse"
                />
              </div>
              <h6>Consult With Doctor</h6>
              <p>Discuss your health concerns with the doctor you choosed.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 aos" data-aos="fade-up">
          <div class="box-detail">
            <div class="steps-list-box">
              <div class="steps-list-img">
                <span>4</span>
                <img
                  src="@/themes/doccure/assets/img/icons/hreat-pulse.svg"
                  class="img-fluid"
                  alt="heart-pulse"
                />
              </div>
              <h6>Get recommendation</h6>
              <p>After consulting you receive personalized advice & solution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Steps To Follow -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import indexFiveDoctor from "@/themes/doccure/assets/json/indexfivedoctor.json";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      indexFiveDoctor: indexFiveDoctor,
      stepsRight: [
        {
          id: 1,
          number: 1,
          title: "Choose Your Doctor",
          description: "Lorem Ipsum is simply dummy text of the printing..",
        },
        {
          id: 3,
          number: 3,
          title: "Consult with doctor",
          description: "Lorem Ipsum is simply dummy text of the printing..",
        },
      ],
      stepsLeft: [
        {
          id: 2,
          number: 2,
          title: "Set Appointment",
          description: "Lorem Ipsum is simply dummy text of the printing..",
        },
        {
          id: 4,
          number: 4,
          title: "Get recommendation",
          description: "Lorem Ipsum is simply dummy text of the printing..",
        },
      ],
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
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    Carousel,
    Slide,
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
  methods: {
    toggleFavorite(item) {
      item.favorite = !item.favorite;
    },
  },
};
</script>
