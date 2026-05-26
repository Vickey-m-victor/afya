<template>
  <div class="main-wrapper">
    <div class="login-content-info">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6">
            <div class="account-content">
              <div class="account-info">
                <div class="login-title">
                  <h3>Forgot Password</h3>
                  <p>
                    Enter your email and we will send you a link to reset your password.
                  </p>
                </div>
                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input class="form-control" type="email" />
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary-gradient w-100" type="submit">
                      Submit
                    </button>
                  </div>
                  <div class="account-signup">
                    <p>
                      Remember Password?
                      <router-link to="/login-email">Sign In</router-link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Main Wrapper -->
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
      this.$router.push("/login-email");
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
