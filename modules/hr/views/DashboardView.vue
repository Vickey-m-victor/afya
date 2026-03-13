<template>
  <div class="content">
    <div class="d-flex align-items-center justify-content-between flex-wrap mb-4">
      <div class="my-auto mb-2">
        <h2 class="mb-1">HR Dashboard</h2>
        <div class="text-muted fs-sm">Dashboard / HR Dashboard</div>
      </div>
      <div class="d-flex align-items-center flex-wrap gap-2 mb-2">
        <div class="avatar-list-stacked">
          <img class="img-avatar img-avatar32" src="/assets/media/avatars/avatar10.jpg" alt="user" />
          <img class="img-avatar img-avatar32" src="/assets/media/avatars/avatar4.jpg" alt="user" />
          <img class="img-avatar img-avatar32" src="/assets/media/avatars/avatar12.jpg" alt="user" />
        </div>
        <button type="button" class="btn btn-sm btn-primary">Add New</button>
      </div>
    </div>

    <!-- ─── Row 1: Status + Leave  |  Overview Stats ─── -->
    <div class="row g-3 mb-3">
      <div class="col-xl-5 d-flex flex-column gap-3">

        <!-- Employee Status & Type — 100% stacked bar sparkline -->
        <BaseBlock class="mb-0 block-rounded">
          <template #content>
            <div class="block-content block-content-full">
              <div class="border rounded border-start border-start-4 border-start-primary d-flex align-items-center justify-content-between p-2 gap-2 flex-wrap mb-3">
                <h2 class="h5 fw-bold mb-0">Employee Status &amp; Type</h2>
                <button type="button" class="btn btn-sm btn-alt-secondary">View All</button>
              </div>
              <VueApexCharts type="bar" height="45" :options="statusChartOptions" :series="statusSeries" />
              <div class="row text-center mt-3">
                <div class="col-4">
                  <h4 class="fw-bold mb-1">1,054</h4>
                  <p class="d-inline-flex align-items-center mb-0 fs-sm">
                    <span class="status-chart-line bg-primary me-1"></span>Full-Time
                  </p>
                </div>
                <div class="col-4">
                  <h4 class="fw-bold mb-1">568</h4>
                  <p class="d-inline-flex align-items-center mb-0 fs-sm">
                    <span class="status-chart-line bg-info me-1"></span>Contract
                  </p>
                </div>
                <div class="col-4">
                  <h4 class="fw-bold mb-1">80</h4>
                  <p class="d-inline-flex align-items-center mb-0 fs-sm">
                    <span class="status-chart-line bg-body-light border me-1"></span>Probation
                  </p>
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>

        <!-- Leave Type Distribution — radialBar semicircle -->
        <BaseBlock title="Leave Type Distribution" class="mb-0 block-rounded flex-grow-1">
          <template #content>
            <div class="block-content block-content-full">
              <div class="row align-items-center">
                <div class="col-sm-5">
                  <VueApexCharts type="radialBar" height="180" :options="leaveChartOptions" :series="leaveSeries" />
                </div>
                <div class="col-sm-7">
                  <div
                    class="d-flex align-items-center justify-content-between mb-2"
                    v-for="item in leaveLegend"
                    :key="item.label"
                  >
                    <p class="mb-0 fs-sm">
                      <i class="fa fa-circle me-1" :class="item.textClass"></i>{{ item.label }}
                    </p>
                    <span class="badge bg-body-light text-dark border">{{ item.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>

      <!-- Overview Statistics — 4 stat cards -->
      <div class="col-xl-7 d-flex">
        <BaseBlock title="Overview Statistics" class="mb-0 block-rounded w-100">
          <template #content>
            <div class="block-content block-content-full">
              <div class="row g-3">
                <div class="col-md-6" v-for="item in overviewStats" :key="item.label">
                  <div class="p-3 border rounded-3 h-100">
                    <div class="d-flex align-items-center mb-2">
                      <div class="item item-circle item-sm me-2" :class="item.iconBg">
                        <i class="text-white" :class="item.icon"></i>
                      </div>
                      <p class="mb-0 fw-semibold">{{ item.label }}</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                      <div>
                        <h4 class="mb-1">{{ item.value }}</h4>
                        <p class="mb-0 fs-sm text-muted">{{ item.sub }}</p>
                      </div>
                      <span class="badge" :class="item.trendClass">{{ item.trend }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>

    <!-- ─── Row 2: Attendance (grouped bar + pattern) | Employee Distribution (vertical gradient bar) ─── -->
    <div class="row g-3 mb-3">
      <div class="col-xl-8 d-flex">
        <BaseBlock title="Attendance Trend" class="mb-0 block-rounded w-100">
          <template #content>
            <div class="block-content block-content-full">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                <div class="d-flex align-items-center gap-3">
                  <h4 class="mb-0">600 <span class="fs-sm fw-normal text-muted">Present</span></h4>
                  <h4 class="mb-0">100 <span class="fs-sm fw-normal text-muted">Late</span></h4>
                  <h4 class="mb-0">50 <span class="fs-sm fw-normal text-muted">Absent</span></h4>
                </div>
                <div class="d-flex align-items-center gap-3 fs-sm text-muted">
                  <span><i class="fa fa-square me-1 text-primary"></i>Present</span>
                  <span><i class="fa fa-square me-1 text-warning"></i>Absent</span>
                  <span><i class="fa fa-square me-1 text-info"></i>Late</span>
                </div>
              </div>
              <div class="d-sm-flex align-items-start gap-3">
                <div class="flex-grow-1">
                  <VueApexCharts type="bar" height="260" :options="attendanceOptions" :series="attendanceSeries" />
                </div>
                <div class="flex-shrink-0 d-flex d-sm-block gap-2 mt-2 mt-sm-0">
                  <div class="border rounded p-2 text-center mb-sm-2 mini-stat">
                    <p class="mb-1 fs-sm">Max Working Hours</p>
                    <h5 class="mb-0">8.4 hrs</h5>
                  </div>
                  <div class="border rounded p-2 text-center mb-sm-2 mini-stat">
                    <p class="mb-1 fs-sm">Missed Punches</p>
                    <h5 class="mb-0">12</h5>
                  </div>
                  <div class="border rounded p-2 text-center mini-stat">
                    <p class="mb-1 fs-sm">Weekly Avg</p>
                    <h5 class="mb-0">97.2%</h5>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>

      <!-- Employee Distribution — vertical gradient bar + % dataLabels -->
      <div class="col-xl-4 d-flex">
        <BaseBlock title="Top Employee Distribution" class="mb-0 block-rounded w-100">
          <template #content>
            <div class="block-content block-content-full">
              <VueApexCharts type="bar" height="320" :options="distributionOptions" :series="distributionSeries" />
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>

    <!-- ─── Row 3: Deduction + Payroll + Top Employees  |  Training + Pending Approvals ─── -->
    <div class="row g-3">
      <div class="col-xl-7 d-flex flex-column gap-3">
        <div class="row g-3">

          <!-- Benefits Deductions — mirrored stacked bar sparkline -->
          <div class="col-md-6 d-flex">
            <BaseBlock title="Benefits Deductions" class="mb-0 block-rounded w-100">
              <template #content>
                <div class="block-content block-content-full">
                  <h3 class="mb-1">$56K</h3>
                  <p class="mb-2 text-muted fs-sm">Insurance + 401(k)</p>
                  <VueApexCharts type="bar" height="70" :options="deductionOptions" :series="deductionSeries" />
                </div>
              </template>
            </BaseBlock>
          </div>

          <!-- Total Payroll — bar sparkline with background bars -->
          <div class="col-md-6 d-flex">
            <BaseBlock title="Total Payroll" class="mb-0 block-rounded w-100">
              <template #content>
                <div class="block-content block-content-full">
                  <h3 class="mb-1">$2.4M</h3>
                  <p class="mb-2 text-success fs-sm"><i class="fa fa-arrow-up me-1"></i>+55% Increased</p>
                  <VueApexCharts type="bar" height="40" :options="payrollOptions" :series="payrollSeries" />
                </div>
              </template>
            </BaseBlock>
          </div>
        </div>

        <!-- Top Employees — scatter-style line + avatar images + 4 tabs -->
        <BaseBlock class="mb-0 block-rounded">
          <template #content>
            <div class="block-content block-content-full">
              <div class="border rounded border-start border-start-4 border-start-primary d-flex align-items-center justify-content-between p-2 gap-2 flex-wrap mb-3">
                <h2 class="h5 fw-bold mb-0">Top Employees</h2>
                <div class="border bg-light rounded p-1">
                  <nav class="nav nav-pills flex-row gap-1">
                    <button
                      v-for="tab in topTabs"
                      :key="tab.key"
                      class="nav-link py-1 px-2 btn btn-sm border-0"
                      :class="{ active: activeTopTab === tab.key }"
                      @click="activeTopTab = tab.key"
                    >{{ tab.label }}</button>
                  </nav>
                </div>
              </div>
              <div style="height: 200px; padding-bottom: 8px;">
                <Line
                  :key="activeTopTab"
                  :data="topEmployeesChartData"
                  :options="topEmployeesChartOptions"
                  :plugins="topEmployeesPlugins"
                />
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>

      <div class="col-xl-5 d-flex flex-column gap-3">

        <!-- Employees in Training — doughnut with center text plugin -->
        <BaseBlock title="Employees in Training" class="mb-0 block-rounded">
          <template #content>
            <div class="block-content block-content-full">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <p class="mb-1 text-muted">Current Training Batch</p>
                  <h3 class="mb-0">80</h3>
                  <p class="mb-0 fs-sm text-muted mt-1">20% Completed</p>
                </div>
                <div class="training-chart">
                  <Doughnut :data="trainingData" :options="trainingOptions" :plugins="trainingPlugins" />
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>

        <!-- Pending Approvals -->
        <BaseBlock title="Pending Approvals" class="mb-0 block-rounded flex-grow-1">
          <template #content>
            <div class="block-content block-content-full">
              <div class="border rounded p-2 mb-2" v-for="item in approvals" :key="item.name">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="img-avatar img-avatar32 me-2" :src="item.avatar" alt="employee" />
                    <div>
                      <p class="mb-0 fw-semibold">{{ item.name }}</p>
                      <p class="mb-0 fs-sm text-muted">{{ item.range }} • {{ item.days }} days</p>
                    </div>
                  </div>
                  <span class="badge" :class="item.badgeClass">{{ item.reason }}</span>
                </div>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseBlock from '@/components/BaseBlock.vue';
import VueApexCharts from 'vue3-apexcharts';
import { Doughnut, Line } from 'vue-chartjs';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ─── Theme colours ───
const getThemeColor = (name, fallback) => {
  if (typeof document === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
};
const colors = {
  primary:   getThemeColor('--bs-primary',   '#0d6efd'),
  info:      getThemeColor('--bs-info',      '#0dcaf0'),
  success:   getThemeColor('--bs-success',   '#198754'),
  warning:   getThemeColor('--bs-warning',   '#ffc107'),
  danger:    getThemeColor('--bs-danger',    '#dc3545'),
  secondary: getThemeColor('--bs-secondary', '#6c757d'),
  dark:      getThemeColor('--bs-dark',      '#212529'),
};

// ─────────────────────────────────────────────
// 1. Employee Status & Type  (100% stacked bar sparkline)
// ─────────────────────────────────────────────
const statusSeries = [
  { name: 'Full-Time',  data: [1054] },
  { name: 'Contract',   data: [568]  },
  { name: 'Probation',  data: [80]   },
];
const statusChartOptions = {
  chart: {
    type: 'bar', height: 45, stacked: true, stackType: '100%',
    toolbar: { show: false }, sparkline: { enabled: true },
  },
  plotOptions: { bar: { horizontal: true, barHeight: '100%', borderRadius: 3 } },
  colors: [colors.primary, colors.info, '#e9ecef'],
  fill: { type: 'pattern', opacity: 1, pattern: { style: 'verticalLines', width: 6, strokeWidth: 4 } },
  tooltip: { enabled: true },
  xaxis: { categories: ['Total'] },
  legend: { show: false },
};

// ─────────────────────────────────────────────
// 2. Leave Type Distribution  (radialBar semicircle)
// ─────────────────────────────────────────────
const leaveSeries = [85, 50, 20];
const leaveLegend = [
  { label: 'Sick Leave',    value: 45, textClass: 'text-primary'   },
  { label: 'Casual Leave',  value: 68, textClass: 'text-info'      },
  { label: 'Unpaid',        value: 12, textClass: 'text-secondary' },
];
const leaveChartOptions = {
  chart: { type: 'radialBar', width: 180, height: 180, sparkline: { enabled: true } },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle:   90,
      offsetY: 0,
      hollow: { margin: 0, size: '40%', background: 'transparent' },
      track: { show: true, background: '#F3F4F6', strokeWidth: '97%', margin: 5 },
      dataLabels: { show: false },
    },
  },
  fill: { colors: ['#F37438', '#F5844E', '#F69364'] },
  labels: ['Sick', 'Casual', 'Unpaid'],
  grid: { padding: { top: -50, left: -10, bottom: -150 } },
  legend: { show: false },
};

// ─────────────────────────────────────────────
// 3. Overview Statistics
// ─────────────────────────────────────────────
const overviewStats = [
  { label: 'Total Employees',   value: '1,848', sub: 'Headcount Overview',     trend: '+18%', trendClass: 'bg-success-light text-success', icon: 'si si-users',       iconBg: 'bg-primary' },
  { label: 'New Joinees',       value: '1,248', sub: 'All Department',          trend: '+22%', trendClass: 'bg-success-light text-success', icon: 'si si-user-follow', iconBg: 'bg-info'    },
  { label: 'Late Arrivals Today',value: '12',   sub: 'Delayed Logins Today',    trend: '-16%', trendClass: 'bg-danger-light text-danger',   icon: 'si si-clock',       iconBg: 'bg-dark'    },
  { label: 'Total Payroll Cost', value: '$2.4M',sub: 'Payroll Outflow',         trend: '+16%', trendClass: 'bg-success-light text-success', icon: 'si si-wallet',      iconBg: 'bg-warning' },
];

// ─────────────────────────────────────────────
// 4. Attendance  (grouped bar + horizontalLines pattern fill)
// ─────────────────────────────────────────────
const attendanceSeries = [
  { name: 'Present', data: [600, 300, 300, 700, 400, 600, 600] },
  { name: 'Absent',  data: [50,  100,  50,  50, 100, 100, 100] },
  { name: 'Late',    data: [100,  50, 150, 100, 150,  50, 150] },
];
const attendanceOptions = {
  chart: { type: 'bar', height: 260, stacked: false, toolbar: { show: false }, sparkline: { enabled: false } },
  colors: [colors.primary, colors.warning, colors.info],
  plotOptions: {
    bar: {
      horizontal: false, columnWidth: '50%', borderRadius: 2,
      borderRadiusApplication: 'end',
      colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 0.5 },
    },
  },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  fill: { type: 'pattern', opacity: 1, pattern: { style: 'horizontalLines', width: 5, height: 20, strokeWidth: 24 } },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisBorder: { show: false }, axisTicks: { show: false },
    labels: { rotate: 0, style: { colors: '#6B7280' } },
  },
  yaxis: { show: true, min: 0, max: 800, labels: { offsetX: -16 } },
  grid: { show: true, borderColor: '#E5E7EB', strokeDashArray: 3, padding: { left: 0 } },
  dataLabels: { enabled: false },
  legend: { show: false },
  tooltip: { enabled: true },
};

// ─────────────────────────────────────────────
// 5. Employee Distribution  (vertical gradient bar + % dataLabels)
// ─────────────────────────────────────────────
const distributionSeries = [{ name: 'Company', data: [40, 20, 35, 10] }];
const distributionOptions = {
  chart: { height: 320, type: 'bar', toolbar: { show: false } },
  colors: [colors.primary],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light', type: 'vertical', shadeIntensity: 0.5,
      inverseColors: false, opacityFrom: 0.8, opacityTo: 0.3, stops: [0, 100],
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '70%', borderRadius: 10, horizontal: false,
      colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 0.5, backgroundBarRadius: 10 },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    offsetY: 10,
    style: { fontSize: '12px', colors: ['#111827'], fontWeight: 'bold' },
  },
  xaxis: {
    categories: ['Sales', 'Front End', 'React', 'UI'],
    axisBorder: { show: false }, axisTicks: { show: false },
    labels: { style: { colors: '#111827', fontSize: '13px' } },
  },
  yaxis: { min: 0, max: 50, labels: { show: false } },
  grid: { show: false, padding: { left: -10, right: -30, bottom: -10 } },
  legend: { show: false },
};

// ─────────────────────────────────────────────
// 6. Benefits Deductions  (mirrored stacked bar sparkline)
// ─────────────────────────────────────────────
const deductionSeries = [
  { name: 'Deduction', data: [15, 40, 30, 35, 40, 35, 32]           },
  { name: 'Mirror',    data: [-15, -40, -30, -35, -40, -35, -32]    },
];
const deductionOptions = {
  chart: { type: 'bar', height: 70, stacked: true, toolbar: { show: false }, sparkline: { enabled: true } },
  colors: [colors.primary, colors.primary],
  plotOptions: {
    bar: {
      borderRadius: 4,
      colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 0.5, backgroundBarRadius: 4 },
    },
  },
  dataLabels: { enabled: false },
  xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
  yaxis: { min: -50, max: 50, show: false },
  grid: { show: false },
  tooltip: { enabled: true },
};

// ─────────────────────────────────────────────
// 7. Total Payroll  (bar sparkline with background bars)
// ─────────────────────────────────────────────
const payrollSeries = [{ name: 'Payroll', data: [45, 15, 30, 25, 20, 45, 40] }];
const payrollOptions = {
  chart: { type: 'bar', height: 40, toolbar: { show: false }, sparkline: { enabled: true } },
  colors: [colors.success],
  plotOptions: {
    bar: {
      borderRadius: 4, borderRadiusWhenStacked: 'all', borderRadiusApplication: 'around',
      colors: { backgroundBarColors: ['#F8F9FA'], backgroundBarOpacity: 0.5, backgroundBarRadius: 4 },
    },
  },
  dataLabels: { enabled: false },
  xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
  yaxis: { show: false },
  grid: { show: false },
  tooltip: { enabled: true },
};

// ─────────────────────────────────────────────
// 8. Top Employees  (Chart.js scatter-style line + avatar images + 4 tabs)
// ─────────────────────────────────────────────
const avatarUrls = [
  '/assets/media/avatars/avatar1.jpg',
  '/assets/media/avatars/avatar2.jpg',
  '/assets/media/avatars/avatar3.jpg',
  '/assets/media/avatars/avatar4.jpg',
  '/assets/media/avatars/avatar5.jpg',
  '/assets/media/avatars/avatar6.jpg',
  '/assets/media/avatars/avatar7.jpg',
  '/assets/media/avatars/avatar8.jpg',
  '/assets/media/avatars/avatar9.jpg',
  '/assets/media/avatars/avatar10.jpg',
];
const employeeNames = ['Micheal', 'Martinz', 'Clark', 'Hensrita', 'Lisa', 'Davis', 'Anderson', 'James', 'Merkel', 'Daniel'];

const preloadedImages = ref([]);
onMounted(() => {
  avatarUrls.forEach((url, i) => {
    const img = new Image();
    img.src = url;
    preloadedImages.value[i] = img;
  });
});

const topTabs = [
  { key: '1D', label: '1D' },
  { key: '7D', label: '7D' },
  { key: '1M', label: '1M' },
  { key: '1Y', label: '1Y' },
];
const activeTopTab = ref('1D');

const topTabData = {
  '1D': [100, 95, 100, 100, 100, 70, 45, 78, 75, 80],
  '7D': [88,  92,  85,  97,  79,  83,  60,  71,  90,  76],
  '1M': [72,  80,  91,  65,  88,  77,  55,  84,  69,  95],
  '1Y': [65,  75,  88,  72,  91,  80,  58,  67,  82,  97],
};

const topEmployeesChartData = computed(() => ({
  labels: employeeNames,
  datasets: [{
    label: 'Score',
    data: topTabData[activeTopTab.value],
    pointBackgroundColor: '#0C4B5E',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 6,
    pointHoverRadius: 8,
    showLine: false,
  }],
}));

const topEmployeesChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 10, bottom: 30 } },
  scales: {
    y: { min: 0, max: 110, ticks: { stepSize: 25, color: '#9CA3AF' }, grid: { color: '#F3F4F6' } },
    x: { grid: { display: false }, ticks: { display: false } },
  },
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
};

// Custom Chart.js plugins — avatar images below x-axis + vertical stem lines
const imageLabelsPlugin = {
  id: 'imageLabels',
  afterDraw(chart) {
    const imgs = preloadedImages.value;
    if (!imgs.length) return;
    const { ctx, chartArea: { bottom }, scales: { x } } = chart;
    ctx.save();
    imgs.forEach((image, index) => {
      if (!image || !image.complete) return;
      const xPos    = x.getPixelForValue(index);
      const imgSize = 24;
      const imgY    = bottom + 6;
      const radius  = imgSize / 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(xPos, imgY + radius, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(image, xPos - radius, imgY, imgSize, imgSize);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(xPos, imgY + radius, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    ctx.restore();
  },
};

const verticalLinesPlugin = {
  id: 'verticalLines',
  afterDatasetsDraw(chart) {
    const { ctx, scales: { x, y } } = chart;
    const data = chart.data.datasets[0].data;
    ctx.save();
    ctx.strokeStyle = '#B9CBD1';
    ctx.lineWidth = 6;
    data.forEach((val, i) => {
      const xPos = x.getPixelForValue(i);
      const yPos = y.getPixelForValue(val);
      ctx.beginPath();
      ctx.moveTo(xPos, yPos + 2);
      ctx.lineTo(xPos, y.getPixelForValue(0));
      ctx.stroke();
    });
    ctx.restore();
  },
};

const topEmployeesPlugins = [imageLabelsPlugin, verticalLinesPlugin];

// ─────────────────────────────────────────────
// 9. Employees in Training  (doughnut + center text plugin)
// ─────────────────────────────────────────────
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    ctx.save();
    ctx.font = '700 11px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('20%', (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2);
    ctx.restore();
  },
};
const trainingPlugins = [centerTextPlugin];

const trainingData = {
  labels: ['In Training', 'Completed'],
  datasets: [{
    data: [80, 20],
    backgroundColor: ['#fff', '#F26522'],
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#3B7080',
    hoverBorderWidth: 0,
    cutout: '60%',
  }],
};
const trainingOptions = {
  responsive: true, maintainAspectRatio: false,
  rotation: -90, circumference: 360,
  layout: { padding: { top: -20, bottom: -20 } },
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
};

// ─────────────────────────────────────────────
// 10. Pending Approvals
// ─────────────────────────────────────────────
const approvals = [
  { name: 'Hendrita Merkel', range: 'Jan 10 - Jan 16', days: 4, reason: 'Family Trip', badgeClass: 'bg-warning-light text-warning', avatar: '/assets/media/avatars/avatar12.jpg' },
  { name: 'Felix Lawrence',  range: 'Jan 18 - Jan 20', days: 2, reason: 'Medical',     badgeClass: 'bg-info-light text-info',       avatar: '/assets/media/avatars/avatar4.jpg'  },
  { name: 'Arianna Keller',  range: 'Jan 21 - Jan 25', days: 5, reason: 'Vacation',    badgeClass: 'bg-primary-light text-primary', avatar: '/assets/media/avatars/avatar10.jpg' },
];
</script>

<style scoped>
.block-rounded { border-radius: 0.5rem; }

/* Status chart — colour line legend */
.status-chart-line {
  display: inline-block;
  width: 28px;
  height: 4px;
  flex-shrink: 0;
  border-radius: 2px;
}

/* Attendance sidebar mini-stats */
.mini-stat { min-width: 125px; }

/* Training doughnut — dark teal bg to match SmartHR palette */
.training-chart {
  width: 80px;
  height: 80px;
  background-color: #3B7080;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Avatar stacking */
.avatar-list-stacked { display: flex; align-items: center; }
.avatar-list-stacked .img-avatar { border: 2px solid var(--bs-body-bg); margin-left: -8px; }
.avatar-list-stacked .img-avatar:first-child { margin-left: 0; }
</style>
