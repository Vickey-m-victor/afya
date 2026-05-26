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
              <router-link class="nav-link active" to="/speciality"
                >Specialities</router-link
              >
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
              <h5>
                Showing <span class="text-secondary">124</span> Specialities For You
              </h5>
              <div class="d-flex align-items-center flex-wrap gap-3">
                <div class="input-block dash-search-input">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Specialities"
                  />
                  <span class="search-icon"><i class="isax isax-search-normal"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Show Result -->

        <div class="row">
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-01.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Orthopedics</router-link>
                      </h6>
                      <p class="fs-14 mb-0">151 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-02.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Neurology</router-link>
                      </h6>
                      <p class="fs-14 mb-0">25 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-03.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Psychiatry</router-link>
                      </h6>
                      <p class="fs-14 mb-0">121 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-04.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Endocrinology</router-link>
                      </h6>
                      <p class="fs-14 mb-0">104 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-05.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Pulmonology</router-link>
                      </h6>
                      <p class="fs-14 mb-0">41 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-06.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Urology</router-link>
                      </h6>
                      <p class="fs-14 mb-0">39 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-07.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Cardiology</router-link>
                      </h6>
                      <p class="fs-14 mb-0">254 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-08.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Adult Endocrinology</router-link>
                      </h6>
                      <p class="fs-14 mb-0">99 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-09.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">General Medicine</router-link>
                      </h6>
                      <p class="fs-14 mb-0">41 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-10.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">ENT</router-link>
                      </h6>
                      <p class="fs-14 mb-0">37 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-11.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Fertility</router-link>
                      </h6>
                      <p class="fs-14 mb-0">547 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="card speciality-item">
              <div class="card-body p-3">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <router-link to="/doctor-grid" class="speciality-icon">
                      <img src="@/themes/doccure/assets/img/specialities/speciality-12.svg" alt="img" />
                    </router-link>
                    <div class="ms-3">
                      <h6 class="mb-1">
                        <router-link to="/doctor-grid">Family Medicine</router-link>
                      </h6>
                      <p class="fs-14 mb-0">121 Doctors</p>
                    </div>
                  </div>
                  <router-link to="/doctor-grid" class="link-icon"
                    ><i class="isax isax-arrow-right-3"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loader-item text-center">
          <a href="#" class="btn btn-primary d-inline-flex align-items-center">
            <i class="isax isax-d-cube-scan me-2"></i>Load More 15 Specialities
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
      title: "Specialties",
      text: "Specialties",
    };
  },
};
</script>
