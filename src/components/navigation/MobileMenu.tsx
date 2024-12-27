import { Link } from 'react-router-dom';
import { Plus, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserMenu } from './UserMenu';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  onLogout: () => void;
  onGetStarted: () => void;
}

export const MobileMenu = ({ isOpen, user, onLogout, onGetStarted }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden">
      <div className="pt-2 pb-3 space-y-1">
        {!user ? (
          <>
            <Link to="/features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
              Features
            </Link>
            <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
              Pricing
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50">
              Dashboard
            </Link>
            <Link to="/social/create" className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Content
              </div>
            </Link>
            <div className="px-3 py-2">
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="ml-2 text-base font-medium text-gray-600">Notifications</span>
              </div>
            </div>
          </>
        )}
        <UserMenu 
          user={user} 
          onLogout={onLogout} 
          onGetStarted={onGetStarted}
          isMobile={true}
        />
      </div>
    </div>
  );
};