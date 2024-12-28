import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SocialHub from "./pages/social/SocialHub";
import SocialCreate from "./pages/social/SocialCreate";
import SocialPost from "./pages/social/SocialPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/social" element={<SocialHub />} />
        <Route path="/social/create" element={<SocialCreate />} />
        <Route path="/social/post/:id" element={<SocialPost />} />
      </Routes>
    </Router>
  );
}

export default App;