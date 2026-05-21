<template>
  <div class="main-wrapper">
    <layoutheader></layoutheader>
    <breadcrumb :title="title" :text="text" />
    <div class="content doctor-content">
      <div class="container">
        <!-- Hospital Tabs -->
        <nav class="settings-tab hospital-tab">
          <ul class="nav nav-tabs-bottom justify-content-center" role="tablist">
            <li class="nav-item" role="presentation">
              <router-link class="nav-link active" to="/hospitals">Hospitals</router-link>
            </li>
            <li class="nav-item" role="presentation">
              <router-link class="nav-link" to="/speciality">Specialities</router-link>
            </li>
            <li class="nav-item" role="presentation">
              <router-link class="nav-link" to="/clinic">Clinics</router-link>
            </li>
          </ul>
        </nav>
        <!-- /Hospital Tabs -->

        <!-- Show Result -->
        <div class="card">
          <div class="card-body">
            <div
              class="d-flex align-items-center justify-content-between flex-wrap result-wrap gap-3"
            >
              <h5>Showing <span class="text-secondary">450</span> Hospitals For You</h5>
              <div class="d-flex align-items-center flex-wrap gap-3">
                <vue-select
                  :options="UnitHots"
                  id="unithots"
                  placeholder="United States Of America (USA)"
                />

                <div class="input-block dash-search-input">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Hospitals"
                  />
                  <span class="search-icon"><i class="isax isax-search-normal"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Show Result -->

        <div class="d-flex align-items-center flex-wrap hospital-form">
          <div class="form-check d-flex align-items-center">
            <input
              class="form-check-input mt-0"
              type="radio"
              name="Radio"
              id="all-hospital"
              value="all-hospital"
              v-model="selectedRadio"
            />
            <label class="form-check-label fs-14 fw-medium ms-2" for="all-hospital">
              All Hospitals
            </label>
          </div>
          <div class="form-check d-flex align-items-center">
            <input
              class="form-check-input mt-0"
              type="radio"
              name="Radio"
              id="virtual"
              value="virtual"
              v-model="selectedRadio"
            />
            <label class="form-check-label fs-14 fw-medium ms-2" for="virtual">
              Virtual
            </label>
          </div>
          <div class="form-check d-flex align-items-center">
            <input
              class="form-check-input mt-0"
              type="radio"
              name="Radio"
              id="appointment"
              value="appointment"
              v-model="selectedRadio"
            />
            <label class="form-check-label fs-14 fw-medium ms-2" for="appointment">
              Appointments
            </label>
          </div>
          <div class="form-check d-flex align-items-center">
            <input
              class="form-check-input mt-0"
              type="radio"
              name="Radio"
              id="clinic"
              value="clinic"
              v-model="selectedRadio"
            />
            <label class="form-check-label fs-14 fw-medium ms-2" for="clinic">
              Hospitals / Clinics
            </label>
          </div>
        </div>

        <!-- All Hospitals -->
        <div
          :style="{ display: selectedRadio === 'all-hospital' ? 'block' : 'none' }"
          class="all-hospital"
        >
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <a href="javascript:void(0);" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-01.svg" alt="img" />
                  </a>
                  <h6 class="mb-1"><a href="javascript:void(0);">Cleveland Clinic</a></h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Minneapolis, MN
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-02.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid"> Apollo Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Philadelphia, PA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-03.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Asian Institute</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Piscataway, NJ
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-04.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Manipal North Side</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Albuquerque, NM
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-05.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Johns Hopkins Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Roswell, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-06.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Athol Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Chesterfield, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-07.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Austen Riggs Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Atlanta, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-08.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baldpate Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Burbank, CA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-09.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baystate Noble Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Lena, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-10.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Berkshire Medical Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Saginaw, MI
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-11.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Beverly Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Westchester, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-12.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Good Health City Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Santa Fe Springs, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="loader-item text-center">
            <a href="#" class="btn btn-primary d-inline-flex align-items-center">
              <i class="isax isax-d-cube-scan me-2"></i>Load More 425 Hospitals
            </a>
          </div>
        </div>
        <!-- /All Hospitals -->

        <!-- Virtual Hospitals -->
        <div
          :style="{ display: selectedRadio === 'virtual' ? 'block' : 'none' }"
          class="virtual-hospital"
        >
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-02.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid"> Apollo Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Philadelphia, PA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-01.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Cleveland Clinic</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Minneapolis, MN
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-04.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Manipal North Side</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Albuquerque, NM
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-03.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Asian Institute</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Piscataway, NJ
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-06.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Athol Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Chesterfield, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-05.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Johns Hopkins Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Roswell, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-07.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Austen Riggs Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Atlanta, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-08.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baldpate Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Burbank, CA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-10.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Berkshire Medical Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Saginaw, MI
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-11.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Beverly Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Westchester, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-09.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baystate Noble Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Lena, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-12.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Good Health City Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Santa Fe Springs, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="loader-item text-center">
            <a href="#" class="btn btn-primary d-inline-flex align-items-center">
              <i class="isax isax-d-cube-scan me-2"></i>Load More 425 Hospitals
            </a>
          </div>
        </div>
        <!-- /Virtual Hospitals -->

        <!-- Appointment Hospitals -->
        <div
          :style="{ display: selectedRadio === 'appointment' ? 'block' : 'none' }"
          class="appointment-hospital"
        >
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-03.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Asian Institute</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Piscataway, NJ
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-02.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid"> Apollo Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Philadelphia, PA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-04.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Manipal North Side</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Albuquerque, NM
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-05.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Johns Hopkins Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Roswell, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-01.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Cleveland Clinic</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Minneapolis, MN
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-07.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Austen Riggs Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Atlanta, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-08.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baldpate Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Burbank, CA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-09.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baystate Noble Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Lena, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-06.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Athol Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Chesterfield, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-10.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Berkshire Medical Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Saginaw, MI
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-11.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Beverly Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Westchester, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-12.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Good Health City Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Santa Fe Springs, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="loader-item text-center">
            <a href="#" class="btn btn-primary d-inline-flex align-items-center">
              <i class="isax isax-d-cube-scan me-2"></i>Load More 425 Hospitals
            </a>
          </div>
        </div>
        <!-- /Appointment Hospitals -->

        <!-- All Hospitals -->
        <div
          :style="{ display: selectedRadio === 'clinic' ? 'block' : 'none' }"
          class="all-clinic"
        >
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-05.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Johns Hopkins Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Roswell, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-01.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Cleveland Clinic</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Minneapolis, MN
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-06.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Athol Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Chesterfield, IL
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-07.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Austen Riggs Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Atlanta, GA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <div class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-08.svg" alt="img" />
                  </div>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Baldpate Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Burbank, CA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-10.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Berkshire Medical Center</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Saginaw, MI
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-12.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Good Health City Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Santa Fe Springs, CA
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="card hospital-item">
                <div class="card-body text-center">
                  <router-link to="/doctor-grid" class="hospital-icon">
                    <img src="@/themes/doccure/assets/img/hospitals/hospital-11.svg" alt="img" />
                  </router-link>
                  <h6 class="mb-1">
                    <router-link to="/doctor-grid">Beverly Hospital</router-link>
                  </h6>
                  <p class="fs-14 mb-0">
                    <i class="isax isax-location me-2"></i>Westchester, IL
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="loader-item text-center">
            <a href="#" class="btn btn-primary d-inline-flex align-items-center">
              <i class="isax isax-d-cube-scan me-2"></i>Load More 425 Hospitals
            </a>
          </div>
        </div>
        <!-- /All Hospitals -->
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedRadio: "all-hospital",
      UnitHots: ["United States Of America (USA)", "United Kingdom (UK)"],
      title: "Hospitals",
      text: "Hospitals",
    };
  },
};
</script>
