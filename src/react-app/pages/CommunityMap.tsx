import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card } from '@/react-app/components/ui/card';
import { Droplet, MapPin, Users, AlertTriangle, Search, X, Layers, Plus, CheckCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WaterReport {
  id: number;
  lat: number;
  lng: number;
  score: number;
  reporter: string;
  timestamp: string;
  ph: number;
  tds: number;
  turbidity: number;
  temperature: number;
}

// Mock data for demo
const mockReports: WaterReport[] = [
  { id: 1, lat: 37.7749, lng: -122.4194, score: 85, reporter: 'Sarah M.', timestamp: '2 hours ago', ph: 7.2, tds: 180, turbidity: 2.5, temperature: 23 },
  { id: 2, lat: 37.7849, lng: -122.4094, score: 72, reporter: 'John D.', timestamp: '5 hours ago', ph: 7.8, tds: 320, turbidity: 3.2, temperature: 25 },
  { id: 3, lat: 37.7649, lng: -122.4294, score: 45, reporter: 'Amy L.', timestamp: '1 day ago', ph: 6.2, tds: 520, turbidity: 6.1, temperature: 28 },
  { id: 4, lat: 37.7549, lng: -122.4394, score: 91, reporter: 'Mike R.', timestamp: '3 hours ago', ph: 7.0, tds: 150, turbidity: 1.8, temperature: 22 },
];

function MapController() {
  const map = useMap();
  
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  
  return null;
}

function createCustomIcon(score: number) {
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 20px ${color}80;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: markerPulse 2s ease-in-out infinite;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">${score}</div>
      </div>
      <style>
        @keyframes markerPulse {
          0%, 100% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.1); }
        }
      </style>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export default function CommunityMap() {
  const [reports, setReports] = useState<WaterReport[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedReport, setSelectedReport] = useState<WaterReport | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const center: [number, number] = [37.7749, -122.4194];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Safe to Drink';
    if (score >= 50) return 'Washing Only';
    return 'Unsafe';
  };

  const handleMarkLocation = () => {
    // Simulate getting current location and latest reading
    const newReport: WaterReport = {
      id: reports.length + 1,
      lat: 37.7749 + (Math.random() - 0.5) * 0.02,
      lng: -122.4194 + (Math.random() - 0.5) * 0.02,
      score: Math.floor(Math.random() * 100),
      reporter: 'You',
      timestamp: 'Just now',
      ph: 6.5 + Math.random() * 2,
      tds: 100 + Math.random() * 200,
      turbidity: 1 + Math.random() * 4,
      temperature: 20 + Math.random() * 10,
    };

    setReports([...reports, newReport]);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950 pb-24 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 -left-20 w-60 h-60 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/50">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Water Quality Map
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Community reports nearby</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-cyan-200 dark:border-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Stats & Controls */}
        <div className="flex gap-4">
          <Card className="flex-1 p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-cyan-200 dark:border-cyan-800">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <div>
                <div className="text-2xl font-bold">{reports.length}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Reports</div>
              </div>
            </div>
          </Card>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              showHeatmap
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                : 'bg-white/70 dark:bg-slate-900/70 text-gray-700 dark:text-gray-300 border border-cyan-200 dark:border-cyan-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Heatmap
            </div>
          </button>
        </div>

        {/* Map */}
        <Card className="overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-cyan-200 dark:border-cyan-800 shadow-xl relative">
          {showHeatmap && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-yellow-500/20 to-green-500/20 z-10 pointer-events-none backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Heatmap Overlay Active
                </div>
              </div>
            </div>
          )}
          <div className="h-80 w-full">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="rounded-lg"
            >
              <MapController />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {reports.map((report) => (
                <Marker
                  key={report.id}
                  position={[report.lat, report.lng]}
                  icon={createCustomIcon(report.score)}
                  eventHandlers={{
                    click: () => setSelectedReport(report)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <div className={`text-lg font-bold ${getScoreColor(report.score)}`}>
                        Score: {report.score}/100
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        by {report.reporter}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {report.timestamp}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Card>

        {/* Floating Action Button */}
        <button
          onClick={handleMarkLocation}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 active:scale-95 transition-all flex items-center justify-center z-20"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Recent Reports */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Recent Reports
          </h2>
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => (
              <Card
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="p-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${report.score >= 80 ? 'bg-green-500/10' : report.score >= 50 ? 'bg-yellow-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                      <Droplet className={`w-6 h-6 ${getScoreColor(report.score)}`} />
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${getScoreColor(report.score)}`}>
                        {report.score}/100
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        by {report.reporter} • {report.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sheet for Report Details */}
      {selectedReport && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-t-3xl w-full max-w-md mx-auto p-6 space-y-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>

            {/* Score Badge */}
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-4xl font-bold ${getScoreColor(selectedReport.score)}`}>
                  {selectedReport.score}/100
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Purity Score
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl ${getScoreBg(selectedReport.score)} text-white font-semibold shadow-lg`}>
                {getScoreLabel(selectedReport.score)}
              </div>
            </div>

            {/* Sensor Data Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                <div className="text-xs text-gray-600 dark:text-gray-400">pH Level</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedReport.ph.toFixed(2)}</div>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-xl">
                <div className="text-xs text-gray-600 dark:text-gray-400">TDS</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{Math.round(selectedReport.tds)} ppm</div>
              </div>
              <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl">
                <div className="text-xs text-gray-600 dark:text-gray-400">Turbidity</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedReport.turbidity.toFixed(1)} NTU</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl">
                <div className="text-xs text-gray-600 dark:text-gray-400">Temperature</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{selectedReport.temperature.toFixed(1)}°C</div>
              </div>
            </div>

            {/* Reporter Info */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400">Reported by</div>
              <div className="font-semibold text-gray-900 dark:text-white">{selectedReport.reporter}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selectedReport.timestamp}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => alert('Report error functionality')}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Report Error
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Location marked successfully!</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            transform: translate(-50%, -100%);
          }
          to {
            transform: translate(-50%, 0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}