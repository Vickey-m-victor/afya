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

          <!-- Change Password -->
          <div class="col-lg-8 col-xl-9">
            <nav class="settings-tab mb-1">
              <ul class="nav nav-tabs-bottom" role="tablist">
                <li class="nav-item" role="presentation">
                  <router-link class="nav-link" to="/profile-settings"
                    >Profile</router-link
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <router-link class="nav-link active" to="/change-password"
                    >Change Password</router-link
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <router-link class="nav-link" to="/two-factor-authentication"
                    >2 Factor Authentication</router-link
                  >
                </li>
                <li class="nav-item" role="presentation">
                  <router-link class="nav-link" to="/delete-account"
                    >Delete Account</router-link
                  >
                </li>
              </ul>
            </nav>
            <div class="card">
              <div class="card-body">
                <div class="border-bottom pb-3 mb-3">
                  <h5>Change Password</h5>
                </div>
                <form action="#">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Current Password <span class="text-danger">*</span></label
                        >
                        <div class="pass-group">
                          <input type="password" class="form-control pass-input-sub" />
                          <span class="feather-eye-off toggle-password-sub"></span>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >New Password <span class="text-danger">*</span></label
                        >
                        <div class="pass-group">
                          <input type="password" class="form-control pass-input" />
                          <span class="feather-eye-off toggle-password"></span>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Confirm Password <span class="text-danger">*</span></label
                        >
                        <div class="pass-group">
                          <input type="password" class="form-control pass-input-sub" />
                          <span class="feather-eye-off toggle-password-sub"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-btn border-top pt-3 text-end">
                    <a href="#" class="btn btn-md btn-light rounded-pill">Cancel</a>
                    <button
                      type="submit"
                      class="btn btn-md btn-primary-gradient rounded-pill"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- /Change Password -->
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
      title: "Patient",
      text: "Settings",
      text1: "Settings",
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/change-password");
    },
  },
};
</script>
