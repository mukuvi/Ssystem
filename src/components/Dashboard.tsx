import React from 'react';
import { Smartphone, Battery, MapPin, Clock, Wifi, Shield } from 'lucide-react';

interface DashboardProps {
  deviceStatus: {
    isOnline: boolean;
    batteryLevel: number;
    lastSeen: Date;
    location: { lat: number; lng: number };
  };
}

const Dashboard: React.FC<DashboardProps> = ({ deviceStatus }) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-success-600';
    if (level > 20) return 'text-warning-600';
    return 'text-error-600';
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Device Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary-600" />
          <span className="text-sm font-medium text-primary-600">Protected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Device Status Card */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Device Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status</span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${deviceStatus.isOnline ? 'bg-success-500' : 'bg-error-500'}`}></div>
                <span className={`font-medium ${deviceStatus.isOnline ? 'text-success-600' : 'text-error-600'}`}>
                  {deviceStatus.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Connection</span>
              <div className="flex items-center space-x-1">
                <Wifi className="h-4 w-4 text-success-600" />
                <span className="text-success-600 font-medium">Strong</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battery Status Card */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-warning-100 p-2 rounded-lg">
              <Battery className="h-6 w-6 text-warning-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Battery</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Level</span>
              <span className={`font-bold text-xl ${getBatteryColor(deviceStatus.batteryLevel)}`}>
                {deviceStatus.batteryLevel}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  deviceStatus.batteryLevel > 50 ? 'bg-success-500' :
                  deviceStatus.batteryLevel > 20 ? 'bg-warning-500' : 'bg-error-500'
                }`}
                style={{ width: `${deviceStatus.batteryLevel}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-success-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Latitude</span>
              <span className="font-medium text-gray-900">{deviceStatus.location.lat.toFixed(6)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Longitude</span>
              <span className="font-medium text-gray-900">{deviceStatus.location.lng.toFixed(6)}</span>
            </div>
          </div>
        </div>

        {/* Last Seen Card */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Last Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Seen</span>
              <span className="font-medium text-gray-900">{formatLastSeen(deviceStatus.lastSeen)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-gray-900">
                {deviceStatus.lastSeen.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Security Status */}
        <div className="card md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Security Features</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Location Tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Security Camera</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Unauthorized Access Detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Remote Lock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;