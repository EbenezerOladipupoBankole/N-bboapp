
import React, { useState } from 'react';
import { UserRole, VehicleType, AvailabilityType, BusinessCategory } from '../types';
import { ABEOKUTA_LOCATIONS, COLORS } from '../constants';

interface RegistrationFlowProps {
  role: UserRole;
  onBack: () => void;
  onComplete: (data: any) => void;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ role, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: ABEOKUTA_LOCATIONS[0],
    // Rider specific
    vehicleType: VehicleType.BIKE,
    availability: AvailabilityType.FULL_TIME,
    licenseNumber: '',
    // Vendor specific
    businessName: '',
    category: BusinessCategory.FOOD,
  });

  const getThemeColor = () => {
    switch (role) {
      case UserRole.CUSTOMER: return COLORS.secondary;
      case UserRole.RIDER: return COLORS.primary;
      case UserRole.VENDOR: return COLORS.tertiary;
      default: return '#000';
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Generate a unique ID for the new user
      const userId = Math.random().toString(36).substring(2, 11).toUpperCase();
      onComplete({ ...formData, role, id: userId });
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-slideIn bg-white">
      <button onClick={onBack} className="mb-8 flex items-center text-gray-500 font-medium hover:text-gray-800 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      <div className="mb-6">
        <h2 className="text-3xl font-black mb-2 text-gray-900 tracking-tight">Join as a {role.toLowerCase()}</h2>
        <div className="flex space-x-2">
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-orange-500' : 'bg-gray-100'}`} style={{ backgroundColor: step >= 1 ? getThemeColor() : undefined }}></div>
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-100'}`} style={{ backgroundColor: step >= 2 ? getThemeColor() : undefined }}></div>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Phone Number</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold tracking-tighter">+234</span>
              <input 
                type="tel" 
                placeholder="803 123 4567"
                className="w-full pl-16 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 outline-none transition-all text-gray-900 font-semibold"
                style={{ '--tw-ring-color': getThemeColor() } as React.CSSProperties}
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Adekunle Olusegun"
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 outline-none transition-all text-gray-900 font-semibold"
              style={{ '--tw-ring-color': getThemeColor() } as React.CSSProperties}
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Default Area (Abeokuta)</label>
            <div className="relative">
              <select 
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 outline-none transition-all appearance-none text-gray-900 font-semibold"
                style={{ '--tw-ring-color': getThemeColor() } as React.CSSProperties}
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                {ABEOKUTA_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {role === UserRole.RIDER && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[VehicleType.BIKE, VehicleType.CAR, VehicleType.VAN].map(v => (
                    <button
                      key={v}
                      onClick={() => setFormData({...formData, vehicleType: v})}
                      className={`py-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-wider ${formData.vehicleType === v ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Availability</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 outline-none transition-all appearance-none text-gray-900 font-semibold"
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value as AvailabilityType})}
                  >
                    {Object.values(AvailabilityType).map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}

          {role === UserRole.VENDOR && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Business Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Panseke Tech Hub"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 outline-none transition-all text-gray-900 font-semibold"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Category</label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 outline-none transition-all appearance-none text-gray-900 font-semibold"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as BusinessCategory})}
                  >
                    {Object.values(BusinessCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}

          {role === UserRole.CUSTOMER && (
            <div className="bg-blue-50 p-8 rounded-3xl border-2 border-dashed border-blue-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <span className="text-3xl">🎉</span>
              </div>
              <p className="text-blue-900 font-black text-xl mb-2">You're All Set!</p>
              <p className="text-blue-600 text-sm font-medium leading-relaxed">Ready to experience the fastest logistics and shopping service in Abeokuta.</p>
            </div>
          )}
        </div>
      )}

      <button 
        onClick={handleNext}
        className="w-full py-5 text-white font-black rounded-2xl shadow-xl mt-auto transition-all active:scale-95 hover:brightness-110"
        style={{ backgroundColor: getThemeColor() }}
      >
        {step === 1 ? 'Continue Registration' : 'Finish Setup'}
      </button>
    </div>
  );
};

export default RegistrationFlow;
