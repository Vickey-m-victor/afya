<template>
  <div class="modal fade custom-modals" id="add_configure">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Configuration</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="timing-modal">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-wrap mb-0">
                    <label class="col-form-label">Email Address</label>
                    <input type="email" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                >Cancel</a
              >
              <button type="submit" class="btn btn-blue">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    submitForm() {
      this.$router.push("/available-timings");
    },
  },
};
</script>
