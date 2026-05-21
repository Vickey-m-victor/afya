<template>
  <div class="main-wrapper home-dentist">
    <layoutheader
      :class="{
        'header-space pharmacy-header': headerBackground !== 'transparent',
      }"
    />

    <fourteen-banner></fourteen-banner>

    <fourteen-service></fourteen-service>

    <fourteen-treatments></fourteen-treatments>

    <fourteen-expert></fourteen-expert>

    <fourteen-testimonial></fourteen-testimonial>

    <fourteen-blogs></fourteen-blogs>

    <fourteen-footer></fourteen-footer>

    <cursor />
    <scrolltotop />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerBackground: "transparent",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // Update the background color based on the scroll position
      this.headerBackground = scroll > 95 ? "#ffffff" : "transparent";
    },
  },
};
</script>
