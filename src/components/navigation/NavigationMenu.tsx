import React, { useState } from 'react';
import { Home, Layout, Users, BarChart, Settings, Calendar, Trophy } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavigationSection } from './NavigationSection';
import { menuItems } from './navigationData';

export const NavigationMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-4">
        <NavItem icon={<Home className="w-5 h-5" />} label="Dashboard" isSimple />
        
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
        
        <NavItem icon={<Calendar className="w-5 h-5" />} label="Calendar" isSimple />
        <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" isSimple />
      </div>
    </div>
  );
};