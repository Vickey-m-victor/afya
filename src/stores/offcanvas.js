import { defineStore } from 'pinia';
import { ref, markRaw } from 'vue';

/**
 * Global Offcanvas Store
 * Mirrors the GlobalModal pattern: any component can call
 * useOffcanvasStore().openOffcanvas({ component, props, title, placement, width })
 * and the single GlobalOffcanvas mounted in App.vue will render it.
 */
export const useOffcanvasStore = defineStore('offcanvas', () => {
  const isOpen      = ref(false);
  const component   = ref(null);
  const props       = ref({});
  const title       = ref('');
  const placement   = ref('end');   // 'start' | 'end' | 'top' | 'bottom'
  const width       = ref('400px'); // used for start/end placements
  const bodyScroll  = ref(true);    // allow body to scroll while open
  const backdrop    = ref(true);    // show backdrop

  function openOffcanvas(options = {}) {
    const {
      component: c    = null,
      props: p        = {},
      title: t        = '',
      placement: pl   = 'end',
      width: w        = '400px',
      bodyScroll: bs  = true,
      backdrop: bd    = true,
    } = options;

    component.value  = c ? markRaw(c) : null;
    props.value      = p;
    title.value      = t;
    placement.value  = pl;
    width.value      = w;
    bodyScroll.value = bs;
    backdrop.value   = bd;
    isOpen.value     = true;
  }

  function closeOffcanvas() {
    isOpen.value    = false;
    component.value = null;
    props.value     = {};
    title.value     = '';
    placement.value = 'end';
    width.value     = '400px';
    bodyScroll.value = true;
    backdrop.value   = true;
  }

  return {
    isOpen,
    component,
    props,
    title,
    placement,
    width,
    bodyScroll,
    backdrop,
    openOffcanvas,
    closeOffcanvas,
  };
});
