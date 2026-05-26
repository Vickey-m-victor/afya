<template>
  <!-- Footer -->
  <footer class="footer footer-sec-fourteen">
    <div class="footer-top">
      <div class="row">
        <div class="col-sm-3 col-6 p-0">
          <div class="footer-img">
            <img src="@/themes/doccure/assets/img/service/footer-img-01.jpg" class="img-fluid w-100" alt="Img">
          </div>
        </div>
        <div class="col-sm-3 col-6 p-0">
          <div class="footer-img">
            <img src="@/themes/doccure/assets/img/service/footer-img-02.jpg" class="img-fluid w-100" alt="Img">
          </div>
        </div>
        <div class="col-sm-3 col-6 p-0">
          <div class="footer-img">
            <img src="@/themes/doccure/assets/img/service/footer-img-03.jpg" class="img-fluid w-100" alt="Img">
          </div>
        </div>
        <div class="col-sm-3 col-6 p-0">
          <div class="footer-img">
            <img src="@/themes/doccure/assets/img/service/footer-img-04.jpg" class="img-fluid w-100" alt="Img">
          </div>
        </div>
      </div>
    </div>
    <div class="footer-middle">
      <div class="container">
        <div class="footer-mid-content">
          <p>Would you like to connect with us</p>
          <ul class="social-icons">
            <li><a href="javascript:void(0);"><i class="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="javascript:void(0);"><i class="fa-brands fa-x-twitter"></i></a></li>
            <li><a href="javascript:void(0);"><i class="fa-brands fa-instagram"></i></a></li>
            <li><a href="javascript:void(0);"><i class="fa-brands fa-linkedin-in"></i></a></li>
            <li><a href="javascript:void(0);"><i class="fa-brands fa-pinterest"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-mid-two">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-md-6 col-sm-12" data-aos="fade-down" data-aos-delay="500">
            <div class="footer-logo-col">
              <div class="footer-logo">
                <img src="@/themes/doccure/assets/img/icons/footer-logo-.svg" alt="Img">
              </div>
              <p>Connect with healthcare professionals, manage appointments & prioritize your well being </p>
              <form @submit.prevent="submitForm">
                <div class="input-block">
                  <input type="text" class="form-control" placeholder="Enter Email">
                  <button class="btn" type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-6" data-aos="fade-down" data-aos-delay="600">
            <div class="footer-links-middle">
              <h4>QUICK LINKS</h4>
              <ul>
                <li><router-link to="/index">Home</router-link></li>
                <li><router-link to="/about-us">About us</router-link></li>
                <li><router-link to="/payment">Payments</router-link></li>
                <li><router-link to="/booking">Lab Test</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-2 col-md-3 col-sm-6" data-aos="fade-down" data-aos-delay="700">
            <div class="footer-links-middle">
              <h4>SERVICES</h4>
              <ul>
                <li><router-link to="search-2.html">Nurse at Home</router-link></li>
                <li><router-link to="search-2.html">Physiotherapy</router-link></li>
                <li><router-link to="search-2.html">Medical Equipment</router-link></li>
                <li><router-link to="booking.html">Doctor Consultation</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-md-4 col-sm-6" data-aos="fade-down" data-aos-delay="800">
            <div class="footer-links-middle">
              <h4>CONSUMER POLICY</h4>
              <ul>
                <li><router-link to="privacy-policy">Privacy</router-link></li>
                <li><router-link to="terms-condition">Terms and Condition</router-link></li>
                <li><router-link to="booking">Aggrements</router-link></li>
                <li><router-link to="map-grid">Sitemap</router-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <div class="copy-right">
          <P>Copyright © {{ new Date().getFullYear() }} Doccure. All rights are reserved.</P>
        </div>
        <div class="footer-select-drops">
          <div class="input-select">
            <span class="select-icon"><i class="feather-globe"></i></span>
            <vue-select :options="USSelect" id="usselect" placeholder="India" />
          </div>
          <div class="input-select currency-select">
            <vue-select :options="INRSelect" id="inrselect" placeholder="USD" />
          </div>
        </div>
        <ul class="payment-method">
          <li><a href="#"><img src="@/themes/doccure/assets/img/icons/footer-card-icon-01.svg" alt="Img"></a></li>
          <li><a href="#"><img src="@/themes/doccure/assets/img/icons/footer-card-icon-02.svg" alt="Img"></a></li>
          <li><a href="#"><img src="@/themes/doccure/assets/img/icons/footer-card-icon-03.svg" alt="Img"></a></li>
          <li><a href="#"><img src="@/themes/doccure/assets/img/icons/footer-card-icon-04.svg" alt="Img"></a></li>
        </ul>
      </div>
    </div>
  </footer>
  <!-- /Footer -->
</template>
<script>
export default {
  data() {
    return {
      INRSelect: ["USD", "INR"],
      USSelect: ["India", "USA"],
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/index-13");
    },
  },
};
</script>
