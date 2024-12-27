import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  hasDropdown?: boolean;
  isSimple?: boolean;
  isSubitem?: boolean;
}

export const NavItem = ({ 
  icon, 
  label, 
  isActive, 
  onClick, 
  hasDropdown, 
  isSimple,
  isSubitem 
}: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center justify-between w-full p-2 mt-1 rounded-lg transition-colors",
      isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-foreground',
      isSubitem && "text-sm text-muted-foreground hover:text-foreground"
    )}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className={cn("text-sm font-medium", isSubitem && "text-sm")}>{label}</span>
    </div>
    {hasDropdown && (
      <ChevronRight 
        className={cn(
          "w-4 h-4 transition-transform",
          isActive && "transform rotate-90"
        )} 
      />
    )}
  </button>
);