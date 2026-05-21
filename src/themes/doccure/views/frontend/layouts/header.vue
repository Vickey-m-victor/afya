<template>
  <!-- Header -->
  <header
    class="header header-fixed"
    v-if="isHomeOneRoute"
    v-bind:class="{
      'header-custom header-one home-head-one ': true,
      'header-space': isScrolled,
    }"
  >
    <div class="container">
      <nav class="navbar navbar-expand-lg header-nav">
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);" @click="toggleSidebar">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <router-link to="/" class="navbar-brand logo">
            <img src="@/themes/doccure/assets/img/logo.svg" class="img-fluid" alt="Logo" />
          </router-link>
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
          <mainnav></mainnav>
        </div>
        
        <ul class="nav header-navbar-rht" v-if="isHomeAccRoute">
          <li class="searchbar">
            <a href="javascript:void(0);" @click="toggleElement">
              <i class="feather-search"></i>
            </a>
            <div class="togglesearch" v-if="isVisible" @click="handleClick" style="display: block">
              <form @submit.prevent="submitForm">
                <div class="input-group">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </li>
          <li class="header-theme noti-nav">
            <layout-dark></layout-dark>
          </li>
          <li>
            <router-link to="/login" class="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill">
              <i class="isax isax-lock-1 me-1"></i>Sign Up
            </router-link>
          </li>
          <li>
            <router-link to="/register" class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill">
              <i class="isax isax-user-tick me-1"></i>Register
            </router-link>
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-if="isHomeBillRoute">
          <!-- User Menu -->
          <li class="nav-item dropdown has-arrow logged-item">
            <a
              href="javascript:;"
              class="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span class="user-img">
                <img
                  class="rounded-circle"
                  src="@/themes/doccure/assets/img/patients/patient.jpg"
                  width="31"
                  alt="Darren Elder"
                />
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <div class="user-header">
                <div class="avatar avatar-sm">
                  <img
                    src="@/themes/doccure/assets/img/patients/patient.jpg"
                    alt="User Image"
                    class="avatar-img rounded-circle"
                  />
                </div>
                <div class="user-text">
                  <h6>Darren Elder</h6>
                  <p class="text-muted mb-0">Doctor</p>
                </div>
              </div>
              <router-link class="dropdown-item" to="/doctor-dashboard"
                >Dashboard</router-link
              >
              <router-link class="dropdown-item" to="/doctor-profile-settings"
                >Profile Settings</router-link
              >
              <router-link class="dropdown-item" to="/login">Logout</router-link>
            </div>
          </li>
          <!-- /User Menu -->
        </ul>
        <ul class="nav header-navbar-rht" v-if="isHomeprescriptionRoute">
          <!-- User Menu -->
          <li class="nav-item dropdown has-arrow logged-item">
            <a
              href="javascript:;"
              class="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span class="user-img">
                <img
                  class="rounded-circle"
                  src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                  width="31"
                  alt="Darren Elder"
                />
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
              <div class="user-header">
                <div class="avatar avatar-sm">
                  <img
                    src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                    alt="User Image"
                    class="avatar-img rounded-circle"
                  />
                </div>
                <div class="user-text">
                  <h6>Darren Elder</h6>
                  <p class="text-muted mb-0">Doctor</p>
                </div>
              </div>
              <router-link class="dropdown-item" to="/doctor-dashboard"
                >Dashboard</router-link
              >
              <router-link class="dropdown-item" to="/doctor-profile-settings"
                >Profile Settings</router-link
              >
              <router-link class="dropdown-item" to="/login">Logout</router-link>
            </div>
          </li>
          <!-- /User Menu -->
        </ul>
        <ul class="nav header-navbar-rht" v-if="isHomepatientRoute">
          <li class="searchbar">
            <a href="javascript:void(0);" @click="toggleElement">
              <i class="feather-search"></i>
            </a>
            <div class="togglesearch" v-if="isVisible" @click="handleClick" style="display: block">
              <form @submit.prevent="submitForm">
                <div class="input-group">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </li>
          <li class="header-theme noti-nav">
            <layout-dark></layout-dark>
          </li>
          <li>
            <router-link to="/login" class="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill">
              <i class="isax isax-lock-1 me-1"></i>Sign Up
            </router-link>
          </li>
          <li>
            <router-link to="/register" class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill">
              <i class="isax isax-user-tick me-1"></i>Register
            </router-link>
          </li>
        </ul>   
        <ul class="nav header-navbar-rht" v-if="isPharmacy">
          <li class="register-btn" v-if="isHomeOneRoute">
            <router-link to="/register" class="btn btn-dark reg-btn"
              ><i class="isax isax-user"></i>Register</router-link
            >
          </li>
          <li class="register-btn" v-if="isHomeOne1Route">
            <router-link to="/login" class="btn btn-primary log-btn"
              ><i class="isax isax-lock"></i>Login</router-link
            >
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
  <header class="header" v-else-if="isHomePharmacyRoute">
    <div class="container">
      <nav class="navbar navbar-expand-lg header-nav">
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);" @click="toggleSidebar">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <router-link to="/" class="navbar-brand logo">
            <img src="@/themes/doccure/assets/img/logo.png" class="img-fluid" alt="Logo" />
          </router-link>
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
          <mainnav></mainnav>
        </div>
        <ul class="nav header-navbar-rht">
          <li class="header-theme me-1">
            <layout-dark></layout-dark>
          </li>
          <li class="contact-item"><i class="isax isax-call"></i><span>Contact :</span>+1 315 369 5943</li>
          <li class="nav-item">
            <router-link class="nav-link header-login" to="/login"
              >login / Signup
            </router-link>
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
  <header class="header header-custom header-fixed inner-header relative" v-else v-bind:class="$route.meta.headerClass">
    <div class="header-top-wrap" v-if="isHomeThirteen">
      <div class="container">
        <div class="header-top-bar">
          <ul class="header-contact">
            <li><i class="fa-solid fa-envelope"></i>doccure@example.com</li>
            <li>
              <i class="fa-solid fa-location-dot"></i>231 madison Street, NewYork, USA
            </li>
          </ul>
          <ul class="social-icon">
            <li>
              <vue-select :options="Language" id="thriteenlang" placeholder="English" />
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
              <a href="#"><i class="fa-brands fa-twitter"></i></a>
              <a href="#"><i class="fa-brands fa-facebook"></i></a>
              <a href="#"><i class="fa-brands fa-linkedin"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-top-wrap" v-if="isHomeFourteenTop">
      <div class="container">
        <div class="header-top-bar">
          <ul class="header-contact">
            <li>
              <span class="question-mark-icon"><i class="fa-solid fa-question"></i></span
              >Have any Questions?
            </li>
            <li><i class="fa-solid fa-envelope"></i>info@example.com</li>
            <li><i class="fa-solid fa-phone"></i>+1 123 456 8891</li>
          </ul>
          <ul class="social-icon">
            <li>
              <vue-select :options="Language" id="fourteenlang" placeholder="English" />
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
              <a href="#"><i class="fa-brands fa-twitter"></i></a>
              <a href="#"><i class="fa-brands fa-facebook"></i></a>
              <a href="#"><i class="fa-brands fa-linkedin"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-topbar" v-if="isHomeOneTop">
      <div class="container">
        <div class="topbar-info">
          <div class="d-flex align-items-center gap-3 header-info">
            <p><i class="isax isax-message-text5 me-1"></i>info@example.com</p>
            <p><i class="isax isax-call5 me-1"></i>+1 66589 14556</p>
          </div>
          <ul>
            <li class="header-theme">
              <layout-dark></layout-dark>
            </li>
            <li class="d-inline-flex align-items-center drop-header">
              <div class="dropdown dropdown-country me-3">
                <a
                  href="javascript:void(0);"
                  class="d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="@/themes/doccure/assets/img/flags/us-flag.svg" class="me-2" alt="flag" />
                </a>
                <ul class="dropdown-menu p-2 mt-2">
                  <li>
                    <a
                      class="dropdown-item rounded d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <img
                        src="@/themes/doccure/assets/img/flags/us-flag.svg"
                        class="me-2"
                        alt="flag"
                      />ENG
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item rounded d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <img
                        src="@/themes/doccure/assets/img/flags/arab-flag.svg"
                        class="me-2"
                        alt="flag"
                      />ARA
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item rounded d-flex align-items-center"
                      href="javascript:void(0);"
                    >
                      <img
                        src="@/themes/doccure/assets/img/flags/france-flag.svg"
                        class="me-2"
                        alt="flag"
                      />FRA
                    </a>
                  </li>
                </ul>
              </div>
              <div class="dropdown dropdown-amt">
                <a
                  href="javascript:void(0);"
                  class="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  USD
                </a>
                <ul class="dropdown-menu p-2 mt-2">
                  <li>
                    <a class="dropdown-item rounded" href="javascript:void(0);">USD</a>
                  </li>
                  <li>
                    <a class="dropdown-item rounded" href="javascript:void(0);">YEN</a>
                  </li>
                  <li>
                    <a class="dropdown-item rounded" href="javascript:void(0);">EURO</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="social-header">
              <div class="social-icon">
                <a href="javascript:void(0);"><i class="fa-brands fa-facebook"></i></a>
                <a href="javascript:void(0);"><i class="fa-brands fa-x-twitter"></i></a>
                <a href="javascript:void(0);"><i class="fa-brands fa-instagram"></i></a>
                <a href="javascript:void(0);"><i class="fa-brands fa-linkedin"></i></a>
                <a href="javascript:void(0);"><i class="fa-brands fa-pinterest"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="veterinary-top-head" v-if="isHomeSevenRouteOne">
        <ul>
          <li><i class="fa-solid fa-envelope me-2"></i>Doccure@example.com</li>
          <li>
            <i class="fa-solid fa-location-dot me-2"></i>231 madison Street, NewYork,USA
          </li>
        </ul>
        <ul>
          <li>Mon-Fri : 10:00 AM - 09:00PM</li>
          <li>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-facebook"></i></a>
            <a href="#"><i class="fa-brands fa-linkedin"></i></a>
          </li>
        </ul>
      </div>
      <nav class="navbar navbar-expand-lg header-nav">
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);" @click="toggleSidebar">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <router-link to="/" class="navbar-brand logo" v-if="isHomeFive1Route">
            <img src="@/themes/doccure/assets/img/logo.svg" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-else-if="isHomeSevenRoute">
            <img
              src="@/themes/doccure/assets/img/veterinary-home-logo.svg"
              class="img-fluid"
              alt="Logo"
            />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-else-if="isHomeNineRoute">
            <img src="@/themes/doccure/assets/img/logo-01.svg" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-else-if="isHomeTenRoute">
            <img src="@/themes/doccure/assets/img/logo-15.png" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-else-if="isHomeFourteenImg">
            <img src="@/themes/doccure/assets/img/logo-01.svg" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-else-if="isHomeThirteen">
            <img src="@/themes/doccure/assets/img/logo-01.svg" class="img-fluid" alt="Logo" />
          </router-link>
          <router-link to="/" class="navbar-brand logo" v-else>
            <img src="@/themes/doccure/assets/img/logo.png" class="img-fluid" alt="Logo" />
          </router-link>
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
          <mainnav></mainnav>
        </div>
        <ul class="nav header-navbar-rht" v-if="isHomeFiveRoute">
          <li class="header-theme">
            <layout-dark></layout-dark>
          </li>
          <li class="register-btn">
            <router-link to="/login-email" class="btn log-btn"
              ><i class="feather-lock"></i>Login</router-link
            >
          </li>
          <li class="register-btn">
            <router-link to="/signup" class="btn reg-btn"
              ><i class="feather-user"></i>Sign Up</router-link
            >
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeSeven1RouteComputed">
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="login-in-fourteen log-in-vet-head">
            <router-link to="/register"
              ><i class="fa-regular fa-user me-2"></i>Sign Up /
            </router-link>
            <router-link to="/login"> Sign In</router-link>
          </li>
          <li class="searchbar searchbar-fourteen">
            <a href="javascript:void(0);" @click="toggleElement"
              ><i class="feather-search"></i
            ></a>
            <div
              class="togglesearch"
              v-if="isVisible"
              @click="handleClick"
              style="display: block"
            >
              <form @submit.prevent="submitForm">
                <div class="input-group">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeEightRoute">
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="flag-nav">
            <vue-select :options="Language" id="headerlanguage" placeholder="English" />
          </li>
          <li class="login-in">
							<router-link to="/login-email" class="btn btn-primary sign-btn">
                <i class="isax isax-lock"></i>Sign In
              </router-link>
						</li>
						<li class="login-in">
							<router-link to="/signup" class="btn btn-dark reg-btn">
								<i class="isax isax-user"></i>Sign Up
							</router-link>
						</li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeNine1Route">
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="login-link">
            <router-link to="/login-email">Login / Signup</router-link>
          </li>
          <li class="login-in-fourteen">
            <router-link to="/signup" class="btn reg-btn"
              ><i class="feather-user me-2"></i>Log In</router-link
            >
          </li>
          <li class="login-in-fourteen">
            <router-link
              to="/login-email"
              class="btn btn-primary reg-btn reg-btn-fourteen"
              ><i class="feather-user me-2"></i>Sign Up</router-link
            >
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeElevenRoute">
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="login-in-sixteen">
            <router-link to="/login-email" class="btn reg-btn">
              <i class="feather-lock me-2"></i>Login
            </router-link>
          </li>
          <li class="login-in-sixteen">
            <router-link to="/signup" class="btn btn-primary reg-btn reg-btn-sixteen">
              <i class="feather-user me-2"></i>Sign Up
            </router-link>
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeTwelveRoute">
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="login-in-fourteen">
            <router-link to="/login-email" class="btn reg-btn log-btn-twelve"
              >Log In</router-link
            >
          </li>
          <li class="login-in-fourteen">
            <router-link to="/signup" class="reg-btn-thirteen regist-btn"
              ><span>Register</span>
            </router-link>
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeFourteenTop">
          <li class="searchbar">
            <a href="javascript:void(0);" @click="toggleElement"
              ><i class="feather-search"></i
            ></a>
            <div
              class="togglesearch"
              v-if="isVisible"
              @click="handleClick"
              style="display: block"
            >
              <form @submit.prevent="submitFormFourteen">
                <div class="input-group">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </li>
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>
          <li class="register-btn">
            <router-link to="/login-email" class="btn log-btn"
              ><i class="feather-lock"></i>Login</router-link
            >
          </li>
          <li class="register-btn">
            <router-link to="/signup" class="btn reg-btn"
              ><i class="feather-user"></i>Sign Up</router-link
            >
          </li>
        </ul>
        <ul class="nav header-navbar-rht align-items-center" v-else-if="isHomeTenRouteDown">
          <li>
            <span class="header-theme me-3">
              <layout-dark></layout-dark>
            </span>
            <div class="dropdown header-dropdown country-flag">
              <a class="dropdown-toggle nav-tog" data-bs-toggle="dropdown" href="javascript:void(0);">
                <img src="@/themes/doccure/assets/img/flags/us.png" alt="Img">English
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a href="javascript:void(0);" class="dropdown-item">
                  <img src="@/themes/doccure/assets/img/flags/fr.png" alt="Img">French
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  <img src="@/themes/doccure/assets/img/flags/es.png" alt="Img">Spanish
                </a>
                <a href="javascript:void(0);" class="dropdown-item">
                  <img src="@/themes/doccure/assets/img/flags/de.png" alt="Img">German
                </a>
              </div>
            </div>
          </li>
          <li class="searchbar">
            <a href="javascript:void(0);" @click="toggleElement"
              ><i class="feather-search"></i
            ></a>
            <div
              class="togglesearch"
              v-if="isVisible"
              @click="handleClick"
              style="display: block"
            >
              <form @submit.prevent="submitFormFourteen">
                <div class="input-group">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn">Search</button>
                </div>
              </form>
            </div>
          </li>
          <li class="login-in-fourteen">
            <router-link to="/login" class="btn btn-primary reg-btn"><i class="isax isax-lock me-2"></i>Login</router-link>
          </li>
          <li class="login-in-fourteen">
            <router-link to="/register" class="btn btn-dark reg-btn reg-btn-fourteen">
              <i class="isax isax-user me-2"></i>Sign Up
            </router-link>
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-else-if="isHomeThirteen">          
          <li class="searchbar">
            <a href="javascript:void(0);" @click="toggleElement"
              ><i class="feather-search"></i
            ></a>
            <div
              class="togglesearch"
              v-if="isVisible"
              @click="handleClick"
              style="display: block"
            >
              <form @submit.prevent="submitForm">
                <div class="input-group">
                  <input type="text" class="form-control" />
                  <button type="submit" class="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </li>
          <li class="header-theme me-3">
            <layout-dark></layout-dark>
          </li>	
          <li class="register-btn">
            <router-link to="/login-email" class="btn log-btn">
              <i class="feather-lock"></i>Login
            </router-link>
          </li>
          <li class="register-btn">
            <router-link to="/signup" class="btn reg-btn">
              <i class="feather-user"></i>Sign Up
            </router-link>
          </li>
        </ul>
        <ul class="nav header-navbar-rht" v-if="isHomeOneTop">
          <li class="searchbar">
            <a href="javascript:void(0);" @click="toggleElement"><i class="feather-search"></i></a>
            <div class="togglesearch"
              v-if="isVisible"
              @click="handleClick"
              style="display: block"
            >
              <form @submit.prevent="submitFormOne">
                <div class="input-group">
                  <input type="text" class="form-control">
                  <button type="submit" class="btn">Search</button>
                </div>
              </form>
            </div>
          </li>
          <li>
            <router-link to="/login" class="btn btn-md btn-primary-gradient d-inline-flex align-items-center rounded-pill">
              <i class="isax isax-lock-1 me-1"></i>Sign Up
            </router-link>
          </li>
          <li>
            <router-link to="/register" class="btn btn-md btn-dark d-inline-flex align-items-center rounded-pill">
              <i class="isax isax-user-tick me-1"></i>Register
            </router-link>
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
  <!-- /Header -->
</template>
<script>

export default {
  data() {
    return {
      isScrolled: false,
      isSidebarOpen: false,
      isVisible: false,
      Language: ["English", "Japanese"],
    };
  },
  mounted() {
    // Add a scroll event listener when the component is mounted
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    // Remove the scroll event listener when the component is about to be unmounted
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    submitForm() {
      this.$router.push("/doctor-search-list");
    },
    submitFormFourteen() {
      this.$router.push("/search-2");
    },
    submitFormOne() {
      this.$router.push("/search");
    },
    handleScroll() {
      // Get the scroll position
      const scroll = window.scrollY;

      // Update the isScrolled data property based on the scroll position
      this.isScrolled = scroll > 35;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      document.documentElement.classList.toggle("menu-opened");
    },
    closeSidebar() {
      this.isSidebarOpen = false;
      document.documentElement.classList.remove("menu-opened");
    },
    toggleElement() {
      this.isVisible = !this.isVisible;
    },
  },
  computed: {
    isPharmacy() {
      return this.$route.path !== "/pharmacy-details" && 
      this.$route.path !== "/pharmacy-search" &&
      this.$route.path !== "/product-all" &&
      this.$route.path !== "/product-description" &&
      this.$route.path !== "/cart" &&
      this.$route.path !== "/product-checkout" &&
      this.$route.path !== "/payment-success" &&
      this.$route.path !== "/pharmacy-register" &&
      this.$route.path !== "/voice-call" &&
      this.$route.path !== "/video-call";
    },
    isHomePharmacyRoute() {
      return this.$route.path === "/pharmacy-index";
    },
    isHomeOneRoute() {
      return (
        this.$route.path === "/" ||
        this.$route.path === "/about-us" ||
        this.$route.path === "/accounts" ||
        this.$route.path === "/add-billing" ||
        this.$route.path === "/add-prescription" ||
        this.$route.path === "/appointments" ||
        this.$route.path === "/available-timings" ||
        this.$route.path === "/blank-page" ||
        this.$route.path === "/blog-details" ||
        this.$route.path === "/blog-grid" ||
        this.$route.path === "/blog-list" ||
        this.$route.path === "/booking-2" ||
        this.$route.path === "/booking-success" ||
        this.$route.path === "/booking" ||
        this.$route.path === "/cart" ||
        this.$route.path === "/change-password" ||
        this.$route.path === "/chat-doctor" ||
        this.$route.path === "/chat" ||
        this.$route.path === "/checkout" ||
        this.$route.path === "/coming-soon" ||
        this.$route.path === "/components" ||
        this.$route.path === "/contact-us" ||
        this.$route.name == "hospitals" ||
        this.$route.name == "speciality" ||
        this.$route.name == "clinic" ||
        this.$route.path === "/dependent" ||
        this.$route.path === "/doctor-add-blog" ||
        this.$route.path === "/doctor-blog" ||
        this.$route.path === "/doctor-change-password" ||
        this.$route.path === "/doctor-dashboard" ||
        this.$route.path === "/doctor-payment" ||
        this.$route.path === "/doctor-pending-blog" ||
        this.$route.path === "/doctor-profile-settings" ||
        this.$route.path === "/doctor-experience-settings" ||
        this.$route.path === "/doctor-education-settings" ||
        this.$route.path === "/doctor-awards-settings" ||
        this.$route.path === "/doctor-insurance-settings" ||
        this.$route.path === "/doctor-clinics-settings" ||
        this.$route.path === "/doctor-business-settings" ||
        this.$route.path === "/doctor-specialities" ||
        this.$route.path === "/doctor-profile" ||
        this.$route.path === "/doctor-profile-2" ||
        this.$route.path === "/doctor-register" ||
        this.$route.path === "/doctor-grid" ||
        this.$route.path === "/doctor-signup" ||
        this.$route.path === "/edit-billing" ||
        this.$route.path === "/edit-blog" ||
        this.$route.path === "/edit-prescription" ||
        this.$route.path === "/error-404" ||
        this.$route.path === "/error-500" ||
        this.$route.path === "/faq" ||
        this.$route.path === "/favourites" ||
        this.$route.path === "/forgot-password" ||
        this.$route.path === "/forgot-password2" ||
        this.$route.path === "/invoice-view" ||
        this.$route.path === "/invoices" ||
        this.$route.path === "/login-email-otp" ||
        this.$route.path === "/login-email" ||
        this.$route.path === "/login-phone-otp" ||
        this.$route.path === "/login" ||
        this.$route.path === "/maintenance" ||
        this.$route.path === "/map-grid" ||
        this.$route.path === "/map-list" ||
        this.$route.path === "/medical-details" ||
        this.$route.path === "/medical-records" ||
        this.$route.path === "/mobile-otp" ||
        this.$route.path === "/my-patients" ||
        this.$route.path === "/orders-list" ||
        this.$route.path === "/patient-invoices" ||
        this.$route.path === "/patient-accounts" ||
        this.$route.path === "/patient-dashboard" ||
        this.$route.path === "/patient-profile" ||
        this.$route.path === "/patient-signup" ||
        this.$route.path === "/payment-success" ||
        this.$route.path === "/pharmacy-details" ||
        this.$route.path === "/pharmacy-register" ||
        this.$route.path === "/pricing" ||
        this.$route.path === "/privacy-policy" ||
        this.$route.path === "/product-all" ||
        this.$route.path === "/product-checkout" ||
        this.$route.path === "/product-description" ||
        this.$route.path === "/profile-settings" ||
        this.$route.path === "/register" ||
        this.$route.path === "/reviews" ||
        this.$route.path === "/available-timings" ||
        this.$route.path === "/search-2" ||
        this.$route.path === "/search" ||
        this.$route.path === "/signup-success" ||
        this.$route.path === "/social-media" ||
        this.$route.path === "/terms-condition" ||
        this.$route.path === "/video-call" ||
        this.$route.path === "/voice-call" ||
        this.$route.path === "/pharmacy-search" ||
        this.$route.path === "/email-otp" ||
        this.$route.path === "/login-phone" ||
        this.$route.path === "/doctor-upcoming-appointment" ||
        this.$route.path === "/doctor-appointment-start" ||
        this.$route.path === "/doctor-cancelled-appointment" ||
        this.$route.path === "/doctor-cancelled-appointment-2" ||
        this.$route.path === "/doctor-completed-appointment" ||
        this.$route.path === "/doctor-appointments-grid" ||
        this.$route.path === "/doctor-request" ||
        this.$route.path === "/patient-appointments" ||
        this.$route.path === "/patient-upcoming-appointment" ||
        this.$route.path === "/patient-cancelled-appointment" ||
        this.$route.path === "/patient-completed-appointment"
      );
    },
    isHomeprescriptionRoute() {
      return (
        this.$route.path === "/add-prescription" ||
        this.$route.path === "/edit-blog" ||
        this.$route.path === "/edit-prescription"
      );
    },
    isHomeBillRoute() {
      return this.$route.path === "/add-billing" || this.$route.path === "/edit-billing";
    },
    isHomeAccRoute() {
      return (
        this.$route.path === "/accounts" ||
        this.$route.path === "/appointments" ||
        this.$route.path === "/available-timings" ||
        this.$route.path === "/chat-doctor" ||
        this.$route.path === "/doctor-add-blog" ||
        this.$route.path === "/doctor-blog" ||
        this.$route.path === "/doctor-change-password" ||
        this.$route.path === "/doctor-dashboard" ||
        this.$route.path === "/doctor-payment" ||
        this.$route.path === "/doctor-pending-blog" ||
        this.$route.path === "/doctor-profile-settings" ||
        this.$route.path === "/doctor-experience-settings" ||
        this.$route.path === "/doctor-education-settings" ||
        this.$route.path === "/doctor-awards-settings" ||
        this.$route.path === "/doctor-insurance-settings" ||
        this.$route.path === "/doctor-clinics-settings" ||
        this.$route.path === "/doctor-business-settings" ||
        this.$route.path === "/doctor-specialities" ||
        this.$route.path === "/patient-invoices" ||
        this.$route.path === "/invoice-view" ||
        this.$route.path === "/invoices" ||
        this.$route.path === "/my-patients" ||
        this.$route.path === "/patient-profile" ||
        this.$route.path === "/reviews" ||
        this.$route.path === "/available-timings" ||
        this.$route.path === "/social-media" ||
        this.$route.path === "/video-call" ||
        this.$route.path === "/doctor-upcoming-appointment" ||
        this.$route.path === "/doctor-appointment-start" ||
        this.$route.path === "/doctor-cancelled-appointment" ||
        this.$route.path === "/doctor-cancelled-appointment-2" ||
        this.$route.path === "/doctor-completed-appointment" ||
        this.$route.path === "/doctor-appointments-grid" ||
        this.$route.path === "/doctor-request" ||
        this.$route.path === "/patient-appointments" ||
        this.$route.path === "/patient-upcoming-appointment" ||
        this.$route.path === "/patient-cancelled-appointment" ||
        this.$route.path === "/patient-completed-appointment"
      );
    },
    isHomepatientRoute() {
      return (
        this.$route.path === "/booking-2" ||
        this.$route.path === "/booking-success" ||
        this.$route.path === "/booking" ||
        this.$route.path === "/cart" ||
        this.$route.path === "/change-password" ||
        this.$route.path === "/chat" ||
        this.$route.path === "/checkout" ||
        this.$route.path === "/dependent" ||
        this.$route.path === "/doctor-profile" ||
        this.$route.path === "/doctor-profile-2" ||
        this.$route.path === "/favourites" ||
        this.$route.path === "/medical-details" ||
        this.$route.path === "/medical-records" ||
        this.$route.path === "/orders-list" ||
        this.$route.path === "/patient-accounts" ||
        this.$route.path === "/patient-dashboard" ||
        this.$route.path === "/payment-success" ||
        this.$route.path === "/pharmacy-details" ||
        this.$route.path === "/pharmacy-register" ||
        this.$route.path === "/product-all" ||
        this.$route.path === "/product-checkout" ||
        this.$route.path === "/product-description" ||
        this.$route.path === "/profile-settings" ||
        this.$route.path === "/voice-call" ||
        this.$route.path === "/pharmacy-search"
      );
    },
    isHomeOne1Route() {
      return (
        this.$route.path === "/" ||
        this.$route.path === "/about-us" ||
        this.$route.path === "/blank-page" ||
        this.$route.path === "/blog-details" ||
        this.$route.path === "/blog-grid" ||
        this.$route.path === "/blog-list" ||
        this.$route.path === "/coming-soon" ||
        this.$route.path === "/components" ||
        this.$route.path === "/contact-us" ||
        this.$route.name == "hospitals" ||
        this.$route.name == "speciality" ||
        this.$route.name == "clinic" ||
        this.$route.path === "/doctor-register" ||
        this.$route.path === "/doctor-grid" ||
        this.$route.path === "/doctor-signup" ||
        this.$route.path === "/error-404" ||
        this.$route.path === "/error-500" ||
        this.$route.path === "/faq" ||
        this.$route.path === "/forgot-password" ||
        this.$route.path === "/forgot-password2" ||
        this.$route.path === "/login-email-otp" ||
        this.$route.path === "/login-email" ||
        this.$route.path === "/login-phone-otp" ||
        this.$route.path === "/login" ||
        this.$route.path === "/maintenance" ||
        this.$route.path === "/map-grid" ||
        this.$route.path === "/map-list" ||
        this.$route.path === "/mobile-otp" ||
        this.$route.path === "/patient-signup" ||
        this.$route.path === "/pharmacy-register" ||
        this.$route.path === "/pricing" ||
        this.$route.path === "/privacy-policy" ||
        this.$route.path === "/register" ||
        this.$route.path === "/search-2" ||
        this.$route.path === "/search" ||
        this.$route.path === "/signup-success" ||
        this.$route.path === "/terms-condition" ||
        this.$route.path === "/email-otp" ||
        this.$route.path === "/login-phone"
      );
    },
    isHomeFiveRoute() {
      return this.$route.path === "/index-5";
    },
    isHomeTwelveRoute() {
      return this.$route.path === "/index-12";
    },
    isHomeFive1Route() {
      return this.$route.path === "/index-5";
    },
    isHomeSevenRoute() {
      return this.$route.path === "/index-7";
    },
    isHomeSevenRouteOne() {
      return this.$route.path === "/index-7";
    },
    isHomeSeven1RouteComputed() {
      return this.$route.path === "/index-7";
    },
    isHomeEightRoute() {
      return this.$route.path === "/index-8";
    },
    isHomeNineRoute() {
      return this.$route.path === "/index-9";
    },
    isHomeNine1Route() {
      return this.$route.path === "/index-9";
    },
    isHomeTenRoute() {
      return this.$route.path === "/index-10" || this.$route.path === "/index-11";
    },
    isHomeTenRouteDown() {
      return this.$route.path === "/index-10";
    },
    isHomeElevenRoute() {
      return this.$route.path === "/index-11";
    },
    isHomeFourteenTop() {
      return this.$route.path === "/index-14";
    },
    isHomeOneTop() {
      return this.$route.path === "/index";
    },
    isHomeThirteen() {
      return this.$route.path === "/index-13";
    },
    isHomeFourteenImg() {
      return this.$route.path === "/index-14";
    },
  },
};
</script>
