
import React, { useState } from 'react';
import { UserRole } from './types';
import Login from './components/Login';
import RoleSelection from './components/RoleSelection';
import RegistrationFlow from './components/RegistrationFlow';
import CustomerDashboard from './components/CustomerDashboard';
import RiderDashboard from './components/RiderDashboard';
import VendorDashboard from './components/VendorDashboard';
import OnboardingCarousel from './components/OnboardingCarousel';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'login' | 'carousel' | 'onboarding' | 'registration' | 'dashboard'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (phone: string) => {
    setUser({ phone });
    setCurrentStep('carousel');
  };

  const handleFinishCarousel = () => {
    setCurrentStep('onboarding');
  };

  const handleBackToLogin = () => {
    setUser(null);
    setCurrentStep('login');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentStep('registration');
  };

  const handleRegistrationComplete = (userData: any) => {
    setUser(userData);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setCurrentStep('login');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-xl flex flex-col relative overflow-hidden">
      {currentStep === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {currentStep === 'carousel' && (
        <OnboardingCarousel onFinish={handleFinishCarousel} onBack={handleBackToLogin} />
      )}

      {currentStep === 'onboarding' && (
        <RoleSelection 
          onSelect={handleRoleSelect} 
          onBack={() => setCurrentStep('carousel')} 
        />
      )}

      {currentStep === 'registration' && selectedRole && (
        <RegistrationFlow 
          role={selectedRole} 
          onBack={() => setCurrentStep('onboarding')}
          onComplete={handleRegistrationComplete}
        />
      )}

      {currentStep === 'dashboard' && user && (
        <div className="flex-1 flex flex-col relative">
          {user.role === UserRole.CUSTOMER && <CustomerDashboard user={user} onLogout={handleLogout} />}
          {user.role === UserRole.RIDER && <RiderDashboard user={user} onLogout={handleLogout} />}
          {user.role === UserRole.VENDOR && <VendorDashboard user={user} onLogout={handleLogout} />}
        </div>
      )}

      {/* Global WhatsApp Support */}
      <a 
        href={`https://wa.me/2348000000000?text=Hi Níbbo Support, I need help.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 transition-transform active:scale-90 hover:bg-green-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.131l.353.21c1.511.896 3.256 1.369 5.043 1.372 5.56 0 10.086-4.527 10.089-10.088.002-2.699-1.051-5.234-2.964-7.148-1.913-1.912-4.448-2.966-7.146-2.966-5.56 0-10.088 4.528-10.091 10.09-.001 1.888.522 3.731 1.514 5.342l.233.376-.993 3.633 3.722-.976z" />
        </svg>
      </a>
    </div>
  );
};

export default App;
