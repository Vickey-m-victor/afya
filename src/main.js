import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// Router from omnicore
import router from "~/omnicore/router.js";

// Auth store for initialization
import { useAuthStore } from "~/omnicore/stores/auth";

// Template components
import BaseBlock from "#/components/BaseBlock.vue";
import BaseBackground from "#/components/BaseBackground.vue";
import BasePageHeading from "#/components/BasePageHeading.vue";

// Template directives
import clickRipple from "#/directives/clickRipple";

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

// Craft new application
const app = createApp(App);

// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

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
