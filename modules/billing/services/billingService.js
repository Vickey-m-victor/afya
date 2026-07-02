import { useBillingApi } from "./billingApi";

export function useBillingService() {
  /**
   * Get the list of patients currently waiting at the billing station.
   * These are patients whose encounter status = STATUS_BILLING (60)
   */
  async function getBillingQueue({ facility_id } = {}) {
    const { data, request, isLoading, error } = useBillingApi("queue", {
      method: "GET",
    });
    await request(null, { facility_id });
    return { data, isLoading, error };
  }

  /**
   * Get a draft invoice for a specific encounter.
   * Returns line items: consultation fee, medications, lab orders, etc.
   */
  async function getInvoice(encounterId) {
    const { data, request, isLoading, error } = useBillingApi(
      `invoice/${encounterId}`,
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  /**
   * Process a payment for an invoice.
   * @param {number} invoiceId
   * @param {object} payload - { payment_method, amount_paid, reference }
   */
  async function processPayment(invoiceId, payload) {
    const { data, request, isLoading, error } = useBillingApi(
      `invoice/${invoiceId}/pay`,
      { method: "POST" }
    );
    await request(payload);
    return { data, isLoading, error };
  }

  /**
   * Waive or discount an invoice item.
   */
  async function applyDiscount(invoiceId, payload) {
    const { data, request, isLoading, error } = useBillingApi(
      `invoice/${invoiceId}/discount`,
      { method: "POST" }
    );
    await request(payload);
    return { data, isLoading, error };
  }

  /**
   * Get a receipt for a paid invoice.
   */
  async function getReceipt(invoiceId) {
    const { data, request, isLoading, error } = useBillingApi(
      `receipt/${invoiceId}`,
      { method: "GET" }
    );
    await request();
    return { data, isLoading, error };
  }

  /**
   * Get revenue summary / daily report.
   */
  async function getDailySummary({ facility_id, date } = {}) {
    const { data, request, isLoading, error } = useBillingApi("summary/daily", {
      method: "GET",
    });
    await request(null, { facility_id, date });
    return { data, isLoading, error };
  }

  return {
    getBillingQueue,
    getInvoice,
    processPayment,
    applyDiscount,
    getReceipt,
    getDailySummary,
  };
}
