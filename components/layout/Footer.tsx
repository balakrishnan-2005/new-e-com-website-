
import React from 'react';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 lg:pt-20 pb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-[#E91E63]/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:mb-20 mb-12">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-heading mb-4 lg:mb-6">Join the <span className="text-[#E91E63]">Sweet Club</span></h2>
            <p className="text-gray-400 max-w-md mx-auto lg:mx-0 mb-6 lg:mb-8 text-sm lg:text-base">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0 bg-white/5 border border-white/10 p-1.5 rounded-xl lg:rounded-2xl backdrop-blur-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent px-4 py-3 outline-none text-white text-sm"
              />
              <button className="bg-[#E91E63] hover:bg-[#C2185B] text-white px-6 py-3 rounded-lg lg:rounded-xl font-bold transition-all flex items-center justify-center mt-2 sm:mt-0">
                Join <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4 lg:mb-6 text-[#E91E63] text-sm lg:text-base uppercase tracking-wider">Shop</h4>
              <ul className="space-y-3 lg:space-y-4 text-xs lg:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Sweets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gift Boxes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sugar-Free</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 lg:mb-6 text-[#E91E63] text-sm lg:text-base uppercase tracking-wider">Info</h4>
              <ul className="space-y-3 lg:space-y-4 text-xs lg:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refunds</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tracking</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold mb-4 lg:mb-6 text-[#E91E63] text-sm lg:text-base uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 lg:space-y-4 text-xs lg:text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Mail size={14} className="flex-shrink-0" />
                  <span className="truncate">hello@sweetmoments.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone size={14} className="flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Jaipur, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 lg:pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-accent text-2xl lg:text-3xl text-[#E91E63]">SweetMoments</span>
            <p className="text-[10px] lg:text-xs text-gray-500 mt-2">© 2024 SweetMoments. Handmade with love.</p>
          </div>
          
          <div className="flex items-center space-x-4 lg:space-x-6">
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E91E63] hover:border-[#E91E63] transition-all">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E91E63] hover:border-[#E91E63] transition-all">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E91E63] hover:border-[#E91E63] transition-all">
              <Facebook size={16} />
            </a>
          </div>
          
          <div className="flex items-center space-x-3 lg:space-x-4">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 lg:h-4 grayscale opacity-30" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 lg:h-4 grayscale opacity-30" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 lg:h-6 grayscale opacity-30" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
