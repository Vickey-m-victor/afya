<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "table", // table | card (future)
  },
  rows: {
    type: Number,
    default: 5,
  },
  columns: {
    type: Number,
    default: 4,
  },
});
</script>

<template>
  <!-- TABLE SHIMMER -->
  <div v-if="variant === 'table'" class="table-responsive">
    <table class="table table-striped mb-0">
      <thead>
        <tr>
          <th v-for="i in columns" :key="'head-' + i">
            <div class="shimmer shimmer-sm w-75"></div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in rows" :key="'row-' + n">
          <td v-for="c in columns" :key="'col-' + c">
            <div class="shimmer shimmer-md w-100"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.shimmer {
  position: relative;
  overflow: hidden;
  background: #e9ecef;
  border-radius: 6px;
}

/* shimmer animation */
.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  height: 100%;
  width: 150%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  100% {
    left: 150%;
  }
}

/* sizes */
.shimmer-sm {
  height: 14px;
}

.shimmer-md {
  height: 32px;
}
</style>