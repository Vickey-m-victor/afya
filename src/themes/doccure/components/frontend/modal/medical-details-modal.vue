<template>
  <!-- Add Medical Detail -->
  <div class="modal fade custom-modals" id="add-med-record">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Vitals</h5>
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
          <div class="modal-body pb-0">
            <div class="timing-modal">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >BMI <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Heart Rate <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Weight <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >FBC <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="col-form-label"
                      >Date <span class="text-danger">*</span></label
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
              </div>
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
                Add Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Medical Detail -->

  <!-- Edit Medical Detail -->
  <div class="modal fade custom-modals" id="edit-med-record">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Medical Details</h5>
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
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >BMI <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" value="20.1 kg/m2" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Heart Rate <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" value="140 Bpm" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >Weight <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" value="300" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label"
                      >FBC <span class="text-danger">*</span></label
                    >
                    <input type="text" class="form-control" value="70 - 90" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="col-form-label"
                      >Date <span class="text-danger">*</span></label
                    >
                    <div class="form-icon">
                      <datepicker
                        v-model="startdateOne"
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
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a href="#" class="btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-md btn-primary-gradient rounded-pill">
                Save Details
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Medical Detail -->

  <!-- Medical Detail -->
  <div class="modal fade custom-modals" id="med-detail">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Vital Details</h5>
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
          <div class="modal-body pb-0">
            <div class="med-detail-patient">
              <div class="med-patient">
                <span
                  ><img src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg" alt="Img"
                /></span>
                <div class="name-detail">
                  <h5>Hendrita Kearns</h5>
                  <ul>
                    <li>Age : 42</li>
                    <li>Female</li>
                    <li>AB+ve</li>
                  </ul>
                </div>
              </div>
              <div class="date-cal">
                <p>
                  <span><i class="isax isax-calendar-tick5 me-1"></i>Last Updated</span>24
                  Mar 2024
                </p>
              </div>
            </div>
            <div class="med-detail-item pb-3">
              <div class="row">
                <div class="col-md-6 col-lg-4">
                  <div class="health-records icon-red">
                    <span><i class="fa-solid fa-syringe"></i>Blood Pressure</span>
                    <h3>100 mg/dl</h3>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="health-records icon-orange">
                    <span><i class="fa-solid fa-heart"></i>Heart Rate</span>
                    <h3>140 Bpm</h3>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="health-records icon-dark-blue">
                    <span><i class="fa-solid fa-notes-medical"></i>Glucose Level</span>
                    <h3>70 - 90</h3>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="health-records icon-amber mb-0">
                    <span
                      ><i class="fa-solid fa-temperature-high"></i>Body Temprature</span
                    >
                    <h3>37.5 C</h3>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="health-records icon-purple mb-0">
                    <span><i class="fa-solid fa-user-pen"></i>BMI </span>
                    <h3>20 kg/m2</h3>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4">
                  <div class="health-records icon-blue mb-0">
                    <span><i class="fa-solid fa-highlighter"></i>SPo2</span>
                    <h3>96%</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Medical Detail -->

  <!-- Delete -->
  <div class="modal fade custom-modals" id="delete_modal">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-4 text-center">
          <form @submit.prevent="submitForm">
            <span class="del-icon mb-2 mx-auto">
              <i class="isax isax-trash"></i>
            </span>
            <h3 class="mb-2">Delete Vital</h3>
            <p class="mb-3">Are you sure you want to delete this vital?</p>
            <div class="d-flex justify-content-center flex-wrap gap-3">
              <a href="#" class="btn btn-md btn-dark rounded-pill" data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-md btn-primary-gradient rounded-pill">
                Yes Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Delete -->
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
export default {
  data() {
    return {
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/medical-details");
    },
  },
};
</script>
