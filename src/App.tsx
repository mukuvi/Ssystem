import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Camera, Lock, Smartphone, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LocationTracker from './components/LocationTracker';
import SecurityCamera from './components/SecurityCamera';
import SecurityLogs from './components/SecurityLogs';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLocked, setIsLocked] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState({
    isOnline: true,
    batteryLevel: 85,
    lastSeen: new Date(),
    location: { lat: 40.7128, lng: -74.0060 }
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'camera', label: 'Security Cam', icon: Camera },
    { id: 'logs', label: 'Security Logs', icon: Eye },
    { id: 'settings', label: 'Settings', icon: Lock }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard deviceStatus={deviceStatus} />;
      case 'location':
        return <LocationTracker />;
      case 'camera':
        return <SecurityCamera />;
      case 'logs':
        return <SecurityLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard deviceStatus={deviceStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PhoneGuard</h1>
                <p className="text-sm text-gray-500">Device Security & Tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${deviceStatus.isOnline ? 'bg-success-500' : 'bg-error-500'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {deviceStatus.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`btn ${isLocked ? 'btn-error' : 'btn-success'} flex items-center space-x-2`}
              >
                <Lock className="h-4 w-4" />
                <span>{isLocked ? 'Unlock' : 'Lock'} Device</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;