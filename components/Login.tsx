
import React, { useState } from 'react';
import { COLORS } from '../constants';
import Logo from './Logo';

interface LoginProps {
  onLogin: (phone: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    // Validates phone number length and moves directly to the next screen
    if (phone.length >= 10) {
      onLogin(phone);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 justify-center animate-fadeIn bg-white">
      <div className="mb-12">
        <Logo />
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Enter Phone</h2>
          <p className="text-gray-500 mt-2 font-medium">Quick entry to Abeokuta's Logistics Hub</p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">+234</span>
            <input 
              type="tel"
              placeholder="803 000 0000"
              className="w-full pl-16 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition-all text-lg font-semibold text-gray-900"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>

          <button 
            onClick={handleContinue}
            disabled={phone.length < 10}
            className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-100 disabled:opacity-50 transition-all active:scale-95 text-lg"
          >
            Continue to Níbbo
          </button>
        </div>
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
             <span className="text-orange-600 text-xs">✨</span>
          </div>
          <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">How Níbbo Works</h4>
        </div>
        
        <ul className="text-xs text-slate-500 space-y-3 leading-relaxed">
          <li className="flex items-start">
             <span className="text-orange-500 mr-3 font-bold">01</span>
             <span><strong>Logistics:</strong> Fast city-wide deliveries within 45 mins. Send items from Panseke to anywhere in Abeokuta instantly.</span>
          </li>
          <li className="flex items-start">
             <span className="text-orange-500 mr-3 font-bold">02</span>
             <span><strong>Shopping:</strong> We take the stress out of market days. Our shoppers buy fresh items from Kuto or Sapon for you.</span>
          </li>
          <li className="flex items-start">
             <span className="text-orange-500 mr-3 font-bold">03</span>
             <span><strong>Vendors:</strong> Local businesses reach more customers. List your food, groceries or tech products today.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
