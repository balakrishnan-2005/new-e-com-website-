
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, LogOut, PlusCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import AddProductModal from '../products/AddProductModal';

const Navbar: React.FC<{ 
  onOpenCart: () => void; 
  onOpenWishlist: () => void;
  onProductAdded?: () => void 
}> = ({ onOpenCart, onOpenWishlist, onProductAdded }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (path: string) => {
    setIsMobileMenuOpen(false);
  };

  const handleAddProductClick = () => {
    if (user) {
      setIsAddProductOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const NavLink = ({ to, children, className = "" }: { to: string, children?: React.ReactNode, className?: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={() => handleMobileNav(to)}
        className={`${className} ${isActive ? 'text-[#E91E63]' : 'text-gray-700'} hover:text-[#E91E63] font-medium transition-colors relative group`}
      >
        {children}
        {isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E91E63] rounded-full"></span>}
      </Link>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
          <Link to="/" onClick={() => handleMobileNav('/')} className="flex flex-col items-center flex-1 lg:flex-none">
            <span className={`font-accent text-2xl sm:text-3xl lg:text-4xl leading-none text-[#E91E63]`}>SweetMoments</span>
            <span className="hidden sm:inline-block text-[8px] lg:text-[10px] tracking-widest uppercase font-semibold text-gray-500 mt-0.5">Artisanal Delicacies</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/about">Our Story</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Prominent List Sweet Button */}
            <button 
              onClick={handleAddProductClick}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[#E91E63] text-white rounded-full text-[10px] sm:text-xs font-bold hover:bg-[#C2185B] transition-all mr-1 sm:mr-2 shadow-md active:scale-95"
            >
              <PlusCircle size={16} />
              <span className="hidden xs:inline">List Sweet</span>
              <span className="xs:hidden">List</span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full hidden md:block transition-colors">
              <Search size={20} className="text-gray-700" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              onClick={onOpenWishlist}
            >
              <Heart size={20} className="text-gray-700" />
              {totalWishlistItems > 0 && (
                <span className="absolute top-1 right-1 bg-gray-900 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm">
                  {totalWishlistItems}
                </span>
              )}
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

            {user ? (
              <div className="group relative">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#E91E63] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Account</p>
                    <p className="text-xs text-gray-700 truncate font-medium mt-1">{user.email}</p>
                  </div>
                  <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
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
              <nav className="flex flex-col space-y-1 text-lg font-medium">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop All</NavLink>
                <NavLink to="/about">Our Story</NavLink>
                <NavLink to="/contact">Contact Us</NavLink>
                <button 
                  onClick={handleAddProductClick}
                  className="flex items-center space-x-2 text-[#E91E63] font-bold pt-4 mt-4 border-t border-gray-100"
                >
                  <PlusCircle size={20} />
                  <span>List Your Sweet</span>
                </button>
              </nav>
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
