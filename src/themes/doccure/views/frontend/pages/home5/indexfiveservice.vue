<template>
  <!-- Need To Know -->
  <section class="need-to-know-section">
    <div class="bg-shapes">
      <img src="@/themes/doccure/assets/img/bg/cardiac-bg.png" alt="image" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-sm-12 aos" data-aos="fade-up">
          <div class="section-header-one section-header-slider">
            <h2 class="section-title mb-0">Need To Know Cardiac Conditions</h2>
          </div>
          <div class="accordion-condition" id="accord-parent">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <a
                  href="javascript:void(0);"
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Heart Failure
                </a>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accord-parent"
              >
                <div class="accordion-body">
                  <div class="accordion-content">
                    <p>
                      If one of the valves in your heart becomes diseased it can
                      affect the flow of blood. This can happen in one of two
                      ways: valve stenosis (where the valve does not fully open
                      and obstructs or restricts flow) or valve incompetence
                      (where the valve does not close properly and blood is
                      allowed to leak backwards)....
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <a
                  href="javascript:void(0);"
                  class="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  Heart Valve Disease
                </a>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse show"
                data-bs-parent="#accord-parent"
              >
                <div class="accordion-body">
                  <div class="accordion-content">
                    <p>
                      If one of the valves in your heart becomes diseased it can
                      affect the flow of blood. This can happen in one of two
                      ways: valve stenosis (where the valve does not fully open
                      and obstructs or restricts flow) or valve incompetence
                      (where the valve does not close properly and blood is
                      allowed to leak backwards)....
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <a
                  href="javascript:void(0);"
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseThree"
                >
                  Pacemakers and Defibrillators
                </a>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accord-parent"
              >
                <div class="accordion-body">
                  <div class="accordion-content">
                    <p>
                      If one of the valves in your heart becomes diseased it can
                      affect the flow of blood. This can happen in one of two
                      ways: valve stenosis (where the valve does not fully open
                      and obstructs or restricts flow) or valve incompetence
                      (where the valve does not close properly and blood is
                      allowed to leak backwards)....
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary">Learn More</a>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 aos" data-aos="fade-up">
          <div class="gallery-box-block">
            <div class="box-detail">
              <img
                src="@/themes/doccure/assets/img/features/feature-13.jpg"
                class="img-fluid"
                alt="image"
              />
            </div>
            <div class="box-detail">
              <img
                src="@/themes/doccure/assets/img/features/feature-14.jpg"
                class="img-fluid"
                alt="image"
              />
              <div class="bg-shapes">
                <img src="@/themes/doccure/assets/img/bg/cardiac-bg-02.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Need To Know -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
