import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MobileMenu } from './navigation/MobileMenu';
import { UserAvatar } from './navigation/UserAvatar';
import { SearchBar } from './navigation/SearchBar';
import { NotificationButton } from './navigation/NotificationButton';
import { CreateContentButton } from './navigation/CreateContentButton';

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
            {user && <div className="hidden md:block"><SearchBar /></div>}
          </div>

          {/* Right section - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
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
                <CreateContentButton />
                <NotificationButton count={notifications} />
                <UserAvatar email={user?.email} onLogout={handleLogout} />
              </>
            )}
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="outline" className="ml-4">Log In</Button>
                </Link>
                <Button 
                  onClick={handleGetStarted}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isOpen}
        user={user}
        onLogout={handleLogout}
        onGetStarted={handleGetStarted}
      />
    </nav>
  );
};