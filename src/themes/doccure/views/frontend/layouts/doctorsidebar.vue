<template>
  <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
    <div class="stickysidebar">
      <!-- Profile Sidebar -->
      <div class="profile-sidebar doctor-sidebar profile-sidebar-new">
        <div class="widget-profile pro-widget-content">
          <div class="profile-info-widget">
            <router-link to="/doctor-profile" class="booking-doc-img">
              <img
                src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg"
                alt="User Image"
              />
            </router-link>
            <div class="profile-det-info">
              <h3><router-link to="/doctor-profile">Dr Edalin Hendry</router-link></h3>
              <div class="patient-details">
                <h5 class="mb-0">BDS, MDS - Oral & Maxillofacial Surgery</h5>
              </div>
              <span class="badge doctor-role-badge"
                ><i class="fa-solid fa-circle"></i>Dentist</span
              >
            </div>
          </div>
        </div>
        <div class="doctor-available-head">
          <div class="input-block input-block-new">
            <label class="form-label"
              >Availability <span class="text-danger">*</span></label
            >
            <vue-select
              :options="Available"
              id="available"
              placeholder="I am Available Now"
            />
          </div>
        </div>
        <div class="dashboard-widget">
          <nav class="dashboard-menu">
            <ul>
              <li :class="{ active: isActive('/doctor/dashboard') }">
                <router-link to="/doctor/dashboard">
                  <i class="isax isax-category-2"></i>
                  <span class="ms-1">Dashboard</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/doctor/test-page') }">
                <router-link to="/doctor/test-page">
                  <i class="isax isax-clipboard-text"></i>
                  <span class="ms-1">Test Page</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/doctor-request') }">
                <router-link to="/doctor-request">
                  <i class="isax isax-clipboard-tick"></i>
                  <span>Requests</span>
                  <small class="unread-msg">2</small>
                </router-link>
              </li>
              <li
                :class="{
                  active: isActive([
                    '/appointments',
                    '/doctor-appointments-grid',
                    '/doctor-upcoming-appointment',
                    '/doctor-appointment-start',
                    '/doctor-cancelled-appointment',
                    'doctor-cancelled-appointment-2',
                    'doctor-completed-appointment',
                  ]),
                }"
              >
                <router-link to="/appointments">
                  <i class="isax isax-calendar-1"></i>
                  <span class="ms-1">Appointments</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/available-timings') }">
                <router-link to="/available-timings">
                  <i class="isax isax-calendar-tick"></i>
                  <span class="ms-1">Available Timings</span>
                </router-link>
              </li>
              <li :class="{ active: isActive(['/my-patients', '/patient-profile']) }">
                <router-link to="/my-patients">
                  <i class="fa-solid fa-user-injured"></i>
                  <span class="ms-1">My Patients</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/doctor-specialities') }">
                <router-link to="/doctor-specialities">
                  <i class="isax isax-clock"></i>
                  <span>Specialties & Services</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/reviews') }">
                <router-link to="/reviews">
                  <i class="isax isax-star-1"></i>
                  <span class="ms-1">Reviews</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/accounts') }">
                <router-link to="/accounts">
                  <i class="isax isax-profile-tick"></i>
                  <span class="ms-1">Accounts</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/invoices') }">
                <router-link to="/invoices">
                  <i class="isax isax-document-text"></i>
                  <span class="ms-1">Invoices</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/doctor-payment') }">
                <router-link to="/doctor-payment">
                  <i class="fa-solid fa-money-bill-1"></i>
                  <span>Payout Settings</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/chat-doctor') }">
                <router-link to="/chat-doctor">
                  <i class="isax isax-messages-1"></i>
                  <span class="ms-1">Message</span>
                  <small class="unread-msg">7</small>
                </router-link>
              </li>
              <li
                :class="{
                  active: isActive([
                    '/doctor-profile-settings',
                    'doctor-experience-settings',
                    'doctor-education-settings',
                    'doctor-awards-settings',
                    'doctor-insurance-settings',
                    'doctor-clinics-settings',
                    'doctor-business-settings',
                  ]),
                }"
              >
                <router-link to="/doctor-profile-settings">
                  <i class="isax isax-setting-2"></i>
                  <span class="ms-1">Profile Settings</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/social-media') }">
                <router-link to="/social-media">
                  <i class="fa-solid fa-shield-halved"></i>
                  <span class="ms-1">Social Media</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/doctor-change-password') }">
                <router-link to="/doctor-change-password">
                  <i class="isax isax-key"></i>
                  <span class="ms-1">Change Password</span>
                </router-link>
              </li>
              <li :class="{ active: isActive('/') }">
                <router-link to="/">
                  <i class="isax isax-logout"></i>
                  <span class="ms-1">Logout</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- /Profile Sidebar -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeClass: "active",
      Available: ["I am Available Now", "Not Available"],
    };
  },
  methods: {
    isActive(paths) {
      return paths.includes(this.$route.path);
    },
  },
};
</script>
