<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-xl-3 theiaStickySidebar">
            <profilesidebar></profilesidebar>
          </div>
          <div class="col-lg-8 col-xl-9">
            <nav class="settings-tab mb-1">
              <ul class="nav nav-tabs-bottom" role="tablist">
                <li class="nav-item" role="presentation">
                  <router-link class="nav-link active" to="/profile-settings"
                    >Profile</router-link
                  >
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
                  <router-link class="nav-link" to="/delete-account"
                    >Delete Account</router-link
                  >
                </li>
              </ul>
            </nav>
            <div class="card">
              <div class="card-body">
                <div class="border-bottom pb-3 mb-3">
                  <h5>Profile Settings</h5>
                </div>
                <form action="#">
                  <div class="setting-card">
                    <label class="form-label mb-2">Profile Photo</label>
                    <div class="change-avatar img-upload">
                      <div class="profile-img">
                        <i class="fa-solid fa-file-image"></i>
                      </div>
                      <div class="upload-img">
                        <div class="imgs-load d-flex align-items-center">
                          <div class="change-photo">
                            Upload New
                            <input type="file" class="upload" />
                          </div>
                          <a href="#" class="upload-remove">Remove</a>
                        </div>
                        <p>Your Image should Below 4 MB, Accepted format jpg,png,svg</p>
                      </div>
                    </div>
                  </div>
                  <div class="setting-title">
                    <h6>Information</h6>
                  </div>
                  <div class="setting-card">
                    <div class="row">
                      <div class="col-lg-4 col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >First Name <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Last Name <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Date of Birth <span class="text-danger">*</span></label
                          >
                          <div class="form-icon">
                            <datepicker
                              v-model="startdate"
                              class="form-control datetimepicker"
                              :editable="true"
                              :input-format="dateFormat"
                              placeholder="Select Date"
                              :clearable="false"
                            />
                            <span class="icon"><i class="isax isax-calendar-1"></i></span>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Phone Number <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Email Address <span class="text-danger">*</span></label
                          >
                          <input type="email" class="form-control" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Blood Group <span class="text-danger">*</span></label
                          >
                          <vue-select
                            :options="BloodGroup"
                            id="bloodgroup"
                            placeholder="Select"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="setting-title">
                    <h6>Address</h6>
                  </div>
                  <div class="setting-card">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label class="form-label"
                            >Address <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >City <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >State <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Country <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Pincode <span class="text-danger">*</span></label
                          >
                          <input type="text" class="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-btn text-end">
                    <a href="#" class="btn btn-md btn-light rounded-pill">Cancel</a>
                    <button
                      type="submit"
                      class="btn btn-md btn-primary-gradient rounded-pill"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <indexfooter></indexfooter>
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
      title: "Patient",
      text: "Settings",
      text1: "Settings",
      BloodGroup: ["Select", "B+ve", "AB+ve", "B-ve", "O+ve", "O-ve"],
    };
  },
};
</script>
