import { useState, useEffect } from 'react';
import { useSettings } from '@/react-app/contexts/SettingsContext';
import { Droplets, Activity, Beaker, Thermometer } from 'lucide-react';
import Logo, { WaterWaveIllustration } from '../components/Logo';

interface SensorData {
  ph: number;
  tds: number;
  turbidity: number;
  temperature: number;
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

  useEffect(() => {
    if (!settings.demoMode) return;

    setTimeout(() => setIsLoading(false), 1500);

    const interval = setInterval(() => {
      setSensorData({
        ph: +(7.0 + Math.random() * 0.5).toFixed(2),
        tds: +(240 + Math.random() * 20).toFixed(1),
        turbidity: +(2.0 + Math.random() * 1.0).toFixed(2),
        temperature: +(24 + Math.random() * 2).toFixed(1)
      });
      
      setQualityScore(80 + Math.floor(Math.random() * 15));
    }, 5000);

    return () => clearInterval(interval);
  }, [settings.demoMode]);

  const getQualityStatus = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', ring: 'ring-green-500' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', ring: 'ring-blue-500' };
    if (score >= 40) return { label: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', ring: 'ring-yellow-500' };
    return { label: 'Poor', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', ring: 'ring-red-500' };
  };

  const status = getQualityStatus(qualityScore);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Logo size="xl" />
          <div className="mt-6 flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading water quality data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="lg" />
          
          {settings.demoMode && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">Demo Mode</span>
            </div>
          )}
        </div>
      </div>

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