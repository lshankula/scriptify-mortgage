import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface PlatformSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const PlatformSelect = ({ value, onValueChange }: PlatformSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full bg-white border-gray-200">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="linkedin">
          <span className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </span>
        </SelectItem>
        <SelectItem value="facebook">
          <span className="flex items-center gap-2">
            <Facebook className="h-4 w-4" />
            Facebook
          </span>
        </SelectItem>
        <SelectItem value="instagram">
          <span className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </span>
        </SelectItem>
        <SelectItem value="twitter">
          <span className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Twitter
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};