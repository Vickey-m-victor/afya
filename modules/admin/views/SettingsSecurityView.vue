<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import { useSettingsSecurityStore } from "~/admin/stores/settingsSecurityStore";
import SettingsForm from "~/admin/components/SettingsForm.vue";
import { useAlert } from "@/composables/alerts";

// 💡 FIX 1: Import Alerts
const { toastSuccess, toastError } = useAlert();

// 💡 FIX 2: Use the correct Security Store
const store = useSettingsSecurityStore();
const formData = ref({});

const formFields = reactive([
  { label: "Otp Expiry", type: "number", name: "otp_expiry" },
  { label: "Trusted device duration", type: "number", name: "trusted_device_duration" },
  { label: "Maximum login attempts", type: "number", name: "maximum_login_attempts" },
  { label: "Profile lock duration", type: "number", name: "profile_lock_duration" },
  { label: "Two factor authentication", type: "number", name: "two_factor_auth" },
]);

const handleSave = async () => {
  try {
    // 💡 FIX 3: Check if data already exists (has an ID) to determine if we Update or Create
    const recordId = formData.value.id || formData.value.uuid || formData.value.security_id;

    if (recordId) {
      await store.update(recordId, formData.value);
    } else {
      await store.create(formData.value);
    }

    toastSuccess("Success", "Security Settings updated successfully!");
  } catch (error) {
    toastError("Error", error.response?.data?.message || "Failed to save settings");
  }
};

onMounted(async () => { 
  try {
    await store.fetchAll();
    
    // 💡 FIX 4: Pre-fill the form with the fetched data
    if (Array.isArray(store.items) && store.items.length > 0) {
      formData.value = { ...store.items[0] }; 
    } else if (store.items && !Array.isArray(store.items)) {
      formData.value = { ...store.items };
    }
  } catch (error) {
    toastError("Error", "Failed to load security settings");
  }
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="Security Settings" />
    
    <div class="row">
      <div class="col-md-8">
        <BaseBlock>
          <SettingsForm
            v-model="formData"
            :fields="formFields"
            submitLabel="Save Settings"
            @submit="handleSave"
          />
        </BaseBlock>
      </div>
    </div>
  </div>
</template>