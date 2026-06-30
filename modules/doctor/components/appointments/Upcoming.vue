<template>
  <div>
    <!-- Appointment List -->
    <div v-for="apt in appointments" :key="apt.id" class="appointment-wrap shadow-sm">
      <ul>
        <li>
          <div class="patinet-information">
            <a href="javascript:void(0)">
              <img :src="apt.avatar" alt="Patient Image" />
            </a>
            <div class="patient-info">
              <p class="mb-0">{{ apt.idString }}</p>
              <h6 class="mb-0">
                <a href="javascript:void(0)">{{ apt.name }}</a>
                <span v-if="apt.isNew" class="badge new-tag bg-primary">New</span>
              </h6>
            </div>
          </div>
        </li>
        <li class="appointment-info">
          <p class="mb-0"><i class="fa fa-clock me-1 text-muted"></i>{{ apt.dateTime }}</p>
          <ul class="d-flex apponitment-types mt-1">
            <li>{{ apt.visitType }}</li>
            <li>{{ apt.channel }}</li>
          </ul>
        </li>
        <li class="mail-info-patient">
          <ul class="list-unstyled mb-0">
            <li><i class="fa fa-envelope me-1 text-muted"></i>{{ apt.email }}</li>
            <li><i class="fa fa-phone me-1 text-muted"></i>{{ apt.phone }}</li>
          </ul>
        </li>
        <li class="appointment-action">
          <ul class="list-unstyled mb-0 d-flex gap-2">
            <li>
              <a href="javascript:void(0);" title="View Details"><i class="fa fa-eye text-primary"></i></a>
            </li>
            <li>
              <a href="javascript:void(0);" title="Send Message"><i class="fa fa-comment text-success"></i></a>
            </li>
            <li>
              <a href="javascript:void(0);" title="Cancel Appointment"><i class="fa fa-times-circle text-danger"></i></a>
            </li>
          </ul>
        </li>
        <li class="appointment-start">
          <RouterLink :to="{ name: 'doctor-appointment-start' }" class="start-link text-decoration-underline text-dark fw-bold">Start Now</RouterLink>
        </li>
      </ul>
    </div>
    <!-- /Appointment List -->

    <!-- Pagination -->
    <div class="dashboard-pagination">
      <ul>
        <li>
          <a href="javascript:void(0)" class="page-link"><i class="fa fa-chevron-left"></i></a>
        </li>
        <li>
          <a href="javascript:void(0)" class="page-link">1</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="page-link active">2</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="page-link">3</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="page-link">4</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="page-link">...</a>
        </li>
        <li>
          <a href="javascript:void(0)" class="page-link"><i class="fa fa-chevron-right"></i></a>
        </li>
      </ul>
    </div>
    <!-- /Pagination -->
  </div>
</template>

<script setup>
const appointments = [
  {
    id: 1,
    idString: "#Apt0001",
    name: "Adrian Marshall",
    avatar: "/assets/media/avatars/patient1.png",
    dateTime: "11 Nov 2024 10.45 AM",
    visitType: "General Visit",
    channel: "Video Call",
    email: "adrian@example.com",
    phone: "+1 504 368 6874",
    isNew: false
  },
  {
    id: 2,
    idString: "#Apt0002",
    name: "Kelly Stevens",
    avatar: "/assets/media/avatars/patient2.png",
    dateTime: "05 Nov 2024 11.50 AM",
    visitType: "General Visit",
    channel: "Audio Call",
    email: "kelly@example.com",
    phone: "+1 832 891 8403",
    isNew: true
  },
  {
    id: 3,
    idString: "#Apt0003",
    name: "Samuel Anderson",
    avatar: "/assets/media/avatars/patient3.png",
    dateTime: "27 Oct 2024 09.30 AM",
    visitType: "General Visit",
    channel: "Video Call",
    email: "samuel@example.com",
    phone: "+1 749 104 6291",
    isNew: false
  },
  {
    id: 4,
    idString: "#Apt0004",
    name: "Catherine Griffin",
    avatar: "/assets/media/avatars/patient4.png",
    dateTime: "18 Oct 2024 12.20 PM",
    visitType: "General Visit",
    channel: "Direct Visit",
    email: "catherine@example.com",
    phone: "+1 584 920 7183",
    isNew: false
  },
  {
    id: 5,
    idString: "#Apt0005",
    name: "Robert Hutchinson",
    avatar: "/assets/media/avatars/patient5.png",
    dateTime: "10 Oct 2024 11.30 AM",
    visitType: "General Visit",
    channel: "Chat",
    email: "robert@example.com",
    phone: "+1 059 327 6729",
    isNew: false
  },
  {
    id: 6,
    idString: "#Apt0006",
    name: "Anderea",
    avatar: "/assets/media/avatars/patient1.png",
    dateTime: "26 Sep 2024 10.20 AM",
    visitType: "General Visit",
    channel: "Chat",
    email: "anderea@example.com",
    phone: "+1 278 402 7103",
    isNew: false
  },
  {
    id: 7,
    idString: "#Apt0007",
    name: "Peter",
    avatar: "/assets/media/avatars/patient2.png",
    dateTime: "14 Sep 2024 08.10 AM",
    visitType: "General Visit",
    channel: "Chat",
    email: "peter@example.com",
    phone: "+1 638 278 0249",
    isNew: false
  },
  {
    id: 8,
    idString: "#Apt0008",
    name: "Emily",
    avatar: "/assets/media/avatars/patient3.png",
    dateTime: "03 Sep 2024 06.00 PM",
    visitType: "General Visit",
    channel: "Video Call",
    email: "emily@example.com",
    phone: "+1 261 039 1873",
    isNew: false
  }
];
</script>

<style scoped>
.appointment-wrap {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 8px;
  background-color: #fff;
}
.appointment-wrap > ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
@media (max-width: 991.98px) {
  .appointment-wrap > ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
.appointment-wrap > ul > li {
  margin-bottom: 0;
}
.appointment-wrap > ul > li.appointment-info,
.appointment-wrap > ul > li.mail-info-patient {
  min-width: 170px;
}

.appointment-info p {
  color: #475569;
  margin-bottom: 4px;
  font-size: 14px;
}
.appointment-info p i {
  color: #334155;
}

.patinet-information {
  display: flex;
  align-items: center;
  min-width: 175px;
}
.patinet-information img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  margin-right: 12px;
  object-fit: cover;
}
.patinet-information .patient-info p {
  color: #0665d0;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 2px;
}
.patinet-information .patient-info h6 {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}
.patinet-information .patient-info h6 a {
  color: #0f172a;
  text-decoration: none;
}
.patinet-information .patient-info h6 a:hover {
  color: #0665d0;
}
.patient-info h6 .badge.new-tag {
  font-size: 9px;
  color: #fff;
  margin-left: 6px;
  font-weight: 600;
  padding: 3px 6px;
  border-radius: 20px;
}

.appointment-info .apponitment-types {
  align-items: center;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.appointment-info .apponitment-types li {
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
  line-height: 1;
}
.appointment-info .apponitment-types li + li {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  margin-left: 8px;
  padding-left: 8px;
}

.mail-info-patient li {
  color: #475569;
  font-size: 13px;
}
.mail-info-patient li + li {
  margin-top: 4px;
}

.appointment-action ul {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.appointment-action ul li a {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 13px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}
.appointment-action ul li a:hover {
  background: #0665d0;
  color: #fff;
}
.appointment-action ul li a:hover i {
  color: #fff !important;
}

.appointment-start a:hover {
  color: #0665d0 !important;
}

/* Pagination */
.dashboard-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.dashboard-pagination ul {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.dashboard-pagination ul li .page-link {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 32px;
  height: 32px;
  color: #0f172a;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}
.dashboard-pagination ul li .page-link.active,
.dashboard-pagination ul li .page-link:hover {
  background: #0665d0;
  border-color: #0665d0;
  color: #fff;
}
</style>
