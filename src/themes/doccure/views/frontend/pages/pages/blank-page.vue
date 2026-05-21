<template>
  <div class="main-wrapper">
    <layoutheader></layoutheader>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <div class="page-wrapper">
      <!-- Page Content -->
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h5>Blank Page</h5>
            </div>
          </div>
        </div>
      </div>
      <!-- /Page Content -->
    </div>
    <indexfooter></indexfooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Pages",
      text: "Blank Page",
      text1: "Blank Page",
    };
  },
};
</script>
