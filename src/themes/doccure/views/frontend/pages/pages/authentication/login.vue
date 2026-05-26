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
                    <h3>Login <span>Doccure</span></h3>
                  </div>
                  <Form
                    class="login"
                    @submit="onSubmit"
                    :validation-schema="schema"
                    v-slot="{ errors }"
                  >
                    <div class="mb-3">
                      <label class="form-label">E-mail</label>
                      <Field
                        name="email"
                        type="text"
                        value="example@dreamstechnologies.com"
                        class="form-control"
                      />
                      <div class="invalid-feedback">{{ errors.email }}</div>
                      <div class="emailshow text-danger" id="email"></div>
                    </div>
                    <div class="mb-3">
                      <div class="form-group-flex">
                        <label class="form-label">Password</label>
                        <router-link to="/forgot-password" class="forgot-link"
                          >Forgot password?</router-link
                        >
                      </div>
                      <div class="pass-group">
                        <Field
                          name="password"
                          :type="showPassword ? 'text' : 'password'"
                          value="123456"
                          class="form-control pass-input mt-2"
                        />
                        <span @click="toggleShow" class="toggle-password">
                          <i
                            :class="{
                              'fas fa-eye': showPassword,
                              'fas fa-eye-slash': !showPassword,
                            }"
                          ></i>
                        </span>
                        <div class="invalid-feedback">{{ errors.password }}</div>
                        <div class="emailshow text-danger" id="password"></div>
                      </div>
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
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="remember1"
                          />
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
                        <img
                          src="@/themes/doccure/assets/img/icons/facebook-icon.svg"
                          alt="fb-icon"
                        />Sign in With Facebook
                      </a>
                    </div>
                    <div class="account-signup">
                      <p>
                        Don't have an account ?
                        <router-link to="/register">Sign up</router-link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexfooter />
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { router } from "@/router";
export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      isAccountPage: true,
      showPassword: false,
      password: null,
      emailError: "",
      passwordError: "",
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    onSubmit(values) {
      this.emailError = "";
      this.passwordError = "";

      let data = localStorage.getItem("storedData");
      var Pdata = JSON.parse(data);
      const Eresult = Pdata.find(({ email }) => email === values.email);
      if (Eresult) {
        if (Eresult.password === values.password) {
          this.$router.push("/index"); // Use this.$router instead of router
        } else {
          this.passwordError = "Incorrect password";
        }
      } else {
        this.emailError = "Email is not valid";
      }
    },
  },
  setup() {
    let users = localStorage.getItem("storedData");
    if (users === null) {
      let password = [
        {
          email: "example@dreamstechnologies.com",
          password: "123456",
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem("storedData", jsonData);
    }
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
    return {
      schema,
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
