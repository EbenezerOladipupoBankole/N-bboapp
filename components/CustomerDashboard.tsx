
import React, { useState, useMemo } from 'react';
import { CustomerProfile, DetailedOrder, OrderStatus } from '../types';
import { COLORS } from '../constants';
import OrderTracking from './OrderTracking';
import OrderDetails from './OrderDetails';

const CATEGORIES = ['All', 'Food', 'Electronics', 'Grocery', 'Pharmacy'];

interface VendorItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  time: string;
  priceRange: string;
  image: string;
  location: string;
  isFastest?: boolean;
}

const MOCK_VENDORS: Record<string, VendorItem[]> = {
  'Food': [
    { id: 'f1', name: 'Panseke Jollof Hub', category: 'Local Dishes', rating: 4.8, time: '20-30 min', priceRange: '₦₦', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400', location: 'Panseke', isFastest: true },
    { id: 'f2', name: 'Kuto Grills & Bar', category: 'Grills', rating: 4.5, time: '35-45 min', priceRange: '₦₦₦', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', location: 'Kuto' },
    { id: 'f3', name: 'Rock City Pastries', category: 'Bakery', rating: 4.9, time: '15-25 min', priceRange: '₦', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', location: 'Oke-Mosan' },
  ],
  'Electronics': [
    { id: 'e1', name: 'Obantoko Tech Hub', category: 'Gadgets', rating: 4.7, time: '40-50 min', priceRange: '₦₦₦', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400', location: 'Obantoko' },
    { id: 'e2', name: 'Lafenwa Systems', category: 'Computers', rating: 4.3, time: '1 hour', priceRange: '₦₦₦₦', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', location: 'Lafenwa' },
  ],
  'Grocery': [
    { id: 'g1', name: 'Kuto Market Express', category: 'Fresh Produce', rating: 4.6, time: '45-60 min', priceRange: '₦', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', location: 'Kuto' },
    { id: 'g2', name: 'Sapon Supermart', category: 'Household', rating: 4.4, time: '30-40 min', priceRange: '₦₦', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400', location: 'Sapon' },
  ],
  'Pharmacy': [
    { id: 'p1', name: 'Lantoro Meds', category: 'Pharmacy', rating: 4.9, time: '15-20 min', priceRange: '₦₦', image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400', location: 'Lantoro', isFastest: true },
    { id: 'p2', name: 'Adigbe Health Plus', category: 'Pharmacy', rating: 4.7, time: '25-35 min', priceRange: '₦₦', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400', location: 'Adigbe' },
  ]
};

const CustomerDashboard: React.FC<{ user: CustomerProfile, onLogout: () => void }> = ({ user, onLogout }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [detailedOrder, setDetailedOrder] = useState<DetailedOrder | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activityView, setActivityView] = useState<'date' | 'status'>('date');
  const [activityFilter, setActivityFilter] = useState('All');

  const [activities, setActivities] = useState([
    { id: '5102', title: 'Food from Kuto', time: 'Just now', dateGroup: 'Today', status: 'Processing' as OrderStatus, icon: '🍔', color: 'blue', price: 4200, progress: 25 },
    { id: '4921', title: 'Package from Panseke', time: '10:30 AM', dateGroup: 'Today', status: 'Out for Delivery' as OrderStatus, icon: '🚴', color: 'orange', price: 2500, progress: 65 },
    { id: '7234', title: 'Logistics Order #7234', time: '04:15 PM', dateGroup: 'Yesterday', status: 'Delivered' as OrderStatus, icon: '📦', color: 'emerald', price: 1500, progress: 100 },
    { id: '7235', title: 'Sapon Market Shopping', time: '11:00 AM', dateGroup: 'Yesterday', status: 'Completed' as OrderStatus, icon: '🛒', color: 'emerald', price: 8500, progress: 100 },
    { id: '6112', title: 'Pharmacy Errands', time: 'Oct 22', dateGroup: 'Older', status: 'Cancelled' as OrderStatus, icon: '💊', color: 'rose', price: 3000, progress: 0 },
  ]);

  const filteredActivities = useMemo(() => {
    return activities.filter(item => {
      if (activityFilter === 'All') return true;
      if (activityFilter === 'Active') return item.status === 'Processing' || item.status === 'Out for Delivery';
      if (activityFilter === 'Completed') return item.status === 'Delivered' || item.status === 'Completed';
      if (activityFilter === 'Cancelled') return item.status === 'Cancelled';
      return true;
    });
  }, [activities, activityFilter]);

  const groupedActivities = useMemo(() => {
    const groups: Record<string, typeof activities> = {};
    filteredActivities.forEach(item => {
      const key = activityView === 'date' ? item.dateGroup : item.status;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return Object.entries(groups);
  }, [filteredActivities, activityView]);

  const handleTrackOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsTracking(true);
  };

  const handleViewDetails = (id: string, itemData: any) => {
    const mockDetailedOrder: DetailedOrder = {
      id: `NB-${id}`,
      title: itemData.title,
      date: itemData.dateGroup === 'Older' ? 'Oct 22, 2024' : itemData.dateGroup,
      time: itemData.time,
      status: itemData.status,
      items: [
        { id: '1', name: itemData.title.split('from')[1]?.trim() || 'Logistics Package', quantity: 1, price: itemData.price - 500 },
        { id: '2', name: 'Handling Fee', quantity: 1, price: 500 },
      ],
      subtotal: itemData.price,
      deliveryFee: 1500,
      total: itemData.price + 1500,
      deliveryAddress: user.location + ', Abeokuta City Center',
      vendor: {
        name: itemData.title.includes('Market') ? 'Kuto Central Market' : 'Níbbo Logistics Hub',
        category: itemData.title.includes('Market') ? 'Market Errands' : 'Express Delivery',
        location: 'Abeokuta South',
      }
    };
    setDetailedOrder(mockDetailedOrder);
  };

  const triggerCancelConfirmation = (id: string) => {
    setOrderToCancel(id);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    if (!orderToCancel) return;
    setActivities(prev => prev.map(item => 
      item.id === orderToCancel 
        ? { ...item, status: 'Cancelled' as OrderStatus, color: 'rose', progress: 0 } 
        : item
    ));
    if (detailedOrder && detailedOrder.id === `NB-${orderToCancel}`) {
      setDetailedOrder({ ...detailedOrder, status: 'Cancelled' });
    }
    setShowCancelModal(false);
    setOrderToCancel(null);
  };

  if (isTracking && selectedOrderId) {
    return <OrderTracking orderId={selectedOrderId} onBack={() => setIsTracking(false)} />;
  }

  if (detailedOrder) {
    return (
      <OrderDetails 
        order={detailedOrder} 
        onBack={() => setDetailedOrder(null)} 
        onCancel={triggerCancelConfirmation}
      />
    );
  }

  const isInProgress = (status: OrderStatus) => status === 'Processing' || status === 'Out for Delivery';

  const categoryVendors = selectedCategory === 'All' ? [] : MOCK_VENDORS[selectedCategory] || [];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24 h-screen relative">
      {/* Dynamic Header */}
      <div className="bg-white p-6 rounded-b-[2.5rem] shadow-sm sticky top-0 z-20 border-b border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <div onClick={onLogout} className="cursor-pointer group">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-orange-500 transition-colors">Your Níbbo Account</p>
            <h1 className="text-2xl font-black text-gray-900">{user.fullName}</h1>
          </div>
          <div className="flex items-center space-x-3">
             <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
             </button>
             <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-100">
                {user.fullName?.charAt(0) || 'U'}
             </div>
          </div>
        </div>

        {/* Search & Categories */}
        <div className="relative mb-4">
           <input 
              type="text" 
              placeholder={`Search in ${selectedCategory === 'All' ? 'Abeokuta' : selectedCategory}...`}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
           />
           <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
        </div>

        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-90 shrink-0 ${cat === selectedCategory ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-slate-100 text-slate-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory === 'All' ? (
        <>
          {/* Services Grid */}
          <div className="p-6">
            <h2 className="text-lg font-black text-gray-800 mb-4 px-1">Abeokuta Hub Services</h2>
            <div className="grid grid-cols-1 gap-4">
              <div onClick={() => setSelectedCategory('Grocery')} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mr-4 group-hover:scale-110 transition-transform">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900">Instant Delivery</h3>
                  <p className="text-xs text-gray-500 font-medium">From Panseke to Asero in 40min</p>
                </div>
                <div className="text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div onClick={() => setSelectedCategory('Food')} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mr-4 group-hover:scale-110 transition-transform">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900">Personal Shopper</h3>
                  <p className="text-xs text-gray-500 font-medium">Fresh items from Kuto or Sapon</p>
                </div>
                <div className="text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Refined */}
          <div className="px-6 mb-12">
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center">
                Recent Activity
                <span className="ml-2 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
              </h2>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                 <button 
                  onClick={() => setActivityView('date')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activityView === 'date' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                 >Date</button>
                 <button 
                  onClick={() => setActivityView('status')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${activityView === 'status' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
                 >Status</button>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-8 pb-1">
              {['All', 'Active', 'Completed', 'Cancelled'].map((f) => (
                <button 
                  key={f} 
                  onClick={() => setActivityFilter(f)}
                  className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border shrink-0 ${f === activityFilter ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100'}`}
                >
                  {f}
                </button>
              ))}
            </div>
            
            <div className="relative pl-6">
              {/* Vertical Timeline Line */}
              <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

              <div className="space-y-10">
                {groupedActivities.map(([groupName, items], groupIdx) => (
                  <div key={groupName} className="relative animate-scaleIn" style={{ animationDelay: `${groupIdx * 0.1}s` }}>
                    {/* Timeline Node & Header */}
                    <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-4 border-orange-500 shadow-sm z-10"></div>
                    <div className="flex items-center mb-6">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{groupName}</span>
                    </div>

                    <div className="space-y-4">
                      {items.map((item, itemIdx) => (
                        <div 
                          key={item.id} 
                          onClick={() => {
                            if (item.status === 'Out for Delivery') {
                              handleTrackOrder(item.id);
                            } else {
                              handleViewDetails(item.id, item);
                            }
                          }}
                          className="group bg-white p-4 rounded-[1.5rem] flex flex-col shadow-sm border border-slate-100 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer active:scale-95 animate-slideUpFade"
                          style={{ animationDelay: `${(groupIdx * 0.1) + (itemIdx * 0.05)}s` }}
                        >
                          <div className="flex items-center mb-2">
                            <div className={`w-12 h-12 bg-${item.color}-50 rounded-2xl flex items-center justify-center mr-4 text-xl group-hover:scale-110 transition-transform`}>
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex justify-between items-start mb-0.5">
                                 <p className="text-xs font-black text-gray-900 truncate pr-2">{item.title}</p>
                                 <p className="text-[10px] text-gray-400 font-bold shrink-0">{item.time}</p>
                               </div>
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center">
                                   <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-${item.color}-500 ${isInProgress(item.status) ? 'animate-pulse' : ''}`}></span>
                                   <span className={`text-[10px] font-black uppercase tracking-wider text-${item.color}-600`}>
                                     {item.status}
                                   </span>
                                 </div>
                                 <p className="text-[10px] font-black text-slate-800">₦{item.price.toLocaleString()}</p>
                               </div>
                            </div>
                            <div className="ml-3 text-slate-200 group-hover:text-orange-400 transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
                              </svg>
                            </div>
                          </div>
                          
                          {/* Mini Progress Bar for Active Orders */}
                          {isInProgress(item.status) && (
                            <div className="mt-1 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-${item.color}-500 transition-all duration-1000`} 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {groupedActivities.length === 0 && (
                <div className="py-20 text-center animate-scaleIn">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl opacity-40">📭</div>
                   <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No matching activities</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Detailed Category View */
        <div className="p-6 space-y-6 animate-scaleIn">
          <div className="flex items-center space-x-3 mb-2">
            <button 
              onClick={() => setSelectedCategory('All')}
              className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-orange-500 transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Top {selectedCategory}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Níbbo Partners</p>
            </div>
          </div>

          {categoryVendors.length > 0 ? (
            <div className="space-y-4">
              {categoryVendors.map((vendor, vIdx) => (
                <div 
                  key={vendor.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all active:scale-[0.98] group animate-slideUpFade"
                  style={{ animationDelay: `${vIdx * 0.05}s` }}
                >
                  <div className="relative h-32 w-full overflow-hidden">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {vendor.isFastest && (
                        <div className="bg-orange-500 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-lg flex items-center shadow-lg">
                          <span className="mr-1">⚡</span> FASTEST
                        </div>
                      )}
                      <div className="bg-white/90 backdrop-blur-md text-gray-900 text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded-lg shadow-sm">
                        {vendor.location}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-black text-gray-900">{vendor.name}</h3>
                        <p className="text-xs text-gray-500 font-medium">{vendor.category} • {vendor.priceRange}</p>
                      </div>
                      <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-xl text-xs font-black flex items-center">
                        ★ {vendor.rating}
                      </div>
                    </div>
                    <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest mt-4">
                      <svg className="w-3.5 h-3.5 mr-1 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
                      {vendor.time} DELIVERY
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-4xl">
                🔎
              </div>
              <div>
                <p className="text-gray-900 font-black">No partners found</p>
                <p className="text-gray-400 text-sm font-medium">Coming soon to your area in Abeokuta!</p>
              </div>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-3 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      )}

      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-sm bg-white rounded-[2.5rem] p-8 shadow-2xl animate-scaleIn text-center">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Cancel Order?</h2>
            <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>

            <div className="space-y-3">
              <button 
                onClick={confirmCancellation}
                className="w-full py-4 bg-rose-600 text-white font-black rounded-2xl shadow-lg shadow-rose-100 active:scale-95 transition-all"
              >
                Yes, Cancel Order
              </button>
              <button 
                onClick={() => {
                  setShowCancelModal(false);
                  setOrderToCancel(null);
                }}
                className="w-full py-4 bg-slate-100 text-slate-600 font-black rounded-2xl active:scale-95 transition-all"
              >
                No, Keep Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Active Order (Simulated) */}
      <div className="fixed bottom-24 left-6 right-6 z-30">
        <div className="bg-white p-4 rounded-3xl shadow-2xl border border-orange-100 flex items-center animate-bounce-subtle">
           <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
              <span className="text-white text-xs">🚴</span>
           </div>
           <div className="flex-1">
              <p className="text-[10px] font-black text-orange-500 uppercase">Active Courier</p>
              <p className="text-xs font-bold text-gray-900">Rider Adebayo is 5 mins away</p>
           </div>
           <button 
             onClick={() => handleTrackOrder('4921')}
             className="text-xs font-black text-orange-600 px-3 py-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
           >
             Track
           </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
