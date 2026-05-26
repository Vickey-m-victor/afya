<template>
  <!-- Finent-Veterinary -->
  <section class="finent-veterinary-sec">
    <div class="floating-bg">
      <img src="@/themes/doccure/assets/img/bg/small-paw-2.png" alt="paw-image" />
      <img src="@/themes/doccure/assets/img/bg/care-sec-bg-1.png" alt="paw-image" />
      <img src="@/themes/doccure/assets/img/bg/small-paw-2.png" alt="paw-image" />
    </div>
    <div class="container">
      <div class="row align-items-end">
        <div class="col-lg-6">
          <div class="veterinary-care-info">
            <div
              class="section-header-fourteen service-inner-fourteen"
              data-aos="fade-up"
            >
              <h2>The Finest Veterinary Care</h2>
              <p>
                Veterinary care encompasses a wide range of services aimed at
                promoting the health and well-being of animals.
              </p>
            </div>
            <ul class="care-list aos" data-aos="fade-up">
              <li v-for="item in IndexSevenFinest" :key="item.title">
                <span :class="item.SpanClass">{{item.SpanNo}}</span>
                <div class="care-list-info">
                  <h5>{{item.Title}}</h5>
                  <p>
                    {{item.Content}}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="sec-col-img">
            <img src="@/themes/doccure/assets/img/bg/dog-img.png" class="img-fluid" alt="Img" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Finent-Veterinary -->

  <!-- Our Doctors -->
  <div class="blog-section-fourteen our-doctor-twelve">
    <div class="floating-bg">
      <img src="@/themes/doccure/assets/img/bg/expert-sec-bg-01.png" alt="paw-image" >
      <img src="@/themes/doccure/assets/img/bg/expert-sec-bg-02.png" alt="paw-image" >
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-header-fourteen service-inner-fourteen">
            <h2>Meet Our Experts</h2>
            <p>We have over 30 years of experience treating animals and we are always excited to add to our ever-expanding family.</p>
          </div>
        </div>	
        <div class="col-xl-3 col-lg-4 col-md-6 aos" data-aos="fade-up" 
          v-for="item in IndexSevenDoctors" :key="item.title">
          <div class="card blog-inner-fourt-all">
            <div class="card-body blog-inner-fourt-main">
              <div class="blog-inner-right-fourt">
                <router-link to="/doctor-profile">
                  <div class="blog-inner-right-img">
                    <img :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)" alt="image" class="img-fluid ">
                  </div>
                </router-link>
                <div class="doc-info">
                  <h4 class="blog-inner-right-fourt-care">
                    <router-link to="doctor-profile" >{{item.Name}}</router-link>
                    <span>{{item.Roll}}</span>
                  </h4>
                  <div class="card-cal-icon">
                    <router-link to="/booking-2"><i class="fa-solid fa-calendar-days"></i></router-link>
                  </div>
                </div>									
              </div>
            </div>
          </div>																					
        </div>					
      </div>
      
      <div class="blog-btn-sec text-center aos aos-init aos-animate" data-aos="fade-up">
        <router-link to="/search" class="btn btn-primary btn-view">View all Doctors</router-link>
      </div>
    </div>
  </div>
  <!-- /Our Doctors -->

  <!-- Pricing -->
  <section class="home-twelve-pricing">
    <div class="floating-bg">
      <img src="@/themes/doccure/assets/img/bg/price-sec-bg-01.png" alt="paw-image">
      <img src="@/themes/doccure/assets/img/bg/price-sec-paw-01.png" alt="paw-image">
      <img src="@/themes/doccure/assets/img/bg/price-sec-paw-02.png" alt="paw-image">
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 aos" data-aos="fade-up">
          <div class="section-header-fourteen service-inner-fourteen">
            <h2>Pricing Packages</h2>
            <p>Veterinary care encompasses a wide range of services aimed at promoting the health and well-being of animals.</p>
          </div>
        </div>
      </div>
      <div class="pricing-tab-panel text-center">
        <ul class="nav nav-pills inner-tab " id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-monthly-tab" data-bs-toggle="pill" data-bs-target="#pills-monthly" type="button" role="tab" aria-controls="pills-monthly" aria-selected="true">Monthly</button>
          </li>	
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-yearly-tab" data-bs-toggle="pill" data-bs-target="#pills-yearly" type="button" role="tab" aria-controls="pills-yearly" aria-selected="false" tabindex="-1">yearly</button>
          </li>
        </ul>
        <div class="tab-content pt-0">
          <div class="tab-pane fade active show" id="pills-monthly" role="tabpanel" aria-labelledby="pills-monthly-tab">
            <div class="row row-gap justify-content-center align-items-end">
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="price-card-twelve">
                  <div class="price-content">
                    <div class="card-title">
                      <h3>Basic</h3>
                      <span>The most basic plan</span>
                    </div>
                    <div class="price">
                      <h2>$19</h2>
                      <span>Monthly</span>
                      <p>This Plan excludes online consultation options for the user</p>
                    </div>
                    <div class="pack-details">
                      <ul>
                        <li>
                          <i class="feather-check-circle"></i>30 day Services
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>15 Pet Shower
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>6 Hair fall Pack
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Vaccination
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Basic Checkup
                        </li>
                      </ul>
                    </div>
                    <div class="price-btn w-100">
                      <router-link to="/pricing" class="btn w-100">Join the Plan</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="price-card-twelve active">
                  <div class="price-content">
                    <div class="popular-head">
                      <span class="d-flex align-items-center"><i class="fa-solid fa-dog me-2"></i>Most Popular</span>
                    </div>
                    <div class="card-title">
                      <h3>Premium</h3>
                      <span>Exclusive For pet owners</span>
                    </div>
                    <div class="price">
                      <h2>$29</h2>
                      <span>Monthly</span>
                      <p>This plan includes online consultation options for the user</p>
                    </div>
                    <div class="pack-details">
                      <ul>
                        <li>
                          <i class="feather-check-circle"></i>30 day Services
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>5 Pet Shower
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>2 Hair fall Pack
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>3 Vaccination
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>5 Basic Checkup
                        </li>
                      </ul>
                    </div>
                    <div class="price-btn w-100">
                      <router-link to="/pricing" class="btn w-100">Join the Plan</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="price-card-twelve">
                  <div class="price-content">
                    <div class="card-title">
                      <h3>Exclusive</h3>
                      <span>The most profitable plan</span>
                    </div>
                    <div class="price">
                      <h2>$59</h2>
                      <span>Monthly</span>
                      <p>This plan includes online consultation options for the user</p>
                    </div>
                    <div class="pack-details">
                      <ul>
                        <li>
                          <i class="feather-check-circle"></i>30 day Services
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>15 Pet Shower
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>6 Hair fall Pack
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Vaccination
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Basic Checkup
                        </li>
                      </ul>
                    </div>
                    <div class="price-btn w-100">
                      <router-link to="/pricing" class="btn w-100">Join the Plan</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="pills-yearly" role="tabpanel" aria-labelledby="pills-yearly-tab">
            <div class="row row-gap justify-content-center align-items-end">
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="price-card-twelve">
                  <div class="price-content">
                    <div class="card-title">
                      <h3>Basic</h3>
                      <span>The most basic plan</span>
                    </div>
                    <div class="price">
                      <h2>$19</h2>
                      <span>Yearly</span>
                      <p>This Plan excludes online consultation options for the user</p>
                    </div>
                    <div class="pack-details">
                      <ul>
                        <li>
                          <i class="feather-check-circle"></i>30 day Services
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>15 Pet Shower
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>6 Hair fall Pack
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Vaccination
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Basic Checkup
                        </li>
                      </ul>
                    </div>
                    <div class="price-btn w-100">
                      <router-link to="/pricing" class="btn w-100">Join the Plan</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="price-card-twelve active">
                  <div class="price-content">
                    <div class="popular-head">
                      <span class="d-flex align-items-center"><i class="fa-solid fa-dog me-2"></i>Most Popular</span>
                    </div>
                    <div class="card-title">
                      <h3>Premium</h3>
                      <span>Exclusive For pet owners</span>
                    </div>
                    <div class="price">
                      <h2>$29</h2>
                      <span>Yearly</span>
                      <p>This plan includes online consultation options for the user</p>
                    </div>
                    <div class="pack-details">
                      <ul>
                        <li>
                          <i class="feather-check-circle"></i>30 day Services
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>5 Pet Shower
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>2 Hair fall Pack
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>3 Vaccination
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>5 Basic Checkup
                        </li>
                      </ul>
                    </div>
                    <div class="price-btn w-100">
                      <router-link to="/pricing" class="btn w-100">Join the Plan</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="price-card-twelve">
                  <div class="price-content">
                    <div class="card-title">
                      <h3>Exclusive</h3>
                      <span>The most profitable plan</span>
                    </div>
                    <div class="price">
                      <h2>$59</h2>
                      <span>Yearly</span>
                      <p>This plan includes online consultation options for the user</p>
                    </div>
                    <div class="pack-details">
                      <ul>
                        <li>
                          <i class="feather-check-circle"></i>30 day Services
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>15 Pet Shower
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>6 Hair fall Pack
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Vaccination
                        </li>
                        <li>
                          <i class="feather-check-circle"></i>10 Basic Checkup
                        </li>
                      </ul>
                    </div>
                    <div class="price-btn w-100">
                      <router-link to="/pricing" class="btn w-100">Join the Plan</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
  <!-- /Pricing -->

  <!-- Feedback -->
  <section class="clients-section-fourteen">
				<div class="floating-bg">
					<img src="@/themes/doccure/assets/img/bg/small-paw-2.png" alt="paw-image" >
					<img src="@/themes/doccure/assets/img/bg/small-paw-2.png" alt="paw-image" >
					<img src="@/themes/doccure/assets/img/bg/small-paw-3.png" alt="paw-image" >
					<img src="@/themes/doccure/assets/img/bg/care-sec-bg-1.png" alt="paw-image">
				</div>
				<div class="container">
					<div class="badge-title">
						<span class="badge badge-bg-warning"><i class="fa-solid fa-circle me-2"></i>Testimonials<i class="fa-solid fa-circle ms-2"></i></span>
					</div>
					<div class="testi-title-head">
						<h2>Hear Reviews From Our Amazing Clients</h2>
						<p>Veterinary care encompasses a wide range of services aimed at promoting the health and well-being of animals.</p>
						<div class="rate-star">
							<h5>Average Ratings</h5>
							<div>
								<span>4.9</span>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
								<i class="fa-solid fa-star"></i>
							</div>
							<div class="review-thumb">
								<img src="@/themes/doccure/assets/img/icons/review-thumb.svg" alt="Img">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="owl-carousel feedback-review-slider owl-theme">
                <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
                  <Slide v-for="item in IndexFeedback" :key="item.id">
                    <div class="card feedback-card text-start">
                      <div class="d-flex feedback-card-img-left">
                        <div class="client-inner-main">
                          <img :src="require(`@/themes/doccure/assets/img/reviews/${item.Image}`)" alt="image" class="img-fluid w-auto">
                        </div>
                        <div class="card-body feedback-card-body">
                          <div class="feedback-inner-main">
                            <div class="rating rating-fourteen">
                              <i class="fas fa-star filled me-1"></i>
                              <i class="fas fa-star filled me-1"></i>
                              <i class="fas fa-star filled me-1"></i>
                              <i class="fas fa-star filled me-1"></i>
                              <i class="fas fa-star filled"></i>
                            </div>
                            <p>
                              "I can't thank enough for the exceptional care they provided to my beloved dog, Max. 
                              From the moment we walked in, the staff made us feel like family. Dr. Smith's expertise 
                              and compassion were evident as he diagnosed and treated Max's illness. The entire team went 
                              above and beyond to ensure Max's comfort and recovery. I highly recommend
                              to anyone seeking top-notch veterinary care for their furry family members."
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="feedback-card-user-info">
                                <h5><a href="#">{{item.Name}}</a><span>{{item.Country}}</span></h5>
                              </div>
                              <div class="quatation-img">
                                <img src="@/themes/doccure/assets/img/icons/quatation-img.svg" class="w-auto" alt="Img">
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <template #addons>
                    <Navigation />
                  </template>
                </Carousel>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- /Feedback -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import IndexSevenFinest from "@/themes/doccure/assets/json/index-seven-finest.json";
import IndexSevenDoctors from "@/themes/doccure/assets/json/index-seven-doctors.json";
import IndexFeedback from "@/themes/doccure/assets/json/index-seven-feedback.json";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default {
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      IndexSevenFinest: IndexSevenFinest,
      IndexSevenDoctors: IndexSevenDoctors,
      IndexFeedback: IndexFeedback,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints: {
        575: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 700px and up
        991: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 1,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
