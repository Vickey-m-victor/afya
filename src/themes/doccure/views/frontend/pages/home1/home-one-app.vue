<template>
    <!-- App Section -->
    <section class="app-section app-sec-one p-0">
        <div class="container">
            <div class="app-bg">
                <div class="row">
                    <div class="col-lg-6 col-md-12 d-flex">
                        <div class="app-content d-flex flex-column justify-content-center">
                            <div class="app-header aos" data-aos="fade-up">
                                <h3 class="display-6 text-white">Download the Doccure App today!</h3>
                                <p class="text-light">To download an app related to a doctor or medical services, you can typically visit the app store on your device.</p>
                            </div>
                            <div class="google-imgs aos" data-aos="fade-up">
                                <a href="javascript:void(0);"><img src="@/themes/doccure/assets/img/icons/app-store-01.svg" alt="img"></a>
                                <a href="javascript:void(0);"><img src="@/themes/doccure/assets/img/icons/google-play-01.svg" alt="img"></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 aos" data-aos="fade-up">
                        <div class="mobile-img">
                            <img src="@/themes/doccure/assets/img/mobile-img.png" class="img-fluid" alt="img">
                        </div>
                    </div>
                </div>
                <div class="app-bgs">
                    <img src="@/themes/doccure/assets/img/bg/app-bg-02.png" alt="img" class="app-bg-01">
                    <img src="@/themes/doccure/assets/img/bg/app-bg-03.png" alt="img" class="app-bg-02">
                    <img src="@/themes/doccure/assets/img/bg/app-bg-04.png" alt="img" class="app-bg-03">
                </div>
            </div>
        </div>
        <div class="download-bg">
            <img src="@/themes/doccure/assets/img/bg/download-bg.png" alt="img">
        </div>
    </section>
    <!-- /App Section -->

    <!-- Article Section -->
    <section class="article-section">
        <div class="container">
            <div class="section-header sec-header-one text-center aos" data-aos="fade-up">
                <span class="badge badge-primary">Recent Blogs</span>
                <h2>Stay Updated With Our Latest Articles</h2>
            </div>
            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="article-item aos" data-aos="fade-up">
                        <div class="article-img">
                            <router-link to="/blog-details">
                                <img src="@/themes/doccure/assets/img/blog/article-01.jpg" class="img-fluid" alt="img">
                            </router-link>
                            <div class="date-icon">
                                <span>15</span>May
                            </div>
                        </div>
                        <div class="article-info">
                            <span class="badge badge-cyan mb-2">Treatments</span>
                            <h6 class="mb-2"><router-link to="/blog-details">Understanding and Preventing Glaucoma: A Detailed Guide</router-link></h6>
                            <p>Glaucoma is a leading cause of blind worldwide, yet many....</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="article-item aos" data-aos="fade-up">
                        <div class="article-img">
                            <router-link to="/blog-details">
                                <img src="@/themes/doccure/assets/img/blog/article-02.jpg" class="img-fluid" alt="img">
                            </router-link>
                            <div class="date-icon">
                                <span>18</span>May
                            </div>
                        </div>
                        <div class="article-info">
                            <span class="badge badge-cyan mb-2">Neurology</span>
                            <h6 class="mb-2"><router-link to="/blog-details">Understanding and Preventing Glaucoma: A Detailed Guide</router-link></h6>
                            <p>Discover the intersection of technology and neurology, transforming....</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="article-item aos" data-aos="fade-up">
                        <div class="article-img">
                            <router-link to="/blog-details">
                                <img src="@/themes/doccure/assets/img/blog/article-03.jpg" class="img-fluid" alt="img">
                            </router-link>
                            <div class="date-icon">
                                <span>21</span>Apr
                            </div>
                        </div>
                        <div class="article-info">
                            <span class="badge badge-cyan mb-2">Dental</span>
                            <h6 class="mb-2"><router-link to="/blog-details">5 Essential Tips for Maintaining Optimal Oral Health</router-link></h6>
                            <p>Learn the top five daily practices to keep your teeth....</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="article-item aos" data-aos="fade-up">
                        <div class="article-img">
                            <router-link to="/blog-details">
                                <img src="@/themes/doccure/assets/img/blog/article-04.jpg" class="img-fluid" alt="img">
                            </router-link>
                            <div class="date-icon">
                                <span>22</span>Jan
                            </div>
                        </div>
                        <div class="article-info">
                            <span class="badge badge-cyan mb-2">Care & Treatment</span>
                            <h6 class="mb-2"><router-link to="/blog-details">Beating Strong: The Digital Revol in Cardiac Care</router-link></h6>
                            <p>Discover how digital advancements are transforming cardiac care...</p>
                        </div>
                    </div>
                </div>
            </div>		
            <div class="text-center load-item aos" data-aos="fade-up">
                <router-link to="/blog-grid" class="btn btn-dark">View All Articles<i class="isax isax-arrow-right-3 ms-2"></i></router-link>
            </div>			
        </div>
    </section>
    <!-- /Article Section -->

    <!-- Info Section -->
    <section class="info-section">
        <div class="container">					
            <div class="contact-info">
                <div class="d-lg-flex align-items-center justify-content-between w-100 gap-4">
                    <div class="mb-4 mb-lg-0 aos" data-aos="fade-up">
                        <h6 class="display-6 text-white">Working for Your Better Health.</h6>
                    </div>
                    <div class="d-sm-flex align-items-center justify-content-lg-end gap-4 aos" data-aos="fade-up">
                        <div class="con-info d-flex align-items-center mb-3 mb-sm-0">
                            <span class="con-icon">
                                <i class="isax isax-headphone"></i>
                            </span>
                            <div class="ms-2">
                                <p class="text-white mb-1">Customer Support</p>
                                <p class="text-white fw-medium mb-0">+1 56589 54598</p>
                            </div>
                        </div>
                        <div class="con-info d-flex align-items-center">
                            <span class="con-icon">
                                <i class="isax isax-message-2"></i>
                            </span>
                            <div class="ms-2">
                                <p class="text-white mb-1">Drop Us an Email</p>
                                <p class="text-white fw-medium mb-0">info1256@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /Info Section -->
</template>