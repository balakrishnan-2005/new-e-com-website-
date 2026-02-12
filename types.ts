
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  weight: string;
  ingredients: string[];
  shelfLife: string;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}
