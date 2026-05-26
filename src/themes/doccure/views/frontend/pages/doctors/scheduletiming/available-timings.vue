<template>
  <div class="Main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <!-- Page Content -->
    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>

          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Available Timings</h3>
            </div>

            <div class="appointment-tabs">
              <ul class="nav">
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link active"
                    href="#"
                    data-bs-toggle="tab"
                    data-bs-target="#general-availability"
                    >General Availability</a
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    class="nav-link"
                    href="#"
                    data-bs-toggle="tab"
                    data-bs-target="#clinic-availability"
                    >Clinic Availability</a
                  >
                </li>
              </ul>
            </div>
            <div class="tab-content pt-0">
              <!-- General Availability -->
              <div class="tab-pane fade show active" id="general-availability">
                <general-availability></general-availability>
              </div>
              <!-- /General Availability -->

              <!-- Clinic Availability -->
              <div class="tab-pane fade" id="clinic-availability">
                <clinic-availability></clinic-availability>
              </div>
              <!-- /Clinic Availability -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->

    <doctor-footer></doctor-footer>
  </div>
  <availability-timings-modal></availability-timings-modal>
</template>

<script>
export default {
  data() {
    return {
      title: "Doctor",
      text: "Available Timings",
      text1: "Available Timings",
    };
  },
};
</script>
