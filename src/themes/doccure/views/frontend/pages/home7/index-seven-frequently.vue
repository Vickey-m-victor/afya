<template>
  <!-- Choose us -->
  <section class="choose-us-fourteen">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-fourteen text-center">
            <h2>Frequently Asked Questions</h2>
            <p>
              FAQs help provide important information to clients and address
              common queries they may have about the veterinary clinic's
              services, policies, and procedures.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="choose-us-right-main">
            <img
              src="@/themes/doccure/assets/img/bg/home-12-why-us.png"
              alt="image"
              class="img-fluid"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="why-us-content">
            <div class="us-faq aos" data-aos="fade-up" data-aos-delay="200">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How do I book an appointment with a doctor?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse shade show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <h6>
                        Yes, simply visit our website and log in or create an
                        account. Search for a doctor based on specialization,
                        location, or availability & confirm your booking.
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Can I request a specific doctor when booking my
                      appointment?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse shade"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <h6>
                        Yes, you can usually request a specific doctor when
                        booking your appointment, though availability may vary
                        based on their schedule.
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      What should I do if I need to cancel or reschedule my
                      appointment?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse shade"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <h6>
                        If you need to cancel or reschedule your appointment,
                        contact the doctor as soon as possible to inform them
                        and to reschedule for another available time slot.
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      What if I'm running late for my appointment?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse shade"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <h6>
                        If you know you will be late, it's courteous to call the
                        doctor's office and inform them. Depending on their
                        policy and schedule, they may be able to accommodate you
                        or reschedule your appointment.
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Can I book appointments for family members or dependents?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse shade"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <h6>
                        Yes, in many cases, you can book appointments for family
                        members or dependents. However, you may need to provide
                        their personal information and consent to do so.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Choose us -->

  <!-- blog section -->
  <div class="blog-section-fourteen">
    <div class="floating-bg">
      <img src="@/themes/doccure/assets/img/bg/price-sec-bg-01.png" alt="paw-image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-header-fourteen service-inner-fourteen">
            <h2>Doccure recent Blogs</h2>
            <p>
              Checkout our Latest blogs by our Experts by Month on Month to know
              more about Petss
            </p>
          </div>
        </div>
        <div
          class="col-lg-4 col-md-6 aos"
          data-aos="fade-up"
          v-for="item in IndexRecentBlog"
          :key="item.id"
        >
          <div class="card blog-inner-fourt-all veterinary-blog-card">
            <div class="card-body blog-inner-fourt-main">
              <div class="blog-inner-right-fourt">
                <router-link to="/blog-details">
                  <div class="blog-inner-right-img">
                    <img
                      :src="require(`@/themes/doccure/assets/img/blog/${item.Image}`)"
                      alt="image"
                      class="img-fluid"
                    />
                  </div>
                </router-link>
                <div class="blog-inner-doc">
                  <img
                    :src="require(`@/themes/doccure/assets/img/doctors/${item.Avatar}`)"
                    alt="Pamila Certis"
                    class="me-2"
                  />
                  <span
                    ><router-link to="/doctor-profile">{{
                      item.Name
                    }}</router-link></span
                  >
                </div>
                <router-link
                  to="/blog-details"
                  class="blog-inner-right-fourt-care"
                  >Must know best dog food Best Dog Food in India</router-link
                >
                <p>
                  In the diverse landscape of India, dog food options have
                  variety of dietary needs..
                </p>
                <router-link to="/blog-details" class="read-cap-text"
                  >Continue Reading<i class="fa-solid fa-chevron-right ms-2"></i
                ></router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="various-logo-slider owl-carousel">
            <Carousel
              :wrap-around="true"
              :settings="settings"
              :breakpoints="breakpoints"
            >
              <Slide v-for="item in IndexPartners" :key="item.id">
                <div class="plugin-logo-img">
                  <span
                    ><img
                      :src="require(`@/themes/doccure/assets/img/icons/${item.Image}`)"
                      alt="Img"
                  /></span>
                </div>
              </Slide>
              <template #addons>
              </template>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /blog section -->
</template>

<script>
import IndexRecentBlog from "@/themes/doccure/assets/json/index-seven-recent-blog.json";
import IndexPartners from "@/themes/doccure/assets/json/index-seven-partner.json";

import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexRecentBlog: IndexRecentBlog,
      IndexPartners: IndexPartners,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        575: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 4,
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
    Pagination,
    Navigation,
  },
};
</script>