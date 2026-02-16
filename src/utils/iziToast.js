// src/composables/useToast.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function useToast() {
  const success = (options) => {
    iziToast.success({
      position: 'topRight',
      timeout: 5000,
      ...options
    });
  };

  const error = (options) => {
    iziToast.error({
      position: 'topRight',
      timeout: 5000,
      ...options
    });
  };

  const warning = (options) => {
    iziToast.warning({
      position: 'topRight',
      timeout: 5000,
      ...options
    });
  };

  return { success, error, warning };
}