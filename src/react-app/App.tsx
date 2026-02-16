import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/react-app/pages/Dashboard";
import Analytics from "./pages/Analytics";
import CommunityMap from "@/react-app/pages/CommunityMap";
import WaterGuide from "@/react-app/pages/WaterGuide";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import APIDocumentation from "./pages/APIDocumentation";
import Settings from "@/react-app/pages/Settings";
import Auth from "./pages/Auth";
import BottomNav from "@/react-app/components/BottomNav";
import OnboardingTutorial from "@/react-app/components/OnboardingTutorial";
import { SettingsProvider } from "@/react-app/contexts/SettingsContext";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('aquasens-user');
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/map" element={<CommunityMap />} />
            <Route path="/guide" element={<WaterGuide />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/api" element={<APIDocumentation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNav />
          <OnboardingTutorial />
        </div>
      </Router>
    </SettingsProvider>
  );
}