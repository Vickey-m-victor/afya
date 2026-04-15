<script setup>
import { inject, computed } from 'vue';

const grid = inject('gridContext');

const currentPage = grid.currentPage;
const totalPages = grid.totalPages;
const totalCount = grid.totalCount;
const changePage = grid.changePage;

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
        
        <li v-for="page in paginationRange" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
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