<template>
  <!-- Footer -->
  <footer class="footer footer-three">

    <!-- Footer Top -->
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6">
            <!-- Footer Widget -->
            <div class="footer-widget footer-about">
              <div class="footer-logo">
                <img src="@/themes/doccure/assets/img/footer-logo.png" alt="logo">
              </div>
              <div class="footer-about-content">
                <p>Effortlessly schedule your medical appointments with Doccure. Connect with healthcare professionals, manage appointments & prioritize your well being </p>
                <div class="social-icon">
                  <ul>
                    <li> <a href="javascript:void(0);"><i class="fa-brands fa-facebook"></i></a>
                    </li>
                    <li> <a href="javascript:void(0);"><i class="fab fa-twitter"></i> </a>
                    </li>
                    <li> <a href="javascript:void(0);"><i class="fab fa-linkedin-in"></i></a>
                    </li>
                    <li> <a href="javascript:void(0);"><i class="fab fa-instagram"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /Footer Widget -->
          </div>
          <div class="col-lg-3 col-md-6">
            <!-- Footer Widget -->
            <div class="footer-widget footer-menu">
              <h2 class="footer-title">For Patients</h2>
              <ul>
                <li><router-link to="/search">Search for Doctors</router-link>
                </li>
                <li><router-link to="/login">Login</router-link>
                </li>
                <li><router-link to="/register">Register</router-link>
                </li>
                <li><router-link to="/booking">Booking</router-link>
                </li>
                <li><router-link to="/patient-dashboard">Patient Dashboard</router-link>
                </li>
              </ul>
            </div>
            <!-- /Footer Widget -->
          </div>
          <div class="col-lg-3 col-md-6">
            <!-- Footer Widget -->
            <div class="footer-widget footer-menu">
              <h2 class="footer-title">For Doctors</h2>
              <ul>
                <li><router-link to="/appointments">Appointments</router-link>
                </li>
                <li><router-link to="/chat">Chat</router-link>
                </li>
                <li><router-link to="/login">Login</router-link>
                </li>
                <li><router-link to="/doctor-register">Register</router-link>
                </li>
                <li><router-link to="/doctor-dashboard">Doctor Dashboard</router-link>
                </li>
              </ul>
            </div>
            <!-- /Footer Widget -->
          </div>
          <div class="col-lg-3 col-md-6">
            <!-- Footer Widget -->
            <div class="footer-widget footer-contact">
              <h2 class="footer-title">Contact Us</h2>
              <div class="footer-contact-info">
                <div class="footer-address"> <span><i class="isax isax-location5"></i></span>
                  <p>3556 Beech Street, San Francisco,
                    <br>California, CA 94108
                  </p>
                </div>
                <p><i class="isax isax-call5"></i>+1 315 369 5943</p>
                <p class="mb-0"> <i class="isax isax-sms5"></i>
                  doccure@example.com</p>
              </div>
            </div>
            <!-- /Footer Widget -->
          </div>
        </div>
      </div>
    </div>
    <!-- /Footer Top -->

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <!-- Copyright -->
        <div class="copyright">
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <div class="copyright-text">
                <p class="mb-0">Copyright © {{ new Date().getFullYear() }} Doccure. All Rights Reserved</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-6">
              <!-- Copyright Menu -->
              <div class="copyright-menu">
                <ul class="policy-menu">
                  <li><router-link to="/terms-condition">Terms and Conditions</router-link>
                  </li>
                  <li><router-link to="/privacy-policy">Policy</router-link>
                  </li>
                </ul>
              </div>
              <!-- /Copyright Menu -->
            </div>
          </div>
        </div>
        <!-- /Copyright -->

      </div>
    </div>
    <!-- /Footer Bottom -->

  </footer>
  <!-- /Footer -->
</template>
