
import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[115]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart size={22} className="text-[#E91E63] fill-[#E91E63]" />
            <h2 className="text-xl font-bold">My Wishlist ({totalWishlistItems})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Heart size={40} className="text-gray-300" />
              </div>
              <p className="text-gray-500 mb-6">No favorites yet. Tap the heart icon on any sweet to save it here!</p>
              <button onClick={onClose} className="px-8 py-3 bg-[#E91E63] text-white rounded-xl font-bold hover:bg-[#C2185B]">
                Discover Delicacies
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex space-x-4 group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base text-gray-900 truncate pr-2">{item.name}</h3>
                    <button onClick={() => toggleWishlist(item)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{item.weight}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[#E91E63]">₹{item.discountPrice || item.price}</span>
                    <button 
                      onClick={() => { addToCart(item); toggleWishlist(item); }}
                      className="text-xs font-bold text-gray-900 hover:text-[#E91E63] flex items-center space-x-1"
                    >
                      <span>Move to Bag</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
