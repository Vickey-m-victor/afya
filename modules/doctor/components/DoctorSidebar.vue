<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Menu items as requested
const menuItems = [
  {
    name: "Dashboard",
    to: "doctor-dashboard",
    icon: "fa fa-chart-line",
  },
  {
    name: "Requests",
    to: "#",
    icon: "fa fa-clipboard-list",
  },
  {
    name: "Appointments",
    to: "doctor-appointments",
    icon: "fa fa-calendar-check",
  },
  {
    name: "Available Timings",
    to: "#",
    icon: "fa fa-clock",
  },
  {
    name: "My Patients",
    to: "#",
    icon: "fa fa-user-injured",
  },
  {
    name: "Specialties & Services",
    to: "#",
    icon: "fa fa-briefcase-medical",
  },
  {
    name: "Reviews",
    to: "#",
    icon: "fa fa-star",
  },
  {
    name: "Accounts",
    to: "#",
    icon: "fa fa-file-invoice-dollar",
  },
  {
    name: "Invoices",
    to: "#",
    icon: "fa fa-file-alt",
  },
  {
    name: "Payout Settings",
    to: "#",
    icon: "fa fa-credit-card",
  },
  {
    name: "Message",
    to: "#",
    icon: "fa fa-comments",
  },
  {
    name: "Profile Settings",
    to: "#",
    icon: "fa fa-user-cog",
  },
  {
    name: "Social Media",
    to: "#",
    icon: "fa fa-share-alt",
  },
  {
    name: "Change Password",
    to: "#",
    icon: "fa fa-key",
  },
  {
    name: "Logout",
    to: "#",
    icon: "fa fa-sign-out-alt",
  },
];

// Helper to determine if a route name is active
function isActive(to) {
  if (to === "#") return false;
  return route.name === to;
}
</script>

<template>
  <div class="doctor-sidebar-container">
    <div class="block shadow-sm border-0 rounded-3 bg-white overflow-hidden">
      <!-- Profile Widget -->
      <div class="text-center border-bottom pb-4 pt-4 px-3">
        <div class="position-relative d-inline-block">
          <img
            class="img-avatar img-avatar96 bg-body-light"
            src="/assets/media/avatars/doctor-profile.png"
            alt="Dr Edalin Hendry"
          />
          <span
            class="position-absolute bottom-0 end-0 p-1 bg-success border border-2 border-white rounded-circle"
            style="width: 15px; height: 15px;"
          ></span>
        </div>
        <h3 class="fs-base fw-bold mt-3 mb-1">Dr Edalin Hendry</h3>
        <p class="fs-sm text-muted mb-2">BDS, MDS - Oral & Maxillofacial Surgery</p>
        <span class="badge bg-success-light text-success rounded-pill px-3 py-1 fs-xs">
          <i class="fa fa-circle text-success me-1" style="font-size: 8px;"></i> Dentist
        </span>
      </div>

      <!-- Availability Selector -->
      <div class="border-bottom text-start pt-4 pb-4 px-3">
        <label class="form-label fs-sm text-muted mb-2">
          Availability <span class="text-danger">*</span>
        </label>
        <select class="form-select form-select-sm border-0 bg-body-light text-dark fw-medium">
          <option>I am Available Now</option>
          <option>Not Available</option>
        </select>
      </div>

      <!-- Navigation Menu -->
      <div class="dashboard-widget p-3">
        <nav class="dashboard-menu">
          <ul class="list-unstyled mb-0">
            <li
              v-for="item in menuItems"
              :key="item.name"
              class="mb-1"
            >
              <RouterLink
                v-if="item.to !== '#'"
                :to="{ name: item.to }"
                class="nav-menu-link d-flex align-items-center py-2 px-3 rounded text-decoration-none"
                :class="{ active: isActive(item.to) }"
              >
                <i :class="[item.icon, 'me-3 fs-sm']"></i>
                <span>{{ item.name }}</span>
              </RouterLink>
              <a
                v-else
                href="#"
                class="nav-menu-link d-flex align-items-center py-2 px-3 rounded text-decoration-none"
              >
                <i :class="[item.icon, 'me-3 fs-sm']"></i>
                <span>{{ item.name }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-menu-link {
  color: #555e69;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}

.nav-menu-link i {
  width: 20px;
  text-align: center;
  color: #7f8c9d;
  transition: all 0.2s ease-in-out;
}

.nav-menu-link:hover {
  background-color: #f7f9fa;
  color: #09e5ab;
}

.nav-menu-link:hover i {
  color: #09e5ab;
}

.nav-menu-link.active {
  background-color: #09e5ab;
  color: #ffffff;
}

.nav-menu-link.active i {
  color: #ffffff;
}
</style>
