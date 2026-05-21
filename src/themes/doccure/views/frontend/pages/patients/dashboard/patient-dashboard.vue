<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content">
      <div class="container">
        <div class="row">
          <!-- Profile Sidebar -->
          <div class="col-lg-4 col-xl-3 theiaStickySidebar">
            <!-- Profile Sidebar -->
            <profilesidebar></profilesidebar>
            <!-- /Profile Sidebar -->
          </div>
          <!-- / Profile Sidebar -->

          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Dashboard</h3>
              <ul class="header-list-btns">
                <li>
                  <div class="dropdown header-dropdown">
                    <a
                      class="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="javascript:void(0);"
                    >
                      <img
                        src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg"
                        class="avatar dropdown-avatar"
                        alt="Img"
                      />
                      Hendrita
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a href="javascript:void(0);" class="dropdown-item">
                        <img
                          src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg"
                          class="avatar dropdown-avatar"
                          alt="Img"
                        />
                        Hendrita
                      </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        <img
                          src="@/themes/doccure/assets/img/doctors-dashboard/profile-08.jpg"
                          class="avatar dropdown-avatar"
                          alt="Img"
                        />
                        Laura
                      </a>
                      <a href="javascript:void(0);" class="dropdown-item">
                        <img
                          src="@/themes/doccure/assets/img/doctors-dashboard/profile-07.jpg"
                          class="avatar dropdown-avatar"
                          alt="Img"
                        />
                        Mathew
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="row">
              <health-records></health-records>
              <div class="col-xl-4 d-flex">
                <div class="favourites-dashboard w-100">
                  <div class="book-appointment-head">
                    <h3><span>Book a new</span>Appointment</h3>
                    <span class="add-icon"
                      ><router-link to="/search"
                        ><i class="fa-solid fa-circle-plus"></i></router-link
                    ></span>
                  </div>
                  <div class="dashboard-card w-100">
                    <div class="dashboard-card-head">
                      <div class="header-title">
                        <h5>Favourites</h5>
                      </div>
                      <div class="card-view-link">
                        <router-link to="/favourites">View All</router-link>
                      </div>
                    </div>
                    <div class="dashboard-card-body">
                      <div class="doctor-fav-list">
                        <div class="doctor-info-profile">
                          <a href="#" class="table-avatar">
                            <img
                              src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg"
                              alt="Img"
                            />
                          </a>
                          <div class="doctor-name-info">
                            <h5><a href="#">Dr. Edalin</a></h5>
                            <span>Endodontists</span>
                          </div>
                        </div>
                        <a href="#" class="cal-plus-icon"
                          ><i class="isax isax-calendar5"></i
                        ></a>
                      </div>
                      <div class="doctor-fav-list">
                        <div class="doctor-info-profile">
                          <a href="#" class="table-avatar">
                            <img
                              src="@/themes/doccure/assets/img/doctors/doctor-thumb-11.jpg"
                              alt="Img"
                            />
                          </a>
                          <div class="doctor-name-info">
                            <h5><a href="#">Dr. Maloney</a></h5>
                            <span>Cardiologist</span>
                          </div>
                        </div>
                        <a href="#" class="cal-plus-icon"
                          ><i class="isax isax-calendar5"></i
                        ></a>
                      </div>
                      <div class="doctor-fav-list">
                        <div class="doctor-info-profile">
                          <a href="#" class="table-avatar">
                            <img src="@/themes/doccure/assets/img/doctors/doctor-14.jpg" alt="Img" />
                          </a>
                          <div class="doctor-name-info">
                            <h5><a href="#">Dr. Wayne </a></h5>
                            <span>Dental Specialist</span>
                          </div>
                        </div>
                        <a href="#" class="cal-plus-icon"
                          ><i class="isax isax-calendar5"></i
                        ></a>
                      </div>
                      <div class="doctor-fav-list">
                        <div class="doctor-info-profile">
                          <a href="#" class="table-avatar">
                            <img src="@/themes/doccure/assets/img/doctors/doctor-15.jpg" alt="Img" />
                          </a>
                          <div class="doctor-name-info">
                            <h5><a href="#">Dr. Marla</a></h5>
                            <span>Endodontists</span>
                          </div>
                        </div>
                        <a href="#" class="cal-plus-icon"
                          ><i class="isax isax-calendar5"></i
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <dashboard-appointment></dashboard-appointment>
              <dashboard-analytics></dashboard-analytics>
              <div class="col-xl-12 d-flex">
                <dashboard-reports></dashboard-reports>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <doctor-footer></doctor-footer>
  </div>
  <patient-dashboard-modal></patient-dashboard-modal>
</template>

<script>
export default {
  data() {
    return {
      title: "Patient",
      text: "Dashboard",
      text1: "Patient Dashboard",
    };
  },
};
</script>
