import { useState } from 'react';
import { useSettings } from '@/react-app/contexts/SettingsContext';
import { Info, Droplets, Moon, Zap, Thermometer, Radio, X } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [showESP32Modal, setShowESP32Modal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Connect Real Sensors Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Connect Real Sensors
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Wire your pH, TDS, and Turbidity sensors to ESP32, then connect via Bluetooth or WiFi to see real-time water quality data.
              </p>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">App Preferences</h2>

          <div className="space-y-4">
            {/* Demo Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Demo Mode</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Show simulated sensor data
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ demoMode: !settings.demoMode })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.demoMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.demoMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enable dark theme
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Animations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enable UI animations
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.animationsEnabled ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.animationsEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Temperature Unit */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Thermometer className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Temperature Unit</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose your preferred unit
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateSettings({ temperatureUnit: 'celsius' })}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    settings.temperatureUnit === 'celsius'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                  }`}
                >
                  °C Celsius
                </button>
                <button
                  onClick={() => updateSettings({ temperatureUnit: 'fahrenheit' })}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    settings.temperatureUnit === 'fahrenheit'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                  }`}
                >
                  °F Fahrenheit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Actions</h2>
          
          <button
            onClick={() => setShowESP32Modal(true)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">Connect ESP32</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time sensor integration
                </p>
              </div>
            </div>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Configure →</span>
          </button>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">About</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">AquaSens v1.0</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Smart Water Purity Monitoring System
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor water quality in real-time with advanced sensor technology.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                © 2024 AquaSens. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ESP32 Connection Modal */}
      {showESP32Modal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Connect ESP32</h2>
                    <p className="text-sm text-blue-100">Real-time sensor integration</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowESP32Modal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-2 py-4 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 font-medium">
                <Radio className="w-4 h-4" />
                Bluetooth
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                WiFi
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Bluetooth Instructions:
                </h3>
                <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li>1. Make sure Bluetooth is enabled on your device</li>
                  <li>2. Power on your ESP32 with sensors</li>
                  <li>3. Click "Connect via Bluetooth" below</li>
                  <li>4. Select "ESP32" or "AquaSens" from the list</li>
                </ol>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3">
                <Radio className="w-5 h-5" />
                Connect via Bluetooth
              </button>

              <button
                onClick={() => setShowESP32Modal(false)}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-4 rounded-xl transition-colors"
              >
                Cancel
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                <Radio className="w-3 h-3" />
                Works on phones and tablets with Bluetooth
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}