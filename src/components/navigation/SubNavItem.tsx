import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SubNavItemProps {
  icon?: React.ReactNode;
  label: string;
  isExpanded?: boolean;
  onClick?: () => void;
  hasSubitems?: boolean;
  isSubitem?: boolean;
}

export const SubNavItem = ({ 
  icon, 
  label, 
  isExpanded, 
  onClick, 
  hasSubitems, 
  isSubitem 
}: SubNavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center justify-between w-full p-2 mt-0.5 rounded-lg transition-colors",
      isSubitem 
        ? "text-sm text-muted-foreground hover:text-foreground" 
        : "text-sm text-foreground hover:bg-accent"
    )}
  >
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
    {hasSubitems && (
      <ChevronRight 
        className={cn(
          "w-3 h-3 transition-transform",
          isExpanded && "transform rotate-90"
        )} 
      />
    )}
  </button>
);