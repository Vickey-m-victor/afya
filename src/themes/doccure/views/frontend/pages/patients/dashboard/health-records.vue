<template>
  <div class="col-xl-8 d-flex">
    <div class="dashboard-card w-100">
      <div class="dashboard-card-head">
        <div class="header-title">
          <h5>Health Records</h5>
        </div>
      </div>
      <div class="dashboard-card-body">
        <div class="row">
          <div class="col-sm-7">
            <div class="row">
              <div class="col-lg-6">
                <div class="health-records icon-orange">
                  <span><i class="fa-solid fa-heart"></i>Heart Rate</span>
                  <h3>140 Bpm <sup> 2%</sup></h3>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="health-records icon-amber">
                  <span><i class="fa-solid fa-temperature-high"></i>Body Temprature</span>
                  <h3>37.5 C</h3>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="health-records icon-dark-blue">
                  <span><i class="fa-solid fa-notes-medical"></i>Glucose Level</span>
                  <h3>70 - 90<sup> 6%</sup></h3>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="health-records icon-blue">
                  <span><i class="fa-solid fa-highlighter"></i>SPo2</span>
                  <h3>96%</h3>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="health-records icon-red">
                  <span><i class="fa-solid fa-syringe"></i>Blood Pressure</span>
                  <h3>100 mg/dl<sup> 2%</sup></h3>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="health-records icon-purple">
                  <span><i class="fa-solid fa-user-pen"></i>BMI </span>
                  <h3>20.1 kg/m2</h3>
                </div>
              </div>
              <div class="col-md-12">
                <div class="report-gen-date">
                  <p>
                    Report generated on last visit : 25 Mar 2024
                    <span><i class="fa-solid fa-copy"></i></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-5">
            <div class="chart-over-all-report">
              <h6>Overall Report</h6>
              <div class="circle-bar circle-bar3 report-chart">
                <div class="circle-graph3">
                  <circle-progress :percent="66" />
                  <p>Last visit 25 Mar 2024</p>
                </div>
              </div>
              <span class="health-percentage">Your health is 95% Normal</span>
              <router-link to="/medical-details" class="btn btn-dark w-100"
                >View Details<i class="fa-solid fa-chevron-right ms-2"></i
              ></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
export default {
  components: {
    CircleProgress,
  },
  data() {
    return {};
  },
  mounted() {
    const percent = ref(66);
    setInterval(() => {
      if (percent.value === 34) {
        percent.value = 66;
      } else {
        percent.value = 66;
      }
    }, 1000);
  },
};
</script>
