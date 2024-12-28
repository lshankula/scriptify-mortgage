import { Award, FileText, Lightbulb, Megaphone } from 'lucide-react';

interface PostType {
  icon: JSX.Element;
  title: string;
  description: string;
  examples: string[];
}

export const postTypes: Record<string, PostType> = {
  thoughtLeadership: {
    icon: <Award className="w-6 h-6" />,
    title: "Thought Leadership",
    description: "Share industry expertise and insights",
    examples: [
      "Market analysis",
      "Industry trends",
      "Professional advice",
      "Expert tips"
    ]
  },
  marketUpdate: {
    icon: <FileText className="w-6 h-6" />,
    title: "Market Update",
    description: "Share current market conditions and rates",
    examples: [
      "Rate updates",
      "Market trends",
      "Local statistics",
      "Industry news"
    ]
  },
  valueContent: {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Value Content",
    description: "Educational content for your audience",
    examples: [
      "How-to guides",
      "Tips and tricks",
      "Process explanations",
      "Common questions"
    ]
  },
  announcement: {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Announcement",
    description: "Share news or updates",
    examples: [
      "Company news",
      "Team updates",
      "Special offers",
      "Event promotion"
    ]
  }
};

interface PostTypeSelectionProps {
  onSelect: (type: string) => void;
}

export const PostTypeSelection = ({ onSelect }: PostTypeSelectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Post Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {Object.entries(postTypes).map(([key, type]) => (
          <button
            key={key}
            className="p-4 md:p-6 border rounded-lg text-left hover:bg-gray-50 transition-colors"
            onClick={() => onSelect(key)}
          >
            <div className="flex items-center gap-3 mb-3">
              {type.icon}
              <span className="text-lg font-medium">{type.title}</span>
            </div>
            <p className="text-gray-600 mb-3">{type.description}</p>
            <div className="text-sm text-gray-500">
              Examples:
              <ul className="mt-2 space-y-1">
                {type.examples.map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};