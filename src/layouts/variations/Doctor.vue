<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import BaseLayout from "@/layouts/BaseLayout.vue";
import ChangePasswordModal from "~/iam/components/ChangePasswordModal.vue";

// Main store, Auth store, Modal store, and Router
const store = useTemplateStore();
const authStore = useAuthStore();
const modalStore = useModalStore();
const router = useRouter();

// Set default elements for this layout
store.setLayout({
  header: true,
  sidebar: false,
  footer: true,
});

// Reactive search term
const searchTerm = ref("");
const changePasswordSubmit = ref(null);

function onSearchSubmit() {
  if (searchTerm.value.trim()) {
    router.push("/backend/pages/generic/search?" + searchTerm.value);
  }
}

async function onLogout() {
  await authStore.logout();
}

function onLockAccount() {
  if (authStore.user?.username) {
    sessionStorage.setItem("lock.username", authStore.user.username);
  }
  router.push({ name: "iam/auth/lock" });
}

function openChangePasswordModal() {
  changePasswordSubmit.value = null;
  modalStore.openModal({
    component: ChangePasswordModal,
    title: "Change Password",
    size: "md",
    showFooter: true,
    closeOnBackdrop: false,
    closeOnEsc: true,
    confirmText: "Change Password",
    cancelText: "Cancel",
    initialFocus: "#current-password",
    props: {
      registerSubmit: (submitFn) => {
        changePasswordSubmit.value = submitFn;
      },
    },
    onConfirm: async () => {
      if (!changePasswordSubmit.value) {
        return false;
      }

      const result = await changePasswordSubmit.value();
      if (result?.forceLogout) {
        modalStore.closeModal(true);
        authStore.logOut({
          callApi: false,
          redirect: { name: "iam/auth/signin" },
        });
        return false;
      }

      return result;
    },
  });
}
</script>

<template>
  <BaseLayout>
    <!-- Left Section of the Header -->
    <template #header-content-left>
      <div class="d-flex align-items-center">
        <!-- Logo -->
        <RouterLink :to="{ name: 'doctor-dashboard' }" class="d-flex align-items-center me-4">
          <img src="/assets/media/logo.svg" alt="Doccure Logo" style="height: 34px;" />
        </RouterLink>

        <!-- Global Search Form -->
        <form class="d-none d-md-inline-block" @submit.prevent="onSearchSubmit">
          <div class="input-group input-group-sm bg-body-light border rounded-pill px-3 py-1" style="max-width: 260px;">
            <input
              type="text"
              class="form-control form-control-alt border-0 bg-transparent py-0 shadow-none text-dark"
              placeholder="Search..."
              v-model="searchTerm"
            />
            <span class="input-group-text border-0 bg-transparent p-0">
              <i class="fa fa-fw fa-search text-muted"></i>
            </span>
          </div>
        </form>
      </div>
    </template>

    <!-- Right Section of the Header -->
    <template #header-content-right>
      <div class="d-flex align-items-center">
        <!-- Messages/Chat Link -->
        <RouterLink
          to="#"
          class="btn btn-sm btn-alt-secondary position-relative me-3 rounded-circle d-flex align-items-center justify-content-center"
          style="width: 36px; height: 36px; background-color: #f8f9fa; border: none;"
          title="Messages"
        >
          <i class="fa fa-comment text-secondary"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style="font-size: 9px; padding: 3px 6px;">7</span>
        </RouterLink>

        <!-- Notifications Dropdown -->
        <div class="dropdown d-inline-block me-3">
          <button
            type="button"
            class="btn btn-sm btn-alt-secondary position-relative rounded-circle d-flex align-items-center justify-content-center"
            style="width: 36px; height: 36px; background-color: #f8f9fa; border: none;"
            id="page-header-notifications-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            title="Notifications"
          >
            <i class="fa fa-bell text-secondary"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 9px; padding: 3px 6px;">4</span>
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 border-0 shadow"
            aria-labelledby="page-header-notifications-dropdown"
            style="width: 320px;"
          >
            <div class="p-3 bg-primary text-white rounded-top d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fs-sm fw-bold">Notifications</h5>
              <span class="badge bg-white text-primary">4 New</span>
            </div>
            <div class="p-2" style="max-height: 280px; overflow-y: auto;">
              <a href="javascript:void(0)" class="dropdown-item d-flex py-2 border-bottom">
                <div class="flex-shrink-0 me-3">
                  <img class="img-avatar img-avatar32" src="/assets/media/avatars/avatar1.jpg" alt="Travis Tremble">
                </div>
                <div class="flex-grow-1">
                  <p class="mb-0 fs-xs text-dark fw-medium">Travis Tremble sent payment of $210 for appointment.</p>
                  <span class="text-muted fs-xs">18:30 PM</span>
                </div>
              </a>
              <a href="javascript:void(0)" class="dropdown-item d-flex py-2 border-bottom">
                <div class="flex-shrink-0 me-3">
                  <img class="img-avatar img-avatar32" src="/assets/media/avatars/avatar2.jpg" alt="Hendry Watt">
                </div>
                <div class="flex-grow-1">
                  <p class="mb-0 fs-xs text-dark fw-medium">Hendry Watt booked appointment.</p>
                  <span class="text-muted fs-xs">12 Min Ago</span>
                </div>
              </a>
              <a href="javascript:void(0)" class="dropdown-item d-flex py-2">
                <div class="flex-shrink-0 me-3">
                  <img class="img-avatar img-avatar32" src="/assets/media/avatars/avatar3.jpg" alt="Maria Dyen">
                </div>
                <div class="flex-grow-1">
                  <p class="mb-0 fs-xs text-dark fw-medium">Maria Dyen sent payment of $210.</p>
                  <span class="text-muted fs-xs">6 Min Ago</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- User Dropdown Menu (Profile Menu) -->
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn btn-sm btn-alt-secondary d-flex align-items-center"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style="border: none; background: transparent;"
          >
            <img
              v-if="authStore.user?.profile?.avatar_url"
              class="rounded-circle border border-2 border-white shadow-sm"
              :src="authStore.user.profile.avatar_url"
              alt="Avatar"
              style="width: 32px; height: 32px; object-fit: cover;"
            />
            <img
              v-else
              class="rounded-circle border border-2 border-white shadow-sm"
              src="/assets/media/avatars/avatar10.jpg"
              alt="Avatar"
              style="width: 32px; height: 32px; object-fit: cover;"
            />
            <span class="d-none d-sm-inline-block ms-2 text-dark fw-semibold" style="font-size: 14px;">
              {{ authStore.user?.profile?.first_name || authStore.user?.username || 'User' }}
            </span>
            <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1 text-dark"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0 shadow"
            aria-labelledby="page-header-user-dropdown"
          >
            <div class="p-3 text-center bg-body-light border-bottom rounded-top">
              <img
                v-if="authStore.user?.profile?.avatar_url"
                class="img-avatar img-avatar48 img-avatar-thumb"
                :src="authStore.user.profile.avatar_url"
                alt="Avatar"
              />
              <img
                v-else
                class="img-avatar img-avatar48 img-avatar-thumb"
                src="/assets/media/avatars/avatar10.jpg"
                alt="Avatar"
              />
              <p class="mt-2 mb-0 fw-semibold text-dark">
                {{ authStore.user?.profile ? [authStore.user.profile.first_name, authStore.user.profile.last_name].filter(Boolean).join(' ') : (authStore.user?.username || 'User') }}
              </p>
              <p class="mb-0 text-muted fs-sm">@{{ authStore.user?.username || 'user' }}</p>
            </div>
            <div class="p-2">
              <a class="dropdown-item d-flex align-items-center justify-content-between" href="javascript:void(0)">
                <span class="fs-sm fw-medium">Inbox</span>
                <span class="badge rounded-pill bg-primary ms-2">3</span>
              </a>
              <RouterLink :to="{ name: 'admin/profile' }" class="dropdown-item d-flex align-items-center justify-content-between">
                <span class="fs-sm fw-medium">Profile</span>
                <span class="badge rounded-pill bg-primary ms-2">1</span>
              </RouterLink>
              <a href="#" class="dropdown-item d-flex align-items-center justify-content-between" @click.prevent="openChangePasswordModal">
                <span class="fs-sm fw-medium">Change Password</span>
              </a>
            </div>
            <div role="separator" class="dropdown-divider m-0"></div>
            <div class="p-2">
              <a href="#" class="dropdown-item d-flex align-items-center justify-content-between" @click.prevent="onLockAccount">
                <span class="fs-sm fw-medium">Lock Account</span>
              </a>
              <a href="#" class="dropdown-item d-flex align-items-center justify-content-between" @click.prevent="onLogout">
                <span class="fs-sm fw-medium">Log Out</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>

    <RouterView />
  </BaseLayout>
</template>

<style>
/* Header styling overrides for clean white header matching Doccure */
#page-header {
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
  border-bottom: 1px solid #f0f2f5 !important;
}

#page-header .content-header {
  height: 70px !important;
}

/* Style the body-light bg in the page content */
.bg-body-light {
  background-color: #f8f9fa !important;
}
</style>
