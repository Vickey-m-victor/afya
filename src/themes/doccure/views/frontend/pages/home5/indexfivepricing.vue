<template>
  <!-- Pricing -->
  <section class="pricing-section pricing-section-ten">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-7 col-md-12 mx-auto text-center aos"
          data-aos="fade-up"
        >
          <div class="section-header-one section-header-slider">
            <h2 class="section-title">Choose your Package</h2>
            <p>
              Clearly communicated the risks and outcomes of the procedure. Very
              happy with his care and would recommend to anyone else.
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-3 col-md-6 col-sm-12 aos" data-aos="fade-up">
          <div class="card pricing-card pricing-card-active">
            <div class="card-body">
              <div class="pricing-header">
                <div class="pricing-header-info">
                  <div class="pricing-title">
                    <h4>Free</h4>
                  </div>
                  <div class="pricing-tag">
                    <div>
                      <img src="@/themes/doccure/assets/img/bg/heart-plus.png" alt="icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pricing-info">
                <div class="pricing-amount">
                  <h2>$0</h2>
                  <span>per month</span>
                </div>
                <div class="pricing-btn">
                  <router-link to="/pricing" class="btn"
                    >Choose Plan</router-link
                  >
                </div>
                <div class="pricing-list">
                  <ul>
                    <li>100 conversations p/m</li>
                    <li>10 websites</li>
                    <li>2 GB data storage</li>
                  </ul>
                </div>
                <div class="pricing-list pricing-list-two">
                  <ul>
                    <li>Chat widget</li>
                    <li>Real time support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-lg-3 col-md-6 col-sm-12 aos"
          v-for="item in IndexFivePricing"
          :key="item.id"
          data-aos="fade-up"
        >
          <div class="card pricing-card">
            <div class="card-body">
              <div class="pricing-header">
                <div class="pricing-header-info">
                  <div
                    class="pricing-title d-flex align-items-center justify-content-between"
                  >
                    <h4>{{ item.title }}</h4>
                    <span :class="item.BadgeClass">{{ item.Discount }}</span>
                  </div>
                </div>
              </div>
              <div class="pricing-info">
                <div class="pricing-amount">
                  <h2>{{ item.amount }}</h2>
                  <span>{{ item.per_month }}</span>
                </div>
                <div class="pricing-btn">
                  <router-link to="/pricing" class="btn">{{
                    item.button_text
                  }}</router-link>
                </div>
                <div class="pricing-list">
                  <ul>
                    <li>{{ item.features }}</li>
                    <li>{{ item.websites }}</li>
                    <li>{{ item.data }}</li>
                  </ul>
                </div>
                <div class="pricing-list pricing-list-two">
                  <ul>
                    <li>Everything Off <span class="badge">Free</span></li>
                    <li>{{ item.widget }}</li>
                    <li>{{ item.Real }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="partners-info aos" data-aos="fade-up">
            <div class="section-header-one text-center">
              <h2 class="section-title mb-0">
                Top Business Organizations Collaborated With Us
              </h2>
            </div>
            <ul class="owl-carousel partners-slider">
              <Carousel
                :wrap-around="true"
                :settings="settings"
                :breakpoints="breakpoints"
              >
                <Slide
                  v-for="(record, index) in IndexFivePricingOne"
                  :key="index"
                >
                  <li>
                    <a href="javascript:void(0);">
                      <img
                        class="img-fluid"
                        :src="require(`@/themes/doccure/assets/img/partners/${record.Image}`)"
                        alt="partners"
                      />
                    </a>
                  </li>
                </Slide>
                <template #addons> </template>
              </Carousel>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Pricing -->

  <!-- FAQ Section -->
  <section class="faq-section faq-section-ten">
    <div class="section-floating-bg">
      <img src="@/themes/doccure/assets/img/bg/hexagen-group-1.png" alt="design-image" />
      <img src="@/themes/doccure/assets/img/bg/hexagon-group-2.png" alt="design-image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12 aos" data-aos="fade-up">
          <div class="faq-img">
            <img src="@/themes/doccure/assets/img/faq-img-2.png" class="img-fluid" alt="img" />
            <div class="bg-shapes">
              <img src="@/themes/doccure/assets/img/bg/cardiac-bg-02.png" alt="image" />
            </div>
            <div class="faq-user">
              <div class="user-info">
                <span>
                  <img
                    src="@/themes/doccure/assets/img/clients/client-08.jpg"
                    class="img-fluid"
                    alt="img"
                  />
                </span>
                <div class="flex-1">
                  <h6>Andrew</h6>
                  <p>Newyork, USA</p>
                </div>
              </div>
              <div class="rating">
                <i class="fa-solid fa-star filled"></i>
                <i class="fa-solid fa-star filled"></i>
                <i class="fa-solid fa-star filled"></i>
                <i class="fa-solid fa-star filled"></i>
                <i class="fa-solid fa-star filled"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="section-header-one aos" data-aos="fade-up">
            <h2 class="section-title mb-0">Frequently Asked Questions?</h2>
          </div>
          <div class="faq-info aos" data-aos="fade-up">
            <div class="accordion" id="faq-details">
              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <a
                    href="javascript:void(0);"
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#faqone"
                    aria-expanded="false"
                    aria-controls="faqone"
                  >
                    Have you need an expert medical team in house?
                  </a>
                </h2>
                <div
                  id="faqone"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        Simply visit our website and log in or create an
                        account. Search for a doctor based on specialization,
                        location, or availability & confirm your booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <a
                    href="javascript:void(0);"
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    The medical Experts carefully Transplant the Heart
                  </a>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        Yes, you can usually request a specific doctor when
                        booking your appointment, though availability may vary
                        based on their schedule.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->

              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <a
                    href="javascript:void(0);"
                    class="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Experience in When to repair the mitral valve.
                  </a>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        Heart care and specialist doctors in the hospital. They
                        are carefully and easily manage heart surgey.
                      </p>
                      <ul>
                        <li>The extinction of plant and</li>
                        <li>animal species is endangering</li>
                        <li>the functioning of ecosystems</li>
                      </ul>
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
import IndexFivePricing from "@/themes/doccure/assets/json/indexfivepricing.json";
import IndexFivePricingOne from "@/themes/doccure/assets/json/indexfivepricingone.json";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexFivePricing: IndexFivePricing,
      IndexFivePricingOne: IndexFivePricingOne,
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
          itemsToShow: 6,
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
};
</script>
