import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-heading font-bold text-primary">MortgageContent.ai</span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">Pricing</Link>
            {user ? (
              <>
                <span className="text-gray-600 px-3 py-2 text-sm font-medium">{user.email}</span>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/features"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              Pricing
            </Link>
            {user ? (
              <>
                <span className="block px-3 py-2 text-base font-medium text-gray-600">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  Log In
                </Link>
                <button
                  onClick={handleGetStarted}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};