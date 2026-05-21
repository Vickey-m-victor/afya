<template>
    <a href="javascript:void(0);" id="dark-mode-toggle" @click="toggleDarkMode" :class="{ 'theme-toggle activate': true, active: isDarkMode }">
        <i class="isax" :class="[isDarkMode ? 'isax-sun-1' : 'isax-moon']"></i>
    </a>
</template>

<script>
// import AOS from "aos"; // Import AOS
// import "aos/dist/aos.css"; // Import AOS styles

export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "null");
      } else {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
      }
      this.isDarkMode = !this.isDarkMode;
    },
    initializeDarkMode() {
      const darkMode = localStorage.getItem("dark-mode");
      this.isDarkMode = darkMode === "enabled";
    },
    updateMenu() {},
  },
  watch: {
    isDarkMode(newVal) {
      if (newVal) {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    },
  },
  mounted() {
    this.initializeDarkMode();

    // Check if updateMenu is defined before calling
    if (typeof this.updateMenu === "function") {
      this.updateMenu();
      window.addEventListener("resize", this.updateMenu);
    }

    // Initialize AOS after Vue is mounted
    // AOS.init();
  },
  beforeUnmount() {
    if (typeof this.updateMenu === "function") {
      window.removeEventListener("resize", this.updateMenu);
    }
  },
};
</script>
