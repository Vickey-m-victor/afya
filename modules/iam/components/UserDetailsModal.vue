<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

const profile = computed(() => props.user?.profile || {});
const status = computed(() => props.user?.status || {});

const fullName = computed(() => {
  const parts = [profile.value.first_name, profile.value.middle_name, profile.value.last_name].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : props.user.username;
});

const avatarInitials = computed(() => {
  if (profile.value.first_name && profile.value.last_name) {
    return `${profile.value.first_name[0]}${profile.value.last_name[0]}`.toUpperCase();
  }
  return props.user?.username?.substring(0, 2).toUpperCase() || 'U';
});

function statusBadgeClass(statusObj) {
  if (statusObj?.theme) return `bg-${statusObj.theme}-light text-${statusObj.theme}`;
  const label = (statusObj?.label || statusObj || "").toString().toLowerCase();
  if (label === "active") return "bg-success-light text-success";
  if (label === "inactive") return "bg-secondary-light text-secondary";
  if (label === "suspended") return "bg-warning-light text-warning";
  if (label === "banned") return "bg-danger-light text-danger";
  return "bg-info-light text-info";
}

function statusLabel(statusObj) {
  return statusObj?.label || statusObj || "Unknown";
}
</script>

<template>
  <div class="user-details-modal">
    <div class="content p-0">
      <!-- Profile Header -->
      <div class="bg-body-light rounded-top p-4 text-center">
        <div class="avatar-circle mx-auto mb-3 shadow-sm d-flex align-items-center justify-content-center bg-primary text-white fs-3 fw-bold" style="width: 80px; height: 80px; border-radius: 50%;">
          {{ avatarInitials }}
        </div>
        <h3 class="h4 fw-bold mb-1">{{ fullName }}</h3>
        <p class="fs-sm text-muted mb-2">@{{ user.username }}</p>
        <span class="badge rounded-pill px-3 py-1 fw-medium" :class="statusBadgeClass(status)">
           {{ statusLabel(status) }}
        </span>
      </div>

      <!-- Profile Details -->
      <div class="p-4">
        <div class="row g-4">
          <!-- Col 1 -->
          <div class="col-sm-6">
            <div class="d-flex align-items-center mb-3">
              <div class="item-icon bg-body-light rounded d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                <i class="fa fa-envelope text-primary"></i>
              </div>
              <div>
                <p class="fs-sm text-muted mb-0">Email Address</p>
                <p class="fs-base fw-medium mb-0 text-break">{{ profile.email_address || '-' }}</p>
              </div>
            </div>
            
            <div class="d-flex align-items-center">
              <div class="item-icon bg-body-light rounded d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                <i class="fa fa-phone text-primary"></i>
              </div>
              <div>
                <p class="fs-sm text-muted mb-0">Mobile Number</p>
                <p class="fs-base fw-medium mb-0">{{ profile.mobile_number || '-' }}</p>
              </div>
            </div>
          </div>
          
          <!-- Col 2 -->
          <div class="col-sm-6">
            <div class="d-flex align-items-center mb-3">
              <div class="item-icon bg-body-light rounded d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                <i class="fa fa-id-card text-primary"></i>
              </div>
              <div>
                <p class="fs-sm text-muted mb-0">First Name</p>
                <p class="fs-base fw-medium mb-0">{{ profile.first_name || '-' }}</p>
              </div>
            </div>

            <div class="d-flex align-items-center mb-0">
               <div class="item-icon bg-body-light rounded d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                <i class="fa fa-id-card text-primary"></i>
              </div>
              <div>
                <p class="fs-sm text-muted mb-0">Last Name</p>
                <p class="fs-base fw-medium mb-0">{{ profile.last_name || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-icon {
  transition: all 0.2s ease-in-out;
}
.item-icon:hover {
  background-color: var(--bs-primary) !important;
}
.item-icon:hover i {
  color: white !important;
}
.text-break {
  word-break: break-all;
}
</style>
