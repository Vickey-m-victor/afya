<template>
  <!-- Doctors Section -->
  <section class="doctors-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="section-header-one section-header-slider text-center">
            <h2 class="section-title">Best Doctors</h2>
          </div>
        </div>
      </div>
      <div class="owl-carousel doctor-slider-one owl-theme aos" data-aos="fade-up">
        <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="item in IndexDoctor" :key="item.id">
            <div class="item">
              <div class="doctor-profile-widget doc-item">
                <div class="doc-pro-img">
                  <router-link to="/doctor-profile">
                    <div class="doctor-profile-img">
                      <img
                        :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)"
                        class="img-fluid"
                        alt="Image"
                      />
                    </div>
                  </router-link>
                  <div class="doctor-amount">
                    <span>{{ item.Price }}</span>
                  </div>
                </div>
                <div class="doc-content">
                  <div class="doc-pro-info">
                    <div class="doc-pro-name">
                      <router-link to="/doctor-profile">{{ item.Name }}</router-link>
                      <p>{{ item.Text }}</p>
                    </div>
                    <div class="reviews-ratings">
                      <p>
                        <span><i class="fas fa-star"></i> {{ item.Star }}</span>
                        {{ item.Rateing }}
                      </p>
                    </div>
                  </div>
                  <div class="doc-pro-location">
                    <p><i class="feather-map-pin"></i> {{ item.Location }}</p>
                    <span :class="item.BadgeClass"
                      ><i class="fa-solid fa-circle"></i>{{ item.Badge }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </section>
  <!-- /Doctors Section -->

  <!-- Pricing -->
  <section class="pricing-section doc-plan">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center aos" data-aos="fade-up">
          <div class="section-header-one">
            <h2 class="section-title">Pricing Plan</h2>
          </div>
        </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-4 col-sm-12 aos" data-aos="fade-up">
          <div class="card pricing-card">
            <div class="card-body">
              <div class="pricing-header">
                <div class="pricing-header-info">
                  <div class="pricing-icon">
                    <span>
                      <img src="@/themes/doccure/assets/img/icons/price-icon1.svg" alt="icon">
                    </span>
                  </div>
                  <div class="pricing-title">
                    <h4>Basic</h4>
                  </div>
                </div>
              </div>
              <div class="pricing-info">
                <div class="pricing-amount">
                  <h2>$99 <span>/monthly</span></h2>
                  <h6>What’s included</h6>
                </div>
                <div class="pricing-list">
                  <ul>
                    <li>Profile Creation</li>
                    <li>Appointment Booking</li>
                    <li>Notification Alerts</li>
                    <li>Limited Telemedicine Access</li>
                  </ul>
                </div>
                <div class="pricing-btn">
                  <router-link to="/login-email" class="btn btn-primary">Choose Plan</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12 aos" data-aos="fade-up">
          <div class="card pricing-card active">
            <div class="card-body">
              <div class="pricing-header">
                <div class="pricing-header-info">
                  <div class="pricing-icon">
                    <span>
                      <img src="@/themes/doccure/assets/img/icons/price-icon2.svg" alt="icon">
                    </span>
                  </div>
                  <div class="pricing-title">
                    <h4>Pro</h4>
                  </div>
                </div>
                <div>
                  <span class="badge">Popular</span>
                </div>
              </div>
              <div class="pricing-info">
                <div class="pricing-amount">
                  <h2>$199 <span>/monthly</span></h2>
                  <h6>What’s included</h6>
                </div>
                <div class="pricing-list">
                  <ul>
                    <li>Profile Creation</li>
                    <li>Appointment Booking</li>
                    <li>Notification Alerts</li>
                    <li>Extended Telemedicine Access</li>
                    <li>Exclusive Discounts</li>
                    <li>Appointment History</li>
                    <li>Priority Customer Support</li>
                  </ul>
                </div>
                <div class="pricing-btn">
                  <router-link to="login-email" class="btn btn-primary">Choose Plan</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12 aos" data-aos="fade-up">
          <div class="card pricing-card">
            <div class="card-body">
              <div class="pricing-header">
                <div class="pricing-header-info">
                  <div class="pricing-icon">
                    <span>
                      <img src="@/themes/doccure/assets/img/icons/price-icon3.svg" alt="icon">
                    </span>
                  </div>
                  <div class="pricing-title">
                    <h4>Enterprise</h4>
                  </div>
                </div>
              </div>
              <div class="pricing-info">
                <div class="pricing-amount">
                  <h2>$399 <span>/monthly</span></h2>
                  <h6>What’s included</h6>
                </div>
                <div class="pricing-list">
                  <ul>
                    <li>All Basic Plan Features</li>
                    <li>All Premium Plan Features</li>
                    <li>Personalized Health Insights</li>
                    <li>Family Account Management</li>
                  </ul>
                </div>
                <div class="pricing-btn">
                  <router-link to="login-email" class="btn btn-primary">Choose Plan</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Pricing -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexDoctor from "@/themes/doccure/assets/json/indexdoctor.json";
import "vue3-carousel/dist/carousel.css";

export default {
  data() {
    return {
      IndexDoctor: IndexDoctor,
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
};
</script>
