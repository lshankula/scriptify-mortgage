import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import ContentHub from "./pages/ContentHub";
import SocialHub from "./pages/SocialHub";
import SocialCreate from "./pages/social/SocialCreate";
import SocialPost from "./pages/social/SocialPost";
import SocialAnalytics from "./pages/social/SocialAnalytics";
import LearningCenter from "./pages/LearningCenter";
import { Navigation } from "./components/Navigation";
import { useSession } from "./hooks/useSession";

// Helper component to handle navigation visibility logic
const NavigationWrapper = () => {
  const { session } = useSession();
  const location = useLocation();
  const publicRoutes = ['/', '/login', '/signup', '/features', '/pricing'];
  
  // Only show navigation for authenticated users and non-public routes
  const shouldShowNavigation = session && !publicRoutes.includes(location.pathname);
  
  return shouldShowNavigation ? <Navigation /> : null;
};

function App() {
  const { session } = useSession();

  return (
    <Router>
      <NavigationWrapper />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/onboarding" element={session ? <Onboarding /> : <Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content" element={<ContentHub />} />
        <Route path="/social" element={<SocialHub />} />
        <Route path="/social/create" element={<SocialCreate />} />
        <Route path="/social/post/:id" element={<SocialPost />} />
        <Route path="/social/analytics" element={<SocialAnalytics />} />
        <Route path="/learning" element={session ? <LearningCenter /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
