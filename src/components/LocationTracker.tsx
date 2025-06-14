import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, RefreshCw } from 'lucide-react';

const LocationTracker: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: Date;
  } | null>(null);
  const [locationHistory, setLocationHistory] = useState<Array<{
    lat: number;
    lng: number;
    timestamp: Date;
    address?: string;
  }>>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date()
        };
        setCurrentLocation(newLocation);
        
        // Add to history
        setLocationHistory(prev => [
          {
            lat: newLocation.lat,
            lng: newLocation.lng,
            timestamp: newLocation.timestamp,
            address: 'Fetching address...'
          },
          ...prev.slice(0, 9) // Keep last 10 locations
        ]);
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const startTracking = () => {
    setIsTracking(true);
    getCurrentLocation();
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy <= 10) return 'text-success-600';
    if (accuracy <= 50) return 'text-warning-600';
    return 'text-error-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Location Tracking</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={getCurrentLocation}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={isTracking ? stopTracking : startTracking}
            className={`btn ${isTracking ? 'btn-error' : 'btn-primary'} flex items-center space-x-2`}
          >
            <Navigation className="h-4 w-4" />
            <span>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <p className="text-error-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Location */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Current Location</h3>
          </div>
          
          {currentLocation ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Latitude</label>
                  <p className="text-lg font-mono text-gray-900">{formatCoordinate(currentLocation.lat)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Longitude</label>
                  <p className="text-lg font-mono text-gray-900">{formatCoordinate(currentLocation.lng)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Accuracy</label>
                  <p className={`text-lg font-semibold ${getAccuracyColor(currentLocation.accuracy)}`}>
                    ±{Math.round(currentLocation.accuracy)}m
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="text-lg text-gray-900">{formatTime(currentLocation.timestamp)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Google Maps Link:</p>
                <a
                  href={`https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline text-sm break-all"
                >
                  https://www.google.com/maps?q={currentLocation.lat},{currentLocation.lng}
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No location data available</p>
              <button
                onClick={getCurrentLocation}
                className="btn btn-primary mt-4"
              >
                Get Current Location
              </button>
            </div>
          )}
        </div>

        {/* Location History */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-success-100 p-2 rounded-lg">
              <Clock className="h-6 w-6 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Location History</h3>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {locationHistory.length > 0 ? (
              locationHistory.map((location, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatTime(location.timestamp)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {location.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 font-mono">
                    {formatCoordinate(location.lat)}, {formatCoordinate(location.lng)}
                  </div>
                  {location.address && (
                    <div className="text-xs text-gray-500 mt-1">
                      {location.address}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No location history yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tracking Status */}
      {isTracking && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
            <p className="text-primary-700 font-medium">
              Location tracking is active. Your device location is being monitored.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;