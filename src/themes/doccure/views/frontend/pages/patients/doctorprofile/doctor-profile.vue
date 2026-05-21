<template>
  <div class="main-wrapper">
    <patient-header></patient-header>
    <breadcrumb1 :title="title" :text="text" :text1="text1" />
    <div class="content">
      <div class="container">
        <!-- Doctor Widget -->
        <div class="card doc-profile-card">
          <div class="card-body">
            <div class="doctor-widget doctor-profile-two">
              <div class="doc-info-left">
                <div class="doctor-img">
                  <img
                    src="@/themes/doccure/assets/img/doctors/doc-profile-02.jpg"
                    class="img-fluid"
                    alt="User Image"
                  />
                </div>
                <div class="doc-info-cont">
                  <span class="badge doc-avail-badge"
                    ><i class="fa-solid fa-circle"></i>Available
                  </span>
                  <h4 class="doc-name">
                    Dr.Martin Adian
                    <img src="@/themes/doccure/assets/img/icons/badge-check.svg" alt="Img" /><span
                      class="badge doctor-role-badge"
                      ><i class="fa-solid fa-circle"></i>Dentist</span
                    >
                  </h4>
                  <p>BDS, MDS - Oral & Maxillofacial Surgery</p>
                  <p>Speaks : English, French, German</p>
                  <p class="address-detail">
                    <span class="loc-icon"><i class="feather-map-pin"></i></span>No 14,
                    15th Cross, Old Trafford, UK
                    <span class="view-text">( View Location )</span>
                  </p>
                </div>
              </div>
              <div class="doc-info-right">
                <ul class="doctors-activities">
                  <li>
                    <div class="hospital-info">
                      <span class="list-icon"
                        ><img src="@/themes/doccure/assets/img/icons/watch-icon.svg" alt="Img"
                      /></span>
                      <p>Full Time, Online Therapy Available</p>
                    </div>
                    <ul class="sub-links">
                      <li>
                        <a href="#"><i class="feather-heart"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="feather-share-2"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="feather-link"></i></a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="hospital-info">
                      <span class="list-icon"
                        ><img src="@/themes/doccure/assets/img/icons/thumb-icon.svg" alt="Img"
                      /></span>
                      <p><b>94% </b> Recommended</p>
                    </div>
                  </li>
                  <li>
                    <div class="hospital-info">
                      <span class="list-icon"
                        ><img src="@/themes/doccure/assets/img/icons/building-icon.svg" alt="Img"
                      /></span>
                      <p>Royal Prince Alfred Hospital</p>
                    </div>
                    <h5 class="accept-text">
                      <span><i class="feather-check"></i></span>Accepting New Patients
                    </h5>
                  </li>
                  <li>
                    <div class="rating">
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <span>5.0</span>
                      <a href="#" class="d-inline-block average-rating">150 Reviews</a>
                    </div>
                    <ul class="contact-doctors">
                      <li>
                        <router-link to="/chat-doctor"
                          ><span
                            ><img
                              src="@/themes/doccure/assets/img/icons/device-message2.svg"
                              alt="Img" /></span
                          >Chat</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/voice-call"
                          ><span class="bg-violet"
                            ><i class="feather-phone-forwarded"></i></span
                          >Audio Call</router-link
                        >
                      </li>
                      <li>
                        <router-link to="/video-call"
                          ><span class="bg-indigo"><i class="fa-solid fa-video"></i></span
                          >Video Call</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="doc-profile-card-bottom">
              <ul>
                <li>
                  <span class="bg-blue"
                    ><img src="@/themes/doccure/assets/img/icons/calendar3.svg" alt="Img"
                  /></span>
                  Nearly 200+ Appointment Booked
                </li>
                <li>
                  <span class="bg-dark-blue"
                    ><img src="@/themes/doccure/assets/img/icons/bullseye.svg" alt="Img"
                  /></span>
                  In Practice for 21 Years
                </li>
                <li>
                  <span class="bg-green"
                    ><img src="@/themes/doccure/assets/img/icons/bookmark-star.svg" alt="Img"
                  /></span>
                  15+ Awards
                </li>
              </ul>
              <div class="bottom-book-btn">
                <p><span>Price : $100 - $200 </span> for a Session</p>
                <div class="clinic-booking">
                  <router-link class="apt-btn" to="/booking"
                    >Book Appointment</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /Doctor Widget -->

        <div class="doctors-detailed-info">
          <ul class="information-title-list">
            <li class="active">
              <a href="#doc_bio">Doctor Bio</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#insurence">Insurances</a>
            </li>
            <li>
              <a href="#services">Treatments</a>
            </li>
            <li>
              <a href="#speciality">Speciality</a>
            </li>
            <li>
              <a href="#availability">Availability</a>
            </li>
            <li>
              <a href="#clinic">Clinics</a>
            </li>
            <li>
              <a href="#membership">Memberships</a>
            </li>
            <li>
              <a href="#awards">Awards</a>
            </li>
            <li>
              <a href="#bussiness_hour">Business Hours</a>
            </li>
            <li>
              <a href="#review">Review</a>
            </li>
          </ul>
          <profile-documentation></profile-documentation>
        </div>
      </div>
    </div>
    <footerindex></footerindex>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Patient",
      text: "Doctor Profile 1",
      text1: "Doctor Profile",
    };
  },
};
</script>
