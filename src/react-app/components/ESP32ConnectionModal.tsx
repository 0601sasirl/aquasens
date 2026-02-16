// File: src/react-app/components/ESP32ConnectionModal.tsx

import { useState } from 'react';
import { Wifi, Bluetooth, Loader2, CheckCircle, AlertCircle, X, Droplets } from 'lucide-react';

interface ESP32ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectBluetooth: () => void;
  onConnectWiFi: (ipAddress: string) => void;
  isConnected: boolean;
  connectionError: string | null;
  deviceName: string | null;
}

export default function ESP32ConnectionModal({ 
  isOpen, 
  onClose,
  onConnectBluetooth,
  onConnectWiFi,
  isConnected,
  connectionError,
  deviceName
}: ESP32ConnectionModalProps) {
  const [connectionMethod, setConnectionMethod] = useState<'bluetooth' | 'wifi'>('bluetooth');
  const [ipAddress, setIpAddress] = useState('192.168.1.');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const handleBluetoothConnect = async () => {
    setIsConnecting(true);
    await onConnectBluetooth();
    setIsConnecting(false);
  };

  const handleWiFiConnect = async () => {
    setIsConnecting(true);
    // Simulate connection for demo
    setTimeout(() => {
      onConnectWiFi(ipAddress);
      setIsConnecting(false);
    }, 2000);
  };

  const handleClose = () => {
    setIsConnecting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Connect ESP32</h2>
              <p className="text-blue-100 text-sm">Real-time sensor integration</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Connection Method Tabs */}
          {!isConnected && (
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                onClick={() => setConnectionMethod('bluetooth')}
                className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                  connectionMethod === 'bluetooth'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Bluetooth className="w-4 h-4" />
                Bluetooth
              </button>
              <button
                onClick={() => setConnectionMethod('wifi')}
                className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                  connectionMethod === 'wifi'
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Wifi className="w-4 h-4" />
                WiFi
              </button>
            </div>
          )}

          {/* Status Display */}
          <div className="flex items-center justify-center">
            {isConnected ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <p className="text-green-600 dark:text-green-400 font-medium">Connected!</p>
                {deviceName && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Device: {deviceName}
                  </p>
                )}
              </div>
            ) : isConnecting ? (
              <div className="text-center">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-3" />
                <p className="text-blue-600 dark:text-blue-400 font-medium">Connecting...</p>
              </div>
            ) : connectionError ? (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                <p className="text-red-600 dark:text-red-400 font-medium">Connection failed</p>
                <p className="text-sm text-red-500 mt-2">{connectionError}</p>
              </div>
            ) : null}
          </div>

          {/* Bluetooth Connection */}
          {connectionMethod === 'bluetooth' && !isConnected && (
            <>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <Bluetooth className="w-4 h-4" />
                  Bluetooth Instructions:
                </h3>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>Make sure Bluetooth is enabled on your device</li>
                  <li>Power on your ESP32 with sensors</li>
                  <li>Click "Connect via Bluetooth" below</li>
                  <li>Select "ESP32" or "AquaSens" from the list</li>
                </ol>
              </div>

              <button
                onClick={handleBluetoothConnect}
                disabled={isConnecting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 
                         text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all 
                         font-medium shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <Bluetooth className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect via Bluetooth'}
              </button>
            </>
          )}

          {/* WiFi Connection */}
          {connectionMethod === 'wifi' && !isConnected && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ESP32 IP Address
                </label>
                <input
                  type="text"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="192.168.1.100"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                  disabled={isConnecting}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Find this in Arduino Serial Monitor
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  WiFi Instructions:
                </h3>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>Upload WiFi code to ESP32</li>
                  <li>ESP32 connects to your WiFi network</li>
                  <li>Check Serial Monitor for IP address</li>
                  <li>Enter IP above and connect</li>
                </ol>
              </div>

              <button
                onClick={handleWiFiConnect}
                disabled={isConnecting || !ipAddress}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 
                         text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all 
                         font-medium shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <Wifi className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect via WiFi'}
              </button>
            </>
          )}

          {/* Connected - Show Success */}
          {isConnected && (
            <div className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Real-time sensor data is now streaming!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live connection active</span>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-green-100 dark:bg-green-900/30 
                         text-green-700 dark:text-green-300 rounded-lg 
                         hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          )}

          {/* Cancel button (when not connected) */}
          {!isConnected && !isConnecting && (
            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 border border-gray-300 dark:border-gray-600 
                       text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 
                       dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {connectionMethod === 'bluetooth' ? (
              <>
                <Bluetooth className="w-4 h-4" />
                <span>Works on phones and tablets with Bluetooth</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4" />
                <span>Ensure ESP32 and device are on same WiFi</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}