<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content doctor-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-xl-3 theiaStickySidebar">
            <!-- Profile Sidebar -->
            <profilesidebar></profilesidebar>
            <!-- /Profile Sidebar -->
          </div>

          <div class="col-lg-8 col-xl-9">
            <div class="dashboard-header">
              <h3>Appointments</h3>
              <ul class="header-list-btns">
                <li>
                  <div class="input-block dash-search-input">
                    <input type="text" class="form-control" placeholder="Search" />
                    <span class="search-icon"
                      ><i class="isax isax-search-normal"></i
                    ></span>
                  </div>
                </li>
                <li>
                  <div class="view-icons">
                    <router-link to="/patient-appointments" class="active"
                      ><i class="isax isax-grid-7"></i
                    ></router-link>
                  </div>
                </li>
                <li>
                  <div class="view-icons">
                    <router-link to="/patient-appointments-grid"
                      ><i class="fa-solid fa-th"></i
                    ></router-link>
                  </div>
                </li>
              </ul>
            </div>
            <div class="appointment-tab-head">
              <div class="appointment-tabs">
                <ul class="nav nav-pills inner-tab" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="pills-upcoming-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-upcoming"
                      type="button"
                      role="tab"
                      aria-controls="pills-upcoming"
                      aria-selected="false"
                    >
                      Upcoming<span>21</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-cancel-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-cancel"
                      type="button"
                      role="tab"
                      aria-controls="pills-cancel"
                      aria-selected="true"
                    >
                      Cancelled<span>16</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="pills-complete-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-complete"
                      type="button"
                      role="tab"
                      aria-controls="pills-complete"
                      aria-selected="true"
                    >
                      Completed<span>214</span>
                    </button>
                  </li>
                </ul>
              </div>
              <appointments-filter></appointments-filter>
            </div>

            <div class="tab-content appointment-tab-content">
              <patients-upcoming></patients-upcoming>
              <patients-cancelled></patients-cancelled>
              <patients-completed></patients-completed>
            </div>
          </div>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
  <!-- Edit Dependent Modal-->
  <div class="modal fade custom-modals" id="add_review">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Review</h3>
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
          <div class="add-dependent">
            <div class="modal-body pb-0">
              <div class="row">
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label"
                      >Rating <span class="text-danger">*</span></label
                    >
                    <div class="selection-wrap">
                      <div class="d-inline-block">
                        <div class="rating-selction">
                          <input type="radio" name="rating" value="5" id="rating5" />
                          <label for="rating5"><i class="fa-solid fa-star"></i></label>
                          <input type="radio" name="rating" value="4" id="rating4" />
                          <label for="rating4"><i class="fa-solid fa-star"></i></label>
                          <input type="radio" name="rating" value="3" id="rating3" />
                          <label for="rating3"><i class="fa-solid fa-star"></i></label>
                          <input
                            type="radio"
                            name="rating"
                            value="2"
                            id="rating2"
                            checked
                          />
                          <label for="rating2"><i class="fa-solid fa-star"></i></label>
                          <input
                            type="radio"
                            name="rating"
                            value="1"
                            id="rating1"
                            checked
                          />
                          <label for="rating1"><i class="fa-solid fa-star"></i></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label"
                      >Comments <span class="text-danger">*</span></label
                    >
                    <textarea class="form-control" rows="3"></textarea>
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
                Add Review
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Dependent Modal-->

  <!-- Edit Dependent Modal-->
  <div class="modal fade custom-modals" id="view_review">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Review Details</h3>
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
          <div class="modal-body pb-0">
            <div class="mb-3">
              <div class="d-flex justify-content-between flex-wrap gap-3">
                <div>
                  <label class="form-label text-gray-6">Review for</label>
                  <div class="d-flex align-items-center">
                    <span class="user-avatar me-2">
                      <img src="@/themes/doccure/assets/img/doctors/doctor-thumb-01.jpg" alt="img" />
                    </span>
                    <h6 class="fs-16 fw-medium">Dr Edalin</h6>
                  </div>
                </div>
                <div>
                  <label class="form-label text-gray-6">Review By </label>
                  <div class="d-flex align-items-center">
                    <span class="user-avatar me-2">
                      <img
                        src="@/themes/doccure/assets/img/doctors-dashboard/profile-06.jpg"
                        alt="img"
                      />
                    </span>
                    <h6 class="fs-16 fw-medium">Hendrita</h6>
                  </div>
                </div>
                <div>
                  <label class="form-label text-gray-6">Rating</label>
                  <div class="d-flex align-items-center rating-list">
                    <i class="fa-solid fa-star selected"></i>
                    <i class="fa-solid fa-star selected"></i>
                    <i class="fa-solid fa-star selected"></i>
                    <i class="fa-solid fa-star selected"></i>
                    <i class="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-0">
              <div class="review-wrap">
                <label class="form-label text-gray-6">Review</label>
                <p class="mb-0">
                  Dr. Edalin provided exceptional care and took the time to listen to my
                  concerns. I’m feeling better than ever and highly recommend him!"
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- /Edit Dependent Modal-->
</template>
<script>
export default {
  data() {
    return {
      title: "Patient",
      text: "Appointments",
      text1: "Patient Appointments",
    };
  },
};
</script>
