
import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, X, PlusCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS, CATEGORIES } from '../../constants';
import { Product } from '../../types';

interface FeaturedProductsProps {
  products?: Product[];
  filterCategory?: string | null;
  onQuickView?: (product: Product) => void;
  onAddClick?: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products = PRODUCTS, 
  filterCategory, 
  onQuickView,
  onAddClick 
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const [, setSearchParams] = useSearchParams();

  const filteredProducts = useMemo(() => {
    if (!filterCategory) return products;
    return products.filter(p => p.category === filterCategory);
  }, [products, filterCategory]);

  const activeCategoryName = useMemo(() => {
    return CATEGORIES.find(c => c.id === filterCategory)?.name;
  }, [filterCategory]);

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-4">
              {filterCategory ? (
                <>Our <span className="text-[#E91E63]">{activeCategoryName}</span></>
              ) : (
                <>Trending <span className="text-[#E91E63]">Favorites</span></>
              )}
            </h2>
            <p className="text-gray-500 max-w-lg">
              {filterCategory 
                ? `Explore our hand-picked selection of ${activeCategoryName?.toLowerCase()} crafted for perfection.`
                : "Hand-picked selections of our most loved traditional and modern delicacies, made with love."
              }
            </p>
          </div>
          {!filterCategory && (
            <Link to="/shop" className="mt-6 md:mt-0 text-[#E91E63] font-bold flex items-center hover:underline group">
              Explore All Products
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button 
            onClick={clearFilter}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              !filterCategory 
                ? 'bg-[#E91E63] text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center space-x-2 ${
                filterCategory === cat.id 
                  ? 'bg-[#E91E63] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{cat.name}</span>
              {filterCategory === cat.id && <X size={14} className="ml-1" onClick={(e) => { e.stopPropagation(); clearFilter(); }} />}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-2">No delicacies found</h3>
            <p className="text-gray-500 mb-8">We haven't listed any items in this category yet.</p>
            <div className="flex space-x-4 justify-center">
              <button 
                onClick={clearFilter}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
              >
                View All Collection
              </button>
              <button 
                onClick={onAddClick}
                className="px-8 py-3 bg-[#E91E63] text-white rounded-xl font-bold hover:bg-[#C2185B] transition-all flex items-center space-x-2"
              >
                <PlusCircle size={18} />
                <span>List Your First Sweet</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id);
              return (
                <div key={product.id} className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-[#E91E63]/10 transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.bestseller && (
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          Bestseller
                        </span>
                      )}
                      {product.discountPrice && (
                        <span className="px-3 py-1 bg-[#E91E63] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          Sale
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                          isFav ? 'bg-[#E91E63] text-white' : 'bg-white/90 backdrop-blur-md text-gray-700 hover:bg-[#E91E63] hover:text-white'
                        }`}
                      >
                        <Heart size={18} className={isFav ? 'fill-current' : ''} />
                      </button>
                      <button 
                        onClick={() => onQuickView?.(product)}
                        className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white text-gray-700 transition-all shadow-lg"
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 right-4 lg:hidden">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 bg-[#E91E63] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#E91E63] px-2 py-0.5 bg-[#E91E63]/5 rounded">
                        {product.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E91E63] transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div>
                        {product.discountPrice ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                            <span className="text-xl font-bold text-[#E91E63]">₹{product.discountPrice}</span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="hidden lg:flex items-center space-x-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-[#E91E63] transition-colors text-sm font-bold active:scale-95 transform"
                      >
                        <ShoppingCart size={16} />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Special 'Add New Product' Card in Grid */}
            {user && (
              <button 
                onClick={onAddClick}
                className="group flex flex-col items-center justify-center bg-gray-50 rounded-[32px] border-4 border-dashed border-gray-200 hover:border-[#E91E63] hover:bg-[#E91E63]/5 transition-all duration-500 p-8 min-h-[400px]"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#E91E63] group-hover:text-white transition-all">
                  <PlusCircle size={40} className="text-[#E91E63] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">List New Sweet</h3>
                <p className="text-gray-500 text-center text-sm">
                  Add another artisanal creation to your online storefront.
                </p>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
