<template>
    <!-- Home Banner -->
    <section class="banner-section banner-sec-one">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-7">
                    <div class="banner-content aos" data-aos="fade-up">
                        <div class="rating-appointment d-inline-flex align-items-center gap-2">
                            <div class="avatar-list-stacked avatar-group-lg">
                                <span class="avatar avatar-rounded">
                                    <img class="border border-white" src="@/themes/doccure/assets/img/doctors/doctor-thumb-22.jpg" alt="img">
                                </span>
                                <span class="avatar avatar-rounded">
                                    <img class="border border-white" src="@/themes/doccure/assets/img/doctors/doctor-thumb-23.jpg" alt="img">
                                </span>
                                <span class="avatar avatar-rounded">
                                    <img src="@/themes/doccure/assets/img/doctors/doctor-thumb-24.jpg" alt="img">
                                </span>
                            </div>
                            <div class="me-2">
                                <h6 class="mb-1">5K+ Appointments</h6>
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center">
                                        <i class="fa-solid fa-star text-orange me-1"></i>
                                        <i class="fa-solid fa-star text-orange me-1"></i>
                                        <i class="fa-solid fa-star text-orange me-1"></i>
                                        <i class="fa-solid fa-star text-orange me-1"></i>
                                        <i class="fa-solid fa-star text-orange me-1"></i>
                                    </div>
                                    <p>5.0 Ratings</p>
                                </div>
                            </div>
                        </div>
                        <h1 class="display-5">Discover Health: Find Your Trusted <span class="banner-icon"><img src="@/themes/doccure/assets/img/icons/video.svg" alt="img"></span> <span class="text-gradient">Doctors</span> Today</h1>
                        <div class="search-box-one aos" data-aos="fade-up">
                            <form @submit.prevent="submitForm"> 
                                <div class="search-input search-line">
                                    <i class="isax isax-hospital5 bficon"></i>
                                    <div class=" mb-0">
                                        <input type="text" class="form-control" placeholder="Search doctors, clinics, hospitals, etc">
                                    </div>
                                </div>
                                <div class="search-input search-map-line">
                                    <i class="isax isax-location5"></i>
                                    <div class=" mb-0">
                                        <input type="text" class="form-control" placeholder="Location"> 
                                    </div>
                                </div>
                                <div class="search-input search-calendar-line">
                                    <i class="isax isax-calendar-tick5"></i>
                                    <div class=" mb-0">
                                        <datepicker
                                            v-model="startdate"
                                            placeholder="Date"
                                            class="form-control datetimepicker"
                                            :editable="true"
                                            :clearable="false"
                                        />
                                    </div>
                                </div>
                                <div class="form-search-btn">
                                    <button class="btn btn-primary" type="submit"><i class="isax isax-search-normal5 me-2"></i>Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="banner-img aos" data-aos="fade-up">
                        <img src="@/themes/doccure/assets/img/banner/banner-doctor.svg" class="img-fluid" alt="patient-image">
                        <div class="banner-appointment">
                            <h6>1K</h6>
                            <p>Appointments <span class="d-block">Completed</span></p>
                        </div>
                        <div class="banner-patient">
                            <div class="avatar-list-stacked avatar-group-sm">
                                <span class="avatar avatar-rounded">
                                    <img src="@/themes/doccure/assets/img/patients/patient19.jpg" alt="img">
                                </span>
                                <span class="avatar avatar-rounded">
                                    <img  src="@/themes/doccure/assets/img/patients/patient16.jpg" alt="img">
                                </span>
                                <span class="avatar avatar-rounded">
                                    <img src="@/themes/doccure/assets/img/patients/patient18.jpg" alt="img">
                                </span>
                            </div>
                            <p>15K+</p>
                            <p>Satisfied Patients</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner-bg">
            <img src="@/themes/doccure/assets/img/bg/banner-bg-02.png" alt="img" class="banner-bg-01">
            <img src="@/themes/doccure/assets/img/bg/banner-bg-03.png" alt="img" class="banner-bg-02">
            <img src="@/themes/doccure/assets/img/bg/banner-bg-04.png" alt="img" class="banner-bg-03">
            <img src="@/themes/doccure/assets/img/bg/banner-bg-05.png" alt="img" class="banner-bg-04">
            <img src="@/themes/doccure/assets/img/bg/banner-icon-01.svg" alt="img" class="banner-bg-05">
            <img src="@/themes/doccure/assets/img/bg/banner-icon-01.svg" alt="img" class="banner-bg-06">
        </div>
    </section>
    <!-- /Home Banner -->

    <!-- List -->
    <div class="list-section">
        <div class="container">
            <div class="list-card card mb-0">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-center justify-content-xl-between flex-wrap gap-4 list-wraps">
                        <router-link to="/booking" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-secondary">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-01.svg" alt="img">
                            </div>
                            <h6>Book Appointment</h6>
                        </router-link>
                        <router-link to="/doctor-grid" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-primary">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-02.svg" alt="img">
                            </div>
                            <h6>Talk to Doctors</h6>
                        </router-link>
                        <router-link to="/hospitals" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-pink">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-03.svg" alt="img">
                            </div>
                            <h6>Hospitals & Clinics</h6>
                        </router-link>
                        <router-link to="/index-3" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-cyan">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-04.svg" alt="img">
                            </div>
                            <h6>Healthcare</h6>
                        </router-link>
                        <router-link to="/index-13" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-purple">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-05.svg" alt="img">
                            </div>
                            <h6>Medicine & Supplies</h6>
                        </router-link>
                        <router-link to="/index-12" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-orange">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-06.svg" alt="img">
                            </div>
                            <h6>Lab Testing</h6>
                        </router-link>
                        <router-link to="/index-13" class="list-item aos" data-aos="fade-up">
                            <div class="list-icon bg-teal">
                                <img src="@/themes/doccure/assets/img/icons/list-icon-07.svg" alt="img">
                            </div>
                            <h6>Home Care</h6>
                        </router-link>
                    </div>
                </div>		
            </div>
        </div>
    </div>
    <!-- /List -->
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

import { ref } from "vue";
const currentDate = ref(new Date());
export default {
    data() {
        return {
            startdate: currentDate,
        }
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
}
</script>
