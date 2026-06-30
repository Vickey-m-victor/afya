<template>
  <div class="bg-body-light">
    <!-- Breadcrumb Area -->
    <DoctorBreadcrumb title="Appointments" :items="breadcrumbItems" />

    <!-- Main Content -->
    <div class="content content-boxed pb-5 mt-4">
      <div class="row">
        <!-- Profile Sidebar -->
        <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
          <div class="stickysidebar">
            <DoctorSidebar />
          </div>
        </div>

        <!-- Appointments Container -->
        <div class="col-md-7 col-lg-8 col-xl-9">
          <div class="dashboard-header mb-4 pb-2 border-bottom d-flex align-items-center justify-content-between flex-wrap">
            <h3 class="mb-0 text-dark fw-bold">Appointments</h3>
            <ul class="header-list-btns d-flex align-items-center list-unstyled mb-0 gap-2">
              <li class="mb-0">
                <div class="dash-search-input position-relative">
                  <input type="text" class="form-control ps-5 py-1" style="height: 36px; min-width: 220px;" placeholder="Search" />
                  <i class="fa fa-search position-absolute text-muted" style="left: 16px; top: 50%; transform: translateY(-50%);"></i>
                </div>
              </li>
              <li class="mb-0">
                <div class="view-icons d-flex gap-1">
                  <a href="javascript:void(0)" class="btn btn-outline-secondary active border-0 bg-light-blue shadow-none" style="padding: 6px 12px; height: 36px;"><i class="fa fa-list"></i></a>
                  <a href="javascript:void(0)" class="btn btn-outline-secondary border-0 shadow-none" style="padding: 6px 12px; height: 36px;"><i class="fa fa-th-large"></i></a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Tabs Area -->
          <div class="appointment-tab-head d-flex justify-content-between align-items-center flex-wrap mb-4">
            <div class="appointment-tabs">
              <ul class="nav available-nav d-flex list-unstyled mb-0 gap-2" role="tablist">
                <li class="nav-item">
                  <a
                    href="javascript:void(0)"
                    class="nav-link px-3 py-2 rounded"
                    :class="{ active: activeTab === 'upcoming' }"
                    @click="activeTab = 'upcoming'"
                  >
                    Upcoming <span class="badge ms-2">8</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="javascript:void(0)"
                    class="nav-link px-3 py-2 rounded"
                    :class="{ active: activeTab === 'cancelled' }"
                    @click="activeTab = 'cancelled'"
                  >
                    Cancelled <span class="badge ms-2">8</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="javascript:void(0)"
                    class="nav-link px-3 py-2 rounded"
                    :class="{ active: activeTab === 'completed' }"
                    @click="activeTab = 'completed'"
                  >
                    Completed <span class="badge ms-2">8</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Tab Contents -->
          <div class="tab-content appointment-tab-content">
            <div v-show="activeTab === 'upcoming'">
              <Upcoming />
            </div>
            <div v-show="activeTab === 'cancelled'">
              <Cancelled />
            </div>
            <div v-show="activeTab === 'completed'">
              <Completed />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DoctorSidebar from '../components/DoctorSidebar.vue';
import DoctorBreadcrumb from '../components/DoctorBreadcrumb.vue';
import Upcoming from '../components/appointments/Upcoming.vue';
import Cancelled from '../components/appointments/Cancelled.vue';
import Completed from '../components/appointments/Completed.vue';

const activeTab = ref('upcoming');

const breadcrumbItems = [
  { name: 'Home', route: '/' },
  { name: 'Doctor', route: '/doctor/dashboard' },
  { name: 'Appointments', route: null }
];
</script>

<style scoped>
.dashboard-header h3 {
  font-size: 22px;
  color: #1e293b;
}

.appointment-tabs .nav-link {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #475569;
  font-weight: 500;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.appointment-tabs .nav-link span.badge {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 10px;
  padding: 3px 6px;
}

.appointment-tabs .nav-link.active,
.appointment-tabs .nav-link:hover {
  background: #0665d0;
  color: #fff;
  border-color: #0665d0;
}

.appointment-tabs .nav-link.active span.badge {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border-color: transparent;
}

.view-icons a.active {
  background-color: #e0f2fe !important;
  color: #0284c7 !important;
}
</style>
