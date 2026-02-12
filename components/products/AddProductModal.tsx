
import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Tag, IndianRupee, Scale, Loader2, CheckCircle2 } from 'lucide-react';
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
    setLoading(true);

    const productToCreate = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || `https://picsum.photos/seed/${Math.random()}/600/600`,
      weight: formData.weight,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      shelfLife: formData.shelfLife,
      inStock: true
    };

    const result = await createProduct(productToCreate);
    setLoading(false);
    
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
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
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">List New <span className="text-[#E91E63]">Delicacy</span></h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Share your artisanal creation</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Success!</h3>
            <p className="text-gray-500">Your artisanal sweet has been listed in the collection.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Saffron Pistachio Delight"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Weight/Unit</label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input 
                        type="text"
                        required
                        placeholder="e.g. 500g"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="url"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Leave blank for a random beautiful image</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Shelf Life</label>
                  <input 
                    type="text"
                    required
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({...formData, shelfLife: e.target.value})}
                    placeholder="e.g. 15 days"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ingredients</label>
                  <textarea 
                    rows={2}
                    placeholder="Milk, Saffron, Nuts (comma separated)"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Tell the story of this sweet..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-4 sticky bottom-0 bg-white">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#E91E63] text-white rounded-xl font-bold shadow-lg hover:bg-[#C2185B] transition-all flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> <span>List Product</span></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProductModal;
