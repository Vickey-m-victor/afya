<template>
  <div class="stickysidebar">
    <div class="profile-sidebar patient-sidebar profile-sidebar-new">
      <div class="widget-profile pro-widget-content">
        <div class="profile-info-widget">
          <router-link to="/profile-settings" class="booking-doc-img">
            <img src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg" alt="User Image" />
          </router-link>
          <div class="profile-det-info">
            <h3><router-link to="/profile-settings">Hendrita Hayes</router-link></h3>
            <div class="patient-details">
              <h5 class="mb-0">Patient ID : PT254654</h5>
            </div>
            <span>Female <i class="fa-solid fa-circle"></i> 32 years 03 Months</span>
          </div>
        </div>
      </div>
      <div class="dashboard-widget">
        <nav class="dashboard-menu">
          <ul>
            <li :class="{ active: isActive('/patient-dashboard') }">
              <router-link to="/patient-dashboard">
                <i class="isax isax-category-2"></i>
                <span>Dashboard</span>
              </router-link>
            </li>
            <li
              :class="{
                active: isActive([
                  '/patient-appointments',
                  '/patient-upcoming-appointment',
                  '/patient-cancelled-appointment',
                  '/patient-completed-appointment',
                ]),
              }"
            >
              <router-link to="/patient-appointments">
                <i class="isax isax-calendar-1"></i>
                <span>My Appointments</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/favourites') }">
              <router-link to="/favourites">
                <i class="isax isax-star-1"></i>
                <span>Favourites</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/dependent') }">
              <router-link to="/dependent">
                <i class="isax isax-user-octagon"></i>
                <span>Dependants</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/medical-records') }">
              <router-link to="/medical-records">
                <i class="isax isax-note-21"></i>
                <span>Medical Records</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/patient-accounts') }">
              <router-link to="/patient-accounts">
                <i class="isax isax-wallet-2"></i>
                <span>Wallets</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/patient-invoices') }">
              <router-link to="/patient-invoices">
                <i class="isax isax-document-text"></i>
                <span>Invoices</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/chat') }">
              <router-link to="/chat">
                <i class="isax isax-messages-1"></i>
                <span>Message</span>
                <small class="unread-msg">7</small>
              </router-link>
            </li>
            <li :class="{ active: isActive('/medical-details') }">
              <router-link to="/medical-details">
                <i class="isax isax-note-1"></i>
                <span>Vitals</span>
              </router-link>
            </li>
            <li :class="{ active: isActive('/profile-settings') }">
              <router-link to="/profile-settings">
                <i class="isax isax-setting-2"></i>
                <span>Settings</span>
              </router-link>
            </li>
            <li>
              <router-link to="/login">
                <i class="isax isax-logout"></i>
                <span>Logout</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeClass: "active",
    };
  },
  methods: {
    isActive(paths) {
      return paths.includes(this.$route.path);
    },
  },
};
</script>
