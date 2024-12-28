import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { DashboardLayout } from "./components/layouts/DashboardLayout";

// Helper component to handle navigation visibility logic
const NavigationWrapper = () => {
  const { session } = useSession();
  const location = useLocation();
  const publicRoutes = ['/', '/login', '/signup', '/features', '/pricing'];
  
  // Only show navigation for authenticated users and non-public routes
  const shouldShowNavigation = session && !publicRoutes.includes(location.pathname);
  
  return shouldShowNavigation ? <Navigation /> : null;
};

// Helper component to wrap authenticated routes with DashboardLayout
const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSession();
  return session ? <DashboardLayout>{children}</DashboardLayout> : <Login />;
};

function App() {
  const { session } = useSession();

  return (
    <Router>
      <NavigationWrapper />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} /> {/* Using Login component for signup too */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Authenticated routes wrapped with DashboardLayout */}
        <Route path="/onboarding" element={<AuthenticatedRoute><Onboarding /></AuthenticatedRoute>} />
        <Route path="/dashboard" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
        <Route path="/social" element={<AuthenticatedRoute><SocialHub /></AuthenticatedRoute>} />
        <Route path="/social/create" element={<AuthenticatedRoute><SocialCreate /></AuthenticatedRoute>} />
        <Route path="/social/analytics" element={<AuthenticatedRoute><SocialAnalytics /></AuthenticatedRoute>} />
        <Route path="/learning" element={<AuthenticatedRoute><LearningCenter /></AuthenticatedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;