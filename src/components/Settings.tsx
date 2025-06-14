import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, MapPin, Camera, Lock, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    autoLock: true,
    lockTimeout: 5,
    unauthorizedAccessAlert: true,
    locationTracking: true,
    locationFrequency: 30,
    highAccuracyMode: true,
    autoCapture: true,
    motionDetection: true,
    imageQuality: 'high',
    emailNotifications: true,
    pushNotifications: true,
    criticalAlertsOnly: false,
    dataRetention: 30,
    encryptData: true,
    deviceName: 'My Phone',
    ownerEmail: 'owner@example.com'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button
          onClick={saveSettings}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Auto Lock</label>
                <p className="text-sm text-gray-600">Automatically lock device when unauthorized access is detected</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoLock}
                  onChange={(e) => handleSettingChange('autoLock', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">Lock Timeout (minutes)</label>
              <select
                value={settings.lockTimeout}
                onChange={(e) => handleSettingChange('lockTimeout', parseInt(e.target.value))}
                className="input"
              >
                <option value={1}>1 minute</option>
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Unauthorized Access Alerts</label>
                <p className="text-sm text-gray-600">Get notified when someone tries to access your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.unauthorizedAccessAlert}
                  onChange={(e) => handleSettingChange('unauthorizedAccessAlert', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Location Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-success-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Location Tracking</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Enable Location Tracking</label>
                <p className="text-sm text-gray-600">Track device location for theft recovery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.locationTracking}
                  onChange={(e) => handleSettingChange('locationTracking', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">Update Frequency (seconds)</label>
              <select
                value={settings.locationFrequency}
                onChange={(e) => handleSettingChange('locationFrequency', parseInt(e.target.value))}
                className="input"
                disabled={!settings.locationTracking}
              >
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">High Accuracy Mode</label>
                <p className="text-sm text-gray-600">Use GPS for more precise location (uses more battery)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highAccuracyMode}
                  onChange={(e) => handleSettingChange('highAccuracyMode', e.target.checked)}
                  disabled={!settings.locationTracking}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Camera Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-warning-100 p-2 rounded-lg">
              <Camera className="h-6 w-6 text-warning-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Security Camera</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Auto Capture</label>
                <p className="text-sm text-gray-600">Automatically take photos when unauthorized access is detected</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoCapture}
                  onChange={(e) => handleSettingChange('autoCapture', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Motion Detection</label>
                <p className="text-sm text-gray-600">Trigger camera when motion is detected</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.motionDetection}
                  onChange={(e) => handleSettingChange('motionDetection', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-900 mb-2">Image Quality</label>
              <select
                value={settings.imageQuality}
                onChange={(e) => handleSettingChange('imageQuality', e.target.value)}
                className="input"
              >
                <option value="low">Low (faster)</option>
                <option value="medium">Medium</option>
                <option value="high">High (better quality)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-error-100 p-2 rounded-lg">
              <Bell className="h-6 w-6 text-error-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Email Notifications</label>
                <p className="text-sm text-gray-600">Receive security alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Push Notifications</label>
                <p className="text-sm text-gray-600">Receive instant alerts on your devices</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Critical Alerts Only</label>
                <p className="text-sm text-gray-600">Only receive notifications for high-priority events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.criticalAlertsOnly}
                  onChange={(e) => handleSettingChange('criticalAlertsOnly', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Device Information */}
        <div className="card lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <SettingsIcon className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Device Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-900 mb-2">Device Name</label>
              <input
                type="text"
                value={settings.deviceName}
                onChange={(e) => handleSettingChange('deviceName', e.target.value)}
                className="input"
                placeholder="Enter device name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-900 mb-2">Owner Email</label>
              <input
                type="email"
                value={settings.ownerEmail}
                onChange={(e) => handleSettingChange('ownerEmail', e.target.value)}
                className="input"
                placeholder="Enter owner email"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-900 mb-2">Data Retention (days)</label>
              <select
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                className="input"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900">Encrypt Data</label>
                <p className="text-sm text-gray-600">Encrypt all stored data for security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.encryptData}
                  onChange={(e) => handleSettingChange('encryptData', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lock className="h-5 w-5 text-warning-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-warning-900 mb-1">Important Security Notice</h4>
            <p className="text-sm text-warning-700">
              This application is designed for legitimate device security and theft protection purposes only. 
              Ensure you have proper authorization before installing security software on any device. 
              All captured data is stored locally and encrypted for your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;