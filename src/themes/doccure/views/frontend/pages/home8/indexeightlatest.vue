<template>
  <!-- Latest Articles -->
  <section class="latest-articles-thirteen common-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-thirteen">
            <h2>Our Latest Articles</h2>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-4 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="articles-thirteen flex-fill">
            <div class="articles-thirteen-img">
              <router-link to="/blog-details"
                ><img
                  src="@/themes/doccure/assets/img/patients/articles-1.jpg"
                  alt="Articles"
                  class="img-fluid"
              /></router-link>
            </div>
            <div class="articles-thirteen-content">
              <h6>Paediatrician</h6>
              <h5>
                <router-link to="/blog-details"
                  >Our experts will take care of your child...</router-link
                >
              </h5>
              <p>Our experts are dedicated to taking care of your child,....</p>
              <div class="article-footer">
                <div class="post-author">
                  <router-link to="/doctor-profile"
                    ><img
                      src="@/themes/doccure/assets/img/doctors/doctor-thumb-01.jpg"
                      alt="Post Author"
                    /><span>Dr. Pamila Certis</span></router-link
                  >
                </div>
                <ul>
                  <li><i class="feather-message-square"></i>70</li>
                  <li><i class="feather-eye"></i>1.2k</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="articles-thirteen flex-fill">
            <div class="articles-thirteen-img">
              <router-link to="/blog-details"
                ><img
                  src="@/themes/doccure/assets/img/patients/articles-2.jpg"
                  alt="Articles"
                  class="img-fluid"
              /></router-link>
            </div>
            <div class="articles-thirteen-content">
              <h6>Paediatrician</h6>
              <h5>
                <router-link to="/blog-details"
                  >The first step of the toddler Beyond immunize</router-link
                >
              </h5>
              <p>Nurturing the first steps of your toddler extends beyond...</p>
              <div class="article-footer">
                <div class="post-author">
                  <router-link to="/doctor-profile"
                    ><img
                      src="@/themes/doccure/assets/img/doctors/doctor-thumb-02.jpg"
                      alt="Post Author"
                    /><span>Dr. Ronald Jacobs</span></router-link
                  >
                </div>
                <ul>
                  <li><i class="feather-message-square"></i>70</li>
                  <li><i class="feather-eye"></i>1.2k</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 d-flex aos" data-aos="fade-up">
          <div class="articles-thirteen flex-fill">
            <div class="articles-thirteen-img">
              <router-link to="/blog-details"
                ><img
                  src="@/themes/doccure/assets/img/patients/articles-3.jpg"
                  alt="Articles"
                  class="img-fluid"
              /></router-link>
            </div>
            <div class="articles-thirteen-content">
              <h6>Paediatrician</h6>
              <h5>
                <router-link to="/blog-details"
                  >Balanced Diet Chart for Children under age 10.</router-link
                >
              </h5>
              <p>
                Discover a balanced diet chart for children, ensuring optimal
                nutrition....
              </p>
              <div class="article-footer">
                <div class="post-author">
                  <router-link to="/doctor-profile"
                    ><img
                      src="@/themes/doccure/assets/img/doctors/doctor-thumb-03.jpg"
                      alt="Post Author"
                    /><span>Dr. Marie Wells</span></router-link
                  >
                </div>
                <ul>
                  <li><i class="feather-message-square"></i>70</li>
                  <li><i class="feather-eye"></i>1.2k</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Latest Articles -->

  <!-- Feedback -->
  <section class="feedback-section-thirteen common-padding">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="feedback-main-thirteen aos" data-aos="fade-up">
            <div class="feedback-all-img">
              <img
                src="@/themes/doccure/assets/img/feedback-inner.png"
                alt="image"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="feedback-main-content aos" data-aos="fade-up">
            <h2>Download <br />The Doccure App Today!</h2>
            <p>
              Rasakan kemudahan pembayaran melalui aplikasi SmartInPays.
              Jalan-jalan, membayar tagihan, donasi di ujung jari Anda.
            </p>
            <div class="feedback-inner-img">
              <div class="feedback-inner-imgone">
                <a href="javascript:void(0);"
                  ><img src="@/themes/doccure/assets/img/icons/google-play.svg" alt="Store"
                /></a>
              </div>
              <div class="feedback-inner-imgtwo">
                <a href="javascript:void(0);"
                  ><img src="@/themes/doccure/assets/img/icons/app-store.svg" alt="Store"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feedback-bg-icons">
      <img src="@/themes/doccure/assets/img/bg/pluse-1.png" alt="Pluse" />
      <img src="@/themes/doccure/assets/img/bg/pluse-2.png" alt="Pluse" />
      <img src="@/themes/doccure/assets/img/bg/pluse-2.png" alt="Pluse" />
    </div>
  </section>
  <!-- Feedback -->
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
