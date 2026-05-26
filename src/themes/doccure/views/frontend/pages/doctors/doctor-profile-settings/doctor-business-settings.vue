<template>
  <div class="main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>
          <div class="col-lg-8 col-xl-9">
            <!-- Profile Settings -->
            <div class="dashboard-header">
              <h3>Profile Settings</h3>
            </div>

            <!-- Settings List -->
            <settings-tabs></settings-tabs>
            <!-- /Settings List -->

            <div class="dashboard-header border-0 mb-0">
              <h3>Business Hours</h3>
            </div>

            <form @submit.prevent="submitForm">
              <div class="business-wrap">
                <h4>Select Business days</h4>
                <ul class="business-nav">
                  <li v-for="(day, index) in days" :key="index">
                    <a class="tab-link" :class="{ active: isSelected(day) }" @click="selectDay(day)"
                      :data-tab="'day-' + day.toLowerCase()">
                      {{ day }}
                    </a>
                  </li>
                </ul>
              </div>

              <div class="accordions business-info" id="list-accord">
                <div v-for="(day, index) in days" :key="index" class="user-accordion-item tab-items"
                  :class="{ active: selectedDay === day }" :id="'day-' + day.toLowerCase()">
                  <!-- Content for each day goes here -->
                  <div class="accordion-wrap" data-bs-toggle="collapse" :data-bs-target="'#' + day.toLowerCase()">
                    {{ day }} <span class="edit">Edit</span>
                  </div>
                  <div :class="[
                    'accordion-collapse',
                    { collapse: day !== 'Monday', show: day === 'Monday' },
                  ]" :id="day.toLowerCase()" data-bs-parent="#list-accord">
                    <div class="content-collapse pb-0">
                      <div class="row align-items-center">
                        <div class="col-md-6">
                          <div class="form-wrap">
                            <label class="col-form-label">From <span class="text-danger">*</span></label>
                            <div class="form-icon">
                              <input type="text" class="form-control timepicker1" />
                              <span class="icon"><i class="fa-solid fa-clock"></i></span>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-wrap">
                            <label class="col-form-label">To <span class="text-danger">*</span></label>
                            <div class="form-icon">
                              <input type="text" class="form-control timepicker1" />
                              <span class="icon"><i class="fa-solid fa-clock"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-btn text-end">
                <a href="#" class="btn btn-gray">Cancel</a>
                <button type="submit" class="btn btn-primary prime-btn">
                  Save Changes
                </button>
              </div>
            </form>
            <!-- /Profile Settings -->
          </div>
        </div>
      </div>
    </div>
    <doctor-footer></doctor-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Doctor Profile",
      text: "Home",
      text1: "Doctor Profile",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectedDay: "Monday",
    };
  },
  mounted() {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabItems = document.querySelectorAll(".user-accordion-item");

    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener("click", (event) => {
        event.preventDefault();
        const tabId = tabLink.getAttribute("data-tab");

        tabLinks.forEach((link) => {
          link.classList.remove("active");
        });
        tabLink.classList.add("active");

        tabItems.forEach((item) => {
          item.classList.remove("active");
          if (item.id === tabId) {
            item.classList.add("active");
          }
        });
      });
    });
  },
  methods: {
    selectDay(day) {
      this.selectedDay = day;
    },
    isSelected(day) {
      return (
        this.selectedDay === day ||
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(day)
      );
    },
    submitForm() {
      this.$router.push("/doctor-business-settings");
    },
  },  
};
</script>
