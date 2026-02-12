
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <User size={20} className="text-gray-700" />
          </button>
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
              <Link to="/login" className="flex items-center space-x-3 text-gray-700">
                <User size={20} />
                <span>My Account</span>
              </Link>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">f</div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">i</div>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">t</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
