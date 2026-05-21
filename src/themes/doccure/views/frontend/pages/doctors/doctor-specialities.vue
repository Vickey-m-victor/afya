<template>
  <div class="main-wrapper">
    <doctor-header></doctor-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <doctorsidebar></doctorsidebar>

          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Speciality & Services</h3>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    class="btn btn-primary prime-btn add-speciality"
                    @click="add()"
                    >Add New Speciality</a
                  >
                </li>
              </ul>
            </div>

            <div class="accordions" id="list-accord">
              <!-- Spaciality Item -->
              <div class="user-accordion-item">
                <a
                  href="javascript:;"
                  class="accordion-wrap"
                  data-bs-toggle="collapse"
                  data-bs-target="#cardiology"
                  >Cardiology<span>Delete</span></a
                >
                <div
                  class="accordion-collapse collapse show"
                  id="cardiology"
                  data-bs-parent="#list-accord"
                >
                  <div class="content-collapse">
                    <div class="add-service-info">
                      <div class="add-info">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Speciality <span class="text-danger">*</span></label
                              >
                              <vue-select :options="CardSel" placeholder="Cardiology" />
                            </div>
                          </div>
                        </div>
                        <div
                          class="row service-cont"
                          v-for="item in socialMediaThree"
                          :key="item.id"
                        >
                          <div class="col-md-3">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Service <span class="text-danger">*</span></label
                              >
                              <vue-select
                                :options="SelectService"
                                placeholder="Select Service"
                              />
                            </div>
                          </div>
                          <div class="col-md-2">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Price ($) <span class="text-danger">*</span></label
                              >
                              <input type="text" class="form-control" placeholder="454" />
                            </div>
                          </div>
                          <div class="col-md-7">
                            <div class="d-flex align-items-center">
                              <div class="form-wrap w-100">
                                <label class="col-form-label">About Service</label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="form-wrap ms-2">
                                <label class="col-form-label d-block">&nbsp;</label>
                                <a
                                  href="javascript:;"
                                  class="trash-icon trash"
                                  @click="deleteEventThree(socialMedia)"
                                  >Delete</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="text-end">
                        <a
                          href="javascript:;"
                          class="add-serv more-item mb-0"
                          @click="addThree()"
                          >Add New Service</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Spaciality Item -->

              <!-- Spaciality Item -->
              <div class="user-accordion-item">
                <a
                  href="javascript:;"
                  class="accordion-wrap collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#neurology"
                  >Neurology<span>Delete</span></a
                >
                <div
                  class="accordion-collapse"
                  id="neurology"
                  data-bs-parent="#list-accord"
                >
                  <div class="content-collapse">
                    <div class="add-service-info">
                      <div class="add-info">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Speciality <span class="text-danger">*</span></label
                              >
                              <vue-select
                                :options="SpecCardSel"
                                placeholder="Neruology"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          class="row service-cont"
                          v-for="item in socialMediaTwo"
                          :key="item.id"
                        >
                          <div class="col-md-3">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Service <span class="text-danger">*</span></label
                              >
                              <vue-select
                                :options="ServiceSel"
                                placeholder="Select Service"
                              />
                            </div>
                          </div>
                          <div class="col-md-2">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Price ($) <span class="text-danger">*</span></label
                              >
                              <input type="text" class="form-control" placeholder="454" />
                            </div>
                          </div>
                          <div class="col-md-7">
                            <div class="d-flex align-items-center">
                              <div class="form-wrap w-100">
                                <label class="col-form-label">About Service</label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="form-wrap ms-2">
                                <label class="col-form-label d-block">&nbsp;</label>
                                <a
                                  href="javascript:;"
                                  class="trash-icon trash"
                                  @click="deleteEventTwo(socialMedia)"
                                  >Delete</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="text-end">
                        <a
                          href="javascript:;"
                          class="add-serv more-item mb-0"
                          @click="addTwo()"
                          >Add New Service</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Spaciality Item -->

              <!-- Spaciality Item -->
              <div class="user-accordion-item" v-for="item in socialMedia" :key="item.id">
                <a
                  href="javascript:;"
                  class="accordion-wrap collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#urology"
                  @click="deleteEvent(socialMedia)"
                  >Urology<span>Delete</span></a
                >
                <div
                  class="accordion-collapse"
                  id="urology"
                  data-bs-parent="#list-accord"
                >
                  <div class="content-collapse">
                    <div class="add-service-info">
                      <div class="add-info">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Speciality <span class="text-danger">*</span></label
                              >
                              <vue-select
                                :options="UrologySelect"
                                placeholder="Urology"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          class="row service-cont"
                          v-for="item in socialMediaOne"
                          :key="item.id"
                        >
                          <div class="col-md-3">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Service <span class="text-danger">*</span></label
                              >
                              <vue-select
                                :options="SurgerySelect"
                                placeholder="Select Service"
                              />
                            </div>
                          </div>
                          <div class="col-md-2">
                            <div class="form-wrap">
                              <label class="col-form-label"
                                >Price ($) <span class="text-danger">*</span></label
                              >
                              <input type="text" class="form-control" placeholder="454" />
                            </div>
                          </div>
                          <div class="col-md-7">
                            <div class="d-flex align-items-center">
                              <div class="form-wrap w-100">
                                <label class="col-form-label">About Service</label>
                                <input type="text" class="form-control" />
                              </div>
                              <div class="form-wrap ms-2">
                                <label class="col-form-label d-block">&nbsp;</label>
                                <a
                                  href="javascript:;"
                                  class="trash-icon trash"
                                  @click="deleteEventOne(socialMedia)"
                                  >Delete</a
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="text-end">
                        <a
                          href="javascript:;"
                          class="add-serv more-item mb-0"
                          @click="addOne()"
                          >Add New Service</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /Spaciality Item -->
            </div>

            <div class="modal-btn text-end">
              <a href="javascript:;" class="btn btn-gray">Cancel</a>
              <button class="btn btn-primary prime-btn">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <doctor-footer></doctor-footer>
</template>
<script>
export default {
  data() {
    return {
      title: "Doctor",
      text: "Spaciality & Services",
      text1: "Spaciality & Services",
      CardSel: ["Cardiology", "Neurology", "Urology"],
      SpecCardSel: ["Cardiology", "Neurology", "Urology"],
      ServiceSel: ["Select Service", "Surgery", "General Checkup"],
      UrologySelect: ["Cardiology", "Neurology", "Urology"],
      SurgerySelect: ["Select Service", "Surgery", "General Checkup"],
      SelectService: ["Select Service", "Surgery", "General Checkup"],
      socialMedia: [
        {
          id: 1,
        },
      ],
      socialMediaOne: [
        {
          id: 1,
        },
      ],
      socialMediaTwo: [
        {
          id: 1,
        },
      ],
      socialMediaThree: [
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
    deleteEventOne: function (socialMediaOne) {
      this.socialMediaOne.splice(this.socialMediaOne.indexOf(socialMediaOne), 1);
    },
    deleteEventTwo: function (socialMediaTwo) {
      this.socialMediaTwo.splice(this.socialMediaTwo.indexOf(socialMediaTwo), 1);
    },
    deleteEventThree: function (socialMediaThree) {
      this.socialMediaThree.splice(this.socialMediaThree.indexOf(socialMediaThree), 1);
    },
    add() {
      const newId = this.socialMedia.length + 1;
      this.socialMedia.push({
        id: newId,
      });
    },
    addOne() {
      const newId = this.socialMediaOne.length + 1;
      this.socialMediaOne.push({
        id: newId,
      });
    },
    addTwo() {
      const newId = this.socialMediaTwo.length + 1;
      this.socialMediaTwo.push({
        id: newId,
      });
    },
    addThree() {
      const newId = this.socialMediaThree.length + 1;
      this.socialMediaThree.push({
        id: newId,
      });
    },
  },
};
</script>
