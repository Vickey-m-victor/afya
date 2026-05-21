<template>
  <!-- Footer -->
  <footer class="footer footer-three footer-ten">
    <div class="footer-ten-bg">
      <img src="@/themes/doccure/assets/img/bg/hexagen-group-4.png" alt="design-image" />
      <img src="@/themes/doccure/assets/img/bg/hexagen-group-5.png" alt="design-image" />
    </div>
    <div class="footer-top">
      <div class="container">
        <div class="footer-details">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="footer-widget footer-about">
                <h2 class="footer-title">About Doccure</h2>
                <div class="footer-about-content">
                  <p>
                    We can guide you through issues like Cardiac arrest, Heart
                    Failure, Peripheral Artery Disease, Arrhythmia, Atrial
                    Fibrillation, Cholesterol and High BP.
                  </p>
                </div>
                <div class="subscribe-form">
                  <form action="javascript:void(0)">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                    />
                    <button type="submit" class="btn">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6">
              <div class="footer-widget footer-menu">
                <h2 class="footer-title">Useful Links</h2>
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><router-link to="/search">Doctors</router-link></li>
                  <li><router-link to="/my-patients">Patients</router-link></li>
                  <li>
                    <router-link to="/pharmacy-index">Pharmacy</router-link>
                  </li>
                  <li><router-link to="/about-us">Pages</router-link></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer-widget footer-menu">
                <h2 class="footer-title">Services</h2>
                <ul>
                  <li>
                    <a href="javascript:void(0);">Cardiac Consultation</a>
                  </li>
                  <li><a href="javascript:void(0);">Diagnostic Testing</a></li>
                  <li><a href="javascript:void(0);">Treatments</a></li>
                  <li>
                    <a href="javascript:void(0);">Interventional Procedure</a>
                  </li>
                  <li><a href="javascript:void(0);">Electrophysiology</a></li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="footer-widget footer-contact">
                <h2 class="footer-title">Contact Us</h2>
                <div class="footer-contact-info">
                  <div class="footer-address">
                    <span>
                      <i class="feather-phone-call"></i>
                    </span>
                    <div class="addr-info">
                      <h6>Looking for Consultation</h6>
                      <p>+1 315 369 5943</p>
                    </div>
                  </div>
                  <div class="footer-address">
                    <span>
                      <i class="feather-mail"></i>
                    </span>
                    <div class="addr-info">
                      <h6>Email Address</h6>
                      <p>doccure@example.com</p>
                    </div>
                  </div>
                  <div class="footer-address mb-0">
                    <span>
                      <i class="feather-map-pin"></i>
                    </span>
                    <div class="addr-info">
                      <h6>Address</h6>
                      <p>123 Street Name, City, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <!-- Copyright -->
        <div class="copyright">
          <div class="copyright-text">
            <p class="mb-0">Copyright © {{ new Date().getFullYear() }} Doccure. All Rights Reserved</p>
          </div>
          <!-- Copyright Menu -->
          <div class="copyright-menu">
            <ul class="policy-menu">
              <li>
                <router-link to="/privacy-policy">Privacy Policy</router-link>
              </li>
              <li>
                <router-link to="/terms-condition"
                  >Terms and Conditions</router-link
                >
              </li>
            </ul>
          </div>
          <div class="social-icon">
            <ul>
              <li>
                <a href="javascript:void(0);"
                  ><i class="fab fa-facebook"></i
                ></a>
              </li>
              <li>
                <a href="javascript:void(0);"
                  ><i class="fab fa-instagram"></i
                ></a>
              </li>
              <li>
                <a href="javascript:void(0);"><i class="fab fa-twitter"></i></a>
              </li>
              <li>
                <a href="javascript:void(0);"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </li>
            </ul>
          </div>
          <!-- /Copyright Menu -->
        </div>
        <!-- /Copyright -->
      </div>
    </div>
  </footer>
  <!-- /Footer -->
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
