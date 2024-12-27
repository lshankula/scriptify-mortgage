import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserMenuProps {
  user: any;
  onLogout: () => void;
  onGetStarted: () => void;
  isMobile?: boolean;
}

export const UserMenu = ({ user, onLogout, onGetStarted, isMobile = false }: UserMenuProps) => {
  if (user) {
    return (
      <>
        <span className={`text-gray-600 ${isMobile ? 'block px-3 py-2 text-base' : 'px-3 py-2 text-sm'} font-medium`}>
          {user.email}
        </span>
        {isMobile ? (
          <button
            onClick={onLogout}
            className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
          >
            Log Out
          </button>
        ) : (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <Link
            to="/login"
            className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
          >
            Log In
          </Link>
          <button
            onClick={onGetStarted}
            className="block w-full text-left px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
          >
            Get Started
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline" className="ml-4">Log In</Button>
          </Link>
          <Button 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary-dark"
          >
            Get Started
          </Button>
        </>
      )}
    </>
  );
};