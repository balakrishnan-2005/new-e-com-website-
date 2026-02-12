
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={22} className="text-[#E91E63]" />
            <h2 className="text-lg sm:text-xl font-bold">Shopping Bag ({totalItems})</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">Your bag is empty. Let's fill it with some sweetness!</p>
              <button 
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-[#E91E63] text-white rounded-xl font-bold hover:bg-[#C2185B] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex space-x-4 group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#E91E63] transition-colors truncate pr-2">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{item.weight}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-gray-500 shadow-sm"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors text-gray-500 shadow-sm"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-bold text-sm sm:text-base text-[#E91E63]">₹{(item.discountPrice || item.price) * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
            <div className="space-y-2 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-gray-200 flex justify-between">
                <span className="text-base sm:text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-base sm:text-lg font-bold text-[#E91E63]">₹{totalPrice}</span>
              </div>
            </div>
            <button className="w-full py-3.5 sm:py-4 bg-[#E91E63] text-white rounded-xl sm:rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-[#C2185B] active:scale-[0.98] transition-all group">
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
