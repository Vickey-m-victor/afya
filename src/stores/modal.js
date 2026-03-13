import { defineStore } from 'pinia';
import { ref, markRaw } from 'vue';

let modalIdCounter = 0;

export const useModalStore = defineStore('modal', () => {
  // State
  const isOpen = ref(false);
  const component = ref(null);
  const props = ref({});
  const title = ref('');
  const modalSize = ref('md');
  const position = ref('center');
  const showFooter = ref(false);
  const centered = ref(true);
  const scrollable = ref(false);
  const fullscreen = ref(false);
  const closeOnBackdrop = ref(true);
  const closeOnEsc = ref(true);
  const bodyClass = ref('');

  const confirmText = ref('Save');
  const cancelText = ref('Cancel');
  const showConfirm = ref(true);
  const showCancel = ref(true);
  const onConfirm = ref(null);
  const onCancel = ref(null);
  const isSubmitting = ref(false);
  const disableCloseWhileSubmitting = ref(true);
  const closeOnConfirm = ref(true);
  const closeOnCancel = ref(true);
  const initialFocus = ref('first');
  const restoreFocus = ref(true);
  const titleId = ref('');
  const bodyId = ref('');

  // Toggle between modal/page mode for CRUD operations
  const useModal = ref(true);

  /**
   * Open modal with a structured options object
   * @param {Object} options
   */
  function openModal(options = {}) {
    const {
      component: modalComponent = null,
      props: modalProps = {},
      title: modalTitle = 'Modal',
      size = 'md',
      position: positionOption,
      footer = false,
      showFooter: showFooterOption,
      centered: centeredOption = true,
      scrollable: scrollableOption = false,
      fullscreen: fullscreenOption = false,
      closeOnBackdrop: closeOnBackdropOption = true,
      closeOnEsc: closeOnEscOption = true,
      bodyClass: bodyClassOption = '',
      onConfirm: onConfirmOption = null,
      onCancel: onCancelOption = null,
      confirmText: confirmTextOption = 'Save',
      cancelText: cancelTextOption = 'Cancel',
      showConfirm: showConfirmOption = true,
      showCancel: showCancelOption = true,
      disableCloseWhileSubmitting: disableCloseWhileSubmittingOption = true,
      closeOnConfirm: closeOnConfirmOption = true,
      closeOnCancel: closeOnCancelOption = true,
      initialFocus: initialFocusOption = 'first',
      restoreFocus: restoreFocusOption = true,
    } = options;

    component.value = modalComponent ? markRaw(modalComponent) : null;
    props.value = modalProps;
    title.value = modalTitle;
    isOpen.value = true;
    showFooter.value = showFooterOption ?? footer ?? false;

    const allowedSizes = ['sm', 'md', 'lg', 'xl'];
    modalSize.value = allowedSizes.includes(size) ? size : 'md';

    const normalizedPosition = ['center', 'top'].includes(positionOption)
      ? positionOption
      : (centeredOption ? 'center' : 'top');

    position.value = normalizedPosition;
    centered.value = normalizedPosition === 'center';
    scrollable.value = scrollableOption;
    fullscreen.value = fullscreenOption;
    closeOnBackdrop.value = closeOnBackdropOption;
    closeOnEsc.value = closeOnEscOption;
    bodyClass.value = bodyClassOption;

    confirmText.value = confirmTextOption;
    cancelText.value = cancelTextOption;
    showConfirm.value = showConfirmOption;
    showCancel.value = showCancelOption;
    onConfirm.value = onConfirmOption;
    onCancel.value = onCancelOption;
    isSubmitting.value = false;
    disableCloseWhileSubmitting.value = disableCloseWhileSubmittingOption;
    closeOnConfirm.value = closeOnConfirmOption;
    closeOnCancel.value = closeOnCancelOption;
    initialFocus.value = initialFocusOption;
    restoreFocus.value = restoreFocusOption;

    modalIdCounter += 1;
    titleId.value = `global-modal-title-${modalIdCounter}`;
    bodyId.value = `global-modal-body-${modalIdCounter}`;
  }

  /**
   * Close modal and reset state
   */
  function closeModal(force = false) {
    if (!force && isSubmitting.value && disableCloseWhileSubmitting.value) {
      return;
    }

    isOpen.value = false;
    component.value = null;
    props.value = {};
    title.value = '';
    showFooter.value = false;
    position.value = 'center';
    centered.value = true;
    bodyClass.value = '';
    confirmText.value = 'Save';
    cancelText.value = 'Cancel';
    showConfirm.value = true;
    showCancel.value = true;
    onConfirm.value = null;
    onCancel.value = null;
    isSubmitting.value = false;
    closeOnConfirm.value = true;
    closeOnCancel.value = true;
    titleId.value = '';
    bodyId.value = '';
  }

  function setSubmitting(value) {
    isSubmitting.value = value;
  }

  /**
   * Toggle between modal and page mode for CRUD operations
   * @param {Boolean} value - true for modal mode, false for page mode
   */
  function toggleModalUsage(value) {
    useModal.value = value;
  }

  return {
    // State
    isOpen,
    component,
    props,
    title,
    modalSize,
    position,
    showFooter,
    centered,
    scrollable,
    fullscreen,
    closeOnBackdrop,
    closeOnEsc,
    bodyClass,
    confirmText,
    cancelText,
    showConfirm,
    showCancel,
    onConfirm,
    onCancel,
    isSubmitting,
    disableCloseWhileSubmitting,
    closeOnConfirm,
    closeOnCancel,
    initialFocus,
    restoreFocus,
    titleId,
    bodyId,
    useModal,

    // Actions
    openModal,
    closeModal,
    toggleModalUsage,
    setSubmitting,
  };
});
