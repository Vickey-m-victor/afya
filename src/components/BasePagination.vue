<script setup>
import { computed } from "vue";
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalpages: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  showItems: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "numbers",
  },
  maxVisibleButtons: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["page-change"]);

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (props.currentPage - 1) * props.perPage + 1;
});

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.totalItems);
});

const toRoman = (num) => {
  const romanMap = {
    M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let str = "";
  for (let i of Object.keys(romanMap)) {
    let q = Math.floor(num / romanMap[i]);
    num -= q * romanMap[i];
    str += i.repeat(q);
  }
  return str.toLowerCase(); // i, ii, iii
};

// Calculate which page buttons to show (centers around current page)
const visiblePages = computed(() => {
  let startPage = Math.max(1, props.currentPage - Math.floor(props.maxVisibleButtons / 2));
  let endPage = startPage + props.maxVisibleButtons - 1;

  if (endPage > props.totalPages) {
    endPage = props.totalPages;
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

// Emit event when a user clicks a page
const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-change", page);
  }
};
</script>

<template>
  <div class="d-flex flex-md-row flex-column justify-content-between align-items-center mt-3">
    
    <div v-if="showInfo" class="py-3 fs-sm text-muted">
      Showing <strong>{{ startItem }}</strong> to <strong>{{ endItem }}</strong> of <strong>{{ totalItems }}</strong> entries
    </div>
    <div v-else></div> <ul v-if="totalPages > 0" class="pagination flex-wrap py-3 fs-sm mb-0">
      
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a 
          class="page-link" 
          href="javascript:void(0)" 
          @click.prevent="changePage(currentPage - 1)"
        >
          Previous
        </a>
      </li>

      <li 
        v-for="page in visiblePages" 
        :key="page.number" 
        class="page-item" 
        :class="{ active: page.number === currentPage }"
      >
        <a 
          class="page-link" 
          href="javascript:void(0)" 
          @click.prevent="changePage(page.number)"
        >
          {{ page.text }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a 
          class="page-link" 
          href="javascript:void(0)" 
          @click.prevent="changePage(currentPage + 1)"
        >
          Next
        </a>
      </li>
      
    </ul>
  </div>
</template>