<template>
  <div
    class="tab-pane fade"
    id="pills-complete"
    role="tabpanel"
    aria-labelledby="pills-complete-tab"
  >
    <!-- Appointment List -->
    <div class="appointment-wrap" v-for="item in Patients_Cancelled" :key="item.id">
      <ul>
        <li>
          <div class="patinet-information">
            <router-link to="/patient-completed-appointment">
              <img
                :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)"
                alt="User Image"
              />
            </router-link>
            <div class="patient-info">
              <p>{{ item.Id }}</p>
              <h6>
                <router-link to="/patient-completed-appointment">{{
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
        <li>
          <a
            href="#"
            class="text-decoration-underline"
            data-bs-toggle="modal"
            data-bs-target="#add_review"
            >Add Review</a
          >
        </li>
        <li class="appointment-detail-btn d-flex align-items-center gap-3 flex-wrap">
          <router-link to="/map-grid" class="btn btn-md btn-dark"
            >Book Again<i class="isax isax-arrow-right-3 ms-1"></i
          ></router-link>
          <router-link
            to="/patient-completed-appointment"
            class="btn btn-md btn-primary-gradient"
            >View Details<i class="isax isax-arrow-right-3 ms-1"></i
          ></router-link>
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
