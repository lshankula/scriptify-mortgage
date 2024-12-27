import { Link } from 'react-router-dom';
import { Plus, Bell, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserMenu } from './UserMenu';
import { SearchBar } from './SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  onLogout: () => void;
  onGetStarted: () => void;
}

export const MobileMenu = ({ isOpen, user, onLogout, onGetStarted }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b shadow-lg">
        {user && (
          <div className="px-3 py-2">
            <SearchBar />
          </div>
        )}
        
        {!user ? (
          <>
            <Link to="/features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
              Features
            </Link>
            <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
              Pricing
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
              Dashboard
            </Link>
            <Link to="/social/create" className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50 rounded-md">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Content
              </div>
            </Link>
            <div className="px-3 py-2">
              <div className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <Bell className="w-5 h-5" />
                <span className="text-base font-medium">Notifications</span>
              </div>
            </div>
          </>
        )}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <UserMenu 
            user={user} 
            onLogout={onLogout} 
            onGetStarted={onGetStarted}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
};