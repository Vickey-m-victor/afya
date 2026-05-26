<template>
  <!-- Footer -->
  <footer class="footer inner-footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-4">
            <div class="footer-widget footer-about">
              <div class="footer-logo">
                <router-link to="index"><img src="@/themes/doccure/assets/img/logo.svg" alt="logo"></router-link>
              </div>
              <div class="footer-about-content">
                <p>Effortlessly schedule your medical appointments with Doccure. Connect with healthcare professionals, manage appointments & prioritize your well being </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row">
              <div class="col-lg-3 col-md-4">
                <div class="footer-widget footer-menu">
                  <h2 class="footer-title">Company</h2>
                  <ul>
                    <li><router-link to="/about-us">About</router-link></li>
                    <li><router-link to="/search">Features</router-link></li>
                    <li><a href="javascript:void(0);">Works</a></li>
                    <li><a href="javascript:void(0);">Careers</a></li>
                    <li><a href="javascript:void(0);">Locations</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-4">
                <div class="footer-widget footer-menu">
                  <h2 class="footer-title">Specialities</h2>
                  <ul>
                    <li><router-link to="/search">Dental</router-link></li>
                    <li><router-link to="/search">Cardiac</router-link></li>
                    <li><router-link to="/search">Spinal Cord</router-link></li>
                    <li><router-link to="/search">Hair Growth</router-link></li>
                    <li><router-link to="/search">Anemia & Disorder</router-link></li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-3">
                <div class="footer-widget footer-menu">
                  <h6 class="footer-title">Specialities</h6>
                  <ul>
                    <li><router-link to="/search">Transplant</router-link></li>
                    <li><router-link to="/search">Cardiologist</router-link></li>
                    <li><router-link to="/search">Oncology</router-link></li>
                    <li><router-link to="/search">Pediatrics</router-link></li>
                    <li><router-link to="/search">Gynacology</router-link></li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-md-3">
                <div class="footer-widget footer-menu">
                  <h6 class="footer-title">Utilites</h6>
                  <ul>
                    <li><router-link to="/pricing">Pricing</router-link></li>
                    <li><router-link to="/contact-us">Contact</router-link></li>
                    <li><router-link to="/contact-us">Request A Quote</router-link></li>
                    <li><a href="javascript:void(0);">Premium Membership</a></li>
                    <li><a href="javascript:void(0);">Integrations</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-7">
            <div class="footer-widget">
              <h2 class="footer-title">Join Our Newsletter</h2>
              <div class="subscribe-form">
                <form action="#">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Email Address"
                  />
                  <button
                    type="submit"
                    class="btn btn-md btn-primary-gradient d-inline-flex align-items-center"
                  >
                    <i class="isax isax-send-25 me-1"></i>Send
                  </button>
                </form>
              </div>
              <div class="social-icon">
                <h6 class="mb-3">Connect With Us</h6>
                <ul>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-brands fa-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-brands fa-x-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-brands fa-instagram"></i
                    ></a>
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-brands fa-linkedin"></i
                    ></a>
                  </li>
                  <li>
                    <a href="javascript:void(0);"
                      ><i class="fa-brands fa-pinterest"></i
                    ></a>
                  </li>
                </ul>
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
            <p class="mb-0">
              Copyright © {{ new Date().getFullYear() }} Doccure. All Rights Reserved
            </p>
          </div>
        </div>
        <!-- /Copyright -->
      </div>
    </div>
  </footer>
  <!-- /Footer -->
</template>
