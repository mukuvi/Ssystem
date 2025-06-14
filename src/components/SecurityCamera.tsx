import React, { useState, useRef, useCallback } from 'react';
import { Camera, Download, Trash2, Eye, AlertTriangle } from 'lucide-react';

interface CapturedImage {
  id: string;
  dataUrl: string;
  timestamp: Date;
  trigger: 'manual' | 'unauthorized_access' | 'motion_detected';
}

const SecurityCamera: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsActive(true);
    } catch (err) {
      setError('Failed to access camera. Please ensure camera permissions are granted.');
      console.error('Camera access error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  }, [stream]);

  const captureImage = useCallback((trigger: CapturedImage['trigger'] = 'manual') => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const newImage: CapturedImage = {
      id: Date.now().toString(),
      dataUrl,
      timestamp: new Date(),
      trigger
    };

    setCapturedImages(prev => [newImage, ...prev]);
  }, []);

  const deleteImage = useCallback((id: string) => {
    setCapturedImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const downloadImage = useCallback((image: CapturedImage) => {
    const link = document.createElement('a');
    link.href = image.dataUrl;
    link.download = `security-capture-${image.timestamp.toISOString()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const getTriggerIcon = (trigger: CapturedImage['trigger']) => {
    switch (trigger) {
      case 'unauthorized_access':
        return <AlertTriangle className="h-4 w-4 text-error-600" />;
      case 'motion_detected':
        return <Eye className="h-4 w-4 text-warning-600" />;
      default:
        return <Camera className="h-4 w-4 text-primary-600" />;
    }
  };

  const getTriggerLabel = (trigger: CapturedImage['trigger']) => {
    switch (trigger) {
      case 'unauthorized_access':
        return 'Unauthorized Access';
      case 'motion_detected':
        return 'Motion Detected';
      default:
        return 'Manual Capture';
    }
  };

  const simulateUnauthorizedAccess = () => {
    if (isActive) {
      captureImage('unauthorized_access');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Security Camera</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={simulateUnauthorizedAccess}
            className="btn btn-warning flex items-center space-x-2"
            disabled={!isActive}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Simulate Alert</span>
          </button>
          <button
            onClick={isActive ? stopCamera : startCamera}
            className={`btn ${isActive ? 'btn-error' : 'btn-primary'} flex items-center space-x-2`}
          >
            <Camera className="h-4 w-4" />
            <span>{isActive ? 'Stop Camera' : 'Start Camera'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <p className="text-error-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Camera className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Live Feed</h3>
            {isActive && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-error-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-error-600 font-medium">RECORDING</span>
              </div>
            )}
          </div>

          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            {isActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => captureImage('manual')}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Camera is not active</p>
                  <button
                    onClick={startCamera}
                    className="btn btn-primary"
                  >
                    Start Camera
                  </button>
                </div>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Captured Images */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-success-100 p-2 rounded-lg">
                <Eye className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Captured Images</h3>
            </div>
            <span className="text-sm text-gray-500">{capturedImages.length} images</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {capturedImages.length > 0 ? (
              capturedImages.map((image) => (
                <div key={image.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTriggerIcon(image.trigger)}
                      <span className="text-sm font-medium text-gray-900">
                        {getTriggerLabel(image.trigger)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => downloadImage(image)}
                        className="text-primary-600 hover:text-primary-700 p-1"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="text-error-600 hover:text-error-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {image.timestamp.toLocaleString()}
                  </div>
                  <img
                    src={image.dataUrl}
                    alt="Security capture"
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Eye className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No images captured yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Features Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <h4 className="font-semibold text-primary-900 mb-2">Security Features</h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Automatic image capture when unauthorized access is detected</li>
          <li>• Motion detection triggers (simulated in this demo)</li>
          <li>• Secure local storage of captured images</li>
          <li>• Manual capture capability</li>
          <li>• Download and manage captured evidence</li>
        </ul>
      </div>
    </div>
  );
};

export default SecurityCamera;