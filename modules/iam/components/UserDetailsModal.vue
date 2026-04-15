<script setup>
import { computed, ref } from "vue";
import { useModalStore } from "@/stores/modal";
import { useOffcanvasStore } from "@/stores/offcanvas";
import { useApi } from "@/helpers/useApi";
import { useAlertStore } from "@/stores/alert";
import { useAlert } from "@/composables/alerts";
import UsersForm from "./UsersForm.vue";
import ActivityTimeline from "./ActivityTimeline.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  onRefresh: {
    type: Function,
    default: null,
  },
});

const modalStore = useModalStore();
const offcanvasStore = useOffcanvasStore();
const alertStore = useAlertStore();
const { confirmAction } = useAlert();

const actionLoading = ref(null);

// ─── Computed helpers ───────────────────────────────────────────
const profile = computed(() => props.user?.profile || {});
const status  = computed(() => props.user?.status  || {});
const activityLog = computed(() => props.user?.activity_log || props.user?.activityLog || {});
const groups  = computed(() => props.user?.groups   || []);
const roles   = computed(() => props.user?.roles    || []);

const fullName = computed(() => {
  const parts = [profile.value.first_name, profile.value.middle_name, profile.value.last_name].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : props.user?.username || "—";
});

const avatarInitials = computed(() => {
  if (profile.value.first_name && profile.value.last_name) {
    return `${profile.value.first_name[0]}${profile.value.last_name[0]}`.toUpperCase();
  }
  return (props.user?.username || "U").substring(0, 2).toUpperCase();
});

// Generate a consistent background colour for the avatar based on initials
const avatarColor = computed(() => {
  const palette = ["#9c27b0", "#3f51b5", "#0097a7", "#388e3c", "#f57c00", "#e53935", "#5e35b1"];
  const seed = (avatarInitials.value.charCodeAt(0) || 0) + (avatarInitials.value.charCodeAt(1) || 0);
  return palette[seed % palette.length];
});

const isActive = computed(() => {
  const label = (status.value?.label || status.value || "").toString().toLowerCase();
  return label === "active";
});

const isLocked = computed(() => {
  const label = (status.value?.label || status.value || "").toString().toLowerCase();
  return label === "locked" || label === "suspended" || label === "banned";
});

// Status badge classes
function statusBadgeClass(statusObj) {
  if (statusObj?.theme) return `badge-${statusObj.theme}-soft`;
  const label = (statusObj?.label || statusObj || "").toString().toLowerCase();
  if (label === "active")    return "badge-success-soft";
  if (label === "inactive")  return "badge-secondary-soft";
  if (label === "suspended") return "badge-warning-soft";
  if (label === "locked")    return "badge-warning-soft";
  if (label === "banned")    return "badge-danger-soft";
  return "badge-info-soft";
}

function statusLabel(statusObj) {
  return statusObj?.label || statusObj || "Unknown";
}

// Friendly date formatting
function fmtDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  } catch { return dateStr; }
}

function fmtDateTime(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  } catch { return dateStr; }
}

// ─── Actions ───────────────────────────────────────────────────

function handleEdit() {
  modalStore.openModal({
    component: UsersForm,
    props: {
      formData: {
        username: props.user.username || "",
        first_name: profile.value.first_name || "",
        middle_name: profile.value.middle_name || "",
        last_name: profile.value.last_name || "",
        email_address: profile.value.email_address || "",
        mobile_number: profile.value.mobile_number || "",
        password: "",
        confirm_password: "",
      },
      fieldErrors: {},
      isLoading: false,
      readonly: false,
      hideSubmit: false,
      compact: true,
      isCreateMode: false,
    },
    title: `Edit User — ${props.user.username}`,
    size: "lg",
    showFooter: false,
  });
}

async function handleToggleLock() {
  const action = isLocked.value ? "unlock" : "lock";
  const result = await confirmAction(
    `${action === "lock" ? "Lock" : "Unlock"} account "${props.user.username}"?`,
    action === "lock"
      ? "The user will not be able to log in while locked."
      : "The user will regain access to their account."
  );
  if (!result.isConfirmed) return;

  actionLoading.value = "lock";
  try {
    const endpoint = action === "lock"
      ? `/iam/user/ban/${props.user.username}`
      : `/iam/user/status/${props.user.username}`;
    const method = action === "lock" ? "POST" : "PATCH";

    const { data: responseData, request, error } = useApi(endpoint, { method, autoFetch: false });
    await request(action === "lock" ? undefined : { status: "active" });
    if (error.value) throw error.value;

    const payload = responseData.value?.alertifyPayload || responseData.value?.dataPayload?.alertify;
    if (payload) alertStore.show(payload);
    else alertStore.show({ theme: "success", type: "toast", message: `Account ${action}ed successfully.` });

    if (typeof props.onRefresh === "function") props.onRefresh();
    modalStore.closeModal();
  } catch (err) {
    console.error(`Failed to ${action} account:`, err);
    alertStore.show({ theme: "danger", type: "toast", message: `Failed to ${action} account.` });
  } finally {
    actionLoading.value = null;
  }
}

async function handleToggleStatus() {
  const label = (status.value?.label || status.value || "").toString().toLowerCase();
  const newStatus = label === "active" ? "inactive" : "active";
  const result = await confirmAction(
    `${newStatus === "active" ? "Activate" : "Deactivate"} user "${props.user.username}"?`,
    newStatus === "active"
      ? "The user account will be reactivated."
      : "The user will no longer be able to access the system."
  );
  if (!result.isConfirmed) return;

  actionLoading.value = "status";
  try {
    const { data: responseData, request, error } = useApi(`/iam/user/status/${props.user.username}`, {
      method: "PATCH", autoFetch: false,
    });
    await request({ status: newStatus });
    if (error.value) throw error.value;

    const payload = responseData.value?.alertifyPayload || responseData.value?.dataPayload?.alertify;
    if (payload) alertStore.show(payload);
    else alertStore.show({ theme: "success", type: "toast", message: `User ${newStatus === "active" ? "activated" : "deactivated"}.` });

    if (typeof props.onRefresh === "function") props.onRefresh();
    modalStore.closeModal();
  } catch (err) {
    alertStore.show({ theme: "danger", type: "toast", message: "Failed to update user status." });
  } finally {
    actionLoading.value = null;
  }
}

async function handleDelete() {
  const result = await confirmAction(
    `Permanently delete "${props.user.username}"?`,
    "This action cannot be undone. The user will be permanently removed from the system."
  );
  if (!result.isConfirmed) return;

  actionLoading.value = "delete";
  try {
    const { data: responseData, request, error } = useApi(`/iam/user/${props.user.username}`, {
      method: "DELETE", autoFetch: false,
    });
    await request();
    if (error.value) throw error.value;

    const payload = responseData.value?.alertifyPayload || responseData.value?.dataPayload?.alertify;
    if (payload) alertStore.show(payload);
    else alertStore.show({ theme: "success", type: "toast", message: "User deleted successfully." });

    if (typeof props.onRefresh === "function") props.onRefresh();
    modalStore.closeModal();
  } catch (err) {
    alertStore.show({ theme: "danger", type: "toast", message: "Failed to delete user." });
  } finally {
    actionLoading.value = null;
  }
}

function handleActivityTimeline() {
  offcanvasStore.openOffcanvas({
    component: ActivityTimeline,
    props: {
      username: props.user?.username || "User",
      // activities, totalActivities, lastActivity — populated from real API when available
    },
    title: `User Activity Timeline`,
    placement: "end",
    width: "420px",
  });
}
</script>

<template>
  <div class="udm-root">
    <!-- ══════════════ LEFT SIDEBAR ══════════════ -->
    <aside class="udm-sidebar">

      <!-- Avatar -->
      <div class="udm-avatar-wrap">
        <div class="udm-avatar" :style="{ background: avatarColor }">
          {{ avatarInitials }}
        </div>
      </div>

      <!-- Name / Role / Status -->
      <h3 class="udm-name">{{ fullName }}</h3>
      <span class="udm-badge mb-1" :class="statusBadgeClass(status)">
        {{ statusLabel(status) }}
      </span>
      <p class="udm-role">{{ user.role || user.access_role || "User" }}</p>
      <p class="udm-online">
        <span class="udm-dot"></span>
        {{ activityLog.is_online ? "Currently Online" : "Currently Offline" }}
      </p>

      <!-- Action buttons -->
      <div class="udm-actions">
        <button class="udm-btn udm-btn-outline-info" @click="handleActivityTimeline">
          <i class="fa fa-history me-2"></i>Activity Timeline
        </button>
        <button class="udm-btn udm-btn-outline-primary" @click="handleEdit">
          <i class="fa fa-pen me-2"></i>Edit User
        </button>
        <button
          class="udm-btn"
          :class="isLocked ? 'udm-btn-outline-success' : 'udm-btn-outline-warning'"
          :disabled="actionLoading === 'lock'"
          @click="handleToggleLock"
        >
          <span v-if="actionLoading === 'lock'" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="fa me-2" :class="isLocked ? 'fa-lock-open' : 'fa-lock'"></i>
          {{ isLocked ? "Unlock Account" : "Lock Account" }}
        </button>
        <button
          class="udm-btn"
          :class="isActive ? 'udm-btn-outline-danger' : 'udm-btn-outline-success'"
          :disabled="actionLoading === 'status'"
          @click="handleToggleStatus"
        >
          <span v-if="actionLoading === 'status'" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="fa me-2" :class="isActive ? 'fa-user-slash' : 'fa-user-check'"></i>
          {{ isActive ? "Deactivate Account" : "Activate Account" }}
        </button>
      </div>

      <!-- Danger zone -->
      <div class="udm-danger-zone">
        <p class="udm-danger-label">DANGER ZONE</p>
        <button
          class="udm-btn udm-btn-danger"
          :disabled="actionLoading === 'delete'"
          @click="handleDelete"
        >
          <span v-if="actionLoading === 'delete'" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="fa fa-trash me-2"></i>
          Delete Account
        </button>
      </div>
    </aside>

    <!-- ══════════════ RIGHT CONTENT ══════════════ -->
    <div class="udm-content">
      <div class="udm-cards-row">

        <!-- Basic Information -->
        <div class="udm-card">
          <div class="udm-card-header">
            <i class="fa fa-user-circle me-2 text-muted"></i>
            <span>BASIC INFORMATION</span>
          </div>
          <div class="udm-card-body">
            <div class="udm-field">
              <span class="udm-field-label">Username</span>
              <span class="udm-field-value">{{ user.username || "—" }}</span>
            </div>
            <div class="udm-field">
              <span class="udm-field-label">Email Address</span>
              <span class="udm-field-value">{{ profile.email_address || "—" }}</span>
            </div>
            <div class="udm-field">
              <span class="udm-field-label">Mobile Number</span>
              <span class="udm-field-value">{{ profile.mobile_number || "—" }}</span>
            </div>
            <div class="udm-field">
              <span class="udm-field-label">Access Role</span>
              <span class="udm-field-value fw-bold text-uppercase">
                {{ user.access_role || user.role || "USER" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Account Information -->
        <div class="udm-card">
          <div class="udm-card-header">
            <i class="fa fa-shield-alt me-2 text-muted"></i>
            <span>ACCOUNT INFORMATION</span>
          </div>
          <div class="udm-card-body">
            <div class="udm-field">
              <span class="udm-field-label">Account Created</span>
              <span class="udm-field-value">{{ fmtDate(user.created_at || activityLog.created_at) }}</span>
            </div>
            <div class="udm-field">
              <span class="udm-field-label">Last Login</span>
              <span class="udm-field-value">{{ fmtDateTime(activityLog.last_login || user.last_login) }}</span>
            </div>
            <div class="udm-field">
              <span class="udm-field-label">Last IP Address</span>
              <span class="udm-field-value">{{ activityLog.last_ip || user.last_ip || "—" }}</span>
            </div>
            <div class="udm-field">
              <span class="udm-field-label">Account Status</span>
              <span class="udm-badge" :class="statusBadgeClass(status)">
                {{ statusLabel(status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Permissions & Access -->
      <div class="udm-card udm-card-full">
        <div class="udm-card-header">
          <i class="fa fa-key me-2 text-muted"></i>
          <span>PERMISSIONS &amp; ACCESS</span>
        </div>
        <div class="udm-card-body">
          <div class="udm-field">
            <span class="udm-field-label fw-semibold">Groups:</span>
            <span class="udm-field-value" v-if="groups.length">
              <span
                v-for="(g, i) in groups"
                :key="i"
                class="udm-pill udm-pill-secondary"
              >{{ g.name || g }}</span>
            </span>
            <span v-else class="udm-field-value text-muted">—</span>
          </div>
          <div class="udm-field">
            <span class="udm-field-label fw-semibold">Roles:</span>
            <span class="udm-field-value" v-if="roles.length">
              <span
                v-for="(r, i) in roles"
                :key="i"
                class="udm-pill udm-pill-primary"
              >{{ r.name || r }}</span>
            </span>
            <span v-else class="udm-field-value text-muted">—</span>
          </div>
        </div>
      </div>

      <!-- Info tip -->
      <div class="udm-tip">
        <i class="fa fa-info-circle me-2"></i>
        Use the buttons on the left to manage this user account. You can lock/unlock the account,
        edit details, or view full activity history.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Root layout ─────────────────────────────────────────────── */
.udm-root {
  display: flex;
  gap: 1.5rem;
  min-height: 360px;
}

/* ── Left sidebar ─────────────────────────────────────────────── */
.udm-sidebar {
  width: 210px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
  border-right: 1px solid var(--bs-border-color, #e4e7ed);
  padding-right: 1.25rem;
}

.udm-avatar-wrap {
  margin-bottom: 0.75rem;
}

.udm-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 4px 16px rgba(0,0,0,.18);
}

.udm-name {
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.35rem;
}

.udm-role {
  font-size: 0.8rem;
  color: var(--bs-secondary-color, #6c757d);
  margin: 0.2rem 0 0.1rem;
  text-align: center;
}

.udm-online {
  font-size: 0.75rem;
  color: var(--bs-secondary-color, #6c757d);
  margin: 0 0 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.udm-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #adb5bd;
  display: inline-block;
}

/* ── Buttons ──────────────────────────────────────────────────── */
.udm-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}

.udm-btn {
  width: 100%;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  border: 1.5px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  background: transparent;
}

.udm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.udm-btn-outline-info    { border-color: var(--bs-info,    #0dcaf0); color: var(--bs-info,    #0dcaf0); }
.udm-btn-outline-primary { border-color: var(--bs-primary, #0d6efd); color: var(--bs-primary, #0d6efd); }
.udm-btn-outline-warning { border-color: var(--bs-warning, #ffc107); color: var(--bs-warning, #ffc107); }
.udm-btn-outline-danger  { border-color: var(--bs-danger,  #dc3545); color: var(--bs-danger,  #dc3545); }
.udm-btn-outline-success { border-color: var(--bs-success, #198754); color: var(--bs-success, #198754); }

.udm-btn-outline-info:hover    { background: var(--bs-info,    #0dcaf0); color: #fff; }
.udm-btn-outline-primary:hover { background: var(--bs-primary, #0d6efd); color: #fff; }
.udm-btn-outline-warning:hover { background: var(--bs-warning, #ffc107); color: #000; }
.udm-btn-outline-danger:hover  { background: var(--bs-danger,  #dc3545); color: #fff; }
.udm-btn-outline-success:hover { background: var(--bs-success, #198754); color: #fff; }

/* Danger zone */
.udm-danger-zone {
  width: 100%;
  border-top: 1px dashed var(--bs-border-color, #e4e7ed);
  padding-top: 0.85rem;
  margin-top: auto;
}

.udm-danger-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--bs-danger, #dc3545);
  text-align: center;
  margin-bottom: 0.5rem;
}

.udm-btn-danger {
  background: var(--bs-danger, #dc3545);
  color: #fff;
  border-color: var(--bs-danger, #dc3545);
}

.udm-btn-danger:hover {
  background: #b02a37;
  border-color: #b02a37;
}

/* ── Right content area ────────────────────────────────────────── */
.udm-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.udm-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* ── Card component ───────────────────────────────────────────── */
.udm-card {
  border: 1px solid var(--bs-border-color, #e4e7ed);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bs-body-bg, #fff);
}

.udm-card-full {
  width: 100%;
}

.udm-card-header {
  background: var(--bs-body-bg, #f8f9fa);
  border-bottom: 1px solid var(--bs-border-color, #e4e7ed);
  padding: 0.6rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  color: var(--bs-secondary-color, #6c757d);
  display: flex;
  align-items: center;
}

.udm-card-body {
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

/* ── Field ────────────────────────────────────────────────────── */
.udm-field {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.udm-field-label {
  font-size: 0.74rem;
  color: var(--bs-secondary-color, #6c757d);
}

.udm-field-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--bs-body-color, #212529);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

/* ── Badge (status) ───────────────────────────────────────────── */
.udm-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.75rem;
  border-radius: 999px;
  font-size: 0.73rem;
  font-weight: 600;
}

.badge-success-soft   { background: rgba(25,135,84,.12);  color: var(--bs-success, #198754); }
.badge-secondary-soft { background: rgba(108,117,125,.12); color: var(--bs-secondary, #6c757d); }
.badge-warning-soft   { background: rgba(255,193,7,.15);  color: #a07800; }
.badge-danger-soft    { background: rgba(220,53,69,.12);   color: var(--bs-danger, #dc3545); }
.badge-info-soft      { background: rgba(13,202,240,.12);  color: var(--bs-info, #0dcaf0); }

/* ── Pills (groups / roles) ───────────────────────────────────── */
.udm-pill {
  padding: 0.18rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.udm-pill-primary   { background: rgba(13,110,253,.1); color: var(--bs-primary, #0d6efd); }
.udm-pill-secondary { background: rgba(108,117,125,.1); color: var(--bs-secondary, #6c757d); }

/* ── Info tip ─────────────────────────────────────────────────── */
.udm-tip {
  background: rgba(13, 202, 240, 0.08);
  border: 1px solid rgba(13, 202, 240, 0.22);
  border-radius: 6px;
  padding: 0.65rem 1rem;
  font-size: 0.8rem;
  color: var(--bs-secondary-color, #6c757d);
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}

.udm-tip .fa-info-circle {
  color: var(--bs-info, #0dcaf0);
  margin-top: 1px;
  flex-shrink: 0;
}

/* ── Responsive tweak ─────────────────────────────────────────── */
@media (max-width: 640px) {
  .udm-root {
    flex-direction: column;
  }
  .udm-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--bs-border-color, #e4e7ed);
    padding-right: 0;
    padding-bottom: 1rem;
  }
  .udm-cards-row {
    grid-template-columns: 1fr;
  }
}
</style>
