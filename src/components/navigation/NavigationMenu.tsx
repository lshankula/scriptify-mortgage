import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Calendar, Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavigationSection } from './NavigationSection';
import { menuItems } from './navigationData';

// Create context for sidebar state
const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const NavigationMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white border-r h-[calc(100vh-4rem)]">
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