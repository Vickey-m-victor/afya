<template>
  <div class="main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>
          <div class="col-lg-8 col-xl-9">
            <!-- Profile Settings -->
            <div class="dashboard-header">
              <h3>Profile Settings</h3>
            </div>

            <!-- Settings List -->
            <settings-tabs></settings-tabs>
            <!-- /Settings List -->

            <div class="dashboard-header border-0 mb-0">
              <h3>Clinics</h3>
              <ul>
                <li>
                  <a href="javascript:void(0);" class="btn btn-primary prime-btn add-clinics" @click="add()">Add New
                    Clinic</a>
                </li>
              </ul>
            </div>

            <form @submit.prevent="submitForm">
              <div class="accordions clinic-infos" id="list-accord">
                <!-- Clinic Item -->
                <div class="user-accordion-item" v-for="item in socialMedia" :key="item.id">
                  <a href="javascript:void(0);" class="accordion-wrap" data-bs-toggle="collapse"
                    data-bs-target="#clinic1" @click="deleteEvent(socialMedia)">Clinic<span>Delete</span></a>
                  <div class="accordion-collapse collapse show" id="clinic1" data-bs-parent="#list-accord">
                    <div class="content-collapse">
                      <div class="add-service-info">
                        <div class="add-info">
                          <div class="row align-items-center">
                            <div class="col-md-12">
                              <div class="form-wrap mb-2">
                                <div class="change-avatar img-upload">
                                  <div class="profile-img">
                                    <i class="fa-solid fa-file-image"></i>
                                  </div>
                                  <div class="upload-img">
                                    <h5>Logo</h5>
                                    <div class="imgs-load d-flex align-items-center">
                                      <div class="change-photo">
                                        Upload New
                                        <input type="file" class="upload" />
                                      </div>
                                      <a href="javascript:void(0);" class="upload-remove">Remove</a>
                                    </div>
                                    <p class="form-text">
                                      Your Image should Below 4 MB, Accepted
                                      format Jpg,Png,Svg
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Clinic Name</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Location</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Address</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Gallery</label>
                                <div class="drop-file">
                                  <p>Drop files or Click to upload</p>
                                  <input type="file" />
                                </div>
                                <div class="view-imgs">
                                  <div class="view-img">
                                    <img src="@/themes/doccure/assets/img/doctors-dashboard/clinic-02.jpg" alt="img" />
                                    <a href="javascript:void(0);">Remove</a>
                                  </div>
                                  <div class="view-img">
                                    <img src="@/themes/doccure/assets/img/doctors-dashboard/clinic-01.jpg" alt="img" />
                                    <a href="javascript:void(0);">Remove</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-end">
                          <a href="javascript:void(0);" class="reset more-item">Reset</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Clinic Item -->

                <!-- Clinic Item -->
                <div class="user-accordion-item">
                  <a href="javascript:void(0);" class="collapsed accordion-wrap" data-bs-toggle="collapse"
                    data-bs-target="#clinic2">Adrian’s Dentistry<span>Delete</span></a>
                  <div class="accordion-collapse collapse" id="clinic2" data-bs-parent="#list-accord">
                    <div class="content-collapse">
                      <div class="add-service-info">
                        <div class="add-info">
                          <div class="row align-items-center">
                            <div class="col-md-12">
                              <div class="form-wrap mb-2">
                                <div class="change-avatar img-upload">
                                  <div class="profile-img">
                                    <i class="fa-solid fa-file-image"></i>
                                  </div>
                                  <div class="upload-img">
                                    <h5>Logo</h5>
                                    <div class="imgs-load d-flex align-items-center">
                                      <div class="change-photo">
                                        Upload New
                                        <input type="file" class="upload" />
                                      </div>
                                      <a href="javascript:void(0);" class="upload-remove">Remove</a>
                                    </div>
                                    <p class="form-text">
                                      Your Image should Below 4 MB, Accepted
                                      format Jpg,Png,Svg
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Clinic Name</label>
                                <input type="text" class="form-control" value="Adrian’s Dentistry" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Location</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Addrerss</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Gallery</label>
                                <div class="drop-file">
                                  <p>Drop files or Click to upload</p>
                                  <input type="file" />
                                </div>
                                <div class="view-imgs">
                                  <div class="view-img">
                                    <img src="@/themes/doccure/assets/img/doctors-dashboard/clinic-02.jpg" alt="img" />
                                    <a href="javascript:void(0);">Remove</a>
                                  </div>
                                  <div class="view-img">
                                    <img src="@/themes/doccure/assets/img/doctors-dashboard/clinic-01.jpg" alt="img" />
                                    <a href="javascript:void(0);">Remove</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-end">
                          <a href="javascript:void(0);" class="reset more-item">Reset</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Clinic Item -->
              </div>

              <div class="modal-btn text-end">
                <a href="javascript:void(0);" class="btn btn-gray">Cancel</a>
                <button type="submit" class="btn btn-primary prime-btn">
                  Save Changes
                </button>
              </div>
            </form>
            <!-- /Profile Settings -->
          </div>
        </div>
      </div>
    </div>
    <doctor-footer></doctor-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Doctor Profile",
      text: "Home",
      text1: "Doctor Profile",
      socialMedia: [
        {
          id: 1,
        },
      ],
    };
  },
  methods: {
    deleteEvent: function (socialMedia) {
      this.socialMedia.splice(this.socialMedia.indexOf(socialMedia), 1);
    },
    add() {
      const newId = this.socialMedia.length + 1;
      this.socialMedia.push({
        id: newId,
      });
    },
    submitForm() {
      this.$router.push("/doctor-clinics-settings");
    },
  },
};
</script>
