<script setup>
import { ref } from "vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseRadio from "@/components/BaseRadio.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown.vue";
const selectedCheckboxes = ref([]);
const selectedRadio = ref(null);
</script>

<template>

<BaseDropdown
  :items="[
    { label: 'Edit', icon: 'fa fa-pencil-alt', action: 'edit' },
    { divider: true },
    { label: 'Delete', icon: 'fa fa-trash', action: 'delete' },
  ]"
  @select="handleUserAction"
/>
<BaseDropdown
  label="From Right"
  variant="btn-alt-primary"
  align="end"
/>

<BaseDropdown
  label="Center"
  variant="btn-primary"
  align="center"
/>
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

  <BaseLoader
  v-if="isFetching"
  variant="table"
  :rows="5"
  :columns="tableColumns.length"
/>

<BaseTable
  v-else
  title="Global Users Registry"
  :data="users"
  :columns="tableColumns"
  :loading="isFetching"
  :search-fields="['name', 'email']"
/>


</template>
