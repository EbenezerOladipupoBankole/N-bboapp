
import React, { useState, useEffect } from 'react';
import { COLORS, WHATSAPP_SUPPORT_NUMBER } from '../constants';

interface OrderTrackingProps {
  orderId: string;
  onBack: () => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Rider En-route');

  // Simulated progress update
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setStatus('Arrived at Location');
          clearInterval(timer);
          return 100;
        }
        if (prev > 80) setStatus('Almost there!');
        else if (prev > 40) setStatus('Moving through Panseke');
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-slideIn">
      {/* Header */}
      <div className="bg-white p-6 pb-4 flex items-center shadow-sm z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="ml-2">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Order Tracking</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {orderId}</p>
        </div>
        <button className="ml-auto bg-slate-100 p-2 rounded-xl text-slate-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative bg-slate-200 overflow-hidden">
        {/* Simple Simulated Map Graphics */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        {/* Route Path */}
        <svg className="absolute inset-0 w-full h-full p-12" viewBox="0 0 400 600">
          <path 
            d="M 50 100 Q 200 150 100 300 T 300 500" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d="M 50 100 Q 200 150 100 300 T 300 500" 
            fill="none" 
            stroke={COLORS.primary} 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={1000 - (progress * 10)}
          />
          
          {/* Landmarks */}
          <circle cx="50" cy="100" r="8" fill={COLORS.secondary} />
          <text x="65" y="105" className="text-[12px] font-black fill-slate-400">Kuto Market</text>
          
          <circle cx="300" cy="500" r="8" fill={COLORS.primary} />
          <text x="180" y="520" className="text-[12px] font-black fill-slate-900">Delivery Address (Asero)</text>

          {/* Moving Rider Icon */}
          <g transform={`translate(${progress * 2.5}, ${progress * 4.5})`} className="transition-all duration-1000">
             <circle cx="0" cy="0" r="20" fill={COLORS.primary} className="shadow-xl" />
             <text x="-8" y="5" className="text-sm">🚴</text>
          </g>
        </svg>

        {/* Distance Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 border border-slate-100">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-black text-gray-900">8 mins remaining</span>
        </div>
      </div>

      {/* Status & Rider Info Card */}
      <div className="bg-white p-8 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{status}</h3>
            <p className="text-sm font-medium text-gray-500">Pickup: Kuto Market • Destination: Asero</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full"></div>

        <div className="flex items-center">
           <div className="relative">
             <img 
               src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
               className="w-16 h-16 rounded-2xl object-cover grayscale"
               alt="Rider"
             />
             <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-white">
               4.9 ★
             </div>
           </div>
           <div className="ml-4 flex-1">
             <h4 className="font-black text-gray-900">Rider Adebayo</h4>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Qlink Champion (LA-234-XY)</p>
           </div>
           <div className="flex space-x-2">
              <a 
                href={`tel:+2348000000000`}
                className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_SUPPORT_NUMBER.replace('+', '')}`}
                target="_blank"
                className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.131l.353.21c1.511.896 3.256 1.369 5.043 1.372 5.56 0 10.086-4.527 10.089-10.088.002-2.699-1.051-5.234-2.964-7.148-1.913-1.912-4.448-2.966-7.146-2.966-5.56 0-10.088 4.528-10.091 10.09-.001 1.888.522 3.731 1.514 5.342l.233.376-.993 3.633 3.722-.976z" />
                </svg>
              </a>
           </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all"
        >
          Close Tracking
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
