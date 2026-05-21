<template>
  <section class="banner-section banner-sec-fourteen">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div
            class="banner-content aos aos-init aos-animate"
            data-aos="fade-up"
          >
            <div class="banner-head">
              <h6>Let’s Take Care</h6>
              <h1>Home Care Services in Your Area</h1>
              <p>Book an expert caregiver that you can trust. To get started</p>
            </div>
            <div class="banner-form-field">
              <form @submit.prevent="submitForm">
                <div class="input-box">
                  <div class="input-block">
                    <div class="icon-badge">
                      <span><i class="feather-map-pin"></i></span>
                    </div>
                    <div class="banner-input-box">
                      <label class="form-label">Location</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Newyork, United States"
                      />
                    </div>
                  </div>
                  <div class="input-block">
                    <div class="icon-badge">
                      <span><i class="fa-solid fa-users-gear"></i></span>
                    </div>
                    <div class="banner-input-box">
                      <label class="form-label">Services</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Services"
                      />
                    </div>
                  </div>
                  <div class="input-btn">
                    <button type="submit" class="btn">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="watch-video">
              <a href="#">
                <span><i class="fa-solid fa-circle-play"></i></span>
                Watch Video About Us
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="banner-sec-img">
            <span
              ><img
                src="@/themes/doccure/assets/img/banner-img-13.png"
                class="img-fluid"
                alt="Img"
            /></span>
            <span
              class="banner-curve aos aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="500"
              ><img
                src="@/themes/doccure/assets/img/banner-img-curve-13.png"
                class="img-fluid"
                alt="Img"
            /></span>
            <span class="banner-round-bg"
              ><img src="@/themes/doccure/assets/img/banner-round-vector-13.png" alt="Img"
            /></span>
            <span class="lief-img"
              ><img src="@/themes/doccure/assets/img/banner-lief-img.png" alt="Img"
            /></span>
            <span class="banner-curve-two"
              ><img src="@/themes/doccure/assets/img/banner-curve-bg.png" alt="Img"
            /></span>
            <span class="chat-call-btn"
              ><router-link to="/chat-doctor">Chat and Call Now</router-link></span
            >
            <div class="banner-cal-icon">
              <span class="calender-border"
                ><img src="@/themes/doccure/assets/img/icons/banner-cal-icon.svg" alt="Img"
              /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    submitForm() {
      this.$router.push("/index-13");
    },
  },
};
</script>
