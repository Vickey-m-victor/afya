<script setup>

</script>

<template>
      <Dataset v-slot="{ ds }" :ds-data="data" :ds-search-in="searchFields">
      <div class="d-flex justify-content-end me-3">
        <slot name="header-actions"></slot>
      </div>
      <div
        class="d-flex justify-content-between"
        :data-page-count="ds.dsPagecount"
      >
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
</template>