<template>
  <!-- Work Section -->
  <section class="work-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-12 work-img-info aos" data-aos="fade-up">
          <div class="work-img">
            <img src="@/themes/doccure/assets/img/work-img.png" class="img-fluid" alt="doctor-image">
          </div>
        </div>
        <div class="col-lg-8 col-md-12 work-details">
          <div class="section-header-one aos" data-aos="fade-up">
            <h5>How it Works</h5>
            <h2 class="section-title">4 easy steps to get your solution</h2>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 aos" data-aos="fade-up">
              <div class="work-info">
                <div class="work-icon">
                  <span><img src="@/themes/doccure/assets/img/icons/work-01.svg" alt="search-doctor-icon"></span>
                </div>
                <div class="work-content">
                  <h5>Search Doctor</h5>
                  <p>Search for a doctor based on specialization, location, or availability. </p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 aos" data-aos="fade-up">
              <div class="work-info">
                <div class="work-icon">
                  <span><img src="@/themes/doccure/assets/img/icons/work-02.svg" alt="doctor-profile-icon"></span>
                </div>
                <div class="work-content">
                  <h5>Check Doctor Profile</h5>
                  <p>Explore detailed doctor profiles on our platform to make informed healthcare decisions.</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 aos" data-aos="fade-up">
              <div class="work-info">
                <div class="work-icon">
                  <span><img src="@/themes/doccure/assets/img/icons/work-03.svg" alt="calendar-icon"></span>
                </div>
                <div class="work-content">
                  <h5>Schedule Appointment</h5>
                  <p>After choose your preferred doctor, select a convenient time slot, & confirm your appointment.</p>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 aos" data-aos="fade-up">
              <div class="work-info">
                <div class="work-icon">
                  <span><img src="@/themes/doccure/assets/img/icons/work-04.svg" alt="solution-icon"></span>
                </div>
                <div class="work-content">
                  <h5>Get Your Solution</h5>
                  <p>Discuss your health concerns with the doctor and receive personalized advice & solution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Work Section -->

  <!-- Articles Section -->
  <section class="articles-section">
    <div class="container">
      <div class="row">
        <div class="col-md-12 aos" data-aos="fade-up">
          <div class="section-header-one text-center">
            <h2 class="section-title">Latest Articles</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-6 col-md-6 d-flex aos"
          data-aos="fade-up"
          v-for="item in IndexArticles"
          :key="item.id"
        >
          <div class="articles-grid w-100">
            <div class="articles-info">
              <div class="articles-left">
                <router-link to="/blog-details">
                  <div class="articles-img">
                    <img
                      :src="require(`@/themes/doccure/assets/img/blog/${item.Image}`)"
                      class="img-fluid"
                      alt="Image"
                    />
                  </div>
                </router-link>
              </div>
              <div class="articles-right">
                <div class="articles-content">
                  <ul class="articles-list nav">
                    <li><i class="feather-user"></i> {{ item.Name }}</li>
                    <li><i class="feather-calendar"></i> {{ item.Day }}</li>
                  </ul>
                  <h4>
                    <router-link to="/blog-details">{{ item.Title }}</router-link>
                  </h4>
                  <p>{{ item.Content }}</p>
                  <router-link to="/blog-details" class="btn btn-md btn-outline-primary">Read More</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Articles Section -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import IndexArticles from "@/themes/doccure/assets/json/indexarticles.json";
export default {
  data() {
    return {
      IndexArticles: IndexArticles,
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
