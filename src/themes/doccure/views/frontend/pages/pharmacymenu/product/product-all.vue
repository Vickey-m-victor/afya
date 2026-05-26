<template>
  <div class="main-wrapper">
    <layoutheader></layoutheader>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-5 col-lg-3 col-xl-3 theiaStickySidebar">
            <div class="stickysidebar">
              <!-- Search Filter -->
              <div class="card search-filter">
                <div class="card-header">
                  <h4 class="card-title mb-0">Filter</h4>
                </div>
                <div class="card-body">
                  <div class="filter-widget">
                    <h4>Categories</h4>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" checked />
                        <span class="checkmark"></span> Family Care
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Skin Care
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Hair Care
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Lip Care
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Men's Care
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Women's Care
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Baby care
                      </label>
                    </div>
                  </div>
                  <div class="btn-search">
                    <button type="button" class="btn w-100">Search</button>
                  </div>
                </div>
              </div>
              <!-- /Search Filter -->
            </div>
          </div>

          <medlifemedical></medlifemedical>
        </div>
      </div>
    </div>
    <indexfooter></indexfooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Pharmacy",
      text: "Pain Relief",
      text1: "Pain Relief",
    };
  },
};
</script>
