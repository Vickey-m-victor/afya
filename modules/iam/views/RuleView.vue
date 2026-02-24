<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import { useRuleStore } from "~/iam/stores/ruleStore";

const store = useRuleStore();

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
    <BasePageHeading title="Rule Management" />
    <BaseTable
      title="Rule List"
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