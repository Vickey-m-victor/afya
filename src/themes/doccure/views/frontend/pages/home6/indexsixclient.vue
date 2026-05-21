<template>
  <!-- Clinic Section -->
  <section class="eyeclinics-section">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-md-12 aos" data-aos="fade-up">
						<div class="section-heading text-center sec-heading-eye">
							<h2><span>Our</span> Specialties</h2>
							<p>The Great Place Of Eyecare Hospital Center</p>
						</div>
					</div>
					<div class="col-lg-4 col-md-6" v-for="item in indexSixClient" :key="item.id">
						<div class="our-doctors-card eye-doc">
							<div class="doctors-header">
								<router-link to="/doctor-profile"><img :src="require(`@/themes/doccure/assets/img/doctors/${item.Image}`)" alt="Andrea" class="img-fluid"></router-link>
								<span class="rating-top-img"><i class="fa-solid fa-star filled"></i>4.9</span>
							</div>
							<div class="doctors-body d-flex align-items-center justify-content-between">
								<div class="doc-card-info">
									<h4><router-link to="/doctor-profile">Dr. Carrie Rosario</router-link></h4>
									<p>MBBS, DOMS - Ophthalmology</p>
								</div>
								<div class="next-arrow">
									<router-link to="/doctor-profile"><i class="fa-solid fa-arrow-right"></i></router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /Clinic Section -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import indexSixClient from "@/themes/doccure/assets/json/indexsixclient.json";
export default {
  data() {
    return {
      indexSixClient: indexSixClient,
    };
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
