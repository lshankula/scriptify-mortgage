import React from 'react';
import { Award, FileText, Lightbulb, Megaphone } from 'lucide-react';
import { PostType } from '@/types/social';

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