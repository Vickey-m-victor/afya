<template>
  <!-- Pricing Plan -->
  <div class="pricing-section-sixteen">
    <div class="bg-img">
      <img src="@/themes/doccure/assets/img/bg/vector-bg-06.png" class="sec-vector" alt="Img" />
      <img
        src="@/themes/doccure/assets/img/bg/vector-bg-06.png"
        class="sec-vector-two"
        alt="Img"
      />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-sixteen text-center">
            <p>Choose our best plan</p>
            <h2>Pricing Plan</h2>
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
                      <img src="@/themes/doccure/assets/img/icons/price-icon1.svg" alt="icon" />
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
                  <router-link to="/pricing" class="btn">Choose Plan</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12 aos" data-aos="fade-up">
          <div class="card pricing-card pricing-card-active">
            <div class="card-body">
              <div class="pricing-header">
                <div class="pricing-header-info">
                  <div class="pricing-icon">
                    <span>
                      <img src="@/themes/doccure/assets/img/icons/price-icon2.svg" alt="icon" />
                    </span>
                  </div>
                  <div class="pricing-title">
                    <h4>Premium</h4>
                  </div>
                  <div class="pricing-tag">
                    <span>Popular</span>
                  </div>
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
                  <router-link to="/pricing" class="btn">Choose Plan</router-link>
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
                      <img src="@/themes/doccure/assets/img/icons/price-icon3.svg" alt="icon" />
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
                    <li>All Basic plan features</li>
                    <li>All Premium plan features</li>
                    <li>Personalized Health Insights</li>
                    <li>Family Account Management</li>
                  </ul>
                </div>
                <div class="pricing-btn">
                  <router-link to="/pricing" class="btn">Choose Plan</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Pricing Plan -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
