import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Calendar, Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavigationSection } from './NavigationSection';
import { menuItems } from './navigationData';
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu = ({ className }: NavigationMenuProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className={cn("w-64 bg-white border-r", className)}>
      <div className="p-4">
        <NavItem 
          icon={<Home className="w-5 h-5" />} 
          label="Dashboard" 
          isSimple 
          onClick={() => navigate('/dashboard')}
        />
        
        {Object.entries(menuItems).map(([key, menu]) => (
          <NavigationSection
            key={key}
            menuKey={key}
            menu={menu}
            activeMenu={activeMenu}
            expandedItem={expandedItem}
            setActiveMenu={setActiveMenu}
            setExpandedItem={setExpandedItem}
          />
        ))}
        
        <NavItem 
          icon={<Calendar className="w-5 h-5" />} 
          label="Calendar" 
          isSimple 
        />
        <NavItem 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
          isSimple 
        />
      </div>
    </div>
  );
};