import { NavigationLinks } from './NavigationLinks';
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
        <NavigationLinks className="block" />
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