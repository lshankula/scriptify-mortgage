import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import SocialHub from "./pages/SocialHub";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} /> {/* Using Login component for signup too */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/social" element={<SocialHub />} />
      </Routes>
    </Router>
  );
}

export default App;