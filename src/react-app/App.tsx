import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/react-app/pages/Dashboard";
import CommunityMap from "@/react-app/pages/CommunityMap";
import WaterGuide from "@/react-app/pages/WaterGuide";
import Settings from "@/react-app/pages/Settings";
import BottomNav from "@/react-app/components/BottomNav";
import { SettingsProvider } from "@/react-app/contexts/SettingsContext";

export default function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<CommunityMap />} />
            <Route path="/guide" element={<WaterGuide />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <BottomNav />
        </div>
      </Router>
    </SettingsProvider>
  );
}