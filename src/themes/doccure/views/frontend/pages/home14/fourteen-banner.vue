<template>
  <!-- Home Banner -->
  <section class="banner-section banner-sec-fourteen dentist-banner-sec">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="banner-content">
            <div class="banner-head">
              <h1>We Care about Your <span> Dental Health</span></h1>
              <p>
                If you are in need of high-quality, professional and friendly dental care,
                look no further than our clinic.
              </p>
            </div>
            <div class="dentist-banner-btn">
              <ul>
                <li>
                  <a href="#" class="btn btn-check"
                    ><i class="fa fa-plus-circle me-2"></i>Free Check-up</a
                  >
                </li>
                <li>
                  <a href="#" class="btn btn-primary"
                    ><i class="fa fa-mobile me-2"></i>Contact Us</a
                  >
                </li>
              </ul>
            </div>

            <div class="search-box-fourteen">
              <form @submit.prevent="submitForm" class="form-block d-flex">
                <div class="search-input">
                  <div class="forms-block">
                    <label class="mb-0">Date</label>
                    <datepicker
                      v-model="startdate"
                      class="form-control datetimepicker"
                      :editable="true"
                      :input-format="dateFormat"
                      placeholder="Select Date"
                      :clearable="false"
                    />
                  </div>
                </div>
                <div class="search-input">
                  <div class="forms-block mb-0">
                    <label class="location-icon">Location</label>
                    <div
                      class="searchinputs dropdown-toggle"
                      id="dropdownMenuClickable"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="false"
                    >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="San Diego Branch"
                      />
                    </div>
                    <div
                      class="dropdown-menu location-dropdown"
                      aria-labelledby="dropdownMenuClickable"
                    >
                      <ul class="location-auto-complete">
                        <li>
                          <a href="#">
                            <span><i class="fa-solid fa-hospital"></i></span>
                            CompassionCare Health Clinic
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span><i class="fa-solid fa-hospital"></i></span>
                            Caring Touch Wellness Center
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span><i class="fa-solid fa-hospital"></i></span>
                            Comfort Haven Clinic
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span><i class="fa-solid fa-hospital"></i></span>
                            Compassionate Caregivers Clinic
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span><i class="fa-solid fa-hospital"></i></span>
                            Core Health & Wellness Center
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span><i class="fa-solid fa-hospital"></i></span>
                            Cityscape Medical Center
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="search-btn">
                  <button class="btn btn-primary" type="submit">Book Appointment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Home Banner -->
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/booking-2");
    },
  },
};
</script>
