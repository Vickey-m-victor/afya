<template>
  <div class="login-body">
    <div class="main-wrapper">
      <!-- Page Content -->
      <div class="login-content-info">
        <div class="container">
          <!-- Doctor Signup -->
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div class="account-content">
                <div class="login-shapes">
                  <div class="shape-img-left">
                    <img src="@/themes/doccure/assets/img/shape-01.png" alt="shape-image" />
                  </div>
                  <div class="shape-img-right">
                    <img src="@/themes/doccure/assets/img/shape-02.png" alt="shape-image" />
                  </div>
                </div>
                <div class="widget-set">
                  <div class="account-info">
                    <div class="widget-content multistep-form">
                      <fieldset id="first" v-if="currentStep === 1">
                        <div class="login-title">
                          <h3>Doctor Signup</h3>
                          <p class="mb-0">Welcome back! Please enter your details.</p>
                        </div>
                        <div class="widget-setcount">
                          <ul id="progressbar">
                            <li
                              :class="
                                currentStep === 1
                                  ? 'progress-active'
                                  : currentStep > 1
                                  ? 'progress-activated'
                                  : ''
                              "
                              ref="progressSteps"
                            >
                              <div class="step-box">
                                <div class="step-icon">
                                  <span>
                                    <i class="isax isax-user"></i>
                                  </span>
                                </div>
                                <div class="step-content">
                                  <p>Step 1</p>
                                  <h4>Create Account</h4>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="step-box">
                                <div class="step-icon">
                                  <span>
                                    <i class="isax isax-lock"></i>
                                  </span>
                                </div>
                                <div class="step-content">
                                  <p>Step 2</p>
                                  <h4>Verify Account</h4>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <form action="#">
                          <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="text" class="form-control" />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Phone Number</label>
                            <vue-tel-input
                              mode="international"
                              class="form-control form-control-lg group_formcontrol form-control-phone"
                              id="phone"
                              name="phone"
                              value="(256) 789-6253"
                            ></vue-tel-input>
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Password </label>
                            <div class="pass-group">
                              <input
                                v-if="showPassword"
                                type="text"
                                class="form-control pass-input"
                                v-model="password"
                                placeholder="**********"
                              />

                              <input
                                v-else
                                type="password"
                                class="form-control pass-input"
                                placeholder="**********"
                                v-model="password"
                              />

                              <span
                                class="toggle-password"
                                @click="toggleShow"
                                :class="{
                                  'feather-eye': showPassword,
                                  'feather-eye-off': !showPassword,
                                }"
                              ></span>
                            </div>
                          </div>
                        </form>
                        <div
                          class="widget-btn"
                          @click="nextStep"
                          :disabled="currentStep === totalSteps"
                        >
                          <a class="btn btn-primary w-100 next_btn">Next</a>
                        </div>
                      </fieldset>
                      <fieldset
                        class="field-card"
                        v-if="currentStep === 2"
                        :style="{ display: currentStep === 2 ? 'block' : 'none' }"
                      >
                        <div class="login-title">
                          <h3>Security Verification</h3>
                          <p class="mb-0">
                            To Secure your Account create complete the following verify
                            request.
                          </p>
                        </div>
                        <div class="widget-setcount">
                          <ul id="progressbar1">
                            <li class="progress-active">
                              <div class="step-box">
                                <div class="step-icon">
                                  <span>
                                    <i class="isax isax-user"></i>
                                  </span>
                                </div>
                                <div class="step-content">
                                  <h4>Create Account</h4>
                                  <p>Step 1</p>
                                </div>
                              </div>
                            </li>
                            <li
                              :class="
                                currentStep === 2
                                  ? 'progress-active'
                                  : currentStep > 2
                                  ? 'progress-activated'
                                  : ''
                              "
                              ref="progressSteps"
                            >
                              <div class="step-box">
                                <div class="step-icon">
                                  <span>
                                    <i class="isax isax-lock"></i>
                                  </span>
                                </div>
                                <div class="step-content">
                                  <h4>Verify Account</h4>
                                  <p>Step 2</p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <form
                          @submit.prevent="submitForm"
                          class="signup-verfication-form"
                        >
                          <div class="mb-3">
                            <div class="form-group-flex">
                              <label class="form-label">Phone</label>
                              <a href="javascript:void(0);" class="forgot-link"
                                >Get Code</a
                              >
                            </div>
                            <div class="pass-group">
                              <vue-tel-input
                                mode="international"
                                class="form-control form-control-lg group_formcontrol form-control-phone"
                                id="phone"
                                name="phone"
                                value="(256) 789-6253"
                              ></vue-tel-input>
                            </div>
                            <p class="signup-code">
                              Enter the 6 digit code sent to 98****4578
                            </p>
                          </div>
                          <div class="mb-3">
                            <div class="form-group-flex">
                              <label class="form-label">Email</label>
                              <a href="javascript:void(0);" class="forgot-link"
                                >Get Code</a
                              >
                            </div>
                            <div class="pass-group">
                              <input
                                type="text"
                                class="form-control form-control-phone"
                              />
                            </div>
                            <p class="signup-code">
                              Enter the 6 digit code sent to ex****@gmail.com
                            </p>
                          </div>
                          <div class="mb-0">
                            <button class="btn btn-primary-gradient w-100" type="submit">
                              Submit
                            </button>
                          </div>
                        </form>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Doctor Signup -->
        </div>
      </div>
      <!-- /Page Content -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAccountPage: true,
      showPassword: false,
      password: null,
      currentStep: 1,
      totalSteps: 2,
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
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
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
