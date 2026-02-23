//auth routes for iam module
import SignIn3View from "~/iam/views/SignIn3View.vue";
import SignUp3View from "~/iam/views/SignUp3View.vue";
import Lock3View from "~/iam//views/Lock3View.vue";
import TwoFactor3View from "~/iam//views/TwoFactor3View.vue";
import Reminder3View from "~/iam//views/Reminder3View.vue";

export const authRoutes = [
  {
    path: "/auth",
    children: [
      {
        path: "signin3",
        name: "auth-signin3",
        component: SignIn3View,
      },
      {
        path: "signup3",
        name: "auth-signup3",
        component: SignUp3View,
      },
      {
        path: "lock3",
        name: "auth-lock3",
        component: Lock3View,
      },
      {
        path: "two-factor3",
        name: "two-factor3",
        component: TwoFactor3View,
      },
      {
        path: "reminder3",
        name: "auth-reminder3",
        component: Reminder3View,
      },
    ],
  },
];
