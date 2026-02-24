<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import { useErrorLogStore } from "~/admin/stores/errorLogStore";

const store = useErrorLogStore();

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
    <BasePageHeading title="ErrorLog Management" />
    <BaseTable
      title="ErrorLog List"
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