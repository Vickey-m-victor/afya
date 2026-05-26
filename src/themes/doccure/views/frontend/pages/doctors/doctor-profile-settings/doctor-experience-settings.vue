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
              <h3>Experience</h3>
              <ul>
                <li>
                  <a href="javascript:void(0);" class="btn btn-primary prime-btn add-experiences" @click="add()">Add New
                    Experience</a>
                </li>
              </ul>
            </div>

            <form @submit.prevent="submitForm">
              <div class="accordions experience-infos" id="list-accord">
                <!-- Experience1 Item -->
                <div class="user-accordion-item" v-for="item in socialMedia" :key="item.id">
                  <a href="javascript:void(0);" class="accordion-wrap" data-bs-toggle="collapse"
                    data-bs-target="#experience1" @click="deleteEvent(socialMedia)">Experience<span>Delete</span></a>
                  <div class="accordion-collapse collapse show" id="experience1" data-bs-parent="#list-accord">
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
                                    <h5>Hospital Logo</h5>
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
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Title</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Hospital
                                  <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Year of Experience
                                  <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Location
                                  <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Employement </label>
                                <vue-select :options="FullTime" placeholder="Full Time" />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Job Description
                                  <span class="text-danger">*</span></label>
                                <textarea class="form-control" rows="3"></textarea>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Start Date
                                  <span class="text-danger">*</span></label>
                                <div class="form-icon">
                                  <datepicker v-model="startdate" class="datetimepicker form-control" :editable="true"
                                    :clearable="false" :input-format="dateFormat" />
                                  <span class="icon"><i class="fa-regular fa-calendar-days"></i></span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">End Date
                                  <span class="text-danger">*</span></label>
                                <div class="form-icon">
                                  <datepicker v-model="startdateOne" class="datetimepicker form-control"
                                    :editable="true" :clearable="false" :input-format="dateFormat" />
                                  <span class="icon"><i class="fa-regular fa-calendar-days"></i></span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">&nbsp;</label>
                                <div class="form-check">
                                  <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" />
                                    I Currently Working Here
                                  </label>
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
                <!-- /Experience1 Item -->

                <!-- Experience1 Item -->
                <div class="user-accordion-item">
                  <a href="javascript:void(0);" class="collapsed accordion-wrap" data-bs-toggle="collapse"
                    data-bs-target="#experience2">Hill Medical Hospital, Newcastle (15 Mar 2021 - 24 Jan 2023
                    )<span>Delete</span></a>
                  <div class="accordion-collapse collapse" id="experience2" data-bs-parent="#list-accord">
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
                                    <h5>Hospital Logo</h5>
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
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Title</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Hospital
                                  <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Year of Experience
                                  <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Location
                                  <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Employement </label>
                                <vue-select :options="PartTime" placeholder="Full Time" />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Job Description
                                  <span class="text-danger">*</span></label>
                                <textarea class="form-control" rows="3"></textarea>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Start Date
                                  <span class="text-danger">*</span></label>
                                <div class="form-icon">
                                  <datepicker v-model="startdateTwo" class="datetimepicker form-control"
                                    :editable="true" :clearable="false" :input-format="dateFormat" />
                                  <span class="icon"><i class="fa-regular fa-calendar-days"></i></span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">End Date
                                  <span class="text-danger">*</span></label>
                                <div class="form-icon">
                                  <datepicker v-model="startdateThree" class="datetimepicker form-control"
                                    :editable="true" :clearable="false" :input-format="dateFormat" />
                                  <span class="icon"><i class="fa-regular fa-calendar-days"></i></span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">&nbsp;</label>
                                <div class="form-check">
                                  <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" />
                                    I Currently Working Here
                                  </label>
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
                <!-- /Experience1 Item -->
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
import { ref } from "vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
const currentDateTwo = ref(new Date());
const currentDateThree = ref(new Date());
export default {
  data() {
    return {
      title: "Doctor Profile",
      text: "Home",
      text1: "Doctor Profile",
      startdate: currentDate,
      startdateOne: currentDateOne,
      startdateTwo: currentDateTwo,
      startdateThree: currentDateThree,
      dateFormat: "dd-MM-yyyy",
      FullTime: ["Full Time", "Part Time"],
      PartTime: ["Full Time", "Part Time"],
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
      this.$router.push("/doctor-experience-settings");
    },
  },
};
</script>
