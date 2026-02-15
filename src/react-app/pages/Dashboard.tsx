import { useState, useEffect } from "react";
import { Droplet, Thermometer, Activity, AlertTriangle, Wifi, WifiOff, Waves, Beaker } from "lucide-react";

interface SensorData {
  ph: number;
  tds: number;
  turbidity: number;
  temperature: number;
  timestamp: Date;
}

interface PurityResult {
  score: number;
  status: "safe" | "moderate" | "unsafe";
  label: string;
}

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    ph: 7.2,
    tds: 150,
    turbidity: 3.5,
    temperature: 22.5,
    timestamp: new Date(),
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [demoMode] = useState(true); // We'll connect this to Settings later

  useEffect(() => {
    if (demoMode) {
      const connectToDemo = async () => {
        setIsConnected(true);
        
        const interval = setInterval(() => {
          const newData: SensorData = {
            ph: 6.5 + Math.random() * 2,
            tds: 100 + Math.random() * 200,
            turbidity: 1 + Math.random() * 4,
            temperature: 20 + Math.random() * 10,
            timestamp: new Date(),
          };
          
          setSensorData(newData);
          setHistoricalData(prev => [...prev.slice(-19), newData]);
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
      };

      connectToDemo();
    }
  }, [demoMode]);

  const calculatePurity = (): PurityResult => {
    let score = 100;
    
    // pH penalties
    if (sensorData.ph < 6.5 || sensorData.ph > 8.5) {
      score -= 30;
    } else if (sensorData.ph < 6.0 || sensorData.ph > 9.0) {
      score -= 50;
    }
    
    // TDS penalties
    if (sensorData.tds > 500) {
      score -= 40;
    } else if (sensorData.tds > 300) {
      score -= 20;
    }
    
    // Turbidity penalties
    if (sensorData.turbidity > 5) {
      score -= 40;
    } else if (sensorData.turbidity > 3) {
      score -= 15;
    }
    
    // Temperature penalties
    if (sensorData.temperature < 15 || sensorData.temperature > 30) {
      score -= 10;
    }
    
    score = Math.max(0, Math.min(100, score));
    
    let status: "safe" | "moderate" | "unsafe";
    let label: string;
    
    if (score >= 80) {
      status = "safe";
      label = "SAFE TO DRINK";
    } else if (score >= 50) {
      status = "moderate";
      label = "WASHING ONLY";
    } else {
      status = "unsafe";
      label = "UNSAFE";
    }
    
    return { score, status, label };
  };

  const purity = calculatePurity();

  const getStatusColor = (status: string) => {
    if (status === "safe") return "text-green-500";
    if (status === "moderate") return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusBg = (status: string) => {
    if (status === "safe") return "bg-green-500";
    if (status === "moderate") return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleStartTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950 pb-24 overflow-hidden relative">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-36 h-36 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-44 h-44 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 p-6 max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              HydroTech
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Smart Water Purity</p>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 text-green-500 animate-pulse" />
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-green-500/50">
                  {demoMode ? "Demo" : "Connected"}
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-red-500" />
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Disconnected</span>
              </>
            )}
          </div>
        </div>

        {/* Circular Purity Gauge */}
        <div className="relative">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-cyan-200 dark:border-cyan-800">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                {/* Circular progress */}
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - purity.score / 100)}`}
                    className={`${
                      purity.status === "safe" ? "text-green-500" :
                      purity.status === "moderate" ? "text-yellow-500" :
                      "text-red-500"
                    } transition-all duration-1000 ease-out drop-shadow-lg`}
                    strokeLinecap="round"
                    style={{
                      filter: `drop-shadow(0 0 8px ${
                        purity.status === "safe" ? "#10b981" :
                        purity.status === "moderate" ? "#f59e0b" :
                        "#ef4444"
                      })`
                    }}
                  />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-5xl font-bold ${getStatusColor(purity.status)} transition-all duration-500`}>
                    {Math.round(purity.score)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Purity Score</div>
                </div>
              </div>
              
              {/* Status label */}
              <div className="mt-6 text-center">
                <div className={`text-2xl font-bold ${getStatusColor(purity.status)} transition-all duration-500`}>
                  {purity.label}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usability Status Card */}
        <div className={`rounded-3xl p-6 shadow-2xl border-2 transition-all duration-500 ${
          purity.status === "safe" 
            ? "bg-green-50 dark:bg-green-900/20 border-green-500 shadow-green-500/50" 
            : purity.status === "moderate"
            ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 shadow-yellow-500/50"
            : "bg-red-50 dark:bg-red-900/20 border-red-500 shadow-red-500/50"
        } ${isTesting ? "animate-pulse" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${getStatusBg(purity.status)} flex items-center justify-center shadow-lg`}>
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Water Status</div>
                <div className={`text-2xl font-bold ${getStatusColor(purity.status)}`}>
                  {purity.label}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Grid 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          {/* pH Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">pH Level</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">
              {sensorData.ph.toFixed(2)}
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(sensorData.ph / 14) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal: 6.5-8.5</div>
          </div>

          {/* TDS Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-cyan-200 dark:border-cyan-800 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">TDS</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">
              {Math.round(sensorData.tds)}
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((sensorData.tds / 500) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">ppm</div>
          </div>

          {/* Turbidity Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-teal-200 dark:border-teal-800 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Waves className="w-5 h-5 text-teal-500" />
              </div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Turbidity</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">
              {sensorData.turbidity.toFixed(1)}
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((sensorData.turbidity / 10) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">NTU</div>
          </div>

          {/* Temperature Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-orange-200 dark:border-orange-800 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Temperature</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">
              {sensorData.temperature.toFixed(1)}
            </div>
            <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(sensorData.temperature / 50) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">°C</div>
          </div>
        </div>

        {/* Start Test Button */}
        <button
          onClick={handleStartTest}
          disabled={isTesting}
          className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all duration-300 ${
            isTesting 
              ? "bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse shadow-cyan-500/50" 
              : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 active:scale-95 shadow-blue-500/50"
          }`}
        >
          {isTesting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Testing Water...
            </div>
          ) : (
            "Start Water Test"
          )}
        </button>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Last updated: {sensorData.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}