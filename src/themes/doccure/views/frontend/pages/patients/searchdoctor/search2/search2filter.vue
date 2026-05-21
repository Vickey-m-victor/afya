<template>
  <div class="col-xl-3">
    <div class="card filter-lists">
      <div class="card-header">
        <div class="d-flex align-items-center filter-head justify-content-between">
          <h4>Filter</h4>
          <a href="#" class="text-secondary text-decoration-underline">Clear All</a>
        </div>
        <div class="filter-input">
          <div class="position-relative input-icon">
            <input type="text" class="form-control" />
            <span><i class="isax isax-search-normal-1"></i></span>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading1">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse1"
              aria-controls="collapse1"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Specialities</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse1" class="accordion-collapse show" aria-labelledby="heading1">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm2"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm2"> Urology </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm3"
                  />
                  <label class="form-check-label" for="checkebox-sm3"> Psychiatry </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm4"
                  />
                  <label class="form-check-label" for="checkebox-sm4"> Cardiology </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm5"
                  />
                  <label class="form-check-label" for="checkebox-sm5"> Pediatrics </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm6"
                  />
                  <label class="form-check-label" for="checkebox-sm6"> Urology </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm7"
                  />
                  <label class="form-check-label" for="checkebox-sm7"> Neurology </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm8"
                  />
                  <label class="form-check-label" for="checkebox-sm8">
                    Pulmonology
                  </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="view-content">
                <div class="viewall-one">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm9"
                      />
                      <label class="form-check-label" for="checkebox-sm9">
                        Orthopedics
                      </label>
                    </div>
                    <span class="filter-badge">21</span>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm10"
                      />
                      <label class="form-check-label" for="checkebox-sm10">
                        Endocrinology
                      </label>
                    </div>
                    <span class="filter-badge">21</span>
                  </div>
                </div>
                <div class="view-all">
                  <a
                    href="javascript:void(0);"
                    class="viewall-button-one text-secondary text-decoration-underline"
                    >View More</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading2">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
              aria-controls="collapse2"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Gender</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse2" class="accordion-collapse show" aria-labelledby="heading2">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm11"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm11"> Male </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm12"
                  />
                  <label class="form-check-label" for="checkebox-sm12"> Female </label>
                </div>
                <span class="filter-badge">21</span>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading3">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse3"
              aria-controls="collapse3"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Availability</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse3" class="accordion-collapse show" aria-labelledby="heading3">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm13"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm13">
                    Available Today
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm14"
                  />
                  <label class="form-check-label" for="checkebox-sm14">
                    Available Tomorrow
                  </label>
                </div>
              </div>
              <div class="view-content">
                <div class="viewall-two">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm15"
                      />
                      <label class="form-check-label" for="checkebox-sm15">
                        Available in Next 7 Days
                      </label>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm16"
                      />
                      <label class="form-check-label" for="checkebox-sm16">
                        Available in Next 30 Days
                      </label>
                    </div>
                  </div>
                </div>
                <div class="view-all">
                  <a
                    href="javascript:void(0);"
                    class="viewall-button-two text-secondary text-decoration-underline"
                    >View More</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading4">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse4"
              aria-controls="collapse4"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Pricing</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse4" class="accordion-collapse show" aria-labelledby="heading4">
            <div class="accordion-body pt-3">
              <div class="filter-range">
                <a-slider v-model:value="value" range />
              </div>
              <p class="mb-0">Range : $200 - $5695</p>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading5">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse5"
              aria-controls="collapse5"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Experience</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse5" class="accordion-collapse show" aria-labelledby="heading5">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm21"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm21"> 2+ Years </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm22"
                  />
                  <label class="form-check-label" for="checkebox-sm22"> 5+ Years </label>
                </div>
              </div>
              <div class="view-content">
                <div class="viewall-3">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm23"
                      />
                      <label class="form-check-label" for="checkebox-sm23">
                        7+ Years
                      </label>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm24"
                      />
                      <label class="form-check-label" for="checkebox-sm24">
                        10+ Years
                      </label>
                    </div>
                  </div>
                </div>
                <div class="view-all">
                  <a
                    href="javascript:void(0);"
                    class="viewall-button-3 text-secondary text-decoration-underline"
                    >View More</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading6">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse6"
              aria-controls="collapse6"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Clinics</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse6" class="accordion-collapse show" aria-labelledby="heading6">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm25"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm25">
                    Bright Smiles Dental Clinic
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm26"
                  />
                  <label class="form-check-label" for="checkebox-sm26">
                    Family Care Clinic
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm27"
                  />
                  <label class="form-check-label" for="checkebox-sm27">
                    Express Health Clinic
                  </label>
                </div>
              </div>
              <div class="view-content">
                <div class="viewall-4">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm28"
                      />
                      <label class="form-check-label" for="checkebox-sm28">
                        Restore Physical Therapy
                      </label>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkebox-sm29"
                      />
                      <label class="form-check-label" for="checkebox-sm29">
                        Blossom Women’s Health Clinic
                      </label>
                    </div>
                  </div>
                </div>
                <div class="view-all">
                  <a
                    href="javascript:void(0);"
                    class="viewall-button-4 text-secondary text-decoration-underline"
                    >View More</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading7">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse7"
              aria-controls="collapse7"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Consultation type</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse7" class="accordion-collapse show" aria-labelledby="heading7">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm30"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm30">
                    Audio Call
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm31"
                  />
                  <label class="form-check-label" for="checkebox-sm31">
                    Video Call
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm32"
                  />
                  <label class="form-check-label" for="checkebox-sm32">
                    Instant Counseling
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm33"
                  />
                  <label class="form-check-label" for="checkebox-sm33"> Chat </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item border-bottom">
          <div class="accordion-header" id="heading8">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse8"
              aria-controls="collapse8"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Languages</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse8" class="accordion-collapse show" aria-labelledby="heading8">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm34"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm34"> English </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm35"
                  />
                  <label class="form-check-label" for="checkebox-sm35"> French </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm36"
                  />
                  <label class="form-check-label" for="checkebox-sm36"> Spanish </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm37"
                  />
                  <label class="form-check-label" for="checkebox-sm37"> German </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header" id="heading9">
            <div
              class="accordion-button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse9"
              aria-controls="collapse9"
              role="button"
            >
              <div class="d-flex align-items-center w-100">
                <h5>Languages</h5>
                <div class="ms-auto">
                  <span><i class="fas fa-chevron-down"></i></span>
                </div>
              </div>
            </div>
          </div>
          <div id="collapse9" class="accordion-collapse show" aria-labelledby="heading9">
            <div class="accordion-body pt-3">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm38"
                    checked=""
                  />
                  <label class="form-check-label" for="checkebox-sm38">
                    <span>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                    </span>
                    5 Star
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm39"
                  />
                  <label class="form-check-label" for="checkebox-sm39">
                    <span>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                    </span>
                    4 Star
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm40"
                  />
                  <label class="form-check-label" for="checkebox-sm40">
                    <span>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                    </span>
                    3 Star
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm41"
                  />
                  <label class="form-check-label" for="checkebox-sm41">
                    <span>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                    </span>
                    2 Star
                  </label>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-sm42"
                  />
                  <label class="form-check-label" for="checkebox-sm42">
                    <span>
                      <i class="fa-solid fa-star text-orange me-1"></i>
                    </span>
                    1 Star
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
const value = ref([20, 50]);
export default {
  data() {
    return {
      value,
      merge: 10,
      format: {
        prefix: "$",
        suffix: "0",
      },
    };
  },
  mounted() {
    document.querySelectorAll(".fav-icon").forEach(function (element) {
      element.addEventListener("click", function () {
        element.classList.toggle("selected");
      });
    });

    if (document.getElementById("more") != null) {
      const button = document.getElementById("more");
      const container = document.getElementById("fill-more");

      let isLess = true;

      function showMoreLess() {
        if (isLess) {
          isLess = false;
          container.style.height = "auto";
          button.innerHTML = "Show less <i class='feather-arrow-up-circle ms-1'>";
        } else {
          isLess = true;
          container.style.height = "180px";
          button.innerHTML = "Show more <i class='feather-arrow-down-circle ms-1'></i>";
        }
      }

      button.addEventListener("click", showMoreLess);
    }
  },
};
</script>
