
import React from 'react';
import { COLORS } from '../constants';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';
  
  return (
    <div className={`flex flex-col items-center justify-center transition-transform ${scale} select-none`}>
      <div className="relative flex items-center">
        {/* Deep Green Text */}
        <h1 className="text-6xl font-black tracking-tighter" style={{ color: COLORS.tertiary, fontFamily: 'Inter, sans-serif' }}>
          NÍBBO
        </h1>
        
        {/* The Orange Pin from the Image */}
        <div className="ml-2 relative">
           <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden" 
                style={{ backgroundColor: COLORS.primary }}>
              {/* The "S" road squiggle inside the pin */}
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-none stroke-current" strokeWidth="3">
                <path d="M8 16c0-2.209 1.791-4 4-4s4-1.791 4-4" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" className="opacity-20" />
              </svg>
              {/* Bottom pointer of the pin */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ backgroundColor: COLORS.primary }}></div>
           </div>
        </div>
      </div>
      
      {/* The Curved Underline from the Logo */}
      <div className="w-56 h-4 -mt-2 relative">
        <svg viewBox="0 0 200 20" className="w-full h-full">
          <path d="M10 5 Q 100 25 190 5" fill="none" stroke={COLORS.primary} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default Logo;
