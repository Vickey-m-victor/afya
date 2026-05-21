<template>
  <div class="main-wrapper">
    <layoutheader></layoutheader>

    <!-- Page Content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <!-- Login Tab Content -->
            <div class="account-content">
              <div class="row align-items-center justify-content-center">
                <div class="col-md-7 col-lg-6 login-left">
                  <img
                    src="@/themes/doccure/assets/img/login-banner.png"
                    class="img-fluid"
                    alt="Doccure Login"
                  />
                </div>
                <div class="col-md-12 col-lg-6 login-right">
                  <div class="login-header">
                    <h3>
                      Pharmacy Register
                      <router-link to="/doctor-register">Are you a Doctor?</router-link>
                    </h3>
                  </div>
                  <form @submit.prevent="submitForm">
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <input type="text" class="form-control" />
                    </div>
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
                      <div class="form-group-flex">
                        <label class="form-label">Create Password</label>
                      </div>
                      <div class="pass-group">
                        <input type="password" class="form-control pass-input" />
                        <span class="feather-eye-off toggle-password"></span>
                      </div>
                    </div>
                    <div class="mb-3">
                      <button class="btn btn-primary-gradient w-100" type="submit">
                        Sign Up
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
                        <img
                          src="@/themes/doccure/assets/img/icons/facebook-icon.svg"
                          alt="fb-icon"
                        />Sign in With Facebook
                      </a>
                    </div>
                    <div class="account-signup">
                      <p>
                        Already have account?
                        <router-link to="/login">Sign In</router-link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <!-- /Login Tab Content -->
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->
    <indexfooter></indexfooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAccountPage: true, // You can dynamically set this flag
    };
  },
  watch: {
    isAccountPage(newValue) {
      if (newValue) {
        document.body.classList.add("account-page");
      } else {
        document.body.classList.remove("account-page");
      }
    },
  },
  mounted() {
    if (this.isAccountPage) {
      document.body.classList.add("account-page");
    }
  },
  beforeDestroy() {
    if (this.isAccountPage) {
      document.body.classList.remove("account-page");
    }
  },
  methods: {
    submitForm() {
      this.$router.push("/pharmacy-register-step1");
    },
  },
};
</script>
