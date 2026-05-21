<template>
  <!-- Main Wrapper -->
  <div class="main-wrapper">
    <!-- Page Content -->
    <div class="login-content-info">
      <div class="container">
        <!-- Patient Signup -->
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-6">
            <div class="account-content">
              <div class="account-info">
                <div class="login-title">
                  <h3>Patient Signup</h3>
                  <p class="mb-0">Enter your credentials & create your account</p>
                </div>
                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <label class="form-label">Phone</label>
                    <vue-tel-input
                      mode="international"
                      class="form-control form-control-lg group_formcontrol form-control-phone"
                      id="phone"
                      name="phone"
                      value="(256) 789-6253"
                    ></vue-tel-input>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="mb-3 form-check-box terms-check-box">
                    <div class="form-group-flex">
                      <div class="form-check mb-0">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="remember"
                          checked
                        />
                        <label class="form-check-label" for="remember">
                          I have read and agree to Doccure’s
                          <router-link to="/terms-condition"
                            >Terms of Service</router-link
                          >
                          and
                          <router-link to="/privacy-policy">Privacy Policy.</router-link>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary-gradient btn-xl w-100" type="submit">
                      Register Now
                    </button>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-light btn-xl w-100" type="submit">
                      Create an Account
                    </button>
                  </div>
                  <div class="login-or">
                    <span class="or-line"></span>
                    <span class="span-or">or</span>
                  </div>
                  <div class="social-login-btn">
                    <a href="javascript:void(0);" class="btn w-100">
                      <img
                        src="@/themes/doccure/assets/img/icons/google-icon.svg"
                        alt="google-icon"
                      />Sign in With Google
                    </a>
                    <a href="javascript:void(0);" class="btn w-100">
                      <img src="@/themes/doccure/assets/img/icons/facebook-icon.svg" alt="fb-icon" />Sign
                      in With Facebook
                    </a>
                  </div>
                  <div class="account-signup">
                    <p>
                      Already have account?
                      <router-link to="/login-email">Sign In</router-link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- /Patient Signup -->
      </div>
    </div>
    <!-- /Page Content -->
  </div>
  <!-- /Main Wrapper -->
</template>
<script>
export default {
  methods: {
    submitForm() {
      this.$router.push("/signup-success");
    },
  },
  watch: {
    isAccountPage(newValue) {
      if (newValue) {
        document.body.classList.add("login-body");
      } else {
        document.body.classList.remove("login-body");
      }
    },
  },
  mounted() {
    if (this.isAccountPage) {
      document.body.classList.add("login-body");
    }
  },
  beforeDestroy() {
    if (this.isAccountPage) {
      document.body.classList.remove("login-body");
    }
  },
};
</script>
