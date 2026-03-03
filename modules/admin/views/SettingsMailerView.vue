<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useSettingsMailerStore } from "~/admin/stores/settingsMailerStore";
import SettingsForm from "~/admin/components/SettingsForm.vue";
import { useAlert } from "@/composables/alerts";

const { toastError, toastSuccess} = useAlert();

const store = useSettingsMailerStore();
const formData = ref({});

const formFields = reactive([
  { label: "smtp_server", type: "text", name: "smtp_server" },
  { label: "smtp_port", type: "text", name: "smtp_port" },
  { label: "smtp_username", type: "text", name: "smtp_username" },
  { label: "smtp_password", type: "text", name: "smtp_password" },
  { label: "email_encryption", type: "text", name: "email_encryption" },

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

    toastSuccess("Success", "General Settings updated successfully!");
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
    toastError("Error", "Failed to load general settings");
  }
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