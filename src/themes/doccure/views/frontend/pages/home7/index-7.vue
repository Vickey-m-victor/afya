<template>
  <div class="main-wrapper home-twelve">
    <layoutheader :class="{ 'pharmacy-header': headerClass }" :style="{ 'background': headerBackground }" />
    <indexsevenbanner></indexsevenbanner>
    <indexsevenfeedback></indexsevenfeedback>
    <index-seven-frequently></index-seven-frequently>
    <indexsevenfooter></indexsevenfooter>
    <cursor />
  </div>
  <scrolltotop />
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
      if (scroll > 95) {
        this.headerBackground = "#fff";
        this.headerClass = "pharmacy-header"
      } else {
        this.headerBackground = "transparent";
        this.headerClass = ""
      }
    },
  },
};
</script>
