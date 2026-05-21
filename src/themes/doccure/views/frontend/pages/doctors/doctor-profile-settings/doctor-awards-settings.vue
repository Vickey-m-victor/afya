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
              <h3>Awards</h3>
              <ul>
                <li>
                  <a href="javascript:void(0);" class="btn btn-primary prime-btn add-awrads" @click="add()">Add New
                    Award</a>
                </li>
              </ul>
            </div>

            <form @submit.prevent="submitForm">
              <div class="accordions awrad-infos" id="list-accord">
                <!-- Awards Item -->
                <div class="user-accordion-item" v-for="item in socialMedia" :key="item.id">
                  <a href="javascript:void(0);" class="accordion-wrap" data-bs-toggle="collapse"
                    data-bs-target="#award1" @click="deleteEvent(socialMedia)">Awards<span>Delete</span></a>
                  <div class="accordion-collapse collapse show" id="award1" data-bs-parent="#list-accord">
                    <div class="content-collapse">
                      <div class="add-service-info">
                        <div class="add-info">
                          <div class="row align-items-center">
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Award Name</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Year <span class="text-danger">*</span></label>
                                <div class="form-icon">
                                  <datepicker v-model="startdate" class="datetimepicker form-control" :editable="true"
                                    :clearable="false" :input-format="dateFormat" />
                                  <span class="icon"><i class="fa-regular fa-calendar-days"></i></span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Description
                                  <span class="text-danger">*</span></label>
                                <textarea class="form-control" rows="3"></textarea>
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
                <!-- /Awards Item -->

                <!-- Awards Item -->
                <div class="user-accordion-item">
                  <a href="javascript:void(0);" class="collapsed accordion-wrap" data-bs-toggle="collapse"
                    data-bs-target="#award2">Best Surgeon<span>Delete</span></a>
                  <div class="accordion-collapse collapse" id="award2" data-bs-parent="#list-accord">
                    <div class="content-collapse">
                      <div class="add-service-info">
                        <div class="add-info">
                          <div class="row align-items-center">
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Award Name</label>
                                <input type="text" class="form-control" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-wrap">
                                <label class="col-form-label">Year <span class="text-danger">*</span></label>
                                <div class="form-icon">
                                  <datepicker v-model="startdateOne" class="datetimepicker form-control"
                                    :editable="true" :clearable="false" :input-format="dateFormat" />
                                  <span class="icon"><i class="fa-regular fa-calendar-days"></i></span>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-wrap">
                                <label class="col-form-label">Description
                                  <span class="text-danger">*</span></label>
                                <textarea class="form-control" rows="3"></textarea>
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
                <!-- /Awards Item -->
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
export default {
  data() {
    return {
      title: "Doctor Profile",
      text: "Home",
      text1: "Doctor Profile",
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
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
      this.$router.push("/doctor-awards-settings");
    },
  },
};
</script>
