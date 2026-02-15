import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/react-app/pages/Dashboard";

// Temporary placeholder pages
function CommunityMap() {
  return <div style={{ padding: '20px' }}><h1>CommunityMap (temp)</h1></div>;
}

function WaterGuide() {
  return <div style={{ padding: '20px' }}><h1>WaterGuide (temp)</h1></div>;
}

function Settings() {
  return <div style={{ padding: '20px' }}><h1>Settings (temp)</h1></div>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<CommunityMap />} />
        <Route path="/guide" element={<WaterGuide />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}