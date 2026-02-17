<script setup>

const props = defineProps(
    {
        
    }
);
const emit = defineEmits(
  [
    "save", "click", "close", "ok", "refresh"
  ]
);

const handleClick = ()  => {
    emit( "click")
}

</script>

<template>
    
    <div class="content">
    <BaseBlock title="Vue Dataset" content-full>
      <Dataset
        v-slot="{ ds }"
        :ds-data="users"
        :ds-sortby="sortBy"
        :ds-search-in="['name', 'email', 'company', 'birthdate']"
      >
        <div class="row" :data-page-count="ds.dsPagecount">
          <div id="datasetLength" class="col-md-8 py-2">
            <DatasetShow />
          </div>
          <div class="col-md-4 py-2">
            <DatasetSearch ds-search-placeholder="Search..." />
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th
                      v-for="(th, index) in cols"
                      :key="th.field"
                      :class="['sort', th.sort]"
                      @click="onSort($event, index)"
                    >
                      {{ th.name }} <i class="gg-select float-end"></i>
                    </th>
                  </tr>
                </thead>
                <DatasetItem tag="tbody" class="fs-sm">
                  <template #default="{ row, rowIndex }">
                    <tr>
                      <th scope="row">{{ rowIndex + 1 }}</th>
                      <td style="min-width: 150px">{{ row.name }}</td>
                      <td>{{ row.email }}</td>
                      <td style="min-width: 150px">{{ row.company }}</td>
                      <td style="min-width: 150px">{{ row.birthdate }}</td>
                    </tr>
                  </template>
                </DatasetItem>
              </table>
            </div>
          </div>
        </div>
        <div
          class="d-flex flex-md-row flex-column justify-content-between align-items-center"
        >
          <DatasetInfo class="py-3 fs-sm" />
          <DatasetPager class="flex-wrap py-3 fs-sm" />
        </div>
      </Dataset>
    </BaseBlock>
  </div>
</template>