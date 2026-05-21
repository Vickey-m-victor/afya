<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar overflow-visible">
      <div class="container">
        <div class="row align-items-center inner-banner">
          <div class="col-md-12 col-12 text-center">
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/index"><i class="isax isax-home-15"></i></router-link>
                </li>
                <li class="breadcrumb-item">Doctor</li>
                <li class="breadcrumb-item active">Doctor Grid Full Width</li>
              </ol>
              <h2 class="breadcrumb-title">Doctor Grid Full Width</h2>
            </nav>
          </div>
        </div>
        <div class="bg-primary-gradient rounded-pill doctors-search-box">
          <div class="search-box-one rounded-pill">
            <form action="#">
              <div class="search-input search-line">
                <i class="isax isax-hospital5 bficon"></i>
                <div class="mb-0">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search for Doctors, Hospitals, Clinics"
                  />
                </div>
              </div>
              <div class="search-input search-map-line">
                <i class="isax isax-location5"></i>
                <div class="mb-0">
                  <input type="text" class="form-control" placeholder="Location" />
                </div>
              </div>
              <div class="search-input search-calendar-line">
                <i class="isax isax-calendar-tick5"></i>
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
              <div class="form-search-btn">
                <button
                  class="btn btn-primary d-inline-flex align-items-center rounded-pill"
                  type="submit"
                >
                  <i class="isax isax-search-normal-15 me-2"></i>Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="breadcrumb-bg">
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-bg-01.png"
          alt="img"
          class="breadcrumb-bg-01"
        />
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-bg-02.png"
          alt="img"
          class="breadcrumb-bg-02"
        />
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-icon.png"
          alt="img"
          class="breadcrumb-bg-03"
        />
        <img
          src="@/themes/doccure/assets/img/bg/breadcrumb-icon.png"
          alt="img"
          class="breadcrumb-bg-04"
        />
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="content mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-4">
              <h3>Showing <span class="text-secondary">450</span> Doctors For You</h3>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-center justify-content-end mb-4">
              <div class="doctor-filter-availability me-3">
                <p>Availability</p>
                <div class="status-toggle status-tog">
                  <input type="checkbox" id="status_6" class="check" />
                  <label for="status_6" class="checktoggle">checkbox</label>
                </div>
              </div>
              <a
                href="javascript:void(0);"
                class="btn btn-sm head-icon me-3"
                id="filter_search"
                ><i class="isax isax-sort"></i
              ></a>
              <div class="dropdown header-dropdown">
                <a
                  class="dropdown-toggle sort-dropdown"
                  data-bs-toggle="dropdown"
                  href="javascript:void(0);"
                  aria-expanded="false"
                >
                  <span>Sort By</span>Price (Low to High)
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                  <a href="javascript:void(0);" class="dropdown-item">
                    Price (Low to High)
                  </a>
                  <a href="javascript:void(0);" class="dropdown-item">
                    Price (High to Low)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="filter_inputs">
          <div class="row align-items-center gy-3">
            <div class="col-lg-9 mb-4">
              <div class="row gx-3">
                <div class="col-md col-sm-4 col-6">
                  <div>
                    <vue-select
                      :options="Psychiatry"
                      id="psychiatry"
                      placeholder="Specialities"
                    />
                  </div>
                </div>
                <div class="col-md col-sm-4 col-6">
                  <div>
                    <vue-select :options="Hostp" id="hostp" placeholder="Select" />
                  </div>
                </div>
                <div class="col-md col-sm-4 col-6">
                  <div>
                    <vue-select :options="DoctoMn" id="doctomn" placeholder="Doctors" />
                  </div>
                </div>
                <div class="col-md col-sm-4 col-6">
                  <div>
                    <vue-select :options="StatPai" id="statpai" placeholder="Reviews" />
                  </div>
                </div>
                <div class="col-md col-sm-4 col-6">
                  <div>
                    <vue-select
                      :options="DentalSel"
                      id="dentalsel"
                      placeholder="Clinic"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 mb-4">
              <div class="text-end">
                <a href="#" class="fw-medium text-secondary text-decoration-underline"
                  >Clear All</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-01.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>5.0</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-indigo fw-medium fs-14">Psychologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Michael Brown</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Minneapolis, MN
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$650</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-02.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.6</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-pink fw-medium fs-14">Pediatrician</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Nicholas Tello</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Ogden, IA
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">60 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$400</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-03.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.8</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-teal align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-teal fw-medium fs-14">Neurologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Harold Bryant</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Winona, MS
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$500</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-04.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.8</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-info align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-info fw-medium fs-14">Cardiologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Sandra Jones</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Beckley, WV
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$550</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-05.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.2</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-teal align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-teal fw-medium fs-14">Neurologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Charles Scott</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Hamshire, TX
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$600</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-06.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.2</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-info align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-info fw-medium fs-14">Cardiologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Robert Thomas</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Oakland, CA
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$450</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-07.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.7</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-indigo align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-indigo fw-medium fs-14">Psychologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Margaret Koller</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Killeen, TX
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$450</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-08.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.7</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-pink fw-medium fs-14">Pediatrician</a>
                  <span class="badge bg-danger-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Unavailable
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Cath Busick</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Schenectady, NY
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$750</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-09.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.9</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-indigo align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-indigo fw-medium fs-14">Psychologist</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Travis Barton</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Metairie, LA
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">60 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$480</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-10.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>5.0</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-danger align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-danger fw-medium fs-14">Gastroenterology</a>
                  <span class="badge bg-success-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Available
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Daisy Malcolm</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Lexington, KY
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">60 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$520</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-11.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.4</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-info align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-info fw-medium fs-14">Cardiologist</a>
                  <span class="badge bg-danger-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Unavailable
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Tyrone Patrick</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Clark Fork, ID
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$360</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-3 col-lg-4 col-md-6">
            <div class="card">
              <div class="card-img card-img-hover">
                <router-link to="/doctor-profile"
                  ><img src="@/themes/doccure/assets/img/doctor-grid/doctor-grid-12.jpg" alt=""
                /></router-link>
                <div
                  class="grid-overlay-item d-flex align-items-center justify-content-between"
                >
                  <span class="badge bg-orange"
                    ><i class="fa-solid fa-star me-1"></i>4.2</span
                  >
                  <a href="javascript:void(0)" class="fav-icon">
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="card-body p-0">
                <div
                  class="d-flex active-bar active-bar-pink align-items-center justify-content-between p-3"
                >
                  <a href="#" class="text-pink fw-medium fs-14">Pediatrician</a>
                  <span class="badge bg-danger-light d-inline-flex align-items-center">
                    <i class="fa-solid fa-circle fs-5 me-1"></i>
                    Unavailable
                  </span>
                </div>
                <div class="p-3 pt-0">
                  <div class="doctor-info-detail mb-3 pb-3">
                    <h3 class="mb-1">
                      <router-link to="/doctor-profile">Dr. Ann Bell</router-link>
                    </h3>
                    <div class="d-flex align-items-center">
                      <p class="d-flex align-items-center mb-0 fs-14">
                        <i class="isax isax-location me-2"></i>Minneapolis, MN
                      </p>
                      <i class="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                      <span class="fs-14 fw-medium">30 Min</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <p class="mb-1">Consultation Fees</p>
                      <h3 class="text-orange">$630</h3>
                    </div>
                    <router-link
                      to="/booking"
                      class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                    >
                      <i class="isax isax-calendar-1 me-2"></i>
                      Book Now
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="text-center mb-4">
              <router-link
                to="/login"
                class="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
              >
                <i class="isax isax-d-cube-scan5 me-2"></i>
                Load More 425 Doctors
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      title: "Search",
      text: "Home",
      text1: "Search",
      startdate: currentDate,
      Hostp: ["Hospitals", "Cleveland Clinic", "Apollo Hospital", "Apollo Hospital"],
      DoctoMn: [
        "Doctors",
        "Dr. Michael Brown",
        "Dr. Nicholas Tello",
        "Dr. Harold Bryant",
      ],
      Psychiatry: ["Specialities", "Urology", "Psychiatry", "Psychiatry", "Cardiology"],
      StatPai: ["Reviews", "5 Star", "4 Star", "3 Star"],
      DentalSel: [
        "Clinic",
        "Bright Smiles Dental Clinic",
        "Family Care Clinic",
        "Express Health Clinic",
      ],
    };
  },
};
</script>
