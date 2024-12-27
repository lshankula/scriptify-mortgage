import { Link } from 'react-router-dom';
import { Plus, Bell, Search, FileText, Image, Layout, Video, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserMenu } from './UserMenu';
import { SearchBar } from './SearchBar';
import { Separator } from "@/components/ui/separator";

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
            <div className="mb-6">
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
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 px-3">Content Hub</h3>
                <div className="space-y-1">
                  <div className="px-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Create New</h4>
                    <div className="space-y-1 ml-4">
                      <Link to="/social/create" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-md">
                        <FileText className="w-4 h-4 mr-3" />
                        Social Post
                      </Link>
                      <Link to="/blog/create" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-md">
                        <Layout className="w-4 h-4 mr-3" />
                        Blog Article
                      </Link>
                      <Link to="/video/create" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-md">
                        <Video className="w-4 h-4 mr-3" />
                        Video Script
                      </Link>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="px-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Visual Content</h4>
                    <div className="space-y-1 ml-4">
                      <Link to="/visual/infographics" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-md">
                        <Image className="w-4 h-4 mr-3" />
                        Infographics
                      </Link>
                      <Link to="/visual/charts" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-md">
                        <Layout className="w-4 h-4 mr-3" />
                        Charts
                      </Link>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="px-3">
                    <Link to="/notifications" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary rounded-md">
                      <Bell className="w-4 h-4 mr-3" />
                      Notifications
                    </Link>
                  </div>
                </div>
              </div>
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