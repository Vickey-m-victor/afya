<script setup>
import { inject, computed } from 'vue';

// 1. Define UI-specific props
const props = defineProps({
  format: {
    type: String,
    default: 'numeric',
    validator: (value) => ['numeric', 'roman'].includes(value)
  },
  // Add the dropdown options
  perPageOptions: {
    type: Array,
    default: () => [10, 20, 25, 50, 100]
  }
});

// We need to emit an event when the user changes the "Per page" dropdown
const emit = defineEmits(['change-per-page']);

// 2. Inject the core state from the Provider
const grid = inject('gridContext');

const currentPage = grid.currentPage;
const totalPages = grid.totalPages;
const totalCount = grid.totalCount;
const perPage = grid.perPage; // We inject perPage to use in our math
const changePage = grid.changePage;

// --- New Math for "Showing 1 to 7 of 7 entries" ---
const firstItem = computed(() => {
  if (totalCount.value === 0) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});

const lastItem = computed(() => {
  return Math.min(currentPage.value * perPage.value, totalCount.value);
});

function onPerPageChange(event) {
  emit('change-per-page', Number(event.target.value));
}
// --------------------------------------------------

// 3. Calculate the range of pages to show
const pages = computed(() => {
  const range = [];
  const delta = 2;
  const left = currentPage.value - delta;
  const right = currentPage.value + delta + 1;

  for (let i = 1; i <= totalPages.value; i += 1) {
    if (i === 1 || i === totalPages.value || (i >= left && i < right)) {
      range.push(i);
    }
  }

  return range;
});

// 4. Helper function for Roman Numerals
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

const displayPage = (pageNumber) => {
  return props.format === 'roman' ? toRoman(pageNumber) : pageNumber;
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center w-100">
    
    <div class="d-flex align-items-center gap-3">
      <div class="d-flex align-items-center">
        <label class="me-2 mb-0 text-muted fs-sm">Per page:</label>
        <select
          class="form-select form-select-sm"
          style="width: 75px"
          :value="perPage"
          @change="onPerPageChange"
        >
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      
      <span v-if="totalCount > 0" class="text-muted fs-sm">
        Showing <strong>{{ firstItem }}</strong> to <strong>{{ lastItem }}</strong> of <strong>{{ totalCount }}</strong> entries
      </span>
      <span v-else class="text-muted fs-sm">Total: <strong>0</strong></span>
    </div>
    
    <nav aria-label="Page navigation" v-if="totalPages > 1">
      <ul class="pagination pagination-sm justify-content-end mb-0">
        
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(1)" title="First">
            <i class="fa fa-angle-double-left"></i>
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" title="Previous">
            <i class="fa fa-angle-left"></i>
          </a>
        </li>

        <li
          class="page-item"
          v-for="page in pages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ displayPage(page) }}
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)" title="Next">
            <i class="fa fa-angle-right"></i>
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(totalPages)" title="Last">
            <i class="fa fa-angle-double-right"></i>
          </a>
        </li>

      </ul>
    </nav>
  </div>
</template>