// src/utils/alert.js
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Swal from "sweetalert2";

// Standardized options for iziToast
const defaultIziOptions = {
  position: "topRight",
  timeout: 5000,
};

// Utility object containing the library-specific implementations
const alertUtil = {
  // --- iziToast Implementations ---
  toast: {
    success: (options) =>
      iziToast.success({ ...defaultIziOptions, ...options }),
    error: (options) => iziToast.error({ ...defaultIziOptions, ...options }),
    warning: (options) =>
      iziToast.warning({ ...defaultIziOptions, ...options }),
  },

  // --- SweetAlert2 Implementations ---
  dialog: {
    fire: (options) => Swal.fire(options),
    confirm: (title, text) =>
      Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        customClass: {
          confirmButton: "btn btn-success m-1",
          cancelButton: "btn btn-danger m-1",
        },
        buttonsStyling: false,
      }),
  },

  // Example: If you add another plugin later, you just add it here:
  // otherPlugin: { ... }
};

export default alertUtil;
