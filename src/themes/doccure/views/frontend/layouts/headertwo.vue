<template>
  <header class="header header-trans" v-bind:class="$route.meta.headerClass">
    <div class="container">
      <nav
        class="navbar navbar-expand-lg header-nav"
        v-bind:class="$route.meta.headerNavClass"
      >
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);" @click="toggleSidebar">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <router-link to="/" class="navbar-brand logo" v-if="isHomeFourRoute">
            <img src="@/themes/doccure/assets/img/footer-logo.png" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-if="isHomeThreeRoute">
            <img src="@/themes/doccure/assets/img/logo.svg" class="img-fluid" alt="Logo">
          </router-link>
          <!-- <router-link to="/" class="navbar-brand logo" v-else>
            <img src="@/themes/doccure/assets/img/logo.png" class="img-fluid" alt="Logo" />
          </router-link> -->
        </div>
        <div class="main-menu-wrapper">
          <div class="menu-header">
            <router-link to="/" class="menu-logo">
              <img src="@/themes/doccure/assets/img/logo.png" class="img-fluid" alt="Logo" />
            </router-link>
            <a
              id="menu_close"
              class="menu-close"
              href="javascript:void(0);"
              @click="closeSidebar"
            >
              <i class="fas fa-times"></i>
            </a>
          </div>
          <mainmenu></mainmenu>
        </div>

        <ul class="nav header-navbar-rht" v-if="isHomeTwoRoute">
          <li class="header-theme me-1">
            <layout-dark></layout-dark>
          </li>
          <li class="nav-item">
            <router-link class="nav-link header-login" to="/login"
              >login / Signup
            </router-link>
          </li>
        </ul>
        <ul class="nav header-navbar-rht right-menu" v-else-if="isHomeFour1Route">
          <li class="header-theme me-1">
            <layout-dark></layout-dark>
          </li>
          <li class="nav-item">
            <router-link class="nav-link header-login white-bg" to="/login"
              >login / Signup</router-link
            >
          </li>
        </ul>
        <ul class="nav header-navbar-rht align-items-center" v-else-if="isHomeSixRoute">
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="login-in-fourteen">
            <router-link to="/register"><i class="isax isax-user me-2"></i>Sign Up / </router-link> 
            <router-link to="/login"> Sign In</router-link></li>
        </ul>
        <ul class="nav header-navbar-rht" v-if="isHomeThree">
          <li class="header-theme me-1">
            <layout-dark></layout-dark>
						</li>
						<li class="contact-item"><i class="isax isax-call"></i><span>Contact :</span>+1 315 369 5943</li>
						<li class="nav-item">
							<router-link class="nav-link btn btn-primary header-login d-inline-flex align-items-center" to="/login.html"><i class="isax isax-user-octagon"></i>Login / Sign up </router-link>
						</li>
        </ul>
      </nav>
      <div
        class="sidebar-overlay"
        :class="{ opened: isSidebarOpen }"
        @click="closeSidebar"
      ></div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      document.documentElement.classList.toggle("menu-opened");
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      document.documentElement.classList.remove("menu-opened");
    },
  },
  computed: {
    isHomeTwoRoute() {
      return this.$route.path === "/index-2";
    },
    isHomeThree() {
      return this.$route.path === "/index-3";
    },
    isHomeThreeRoute() {
      return this.$route.path === "/index-3";
    },
    isHomeFourRoute() {
      return this.$route.path === "/index-4" || this.$route.path === "/index-6";
    },
    isHomeFour1Route() {
      return this.$route.path === "/index-4";
    },
    isHomeSixRoute() {
      return this.$route.path === "/index-6";
    },
  },
};
</script>
