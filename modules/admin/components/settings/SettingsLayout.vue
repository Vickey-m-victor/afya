<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const menuItems = [
  {
    label: "General",
    icon: "fa-cog",
    route: "/admin/settings/general",
    name: "admin/settings/general",
  },
  {
    label: "Mailer",
    icon: "fa-envelope",
    route: "/admin/settings/mailer",
    name: "admin/settings/mailer",
  },
  {
    label: "Privacy & Security",
    icon: "fa-shield-alt",
    route: "/admin/settings/security",
    name: "admin/settings/security",
  },
  {
    label: "Theme & Appearance",
    icon: "fa-palette",
    route: "/admin/settings/theme",
    name: "admin/settings/theme",
  },
];

const isActive = (item) => route.path === item.route;

const activeItem = computed(() => {
  return menuItems.find((item) => isActive(item)) || menuItems[0];
});
</script>

<template>
  <div class="content">
    <!-- Page Heading -->
    <div class="mb-2">
      <h1 class="h3 fw-bold mb-1">
        <i class="fa fa-sliders-h text-primary me-2"></i>
        Settings
      </h1>
      <!-- <p class="text-muted fs-sm mb-0">Manage your application configuration and preferences</p> -->
    </div>

    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb breadcrumb-alt bg-transparent p-0 mb-0">
        <li class="breadcrumb-item">
          <router-link
            class="text-primary fw-medium"
            to="/admin/settings/general"
          >
            System Settings
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ activeItem.label }}
        </li>
      </ol>
    </nav>

    <!-- Settings Block -->
    <div class="block block-rounded">
      <!-- Tab Navigation -->
      <div class="block-header block-header-default">
        <ul class="nav nav-tabs nav-tabs-block" role="tablist">
          <li
            v-for="item in menuItems"
            :key="item.name"
            class="nav-item"
          >
            <router-link
              :to="item.route"
              class="nav-link"
              :class="{ active: isActive(item) }"
            >
              <i class="fa me-1 opacity-75" :class="item.icon"></i>
              <span class="d-none d-sm-inline">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Tab Content -->
      <div class="block-content block-content-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-tabs-block .nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 12px 18px;
  border: none;
  color: #6c757d;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.nav-tabs-block .nav-link:hover {
  color: #3b7ddd;
  background-color: rgba(59, 125, 221, 0.04);
}

.nav-tabs-block .nav-link.active {
  color: #3b7ddd;
  background-color: #fff;
  border-bottom: 2px solid #3b7ddd;
}

.nav-tabs-block .nav-link i {
  font-size: 0.8rem;
}

.block-content-full {
  padding: 28px;
}

@media (max-width: 575.98px) {
  .nav-tabs-block .nav-link {
    padding: 10px 12px;
    font-size: 0.8rem;
  }

  .block-content-full {
    padding: 18px;
  }
}
</style>
