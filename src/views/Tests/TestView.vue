<script setup>
import { ref, onMounted } from "vue";

import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseRadio from "@/components/BaseRadio.vue";
import BaseLoader from "@/components/BaseLoader.vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown.vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseBadge from "@/components/BaseBadge.vue";
import BaseButton from "@/components/BaseButton.vue";

// ------------------
// Demo state
// ------------------
const selectedCheckboxes = ref([]);
const selectedRadio = ref(null);

// Table demo state (backend-ready)
const isFetching = ref(false);
const users = ref([]);

const tableColumns = [
  { name: "Name", field: "name" },
  { name: "Email", field: "email" },
  { name: "Status", field: "status" },
];

// ------------------
// Handlers
// ------------------
const handleUserAction = (action) => {
  console.log("Dropdown action:", action);
};

// Simulate backend (replace later)
onMounted(() => {
  isFetching.value = true;

  setTimeout(() => {
    users.value = [
      { name: "John Doe", email: "john@example.com", status: "Active" },
      { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    ];
    isFetching.value = false;
  }, 900);
});
</script>

<template>
  <div class="content">

    <!-- 🔹 DROPDOWNS -->
    <BaseCard title="Dropdowns" class="mb-4">
      <div class="d-flex gap-3 flex-wrap">

        <BaseDropdown
          :items="[
            { label: 'Edit', icon: 'fa fa-pencil-alt', action: 'edit' },
            { divider: true },
            { label: 'Delete', icon: 'fa fa-trash', action: 'delete' },
          ]"
          @select="handleUserAction"
        />

        <BaseDropdown label="From Right" variant="btn-alt-primary" align="end" />

        <BaseDropdown label="Center" variant="btn-primary" align="center" />

      </div>
    </BaseCard>

    <!-- 🔹 CHECKBOX + RADIO -->
    <BaseCard title="Inputs" class="mb-4">
      <div class="mb-4">
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
      </div>

      <BaseRadio
        v-model="selectedRadio"
        :options="[
          { label: 'Option A', value: 'A' },
          { label: 'Option B', value: 'B' },
        ]"
      />
    </BaseCard>

    <!-- 🔹 TABLE + LOADER -->
    <BaseCard title="Table + Loader" class="mb-4">

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
    </BaseCard>

    <!-- 🔹 CARDS -->
    <div class="row mb-4">
      <div class="col-md-4">
        <BaseCard title="Users">
          <template #actions>
            <BaseButton size="sm" label="Refresh" />
          </template>

          Table goes here…
        </BaseCard>
      </div>

      <div class="col-md-4">
        <BaseCard title="Report">
          Content here

          <template #footer>
            <BaseButton label="Save" />
          </template>
        </BaseCard>
      </div>
    </div>

    <!-- 🔹 BADGES -->
    <BaseCard title="Badges">
      <div class="d-flex gap-2 flex-wrap">
        <BaseBadge label="Active" variant="success" />

        <BaseBadge variant="danger" pill>
          Failed
        </BaseBadge>

        <BaseBadge variant="warning" dot>
          Pending
        </BaseBadge>
      </div>
    </BaseCard>

  </div>
</template>