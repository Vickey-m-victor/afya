<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useSettingsGeneralStore } from "~/admin/stores/settingsGeneralStore";
import SettingsForm from "~/admin/components/SettingsForm.vue";
const store = useSettingsGeneralStore();
const formData = ref({});

const formFields = reactive([
  { label: "Business Name", type: "text", name: "business_name" },

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