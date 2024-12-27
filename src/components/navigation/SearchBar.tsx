import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input 
        type="text"
        placeholder="Search content..."
        className="pl-10 pr-4 py-2 border rounded-lg w-64"
      />
    </div>
  );
};