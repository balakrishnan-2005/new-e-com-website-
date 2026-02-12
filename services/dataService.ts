
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';
import { PRODUCTS, CATEGORIES } from '../constants';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data && data.length > 0) ? data : PRODUCTS;
  } catch (err) {
    console.error('Error fetching products:', err);
    return PRODUCTS;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) throw error;
    return (data && data.length > 0) ? data : CATEGORIES;
  } catch (err) {
    console.error('Error fetching categories:', err);
    return CATEGORIES;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Promise<Product | null> => {
  try {
    const newProduct = {
      ...product,
      rating: 5.0,
      reviewsCount: 0,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select();

    if (error) throw error;
    return data ? data[0] : null;
  } catch (err) {
    console.error('Error creating product:', err);
    // For demo purposes, we return the object as if it was created if Supabase is not configured
    return { ...product, id: Math.random().toString(), rating: 5, reviewsCount: 0 } as Product;
  }
};
