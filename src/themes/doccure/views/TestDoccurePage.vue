<template>
  <div class="main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <!-- Page Content -->
    <div class="content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>

          <div class="col-md-7 col-lg-8 col-xl-9">
            <!-- Doccure Styled Card / Content -->
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Doccure Styled Page</h4>
              </div>
              <div class="card-body">
                <p class="card-text">
                  This is a custom page that demonstrates how to build views using the Doccure theme. It automatically loads Doccure's custom styles and assets using the `LayoutDoccure` meta configuration.
                </p>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <div class="appointment-action-btn">
                      <a href="javascript:void(0);" class="btn btn-primary w-100 mb-2">Doccure Button (Primary)</a>
                      <a href="javascript:void(0);" class="btn btn-secondary w-100">Doccure Button (Secondary)</a>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-block">
                      <label class="form-label">Doccure Select Component</label>
                      <vue-select :options="options" placeholder="Select an option" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <doctor-footer></doctor-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Doctor",
      text: "Test Page",
      text1: "Test Page",
      options: ["Consultation", "Diagnosis", "Treatment Plan"]
    };
  }
};
</script>
