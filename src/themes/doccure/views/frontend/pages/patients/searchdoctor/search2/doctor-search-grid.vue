<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <div class="content mt-5">
      <div class="container">
        <div class="row">
          <search2filter></search2filter>
          <div class="col-xl-9">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="mb-4">
                  <h3>Showing <span class="text-secondary">450</span> Doctors For You</h3>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center justify-content-end mb-4">
                  <div class="doctor-filter-availability me-2">
                    <p>Availability</p>
                    <div class="status-toggle status-tog">
                      <input type="checkbox" id="status_6" class="check" />
                      <label for="status_6" class="checktoggle">checkbox</label>
                    </div>
                  </div>
                  <div class="dropdown header-dropdown me-2">
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
                  <router-link
                    to="/doctor-grid"
                    @click="redirectReloadSearch"
                    class="btn btn-sm head-icon active me-2"
                    ><i class="isax isax-grid-7"></i
                  ></router-link>
                  <router-link to="/search-2" class="btn btn-sm head-icon me-2"
                    ><i class="isax isax-row-vertical"></i
                  ></router-link>
                  <router-link
                    to="/map-list"
                    @click="redirectReloadSearchOne"
                    class="btn btn-sm head-icon"
                    ><i class="isax isax-location"></i
                  ></router-link>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Michael Brown</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Nicholas Tello</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Harold Bryant</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Charles Scott</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Robert Thomas</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Margaret Koller</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-danger-light d-inline-flex align-items-center"
                      >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Travis Barton</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-success-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Available
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Daisy Malcolm</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-danger-light d-inline-flex align-items-center"
                      >
                        <i class="fa-solid fa-circle fs-5 me-1"></i>
                        Unavailable
                      </span>
                    </div>
                    <div class="p-3 pt-0">
                      <div class="doctor-info-detail mb-3 pb-3">
                        <h3 class="mb-1">
                          <router-link to="/doctor-profile"
                            >Dr. Tyrone Patrick</router-link
                          >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-4 col-md-6">
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
                      <span
                        class="badge bg-danger-light d-inline-flex align-items-center"
                      >
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
                        <a
                          href="booking.html"
                          class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill"
                        >
                          <i class="isax isax-calendar-1 me-2"></i>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="text-center mb-4">
                  <a
                    href="login.html"
                    class="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill"
                  >
                    <i class="isax isax-d-cube-scan5 me-2"></i>
                    Load More 425 Doctors
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Doctor Search List -->
    <indexfooter></indexfooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Doctor",
      text: "Doctor Grid",
      text1: "Doctor Grid",
      isFavorite: false,
    };
  },
  methods: {
    toggleFavorite(item) {
      item.isFavorite = !item.isFavorite;
    },
  },
  mounted() {
    const mapListButton = document.getElementById("map-list");
    if (mapListButton) {
      mapListButton.addEventListener("click", function () {
        var container = this.closest(".container");
        if (container) {
          container.classList.add("container-fluid");
          container.classList.remove("container");
        }

        var mapView = document.querySelector(".map-view");
        if (mapView) {
          mapView.classList.remove("col-xl-12");
          mapView.classList.add("col-xl-9");
        }

        var mapRight = document.querySelector(".map-right");
        if (mapRight) {
          mapRight.style.display = "block";
        }

        var timeSlotSlider = document.getElementsByClassName("time-slot-slider")[0];
        if (timeSlotSlider && timeSlotSlider.slick && timeSlotSlider.slick.refresh) {
          timeSlotSlider.slick.refresh();
        }
      });
    }
  },
};
</script>
<style scoped>
.favorite {
  color: red;
}
</style>
