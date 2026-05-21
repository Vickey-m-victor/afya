<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-xl-3 theiaStickySidebar">
            <!-- Profile Sidebar -->
            <profilesidebar></profilesidebar>
            <!-- /Profile Sidebar -->
          </div>

          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header flex-wrap">
              <h3>Records</h3>
              <div class="appointment-tabs">
                <ul class="nav">
                  <li>
                    <a
                      href="#"
                      class="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#medical"
                      >Medical Records</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#prescription"
                      >Prescriptions</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div class="tab-content pt-0">
              <!-- Prescription Tab -->
              <medical-prescription></medical-prescription>
              <!-- /Prescription Tab -->

              <!-- Medical Records Tab -->
              <medical-records-table></medical-records-table>
              <!-- /Medical Records Tab -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
  <medical-records-modal></medical-records-modal>
</template>
<script>
export default {
  data() {
    return {
      title: "Medical Records",
      text: "Home",
      text1: "Medical Records",
    };
  },
  name: "medical-details",
};
</script>
