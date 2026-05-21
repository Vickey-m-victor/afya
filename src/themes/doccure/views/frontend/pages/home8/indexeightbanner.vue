<template>
  <!-- Home Banner -->
  <section class="banner-section-thirteen common-padding aos" data-aos="fade-down">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="banner-content aos" data-aos="fade-up">
            <span class="care-item">We specialize in Paediatric Care</span>
            <h1>A Safe Care for your children’s health</h1>
            <p>Supporting you to keep your child healthy with easy access to high-quality paediatric care.</p>
            <div class="banner-btns-fourteen ">
              <router-link to="/search" class="btn btn-primary ">Know More</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="banner-center-img d-flex justify-content-center">
            <img src="@/themes/doccure/assets/img/bg/home-13-banner-img.png" alt="Banner Image">
          </div>
        </div>
        <div class="col-lg-12">
          <div class="search-box-one search-box-thirteen aos" data-aos="fade-up">
            <div class="search-title">
              <h5>Book an Appointment</h5>
            </div>
            <form @submit.prevent="submitForm">
              <div class="search-input search-line-thirteen">
                <i class="isax isax-user"></i>
                <vue-select
                  :options="AnySel"
                  id="anysel"
                  placeholder="Choose any Service"
                />
              </div>
              <div class="search-input search-calendar-line-thirteen">
                <i class="isax isax-calendar-1"></i>
                <div class="mb-0">
                  <datepicker
                    v-model="startdate"
                    class="datetimepicker form-control"
                    :editable="true"
                    :clearable="false"
                    :input-format="dateFormat"
                  />
                </div>
              </div>
              <div class="search-input search-map-line-thirteen">
                <i class="isax isax-location"></i>
                <div class="mb-0">
                  <input type="text" class="form-control" placeholder="Location">
                  <a class="current-loc-icon current_location" href="javascript:void(0);">
                  </a>
                </div>
              </div>
              <div class="search-input search-users-line-thirteen">
                <i class="isax isax-profile-2user"></i>
                <vue-select
                  :options="PaedSel"
                  id="peadsel"
                  placeholder="Peadiatrician"
                />
              </div>
              <div class="form-search-btn">
                <button class="btn btn-primary" type="submit">See Availability<i
                    class="isax isax-arrow-right-3 ms-2"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-section-thirteen-bg">
      <div class="banner-section-thirteen-bg-one">
        <img src="@/themes/doccure/assets/img/bg/pluse-1.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-two">
        <img src="@/themes/doccure/assets/img/bg/pluse-2.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-three">
        <img src="@/themes/doccure/assets/img/bg/pluse-4.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-four">
        <img src="@/themes/doccure/assets/img/bg/pluse-3.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-five">
        <img src="@/themes/doccure/assets/img/bg/pluse-3.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-six">
        <img src="@/themes/doccure/assets/img/bg/pulse-6.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-seven">
        <img src="@/themes/doccure/assets/img/bg/gold-star.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-eight">
        <img src="@/themes/doccure/assets/img/bg/pink-star.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-nine">
        <img src="@/themes/doccure/assets/img/bg/pluse-3.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-ten">
        <img src="@/themes/doccure/assets/img/bg/pluse-3.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-eleven">
        <img src="@/themes/doccure/assets/img/bg/atom-bond.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-thirteen">
        <img src="@/themes/doccure/assets/img/bg/pluse-white.png" alt="Pluse">
      </div>
      <div class="banner-section-thirteen-bg-fifteen aos" data-aos="fade-left">
        <img src="@/themes/doccure/assets/img/bg/cloud-1.png" alt="Cloud">
      </div>
      <div class="banner-section-thirteen-bg-seventeen">
        <a href="javascript:void(0);">Trained Paediatric Doctors</a>
      </div>
      <div class="banner-section-thirteen-bg-eighteen">
        <a href="javascript:void(0);">New Born Care</a>
      </div>
      <div class="banner-section-thirteen-bg-ninteen">
        <a href="javascript:void(0);">Child Care Treatments</a>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      PaedSel: ["Paediatrician", "Obstetric"],
      AnySel: ["Choose any Service", "Blood Tests", "Diagnostic Tests"],
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
  methods: {
    submitForm() {
      this.$router.push("/search-2");
    },
  },
};
</script>
