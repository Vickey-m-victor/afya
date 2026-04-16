<!-- page navigation, range, ruman or decinal numbers -->
<script setup>
import { inject, computed } from 'vue';

// 1. Define UI-specific props
const props = defineProps({
  format: {
    type: String,
    default: 'numeric', // Accepts 'numeric' or 'roman'
    validator: (value) => ['numeric', 'roman'].includes(value)
  }
});

// 2. Inject the core state from the Provider
const grid = inject('gridContext');

const currentPage = grid.currentPage;
const totalPages = grid.totalPages;
const totalCount = grid.totalCount;
const changePage = grid.changePage;

// 3. Calculate the range of pages to show
const paginationRange = computed(() => {
  const range = [];
  const delta = 2;
  const left = currentPage.value - delta;
  const right = currentPage.value + delta + 1;

  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= left && i < right)) {
      range.push(i);
    }
  }
  return range;
});

// 4. Helper function to convert integers to Roman Numerals
const toRoman = (num) => {
  const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = '';
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
};

// 5. Formatting function for the template
const displayPage = (pageNumber) => {
  return props.format === 'roman' ? toRoman(pageNumber) : pageNumber;
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center w-100">
    <span class="text-muted fs-sm">Total: <strong>{{ totalCount }}</strong></span>
    
    <nav aria-label="Page navigation" v-if="totalPages > 1">
      <ul class="pagination pagination-sm mb-0">
        
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
            <i class="fa fa-angle-left"></i>
          </a>
        </li>
        
        <li 
          v-for="page in paginationRange" 
          :key="page" 
          class="page-item" 
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ displayPage(page) }}
          </a>
        </li>
        
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
            <i class="fa fa-angle-right"></i>
          </a>
        </li>
        
      </ul>
    </nav>
  </div>
</template>