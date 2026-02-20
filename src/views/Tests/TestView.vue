<script setup>
import { ref } from "vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseRadio from "@/components/BaseRadio.vue";
const selectedCheckboxes = ref([]);
const selectedRadio = ref(null);
</script>
<template>
  <BaseCheckbox
    v-model="selectedCheckboxes"
    :options="[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3' },
    ]"
    :inline="true"
    :switchStyle="true"
  />

  <BaseRadio
    v-model="selectedRadio"
    :options="[
      { label: 'Option A', value: 'A' },
      { label: 'Option B', value: 'B' },
    ]"
    :inline="false"
  />
</template>
