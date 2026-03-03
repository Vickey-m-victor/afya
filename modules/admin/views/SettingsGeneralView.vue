<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useSettingsGeneralStore } from "~/admin/stores/settingsGeneralStore";
import SettingsForm from "~/admin/components/SettingsForm.vue";
import { useAlert } from "@/composables/alerts";
const store = useSettingsGeneralStore();
const formData = ref({});
const {toastError, toastSuccess} = useAlert();
const formFields = reactive([
  { label: "Business Name", type: "text", name: "business_name" },
  { label: "Physical Address", type: "text", name: "physical_address" },
  { label: "Postal Address", type: "text", name: "postal_address" },
  { label: "Email address", type: "text", name: "email_address" },
  { label: "Website", type: "text", name: "website" },
  { label: "Mobile Number", type: "text", name: "primary_mobile_number" },

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