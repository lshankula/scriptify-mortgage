import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserMenu } from './UserMenu';
import { MobileMenuHeader } from './MobileMenuHeader';
import { MobileMenuSection } from './MobileMenuSection';
import { menuItems } from './navigationData';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  onLogout: () => void;
  onGetStarted: () => void;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, user, onLogout, onGetStarted, onClose }: MobileMenuProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionKey) 
        ? prev.filter(key => key !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const toggleItem = (itemKey: string) => {
    setExpandedItems(prev => 
      prev.includes(itemKey) 
        ? prev.filter(key => key !== itemKey)
        : [...prev, itemKey]
    );
  };

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="px-4 py-6 space-y-6">
          <MobileMenuHeader onClose={onClose} />

          {user && (
            <>
              <button 
                onClick={() => handleNavigation('/dashboard')}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Dashboard
              </button>
              
              {Object.entries(menuItems).map(([key, section]) => (
                <MobileMenuSection
                  key={key}
                  section={section}
                  isExpanded={expandedSections.includes(key)}
                  expandedItems={expandedItems}
                  onToggleSection={() => toggleSection(key)}
                  onToggleItem={toggleItem}
                  onClose={onClose}
                />
              ))}
              
              <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('/calendar')}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  Calendar
                </button>
                <button 
                  onClick={() => handleNavigation('/settings')}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  Settings
                </button>
              </div>
            </>
          )}
          
          {!user && (
            <>
              <Link 
                to="/features" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={onClose}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={onClose}
              >
                Pricing
              </Link>
            </>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <UserMenu 
              user={user} 
              onLogout={onLogout} 
              onGetStarted={onGetStarted}
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};