import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const PublicNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-primary shrink-0">
            MortgageContent.ai
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="/features" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Pricing
            </Link>
            <Link to="/login">
              <Button variant="outline" className="ml-4">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary-dark">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="fixed inset-0 bg-white z-50">
            <div className="pt-20 pb-6 px-4 space-y-4">
              <Link 
                to="/features" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full mb-3">Log In</Button>
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-primary hover:bg-primary-dark">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};