import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Droplet, Thermometer, Activity, AlertTriangle, Wifi, WifiOff } from "lucide-react";

interface SensorData {
  ph: number;
  tds: number;
  temperature: number;
  timestamp: Date;
}

interface WaterQualityStatus {
  ph: "good" | "warning" | "danger";
  tds: "good" | "warning" | "danger";
  temperature: "good" | "warning" | "danger";
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

  const getStatus = (): WaterQualityStatus => {
    return {
      ph: sensorData.ph >= 6.5 && sensorData.ph <= 8.5 ? "good" : 
          sensorData.ph >= 6.0 && sensorData.ph <= 9.0 ? "warning" : "danger",
      tds: sensorData.tds <= 300 ? "good" : 
           sensorData.tds <= 500 ? "warning" : "danger",
      temperature: sensorData.temperature >= 15 && sensorData.temperature <= 30 ? "good" :
                   sensorData.temperature >= 10 && sensorData.temperature <= 35 ? "warning" : "danger",
    };
  };

  const status = getStatus();
  const hasWarnings = Object.values(status).some(s => s === "warning" || s === "danger");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AquaSens Dashboard</h1>
            <p className="text-gray-500 mt-1">Real-time Water Quality Monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 text-green-500" />
                <Badge variant="default" className="bg-green-500">Connected</Badge>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-red-500" />
                <Badge variant="destructive">Disconnected</Badge>
              </>
            )}
          </div>
        </div>

        {hasWarnings && (
          <Alert variant={status.ph === "danger" || status.tds === "danger" || status.temperature === "danger" ? "destructive" : "default"}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Water Quality Alert</AlertTitle>
            <AlertDescription>
              {status.ph !== "good" && `pH levels ${status.ph === "danger" ? "critical" : "abnormal"} (${sensorData.ph.toFixed(2)}). `}
              {status.tds !== "good" && `TDS levels ${status.tds === "danger" ? "too high" : "elevated"} (${sensorData.tds.toFixed(0)} ppm). `}
              {status.temperature !== "good" && `Temperature ${status.temperature === "danger" ? "out of range" : "unusual"} (${sensorData.temperature.toFixed(1)}°C). `}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={status.ph === "danger" ? "border-red-500" : status.ph === "warning" ? "border-yellow-500" : "border-green-500"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">pH Level</CardTitle>
              <Droplet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sensorData.ph.toFixed(2)}</div>
              <p className="text-xs text-gray-500 mt-1">Optimal: 6.5-8.5</p>
              <Badge 
                variant={status.ph === "good" ? "default" : "destructive"} 
                className={`mt-2 ${status.ph === "good" ? "bg-green-500" : status.ph === "warning" ? "bg-yellow-500" : ""}`}
              >
                {status.ph === "good" ? "Good" : status.ph === "warning" ? "Warning" : "Critical"}
              </Badge>
            </CardContent>
          </Card>

          <Card className={status.tds === "danger" ? "border-red-500" : status.tds === "warning" ? "border-yellow-500" : "border-green-500"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TDS (Total Dissolved Solids)</CardTitle>
              <Activity className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sensorData.tds.toFixed(0)} <span className="text-lg text-gray-500">ppm</span></div>
              <p className="text-xs text-gray-500 mt-1">Optimal: &lt;300 ppm</p>
              <Badge 
                variant={status.tds === "good" ? "default" : "destructive"} 
                className={`mt-2 ${status.tds === "good" ? "bg-green-500" : status.tds === "warning" ? "bg-yellow-500" : ""}`}
              >
                {status.tds === "good" ? "Good" : status.tds === "warning" ? "Warning" : "Critical"}
              </Badge>
            </CardContent>
          </Card>

          <Card className={status.temperature === "danger" ? "border-red-500" : status.temperature === "warning" ? "border-yellow-500" : "border-green-500"}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sensorData.temperature.toFixed(1)} <span className="text-lg text-gray-500">°C</span></div>
              <p className="text-xs text-gray-500 mt-1">Optimal: 15-30°C</p>
              <Badge 
                variant={status.temperature === "good" ? "default" : "destructive"} 
                className={`mt-2 ${status.temperature === "good" ? "bg-green-500" : status.temperature === "warning" ? "bg-yellow-500" : ""}`}
              >
                {status.temperature === "good" ? "Good" : status.temperature === "warning" ? "Warning" : "Critical"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historical Trends</CardTitle>
            <CardDescription>Last 20 readings from ESP32 sensor</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          Last updated: {sensorData.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}