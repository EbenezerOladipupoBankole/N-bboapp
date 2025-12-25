
import React, { useState, useRef } from 'react';
import { VendorProfile, Product, BusinessCategory } from '../types';
import { COLORS, ABEOKUTA_LOCATIONS } from '../constants';

const VendorDashboard: React.FC<{ user: VendorProfile, onLogout: () => void }> = ({ user, onLogout }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: user.businessName,
    category: user.category,
    address: user.address || user.location // Fallback to location if address is missing
  });

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Jollof Rice (Party Pack)', price: 1200, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400', vendorId: user.id },
    { id: '2', name: 'Fried Plantain Side', price: 500, image: 'https://images.unsplash.com/photo-1590132812754-07137f74e14f?w=400', vendorId: user.id }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      vendorId: user.id
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', image: '' });
    setShowAddModal(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Simulated API persist
    setIsEditingProfile(false);
  };

  const handleCancelProfile = () => {
    setProfileData({
      businessName: user.businessName,
      category: user.category,
      address: user.address || user.location
    });
    setIsEditingProfile(false);
  };

  const displayId = (user.id || 'VENDOR').slice(0, 3);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24 h-screen relative">
      {/* Merchant Premium Header */}
      <div className="bg-emerald-900 p-8 rounded-b-[3.5rem] shadow-2xl text-white relative overflow-hidden shrink-0">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
        
        {/* Back Button for Navigation */}
        <button 
          onClick={onLogout}
          className="absolute top-6 left-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90 z-20"
          title="Back to Selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex justify-between items-start mb-8 mt-8 relative z-10">
          <div className="flex-1 mr-4">
            {!isEditingProfile ? (
              <div className="group">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black tracking-tight group-hover:text-emerald-400 transition-colors">{profileData.businessName}</h1>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsEditingProfile(true); }}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mt-1">{profileData.category} Partner</p>
                <p className="text-emerald-500/80 text-[10px] font-medium mt-1 truncate max-w-[200px]">{profileData.address}</p>
              </div>
            ) : (
              <div className="bg-emerald-950/50 p-6 rounded-[2.5rem] border border-white/10 space-y-4 animate-scaleIn">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-emerald-400 uppercase tracking-widest px-1">Business Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-1 focus:ring-emerald-400 outline-none"
                    value={profileData.businessName}
                    onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-emerald-400 uppercase tracking-widest px-1">Category</label>
                  <select 
                    className="w-full bg-emerald-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-1 focus:ring-emerald-400 outline-none appearance-none"
                    value={profileData.category}
                    onChange={(e) => setProfileData({...profileData, category: e.target.value as BusinessCategory})}
                  >
                    {Object.values(BusinessCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-emerald-400 uppercase tracking-widest px-1">Business Address</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-1 focus:ring-emerald-400 outline-none h-20 resize-none"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button 
                    onClick={handleSaveProfile}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-[10px] uppercase py-3 rounded-xl transition-all active:scale-95"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelProfile}
                    className="px-4 bg-white/10 hover:bg-white/20 text-emerald-300 font-black text-[10px] uppercase py-3 rounded-xl transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center shrink-0">
             <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white font-black border border-white/20 mb-2">
                {profileData.businessName?.charAt(0)}
             </div>
             <span className="text-[9px] font-black text-emerald-300 uppercase tracking-tighter">ID: V-{displayId}</span>
          </div>
        </div>

        {!isEditingProfile && (
          <div className="grid grid-cols-2 gap-4 relative z-10 animate-fadeIn">
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm">
              <p className="text-[10px] font-black text-emerald-300 uppercase mb-1">Today's Sales</p>
              <p className="text-2xl font-black">₦45,200</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm">
              <p className="text-[10px] font-black text-emerald-300 uppercase mb-1">Order Volume</p>
              <p className="text-2xl font-black">{28 + products.length}</p>
            </div>
          </div>
        )}
      </div>

      {/* Store Operations */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Store Acceptance</p>
            <p className={`font-black text-lg transition-colors ${isStoreOpen ? 'text-emerald-600' : 'text-red-500'}`}>
              {isStoreOpen ? 'Live on Níbbo' : 'Store Closed'}
            </p>
          </div>
          <button 
            onClick={() => setIsStoreOpen(!isStoreOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-black text-xs transition-all active:scale-95 ${isStoreOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}
          >
            {isStoreOpen ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Main Merchant Actions */}
      <div className="p-6">
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-1">Inventory Management</h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => {
              setNewProduct({ name: '', price: '', image: '' });
              setShowAddModal(true);
            }}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-3 hover:border-emerald-300 hover:shadow-md transition-all active:scale-95"
          >
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110">➕</div>
             <span className="font-black text-xs text-slate-800">Add Product</span>
          </button>
          <button className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-3 hover:border-emerald-300 hover:shadow-md transition-all active:scale-95">
             <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110">📦</div>
             <span className="font-black text-xs text-slate-800">View Orders</span>
          </button>
        </div>
      </div>

      {/* Product Catalog */}
      <div className="px-6 mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Product Catalog</h2>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">{products.length} Items</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-[1.5rem] flex items-center shadow-sm border border-slate-100 animate-fadeIn">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-16 h-16 rounded-xl object-cover bg-slate-100"
              />
              <div className="ml-4 flex-1">
                <h4 className="font-black text-gray-900 text-sm">{product.name}</h4>
                <p className="text-emerald-600 font-bold text-xs mt-1">₦{product.price.toLocaleString()}</p>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="px-6 pb-24">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Top Sellers</h3>
              <button className="text-emerald-600 text-xs font-black uppercase hover:underline">Full Reports</button>
           </div>
           
           <div className="space-y-4">
              {[
                { name: "Jollof Rice (Party Pack)", sold: 42, rev: "₦12,600" },
                { name: "Fried Plantain Side", sold: 31, rev: "₦4,500" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                   <div>
                      <p className="text-xs font-black text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{item.sold} units sold</p>
                   </div>
                   <p className="font-black text-emerald-700 text-sm">{item.rev}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-emerald-950/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-[3rem] p-8 shadow-2xl animate-slideIn">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Add New Product</h2>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Níbbo Merchant Portal</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Asun (Spiced Goat Meat)"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Price (₦)</label>
                <input 
                  type="number" 
                  placeholder="2500"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Product Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                
                {newProduct.image ? (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-slate-100 group">
                    <img src={newProduct.image} className="w-full h-full object-cover" alt="Product preview" />
                    <button 
                      type="button"
                      onClick={() => setNewProduct(prev => ({ ...prev, image: '' }))}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg transition-transform active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">🖼️</div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tap to upload image</span>
                  </button>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-emerald-800 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 active:scale-95 transition-all mt-4"
              >
                List on Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
