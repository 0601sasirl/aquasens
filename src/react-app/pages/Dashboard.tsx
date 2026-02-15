import { useState, useEffect } from "react";
import { Droplet, Thermometer, Activity, AlertTriangle, Wifi, WifiOff } from "lucide-react";

interface SensorData {
  ph: number;
  tds: number;
  temperature: number;
  timestamp: Date;
}

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>({
    ph: 7.2,
    tds: 150,
    temperature: 22.5,
    timestamp: new Date(),
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);

  useEffect(() => {
    const connectToESP32 = async () => {
      try {
        setIsConnected(true);
        
        const interval = setInterval(() => {
          const newData: SensorData = {
            ph: 6.5 + Math.random() * 2,
            tds: 100 + Math.random() * 200,
            temperature: 20 + Math.random() * 10,
            timestamp: new Date(),
          };
          
          setSensorData(newData);
          setHistoricalData(prev => [...prev.slice(-19), newData]);
        }, 2000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Failed to connect to ESP32:", error);
        setIsConnected(false);
      }
    };

    connectToESP32();
  }, []);

  const getStatus = (value: number, min: number, max: number, warnMin: number, warnMax: number) => {
    if (value >= min && value <= max) return "good";
    if (value >= warnMin && value <= warnMax) return "warning";
    return "danger";
  };

  const phStatus = getStatus(sensorData.ph, 6.5, 8.5, 6.0, 9.0);
  const tdsStatus = sensorData.tds <= 300 ? "good" : sensorData.tds <= 500 ? "warning" : "danger";
  const tempStatus = getStatus(sensorData.temperature, 15, 30, 10, 35);

  const hasWarnings = phStatus !== "good" || tdsStatus !== "good" || tempStatus !== "good";

  const getStatusColor = (status: string) => {
    if (status === "good") return "border-green-500 bg-green-50";
    if (status === "warning") return "border-yellow-500 bg-yellow-50";
    return "border-red-500 bg-red-50";
  };

  const getBadgeColor = (status: string) => {
    if (status === "good") return "bg-green-500 text-white";
    if (status === "warning") return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AquaSens Dashboard</h1>
            <p className="text-gray-500 mt-1">Real-time Water Quality Monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 text-green-500" />
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-md">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-red-500" />
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md">Disconnected</span>
              </>
            )}
          </div>
        </div>

        {/* Alert */}
        {hasWarnings && (
          <div className={`relative w-full rounded-lg border px-4 py-3 ${phStatus === "danger" || tdsStatus === "danger" || tempStatus === "danger" ? "border-red-500 bg-red-50 text-red-900" : "border-yellow-500 bg-yellow-50 text-yellow-900"}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div>
                <h5 className="mb-1 font-medium">Water Quality Alert</h5>
                <div className="text-sm">
                  {phStatus !== "good" && `pH levels ${phStatus === "danger" ? "critical" : "abnormal"} (${sensorData.ph.toFixed(2)}). `}
                  {tdsStatus !== "good" && `TDS levels ${tdsStatus === "danger" ? "too high" : "elevated"} (${sensorData.tds.toFixed(0)} ppm). `}
                  {tempStatus !== "good" && `Temperature ${tempStatus === "danger" ? "out of range" : "unusual"} (${sensorData.temperature.toFixed(1)}°C). `}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* pH Card */}
          <div className={`rounded-xl border-2 bg-white shadow p-6 ${getStatusColor(phStatus)}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">pH Level</h3>
              <Droplet className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold">{sensorData.ph.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Optimal: 6.5-8.5</p>
            <span className={`inline-block mt-3 px-2.5 py-0.5 text-xs font-semibold rounded-md ${getBadgeColor(phStatus)}`}>
              {phStatus === "good" ? "Good" : phStatus === "warning" ? "Warning" : "Critical"}
            </span>
          </div>

          {/* TDS Card */}
          <div className={`rounded-xl border-2 bg-white shadow p-6 ${getStatusColor(tdsStatus)}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">TDS (Total Dissolved Solids)</h3>
              <Activity className="h-5 w-5 text-cyan-500" />
            </div>
            <div className="text-3xl font-bold">{sensorData.tds.toFixed(0)} <span className="text-lg text-gray-500">ppm</span></div>
            <p className="text-xs text-gray-500 mt-1">Optimal: &lt;300 ppm</p>
            <span className={`inline-block mt-3 px-2.5 py-0.5 text-xs font-semibold rounded-md ${getBadgeColor(tdsStatus)}`}>
              {tdsStatus === "good" ? "Good" : tdsStatus === "warning" ? "Warning" : "Critical"}
            </span>
          </div>

          {/* Temperature Card */}
          <div className={`rounded-xl border-2 bg-white shadow p-6 ${getStatusColor(tempStatus)}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Temperature</h3>
              <Thermometer className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold">{sensorData.temperature.toFixed(1)} <span className="text-lg text-gray-500">°C</span></div>
            <p className="text-xs text-gray-500 mt-1">Optimal: 15-30°C</p>
            <span className={`inline-block mt-3 px-2.5 py-0.5 text-xs font-semibold rounded-md ${getBadgeColor(tempStatus)}`}>
              {tempStatus === "good" ? "Good" : tempStatus === "warning" ? "Warning" : "Critical"}
            </span>
          </div>
        </div>

        {/* Historical Chart */}
        <div className="rounded-xl border bg-white shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Historical Trends</h3>
          <p className="text-sm text-gray-500 mb-4">Last 20 readings from ESP32 sensor</p>
          <div className="h-64 flex items-end justify-around gap-1">
            {historicalData.length > 0 ? (
              historicalData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all"
                    style={{ height: `${(data.ph / 14) * 100}%` }}
                    title={`pH: ${data.ph.toFixed(2)}`}
                  />
                  <div 
                    className="w-full bg-cyan-500 rounded-t transition-all"
                    style={{ height: `${(data.tds / 1000) * 100}%` }}
                    title={`TDS: ${data.tds.toFixed(0)}`}
                  />
                  <div 
                    className="w-full bg-red-500 rounded-t transition-all"
                    style={{ height: `${(data.temperature / 50) * 100}%` }}
                    title={`Temp: ${data.temperature.toFixed(1)}°C`}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center w-full">Waiting for sensor data...</div>
            )}
          </div>
          <div className="flex justify-around mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>pH</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500 rounded"></div>
              <span>TDS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Temperature</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Last updated: {sensorData.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}