<script setup>
import { reactive, ref } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import VueApexCharts from "vue3-apexcharts";
import DoctorSidebar from "../components/DoctorSidebar.vue";

// Chart data
const revenueChartOptions = {
  chart: {
    type: "bar",
    height: 220,
    stacked: true,
    toolbar: { show: false }
  },
  colors: ['#0E82FD'],
  plotOptions: {
    bar: { columnWidth: '50%', borderRadius: 4 }
  },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  grid: {
    show: false
  },
  dataLabels: { enabled: false }
};

const revenueChartSeries = [{
  name: "Revenue",
  data: [50, 40, 15, 45, 35, 48, 65]
}];

const appointmentChartOptions = {
  chart: {
    type: "bar",
    height: 220,
    stacked: true,
    toolbar: { show: false }
  },
  colors: ['#0F172A'],
  plotOptions: {
    bar: { columnWidth: '50%', borderRadius: 4 }
  },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  grid: {
    show: false
  },
  dataLabels: { enabled: false }
};

const appointmentChartSeries = [{
  name: "Appointments",
  data: [40, 20, 30, 65, 85, 35, 90]
}];

// Mockup data for new widgets
const recentPatients = [
  {
    id: "P0001",
    name: "Adrian Marshall",
    avatar: "/assets/media/avatars/patient1.png",
    lastAppointment: "15 Mar 2024"
  },
  {
    id: "P0002",
    name: "Kelly Stevens",
    avatar: "/assets/media/avatars/patient2.png",
    lastAppointment: "13 Mar 2024"
  }
];

const recentInvoices = [
  {
    id: "#Apt0001",
    name: "Adrian",
    avatar: "/assets/media/avatars/patient1.png",
    amount: "$450",
    paidOn: "11 Nov 2024"
  },
  {
    id: "#Apt0002",
    name: "Kelly",
    avatar: "/assets/media/avatars/patient2.png",
    amount: "$500",
    paidOn: "10 Nov 2024"
  },
  {
    id: "#Apt0003",
    name: "Samuel",
    avatar: "/assets/media/avatars/patient3.png",
    amount: "$320",
    paidOn: "03 Nov 2024"
  },
  {
    id: "#Apt0004",
    name: "Catherine",
    avatar: "/assets/media/avatars/patient4.png",
    amount: "$240",
    paidOn: "01 Nov 2024"
  },
  {
    id: "#Apt0005",
    name: "Robert",
    avatar: "/assets/media/avatars/patient5.png",
    amount: "$380",
    paidOn: "28 Oct 2024"
  }
];

const notifications = [
  {
    type: "booking",
    icon: "fa fa-bell",
    color: "violet",
    message: "Booking Confirmed on ",
    dateInfo: "21 Mar 2024 10:30 AM",
    timeAgo: "Just Now"
  },
  {
    type: "review",
    icon: "fa fa-star",
    color: "blue",
    message: "You have a New Review for your Appointment",
    dateInfo: "",
    timeAgo: "5 Days ago"
  },
  {
    type: "appointment",
    icon: "fa fa-calendar-check",
    color: "red",
    message: "You have Appointment with Ahmed by 01:20 PM",
    dateInfo: "",
    timeAgo: "12:55 PM"
  },
  {
    type: "payment",
    icon: "fa fa-money-bill-wave",
    color: "yellow",
    message: "Sent an amount of $200 for an Appointment by 01:20 PM",
    dateInfo: "",
    timeAgo: "2 Days ago"
  },
  {
    type: "review",
    icon: "fa fa-star",
    color: "blue",
    message: "You have a New Review for your Appointment",
    dateInfo: "",
    timeAgo: "5 Days ago"
  }
];

const clinics = [
  {
    name: "Sofi’s Clinic",
    charge: "$900",
    avatar: "/assets/media/photos/clinic-02.jpg",
    schedule: [
      { day: "Tue", time: "07:00 AM - 09:00 PM" },
      { day: "Wed", time: "07:00 AM - 09:00 PM" }
    ]
  },
  {
    name: "The Family Dentistry Clinic",
    charge: "$600",
    avatar: "/assets/media/photos/clinic-01.jpg",
    schedule: [
      { day: "Sat", time: "07:00 AM - 09:00 PM" },
      { day: "Tue", time: "07:00 AM - 09:00 PM" }
    ]
  }
];
</script>

<template>
  <!-- Page Content -->
  <div class="bg-body-light">
    <!-- Breadcrumb Area -->
    <div class="custom-breadcrumb-bar border-bottom">
      <div class="content content-full py-4 text-center">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center mb-2">
            <li class="breadcrumb-item"><a href="javascript:void(0)" class="text-primary"><i class="fa fa-home"></i></a></li>
            <li class="breadcrumb-item"><a href="javascript:void(0)" class="text-primary">Doctor</a></li>
            <li class="breadcrumb-item active text-dark fw-medium" aria-current="page">Dashboard</li>
          </ol>
        </nav>
        <h1 class="h2 fw-bold mb-0 text-dark" style="color: #0c1a52 !important;">Dashboard</h1>
      </div>
      <div class="breadcrumb-bg">
        <img src="/assets/media/photos/breadcrumb-bg-01.png" alt="img" class="breadcrumb-bg-01" />
        <img src="/assets/media/photos/breadcrumb-bg-02.png" alt="img" class="breadcrumb-bg-02" />
        <img src="/assets/media/photos/breadcrumb-icon.png" alt="img" class="breadcrumb-bg-03" />
        <img src="/assets/media/photos/breadcrumb-icon.png" alt="img" class="breadcrumb-bg-04" />
      </div>
    </div>

    <!-- Main Content -->
    <div class="content content-boxed pb-5 mt-4">
      <div class="row">
        <!-- Profile Sidebar -->
        <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
          <div class="stickysidebar">
            <DoctorSidebar />
          </div>
        </div>

        <!-- Dashboard Widgets -->
        <div class="col-md-7 col-lg-8 col-xl-9">
          <div class="row">
            <!-- Stat Cards -->
            <div class="col-xl-4 d-flex flex-column">
              <!-- Total Patient -->
              <BaseBlock class="flex-grow-1 shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-content block-content-full d-flex align-items-center justify-content-between h-100">
                  <div>
                    <p class="fs-sm fw-medium text-muted mb-1">Total Patient</p>
                    <p class="fs-3 fw-bold text-dark mb-1">978</p>
                    <p class="fs-xs fw-semibold text-success mb-0"><i class="fa fa-arrow-up"></i> 15% From Last Week</p>
                  </div>
                  <div class="item item-rounded bg-body-light rounded-circle" style="width: 50px; height: 50px;">
                    <i class="fa fa-user-injured text-secondary fs-4"></i>
                  </div>
                </div>
              </BaseBlock>
              
              <!-- Patients Today -->
              <BaseBlock class="flex-grow-1 shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-content block-content-full d-flex align-items-center justify-content-between h-100">
                  <div>
                    <p class="fs-sm fw-medium text-muted mb-1">Patients Today</p>
                    <p class="fs-3 fw-bold text-dark mb-1">80</p>
                    <p class="fs-xs fw-semibold text-danger mb-0"><i class="fa fa-arrow-up"></i> 15% From Yesterday</p>
                  </div>
                  <div class="item item-rounded bg-body-light rounded-circle" style="width: 50px; height: 50px;">
                    <i class="fa fa-user-clock text-secondary fs-4"></i>
                  </div>
                </div>
              </BaseBlock>

              <!-- Appointments Today -->
              <BaseBlock class="flex-grow-1 shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-content block-content-full d-flex align-items-center justify-content-between h-100">
                  <div>
                    <p class="fs-sm fw-medium text-muted mb-1">Appointments Today</p>
                    <p class="fs-3 fw-bold text-dark mb-1">50</p>
                    <p class="fs-xs fw-semibold text-success mb-0"><i class="fa fa-arrow-up"></i> 20% From Yesterday</p>
                  </div>
                  <div class="item item-rounded bg-body-light rounded-circle" style="width: 50px; height: 50px;">
                    <i class="fa fa-calendar-alt text-secondary fs-4"></i>
                  </div>
                </div>
              </BaseBlock>
            </div>

            <!-- Appointments List -->
            <div class="col-xl-8 d-flex flex-column">
              <BaseBlock class="w-100 flex-grow-1 shadow-sm border border-light mb-4 rounded-3 bg-white">
                <template #title>
                  <h3 class="block-title fw-bold text-dark fs-5">Appointment</h3>
                </template>
                <template #options>
                  <div class="dropdown">
                    <button type="button" class="btn btn-sm btn-alt-secondary bg-transparent border dropdown-toggle fw-medium text-dark" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Last 7 Days
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="javascript:void(0)">Today</a>
                      <a class="dropdown-item" href="javascript:void(0)">This Month</a>
                      <a class="dropdown-item" href="javascript:void(0)">Last 7 Days</a>
                    </div>
                  </div>
                </template>
                
                <div class="block-content p-0 pb-3">
                  <div class="table-responsive">
                    <table class="table table-vcenter table-hover table-borderless mb-0">
                      <tbody>
                        <tr class="border-bottom border-light">
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <img class="img-avatar img-avatar48 me-3 bg-body-light p-1" src="/assets/media/avatars/patient1.png" alt="Avatar" style="object-fit: cover; border-radius: 8px;">
                              <div>
                                <span class="fs-xs fw-medium text-primary">#Apt0001</span>
                                <h5 class="fs-sm fw-bold mb-0 text-dark"><a href="javascript:void(0)" class="text-dark">Adrian Marshall</a></h5>
                              </div>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs fw-medium">
                              <h6 class="mb-1 fw-bold text-dark fs-sm">11 Nov 2024 <span class="text-muted fw-normal ms-1">10.45 AM</span></h6>
                              <span class="badge bg-primary px-2 py-1 rounded-1 fw-semibold">General</span>
                            </div>
                          </td>
                          <td class="text-end pe-4 py-3">
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-success rounded-circle me-1 border-0 bg-success-light text-success shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-check"></i>
                            </a>
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-danger rounded-circle border-0 bg-danger-light text-danger shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        <tr class="border-bottom border-light">
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <img class="img-avatar img-avatar48 me-3 bg-body-light p-1" src="/assets/media/avatars/patient2.png" alt="Avatar" style="object-fit: cover; border-radius: 8px;">
                              <div>
                                <span class="fs-xs fw-medium text-primary">#Apt0002</span>
                                <h5 class="fs-sm fw-bold mb-0 text-dark"><a href="javascript:void(0)" class="text-dark">Kelly Stevens</a></h5>
                              </div>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs fw-medium">
                              <h6 class="mb-1 fw-bold text-dark fs-sm">10 Nov 2024 <span class="text-muted fw-normal ms-1">11.00 AM</span></h6>
                              <span class="badge bg-info px-2 py-1 rounded-1 fw-semibold">Clinic Consulting</span>
                            </div>
                          </td>
                          <td class="text-end pe-4 py-3">
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-success rounded-circle me-1 border-0 bg-success-light text-success shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-check"></i>
                            </a>
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-danger rounded-circle border-0 bg-danger-light text-danger shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        <tr class="border-bottom border-light">
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <img class="img-avatar img-avatar48 me-3 bg-body-light p-1" src="/assets/media/avatars/patient3.png" alt="Avatar" style="object-fit: cover; border-radius: 8px;">
                              <div>
                                <span class="fs-xs fw-medium text-primary">#Apt0003</span>
                                <h5 class="fs-sm fw-bold mb-0 text-dark"><a href="javascript:void(0)" class="text-dark">Samuel Anderson</a></h5>
                              </div>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs fw-medium">
                              <h6 class="mb-1 fw-bold text-dark fs-sm">03 Nov 2024 <span class="text-muted fw-normal ms-1">02.00 PM</span></h6>
                              <span class="badge bg-primary px-2 py-1 rounded-1 fw-semibold">General</span>
                            </div>
                          </td>
                          <td class="text-end pe-4 py-3">
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-success rounded-circle me-1 border-0 bg-success-light text-success shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-check"></i>
                            </a>
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-danger rounded-circle border-0 bg-danger-light text-danger shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        <tr class="border-bottom border-light">
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <img class="img-avatar img-avatar48 me-3 bg-body-light p-1" src="/assets/media/avatars/patient4.png" alt="Avatar" style="object-fit: cover; border-radius: 8px;">
                              <div>
                                <span class="fs-xs fw-medium text-primary">#Apt0004</span>
                                <h5 class="fs-sm fw-bold mb-0 text-dark"><a href="javascript:void(0)" class="text-dark">Catherine Griffin</a></h5>
                              </div>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs fw-medium">
                              <h6 class="mb-1 fw-bold text-dark fs-sm">01 Nov 2024 <span class="text-muted fw-normal ms-1">04.00 PM</span></h6>
                              <span class="badge bg-info px-2 py-1 rounded-1 fw-semibold">Clinic Consulting</span>
                            </div>
                          </td>
                          <td class="text-end pe-4 py-3">
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-success rounded-circle me-1 border-0 bg-success-light text-success shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-check"></i>
                            </a>
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-danger rounded-circle border-0 bg-danger-light text-danger shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <img class="img-avatar img-avatar48 me-3 bg-body-light p-1" src="/assets/media/avatars/patient5.png" alt="Avatar" style="object-fit: cover; border-radius: 8px;">
                              <div>
                                <span class="fs-xs fw-medium text-primary">#Apt0005</span>
                                <h5 class="fs-sm fw-bold mb-0 text-dark"><a href="javascript:void(0)" class="text-dark">Robert Hutchinson</a></h5>
                              </div>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs fw-medium">
                              <h6 class="mb-1 fw-bold text-dark fs-sm">28 Oct 2024 <span class="text-muted fw-normal ms-1">05.30 PM</span></h6>
                              <span class="badge bg-primary px-2 py-1 rounded-1 fw-semibold">General</span>
                            </div>
                          </td>
                          <td class="text-end pe-4 py-3">
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-success rounded-circle me-1 border-0 bg-success-light text-success shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-check"></i>
                            </a>
                            <a href="javascript:void(0)" class="btn btn-sm btn-alt-danger rounded-circle border-0 bg-danger-light text-danger shadow-none" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </BaseBlock>
            </div>
          </div>

          <div class="row mt-2">
            <!-- Left Column of Main Area -->
            <div class="col-xl-6">
              <!-- Weekly Overview -->
              <BaseBlock class="w-100 shadow-sm border border-light mb-4 rounded-3 bg-white">
                <template #title>
                  <h3 class="block-title fw-bold text-dark fs-5">Weekly Overview</h3>
                </template>
                <template #options>
                  <span class="fs-xs fw-bold text-dark">Mar 14 - Mar 21</span>
                </template>
                
                <div class="block-content block-content-full">
                  <ul class="nav nav-pills nav-justified mb-4 border-bottom pb-3" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active fw-semibold" id="revenue-tab" data-bs-toggle="pill" data-bs-target="#revenue-content" type="button" role="tab" aria-selected="true">Revenue</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link fw-semibold text-muted" id="appointment-tab" data-bs-toggle="pill" data-bs-target="#appointment-content" type="button" role="tab" aria-selected="false">Appointments</button>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane fade show active" id="revenue-content" role="tabpanel" aria-labelledby="revenue-tab">
                      <VueApexCharts type="bar" height="220" :options="revenueChartOptions" :series="revenueChartSeries"></VueApexCharts>
                    </div>
                    <div class="tab-pane fade" id="appointment-content" role="tabpanel" aria-labelledby="appointment-tab">
                      <VueApexCharts type="bar" height="220" :options="appointmentChartOptions" :series="appointmentChartSeries"></VueApexCharts>
                    </div>
                  </div>
                </div>
              </BaseBlock>

              <!-- Recent Patients -->
              <div class="block shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-header border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                  <h3 class="block-title fw-bold text-dark fs-5 mb-0">Recent Patients</h3>
                  <a href="#" class="fs-xs fw-semibold text-primary">View All</a>
                </div>
                <div class="block-content p-4">
                  <div class="row g-3">
                    <div v-for="patient in recentPatients" :key="patient.id" class="col-sm-6">
                      <div class="border rounded p-3 text-center bg-body-light d-flex flex-column align-items-center position-relative">
                        <img :src="patient.avatar" class="img-avatar img-avatar80 bg-white shadow-sm mb-3" alt="Patient Image" style="object-fit: cover; border-radius: 8px;">
                        <h5 class="fs-sm fw-bold text-dark mb-1">{{ patient.name }}</h5>
                        <span class="fs-xs text-muted mb-3">Patient ID: {{ patient.id }}</span>
                        <div class="w-100 border-top pt-2">
                          <p class="fs-xs text-secondary mb-0 fw-medium">Last Appointment</p>
                          <p class="fs-xs text-dark fw-bold mb-0">{{ patient.lastAppointment }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Clinics & Availability -->
              <div class="block shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-header border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                  <h3 class="block-title fw-bold text-dark fs-5 mb-0">Clinics & Availability</h3>
                </div>
                <div class="block-content p-4">
                  <div v-for="(clinic, idx) in clinics" :key="clinic.name" class="p-3 border rounded mb-3 bg-body-light" :class="{ 'mb-0': idx === clinics.length - 1 }">
                    <div class="d-flex align-items-center justify-content-between pb-3 border-bottom border-light">
                      <div class="d-flex align-items-center">
                        <img :src="clinic.avatar" class="img-avatar img-avatar48 bg-white p-1 shadow-sm me-3" alt="Clinic Avatar" style="border-radius: 8px; object-fit: cover;">
                        <div>
                          <h6 class="fs-sm fw-bold text-dark mb-0">{{ clinic.name }}</h6>
                        </div>
                      </div>
                      <div>
                        <span class="fs-sm fw-bold text-success">{{ clinic.charge }}</span>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between pt-3">
                      <ul class="list-unstyled mb-0 d-flex flex-column gap-1">
                        <li v-for="sched in clinic.schedule" :key="sched.day" class="fs-xs text-muted">
                          <span class="fw-bold text-dark me-1">{{ sched.day }}:</span>
                          <span>{{ sched.time }}</span>
                        </li>
                      </ul>
                      <a href="#" class="fs-xs fw-semibold text-primary">Change</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column of Main Area -->
            <div class="col-xl-6">
              <!-- Upcoming Appointment -->
              <div class="upcoming-appointment-card w-100 mb-4">
                <div class="title-card">
                  <h5>Upcoming Appointment</h5>
                </div>
                <div class="upcoming-patient-info">
                  <div class="info-details">
                    <span class="img-avatar">
                      <img src="/assets/media/avatars/patient1.png" alt="Img" />
                    </span>
                    <div class="name-info">
                      <span>#Apt0001</span>
                      <h6>Adrian Marshall</h6>
                    </div>
                  </div>
                  <div class="date-details text-end">
                    <span>General visit</span>
                    <h6>Today, 10:45 AM</h6>
                  </div>
                  <div class="circle-bg">
                    <img src="/assets/media/photos/dashboard-circle-bg.png" alt="Img" />
                  </div>
                </div>
                <div class="appointment-card-footer">
                  <h5 class="text-nowrap mb-0"><i class="fa-solid fa-video me-1"></i>Video Appointment</h5>
                  <div class="btn-appointments">
                    <a href="javascript:void(0)" class="btn shadow-none">Chat Now</a>
                    <a href="javascript:void(0)" class="btn shadow-none">Start Appointment</a>
                  </div>
                </div>
              </div>

              <!-- Recent Invoices -->
              <div class="block shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-header border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                  <h3 class="block-title fw-bold text-dark fs-5 mb-0">Recent Invoices</h3>
                  <a href="#" class="fs-xs fw-semibold text-primary">View All</a>
                </div>
                <div class="block-content p-0 pb-3">
                  <div class="table-responsive">
                    <table class="table table-vcenter table-hover table-borderless mb-0">
                      <tbody>
                        <tr v-for="invoice in recentInvoices" :key="invoice.id" class="border-bottom border-light">
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <img class="img-avatar img-avatar40 me-3 bg-body-light p-1" :src="invoice.avatar" alt="Avatar" style="object-fit: cover; border-radius: 8px;">
                              <div>
                                <h5 class="fs-xs fw-bold mb-0 text-dark">{{ invoice.name }}</h5>
                                <span class="fs-xs text-muted">{{ invoice.id }}</span>
                              </div>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs">
                              <span class="text-muted d-block fs-xs">Amount</span>
                              <span class="fw-bold text-dark">{{ invoice.amount }}</span>
                            </div>
                          </td>
                          <td class="py-3">
                            <div class="fs-xs">
                              <span class="text-muted d-block fs-xs">Paid On</span>
                              <span class="fw-bold text-dark">{{ invoice.paidOn }}</span>
                            </div>
                          </td>
                          <td class="text-end pe-4 py-3">
                            <a href="#" class="btn btn-sm btn-alt-secondary rounded-circle" style="width: 32px; height: 32px; padding: 0; line-height: 32px;">
                              <i class="fa fa-eye"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Notifications -->
              <div class="block shadow-sm border border-light mb-4 rounded-3 bg-white">
                <div class="block-header border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                  <h3 class="block-title fw-bold text-dark fs-5 mb-0">Notifications</h3>
                  <a href="#" class="fs-xs fw-semibold text-primary">View All</a>
                </div>
                <div class="block-content p-0 pb-3">
                  <div class="table-responsive">
                    <table class="table table-vcenter table-hover table-borderless mb-0">
                      <tbody>
                        <tr v-for="(noti, idx) in notifications" :key="idx" class="border-bottom border-light">
                          <td class="ps-4 py-3">
                            <div class="d-flex align-items-center">
                              <div class="item item-rounded me-3 rounded-circle d-flex align-items-center justify-content-center" 
                                   :class="[
                                     noti.color === 'violet' ? 'bg-indigo-light text-indigo' : '',
                                     noti.color === 'blue' ? 'bg-primary-light text-primary' : '',
                                     noti.color === 'red' ? 'bg-danger-light text-danger' : '',
                                     noti.color === 'yellow' ? 'bg-warning-light text-warning' : '',
                                   ]"
                                   style="width: 40px; height: 40px;">
                                <i :class="noti.icon"></i>
                              </div>
                              <div class="flex-grow-1">
                                <h6 class="fs-xs text-dark mb-1 fw-medium">
                                  {{ noti.message }}<span v-if="noti.dateInfo" class="fw-bold text-primary">{{ noti.dateInfo }}</span>
                                </h6>
                                <span class="fs-xs text-muted d-block">{{ noti.timeAgo }}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-main-dark .nav-main-link {
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.6rem 1.25rem;
  transition: all 0.2s ease;
}
.nav-main-dark .nav-main-link:hover,
.nav-main-dark .nav-main-link.active {
  color: #0665d0;
  background-color: transparent !important;
}
.nav-main-dark .nav-main-link-icon {
  color: #adb5bd;
  width: 1.5rem;
  text-align: center;
  margin-right: 0.5rem;
}
.nav-main-dark .nav-main-link.active .nav-main-link-icon,
.nav-main-dark .nav-main-link:hover .nav-main-link-icon {
  color: #0665d0;
}

/* Custom Breadcrumb Styles matching Doccure */
.custom-breadcrumb-bar {
  background: #f4f8fb;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.custom-breadcrumb-bar .content {
  position: relative;
  z-index: 2;
}
.breadcrumb-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
.breadcrumb-bg .breadcrumb-bg-01 {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 15%;
}
.breadcrumb-bg .breadcrumb-bg-02 {
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 25%;
}
.breadcrumb-bg .breadcrumb-bg-03 {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 15px;
}
.breadcrumb-bg .breadcrumb-bg-04 {
  position: absolute;
  bottom: 20%;
  right: 25%;
  width: 12px;
}

/* Upcoming Appointment Card matching Doccure */
.upcoming-appointment-card {
  background: linear-gradient(135deg, #0E82FD 0%, #22CCFF 100%);
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 24px;
  box-shadow: 0px 7.5px 17.5px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.upcoming-appointment-card .circle-bg img {
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  max-height: 100%;
}
.upcoming-appointment-card .title-card {
  margin-bottom: 30px;
}
.upcoming-appointment-card .title-card h5 {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0;
}
.upcoming-patient-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.upcoming-patient-info .info-details {
  display: flex;
  align-items: center;
}
.upcoming-patient-info .info-details .img-avatar {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background: rgba(255, 255, 255, 0.15);
  padding: 2px;
}
.upcoming-patient-info .info-details .img-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}
.upcoming-patient-info .info-details .name-info span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  font-weight: 500;
}
.upcoming-patient-info .info-details .name-info h6 {
  color: #fff;
  font-size: 0.95rem;
  margin: 2px 0 0;
  font-weight: 600;
}
.upcoming-patient-info .date-details span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  display: block;
}
.upcoming-patient-info .date-details h6 {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 2px 0 0;
}
.appointment-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.appointment-card-footer h5 {
  color: #fff;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 0;
  font-weight: 500;
}
.appointment-card-footer h5 i {
  margin-right: 5px;
}
.appointment-card-footer .btn-appointments {
  display: flex;
  align-items: center;
}
.appointment-card-footer .btn-appointments .btn {
  padding: 6px 14px;
  display: inline-block;
  background: #fff;
  color: #0E82FD;
  font-size: 0.85rem;
  font-weight: 600;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  transition: all 0.2s;
}
.appointment-card-footer .btn-appointments .btn:last-child {
  margin-right: 0;
}
.appointment-card-footer .btn-appointments .btn:hover {
  background: #212529;
  color: #fff;
}

/* Custom background/text color classes for notifications */
.bg-indigo-light { background-color: rgba(114, 94, 227, 0.1) !important; }
.text-indigo { color: #725ee3 !important; }
.bg-primary-light { background-color: rgba(14, 130, 253, 0.1) !important; }
.text-primary { color: #0e82fd !important; }
.bg-danger-light { background-color: rgba(239, 68, 68, 0.1) !important; }
.text-danger { color: #ef4444 !important; }
.bg-warning-light { background-color: rgba(245, 158, 11, 0.1) !important; }
.text-warning { color: #f59e0b !important; }

/* Sticky sidebar layout */
.stickysidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 90px;
  padding-bottom: 1px;
}
</style>
