import { computed, ref } from "vue";

export function useDataTable(options = {}) {
  const {
    initialPage = 1,
    initialPerPage = 20,
    perPageOptions = [10, 20, 50, 100],
    initialSortBy = null,
    initialSortDir = "asc",
    searchDebounceMs = 300,
  } = options;

  const searchQuery = ref("");
  const currentPage = ref(initialPage);
  const perPage = ref(initialPerPage);
  const sortBy = ref(initialSortBy);
  const sortDir = ref(initialSortDir);
  let searchTimer = null;

  const normalizedPerPageOptions = computed(() =>
    perPageOptions.filter((value) => Number(value) > 0)
  );

  function setSearch(query) {
    searchQuery.value = query ?? "";
    currentPage.value = 1;
  }

  function setPage(page) {
    const numericPage = Number(page);
    currentPage.value = numericPage > 0 ? numericPage : 1;
  }

  function setPerPage(value) {
    const numericPerPage = Number(value);
    perPage.value = numericPerPage > 0 ? numericPerPage : initialPerPage;
    currentPage.value = 1;
  }

  function setSort(field) {
    if (!field) return;

    if (sortBy.value === field) {
      sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
    } else {
      sortBy.value = field;
      sortDir.value = "asc";
    }

    currentPage.value = 1;
  }

  function setSearchDebounced(query, callback) {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    searchTimer = setTimeout(async () => {
      setSearch(query);
      if (typeof callback === "function") {
        await callback();
      }
    }, searchDebounceMs);
  }

  return {
    searchQuery,
    currentPage,
    perPage,
    sortBy,
    sortDir,
    perPageOptions: normalizedPerPageOptions,
    setSearch,
    setSearchDebounced,
    setPage,
    setPerPage,
    setSort,
  };
}
