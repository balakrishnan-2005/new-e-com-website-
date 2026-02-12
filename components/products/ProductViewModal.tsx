
import React from 'react';
import { X, ShoppingCart, Star, Clock, Scale, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white rounded-[40px] overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <X size={24} className="text-gray-900" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.bestseller && (
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
              Bestseller
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#E91E63] font-bold text-xs uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center text-sm font-bold text-gray-700">
              <Star size={16} className="text-yellow-400 fill-current mr-1" />
              {product.rating} <span className="text-gray-400 font-normal ml-1">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">{product.name}</h2>
          <div className="flex items-end space-x-3 mb-6">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-[#E91E63]">₹{product.discountPrice}</span>
                <span className="text-lg text-gray-400 line-through mb-1">₹{product.price}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
              <Scale size={20} className="text-[#E91E63]" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Weight</p>
                <p className="text-sm font-bold">{product.weight}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
              <Clock size={20} className="text-[#E91E63]" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Shelf Life</p>
                <p className="text-sm font-bold">{product.shelfLife}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{ing}</span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button 
              onClick={() => { addToCart(product); onClose(); }}
              className="flex-1 py-4 bg-[#E91E63] text-white rounded-2xl font-bold shadow-lg hover:bg-[#C2185B] transition-all flex items-center justify-center space-x-3"
            >
              <ShoppingCart size={20} />
              <span>Add to Shopping Bag</span>
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                isFav ? 'bg-[#E91E63] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
              }`}
            >
              <Heart size={24} className={isFav ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
