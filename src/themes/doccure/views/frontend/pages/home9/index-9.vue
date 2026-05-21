<template>
  <div class="main-wrapper home-fourteen">
    <layoutheader
    :style="{ background: headerBackground }" :class="{ 'pharmacy-header': isPharmachyHeader }"
    />
    <indexninebanner></indexninebanner>

    <indexnineteam></indexnineteam>

    <indexninefeedback></indexninefeedback>

    <indexnineblog></indexnineblog>    

    <indexninefooter></indexninefooter>
    <cursor />
    <scrolltotop />
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerBackground: "transparent",
      isPharmachyHeader: false
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

      // Check if the scroll position meets your condition to add the class
      this.isPharmachyHeader = scroll > 95; // Change 95 to your desired threshold
    },
  },
};
</script>
