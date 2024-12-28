import React from 'react';
import { postTypes } from '@/data/postTypes';

interface PostTypeSelectionProps {
  onSelect: (type: string) => void;
}

export const PostTypeSelection = ({ onSelect }: PostTypeSelectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Post Type</h2>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(postTypes).map(([key, type]) => (
          <button
            key={key}
            className="p-6 border rounded-lg text-left hover:bg-gray-50"
            onClick={() => onSelect(key)}
          >
            <div className="flex items-center gap-3 mb-3">
              {type.icon}
              <span className="text-lg font-medium">{type.title}</span>
            </div>
            <p className="text-gray-600 mb-3">{type.description}</p>
            <div className="text-sm text-gray-500">
              Examples:
              <ul className="mt-2 space-y-1">
                {type.examples.map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};