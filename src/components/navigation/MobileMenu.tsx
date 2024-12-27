import { Link } from 'react-router-dom';
import { Plus, Bell, Search, FileText, Image, Layout, Video, Mail, Home, Calendar, Settings } from 'lucide-react';
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
}

export const MobileMenu = ({ isOpen, user, onLogout, onGetStarted }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="px-4 py-6 space-y-6">
          {user && (
            <>
              <div className="mb-6">
                <SearchBar />
              </div>
              
              <Link to="/dashboard" className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              
              {Object.entries(menuItems).map(([key, section]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center px-3">
                    {section.icon}
                    <h3 className="ml-2 text-sm font-semibold text-gray-900">{section.label}</h3>
                  </div>
                  
                  {section.items.map((item, index) => (
                    <div key={index} className="ml-5">
                      <div className="flex items-center px-3 py-2 text-sm text-gray-600">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </div>
                      {item.subitems?.map((subitem, subIndex) => (
                        <Link
                          key={subIndex}
                          to="#"
                          className="block ml-8 px-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md"
                        >
                          {subitem}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Separator className="my-2" />
                </div>
              ))}
              
              <div className="space-y-2">
                <Link to="/calendar" className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                  <Calendar className="w-5 h-5 mr-3" />
                  Calendar
                </Link>
                <Link to="/settings" className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>
              </div>
            </>
          )}
          
          {!user && (
            <>
              <Link to="/features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
                Features
              </Link>
              <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">
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