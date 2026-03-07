// modules/iam/routers/authRouter.js
const SignIn3View = () => import("~/iam/views/SignIn3View.vue");
const SignUp3View = () => import("~/iam/views/SignUp3View.vue");
const Lock3View = () => import("~/iam/views/Lock3View.vue");
const TwoFactor3View = () => import("~/iam/views/TwoFactor3View.vue");
const Reminder3View = () => import("~/iam/views/Reminder3View.vue");

export const authRoutes = [
  {
    path: "/auth",
    children: [
      { path: "signin3", name: "auth-signin3", component: SignIn3View },
      { path: "signup3", name: "auth-signup3", component: SignUp3View },
      { path: "auth-lock", name: "auth-lock3", component: Lock3View },
      { path: "two-factor3", name: "two-factor3", component: TwoFactor3View },
      { path: "reminder3", name: "auth-reminder3", component: Reminder3View },
    ],
  },
];