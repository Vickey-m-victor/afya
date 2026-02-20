<script setup>
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";
import BaseButton from "./BaseButton.vue";
const props = defineProps({
  // list of objects which will come from the backend.
  data: { type: Array, required: true, default: () => [] },
  // table headers to be created.
  columns: { type: Array, required: true },
  // for the shimmer effect, if loaading is true.
  loading: { type: Boolean, default: false },
  title: { type: String, default: "" },
  searchFields: { type: Array, default: () => [] },
});

const emit = defineEmits(["click", "close", "refresh"]);

const onSort = (event, index) => {
  // Logic for sorting can be added here if needed manually,
  // but vue-dataset usually handles this via headers.
};
</script>

<template>
  <BaseBlock :title="title" content-full>
    <Dataset v-slot="{ ds }" :ds-data="data" :ds-search-in="searchFields">
      <div class="d-flex justify-content-end  me-3">
        <BaseButton
        label="Create User"
        @click="$emit('click')"
        ></BaseButton>
      </div>
      <div class="d-flex justify-content-between" :data-page-count="ds.dsPagecount">
        <div id="datasetLength" class="col-md-1 py-2">
          <DatasetShow />
        </div>
        <div class="col-md-3 py-2">
          <DatasetSearch ds-search-placeholder="Search..." />
        </div>
      </div>
    
      <hr />
      <div class="table-responsive">
        <table class="table table-striped mb-0">
          <thead>
            <tr>
              <th scope="col" style="width: 50px">ID</th>
              <th
                v-for="(col, index) in columns"
                :key="col.field"
                @click="onSort($event, index)"
                style="cursor: pointer"
              >
                {{ col.name }}
              </th>
            </tr>
          </thead>

          <tbody v-if="loading">
            <tr v-for="n in 5" :key="`shimmer-${n}`">
              <td v-for="i in columns.length + 1" :key="`cell-${i}`">
                <div class="shimmer"></div>
              </td>
            </tr>
          </tbody>

          <DatasetItem v-else tag="tbody" class="fs-sm">
            <template #default="{ row, rowIndex }">
              <tr>
                <th scope="row">{{ rowIndex + 1 }}</th>
                <td v-for="col in columns" :key="col.field">
                  <slot
                    :name="`cell(${col.field})`"
                    :row="row"
                    :index="rowIndex"
                  >
                    {{ row[col.field] }}
                  </slot>
                </td>
              </tr>
            </template>
          </DatasetItem>
        </table>
      </div>
      <div
        class="d-flex flex-md-row flex-column justify-content-between align-items-center"
      >
        <DatasetInfo class="py-3 fs-sm" />
        <DatasetPager class="flex-wrap py-3 fs-sm" />
      </div>
    </Dataset>
  </BaseBlock>
</template>

<style scoped>
.shimmer {
  height: 12px;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  display: inline-block;
  position: relative;
  width: 100%;
  animation: shimmer 1.5s linear infinite forwards;
}

@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
