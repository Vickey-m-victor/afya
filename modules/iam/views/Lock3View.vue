<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/iam/stores/auth";
import { useAlert } from "@/composables/alerts";

// Main store and Router
const router = useRouter();
const authStore = useAuthStore();
const { toastError, toastSuccess } = useAlert();

const savedUsername = ref(localStorage.getItem("username") || "User");
const password = ref(""); // Replaced 'state' object with a simple ref
const isLoading = ref(false);

onMounted(() => {
  // 💡 DESTROY THE TOKEN TO SECURELY "LOCK" THE APP
  localStorage.removeItem("token");
  authStore.isAuthenticated = false;
});

async function onSubmit() {
  // Basic check to prevent empty submissions before hitting backend
  if (!password.value) {
    toastError("Error", "Please enter a password");
    return;
  }

  isLoading.value = true;
  
  try {
    // 💡 PERFORM REAL LOGIN TO GET A NEW TOKEN
    await authStore.login({
      username: savedUsername.value,
      password: password.value, // Pass the password to the backend
    });

    toastSuccess("Success", "Unlocked successfully!");
    router.push({ name: "dashboard" });
  } catch (error) {
    // Rely completely on backend error message
    const backendMessage = error.response?.data?.message || "Invalid password";
    toastError("Error", backendMessage);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="hero-static d-flex align-items-center bg-body-extra-light">
    <div class="w-100">
      <div class="content content-full">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4 py-4">
            
            <div class="text-center mb-5">
              <p class="mb-3">
                <i class="fa fa-2x fa-circle-notch text-primary-light"></i>
              </p>
              <h1 class="fw-bold mb-2">Account Locked</h1>
              <p class="fw-medium text-muted mb-5">
                Please enter your password to unlock your account
              </p>
              <img
                class="img-avatar img-avatar96"
                src="/assets/media/avatars/avatar10.jpg"
                alt=""
              />
              <p class="fw-semibold text-center my-2">{{ savedUsername }}</p> 
            </div>

            <div class="row g-0 justify-content-center">
              <div class="col-sm-10 col-xl-8">
                
                <form @submit.prevent="onSubmit">
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-lg form-control-alt py-3"
                      id="lock-password"
                      placeholder="Password.."
                      v-model="password"
                    />
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-lg btn-alt-success w-100" :disabled="isLoading">
                      <i v-if="isLoading" class="fa fa-spinner fa-spin me-1"></i>
                      <i v-else class="fa fa-fw fa-lock-open me-1 opacity-50"></i>
                      Unlock
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>