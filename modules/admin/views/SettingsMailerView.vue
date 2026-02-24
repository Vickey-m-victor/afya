<script setup>
import { ref, reactive, onMounted } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseBlock from "@/components/BaseBlock.vue";
import { useSettingsMailerStore } from "~/admin/stores/settingsMailerStore";

const store = useSettingsMailerStore();
const formData = ref({});

const formFields = reactive([
  { label: "Example Setting", type: "text", name: "example" },
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
    <BasePageHeading title="SettingsMailer Settings" />
    <div class="row">
      <div class="col-md-8">
        <BaseBlock title="Configuration">
          <BaseForm 
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