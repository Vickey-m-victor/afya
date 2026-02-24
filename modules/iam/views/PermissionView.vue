<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import { usePermissionStore } from "~/iam/stores/permissionStore";

const store = usePermissionStore();

const tableColumns = [
  { name: "ID", field: "id" },
  { name: "Name", field: "name" },
  { name: "Actions", field: "actions" },
];

onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <div class="content">
    <BasePageHeading title="Permission Management" />
    <BaseTable
      title="Permission List"
      :data="store.items"
      :columns="tableColumns"
      :loading="store.loading"
    >
      <template #cell(actions)="{ row }">
        <button class="btn btn-sm btn-alt-primary">
          <i class="fa fa-pencil-alt"></i>
        </button>
      </template>
    </BaseTable>
  </div>
</template>