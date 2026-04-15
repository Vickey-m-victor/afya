export function formatDate(value, locale = "en-US") {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString(locale);
}

export function formatCurrency(value, currency = "USD", locale = "en-US") {
  const amount = Number(value);
  if (Number.isNaN(amount)) return String(value ?? "");

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatBadge(value, map = {}) {
  const normalized = String(value ?? "").toLowerCase();
  return map[normalized] || "bg-secondary";
}

export function truncate(value, max = 40) {
  const text = String(value ?? "");
  if (text.length <= max) return text;
  return `${text.slice(0, max)}...`;
}
