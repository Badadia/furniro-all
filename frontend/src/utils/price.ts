export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("$", "Rs. ");
}

export function calculateDiscount(price: number, discount: number): number {
  return price * (1 - discount / 100);
}
