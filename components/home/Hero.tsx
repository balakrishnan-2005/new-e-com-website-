
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100dvh] lg:h-screen flex items-center overflow-hidden bg-[#FDF2F5] pt-24 lg:pt-0 pb-12 lg:pb-0">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[-10%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-[#FFD1E3]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[#FFF9E6]/40 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 bg-[#E91E63]/10 text-[#E91E63] rounded-full text-[10px] sm:text-xs lg:text-sm font-bold tracking-wider uppercase mb-6 animate-fade-in">
            New Festive Collection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading text-gray-900 leading-tight lg:leading-[1.1] mb-6">
            Handcrafted <br />
            <span className="text-[#E91E63]">Moments of Joy</span> <br />
            in Every Bite.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Experience the authentic taste of tradition with our 100% natural, homemade delicacies. No preservatives, just pure love and premium ingredients.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link 
              to="/shop" 
              className="px-8 py-3.5 lg:py-4 bg-[#E91E63] text-white rounded-xl font-bold hover:bg-[#C2185B] shadow-lg hover:shadow-[#E91E63]/30 transition-all flex items-center justify-center group"
            >
              Shop Collection
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3.5 lg:py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              Our Story
            </Link>
          </div>
          
          <div className="mt-10 lg:mt-12 flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 border-t border-gray-200 pt-6 lg:pt-8">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl lg:text-2xl font-heading font-bold">10k+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Customers</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl lg:text-2xl font-heading font-bold">50+</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Recipes</span>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl lg:text-2xl font-heading font-bold">4.9/5</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Rating</span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px]">
            {/* Main Hero Image */}
            <div className="absolute inset-0 rounded-[30px] lg:rounded-[40px] overflow-hidden border-4 lg:border-8 border-white shadow-2xl rotate-3 z-10 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://picsum.photos/id/493/800/800" 
                alt="Delicious homemade dessert" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Secondary Image Card */}
            <div className="absolute top-[-20px] lg:top-[-40px] left-[-20px] lg:left-[-40px] w-32 h-32 lg:w-48 lg:h-48 rounded-[20px] lg:rounded-[30px] overflow-hidden border-2 lg:border-4 border-white shadow-xl -rotate-6 z-20 hidden sm:block hover:rotate-0 transition-transform duration-500">
               <img 
                src="https://picsum.photos/id/488/400/400" 
                alt="Sweet box" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Element */}
            <div className="absolute bottom-[-10px] lg:bottom-[-20px] right-[-10px] lg:right-[-20px] bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl z-30 animate-bounce">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-base lg:text-lg">★</span>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs font-bold text-gray-800">100% Homemade</p>
                  <p className="text-[8px] lg:text-[10px] text-gray-500 leading-none">Traditional Taste</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
