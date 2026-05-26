<template>
  <!-- Add Dependent Modal-->
  <div class="modal fade custom-modals" id="add_dependent">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Dependant</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="javascript:void(0)">
          <div class="add-dependent">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-wrap pb-0">
                    <div class="change-avatar img-upload">
                      <div class="profile-img">
                        <i class="fa-solid fa-file-image"></i>
                      </div>
                      <div class="upload-img">
                        <h5>Profile Image</h5>
                        <div class="imgs-load d-flex align-items-center">
                          <div class="change-photo">
                            Upload New
                            <input type="file" class="upload" />
                          </div>
                          <a href="#" class="upload-remove">Remove</a>
                        </div>
                        <p>
                          Your Image should Below 4 MB, Accepted format
                          ipg,png,svg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Name</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Relationship</label>
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label"
                      >DOB <span class="text-danger">*</span></label
                    >
                    <div class="form-icon">
                      <datepicker
                        v-model="startdate"
                        class="datetimepicker form-control"
                        :editable="true"
                        :clearable="false"
                        :input-format="dateFormat"
                      />
                      <span class="icon"
                        ><i class="fa-regular fa-calendar-days"></i
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Select Gender</label>
                    <vue-select
                      :options="MaleSelect"
                      id="maleselct"
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a
                href="#"
                class="btn btn-gray"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Add Dependent Modal-->

  <!-- Edit Dependent Modal-->
  <div class="modal fade custom-modals" id="edit_dependent">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Edit Dependant</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form action="javascript:void(0)">
          <div class="add-dependent">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-wrap pb-0">
                    <div class="change-avatar img-upload">
                      <div class="profile-img">
                        <i class="fa-solid fa-file-image"></i>
                      </div>
                      <div class="upload-img">
                        <h5>Profile Image</h5>
                        <div class="imgs-load d-flex align-items-center">
                          <div class="change-photo">
                            Upload New
                            <input type="file" class="upload" />
                          </div>
                          <a href="#" class="upload-remove">Remove</a>
                        </div>
                        <p>
                          Your Image should Below 4 MB, Accepted format
                          jpg,png,svg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Name</label>
                    <input type="text" class="form-control" value="Laura" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Relationship</label>
                    <input type="text" class="form-control" value="Mother" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label"
                      >DOB <span class="text-danger">*</span></label
                    >
                    <div class="form-icon">
                      <datepicker
                        v-model="startdate"
                        class="datetimepicker form-control"
                        :editable="true"
                        value="08/01/1960"
                        :clearable="false"
                        :input-format="dateFormat"
                      />
                      <span class="icon"
                        ><i class="fa-regular fa-calendar-days"></i
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-wrap">
                    <label class="col-form-label">Select Gender</label>
                    <vue-select
                      :options="FemaleSel"
                      id="femalesel"
                      placeholder="Female"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="modal-btn text-end">
              <a
                href="#"
                class="btn btn-gray"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                >Cancel</a
              >
              <button type="submit" class="btn btn-primary prime-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Dependent Modal-->
</template>
<script>
import { ref } from "vue";
const currentDate = ref(new Date());
export default {
  data() {
    return {
      MaleSelect: ["Select", "Male", "Female"],
      FemaleSel: ["Select", "Male", "Female"],    
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
    };
  },
};
</script>
