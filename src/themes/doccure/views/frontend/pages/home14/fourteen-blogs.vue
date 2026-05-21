<template>
  <!-- Blog Section -->
  <section class="question-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header text-center aos" data-aos="fade-down">
            <h2>Frequently Asked <span>Questions</span></h2>
            <p>
              FAQs help provide important information to clients and address
              common queries they may have about the veterinary clinic's
              services, policies, and procedures.
            </p>
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-lg-5">
          <div class="faq-imgs aos" data-aos="fade-down">
            <img src="@/themes/doccure/assets/img/faq-img-3.png" class="img-fluid" alt="Img" />
          </div>
        </div>
        <div class="col-lg-7">
          <div class="accordion faq-info" id="faq-details">
            <!-- FAQ Item -->
            <div class="accordion-item aos" data-aos="fade-down">
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
            <div class="accordion-item aos" data-aos="fade-down">
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
            <div class="accordion-item aos" data-aos="fade-down">
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
                      contact the doctor as soon as possible to inform them and
                      to reschedule for another available time slot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /FAQ Item -->

            <!-- FAQ Item -->
            <div class="accordion-item aos" data-aos="fade-down">
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
                      doctor's office and inform them. Depending on their policy
                      and schedule, they may be able to accommodate you or
                      reschedule your appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /FAQ Item -->

            <!-- FAQ Item -->
            <div class="accordion-item aos" data-aos="fade-down">
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
      <div class="row">
        <div class="col-md-12">
          <div class="dentist-blog aos" data-aos="fade-down">
            <div class="section-header text-center">
              <h2>Doccure <span>Recent Blogs</span></h2>
              <p>Checkout our Latest blogs by our Experts by Month on Month</p>
            </div>
            <div class="dentist-slider owl-carousel">
              <Carousel
                :wrap-around="true"
                :settings="settings"
                :breakpoints="breakpoints"
              >
                <Slide v-for="item in FourteenBlogs" :key="item.id">
                  <div class="blog grid-blog">
                    <div class="blog-image">
                      <router-link to="blog-details"
                        ><img
                          class="img-fluid"
                          :src="require(`@/themes/doccure/assets/img/blog/${item.Image}`)"
                          alt="Post Image"
                      /></router-link>
                      <span class="day-badge"
                        ><i class="feather-calendar"></i>{{item.AppointmentDate}}</span
                      >
                    </div>
                    <div class="blog-content text-start">
                      <ul class="entry-meta meta-item">
                        <li>
                          <div class="post-author">
                            <router-link to="doctor-profile"
                              ><img
                                :src="require(`@/themes/doccure/assets/img/doctors/${item.Avatar}`)"
                                alt="Post Author"
                              />
                              <span>{{item.Name}}</span></router-link
                            >
                          </div>
                        </li>
                      </ul>
                      <h3 class="blog-title">
                        <router-link to="blog-details"
                          >{{item.Title}}</router-link
                        >
                      </h3>
                      <p>
                        {{item.Content}}
                      </p>
                      <router-link to="blog-details" class="view-link"
                        >Continue Reading<i
                          class="fa-solid fa-chevron-right"
                        ></i
                      ></router-link>
                    </div>
                  </div>
                </Slide>
                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>
            <div class="view-button text-center aos" data-aos="fade-down">
              <div class="owl-nav slide-nav blog-nav nav-control"></div>
            </div>
          </div>

          <div class="visit-wrap aos" data-aos="fade-down">
            <div class="visit-content">
              <div class="row justify-content-center">
                <div class="col-md-10">
                  <h2>Get 10% Off Your First Visit</h2>
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-9">
                    <p>With dental practices throughout the world, we are growing our clinic with just one goal in mind – to offer affordable, high quality dental care around the world.</p>
                  </div>
                </div>
              </div>
              <router-link to="/booking" class="btn btn-gray">Book an Appointment</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Blog Section -->
</template>

<script>
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import FourteenBlogs from "@/themes/doccure/assets/json/fourteen-blogs.json";
import "vue3-carousel/dist/carousel.css";

export default {
  data() {
    return {
        FourteenBlogs: FourteenBlogs,
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
          itemsToShow: 2,
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
};
</script>