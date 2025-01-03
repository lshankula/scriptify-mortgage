import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from './NavItem';
import { SubNavItem } from './SubNavItem';
import { MenuItem } from './types';
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { useSession } from "@/hooks/useSession";

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
  const { session } = useSession();
  const { checkOnboardingStatus } = useOnboardingStatus();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState(false);

  React.useEffect(() => {
    const checkStatus = async () => {
      if (session?.user?.id) {
        const completed = await checkOnboardingStatus(session.user.id);
        setHasCompletedOnboarding(completed);
      }
    };
    checkStatus();
  }, [session?.user?.id, checkOnboardingStatus]);

  const handleSubitemClick = async (subitem: string, links?: Record<string, string>) => {
    if (subitem === "Basic Onboarding") {
      if (hasCompletedOnboarding) {
        navigate('/onboarding?mode=edit');
      } else {
        navigate('/onboarding');
      }
    } else if (subitem === "Advanced Training") {
      if (hasCompletedOnboarding) {
        navigate('/onboarding?mode=advanced');
      } else {
        navigate('/onboarding');
      }
    } else if (links && links[subitem]) {
      navigate(links[subitem]);
    }
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
              {item.link ? (
                <SubNavItem
                  icon={item.icon}
                  label={item.label}
                  onClick={() => navigate(item.link)}
                />
              ) : (
                <>
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
                          onClick={() => handleSubitemClick(subitem, item.links)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};