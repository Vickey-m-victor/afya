import { createRouter, createWebHashHistory } from "vue-router";


const routes = [

]

const authRoutes = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

export default authRoutes;