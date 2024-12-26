import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/login">
              <Button variant="outline" className="ml-4">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary-dark">Get Started</Button>
            </Link>
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
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};