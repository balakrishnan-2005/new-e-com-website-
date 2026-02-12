
import React from 'react';
import { CATEGORIES } from '../../constants';
import { ArrowRight } from 'lucide-react';

const CategoryHighlights: React.FC = () => {
  return (
    <section className="py-24 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#E91E63] font-bold tracking-widest uppercase text-xs">Categories</span>
          <h2 className="text-4xl font-heading font-bold mt-2">Explore Our <span className="text-[#E91E63]">Collections</span></h2>
          <div className="w-20 h-1.5 bg-[#E91E63] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="group relative h-80 rounded-[40px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#E91E63]/20 transition-all duration-500">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white/60 text-xs font-medium uppercase tracking-widest">{cat.count} Items</span>
                <h3 className="text-2xl font-bold text-white mb-4">{cat.name}</h3>
                <div className="flex items-center text-[#E91E63] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Category <ArrowRight className="ml-2" size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
