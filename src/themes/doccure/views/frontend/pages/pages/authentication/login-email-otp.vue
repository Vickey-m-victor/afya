<template>
  <div class="main-wrapper">
    <!-- Page Content -->
    <div class="login-content-info">
      <div class="container">
        <!-- Login Email -->
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6">
            <div class="account-content">
              <div class="account-info">
                <div class="login-title">
                  <h3>Sign in</h3>
                  <p>We'll send a confirmation code to your email.</p>
                  <span
                    >Sign in with
                    <router-link to="/login-phone">Phone Number</router-link></span
                  >
                </div>
                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <label class="form-label">E-mail</label>
                    <input type="text" class="form-control" />
                  </div>
                  <div class="mb-3 form-check-box">
                    <div class="form-group-flex">
                      <div class="form-check mb-0">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="remember"
                          checked
                        />
                        <label class="form-check-label" for="remember">
                          Remember Me
                        </label>
                      </div>
                      <div class="form-check mb-0">
                        <input class="form-check-input" type="checkbox" id="remember1" />
                        <label class="form-check-label" for="remember1">
                          Login with OTP
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary-gradient w-100" type="submit">
                      Sign in
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
                      Don't have an account ?
                      <router-link to="/signup">Sign up</router-link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- /Login Email -->
      </div>
    </div>
    <!-- /Page Content -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAccountPage: true,
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/email-otp");
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
