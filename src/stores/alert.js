import { defineStore } from 'pinia';
import { useAlert } from '@/composables/alerts';

export const useAlertStore = defineStore('alert', {
    state: () => ({
        alerts: [],
    }),

    actions: {
        /**
         * Show alert using the alertifyPayload format from API
         * @param {Object} alertifyPayload - Alert payload from API response
         * @param {string} alertifyPayload.type - Alert type (success, error, warning, info)
         * @param {string} alertifyPayload.title - Alert title
         * @param {string} alertifyPayload.message - Alert message
         */
        show(alertifyPayload) {
            const { toastSuccess, toastError, toastWarning, showAlert } = useAlert();

            if (!alertifyPayload || !alertifyPayload.type) {
                console.warn('Invalid alertifyPayload:', alertifyPayload);
                return;
            }

            const { type, title, message, options = {} } = alertifyPayload;

            // Store alert in history
            this.alerts.push({
                type,
                title,
                message,
                timestamp: new Date().toISOString(),
            });

            // Keep only last 50 alerts
            if (this.alerts.length > 50) {
                this.alerts.shift();
            }

            // Show alert based on type
            switch (type.toLowerCase()) {
                case 'success':
                    toastSuccess(title || 'Success', message || 'Operation completed successfully');
                    break;

                case 'error':
                    toastError(title || 'Error', message || 'An error occurred');
                    break;

                case 'warning':
                    toastWarning(title || 'Warning', message || 'Please note');
                    break;

                case 'info':
                    showAlert({
                        icon: 'info',
                        title: title || 'Information',
                        text: message,
                        ...options,
                    });
                    break;

                default:
                    console.warn('Unknown alert type:', type);
                    showAlert({
                        title: title || 'Notification',
                        text: message,
                        ...options,
                    });
            }
        },

        /**
         * Show a success alert
         */
        success(title, message) {
            this.show({ type: 'success', title, message });
        },

        /**
         * Show an error alert
         */
        error(title, message) {
            this.show({ type: 'error', title, message });
        },

        /**
         * Show a warning alert
         */
        warning(title, message) {
            this.show({ type: 'warning', title, message });
        },

        /**
         * Show an info alert
         */
        info(title, message) {
            this.show({ type: 'info', title, message });
        },

        /**
         * Clear alert history
         */
        clearHistory() {
            this.alerts = [];
        },
    },

    getters: {
        /**
         * Get recent alerts
         */
        recentAlerts: (state) => (limit = 10) => {
            return state.alerts.slice(-limit).reverse();
        },
    },
});
