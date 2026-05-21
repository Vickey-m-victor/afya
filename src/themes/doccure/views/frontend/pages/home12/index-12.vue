<template>
    <div class="home-pg-twelve">
        <div class="main-wrapper">
            <layoutheader :class="{ 'pharmacy-header': headerBackground !== 'transparent' }" />

            <indextwelvebanner></indextwelvebanner>

            <lab-service></lab-service>

            <twelve-packages></twelve-packages>

            <twelve-best></twelve-best>

            <twelve-book></twelve-book>

            <twelve-faq></twelve-faq>

            <twelve-pricing></twelve-pricing>

            <twelve-about></twelve-about>

            <twelve-footer></twelve-footer>

            <cursor />
            <scrolltotop />
        </div>
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