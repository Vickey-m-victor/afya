<script setup>
import { computed } from "vue";

const props = defineProps({
  // 💡 FIX 1: Allow Strings or Numbers, and fixed 'totalPages' capitalization!
  currentPage: { type: [Number, String], required: true },
  totalPages: { type: [Number, String], required: true }, 
  perPage: { type: [Number, String], required: true },
  totalItems: { type: [Number, String], required: true },
  showInfo: { type: Boolean, default: true },
  type: { type: String, default: "numbers" },
  maxVisibleButtons: { type: Number, default: 5 },
});

const emit = defineEmits(["page-change"]);

// 💡 FIX 2: Safely convert all props to actual Numbers to prevent the "11" bug
const current = computed(() => Number(props.currentPage) || 1);
const total = computed(() => Number(props.totalPages) || 1);
const per = computed(() => Number(props.perPage) || 25);
const items = computed(() => Number(props.totalItems) || 0);

const startItem = computed(() => {
  if (items.value === 0) return 0;
  return (current.value - 1) * per.value + 1;
});

const endItem = computed(() => {
  return Math.min(current.value * per.value, items.value);
});

const toRoman = (num) => {
  const romanMap = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let str = "";
  for (let i of Object.keys(romanMap)) {
    let q = Math.floor(num / romanMap[i]);
    num -= q * romanMap[i];
    str += i.repeat(q);
  }
  return str.toLowerCase(); 
};

const visiblePages = computed(() => {
  let startPage = Math.max(1, current.value - Math.floor(props.maxVisibleButtons / 2));
  let endPage = startPage + props.maxVisibleButtons - 1;

  if (endPage > total.value) {
    endPage = total.value;
    startPage = Math.max(1, endPage - props.maxVisibleButtons + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push({
      number: i,
      text: props.type === "roman" ? toRoman(i) : i,
    });
  }
  return pages;
});

const changePage = (page) => {
  const targetPage = Number(page);
  // 💡 FIX 3: Safely evaluate against the clean Number variables
  if (targetPage >= 1 && targetPage <= total.value && targetPage !== current.value) {
    emit("page-change", targetPage);
  }
};
</script>

<template>
  <div class="d-flex flex-md-row flex-column justify-content-between align-items-center mt-3">
    
    <div v-if="showInfo" class="py-3 fs-sm text-muted">
      Showing <strong>{{ startItem }}</strong> to <strong>{{ endItem }}</strong> of <strong>{{ items }}</strong> entries
    </div>
    <div v-else></div> 
    
    <ul v-if="total > 0" class="pagination flex-wrap py-3 fs-sm mb-0">
      
      <li class="page-item" :class="{ disabled: current === 1 }">
        <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(current - 1)">
          Previous
        </a>
      </li>

      <li v-for="page in visiblePages" :key="page.number" class="page-item" :class="{ active: page.number === current }">
        <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(page.number)">
          {{ page.text }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: current === total }">
        <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(current + 1)">
          Next
        </a>
      </li>
      
    </ul>
  </div>
</template>