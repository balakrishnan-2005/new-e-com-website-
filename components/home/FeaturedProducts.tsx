
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../constants';

const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-heading font-bold mb-4">Trending <span className="text-[#E91E63]">Favorites</span></h2>
            <p className="text-gray-500 max-w-lg">Hand-picked selections of our most loved traditional and modern delicacies, made with love.</p>
          </div>
          <Link to="/shop" className="mt-6 md:mt-0 text-[#E91E63] font-bold flex items-center hover:underline group">
            Explore All Products
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 6).map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-[#E91E63]/10 transition-all duration-500">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badges */}
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

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#E91E63] hover:text-white text-gray-700 transition-all shadow-lg">
                    <Heart size={18} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#E91E63] hover:text-white text-gray-700 transition-all shadow-lg">
                    <Eye size={18} />
                  </button>
                </div>

                {/* Mobile Add Button */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
