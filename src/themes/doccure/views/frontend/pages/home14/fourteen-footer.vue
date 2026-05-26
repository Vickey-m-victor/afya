<template>
  <!-- Footer -->
  <footer class="footer footer-eleven dentist-footer">
    <div class="footer-top aos aos-init aos-animate" data-aos="fade-up">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6">
            <div class="footer-widget footer-about">
              <div class="footer-widget-title">
                <h4>About </h4>
              </div>
              <p>Dental care is essential for maintaining oral health and overall well-being. It involves practices aimed at preventing dental problems, treating existing issues.</p>
              <div class="subscribe-form">
                <form action="#">
                  <input type="email" class="form-control" placeholder="Email Address">
                  <button type="submit" class="btn">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div class="footer-widget footer-menu">
              <div class="footer-widget-title">
                <h4>Contact Us</h4>
              </div>
              <ul>
                <li>
                  <span class="icon-contact"><i class="fa-solid fa-phone"></i></span>
                  <p><span>Looking for Consultation</span>+1 315 369 5943</p>
                </li>
                <li>
                  <span class="icon-contact"><i class="fa-regular fa-envelope"></i></span>
                  <p><span>Email Address</span>doccure@example.com</p>
                </li>
                <li>
                  <span class="icon-contact"><i class="fa-solid fa-location-dot"></i></span>
                  <p><span>Address</span>123 Street Name, City, USA</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <div class="footer-widget footer-menu">
              <div class="footer-widget-title">
                <h4>Useful Links</h4>
              </div>
              <ul>
                <li><router-link to="index-14">Home</router-link></li>
                <li><router-link to="doctor-dashboard">Doctors</router-link></li>
                <li><router-link to="patient-dashboard">Patients</router-link></li>
                <li><router-link to="pharmacy-index">Pharmacy</router-link></li>
                <li><a href="javascript:void(0);">Pages</a></li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div class="footer-widget footer-menu">
              <div class="footer-widget-title">
                <h4>Services</h4>
              </div>
              <ul>
                <li><router-link to="/index-10">Cardiac Consultation</router-link></li>
                <li><a href="javascript:void(0);">Diagnostic Testing</a></li>
                <li><a href="javascript:void(0);">Treatments</a></li>
                <li><a href="javascript:void(0);">Interventional Procedure</a></li>
                <li><a href="javascript:void(0);">Electrophysiology</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <!-- Copyright -->
        <div class="copyright">
          <div class="row align-items-center">
            <div class="col-xl-4">
              <div class="copyright-text">
                <p>Copyright © {{ new Date().getFullYear() }} Doccure. All Rights Reserved</p>
              </div>
            </div>
            <div class="col-xl-3">
              <div class="footer-bottom-logo">
                <div class="social-icon">
                  <ul>
                    <li>
                      <a href="javascript:void(0);"><i class="fab fa-facebook"></i> </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"><i class="fab fa-x"></i> </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"><i class="fab fa-linkedin-in"></i></a>
                    </li>
                    <li>
                      <a href="javascript:void(0);"><i class="fab fa-pinterest"></i> </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-5">
              <!-- Copyright Menu -->
              <div class="copyright-menu">
                <ul class="policy-menu">
                  <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
                  <li><router-link to="/terms-condition">Terms and Conditions</router-link></li>
                  <li><router-link to="/pricing">Refund Policy</router-link></li>
                </ul>
              </div>
              <!-- /Copyright Menu -->

            </div>
          </div>
        </div>
        <!-- /Copyright -->
      </div>
    </div>
  </footer>
  <!-- /Footer -->
</template>