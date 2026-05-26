<template>
  <!-- App Section -->
  <section class="app-section">
    <div class="container">
      <div class="app-bg">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-12">
            <div class="app-content">
              <div class="app-header aos" data-aos="fade-up">
                <h5>Working for Your Better Health.</h5>
                <h2>Download the Doccure App today!</h2>
              </div>
              <div class="app-scan aos" data-aos="fade-up">
                <p>Scan the QR code to get the app now</p>
                <img src="@/themes/doccure/assets/img/scan-img.png" alt="Image" />
              </div>
              <div class="google-imgs aos" data-aos="fade-up">
                <a href="javascript:void(0);"
                  ><img src="@/themes/doccure/assets/img/google-play.png" alt="img"
                /></a>
                <a href="javascript:void(0);"
                  ><img src="@/themes/doccure/assets/img/app-store.png" alt="img"
                /></a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 aos" data-aos="fade-up">
            <div class="mobile-img">
              <img src="@/themes/doccure/assets/img/mobile-img.png" class="img-fluid" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /App Section -->

  <!-- FAQ Section -->
  <section class="faq-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-one aos" data-aos="fade-up">
            <h5>Get Your Answer</h5>
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12 aos" data-aos="fade-up">
          <div class="faq-img">
            <img src="@/themes/doccure/assets/img/faq-img.png" class="img-fluid" alt="img">
            <div class="faq-patients-count">
              <div class="faq-smile-img">
                <img src="@/themes/doccure/assets/img/icons/smiling-icon.svg" alt="icon">
              </div>
              <div class="faq-patients-content">
                <h4><span class="count-digit">95</span>k+</h4>
                <p>Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="faq-info aos" data-aos="fade-up">
            <div class="accordion" id="faq-details">

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <a href="javascript:void(0);" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    How do I book an appointment with a doctor?
                  </a>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faq-details">
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.</p>
                    </div> 
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <a href="javascript:void(0);" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Can I request a specific doctor when booking my appointment? 
                  </a>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faq-details">
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>Yes, you can usually request a specific doctor when booking your appointment, though availability may vary based on their schedule.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <a href="javascript:void(0);" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    What should I do if I need to cancel or reschedule my appointment?
                  </a>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faq-details">
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>If you need to cancel or reschedule your appointment, contact the doctor as soon as possible to inform them and to reschedule for another available time slot.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <a href="javascript:void(0);" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    What if I'm running late for my appointment?
                  </a>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faq-details">
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>If you know you will be late, it's courteous to call the doctor's office and inform them. Depending on their policy and schedule, they may be able to accommodate you or reschedule your appointment.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <a href="javascript:void(0);" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Can I book appointments for family members or dependents?
                  </a>
                </h2>
                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faq-details">
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>Yes, in many cases, you can book appointments for family members or dependents. However, you may need to provide their personal information and consent to do so.</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->
                    
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /FAQ Section -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
