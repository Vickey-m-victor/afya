<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import { useOffcanvasStore } from '@/stores/offcanvas';

const offcanvasStore = useOffcanvasStore();
const panelRef = ref(null);

let bsInstance = null;
const handleHidden = () => {
  offcanvasStore.closeOffcanvas();
};

// Placement → Bootstrap offcanvas class
const placementClass = computed(() => {
  const map = {
    end:    'offcanvas-end',
    start:  'offcanvas-start',
    top:    'offcanvas-top',
    bottom: 'offcanvas-bottom',
  };
  return map[offcanvasStore.placement] || 'offcanvas-end';
});

// Width/height style only for left/right drawers
const panelStyle = computed(() => {
  const p = offcanvasStore.placement;
  if (p === 'end' || p === 'start') {
    return { width: offcanvasStore.width };
  }
  return {};
});

/**
 * Re-create the Bootstrap Offcanvas instance whenever relevant options change.
 * This is needed because Bootstrap bakes backdrop/scroll into the instance at
 * construction time and does not expose setters for them afterwards.
 */
function rebuildInstance() {
  if (!panelRef.value) return;

  panelRef.value.removeEventListener('hidden.bs.offcanvas', handleHidden);

  // Destroy existing instance cleanly
  if (bsInstance) {
    bsInstance.dispose();
    bsInstance = null;
  }

  const Offcanvas = window.bootstrap?.Offcanvas;
  if (!Offcanvas) return;

  bsInstance = new Offcanvas(panelRef.value, {
    backdrop: offcanvasStore.backdrop,   // true | false | 'static'
    scroll:   offcanvasStore.bodyScroll, // allow body to scroll while open
    keyboard: true,
  });

  // When Bootstrap closes the offcanvas (e.g. ESC, backdrop click), sync the store
  panelRef.value.addEventListener('hidden.bs.offcanvas', handleHidden);
}

// Watch isOpen: open or close via the Bootstrap API
watch(
  () => offcanvasStore.isOpen,
  (open) => {
    if (!bsInstance) rebuildInstance();
    if (open) {
      bsInstance?.show();
    } else {
      bsInstance?.hide();
    }
  }
);

// Watch option changes that require a new instance
watch(
  [() => offcanvasStore.backdrop, () => offcanvasStore.bodyScroll],
  () => {
    const wasOpen = offcanvasStore.isOpen;
    rebuildInstance();
    if (wasOpen) bsInstance?.show();
  }
);

onMounted(() => {
  rebuildInstance();
  if (offcanvasStore.isOpen) {
    nextTick(() => {
      bsInstance?.show();
    });
  }
});

onBeforeUnmount(() => {
  panelRef.value?.removeEventListener('hidden.bs.offcanvas', handleHidden);
  bsInstance?.dispose();
  bsInstance = null;
});
</script>

<template>
  <Teleport to="body">
    <!--
      The panel is ALWAYS in the DOM (no v-if).
      Bootstrap JS manages the show/hide by toggling its own CSS classes:
      .offcanvas.show  → visible
      .offcanvas       → hidden (translate off-screen)

      data-bs-* attributes are intentionally omitted so Bootstrap doesn't
      auto-init duplicate instances; we control everything through the JS API.
    -->
    <div
      ref="panelRef"
      :class="['offcanvas', placementClass, 'bg-body-extra-light']"
      :style="panelStyle"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-label="offcanvasStore.title || 'Offcanvas panel'"
    >
      <!-- Header -->
      <div class="offcanvas-header bg-body-light">
        <h5 class="offcanvas-title fw-semibold">
          {{ offcanvasStore.title }}
        </h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="offcanvasStore.closeOffcanvas()"
        />
      </div>

      <!-- Body — dynamic component slot -->
      <div class="offcanvas-body p-0">
        <component
          v-if="offcanvasStore.component"
          :is="offcanvasStore.component"
          v-bind="offcanvasStore.props"
        />
        <slot v-else />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
:global(.offcanvas) {
  z-index: 1080 !important;
}

:global(.offcanvas-backdrop) {
  z-index: 1075 !important;
}
</style>
