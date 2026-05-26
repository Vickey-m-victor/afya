<template>
  <div class="filter-head">
    <div class="position-relative daterange-wraper me-2">
      <div class="input-groupicon calender-input">
        <input
          type="text"
          class="form-control date-range bookingrange"
          ref="dateRangeInput"
          placeholder="From Date - To Date "
        />
      </div>
      <i class="isax isax-calendar-1"></i>
    </div>
    <div class="form-sorts dropdown" :class="{ 'table-filter-show': isFilterShown }">
      <a
        href="javascript:void(0);"
        class="dropdown-toggle"
        id="table-filter"
        @click="toggleFilter"
        ><i class="isax isax-filter me-2"></i>Filter By</a
      >
      <div class="filter-dropdown-menu">
        <div class="filter-set-view">
          <div class="accordion" id="accordionExample">
            <div class="filter-set-content">
              <div class="filter-set-content-head">
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  >Name<i class="fa-solid fa-chevron-right"></i
                ></a>
              </div>
              <div
                class="filter-set-contents accordion-collapse collapse show"
                id="collapseTwo"
                data-bs-parent="#accordionExample"
              >
                <ul>
                  <li>
                    <div class="input-block dash-search-input w-100">
                      <input type="text" class="form-control" placeholder="Search" />
                      <span class="search-icon"
                        ><i class="fa-solid fa-magnifying-glass"></i
                      ></span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="filter-set-content">
              <div class="filter-set-content-head">
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  >Appointment Type<i class="fa-solid fa-chevron-right"></i
                ></a>
              </div>
              <div
                class="filter-set-contents accordion-collapse collapse show"
                id="collapseOne"
                data-bs-parent="#accordionExample"
              >
                <ul>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" checked />
                        <span class="checkmarks"></span>
                        <span class="check-title">All Type</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Video Call</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Audio Call</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Chat</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Direct Visit</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="filter-set-content">
              <div class="filter-set-content-head">
                <a
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  >Visit Type<i class="fa-solid fa-chevron-right"></i
                ></a>
              </div>
              <div
                class="filter-set-contents accordion-collapse collapse show"
                id="collapseThree"
                data-bs-parent="#accordionExample"
              >
                <ul>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" checked />
                        <span class="checkmarks"></span>
                        <span class="check-title">All Visit</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">General</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Consultation</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Follow-up</span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="filter-checks">
                      <label class="checkboxs">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>
                        <span class="check-title">Direct Visit</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="filter-reset-btns">
            <router-link to="/appointments" class="btn btn-light">Reset</router-link>
            <router-link to="/appointments" class="btn btn-primary"
              >Filter Now</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "daterangepicker/daterangepicker.css";
import "daterangepicker/daterangepicker.js";
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import DateRangePicker from "daterangepicker";
export default {
  data() {
    return {
      isFilterShown: false,
    };
  },
  methods: {
    toggleFilter() {
      this.isFilterShown = !this.isFilterShown;
    },
  },
  setup() {
    const dateRangeInput = ref(null);

    // Move the function declaration outside of the onMounted callback
    function booking_range(start, end) {
      return start.format("M/D/YYYY") + " - " + end.format("M/D/YYYY");
    }

    onMounted(() => {
      if (dateRangeInput.value) {
        const start = moment().subtract(6, "days");
        const end = moment();

        new DateRangePicker(
          dateRangeInput.value,
          {
            startDate: start,
            endDate: end,
            ranges: {
              Today: [moment(), moment()],
              Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
              "Last 7 Days": [moment().subtract(6, "days"), moment()],
              "Last 30 Days": [moment().subtract(29, "days"), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")],
              "Last Month": [
                moment().subtract(1, "month").startOf("month"),
                moment().subtract(1, "month").endOf("month"),
              ],
            },
          },
          booking_range
        );

        booking_range(start, end);
      }
    });

    return {
      dateRangeInput,
    };
  },
};
</script>
