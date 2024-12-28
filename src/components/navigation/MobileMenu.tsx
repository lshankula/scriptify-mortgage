import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserMenu } from './UserMenu';
import { SearchBar } from './SearchBar';
import { Separator } from "@/components/ui/separator";
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
    navigate(path);
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="px-4 py-6 space-y-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          {user && (
            <>
              <div className="mb-6">
                <SearchBar />
              </div>
              
              <button 
                onClick={() => handleNavigation('/dashboard')}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                Dashboard
              </button>
              
              {Object.entries(menuItems).map(([key, section]) => (
                <div key={key} className="space-y-2">
                  <button
                    onClick={() => toggleSection(key)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      {section.icon}
                      <span>{section.label}</span>
                    </div>
                    {expandedSections.includes(key) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedSections.includes(key) && (
                    <div className="ml-4 space-y-1">
                      {section.items.map((item, index) => (
                        <div key={index} className="space-y-1">
                          {item.link ? (
                            <button
                              onClick={() => handleNavigation(item.link)}
                              className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                {item.icon}
                                <span>{item.label}</span>
                              </div>
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleItem(`${key}-${index}`)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                              >
                                <div className="flex items-center gap-2">
                                  {item.icon}
                                  <span>{item.label}</span>
                                </div>
                                {item.subitems && (
                                  expandedItems.includes(`${key}-${index}`) ? (
                                    <ChevronUp className="h-3 w-3" />
                                  ) : (
                                    <ChevronDown className="h-3 w-3" />
                                  )
                                )}
                              </button>
                              
                              {expandedItems.includes(`${key}-${index}`) && item.subitems && (
                                <div className="ml-6 space-y-1">
                                  {item.subitems.map((subitem, subIndex) => (
                                    <button
                                      key={subIndex}
                                      onClick={() => handleNavigation('/social/create')}
                                      className="block w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md"
                                    >
                                      {subitem}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <Separator className="my-2" />
                </div>
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