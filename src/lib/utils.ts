export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function calculateDiscount(current: number, original: number): number {
  return Math.round(((original - current) / original) * 100);
}

export function calculateWorthyScore(price: number, deliveryDays: number): number {
  // Lower price + faster delivery = higher score. Score out of 100.
  const priceScore = Math.max(0, 100 - price / 100);
  const deliveryScore = Math.max(0, 40 - deliveryDays * 4);
  return Math.round((priceScore * 0.6 + deliveryScore * 0.4));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
