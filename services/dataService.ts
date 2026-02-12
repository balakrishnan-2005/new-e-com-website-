
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import { PRODUCTS, CATEGORIES } from '../constants';

// In-memory store for products added during the current session
let localAddedProducts: Product[] = [];

/**
 * Fetches all products. Maps database snake_case to frontend camelCase.
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    let dbProducts: Product[] = [];
    if (data && data.length > 0) {
      dbProducts = data.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        price: p.price,
        discountPrice: p.discount_price, // Map from snake_case
        image: p.image,
        weight: p.weight,
        ingredients: Array.isArray(p.ingredients) ? p.ingredients : [],
        shelfLife: p.shelf_life, // Map from snake_case
        inStock: p.in_stock, // Map from snake_case
        featured: p.featured,
        bestseller: p.bestseller,
        rating: p.rating,
        reviewsCount: p.reviews_count // Map from snake_case
      }));
    } else {
      dbProducts = PRODUCTS;
    }
    
    // Combine with local session additions
    const combined = [...localAddedProducts, ...dbProducts];
    const uniqueMap = new Map();
    combined.forEach(p => {
      const key = p.id || p.name;
      if (!uniqueMap.has(key)) uniqueMap.set(key, p);
    });
    
    return Array.from(uniqueMap.values());
  } catch (err) {
    console.error('Fetch error, using fallback:', err);
    return [...localAddedProducts, ...PRODUCTS];
  }
};

/**
 * Fetches all categories.
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) return CATEGORIES;
    return (data && data.length > 0) ? data : CATEGORIES;
  } catch (err) {
    return CATEGORIES;
  }
};

/**
 * Creates a new product. Maps frontend camelCase to database snake_case.
 */
export const createProduct = async (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Promise<Product | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Prepare the payload using the exact snake_case column names from the SQL script
    const dbPayload = {
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      category: productData.category,
      price: productData.price,
      discount_price: productData.discountPrice || null, // Map to snake_case
      image: productData.image,
      weight: productData.weight,
      ingredients: productData.ingredients,
      shelf_life: productData.shelfLife, // Map to snake_case
      in_stock: productData.inStock, // Map to snake_case
      rating: 4.8,
      reviews_count: 0, // Map to snake_case
      user_id: user?.id || 'demo-artisan'
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbPayload])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error.message);
      throw error;
    }
    
    // Map the saved record back to camelCase for the frontend
    const saved = data[0];
    const mappedResult: Product = {
      ...productData,
      id: saved.id,
      discountPrice: saved.discount_price,
      shelfLife: saved.shelf_life,
      inStock: saved.in_stock,
      rating: saved.rating,
      reviewsCount: saved.reviews_count
    };

    console.log('Successfully saved to Supabase:', mappedResult);
    return mappedResult;

  } catch (err: any) {
    console.warn('Falling back to local session store:', err.message);
    
    const mockProduct: Product = {
      ...productData,
      id: `local-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0
    };
    
    localAddedProducts.unshift(mockProduct);
    return mockProduct;
  }
};
