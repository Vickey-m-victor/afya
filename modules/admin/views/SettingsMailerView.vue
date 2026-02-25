<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useSettingsGeneralStore } from "~/admin/stores/settingsGeneralStore";
import SettingsForm from "~/admin/components/SettingsForm.vue";
const store = useSettingsGeneralStore();
const formData = ref({});

const formFields = reactive([
  { label: "smtp_server", type: "text", name: "smtp_server" },
  { label: "smtp_port", type: "text", name: "smtp_port" },
  { label: "smtp_username", type: "text", name: "smtp_username" },
  { label: "smtp_password", type: "text", name: "smtp_password" },
  { label: "email_encryption", type: "text", name: "email_encryption" },

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