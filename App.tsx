
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import CategoryHighlights from './components/home/CategoryHighlights';
import FeaturedProducts from './components/home/FeaturedProducts';
import CartDrawer from './components/cart/CartDrawer';
import WishlistDrawer from './components/wishlist/WishlistDrawer';
import SweetAssistant from './components/ai/SweetAssistant';
import AddProductModal from './components/products/AddProductModal';
import ProductViewModal from './components/products/ProductViewModal';
// Added missing AuthModal import
import AuthModal from './components/auth/AuthModal';
import { Star, ShieldCheck, Truck, UtensilsCrossed, Loader2, Plus, Sparkles, ChefHat } from 'lucide-react';
import { getProducts, getCategories } from './services/dataService';
import { Product, Category } from './types';

// Scroll Management Component
const ScrollToSection = () => {
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollToTarget = () => {
      const category = searchParams.get('category');
      const targetSection = category ? 'shop' : (pathname.substring(1) || 'home');
      
      const element = document.getElementById(targetSection);
      
      if (element) {
        const offset = 80; // Height of the sticky navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: (pathname === '/' && !category) ? 0 : offsetPosition,
          behavior: 'smooth'
        });
      } else if (pathname === '/' && !category) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const timer = setTimeout(scrollToTarget, 100);
    return () => clearTimeout(timer);
  }, [pathname, search, searchParams]);

  return null;
};

const HomePage = ({ 
  refreshTrigger, 
  onQuickView, 
  onAddClick 
}: { 
  refreshTrigger: number, 
  onQuickView: (p: Product) => void,
  onAddClick: () => void 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const prodData = await getProducts();
      setProducts(prodData);
      setLoading(false);
    };
    loadData();
  }, [refreshTrigger]);

  return (
    <main className="pt-0 overflow-x-hidden">
      <div id="home">
        <Hero />
      </div>
      
      <CategoryHighlights />
      
      <section id="about" className="py-16 lg:py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-[#E91E63] font-bold tracking-widest uppercase text-xs">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mt-2">Why Choose <span className="text-[#E91E63]">SweetMoments</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: UtensilsCrossed, title: 'Authentic Taste', desc: 'Handcrafted using age-old family recipes passed down through generations.' },
              { icon: ShieldCheck, title: 'No Preservatives', desc: '100% natural ingredients. No artificial colors, flavors, or additives.' },
              { icon: Truck, title: 'Global Delivery', desc: 'Expertly packaged to ensure your treats arrive fresh, anywhere in the world.' },
              { icon: Star, title: 'Premium Quality', desc: 'Only the finest nuts, milk, and spices sourced from sustainable farms.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#E91E63]/5 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 text-[#E91E63] group-hover:bg-[#E91E63] group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-7 h-7 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-base lg:text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-xs lg:text-sm leading-relaxed max-w-[250px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-24 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#E91E63]" size={48} />
        </div>
      ) : (
        <div id="shop">
          <FeaturedProducts 
            products={products} 
            filterCategory={selectedCategory} 
            onQuickView={onQuickView}
            onAddClick={onAddClick}
          />
        </div>
      )}

      {/* NEW: Partnership Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <ChefHat className="absolute -top-10 -right-10 w-64 h-64 rotate-12" />
          <Sparkles className="absolute -bottom-10 -left-10 w-48 h-48" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#E91E63] rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <ChefHat size={32} />
            </div>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">Are you a Home Baker or Sweet Maker?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl">
              Join our exclusive community of artisans. List your homemade delicacies on SweetMoments and reach thousands of sweet lovers across the globe.
            </p>
            <button 
              onClick={onAddClick}
              className="px-10 py-4 bg-[#E91E63] text-white rounded-2xl font-bold hover:bg-[#C2185B] transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center space-x-3"
            >
              <Plus size={20} />
              <span>Become an Artisan Partner</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-2">Moments of Joy</h2>
            <p className="text-[#E91E63] font-accent text-lg lg:text-xl">Follow our story @sweetmoments</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[200, 201, 202, 203].map(id => (
              <div key={id} className="relative aspect-square rounded-2xl lg:rounded-[32px] overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={`https://picsum.photos/id/${id}/600/600`} 
                  alt="Gallery" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const OwnerActions = ({ onAddClick }: { onAddClick: () => void }) => {
  const { user } = useAuth();
  
  // Always show a floating "plus" but it behaves like the navbar button
  return (
    <button
      onClick={onAddClick}
      className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-[100] w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-black transition-all hover:scale-110 active:scale-95 group border-2 border-[#E91E63]/20"
      title="Add New Product"
    >
      <Plus size={24} />
      <span className="absolute right-full mr-4 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
        {user ? 'List New Sweet' : 'Login to List Sweet'}
      </span>
    </button>
  );
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // We use useAuth here too for global context
  // Note: Since AuthProvider is a child, we can't call useAuth here directly.
  // We'll handle modal logic inside the Router context or within HomePage/Navbar.
  // However, for consistency, let's ensure the App child component handles the shared states.

  const handleProductAdded = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <AppContent 
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              isWishlistOpen={isWishlistOpen}
              setIsWishlistOpen={setIsWishlistOpen}
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              isAuthModalOpen={isAuthModalOpen}
              setIsAuthModalOpen={setIsAuthModalOpen}
              quickViewProduct={quickViewProduct}
              setQuickViewProduct={setQuickViewProduct}
              refreshTrigger={refreshTrigger}
              handleProductAdded={handleProductAdded}
            />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
};

// Helper component to consume useAuth context
const AppContent = ({ 
  isCartOpen, setIsCartOpen,
  isWishlistOpen, setIsWishlistOpen,
  isAddModalOpen, setIsAddModalOpen,
  isAuthModalOpen, setIsAuthModalOpen,
  quickViewProduct, setQuickViewProduct,
  refreshTrigger, handleProductAdded
}: any) => {
  const { user } = useAuth();

  const handleAddClick = () => {
    if (user) {
      setIsAddModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToSection />
      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onProductAdded={handleProductAdded}
      />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage refreshTrigger={refreshTrigger} onQuickView={setQuickViewProduct} onAddClick={handleAddClick} />} />
          <Route path="/shop" element={<HomePage refreshTrigger={refreshTrigger} onQuickView={setQuickViewProduct} onAddClick={handleAddClick} />} />
          <Route path="/about" element={<HomePage refreshTrigger={refreshTrigger} onQuickView={setQuickViewProduct} onAddClick={handleAddClick} />} />
          <Route path="/contact" element={<HomePage refreshTrigger={refreshTrigger} onQuickView={setQuickViewProduct} onAddClick={handleAddClick} />} />
        </Routes>
      </div>
      <div id="contact">
        <Footer />
      </div>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <SweetAssistant />
      <OwnerActions onAddClick={handleAddClick} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={handleProductAdded} 
      />
      <ProductViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
};

export default App;
