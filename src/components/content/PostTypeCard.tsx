import React from 'react';
import { Icon } from 'lucide-react';

interface PostTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  onClick: () => void;
}

export const PostTypeCard = ({ icon, title, description, examples, onClick }: PostTypeCardProps) => {
  return (
    <button
      className="p-6 border rounded-lg text-left hover:bg-gray-50 w-full"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-lg font-medium">{title}</span>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="text-sm text-gray-500">
        Examples:
        <ul className="mt-2 space-y-1">
          {examples.map((example, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
};