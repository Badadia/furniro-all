export function formatPrice(value: number): string {
  return `Rs. ${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function calculateDiscount(price: number, discount: number): number {
  return price * (1 - discount / 100);
}