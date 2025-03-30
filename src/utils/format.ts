export const formatCurrency = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '₹0.00';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(value);
};

export const formatPercentage = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0.00%';
  }

  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}; 