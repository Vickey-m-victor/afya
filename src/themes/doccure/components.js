import DoctorHeader from '@/themes/doccure/views/frontend/layouts/doctor-header.vue';
import Doctorsidebar from '@/themes/doccure/views/frontend/layouts/doctorsidebar.vue';
import DoctorFooter from '@/themes/doccure/views/frontend/layouts/doctor-footer.vue';
import Mainnav from '@/themes/doccure/components/frontend/mainnav.vue';
import LayoutDark from '@/themes/doccure/views/frontend/layouts/layout-dark.vue';
import Breadcrumb1 from '@/themes/doccure/components/frontend/breadcrumb/breadcrumb1.vue';
import vSelect from 'vue-select';
import VueApexCharts from 'vue3-apexcharts';

export default function registerDoccureComponents(app) {
  app.component('doctor-header', DoctorHeader);
  app.component('doctorsidebar', Doctorsidebar);
  app.component('doctor-footer', DoctorFooter);
  app.component('mainnav', Mainnav);
  app.component('layout-dark', LayoutDark);
  app.component('breadcrumb1', Breadcrumb1);
  app.component('vue-select', vSelect);
  app.component('apexchart', VueApexCharts);
}
