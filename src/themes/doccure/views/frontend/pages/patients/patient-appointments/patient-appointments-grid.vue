<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb :title="title" :text="text" :text1="text1" />
    <div class="content doctor-content">
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
              <h3>Appointments</h3>
              <ul class="header-list-btns">
                <li>
                  <div class="input-block dash-search-input">
                    <input type="text" class="form-control" placeholder="Search" />
                    <span class="search-icon"
                      ><i class="isax isax-search-normal"></i
                    ></span>
                  </div>
                </li>
                <li>
                  <div class="view-icons">
                    <router-link to="/patient-appointments"
                      ><i class="isax isax-grid-7"></i
                    ></router-link>
                  </div>
                </li>
                <li>
                  <div class="view-icons">
                    <router-link to="/patient-appointments-grid" class="active"
                      ><i class="fa-solid fa-th"></i
                    ></router-link>
                  </div>
                </li>
              </ul>
            </div>
            <div class="appointment-tab-head">
              <div class="appointment-tabs">
                <ul class="nav nav-pills inner-tab" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-upcoming-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-upcoming"
                      type="button"
                      role="tab"
                      aria-controls="pills-upcoming"
                      aria-selected="false"
                    >
                      Upcoming<span>21</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-cancel-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-cancel"
                      type="button"
                      role="tab"
                      aria-controls="pills-cancel"
                      aria-selected="true"
                    >
                      Cancelled<span>16</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-complete-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-complete"
                      type="button"
                      role="tab"
                      aria-controls="pills-complete"
                      aria-selected="true"
                    >
                      Completed<span>214</span>
                    </button>
                  </li>
                </ul>
              </div>
              <appointments-filter></appointments-filter>
            </div>

            <div class="tab-content appointment-tab-content appoint-patient">
              <patients-grid-upcoming></patients-grid-upcoming>
              <patients-grid-cancelled></patients-grid-cancelled>
              <patients-grid-completed></patients-grid-completed>
            </div>
          </div>
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
      title: "Patient Appointments",
      text: "Home",
      text1: "Patient Appointments",
    };
  },
};
</script>
