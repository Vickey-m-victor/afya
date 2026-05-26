<template>
  <div class="main-wrapper">
    <!-- Main Wrapper -->
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <!-- Page Content -->
    <div class="content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>

          <div class="col-md-7 col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Social Media</h3>
            </div>
            <div class="add-btn text-end mb-4">
              <button class="btn btn-primary prime-btn add-social-media" @click="add()">
                Add New Social Media
              </button>
            </div>
            <form action="javascript:void(0)" class="social-media-form">
              <div
                class="social-media-links d-flex align-items-center"
                v-for="item in socialMedia"
                :key="item.id"
              >
                <div class="input-block input-block-new select-social-link">
                  <vue-select
                    :options="item.options"
                    :placeholder="item.selectedOption"
                  />
                </div>
                <div class="input-block input-block-new flex-fill">
                  <input
                    type="password"
                    class="form-control"
                    :placeholder="item.placeholder"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- /Page Content -->
    <indexfooter />
  </div>
  <!-- /Main Wrapper -->
</template>
<script>
export default {
  data() {
    return {
      title: "Social Media",
      text: "Home",
      text1: "Social Media",
      socialMedia: [
        {
          id: 1,
          options: ["Facebook", "Linkedin", "Twitter", "Instagram"],
          placeholder: "Add Url",
          selectedOption: "Facebook",
        },
        {
          id: 2,
          options: ["Facebook", "Linkedin", "Twitter", "Instagram"],
          placeholder: "Add Url",
          selectedOption: "Linkedin",
        },
        {
          id: 3,
          options: ["Facebook", "Linkedin", "Twitter", "Instagram"],
          placeholder: "Add Url",
          selectedOption: "Twitter",
        },
        {
          id: 4,
          options: ["Facebook", "Linkedin", "Twitter", "Instagram"],
          placeholder: "Add Url",
          selectedOption: "Instagram",
        },
      ],
    };
  },
  methods: {
    add() {
      const newId = this.socialMedia.length + 1;
      this.socialMedia.push({
        id: newId,
        options: ["Facebook", "Linkedin", "Twitter", "Instagram"],
        placeholder: "Add Url",
        selectedOption: "Facebook",
      });
    },
  },
};
</script>
