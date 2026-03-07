const SearchDropdownView = () => import("~/admin/views/SearchDropdownView.vue");

export const searchDropdownRoutes = [
  {
    // Example: /iam/roles
    path: "/admin/search-dropdowns",
    name: "admin-search-dropdowns",
    component: SearchDropdownView,
  }
];