import { Link } from 'react-router-dom';

export const NavigationLinks = ({ className = "" }: { className?: string }) => {
  return (
    <>
      <Link to="/features" className={`text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium ${className}`}>
        Features
      </Link>
      <Link to="/pricing" className={`text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium ${className}`}>
        Pricing
      </Link>
    </>
  );
};