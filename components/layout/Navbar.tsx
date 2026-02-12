
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, LogOut, PlusCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import AddProductModal from '../products/AddProductModal';

const Navbar: React.FC<{ onOpenCart: () => void; onProductAdded?: () => void }> = ({ onOpenCart, onProductAdded }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4 lg:py-6'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button 
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="text-gray-800" size={24} />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center flex-1 lg:flex-none">
            <span className={`font-accent text-2xl sm:text-3xl lg:text-4xl leading-none text-[#E91E63]`}>SweetMoments</span>
            <span className="hidden sm:inline-block text-[8px] lg:text-[10px] tracking-widest uppercase font-semibold text-gray-500 mt-0.5">Artisanal Delicacies</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#E91E63] font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-[#E91E63] font-medium transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#E91E63] font-medium transition-colors">Our Story</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#E91E63] font-medium transition-colors">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {user && (
              <button 
                onClick={() => setIsAddProductOpen(true)}
                className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#E91E63]/10 text-[#E91E63] rounded-full text-xs font-bold hover:bg-[#E91E63] hover:text-white transition-all mr-2"
              >
                <PlusCircle size={16} />
                <span>List Sweet</span>
              </button>
            )}
            
            <button className="p-2 hover:bg-gray-100 rounded-full hidden md:block transition-colors">
              <Search size={20} className="text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart size={20} className="text-gray-700" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              onClick={onOpenCart}
              aria-label="View cart"
            >
              <ShoppingBag size={20} className="text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#E91E63] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Button/User Menu */}
            {user ? (
              <div className="group relative">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#E91E63] text-white flex items-center justify-center text-xs font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => setIsAddProductOpen(true)}
                    className="md:hidden w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <PlusCircle size={16} /> <span>List Sweet</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <User size={16} /> <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut size={16} /> <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Login"
              >
                <User size={20} className="text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="absolute top-0 left-0 bottom-0 w-[280px] bg-white p-6 shadow-2xl flex flex-col animate-slide-in-left"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-accent text-2xl text-[#E91E63]">SweetMoments</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-2 text-lg font-medium">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-gray-50 hover:text-[#E91E63] transition-colors">Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-gray-50 hover:text-[#E91E63] transition-colors">Shop All</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-gray-50 hover:text-[#E91E63] transition-colors">Our Story</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-gray-50 hover:text-[#E91E63] transition-colors">Contact Us</Link>
              </nav>
              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col space-y-4">
                {user ? (
                  <>
                    <button 
                      onClick={() => { setIsAddProductOpen(true); setIsMobileMenuOpen(false); }}
                      className="flex items-center space-x-3 text-[#E91E63]"
                    >
                      <PlusCircle size={20} />
                      <span>List Your Sweet</span>
                    </button>
                    <button onClick={() => signOut()} className="flex items-center space-x-3 text-red-600">
                      <LogOut size={20} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center space-x-3 text-gray-700">
                    <User size={20} />
                    <span>Login / Register</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <AddProductModal 
        isOpen={isAddProductOpen} 
        onClose={() => setIsAddProductOpen(false)} 
        onSuccess={() => onProductAdded?.()} 
      />
    </>
  );
};

export default Navbar;
