<template>
  <!-- Patient About us -->
  <section class="about-us-section-fifteen">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-fifteen text-center">
            <h2>Our <span>Patients Says</span></h2>
            <p>What our Patients say about us</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="aboutus-img-main">
            <img
              src="@/themes/doccure/assets/img/aboutus-fift-1.jpg"
              alt="image"
              class="img-fluid"
            />
            <div class="aboutus-img-one">
              <img src="@/themes/doccure/assets/img/icons/aboutus-icon1.svg" alt="Icon" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 position-relative">
          <div class="swiper-container vertical-slider">
            <div class="swiper-wrapper" style="height: 456.8px">
              <div
                class="swiper-slide"
                v-for="item in indextenpatient"
                :key="item.id"
              >
                <div class="aboutus-fifteen-main">
                  <div class="aboutus-profile-left">
                    <div class="aboutus-image">
                      <img
                        :src="require(`@/themes/doccure/assets/img/clients/${item.imageSrc}`)"
                        alt="Client"
                        class="img-fluid"
                      />
                    </div>
                    <div class="aboutus-contents">
                      <h6>{{ item.name }}</h6>
                      <span>{{ item.location }}</span>
                    </div>
                  </div>
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Patient About us -->
  <!-- Frequent section -->
  <section class="frequently-section-fifteen">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-header-fifteen text-center">
            <h2>Frequently <span>Asked Questions</span></h2>
            <p>What our clients say about us</p>
          </div>
        </div>
      </div>
      <div class="faq-main-cards" id="accordionExample">
        <div class="faq-card aos" data-aos="fade-up">
          <div class="faq-title">
            <a data-bs-toggle="collapse" href="#faqOne" aria-expanded="false">
              <span>How do I book an appointment with a doctor?</span>
            </a>
            <div
              id="faqOne"
              class="card-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <p>
                Yes, simply visit our website and log in or create an account.
                Search for a doctor based on specialization, location, or
                availability & confirm your booking.
              </p>
            </div>
          </div>
        </div>
        <div class="faq-card aos" data-aos="fade-up">
          <div class="faq-title">
            <a
              class="collapsed"
              data-bs-toggle="collapse"
              href="#faqtwo"
              aria-expanded="false"
            >
              <span
                >Can I request a specific doctor when booking my
                appointment?</span
              >
            </a>
            <div
              id="faqtwo"
              class="card-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <p>
                Yes, you can usually request a specific doctor when booking your
                appointment, though availability may vary based on their
                schedule.
              </p>
            </div>
          </div>
        </div>
        <div class="faq-card aos" data-aos="fade-up">
          <div class="faq-title">
            <a
              class="collapsed"
              data-bs-toggle="collapse"
              href="#faqthree"
              aria-expanded="false"
            >
              <span
                >What should I do if I need to cancel or reschedule my
                appointment?</span
              >
            </a>
            <div
              id="faqthree"
              class="card-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <p>
                If you need to cancel or reschedule your appointment, contact
                the doctor as soon as possible to inform them and to reschedule
                for another available time slot.
              </p>
            </div>
          </div>
        </div>
        <div class="faq-card aos" data-aos="fade-up">
          <div class="faq-title">
            <a
              class="collapsed"
              data-bs-toggle="collapse"
              href="#faqfour"
              aria-expanded="false"
            >
              <span>What if I'm running late for my appointment?</span>
            </a>
            <div
              id="faqfour"
              class="card-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <p>
                If you know you will be late, it's courteous to call the
                doctor's office and inform them. Depending on their policy and
                schedule, they may be able to accommodate you or reschedule your
                appointment.
              </p>
            </div>
          </div>
        </div>
        <div class="faq-card aos" data-aos="fade-up">
          <div class="faq-title">
            <a
              class="collapsed"
              data-bs-toggle="collapse"
              href="#faqfive"
              aria-expanded="false"
            >
              <span
                >Can I book appointments for family members or dependents?</span
              >
            </a>
            <div
              id="faqfive"
              class="card-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <p>
                Yes, in many cases, you can book appointments for family members
                or dependents. However, you may need to provide their personal
                information and consent to do so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Frequent section -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import indextenpatient from "@/themes/doccure/assets/json/indextenpatient.json";
import indextenfrequently from "@/themes/doccure/assets/json/indextenfrequently.json";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  data() {
    return {
      indextenpatient: indextenpatient,
      indextenfrequently: indextenfrequently,
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
        // 700px and up
        991: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 2.99,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
    const swiper = new Swiper(".vertical-slider", {
      loop: true,
      direction: "vertical",
      slidesPerView: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};
</script>
