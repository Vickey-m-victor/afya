<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useSettingsGeneralStore } from "~/admin/stores/settingsGeneralStore";
import SettingsForm from "~/admin/components/SettingsForm.vue";
const store = useSettingsGeneralStore();
const formData = ref({});

const formFields = reactive([
  { label: "otp_expiry", type: "text", name: "otp_expiry" },
  { label: "trusted_device_duration", type: "text", name: "trusted_device_duration" },
  { label: "maximum_login_attempts", type: "text", name: "maximum_login_attempts" },
  { label: "profile_lock_duration", type: "text", name: "profile_lock_duration" },
  { label: "two_factor_auth", type: "text", name: "two_factor_auth" },

]);
const handleSave = () => {
  console.log("Saving data:", formData.value);
};

onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="General Settings" />
    <div class="row">
      <div class="col-md-12">
        <BaseBlock >
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