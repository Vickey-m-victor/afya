<template>
  <div class="doc-information-main">
    <div class="doc-information-details bio-detail" id="doc_bio">
      <div class="detail-title">
        <h4>Doctor Bio</h4>
      </div>
      <p>
        “Highly motivated and experienced doctor with a passion for providing
        excellent care to patients. Experienced in a wide variety of medical
        settings, with particular expertise in diagnostics, primary care and
        emergency medicine. Skilled in using the latest technology to streamline
        patient care. Committed to delivering compassionate, personalized care
        to each and every patient.”
      </p>
      <a href="#" class="show-more d-flex align-items-center"
        >See More<i class="fa-solid fa-chevron-down ms-2"></i
      ></a>
    </div>
    <div class="doc-information-details" id="experience">
      <div class="detail-title">
        <h4>Practice Experience</h4>
      </div>
      <div class="experience-info">
        <div class="experience-logo">
          <span
            ><img src="@/themes/doccure/assets/img/icons/experience-logo-01.svg" alt="Img"
          /></span>
        </div>
        <div class="experience-content">
          <h5>Cambridge University Hospital, NHS Foundation Trust Cambridge</h5>
          <ul class="ent-list">
            <li>ENT</li>
            <li>Cambridge</li>
          </ul>
          <ul class="date-list">
            <li>Dec 2020 - Jan 2022</li>
            <li>2 Years 2 months</li>
          </ul>
          <p>
            Experienced in a wide variety of medical settings, with particular
            expertise in diagnostics, primary care and emergency medicine.
          </p>
        </div>
      </div>
      <div class="experience-info">
        <div class="experience-logo">
          <span
            ><img src="@/themes/doccure/assets/img/icons/experience-logo-02.svg" alt="Img"
          /></span>
        </div>
        <div class="experience-content mb-0">
          <h5>Hill Medical Hospital, Newcastle</h5>
          <ul class="ent-list">
            <li>ENT</li>
            <li>Cambridge</li>
          </ul>
          <ul class="date-list">
            <li>Dec 2022 - Jan 2022</li>
            <li>1 Years 1 months</li>
          </ul>
          <p>
            Experienced in a wide variety of medical settings, with particular
            expertise in diagnostics, primary care and emergency medicine.
          </p>
        </div>
      </div>
    </div>
    <profile-insurence></profile-insurence>
    <div class="doc-information-details" id="speciality">
      <div class="detail-title">
        <h4>Speciality</h4>
      </div>
      <ul class="special-links">
        <li><a href="#">Orthopedic Consultation</a></li>
        <li><a href="#">Delivery Blocks</a></li>
        <li><a href="#">Ultrasound Injection</a></li>
        <li><a href="#">Tooth Bleaching</a></li>
        <li><a href="#">Tooth Bleaching</a></li>
        <li><a href="#">Cosmetic</a></li>
      </ul>
    </div>
    <div class="doc-information-details" id="services">
      <div class="detail-title">
        <h4>Services & Pricing</h4>
      </div>
      <ul class="special-links">
        <li>
          <a href="#">Orthopedic Consultation <span>$52</span></a>
        </li>
        <li>
          <a href="#">Delivery Blocks <span>$24</span></a>
        </li>
        <li>
          <a href="#">Ultrasound Injection <span>$31</span></a>
        </li>
        <li>
          <a href="#">Tooth Bleaching <span>$20</span></a>
        </li>
        <li>
          <a href="#">Tooth Bleaching <span>$15</span></a>
        </li>
        <li>
          <a href="#">Cosmetic <span>$10</span></a>
        </li>
      </ul>
    </div>
    <profile-availability></profile-availability>
    <div class="doc-information-details" id="clinic">
      <div class="detail-title">
        <h4>Clinics & Locations</h4>
      </div>
      <div class="clinic-loc">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="clinic-info">
              <div class="clinic-img">
                <img src="@/themes/doccure/assets/img/clinic/clinic-11.jpg" alt="Img" />
              </div>
              <div class="detail-clinic">
                <h5>Sofi’s Clinic -</h5>
                <span>$350 / Apponitment</span>
                <p>2286 Sundown Lane, Old Trafford 24541, UK</p>
              </div>
            </div>
            <div class="d-flex align-items-center avail-time-slot">
              <div class="availability-date">
                <div class="book-date">
                  <h6>Monday</h6>
                  <span>07:00 AM - 09:00 PM</span>
                </div>
              </div>
              <div class="availability-date">
                <div class="book-date">
                  <h6>Tuesday</h6>
                  <span>07:00 AM - 09:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="contact-map d-flex">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7301009561315!2d-76.13077892422932!3d36.82498697224007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89bae976cfe9f8af%3A0xa61eac05156fbdb9!2sBeachStreet%20USA!5e0!3m2!1sen!2sin!4v1669777904208!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div class="clinic-loc mb-0">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="clinic-info">
              <div class="clinic-img">
                <img src="@/themes/doccure/assets/img/clinic/clinic-12.jpg" alt="Img" />
              </div>
              <div class="detail-clinic">
                <h5>The Family Dentistry Clinic</h5>
                <span>$550 / Apponitment</span>
                <p>MDS - Periodontology and Oral Implantology, BDS</p>
              </div>
            </div>
            <div class="d-flex align-items-center avail-time-slot">
              <div class="availability-date">
                <div class="book-date">
                  <h6>Friday</h6>
                  <span>07:00 AM - 09:00 PM</span>
                </div>
              </div>
              <div class="availability-date">
                <div class="book-date">
                  <h6>Saturday</h6>
                  <span>07:00 AM - 09:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="contact-map d-flex">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.7301009561315!2d-76.13077892422932!3d36.82498697224007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89bae976cfe9f8af%3A0xa61eac05156fbdb9!2sBeachStreet%20USA!5e0!3m2!1sen!2sin!4v1669777904208!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="doc-information-details" id="membership">
      <div class="detail-title">
        <h4>Membership</h4>
      </div>
      <div class="member-ship-info">
        <span class="mem-check"><i class="fa-solid fa-check"></i></span>
        <p>
          Affiliate members include related allied health professionals-
          evidence based (Dietitians, Physiotherapist, Occupational therapist
          and Clinical Psychologist) who will team up with allopathic physicians
          to support the Lifestyle Medicine movement in India through ISLM.
        </p>
      </div>
      <div class="member-ship-info mb-0">
        <span class="mem-check"><i class="fa-solid fa-check"></i></span>
        <p>
          Physician members include the allopathic doctors only (MBBS, MD, MS,
          DM, MCH, DNB or equivalent degree) who hold a valid medical license as
          recognized by the Medical Council of India.
        </p>
      </div>
    </div>
    <profile-awards></profile-awards>
    <div class="doc-information-details" id="bussiness_hour">
      <div class="detail-title">
        <h4>Business Hours</h4>
      </div>
      <div class="hours-business">
        <ul>
          <li>
            <div class="today-hours">
              <h6>Today</h6>
              <span>5 Feb 2024</span>
            </div>
            <div class="availed">
              <span class="badge doc-avail-badge"
                ><i class="fa-solid fa-circle"></i>Available
              </span>
              <p>07:00 AM - 09:00 PM</p>
            </div>
          </li>
          <li>
            <h6>Monday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
          <li>
            <h6>Tuesday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
          <li>
            <h6>Wednesday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
          <li>
            <h6>Thursday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
          <li>
            <h6>Friday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
          <li>
            <h6>Saturday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
          <li>
            <h6>Sunday</h6>
            <p>07:00 AM - 09:00 PM</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="doc-information-details" id="review">
      <div class="detail-title">
        <h4>Reviews (200)</h4>
      </div>
      <div class="doc-review-card">
        <div class="user-info-review">
          <div class="reviewer-img">
            <a href="#" class="avatar-img"
              ><img src="@/themes/doccure/assets/img/clients/client-13.jpg" alt="Img"
            /></a>
            <div class="review-star">
              <a href="#">kadajsalamander</a>
              <div class="rating">
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <span>5.0 | 2 days ago</span>
              </div>
            </div>
          </div>
          <span class="thumb-icon"
            ><i class="fa-regular fa-thumbs-up"></i>Yes,Recommend for
            Appointment</span
          >
        </div>
        <p>
          Thank you for this informative article! I've had a couple of
          hit-and-miss experiences with freelancers in the past, and I realize
          now that I wasn't vetting them properly. Your checklist for choosing
          the right freelancer is going to be my go-to from now on
        </p>
        <a href="#" class="reply d-flex align-items-center"
          ><i class="fa-solid fa-reply me-2"></i>Reply</a
        >
      </div>
      <div class="doc-review-card">
        <div class="user-info-review">
          <div class="reviewer-img">
            <a href="#" class="avatar-img"
              ><img src="@/themes/doccure/assets/img/clients/client-14.jpg" alt="Img"
            /></a>
            <div class="review-star">
              <a href="#">Dane jose</a>
              <div class="rating">
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <span>5.0 | 1 Months ago</span>
              </div>
            </div>
          </div>
          <span class="thumb-icon"
            ><i class="fa-regular fa-thumbs-up"></i>Yes,Recommend for
            Appointment</span
          >
        </div>
        <p>
          As a freelancer myself, I find this article spot on! It's important
          for clients to understand what to look for in a freelancer and how to
          foster a good working relationship. The point about mutual respect and
          clear communication is key in my experience. Well done
        </p>
        <a href="#" class="reply d-flex align-items-center"
          ><i class="fa-solid fa-reply me-2"></i>Reply</a
        >
      </div>
      <div class="doc-review-card mb-0">
        <div class="user-info-review">
          <div class="reviewer-img">
            <a href="#" class="avatar-img"
              ><img src="@/themes/doccure/assets/img/clients/client-15.jpg" alt="Img"
            /></a>
            <div class="review-star">
              <a href="#">Dane jose</a>
              <div class="rating">
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <i class="fas fa-star filled"></i>
                <span>5.0 | 15 days ago</span>
              </div>
            </div>
          </div>
          <span class="thumb-icon"
            ><i class="fa-regular fa-thumbs-up"></i>Yes,Recommend for
            Appointment</span
          >
        </div>
        <p>
          Great article! I've bookmarked it for future reference. I'd love to
          read more about managing long-term relationships with freelancers, if
          you have any tips on that.
        </p>
        <a href="#" class="reply d-flex align-items-center"
          ><i class="fa-solid fa-reply me-2"></i>Reply</a
        >
        <div class="replied-info">
          <div class="user-info-review">
            <div class="reviewer-img">
              <a href="#" class="avatar-img"
                ><img src="@/themes/doccure/assets/img/clients/client-16.jpg" alt="Img"
              /></a>
              <div class="review-star">
                <a href="#">Robert Hollenbeck</a>
              </div>
            </div>
          </div>
          <p>
            Thank you for your comment and I will try to make a another post on
            that topic.
          </p>
          <a href="#" class="reply d-flex align-items-center"
            ><i class="fa-solid fa-reply me-2"></i>Reply</a
          >
        </div>
        <!-- Pagination -->
        <div class="pagination dashboard-pagination">
          <ul>
            <li>
              <a href="#" class="page-link prev-link"
                ><i class="fa-solid fa-chevron-left me-2"></i>Prev</a
              >
            </li>
            <li>
              <a href="#" class="page-link active">1</a>
            </li>
            <li>
              <a href="#" class="page-link">2</a>
            </li>
            <li>
              <a href="#" class="page-link">3</a>
            </li>
            <li>
              <a href="#" class="page-link">4</a>
            </li>
            <li>
              <a href="#" class="page-link">5</a>
            </li>
            <li>
              <a href="#" class="page-link">6</a>
            </li>
            <li>
              <a href="#" class="page-link next-link"
                >Next<i class="fa-solid fa-chevron-right ms-2"></i
              ></a>
            </li>
          </ul>
        </div>
        <!-- /Pagination -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
