const SearchDropdownView = () => import("~/hr/views/SearchDropdownView.vue");

export const searchDropdownRoutes = [
  {
    // Example: /iam/roles
    path: "/hr/search-dropdowns",
    name: "hr-search-dropdowns",
    component: SearchDropdownView,
  }
];