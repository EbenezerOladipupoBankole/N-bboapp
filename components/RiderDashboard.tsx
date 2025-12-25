
import React, { useState } from 'react';
import { RiderProfile, VehicleType, AvailabilityType } from '../types';
import { COLORS } from '../constants';

const RiderDashboard: React.FC<{ user: RiderProfile, onLogout: () => void }> = ({ user, onLogout }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [riderData, setRiderData] = useState({
    vehicleType: user.vehicleType,
    availability: user.availability
  });

  const target = 15000;
  const currentEarnings = 8450;
  const progress = (currentEarnings / target) * 100;

  const getVehicleIcon = (type: VehicleType) => {
    switch (type) {
      case VehicleType.BIKE: return '🏍️';
      case VehicleType.CAR: return '🚗';
      case VehicleType.VAN: return '🚐';
      default: return '🚲';
    }
  };

  const handleSave = () => {
    // Simulated API persist
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values passed from props
    setRiderData({
      vehicleType: user.vehicleType,
      availability: user.availability
    });
    setIsEditing(false);
  };

  const displayId = (user.id || 'NIBBO').slice(0, 4);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-24 h-screen">
      {/* Rider Professional Header */}
      <div className="bg-slate-900 p-8 rounded-b-[3.5rem] shadow-2xl text-white relative overflow-hidden shrink-0">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10"></div>
        
        {/* Back Button for Navigation */}
        <button 
          onClick={onLogout}
          className="absolute top-6 left-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90 z-20"
          title="Back to Selection"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex justify-between items-start mb-6 mt-8 relative z-10">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black tracking-tight">{user.fullName}</h1>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-90"
                  title="Edit Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">Verified Rider</span>
              <span className="bg-white/10 text-slate-300 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">★ 4.98 Rating</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">{riderData.availability}</span>
            </div>

            {isEditing ? (
              <div className="mt-6 space-y-5 bg-white/5 p-5 rounded-[2rem] border border-white/10 animate-scaleIn">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Update Vehicle</label>
                  <div className="grid grid-cols-3 gap-2 bg-black/20 p-1 rounded-2xl">
                    {[VehicleType.BIKE, VehicleType.CAR, VehicleType.VAN].map(v => (
                      <button
                        key={v}
                        onClick={() => setRiderData({...riderData, vehicleType: v})}
                        className={`py-2.5 rounded-xl transition-all font-black text-[10px] uppercase tracking-wider flex flex-col items-center justify-center space-y-1 ${riderData.vehicleType === v ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <span className="text-base">{getVehicleIcon(v)}</span>
                        <span>{v}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Update Availability</label>
                  <div className="flex flex-col space-y-2">
                    {[AvailabilityType.FULL_TIME, AvailabilityType.PART_TIME, AvailabilityType.WEEKEND].map(a => (
                      <button
                        key={a}
                        onClick={() => setRiderData({...riderData, availability: a})}
                        className={`py-3 px-4 rounded-xl transition-all font-black text-[10px] uppercase tracking-wider flex justify-between items-center border ${riderData.availability === a ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/5 bg-white/5 text-slate-400'}`}
                      >
                        <span>{a}</span>
                        {riderData.availability === a && <span className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button 
                    onClick={handleSave}
                    className="flex-1 py-4 bg-orange-500 text-white font-black text-xs uppercase rounded-2xl shadow-xl shadow-orange-950/20 active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="px-6 py-4 bg-slate-800 text-slate-400 font-black text-xs uppercase rounded-2xl active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col space-y-2 animate-fadeIn">
                <div className="flex items-center text-slate-400 text-xs font-bold">
                  <span className="mr-3 opacity-60 uppercase text-[9px] tracking-widest">Active Vehicle</span>
                  <span className="text-white flex items-center bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="mr-2">{getVehicleIcon(riderData.vehicleType)}</span>
                    {riderData.vehicleType}
                  </span>
                </div>
                <div className="flex items-center text-slate-400 text-xs font-bold">
                  <span className="mr-3 opacity-60 uppercase text-[9px] tracking-widest">Fleet License</span>
                  <span className="text-orange-400 tracking-widest font-black uppercase bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20">
                    {user.licenseNumber || 'NIB-FL-772'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center space-y-2 shrink-0">
            <div 
              className="w-16 h-16 bg-orange-500 rounded-[1.8rem] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-orange-900/50 border-4 border-slate-800 transition-all"
            >
               {user.fullName?.charAt(0)}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">ID: R-{displayId}</p>
          </div>
        </div>

        {/* Daily Target Progress */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] relative z-10 backdrop-blur-md">
           <div className="flex justify-between items-end mb-4">
             <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Shift Progress</p>
               <h3 className="text-2xl font-black">₦{currentEarnings.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ ₦{target.toLocaleString()}</span></h3>
             </div>
             <div className="text-right">
                <p className="text-orange-500 font-black text-lg">{Math.round(progress)}%</p>
             </div>
           </div>
           <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-1000 relative shadow-[0_0_15px_rgba(234,88,12,0.3)]" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Online Status Toggle */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex justify-between items-center group active:scale-[0.98] transition-all">
          <div className="flex items-center">
            <div className={`w-3.5 h-3.5 rounded-full mr-4 ${isOnline ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-gray-300'} ring-4 ring-slate-50`}></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Fleet Connectivity</p>
              <p className={`font-black text-xl transition-colors ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                {isOnline ? 'Live in Abeokuta' : 'Shift Ended'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-20 h-10 rounded-full relative transition-all duration-500 overflow-hidden ${isOnline ? 'bg-green-100' : 'bg-slate-100'}`}
          >
            <div className={`absolute top-1 w-8 h-8 rounded-full shadow-lg transition-all duration-500 transform flex items-center justify-center ${isOnline ? 'translate-x-11 bg-green-500 text-white' : 'translate-x-1 bg-white text-slate-300'}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Main Rider Controls */}
      <div className="p-6 grid grid-cols-2 gap-4">
         <button className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all hover:border-orange-200 group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">📋</div>
            <span className="font-black text-[10px] text-slate-800 uppercase tracking-[0.15em]">Dispatch Log</span>
         </button>
         <button className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all hover:border-orange-200 group">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">💹</div>
            <span className="font-black text-[10px] text-slate-800 uppercase tracking-[0.15em]">Earnings</span>
         </button>
         <button className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all hover:border-orange-200 group">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">🔥</div>
            <span className="font-black text-[10px] text-slate-800 uppercase tracking-[0.15em]">Busy Areas</span>
         </button>
         <button className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center space-y-3 active:scale-95 transition-all hover:border-orange-200 group">
            <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm">⚙️</div>
            <span className="font-black text-[10px] text-slate-800 uppercase tracking-[0.15em]">Fleet Tools</span>
         </button>
      </div>

      {/* Guidelines Section */}
      <div className="px-6 mb-10">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[3rem] -z-1"></div>
           <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center">
              Abeokuta Fleet Conduct
              <span className="ml-2 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
           </h4>
           <div className="space-y-6">
              <div className="flex items-start group">
                 <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xs font-black text-slate-400 shadow-sm mr-4 shrink-0 group-hover:bg-orange-50 transition-colors">1</div>
                 <p className="text-xs text-slate-600 font-bold leading-relaxed pt-1">Keep your Níbbo jacket visible at all times while active.</p>
              </div>
              <div className="flex items-start group">
                 <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xs font-black text-slate-400 shadow-sm mr-4 shrink-0 group-hover:bg-orange-50 transition-colors">2</div>
                 <p className="text-xs text-slate-600 font-bold leading-relaxed pt-1">Never accept off-app cash payments. All tips go through the dashboard.</p>
              </div>
              <div className="flex items-start group">
                 <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xs font-black text-slate-400 shadow-sm mr-4 shrink-0 group-hover:bg-orange-50 transition-colors">3</div>
                 <p className="text-xs text-slate-600 font-bold leading-relaxed pt-1">Report any mechanical issues with your {riderData.vehicleType.toLowerCase()} immediately via support.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
