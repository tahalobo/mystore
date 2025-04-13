
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  discount?: number;
  stock: number;
  rating: number;
  reviews: number;
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  count?: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}
