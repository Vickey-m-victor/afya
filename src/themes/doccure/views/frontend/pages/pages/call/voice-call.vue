<template>
  <div class="call-page">
    <div class="main-wrapper">
      <layoutheader></layoutheader>
      <!-- Page Content -->
      <div class="content top-space">
        <div class="container">
          <!-- Call Wrapper -->
          <div class="call-wrapper">
            <div class="call-main-row">
              <div class="call-main-wrapper">
                <div class="call-view">
                  <div class="call-window">
                    <!-- Call Header -->
                    <div class="fixed-header">
                      <div class="navbar">
                        <div class="user-details me-auto">
                          <div class="float-start user-img">
                            <router-link
                              class="avatar avatar-sm me-2"
                              to="/patient-profile"
                              title="Deny Hendrawan"
                            >
                              <img
                                src="@/themes/doccure/assets/img/patients/patient1.jpg"
                                alt="User Image"
                                class="rounded-circle"
                              />
                              <span class="status online"></span>
                            </router-link>
                          </div>
                          <div class="user-info float-start">
                            <a href="patient-profile.html"><span>Deny Hendrawan</span></a>
                            <span class="last-seen">Online</span>
                          </div>
                        </div>
                        <ul class="nav float-end custom-menu">
                          <li class="nav-item">
                            <a href="#" class="user-icon"
                              ><i class="isax isax-user-add"></i
                            ></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- /Call Header -->

                    <!-- Call Contents -->
                    <div class="call-contents">
                      <div class="call-content-wrap">
                        <div class="voice-call-avatar">
                          <img
                            src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                            alt="User Image"
                            class="call-avatar"
                          />
                          <span class="username">Dr. Michael Brown</span>
                          <span class="call-timing-count">00:59</span>
                        </div>
                        <div class="call-users">
                          <ul>
                            <li>
                              <a href="#">
                                <img
                                  src="@/themes/doccure/assets/img/patients/patient1.jpg"
                                  class="img-fluid"
                                  alt="User Image"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <!-- /Call Contents -->

                    <!-- Call Footer -->
                    <div class="call-footer">
                      <div class="call-icons">
                        <ul class="call-items">
                          <li class="call-item me-2">
                            <a
                              href="javascript:void(0)"
                              class="mute-video"
                              :class="isVideoMuted ? 'stop' : ''"
                              title="Enable Video"
                              data-placement="top"
                              data-bs-toggle="tooltip"
                              @click="toggleVideoMute"
                            >
                              <i
                                :class="
                                  isVideoMuted ? 'feather-video-off' : 'feather-video'
                                "
                              ></i>
                            </a>
                          </li>
                          <li class="call-item">
                            <a href="javascript:void(0)" class="call-end">
                              <i class="isax isax-call"></i>
                            </a>
                          </li>
                          <li class="call-item me-2">
                            <a
                              href="javascript:void(0)"
                              class="mute-bt"
                              :class="isAudioMuted ? 'stop' : ''"
                              title="Mute"
                              data-placement="top"
                              data-bs-toggle="tooltip"
                              @click="toggleAudioMute"
                            >
                              <i
                                :class="isAudioMuted ? 'feather-mic-off' : 'feather-mic'"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- /Call Footer -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Call Wrapper -->
        </div>
      </div>
      <!-- /Page Content -->
      <indexfooter></indexfooter>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isVideoMuted: false,
      isAudioMuted: false,
    };
  },
  methods: {
    toggleVideoMute() {
      this.isVideoMuted = !this.isVideoMuted;
    },
    toggleAudioMute() {
      this.isAudioMuted = !this.isAudioMuted;
    },
  },
};
</script>
