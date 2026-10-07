export type StoreName = 'Amazon' | 'Flipkart' | 'Myntra' | 'Ajio' | 'Croma';

export interface Product {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  storeName: StoreName;
  originalStoreUrl: string;
  discountPercentage: number;
  category: string;
  deliveryDays: number;
  rating: number;
}

export interface ComparisonResult {
  storeName: StoreName;
  price: number;
  originalPrice: number;
  deliveryDays: number;
  inStock: boolean;
  url: string;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
