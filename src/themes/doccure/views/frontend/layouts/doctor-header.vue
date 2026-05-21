<template>
    <!-- Header -->
    <header class="header header-custom header-fixed inner-header relative">
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
                    <router-link to="/index" class="navbar-brand logo">
                        <img src="@/themes/doccure/assets/img/logo.svg" class="img-fluid" alt="Logo">
                    </router-link>
                </div>
                <div class="header-menu">
                    <div class="main-menu-wrapper">
                        <div class="menu-header">
                            <router-link to="/index" class="menu-logo">
                                <img src="@/themes/doccure/assets/img/logo.svg" class="img-fluid" alt="Logo">
                            </router-link>
                            <a id="menu_close" class="menu-close" @click="closeSidebar" href="javascript:void(0);">
                                <i class="fas fa-times"></i>
                            </a>
                        </div>
                        <mainnav></mainnav>
                    </div>
                    <ul class="nav header-navbar-rht">
                        <li class="searchbar">
                            <a href="javascript:void(0);"><i class="feather-search"></i></a>
                            <div class="togglesearch">
                                <form @submit.prevent="submitFormOne">
                                    <div class="input-group">
                                        <input type="text" class="form-control">
                                        <button type="submit" class="btn">Search</button>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <li class="header-theme noti-nav">
                            <layout-dark></layout-dark>
                        </li>
                        
                        <!-- Notifications -->
                        <li class="nav-item dropdown noti-nav me-3 pe-0">
                            <a href="#" class="dropdown-toggle active-dot active-dot-danger nav-link p-0" data-bs-toggle="dropdown">
                                <i class="isax isax-notification-bing"></i>
                            </a>
                            <div class="dropdown-menu notifications dropdown-menu-end ">
                                <div class="topnav-dropdown-header">
                                    <span class="notification-title">Notifications</span>
                                </div>
                                <div class="noti-content">
                                    <ul class="notification-list">
                                        <li class="notification-message">
                                            <a href="#">
                                                <div class="notify-block d-flex">
                                                    <span class="avatar">
                                                        <img class="avatar-img" alt="Ruby perin" src="@/themes/doccure/assets/img/clients/client-01.jpg">
                                                    </span>
                                                    <div class="media-body">
                                                        <h6>Travis Tremble <span class="notification-time">18.30 PM</span></h6>
                                                        <p class="noti-details">Sent a amount of $210 for his Appointment  <span class="noti-title">Dr.Ruby perin </span></p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="notification-message">
                                            <a href="#">
                                                <div class="notify-block d-flex">
                                                    <span class="avatar">
                                                        <img class="avatar-img" alt="Hendry Watt" src="@/themes/doccure/assets/img/clients/client-02.jpg">
                                                    </span>
                                                    <div class="media-body">
                                                        <h6>Travis Tremble <span class="notification-time">12 Min Ago</span></h6>
                                                        <p class="noti-details"> has booked her appointment to  <span class="noti-title">Dr. Hendry Watt</span></p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="notification-message">
                                            <a href="#">
                                                <div class="notify-block d-flex">
                                                    <div class="avatar">
                                                        <img class="avatar-img" alt="Maria Dyen" src="@/themes/doccure/assets/img/clients/client-03.jpg">
                                                    </div>
                                                    <div class="media-body">
                                                        <h6>Travis Tremble <span class="notification-time">6 Min Ago</span></h6>
                                                        <p class="noti-details"> Sent a amount  $210 for his Appointment   <span class="noti-title">Dr.Maria Dyen</span></p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="notification-message">
                                            <a href="#">
                                                <div class="notify-block d-flex">
                                                    <div class="avatar avatar-sm">
                                                        <img class="avatar-img" alt="client-image" src="@/themes/doccure/assets/img/clients/client-04.jpg">
                                                    </div>
                                                    <div class="media-body">
                                                        <h6>Travis Tremble <span class="notification-time">8.30 AM</span></h6>
                                                        <p class="noti-details"> Send a message to his doctor</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <!-- /Notifications -->

                        <!-- Messages -->
                        <li class="nav-item noti-nav me-3 pe-0">
                            <router-link to="/chat-doctor" class="dropdown-toggle nav-link active-dot active-dot-success p-0">
                                <i class="isax isax-message-2"></i>
                            </router-link>
                        </li>
                        <!-- /Messages -->

                        <!-- Cart -->
                        <li class="nav-item dropdown noti-nav view-cart-header me-3 pe-0">
                            <a href="#" class="dropdown-toggle nav-link active-dot active-dot-purple p-0 position-relative" data-bs-toggle="dropdown">
                                <i class="isax isax-shopping-cart"></i>
                            </a>
                            <div class="dropdown-menu notifications dropdown-menu-end">
                                <div class="shopping-cart">
                                <ul class="shopping-cart-items list-unstyled">
                                    <li class="clearfix">
                                        <div class="close-icon"><i class="fa-solid fa-circle-xmark"></i></div>
                                        <router-link to="/product-description"><img class="avatar-img rounded" src="@/themes/doccure/assets/img/products/product.jpg" alt="User Image"></router-link>
                                        <router-link to="/product-description" class="item-name">Benzaxapine Croplex</router-link>
                                        <span class="item-price">$849.99</span>
                                        <span class="item-quantity">Quantity: 01</span>
                                    </li>

                                    <li class="clearfix">
                                        <div class="close-icon"><i class="fa-solid fa-circle-xmark"></i></div>
                                        <router-link to="/product-description"><img class="avatar-img rounded" src="@/themes/doccure/assets/img/products/product1.jpg" alt="User Image"></router-link>
                                        <router-link to="/product-description" class="item-name">Ombinazol Bonibamol</router-link>
                                        <span class="item-price">$1,249.99</span>
                                        <span class="item-quantity">Quantity: 01</span>
                                    </li>

                                    <li class="clearfix">
                                        <div class="close-icon"><i class="fa-solid fa-circle-xmark"></i></div>
                                        <router-link to="/product-description"><img class="avatar-img rounded" src="@/themes/doccure/assets/img/products/product2.jpg" alt="User Image"></router-link>
                                        <router-link to="/product-description" class="item-name">Dantotate Dantodazole</router-link>
                                        <span class="item-price">$129.99</span>
                                        <span class="item-quantity">Quantity: 01</span>
                                    </li>
                                </ul>
                                <div class="booking-summary pt-3">
                                    <div class="booking-item-wrap">
                                        <ul class="booking-date">
                                            <li>Subtotal <span>$5,877.00</span></li>
                                            <li>Shipping <span>$25.00</span></li>
                                            <li>Tax <span>$0.00</span></li>
                                            <li>Total <span>$5.2555</span></li>
                                        </ul>
                                        <div class="booking-total">
                                            <ul class="booking-total-list text-align">
                                                <li>
                                                    <div class="clinic-booking pt-3">
                                                        <router-link class="apt-btn" to="/cart">View Cart</router-link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="clinic-booking pt-3">
                                                        <router-link class="apt-btn" to="/product-checkout">Checkout</router-link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </li>
                        <!-- /Cart -->

                        <!-- User Menu -->
                        <li class="nav-item dropdown has-arrow logged-item">
                            <a href="#" class="nav-link ps-0" data-bs-toggle="dropdown">
                                <span class="user-img">
                                    <img class="rounded-circle" src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg" width="31" alt="Darren Elder">
                                </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <div class="user-header">
                                    <div class="avatar avatar-sm">
                                        <img src="@/themes/doccure/assets/img/doctors-dashboard/doctor-profile-img.jpg" alt="User Image" class="avatar-img rounded-circle">
                                    </div>
                                    <div class="user-text">
                                        <h6>Dr Edalin Hendry</h6>
                                        <p class="text-muted mb-0">Doctor</p>
                                    </div>
                                </div>
                                <router-link class="dropdown-item" to="/doctor/dashboard">Dashboard</router-link>
                                <router-link class="dropdown-item" to="/doctor-profile-settings">Profile Settings</router-link>
                                <router-link class="dropdown-item" to="/login">Logout</router-link>
                            </div>
                        </li>
                        <!-- /User Menu -->
                    </ul>
                </div>
            </nav>
        </div>
        <div
            class="sidebar-overlay"
            :class="{ opened: isSidebarOpen }"
            @click="closeSidebar"
        ></div>
    </header>
    <!-- /Header -->
</template>


<script>
export default {
    data() {
        return {
            isScrolled: false,
            isSidebarOpen: false,
        }
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
    },
}
</script>