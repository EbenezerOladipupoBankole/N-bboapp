
import React from 'react';
import { UserRole } from '../types';
import { COLORS } from '../constants';
import Logo from './Logo';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
  onBack: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, onBack }) => {
  return (
    <div className="flex-1 flex flex-col p-6 items-center justify-center animate-fadeIn bg-slate-50 relative">
      {/* Top Navigation for Back Button */}
      <div className="absolute top-8 left-6 w-full px-6 flex items-center">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-gray-400 hover:text-gray-600 transition-colors flex items-center font-bold text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>

      <div className="mb-12 mt-8 text-center">
        <Logo />
        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-3">Abeokuta's Super-App</p>
      </div>

      <div className="w-full text-center mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">I want to...</h2>
        <p className="text-gray-500 text-sm mt-1">Select your role to continue</p>
      </div>

      <div className="w-full space-y-4">
        {/* Customer Card */}
        <button 
          onClick={() => onSelect(UserRole.CUSTOMER)}
          className="w-full flex items-center p-6 bg-white border-2 border-transparent rounded-[2.5rem] shadow-sm hover:shadow-md hover:border-blue-200 transition-all active:scale-95 group"
        >
          <div className="bg-blue-600 text-white p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-black text-gray-900">Get Services</h3>
            <p className="text-gray-500 text-sm font-medium">Order food, groceries & more</p>
          </div>
        </button>

        {/* Rider Card */}
        <button 
          onClick={() => onSelect(UserRole.RIDER)}
          className="w-full flex items-center p-6 bg-white border-2 border-transparent rounded-[2.5rem] shadow-sm hover:shadow-md hover:border-orange-200 transition-all active:scale-95 group"
        >
          <div className="bg-orange-500 text-white p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-black text-gray-900">Drive & Earn</h3>
            <p className="text-gray-500 text-sm font-medium">Join our delivery fleet</p>
          </div>
        </button>

        {/* Vendor Card */}
        <button 
          onClick={() => onSelect(UserRole.VENDOR)}
          className="w-full flex items-center p-6 bg-white border-2 border-transparent rounded-[2.5rem] shadow-sm hover:shadow-md hover:border-green-200 transition-all active:scale-95 group"
        >
          <div className="bg-emerald-800 text-white p-4 rounded-2xl mr-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-black text-gray-900">Grow Business</h3>
            <p className="text-gray-500 text-sm font-medium">Sell items as a partner store</p>
          </div>
        </button>
      </div>

      <div className="mt-auto pt-8 flex items-center text-[10px] text-gray-400 space-x-2 font-bold uppercase tracking-wider">
         <span className="w-8 h-px bg-gray-200"></span>
         <span>Reliable Abeokuta Logistics</span>
         <span className="w-8 h-px bg-gray-200"></span>
      </div>
    </div>
  );
};

export default RoleSelection;
