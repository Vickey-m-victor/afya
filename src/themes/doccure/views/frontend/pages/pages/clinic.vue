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
              <router-link class="nav-link" to="/hospitals">Hospitals</router-link>
            </li>
            <li class="nav-item" role="presentation">
              <router-link class="nav-link" to="/speciality">Specialities</router-link>
            </li>
            <li class="nav-item" role="presentation">
              <router-link class="nav-link active" to="/clinic">Clinics</router-link>
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
              <h5>Showing <span class="text-secondary">450</span> Clinics For You</h5>
              <div class="d-flex align-items-center flex-wrap gap-3">
                <vue-select
                  :options="AmeriClin"
                  id="americlin"
                  placeholder="United States Of America"
                />

                <vue-select
                  :options="ClincSel"
                  id="clincsel"
                  placeholder="All Hospitals"
                />

                <div class="input-block dash-search-input">
                  <input type="text" class="form-control" placeholder="Search Clinics" />
                  <span class="search-icon"><i class="feather-search"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Show Result -->

        <div class="row">
          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0)" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-01.svg" alt="img" />
                  </a>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <a href="javascript:void(0)">Jamesburg Clincs</a>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Santa Fe Springs
                      </p>
                      <p class="fs-14 mb-0">180 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-02.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid"
                        >Berkshire Medical Clinic</router-link
                      >
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Indianapolis
                      </p>
                      <p class="fs-14 mb-0">60 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-03.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid">First Priority Clinics</router-link>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Saginaw
                      </p>
                      <p class="fs-14 mb-0">90 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-04.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid">Medical Zone</router-link>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Saint Louis
                      </p>
                      <p class="fs-14 mb-0">78 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-05.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid">Healing Helpers Medical</router-link>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Jamesburg
                      </p>
                      <p class="fs-14 mb-0">96 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-06.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid">Body Regenerate</router-link>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Piscataway
                      </p>
                      <p class="fs-14 mb-0">180 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-07.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid"
                        >Union Family Health Center</router-link
                      >
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Moscow Mills
                      </p>
                      <p class="fs-14 mb-0">68 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-08.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid">Treatment Solutions</router-link>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>Hamburg
                      </p>
                      <p class="fs-14 mb-0">64 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->

          <!-- Clinic Item -->
          <div class="col-lg-4 col-md-6">
            <div class="card clinic-item">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <router-link to="/doctor-grid" class="clinic-icon">
                    <img src="@/themes/doccure/assets/img/clinic/clinic-09.svg" alt="img" />
                  </router-link>
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <router-link to="/doctor-grid">The Vitality Visit</router-link>
                    </h6>
                    <div
                      class="d-flex align-items-center flex-wrap clinic-location gap-2"
                    >
                      <p class="fs-14 mb-0">
                        <i class="isax isax-location me-2"></i>San Diego
                      </p>
                      <p class="fs-14 mb-0">89 Doctors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Clinic Item -->
        </div>
        <div class="loader-item text-center">
          <a href="#" class="btn btn-primary d-inline-flex align-items-center">
            <i class="isax isax-d-cube-scan me-2"></i>Load More 150 Clinics
          </a>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      AmeriClin: ["United States Of America", "United Kingdom"],
      ClincSel: ["All Hospitals", "Jamesburg Clincs", "Medical Zone"],
      selectedRadio: "all-hospital",
      title: "Hospitals",
      text: "Hospitals",
    };
  },
};
</script>
