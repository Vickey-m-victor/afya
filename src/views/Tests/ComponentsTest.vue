<script setup>
import { ref } from 'vue';
import BaseTable from '@/components/BaseTable.vue';
</script>

<template>

<BaseTable 
  title="Patient List"
  :data="patients" 
  :columns="[{name: 'Name', field: 'name'}, {name: 'Actions', field: 'actions'}]"
  :loading="isFetching"
>
  <template #cell(actions)="{ row }">
    <button class="btn btn-sm btn-alt-primary" @click="edit(row.id)">
      <i class="fa fa-pencil-alt"></i>
    </button>
  </template>
</BaseTable>
</template>