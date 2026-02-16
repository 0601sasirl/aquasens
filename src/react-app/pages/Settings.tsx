import { useState } from 'react';
import { useSettings } from '@/react-app/contexts/SettingsContext';
import { useESP32 } from '@/react-app/hooks/useESP32';
import { Moon, Sun, Droplets, Zap, Thermometer, RotateCcw, Info, Wifi } from 'lucide-react';
import ESP32ConnectionModal from '@/react-app/components/ESP32ConnectionModal';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { isConnected, connectionError, connect, disconnect, deviceName } = useESP32();
  const [isESP32ModalOpen, setIsESP32ModalOpen] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings({ [key]: !settings[key] });
  };

  const handleTemperatureUnitChange = (unit: 'celsius' | 'fahrenheit') => {
    updateSettings({ temperatureUnit: unit });
  };

  const handleResetDemo = () => {
    updateSettings({ demoMode: true });
  };

  const handleBluetoothConnect = async () => {
    await connect((data) => {
      console.log('Received sensor data:', data);
      // Turn off demo mode when real sensors connect
      updateSettings({ demoMode: false });
    });
  };

  const handleWiFiConnect = (ipAddress: string) => {
    console.log('WiFi connection to:', ipAddress);
    updateSettings({ demoMode: false });
    setIsESP32ModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your HydroTech experience
            </p>
          </div>

          {/* Hardware Connection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Hardware Connection
              </h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                isConnected 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isConnected 
                        ? 'bg-green-100 dark:bg-green-900/30' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      <Wifi className={`w-5 h-5 ${
                        isConnected 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        isConnected 
                          ? 'text-green-900 dark:text-green-100' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        ESP32 Sensors
                      </h3>
                      <p className={`text-sm ${
                        isConnected 
                          ? 'text-green-700 dark:text-green-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {isConnected ? `Connected: ${deviceName}` : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  {isConnected && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">Live</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => isConnected ? disconnect() : setIsESP32ModalOpen(true)}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all ${
                    isConnected
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                  }`}
                >
                  {isConnected ? 'Disconnect ESP32' : 'Connect ESP32 Hardware'}
                </button>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Connect Real Sensors</p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Wire your pH, TDS, and Turbidity sensors to ESP32, then connect via Bluetooth or WiFi to see real-time water quality data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                App Preferences
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Demo Mode */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Demo Mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isConnected ? 'Using real sensor data' : 'Show simulated sensor data'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('demoMode')}
                  disabled={isConnected}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.demoMode
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.demoMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dark Mode */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    {settings.darkMode ? (
                      <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable dark theme
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode
                      ? 'bg-purple-600 dark:bg-purple-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Animations */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Animations</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable UI animations
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('animationsEnabled')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.animationsEnabled
                      ? 'bg-green-600 dark:bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Temperature Unit */}
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Thermometer className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Temperature Unit</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose your preferred unit
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-11">
                  <button
                    onClick={() => handleTemperatureUnitChange('celsius')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      settings.temperatureUnit === 'celsius'
                        ? 'bg-orange-600 text-white dark:bg-orange-500'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    °C Celsius
                  </button>
                  <button
                    onClick={() => handleTemperatureUnitChange('fahrenheit')}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      settings.temperatureUnit === 'fahrenheit'
                        ? 'bg-orange-600 text-white dark:bg-orange-500'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    °F Fahrenheit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Actions
              </h2>
            </div>
            
            <div className="p-4">
              <button
                onClick={handleResetDemo}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Reset Demo Data
              </button>
            </div>
          </div>

          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                About
              </h2>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">HydroTech v1.0</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Smart Water Purity Monitoring System
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p>Monitor water quality in real-time with ESP32 sensors or simulated data.</p>
                <p className="mt-2">© 2024 HydroTech. All rights reserved.</p>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          {isConnected && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <strong>Real Sensors Active:</strong> Displaying live data from {deviceName}
              </p>
            </div>
          )}

          {settings.demoMode && !isConnected && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                <strong>Demo Mode Active:</strong> Showing simulated data. Connect ESP32 sensors to see live readings.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ESP32 Connection Modal */}
      <ESP32ConnectionModal
        isOpen={isESP32ModalOpen}
        onClose={() => setIsESP32ModalOpen(false)}
        onConnectBluetooth={handleBluetoothConnect}
        onConnectWiFi={handleWiFiConnect}
        isConnected={isConnected}
        connectionError={connectionError}
        deviceName={deviceName}
      />
    </>
  );
}