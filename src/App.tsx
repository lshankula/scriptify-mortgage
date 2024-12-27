import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import SocialHub from "./pages/SocialHub";
import SocialCreate from "./pages/social/SocialCreate";
import SocialAnalytics from "./pages/social/SocialAnalytics";
import LearningCenter from "./pages/LearningCenter";
import { Navigation } from "./components/Navigation";
import { useSession } from "./hooks/useSession";

function App() {
  const { session } = useSession();

  return (
    <Router>
      {session && <Navigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} /> {/* Using Login component for signup too */}
        <Route path="/onboarding" element={session ? <Onboarding /> : <Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={session ? <LearningCenter /> : <Login />} />
        <Route path="/social" element={<SocialHub />} />
        <Route path="/social/create" element={<SocialCreate />} />
        <Route path="/social/analytics" element={<SocialAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;