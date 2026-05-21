<template>
  <div class="main-wrapper home-three">
    <layoutheadertwo  :style="{ background: headerBackground }" :class="{ 'pharmacy-header': isPharmachyHeader }" />

    <indexthreebanner></indexthreebanner>

    <indexthreedoctor></indexthreedoctor>

    <indexthreeclinic></indexthreeclinic>

    <indexthreeblog></indexthreeblog>

    <homethree-footer></homethree-footer>
  </div>
  <cursor />

  <scrolltotop />
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