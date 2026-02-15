import { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, 
  Palette, 
  Zap, 
  FlaskConical, 
  RotateCcw, 
  Info,
  ChevronRight,
  Sun,
  Moon,
  Gauge,
  Thermometer
} from "lucide-react";

interface SettingsData {
  demoMode: boolean;
  darkMode: boolean;
  animationsEnabled: boolean;
  temperatureUnit: "celsius" | "fahrenheit";
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    demoMode: true,
    darkMode: false,
    animationsEnabled: true,
    temperatureUnit: "celsius"
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("hydrotech-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("hydrotech-settings", JSON.stringify(settings));
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings]);

  const toggleSetting = (key: keyof SettingsData) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleResetData = () => {
    localStorage.removeItem("hydrotech-data");
    setShowResetConfirm(false);
    alert("Demo data has been reset!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950 pb-24 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-6 max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <SettingsIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Customize your experience</p>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-cyan-200 dark:border-cyan-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">General</h2>
          </div>

          {/* Demo Mode Toggle */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Demo Mode</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Use simulated sensor data</div>
                </div>
              </div>
              <button
                onClick={() => toggleSetting("demoMode")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.demoMode ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.demoMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  {settings.darkMode ? (
                    <Moon className="w-5 h-5 text-indigo-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-indigo-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Toggle dark theme</div>
                </div>
              </div>
              <button
                onClick={() => toggleSetting("darkMode")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-cyan-200 dark:border-cyan-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Appearance</h2>
          </div>

          {/* Animations Toggle */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Animations</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Enable smooth transitions</div>
                </div>
              </div>
              <button
                onClick={() => toggleSetting("animationsEnabled")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.animationsEnabled ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.animationsEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Temperature Unit */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Temperature Unit</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {settings.temperatureUnit === "celsius" ? "Celsius (°C)" : "Fahrenheit (°F)"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSettings(prev => ({
                  ...prev,
                  temperatureUnit: prev.temperatureUnit === "celsius" ? "fahrenheit" : "celsius"
                }))}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                {settings.temperatureUnit === "celsius" ? "°C" : "°F"}
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-cyan-200 dark:border-cyan-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">Data</h2>
          </div>

          {/* Reset Demo Data */}
          <div className="p-4">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-red-900 dark:text-red-100">Reset Demo Data</div>
                  <div className="text-xs text-red-600 dark:text-red-400">Clear all stored readings</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-cyan-200 dark:border-cyan-800 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">About</h2>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">HydroTech</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Version 1.0.0</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Smart Water Purity App for monitoring water quality using advanced sensors. 
              Built for hackathon demo with real-time data visualization and community mapping.
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <div>Created by: Your Team Name</div>
                <div>Hackathon 2026</div>
                <div className="pt-2">
                  <a href="#" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                    View Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Reset Demo Data?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertTriangle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}