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
                    <h3>
                      Patient Register
                      <router-link to="/doctor-register">Are you a Doctor?</router-link>
                    </h3>
                  </div>
                  <Form @submit="onSubmit" :validation-schema="schema">
                    <div class="mb-3">
                      <label class="form-label">Name</label>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Email"
                        class="form-control form-control-lg"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Phone</label>
                      <Field
                        name="password"
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control form-control-lg group_formcontrol form-control-phone"
                        placeholder="Enter Password"
                      />
                      <span
                        @click="toggleShow"
                        class="input-icon-addon toggle-password one"
                      >
                        <i
                          :class="{
                            'isax isax-eye': showPassword,
                            'isax isax-eye-slash': !showPassword,
                          }"
                        ></i>
                      </span>
                    </div>
                    <div class="mb-3">
                      <div class="form-group-flex">
                        <label class="form-label">Create Password</label>
                      </div>
                      <div class="pass-group">
                        <Field
                          name="confirmpassword"
                          :type="showPassword1 ? 'text' : 'password'"
                          class="form-control form-control-lg pass-input"
                          placeholder="Confirm Password"
                        />
                        <span
                          @click="toggleShow1"
                          class="input-icon-addon toggle-password one"
                        >
                          <i
                            :class="{
                              'isax isax-eye': showPassword1,
                              'isax isax-eye-slash': !showPassword1,
                            }"
                          ></i>
                        </span>
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
                  </Form>
                </div>
              </div>
            </div>
            <!-- /Login Tab Content -->
          </div>
        </div>
      </div>
    </div>
    <indexfooter />
  </div>
</template>
<script>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { router } from "@/router";
export default {
  data() {
    return {
      isAccountPage: true,
      showPassword: false,
      showPassword1: false,
      password: null,
    };
  },
  components: {
    /* eslint-disable vue/no-reserved-component-names */
    Form,
    Field,
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
    buttonLabel1() {
      return this.showPassword1 ? "Hide" : "Show";
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    toggleShow1() {
      this.showPassword1 = !this.showPassword1;
    },
  },
  setup() {
    // eslint-disable-next-line no-unused-vars
    const showPassword = ref(false);
    // eslint-disable-next-line no-unused-vars
    const emailError = ref("");
    // eslint-disable-next-line no-unused-vars
    const passwordError = ref("");

    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmpassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Confirm password is required"),
    });

    const onSubmit = (values) => {
      if (values.password === values.confirmpassword) {
        let Rawdata = localStorage.getItem("storedData");
        let Pdata = [];
        Pdata = JSON.parse(Rawdata);
        const Eresult = Pdata.find(({ email }) => email == values.email);
        if (Eresult) {
          document.getElementById("email").innerHTML = "This email are already exist";
        } else {
          Pdata.push(values);
          const jsonData = JSON.stringify(Pdata);
          router.push("/patient-register-step1");
          localStorage.setItem("storedData", jsonData);
        }
      } else {
        document.getElementById("confirmpassword").innerHTML = "Password not matching";
      }
    };

    return {
      schema,
      onSubmit,
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
};
</script>
