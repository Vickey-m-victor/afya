export const formatCurrency = (value) => {
    if (!value) return "0.00";
    
    // Converts 1250000 to "1,250,000.00"
    return new Intl.NumberFormat('en-KE', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };