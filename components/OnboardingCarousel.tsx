
import React, { useState } from 'react';
import { COLORS, APP_INFO } from '../constants';
import Logo from './Logo';

interface OnboardingCarouselProps {
  onFinish: () => void;
  onBack: () => void;
}

const slides = [
  {
    title: "Fast Logistics",
    description: "Intra-city deliveries within 45 minutes. Panseke to Asero? We've got you covered.",
    icon: "🚴‍♂️",
    color: COLORS.primary,
    detail: APP_INFO.logistics
  },
  {
    title: "Market Errands",
    description: "We handle your heavy lifting at Kuto and Sapon markets. Fresh items, direct to your door.",
    icon: "🛒",
    color: COLORS.secondary,
    detail: APP_INFO.shopping
  },
  {
    title: "Vendor Growth",
    description: "Empowering Abeokuta's businesses with digital tools and a reliable delivery fleet.",
    icon: "🏪",
    color: COLORS.tertiary,
    detail: APP_INFO.vendor
  }
];

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onFinish, onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-fadeIn relative">
      {/* Top Header */}
      <div className="p-6 flex justify-between items-center">
        <button onClick={onBack} className="text-gray-400 font-bold text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <button onClick={onFinish} className="text-orange-500 font-black text-sm uppercase tracking-widest">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-10 transform scale-75">
           <Logo />
        </div>

        <div className="w-full transition-all duration-500 transform scale-100">
           <div 
             className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-6xl mx-auto mb-8 shadow-2xl shadow-slate-200 animate-bounce-subtle"
             style={{ backgroundColor: slides[currentSlide].color + '10' }}
           >
             {slides[currentSlide].icon}
           </div>
           
           <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight" style={{ color: slides[currentSlide].color }}>
             {slides[currentSlide].title}
           </h2>
           
           <p className="text-gray-600 font-medium leading-relaxed mb-6 px-4">
             {slides[currentSlide].description}
           </p>

           <div className="bg-slate-50 p-6 rounded-3xl text-left border border-slate-100 mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Deep Dive</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {slides[currentSlide].detail}
              </p>
           </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-8">
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8' : 'w-2 bg-slate-200'}`}
              style={{ backgroundColor: i === currentSlide ? slides[currentSlide].color : undefined }}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="w-full py-5 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 text-lg"
          style={{ backgroundColor: slides[currentSlide].color }}
        >
          {currentSlide === slides.length - 1 ? "Let's Get Started" : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
