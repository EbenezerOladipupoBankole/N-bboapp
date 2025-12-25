
import React from 'react';
import { DetailedOrder, OrderStatus } from '../types';
import { COLORS, WHATSAPP_SUPPORT_NUMBER } from '../constants';

interface OrderDetailsProps {
  order: DetailedOrder;
  onBack: () => void;
  onCancel?: (orderId: string) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack, onCancel }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Processing': return 'blue';
      case 'Out for Delivery': return 'orange';
      case 'Delivered':
      case 'Completed': return 'emerald';
      case 'Cancelled': return 'rose';
      default: return 'slate';
    }
  };

  const statusColor = getStatusColor(order.status);
  const canCancel = order.status === 'Processing' || order.status === 'Out for Delivery';

  const STEPS: { status: OrderStatus; label: string; icon: string }[] = [
    { status: 'Processing', label: 'Order Confirmed', icon: '📝' },
    { status: 'Out for Delivery', label: 'Out for Delivery', icon: '🚴' },
    { status: 'Delivered', label: 'Delivered', icon: '✅' }
  ];

  const getCurrentStepIndex = () => {
    if (order.status === 'Cancelled') return -1;
    if (order.status === 'Completed') return 2;
    return STEPS.findIndex(s => s.status === order.status);
  };

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-slideIn h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-6 pb-4 flex items-center shadow-sm sticky top-0 z-10 border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="ml-2">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Order Details</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">#{order.id}</p>
        </div>
        <div className={`ml-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-${statusColor}-50 text-${statusColor}-600`}>
          {order.status}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Lifecycle Stepper */}
        {order.status !== 'Cancelled' && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Order Status</h3>
            <div className="relative flex justify-between px-4">
              {/* Connector Lines */}
              <div className="absolute top-4 left-8 right-8 h-0.5 bg-slate-100 -z-0"></div>
              <div 
                className="absolute top-4 left-8 h-0.5 bg-orange-500 transition-all duration-1000 -z-0" 
                style={{ width: `${currentIdx === 0 ? 0 : currentIdx === 1 ? '50%' : '100%'}` }}
              ></div>

              {STEPS.map((step, idx) => {
                const isCompleted = currentIdx >= idx;
                const isActive = currentIdx === idx;
                
                return (
                  <div key={idx} className="flex flex-col items-center relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-sm transition-all duration-500 border-2 ${isCompleted ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-slate-100 text-slate-300'}`}>
                      {isCompleted ? '✓' : step.icon}
                    </div>
                    <span className={`text-[9px] font-black mt-3 uppercase tracking-tighter ${isActive ? 'text-orange-600' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Date and Time Card */}
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ordered On</p>
              <p className="text-sm font-bold text-gray-900">{order.date} • {order.time}</p>
            </div>
          </div>
        </div>

        {/* Vendor Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Vendor Information</h3>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mr-4 font-black">
              {order.vendor.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-black text-gray-900">{order.vendor.name}</h4>
              <p className="text-xs font-medium text-gray-500">{order.vendor.category} • {order.vendor.location}</p>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Items Ordered</h3>
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="divide-y divide-slate-50">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-xs font-black text-slate-400 mr-3">
                      {item.quantity}x
                    </div>
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  </div>
                  <p className="text-sm font-black text-gray-700">₦{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            {/* Price Summary */}
            <div className="p-6 bg-slate-50/50 space-y-3 border-t border-slate-100">
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Subtotal</span>
                <span>₦{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Delivery Fee</span>
                <span>₦{order.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-2">
                <span>Total Amount</span>
                <span style={{ color: COLORS.primary }}>₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Delivery Address</h3>
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-gray-900 leading-relaxed pt-2">
              {order.deliveryAddress}
            </p>
          </div>
        </div>

        {/* Support Options */}
        <div className="pt-4 space-y-3 pb-8">
           <a 
            href={`https://wa.me/${WHATSAPP_SUPPORT_NUMBER.replace('+', '')}?text=Help with Order #${order.id}`}
            target="_blank"
            className="w-full py-4 bg-emerald-50 text-emerald-700 font-black rounded-2xl flex items-center justify-center space-x-2 border border-emerald-100"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.131l.353.21c1.511.896 3.256 1.369 5.043 1.372 5.56 0 10.086-4.527 10.089-10.088.002-2.699-1.051-5.234-2.964-7.148-1.913-1.912-4.448-2.966-7.146-2.966-5.56 0-10.088 4.528-10.091 10.09-.001 1.888.522 3.731 1.514 5.342l.233.376-.993 3.633 3.722-.976z" />
             </svg>
            <span>Chat Support</span>
          </a>

          {canCancel && onCancel && (
            <button 
              onClick={() => onCancel(order.id.replace('NB-', ''))}
              className="w-full py-4 bg-rose-50 text-rose-600 font-black rounded-2xl flex items-center justify-center space-x-2 border border-rose-100 hover:bg-rose-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancel Order</span>
            </button>
          )}

          <button 
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all"
            onClick={onBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
