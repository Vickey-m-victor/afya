<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  searchFields: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["click", "close", "refresh"]);

const onSort = (event, index) => {};

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <tbody v-if="loading">
    <tr v-for="n in 5" :key="n">
      <td v-for="col in columns.length + 1" :key="col">
        <div class="shimmer"></div>
      </td>
    </tr>
  </tbody>
  <DatasetItem v-else tag="tbody" :ds="data" class="fs-sm">
    <template #default="{ row, rowIndex }">
      <tr>
        <th scope="row">{{ rowIndex + 1 }}</th>
        <td v-for="col in columns" :key="col.field">
          <slot :name="`cell(${col.field})`" :row="row">
            {{ row[col.field] }}
          </slot>
        </td>
      </tr>
    </template>
  </DatasetItem>
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
