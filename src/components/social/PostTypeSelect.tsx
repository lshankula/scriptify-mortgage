import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postTypes } from '@/data/postTypes';

interface PostTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const PostTypeSelect = ({ value, onValueChange }: PostTypeSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-white border-gray-200">
        <SelectValue placeholder="Select Purpose" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {Object.entries(postTypes).map(([key, type]) => (
          <SelectItem key={key} value={key} className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              {type.icon}
              {type.title}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};