export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatDate = (date:Date)=>{
  return new Intl.DateTimeFormat('en-Us', {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(date)
}