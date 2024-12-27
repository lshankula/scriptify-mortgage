import { LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PostTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  onClick: () => void;
}

export const PostTypeCard = ({
  icon,
  title,
  description,
  examples,
  onClick
}: PostTypeCardProps) => {
  return (
    <Button
      variant="outline"
      className="p-6 h-auto text-left hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-lg font-medium">{title}</span>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="text-sm text-gray-500">
        Examples:
        <ul className="mt-2 space-y-1">
          {examples.map((example, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              {example}
            </li>
          ))}
        </ul>
      </div>
    </Button>
  );
};