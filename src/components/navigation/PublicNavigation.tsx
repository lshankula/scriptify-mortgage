import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const PublicNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-primary shrink-0">
            MortgageContent.ai
          </Link>
          
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

          {/* Mobile menu */}
          <div className="flex sm:hidden items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary-dark">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};