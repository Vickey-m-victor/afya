<template>
  <!-- blog section -->
  <div class="blog-section-fourteen">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-header-fourteen text-center">
            <h2>Recent <span>Articles</span></h2>
            <p>Checkout latest articles from our experience doctors</p>
          </div>
        </div>
      </div>
      <div
        class="owl-carousel blog-slider-fourteen nav-center owl-theme aos"
        data-aos="fade-up"
      >
        <Carousel
          :wrap-around="true"
          :settings="settings"
          :breakpoints="breakpoints"
        >
          <Slide v-for="item in IndexNineBlog" :key="item.id">
            <div class="card blog-inner-fourt-all">
              <div class="card-body blog-inner-fourt-main text-start">
                <div class="blog-inner-right-fourt">
                  <router-link to="/blog-details">
                    <div class="blog-inner-right-img">
                      <img
                        :src="require(`@/themes/doccure/assets/img/blog/${item.Image}`)"
                        alt="image"
                        class="img-fluid blog-inner-right-inner"
                      />
                      <div class="blog-inner-top-content">
                        <img
                          :src="
                            require(`@/themes/doccure/assets/img/doctors/${item.DoctorImg}`)
                          "
                          alt="Doctor"
                          class="me-2"
                        />
                        <span>{{ item.Name }}</span>
                      </div>
                    </div>
                  </router-link>
                  <router-link
                    to="/blog-details"
                    class="blog-inner-right-fourt-care"
                    >{{ item.Title }}</router-link
                  >
                  <ul class="articles-list nav blog-articles-list">
                    <li><i class="feather-calendar"></i> {{ item.Day }}</li>
                    <li>
                      <i class="feather-message-square"></i>{{ item.Chat }}
                    </li>
                    <li><i class="feather-eye"></i> {{ item.Views }}</li>
                  </ul>
                  <p>
                    {{ item.Content }}
                  </p>
                  <ul class="articles-list nav blog-articles-list-two">
                    <li>{{ item.Badge }}</li>
                    <li>{{ item.Badge1 }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div
        class="btn-sec text-center aos aos-init aos-animate"
        data-aos="fade-up"
      >
        <router-link to="/search" class="btn btn-primary"
          >Browse all blogs<i class="fa-solid fa-chevron-right"></i
        ></router-link>
      </div>
      <div class="faq-info aos" data-aos="fade-up">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="section-header-fourteen text-center">
              <h2>Frequently Asked <span>Questions</span></h2>
              <p>Questions that solves the doubts of our patients</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="accordion" id="faq-details">
              <!-- FAQ Item -->
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <a
                    href="javascript:void(0);"
                    class="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    How do I book an appointment with a doctor?
                  </a>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        Yes, simply visit our website and log in or create an
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
                <h2 class="accordion-header" id="headingTwo">
                  <a
                    href="javascript:void(0);"
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Can I request a specific doctor when booking my appointment?
                  </a>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
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
                <h2 class="accordion-header" id="headingThree">
                  <a
                    href="javascript:void(0);"
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    What should I do if I need to cancel or reschedule my
                    appointment?
                  </a>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        If you need to cancel or reschedule your appointment,
                        contact the doctor as soon as possible to inform them
                        and to reschedule for another available time slot.
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
                    What if I'm running late for my appointment?
                  </a>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        If you know you will be late, it's courteous to call the
                        doctor's office and inform them. Depending on their
                        policy and schedule, they may be able to accommodate you
                        or reschedule your appointment.
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
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Can I book appointments for family members or dependents?
                  </a>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#faq-details"
                >
                  <div class="accordion-body">
                    <div class="accordion-content">
                      <p>
                        Yes, in many cases, you can book appointments for family
                        members or dependents. However, you may need to provide
                        their personal information and consent to do so.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /FAQ Item -->
            </div>
          </div>
        </div>
      </div>
      <div class="bg-shapes">
        <img
          src="@/themes/doccure/assets/img/bg/article-bg.png"
          alt="image"
          class="img-fluid shape-1"
        />
      </div>
    </div>
  </div>
  <!-- /blog section -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexNineBlog from "@/themes/doccure/assets/json/indexnineblog.json";
import "vue3-carousel/dist/carousel.css";
export default {
  data() {
    return {
      IndexNineBlog: IndexNineBlog,
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
          itemsToShow: 3,
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
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
