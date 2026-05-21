<template>
  <patient-header></patient-header>
  <breadcrumb1 :title="title" :text="text" :text1="text1" />
  <!-- Page Content -->
  <div class="content doctor-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-xl-3 theiaStickySidebar">
          <!-- Profile Sidebar -->
          <profilesidebar></profilesidebar>
          <!-- /Profile Sidebar -->
        </div>

        <!-- Change Password -->
        <div class="col-lg-8 col-xl-9">
          <nav class="settings-tab mb-1">
            <ul class="nav nav-tabs-bottom" role="tablist">
              <li class="nav-item" role="presentation">
                <router-link class="nav-link" to="/profile-settings">Profile</router-link>
              </li>
              <li class="nav-item" role="presentation">
                <router-link class="nav-link" to="/change-password"
                  >Change Password</router-link
                >
              </li>
              <li class="nav-item" role="presentation">
                <router-link class="nav-link" to="/two-factor-authentication"
                  >2 Factor Authentication</router-link
                >
              </li>
              <li class="nav-item" role="presentation">
                <router-link class="nav-link active" to="/delete-account"
                  >Delete Account</router-link
                >
              </li>
            </ul>
          </nav>
          <div class="card mb-0">
            <div class="card-body">
              <div class="border-bottom pb-3 mb-3">
                <h5>Delete Account</h5>
              </div>
              <h6 class="fs-16">Are you sure you want to delete your account?</h6>
              <p>
                Refers to the action of permanently removing a user's account and
                associated data from a system, service and platform.
              </p>
              <a
                href="#"
                class="btn btn-md btn-primary-gradient rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#del-acc"
                >Delete Account</a
              >
            </div>
          </div>
        </div>
        <!-- /Change Password -->
      </div>
    </div>
  </div>
  <!-- /Page Content -->
  <indexfooter></indexfooter>
  <div class="modal fade custom-modals" id="del-acc" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Delete Account</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="#">
          <div class="modal-body">
            <h6 class="FS-16 mb-1">Why Are You Deleting Your Account?</h6>
            <p class="mb-3">
              We're sorry to see you go! To help us improve, please let us know your
              reason for deleting your account
            </p>
            <div class="form-check d-flex mb-3">
              <input class="form-check-input" type="radio" name="delete" id="del-acc1" />
              <label class="form-check-label fs-14 ms-2" for="del-acc1">
                <span class="text-gray-9 fw-medium">No longer using the service</span>
                <span class="d-block"
                  >I no longer need this service and won’t be using it in the
                  future.</span
                >
              </label>
            </div>
            <div class="form-check d-flex mb-3">
              <input class="form-check-input" type="radio" name="delete" id="del-acc2" />
              <label class="form-check-label fs-14 ms-2" for="del-acc2">
                <span class="text-gray-9 fw-medium">Privacy concerns</span>
                <span class="d-block"
                  >I am concerned about how my data is handled and want to remove my
                  information.</span
                >
              </label>
            </div>
            <div class="form-check d-flex mb-3">
              <input class="form-check-input" type="radio" name="delete" id="del-acc3" />
              <label class="form-check-label fs-14 ms-2" for="del-acc3">
                <span class="text-gray-9 fw-medium">Too many notifications/emails</span>
                <span class="d-block"
                  >I’m overwhelmed by the volume of notifications or emails and would like
                  to reduce them.</span
                >
              </label>
            </div>
            <div class="form-check d-flex mb-3">
              <input class="form-check-input" type="radio" name="delete" id="del-acc4" />
              <label class="form-check-label fs-14 ms-2" for="del-acc4">
                <span class="text-gray-9 fw-medium">Poor user experience</span>
                <span class="d-block"
                  >I’ve had difficulty using the platform, and it didn’t meet my
                  expectations.</span
                >
              </label>
            </div>
            <div class="form-check d-flex mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="delete"
                id="del-acc5"
                checked
              />
              <label class="form-check-label fs-14 ms-2" for="del-acc5">
                <span class="text-gray-9 fw-medium">Other (Please specify)</span>
              </label>
            </div>
            <div class="ms-4">
              <textarea class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a
                href="#"
                class="btn btn-md btn-dark rounded-pill"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-md btn-primary-gradient rounded-pill">
                Delete Account
              </button>
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
    return {
      title: "Patient",
      text: "Settings",
      text1: "Settings",
    };
  },
};
</script>
