
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import CategoryHighlights from './components/home/CategoryHighlights';
import FeaturedProducts from './components/home/FeaturedProducts';
import CartDrawer from './components/cart/CartDrawer';
import SweetAssistant from './components/ai/SweetAssistant';
import { Star, ShieldCheck, Truck, UtensilsCrossed, Loader2 } from 'lucide-react';
import { getProducts, getCategories } from './services/dataService';
import { Product, Category } from './types';

// Scroll Management Component
const ScrollToSection = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionId = pathname.substring(1) || 'home';
    const element = document.getElementById(sectionId);
    
    if (element) {
      const offset = 80; // Height of the sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: pathname === '/' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
};

const HomePage = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodData);
      setCategories(catData);
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
      
      {/* Value Proposition / About Section */}
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
          <FeaturedProducts />
        </div>
      )}

      {/* Instagram-style Gallery */}
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

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <ScrollToSection />
            <Navbar 
              onOpenCart={() => setIsCartOpen(true)} 
              onProductAdded={handleProductAdded}
            />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage refreshTrigger={refreshTrigger} />} />
                <Route path="/shop" element={<HomePage refreshTrigger={refreshTrigger} />} />
                <Route path="/about" element={<HomePage refreshTrigger={refreshTrigger} />} />
                <Route path="/contact" element={<HomePage refreshTrigger={refreshTrigger} />} />
              </Routes>
            </div>
            <div id="contact">
              <Footer />
            </div>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <SweetAssistant />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
