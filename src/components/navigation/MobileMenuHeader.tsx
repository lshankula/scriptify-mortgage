import { X } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

export const MobileMenuHeader = ({ onClose }: MobileMenuHeaderProps) => {
  return (
    <div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        aria-label="Close menu"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="mb-6">
        <SearchBar />
      </div>
    </div>
  );
};