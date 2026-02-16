import { useState, useEffect } from 'react';
import { useSettings } from '@/react-app/contexts/SettingsContext';
import { Droplets, Activity, Beaker, Thermometer, AlertTriangle, Bell, BellOff, Download } from 'lucide-react';
import Logo, { WaterWaveIllustration } from '../components/Logo';
import { generateWaterQualityReport } from '../lib/exportReport';

interface SensorData {
  ph: number;
  tds: number;
  turbidity: number;
  temperature: number;
}

interface Alert {
  id: string;
  timestamp: Date;
  type: 'ph' | 'tds' | 'turbidity' | 'temperature';
  message: string;
  severity: 'warning' | 'danger';
}

export default function Dashboard() {
  const { settings } = useSettings();
  const [sensorData, setSensorData] = useState<SensorData>({
    ph: 7.2,
    tds: 245,
    turbidity: 2.3,
    temperature: 25
  });
  const [qualityScore, setQualityScore] = useState(85);
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const checkWaterSafety = (data: SensorData) => {
    const newAlerts: Alert[] = [];

    if (data.ph < 6.5 || data.ph > 8.5) {
      newAlerts.push({
        id: `ph-${Date.now()}`,
        timestamp: new Date(),
        type: 'ph',
        message: `pH level ${data.ph} is outside safe range (6.5-8.5)`,
        severity: data.ph < 6.0 || data.ph > 9.0 ? 'danger' : 'warning'
      });
    }

    if (data.tds > 300) {
      newAlerts.push({
        id: `tds-${Date.now()}`,
        timestamp: new Date(),
        type: 'tds',
        message: `TDS level ${data.tds} ppm exceeds safe limit (300 ppm)`,
        severity: data.tds > 500 ? 'danger' : 'warning'
      });
    }

    if (data.turbidity > 5) {
      newAlerts.push({
        id: `turbidity-${Date.now()}`,
        timestamp: new Date(),
        type: 'turbidity',
        message: `Water turbidity ${data.turbidity} NTU is too high (>5 NTU)`,
        severity: data.turbidity > 10 ? 'danger' : 'warning'
      });
    }

    if (data.temperature < 15 || data.temperature > 25) {
      newAlerts.push({
        id: `temp-${Date.now()}`,
        timestamp: new Date(),
        type: 'temperature',
        message: `Temperature ${data.temperature}°C is outside normal range (15-25°C)`,
        severity: 'warning'
      });
    }

    return newAlerts;
  };

  useEffect(() => {
    if (!settings.demoMode) return;

    setTimeout(() => setIsLoading(false), 1500);

    const interval = setInterval(() => {
      const randomEvent = Math.random();
      const newData = {
        ph: randomEvent < 0.1 ? +(5.5 + Math.random() * 1).toFixed(2) : +(7.0 + Math.random() * 0.5).toFixed(2),
        tds: randomEvent < 0.1 ? +(350 + Math.random() * 150).toFixed(1) : +(240 + Math.random() * 20).toFixed(1),
        turbidity: randomEvent < 0.1 ? +(6.0 + Math.random() * 4).toFixed(2) : +(2.0 + Math.random() * 1.0).toFixed(2),
        temperature: +(24 + Math.random() * 2).toFixed(1)
      };

      setSensorData(newData);

      const newAlerts = checkWaterSafety(newData);
      if (newAlerts.length > 0 && alertsEnabled) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
        
        if (Notification.permission === 'granted') {
          new Notification('⚠️ Water Quality Alert', {
            body: newAlerts[0].message,
            icon: '/favicon.ico'
          });
        }
      }

      let score = 100;
      if (newData.ph < 6.5 || newData.ph > 8.5) score -= 20;
      if (newData.tds > 300) score -= 20;
      if (newData.turbidity > 5) score -= 20;
      if (newData.temperature < 15 || newData.temperature > 25) score -= 10;
      setQualityScore(Math.max(0, score));
    }, 5000);

    return () => clearInterval(interval);
  }, [settings.demoMode, alertsEnabled]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const getQualityStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', ring: 'ring-green-500' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', ring: 'ring-blue-500' };
    if (score >= 40) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', ring: 'ring-yellow-500' };
    return { label: 'Poor', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', ring: 'ring-red-500' };
  };

  const status = getQualityStatus(qualityScore);
  const hasActiveAlerts = alerts.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Logo size="xl" />
          
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
          
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">Loading water quality data...</p>
          
          <div className="mt-4 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="lg" />
          
          <div className="flex items-center gap-3">
            {settings.demoMode && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">Demo Mode</span>
              </div>
            )}
            
            <button
              onClick={() => {
                generateWaterQualityReport({
                  sensorData,
                  qualityScore,
                  timestamp: new Date(),
                  alerts: alerts.length,
                  deviceName: settings.demoMode ? 'Demo Mode' : 'ESP32 Sensor'
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button
              onClick={() => setShowAlerts(!showAlerts)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {alertsEnabled ? (
                <Bell className={`w-6 h-6 ${hasActiveAlerts ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`} />
              ) : (
                <BellOff className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              )}
              {hasActiveAlerts && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {showAlerts && (
          <div className="absolute right-4 top-16 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Alerts ({alerts.length})
              </h3>
              <button
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {alertsEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <Droplets className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No alerts. Water quality is safe!</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 ${
                      alert.severity === 'danger'
                        ? 'bg-red-50 dark:bg-red-900/20'
                        : 'bg-yellow-50 dark:bg-yellow-900/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          alert.severity === 'danger'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {alerts.length > 0 && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50">
                <button
                  onClick={() => setAlerts([])}
                  className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Clear all alerts
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {hasActiveAlerts && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <p className="font-medium">
              ⚠️ Water quality alert: {alerts[0].message}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Water Quality Status</h2>
              <p className="text-gray-600 dark:text-gray-400">Real-time monitoring dashboard</p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - qualityScore / 100)}`}
                    className={`${status.color} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-6xl font-bold ${status.color} mb-2`}>
                    {qualityScore}
                  </div>
                  <div className={`text-sm font-semibold ${status.color} uppercase tracking-wider mb-1`}>
                    {status.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Quality Score</div>
                </div>

                <div className={`absolute -top-4 -right-4 p-3 ${status.bg} rounded-full ${status.ring} ring-2 ring-offset-2 shadow-lg animate-bounce`}>
                  <Droplets className={`w-6 h-6 ${status.color}`} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sensorData.ph}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">pH Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sensorData.tds}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">TDS (ppm)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sensorData.turbidity}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Turbidity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{sensorData.temperature}°</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Temp (°C)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <Beaker className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">pH Level</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Acidity/Alkalinity</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{sensorData.ph}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 6.5-8.5</div>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${((sensorData.ph - 6) / (9 - 6)) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Within safe range</span>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">TDS Level</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Dissolved Solids</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{sensorData.tds}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">ppm</div>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(sensorData.tds / 500) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Excellent quality</span>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Turbidity</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Water Clarity</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{sensorData.turbidity}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">NTU</div>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((sensorData.turbidity / 10) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Crystal clear</span>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl group-hover:scale-110 transition-transform">
                    <Thermometer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Temperature</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Water Temperature</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{sensorData.temperature}°</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Celsius</div>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(sensorData.temperature / 40) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Activity className="w-4 h-4" />
                <span>Optimal range</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 opacity-30">
          <WaterWaveIllustration />
        </div>
      </div>
    </div>
  );
}