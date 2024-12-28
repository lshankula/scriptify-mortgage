import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileMenuItemProps {
  item: any;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const MobileMenuItem = ({ item, isExpanded, onToggle, onClose }: MobileMenuItemProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    onClose();
  };

  const handleSubitemClick = (subitem: string) => {
    console.log('Handling subitem click:', subitem);
    switch (subitem) {
      case "Basic Onboarding":
        handleNavigation('/onboarding');
        break;
      case "Advanced Training":
        handleNavigation('/onboarding?mode=advanced');
        break;
      case "Learning Center":
        handleNavigation('/learning');
        break;
      case "Social Post":
        handleNavigation('/social/create');
        break;
      case "Analytics":
        handleNavigation('/analytics');
        break;
      case "Co-Marketing":
        handleNavigation('/co-marketing');
        break;
      case "Content Hub":
        handleNavigation('/content-hub');
        break;
      case "Achievements":
        handleNavigation('/achievements');
        break;
      default:
        handleNavigation('/dashboard');
    }
  };

  return (
    <div className="space-y-1">
      {item.link ? (
        <button
          onClick={() => handleNavigation(item.link)}
          className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.label}</span>
          </div>
        </button>
      ) : (
        <>
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.subitems && (
              isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )
            )}
          </button>
          
          {isExpanded && item.subitems && (
            <div className="ml-6 space-y-1">
              {item.subitems.map((subitem: string, subIndex: number) => (
                <button
                  key={subIndex}
                  onClick={() => handleSubitemClick(subitem)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md"
                >
                  {subitem}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};