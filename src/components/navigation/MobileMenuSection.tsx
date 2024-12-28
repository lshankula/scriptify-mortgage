import { ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { MobileMenuItem } from './MobileMenuItem';

interface MobileMenuSectionProps {
  section: any;
  isExpanded: boolean;
  expandedItems: string[];
  onToggleSection: () => void;
  onToggleItem: (itemKey: string) => void;
  onClose: () => void;
}

export const MobileMenuSection = ({ 
  section, 
  isExpanded, 
  expandedItems,
  onToggleSection,
  onToggleItem,
  onClose
}: MobileMenuSectionProps) => {
  return (
    <div className="space-y-2">
      <button
        onClick={onToggleSection}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-md"
      >
        <div className="flex items-center gap-2">
          {section.icon}
          <span>{section.label}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {isExpanded && (
        <div className="ml-4 space-y-1">
          {section.items.map((item: any, index: number) => (
            <MobileMenuItem
              key={index}
              item={item}
              isExpanded={expandedItems.includes(`${section.label}-${index}`)}
              onToggle={() => onToggleItem(`${section.label}-${index}`)}
              onClose={onClose}
            />
          ))}
        </div>
      )}
      <Separator className="my-2" />
    </div>
  );
};