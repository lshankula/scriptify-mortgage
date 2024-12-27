import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Plus, Bell, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserMenu } from './navigation/UserMenu';
import { MobileMenu } from './navigation/MobileMenu';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [notifications] = useState(3); // For demo purposes
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleGetStarted = async () => {
    if (user) {
      // If user is logged in, check if they have completed onboarding
      const { data: responses } = await supabase
        .from('onboarding_responses')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (responses && responses.length > 0) {
        navigate('/'); // User has completed onboarding
      } else {
        navigate('/onboarding'); // User needs to complete onboarding
      }
    } else {
      navigate('/signup'); // Not logged in, go to signup
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-xl text-primary">
              MortgageContent.ai
            </Link>
            {user && (
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search content..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {!user && (
              <>
                <Link to="/features" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                  Features
                </Link>
                <Link to="/pricing" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                  Pricing
                </Link>
              </>
            )}
            {user && (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-gray-600 hover:text-primary">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                  onClick={() => navigate('/social/create')}
                >
                  <Plus className="w-4 h-4" />
                  Create Content
                </Button>
                <button className="relative p-2 hover:bg-accent rounded-lg">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </>
            )}
            <UserMenu 
              user={user} 
              onLogout={handleLogout} 
              onGetStarted={handleGetStarted}
            />
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen}
        user={user}
        onLogout={handleLogout}
        onGetStarted={handleGetStarted}
      />
    </nav>
  );
};