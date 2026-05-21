<template>
    <div class="main-wrapper">
        <doctor-header></doctor-header>
        <breadcrumb1 :title="title" :text="text" :text1="text1" />

        <!-- Page Content -->
        <div class="content doctor-content">
            <div class="container">

                <div class="row">
                    <doctorsidebar></doctorsidebar>

                    <!-- Patient Details -->
                    <div class="col-lg-8 col-xl-9">
                        <div class="appointment-patient">

                            <div class="dashboard-header">
                                <h3><router-link to="/my-patients"><i class="fa-solid fa-arrow-left"></i> Patient
                                        Details</router-link></h3>
                            </div>

                            <div class="patient-wrap">
                                <div class="patient-info">
                                    <img src="@/themes/doccure/assets/img/doctors-dashboard/profile-01.jpg" alt="img">
                                    <div class="user-patient">
                                        <h6>#P0016</h6>
                                        <h5>Adrian Marshall</h5>
                                        <ul>
                                            <li>Age : 42</li>
                                            <li>Male</li>
                                            <li>AB+ve</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="patient-book">
                                    <p><i class="fa-solid fa-calendar-days"></i>Last Booking</p>
                                    <p>24 Mar 2024</p>
                                </div>
                            </div>

                            <!-- Appoitment Tabs -->
                            <div class="appointment-tabs user-tab">
                                <ul class="nav">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="#pat_appointments"
                                            data-bs-toggle="tab">Appointments</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#prescription" data-bs-toggle="tab">Prescription</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#medical" data-bs-toggle="tab">Medical Records</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#billing" data-bs-toggle="tab">Billing</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- /Appoitment Tabs -->

                            <div class="tab-content pt-0">

                                <!-- Appointment Tab -->
                                <div id="pat_appointments" class="tab-pane fade show active">
                                    <patient-profile-appointment></patient-profile-appointment>                                    
                                </div>
                                <!-- /Appointment Tab -->

                                <!-- Prescription Tab -->
                                <div class="tab-pane fade" id="prescription">
                                    <patient-profile-prescription></patient-profile-prescription>
                                </div>
                                <!-- /Prescription Tab -->

                                <!-- Medical Records Tab -->
                                <div class="tab-pane fade" id="medical">
                                    <patient-profile-medical></patient-profile-medical>
                                </div>
                                <!-- /Medical Records Tab -->

                                <!-- Billing Tab -->
                                <div class="tab-pane" id="billing">
                                    <patient-profile-billing></patient-profile-billing>
                                </div>
                                <!-- Billing Tab -->

                            </div>
                        </div>
                    </div>
                    <!-- /Patient Details -->

                </div>
            </div>

        </div>
        <!-- /Page Content -->

        <doctor-footer></doctor-footer>
    </div>

    <patient-profile-modal></patient-profile-modal>
</template>

<script>
export default {
    data() {
        return {
            title: "My Patients",
            text: "Home",
            text1: "My Patients",
        }
    },
}
</script>