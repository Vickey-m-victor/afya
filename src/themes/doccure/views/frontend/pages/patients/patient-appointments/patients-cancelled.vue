<template>
  <div
    class="tab-pane fade"
    id="pills-cancel"
    role="tabpanel"
    aria-labelledby="pills-cancel-tab"
  >
    <!-- Appointment List -->
    <div class="appointment-wrap" v-for="item in Patients_Cancelled" :key="item.id">
      <ul>
        <li>
          <div class="patinet-information">
            <router-link to="/patient-cancelled-appointment">
              <img
                :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)"
                alt="User Image"
              />
            </router-link>
            <div class="patient-info">
              <p>{{ item.Id }}</p>
              <h6>
                <router-link to="/patient-cancelled-appointment">{{
                  item.Name
                }}</router-link
                ><span class="badge new-tag">{{ item.Experience }}</span>
              </h6>
            </div>
          </div>
        </li>
        <li class="appointment-info">
          <p><i class="isax isax-clock5"></i>{{ item.Date }}</p>
          <ul class="d-flex apponitment-types">
            <li>General Visit</li>
            <li>{{ item.Call }}</li>
          </ul>
        </li>
        <li class="mail-info-patient">
          <ul>
            <li><i class="isax isax-sms5"></i>{{ item.Email }}</li>
            <li><i class="isax isax-call5"></i>{{ item.Phone }}</li>
          </ul>
        </li>
        <li class="appointment-detail-btn">
          <router-link
            to="/patient-cancelled-appointment"
            class="btn btn-md btn-primary-gradient"
            ><i class="isax isax-calendar-tick5 me-1"></i>Reschedule</router-link
          >
        </li>
      </ul>
    </div>
    <!-- /Appointment List -->

    <!-- Pagination -->
    <div class="pagination dashboard-pagination">
      <ul>
        <li>
          <a href="#" class="page-link"><i class="fa-solid fa-chevron-left"></i></a>
        </li>
        <li>
          <a href="#" class="page-link">1</a>
        </li>
        <li>
          <a href="#" class="page-link active">2</a>
        </li>
        <li>
          <a href="#" class="page-link">3</a>
        </li>
        <li>
          <a href="#" class="page-link">4</a>
        </li>
        <li>
          <a href="#" class="page-link">...</a>
        </li>
        <li>
          <a href="#" class="page-link"><i class="fa-solid fa-chevron-right"></i></a>
        </li>
      </ul>
    </div>
    <!-- /Pagination -->
  </div>
</template>
<script>
import Patients_Cancelled from "@/themes/doccure/assets/json/patients-cancelled.json";
export default {
  data() {
    return {
      Patients_Cancelled: Patients_Cancelled,
    };
  },
};
</script>
