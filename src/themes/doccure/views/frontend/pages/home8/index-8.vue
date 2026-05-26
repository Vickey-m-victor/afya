<template>
  <div class="main-wrapper home-twelve home-thirteen">
    <layoutheader
    :class="{ 'pharmacy-header': headerClass }" :style="{ 'background': headerBackground }"
    />

    <indexeightbanner></indexeightbanner>

    <indexeightservice></indexeightservice>

    <indexeightchoose></indexeightchoose>

    <indexeightlatest></indexeightlatest>

    <indexeightfooter></indexeightfooter>

    <cursor />
  </div>
  <scrolltotop />
</template>
<script>
export default {
  data() {
    return {
      headerBackground: "#fff",
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
