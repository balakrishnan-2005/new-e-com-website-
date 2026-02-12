
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'traditional', name: 'Traditional Sweets', image: 'https://picsum.photos/id/102/400/300', count: 12 },
  { id: 'cakes', name: 'Artisan Cakes', image: 'https://picsum.photos/id/106/400/300', count: 8 },
  { id: 'cookies', name: 'Homemade Cookies', image: 'https://picsum.photos/id/103/400/300', count: 15 },
  { id: 'chocolates', name: 'Premium Chocolates', image: 'https://picsum.photos/id/104/400/300', count: 10 },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Kaju Katli',
    slug: 'classic-kaju-katli',
    description: 'Silky smooth cashew fudge made with premium cashews and minimal sugar.',
    category: 'traditional',
    price: 450,
    discountPrice: 399,
    image: 'https://picsum.photos/id/488/600/600',
    weight: '500g',
    ingredients: ['Cashews', 'Sugar', 'Ghee'],
    shelfLife: '15 days',
    inStock: true,
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: '2',
    name: 'Triple Chocolate Brownies',
    slug: 'triple-chocolate-brownies',
    description: 'Fudgy, rich brownies loaded with three types of Belgian chocolate.',
    category: 'cakes',
    price: 550,
    image: 'https://picsum.photos/id/493/600/600',
    weight: '6 pieces',
    ingredients: ['Belgian Chocolate', 'Flour', 'Butter', 'Eggs'],
    shelfLife: '5 days',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 89
  },
  {
    id: '3',
    name: 'Pista Gulab Jamun',
    slug: 'pista-gulab-jamun',
    description: 'Soft milk solids dumplings soaked in rose-flavored syrup, garnished with pistachios.',
    category: 'traditional',
    price: 320,
    image: 'https://picsum.photos/id/500/600/600',
    weight: '500g',
    ingredients: ['Milk Solids', 'Sugar', 'Cardamom', 'Rose Water'],
    shelfLife: '7 days',
    inStock: true,
    bestseller: true,
    rating: 4.7,
    reviewsCount: 210
  },
  {
    id: '4',
    name: 'Sea Salt Caramel Cookies',
    slug: 'sea-salt-caramel-cookies',
    description: 'Buttery cookies with a gooey caramel center and a pinch of Himalayan sea salt.',
    category: 'cookies',
    price: 280,
    image: 'https://picsum.photos/id/504/600/600',
    weight: '250g',
    ingredients: ['Butter', 'Flour', 'Caramel', 'Sea Salt'],
    shelfLife: '10 days',
    inStock: true,
    rating: 4.6,
    reviewsCount: 45
  },
  {
    id: '5',
    name: 'Motichoor Laddu',
    slug: 'motichoor-laddu',
    description: 'Melt-in-the-mouth gram flour pearls fried in desi ghee and flavored with saffron.',
    category: 'traditional',
    price: 400,
    image: 'https://picsum.photos/id/505/600/600',
    weight: '500g',
    ingredients: ['Gram Flour', 'Sugar', 'Ghee', 'Saffron'],
    shelfLife: '10 days',
    inStock: true,
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: '6',
    name: 'Dark Chocolate Truffles',
    slug: 'dark-chocolate-truffles',
    description: 'Hand-rolled truffles made with 70% dark cocoa and cream ganache.',
    category: 'chocolates',
    price: 650,
    image: 'https://picsum.photos/id/506/600/600',
    weight: '200g',
    ingredients: ['Cocoa Mass', 'Heavy Cream', 'Vanilla'],
    shelfLife: '20 days',
    inStock: true,
    rating: 4.9,
    reviewsCount: 78
  }
];
