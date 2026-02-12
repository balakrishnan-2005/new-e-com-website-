
import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Tag, IndianRupee, Scale, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { createProduct } from '../../services/dataService';
import { CATEGORIES } from '../../constants';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: CATEGORIES[0].id,
    price: '',
    weight: '',
    image: '',
    shelfLife: '15 days',
    ingredients: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const productToCreate = {
      name: formData.name.trim(),
      slug: `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      description: formData.description.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || `https://picsum.photos/seed/${encodeURIComponent(formData.name)}/600/600`,
      weight: formData.weight || '250g',
      ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()) : ['Traditional Recipe'],
      shelfLife: formData.shelfLife || '15 days',
      inStock: true
    };

    try {
      // createProduct handles the fallback logic internally now
      const result = await createProduct(productToCreate);
      
      if (result) {
        setSuccess(true);
        // Reset form immediately so it's fresh if reopened
        setFormData({
          name: '',
          description: '',
          category: CATEGORIES[0].id,
          price: '',
          weight: '',
          image: '',
          shelfLife: '15 days',
          ingredients: ''
        });
        
        // Let the user enjoy the success state for a moment
        setTimeout(() => {
          setSuccess(false);
          onSuccess(); // Triggers re-fetch in parent
          onClose();
        }, 1500);
      } else {
        setError('We encountered a snag while listing your delicacy. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission Error:', err);
      setError('An unexpected error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">List New <span className="text-[#E91E63]">Delicacy</span></h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mt-1">Artisan Dashboard</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Sweetly Added!</h3>
            <p className="text-gray-500 italic">"Your creation is now live for the world to taste."</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center space-x-3 text-sm animate-fade-in">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name *</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Saffron Pistachio Delight"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Price (₹) *</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Weight</label>
                    <div className="relative">
                      <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="text"
                        placeholder="500g"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Shelf Life</label>
                  <input 
                    type="text"
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({...formData, shelfLife: e.target.value})}
                    placeholder="e.g. 15 days"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Ingredients</label>
                  <textarea 
                    rows={2}
                    placeholder="Milk, Saffron, Cashews..."
                    value={formData.ingredients}
                    onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none resize-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Description *</label>
              <textarea 
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="A brief story about this sweet and its flavor profile..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none resize-none transition-all"
              />
            </div>

            <div className="pt-4 sticky bottom-0 bg-white">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#E91E63] text-white rounded-2xl font-bold shadow-lg shadow-[#E91E63]/20 hover:bg-[#C2185B] transition-all flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-70 disabled:grayscale"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> <span>List My Delicacy</span></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
