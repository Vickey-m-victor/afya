import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// App router
import router from "@/router.js";

// Auth store for initialization
import { useAuthStore } from "@/stores/auth";

// Template components
import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";

// Template directives
import clickRipple from "@/directives/clickRipple";

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

// Keep canonical hash-mode URLs and avoid duplicated path + hash URLs
function normalizeHashModeUrl() {
  const { pathname, search, hash } = window.location;
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/") {
    return;
  }

  if (hash && hash.startsWith("@/")) {
    window.history.replaceState(null, "", `/${search}${hash}`);
    return;
  }

  window.history.replaceState(null, "", `/${search}#${pathname}`);
}

normalizeHashModeUrl();

// Craft new application
const app = createApp(App);

// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

// Register Doccure global components
import registerDoccureComponents from "@/themes/doccure/components.js";
registerDoccureComponents(app);

// Register global directives
app.directive("click-ripple", clickRipple);

// Use Pinia and Vue Router
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Initialize auth store (restore session from localStorage)
const authStore = useAuthStore();
authStore.initStore();

// ..and finally mount it!
app.mount("#app");
