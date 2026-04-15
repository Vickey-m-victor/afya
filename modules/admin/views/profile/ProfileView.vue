<script setup>
import { ref, computed, onMounted } from "vue";
import { useApi } from "@/helpers/useApi";

const user = ref(null);
const loading = ref(true);

async function fetchProfile() {
  loading.value = true;
  const { data, request } = useApi("/iam/auth/me", {
    method: "GET",
    autoFetch: false,
  });

  try {
    await request();
    const raw = data.value || {};
    // /iam/auth/me returns flat response (no dataPayload wrapper)
    const payload = raw.dataPayload?.data || raw.dataPayload || raw;
    user.value = {
      username: payload.username || "",
      last_login_at: payload.last_login_at || "",
      last_login_ip: payload.last_login_ip || "",
      email_verified: payload.email_verified ?? false,
      mobile_verified: payload.mobile_verified ?? false,
      is_locked: payload.is_locked ?? false,
      permissions: payload.permissions || [],
      first_name: payload.profile?.first_name || "",
      middle_name: payload.profile?.middle_name || "",
      last_name: payload.profile?.last_name || "",
      email_address: payload.profile?.email_address || "",
      mobile_number: payload.profile?.mobile_number || "",
      avatar_url: payload.profile?.avatar_url || "",
    };
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  } finally {
    loading.value = false;
  }
}

const fullName = computed(() => {
  if (!user.value) return "";
  return [user.value.first_name, user.value.middle_name, user.value.last_name]
    .filter(Boolean)
    .join(" ");
});

const initials = computed(() => {
  if (!user.value) return "";
  return (
    (user.value.first_name?.[0] || "") + (user.value.last_name?.[0] || "")
  ).toUpperCase();
});

const statusLabel = computed(() => {
  if (!user.value) return "Unknown";
  if (user.value.is_locked) return "Locked";
  return "Active";
});

const statusClass = computed(() => {
  if (!user.value) return "bg-secondary";
  if (user.value.is_locked) return "bg-danger";
  return "bg-success";
});

function formatDatetime(val) {
  if (!val) return "—";
  try {
    return new Date(val).toLocaleString();
  } catch {
    return val;
  }
}

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" class="content content-full text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="text-muted mt-2">Loading profile...</p>
  </div>

  <template v-else-if="user">
    <!-- Hero -->
    <BaseBackground
      image="/assets/media/photos/photo12@2x.jpg"
      inner-class="bg-black-50"
    >
      <div class="content content-full text-center">
        <div class="my-3">
          <img
            class="img-avatar img-avatar-thumb"
            :src="user.avatar_url || '/assets/media/avatars/avatar13.jpg'"
            :alt="fullName"
          />
        </div>
        <h1 class="h2 text-white mb-0">{{ fullName }}</h1>
        <span class="text-white-75">@{{ user.username }}</span>
      </div>
    </BaseBackground>
    <!-- END Hero -->

    <!-- Stats -->
    <div class="bg-body-extra-light">
      <div class="content content-boxed">
        <div class="row items-push text-center">
          <div class="col-6 col-md-3">
            <div class="fs-sm fw-semibold text-muted text-uppercase">
              Status
            </div>
            <span
              class="badge rounded-pill fs-sm py-1 px-3"
              :class="statusClass"
            >
              {{ statusLabel }}
            </span>
          </div>
          <div class="col-6 col-md-3">
            <div class="fs-sm fw-semibold text-muted text-uppercase">
              Email Verified
            </div>
            <span
              class="badge rounded-pill fs-sm py-1 px-3"
              :class="user.email_verified ? 'bg-success' : 'bg-warning'"
            >
              {{ user.email_verified ? "Verified" : "Pending" }}
            </span>
          </div>
          <div class="col-6 col-md-3">
            <div class="fs-sm fw-semibold text-muted text-uppercase">
              Permissions
            </div>
            <span class="link-fx fs-6">{{ user.permissions.length }}</span>
          </div>
          <div class="col-6 col-md-3">
            <div class="fs-sm fw-semibold text-muted text-uppercase">
              Last Login
            </div>
            <span class="fs-sm text-muted">{{
              formatDatetime(user.last_login_at)
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- END Stats -->

    <!-- Page Content -->
    <div class="content content-boxed">
      <div class="row">
        <!-- Profile Information -->
        <div class="col-md-7 col-xl-8">
          <BaseBlock>
            <template #title>
              <i class="fa fa-user-circle text-primary me-1"></i> Profile
              Information
            </template>

            <div class="row fs-sm push">
              <div class="col-6 col-lg-4">
                <p class="fw-semibold text-muted mb-1">First Name</p>
                <p class="mb-0">{{ user.first_name || "—" }}</p>
              </div>
              <div class="col-6 col-lg-4">
                <p class="fw-semibold text-muted mb-1">Middle Name</p>
                <p class="mb-0">{{ user.middle_name || "—" }}</p>
              </div>
              <div class="col-6 col-lg-4">
                <p class="fw-semibold text-muted mb-1">Last Name</p>
                <p class="mb-0">{{ user.last_name || "—" }}</p>
              </div>
            </div>

            <div class="row fs-sm push">
              <div class="col-6 col-lg-4">
                <p class="fw-semibold text-muted mb-1">Email Address</p>
                <p class="mb-0">
                  <a v-if="user.email_address" :href="'mailto:' + user.email_address">
                    {{ user.email_address }}
                  </a>
                  <span v-else>—</span>
                </p>
              </div>
              <div class="col-6 col-lg-4">
                <p class="fw-semibold text-muted mb-1">Mobile Number</p>
                <p class="mb-0">{{ user.mobile_number || "—" }}</p>
              </div>
              <div class="col-6 col-lg-4">
                <p class="fw-semibold text-muted mb-1">Username</p>
                <p class="mb-0">
                  <code>{{ user.username }}</code>
                </p>
              </div>
            </div>
          </BaseBlock>

          <!-- Verification & Security -->
          <BaseBlock>
            <template #title>
              <i class="fa fa-shield-halved text-muted me-1"></i> Security &amp;
              Verification
            </template>

            <div class="row fs-sm">
              <div class="col-sm-6 push">
                <div
                  class="d-flex align-items-center p-3 rounded"
                  :class="
                    user.email_verified
                      ? 'bg-success-light'
                      : 'bg-warning-light'
                  "
                >
                  <i
                    class="fa fa-envelope fa-2x me-3"
                    :class="
                      user.email_verified ? 'text-success' : 'text-warning'
                    "
                  ></i>
                  <div>
                    <div class="fw-semibold">Email Verification</div>
                    <div class="text-muted">
                      {{
                        user.email_verified
                          ? "Email is verified"
                          : "Email not yet verified"
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 push">
                <div
                  class="d-flex align-items-center p-3 rounded"
                  :class="
                    user.mobile_verified
                      ? 'bg-success-light'
                      : 'bg-warning-light'
                  "
                >
                  <i
                    class="fa fa-mobile-screen fa-2x me-3"
                    :class="
                      user.mobile_verified ? 'text-success' : 'text-warning'
                    "
                  ></i>
                  <div>
                    <div class="fw-semibold">Mobile Verification</div>
                    <div class="text-muted">
                      {{
                        user.mobile_verified
                          ? "Mobile is verified"
                          : "Mobile not yet verified"
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="user.last_login_ip"
              class="fs-sm text-muted border-top pt-3 mt-2"
            >
              <i class="fa fa-globe me-1"></i> Last login IP:
              <code>{{ user.last_login_ip }}</code>
            </div>
          </BaseBlock>
        </div>

        <!-- Sidebar -->
        <div class="col-md-5 col-xl-4">
          <!-- Quick Actions -->
          <BaseBlock>
            <template #title>
              <i class="fa fa-bolt text-warning me-1"></i> Quick Actions
            </template>

            <div class="d-grid gap-2">
              <RouterLink
                to="/admin/settings/general"
                class="btn btn-alt-primary d-flex align-items-center justify-content-between"
              >
                <span><i class="fa fa-cog me-2"></i> Settings</span>
                <i class="fa fa-angle-right"></i>
              </RouterLink>
              <a
                href="javascript:void(0)"
                class="btn btn-alt-warning d-flex align-items-center justify-content-between"
              >
                <span><i class="fa fa-key me-2"></i> Change Password</span>
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </BaseBlock>

          <!-- Account Details -->
          <BaseBlock>
            <template #title>
              <i class="fa fa-id-card text-muted me-1"></i> Account Details
            </template>

            <table class="table table-borderless table-striped fs-sm mb-0">
              <tbody>
                <tr>
                  <td class="fw-semibold" style="width: 40%">Username</td>
                  <td>
                    <code>{{ user.username }}</code>
                  </td>
                </tr>
                <tr>
                  <td class="fw-semibold">Status</td>
                  <td>
                    <span class="badge" :class="statusClass">{{
                      statusLabel
                    }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="fw-semibold">Email</td>
                  <td>{{ user.email_address || "—" }}</td>
                </tr>
                <tr>
                  <td class="fw-semibold">Phone</td>
                  <td>{{ user.mobile_number || "—" }}</td>
                </tr>
                <tr>
                  <td class="fw-semibold">Last Login</td>
                  <td>{{ formatDatetime(user.last_login_at) }}</td>
                </tr>
                <tr>
                  <td class="fw-semibold">Login IP</td>
                  <td>
                    <code>{{ user.last_login_ip || "—" }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </BaseBlock>

          <!-- Permissions -->
          <BaseBlock v-if="user.permissions.length > 0">
            <template #title>
              <i class="fa fa-key text-muted me-1"></i> Permissions
              <span class="badge bg-primary ms-1">{{
                user.permissions.length
              }}</span>
            </template>

            <div class="d-flex flex-wrap gap-1">
              <span
                v-for="perm in user.permissions"
                :key="perm"
                class="badge bg-light text-dark border fs-xs"
              >
                {{ perm }}
              </span>
            </div>
          </BaseBlock>
        </div>
      </div>
    </div>
    <!-- END Page Content -->
  </template>

  <!-- Error state -->
  <div v-else class="content content-full text-center py-5">
    <i class="fa fa-exclamation-triangle fa-3x text-warning mb-3"></i>
    <p class="text-muted">Failed to load profile data.</p>
    <button class="btn btn-sm btn-alt-primary" @click="fetchProfile">
      <i class="fa fa-refresh me-1"></i> Retry
    </button>
  </div>
</template>

<style scoped>
.bg-success-light {
  background-color: rgba(40, 167, 69, 0.1);
}

.bg-warning-light {
  background-color: rgba(255, 193, 7, 0.1);
}
</style>
