<template>
  <div class="main-wrapper">
    <layoutheader></layoutheader>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 offset-md-2">
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
                    <h3>Forgot Password</h3>
                    <p>
                      Enter your email and we will send you a link to reset your password.
                    </p>
                  </div>
                  <form @submit.prevent="submitForm">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <input class="form-control" type="email" v-model="email" />
                    </div>
                    <div class="mb-3">
                      <button class="btn btn-primary-gradient w-100" type="submit">
                        Submit
                      </button>
                    </div>
                    <div class="account-signup">
                      <p>
                        Remember Password? <router-link to="/login">Sign In</router-link>
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

    <indexfooter></indexfooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      isAccountPage: true,
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
      this.$router.push("/login");
    },
  },
};
</script>
