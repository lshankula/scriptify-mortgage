import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from './NavItem';
import { SubNavItem } from './SubNavItem';
import { MenuItem } from './types';

interface NavigationSectionProps {
  menuKey: string;
  menu: MenuItem;
  activeMenu: string | null;
  expandedItem: string | null;
  setActiveMenu: (menu: string | null) => void;
  setExpandedItem: (item: string | null) => void;
}

export const NavigationSection = ({
  menuKey,
  menu,
  activeMenu,
  expandedItem,
  setActiveMenu,
  setExpandedItem,
}: NavigationSectionProps) => {
  const navigate = useNavigate();

  const handleSubitemClick = (subitem: string) => {
    // Map specific subitems to routes
    if (subitem === "Social Post") {
      navigate('/social');
    }
    // Add other mappings as needed
    console.log('Subitem clicked:', subitem);
  };

  return (
    <div>
      <NavItem
        icon={menu.icon}
        label={menu.label}
        isActive={activeMenu === menuKey}
        onClick={() => setActiveMenu(activeMenu === menuKey ? null : menuKey)}
        hasDropdown
      />
      
      {activeMenu === menuKey && (
        <div className="ml-4 mt-1 border-l-2 border-accent">
          {menu.items.map((item, index) => (
            <div key={index}>
              <SubNavItem
                icon={item.icon}
                label={item.label}
                isExpanded={expandedItem === `${menuKey}-${index}`}
                onClick={() => setExpandedItem(expandedItem === `${menuKey}-${index}` ? null : `${menuKey}-${index}`)}
                hasSubitems={item.subitems?.length > 0}
              />
              
              {expandedItem === `${menuKey}-${index}` && item.subitems && (
                <div className="ml-8 border-l-2 border-accent">
                  {item.subitems.map((subitem, subIndex) => (
                    <SubNavItem
                      key={subIndex}
                      label={subitem}
                      isSubitem
                      onClick={() => handleSubitemClick(subitem)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};