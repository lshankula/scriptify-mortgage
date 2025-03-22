import { ReactNode } from 'react';

export type Post = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  status: 'draft' | 'published';
  title: string;
  type: string;
  remixed_from: string | null;
  updated_at: string;
  metadata?: Record<string, any>;
};

export interface PostType {
  icon: ReactNode;
  title: string;
  description: string;
  examples: string[];
}

export const postTypes = {
  thoughtLeadership: {
    icon: null,
    title: "Thought Leadership",
    description: "Share industry insights and expertise",
    examples: ["Industry trends", "Expert opinions", "Analysis"]
  },
  marketUpdate: {
    icon: null,
    title: "Market Update",
    description: "Share market news and updates",
    examples: ["Market news", "Industry updates", "Trends"]
  },
  valueContent: {
    icon: null,
    title: "Value Content",
    description: "Share valuable content with your audience",
    examples: ["Tips", "How-tos", "Best practices"]
  },
  announcement: {
    icon: null,
    title: "Announcement",
    description: "Share company announcements",
    examples: ["Product launches", "Company news", "Updates"]
  }
} as const;

// Add back the missing types
export interface Answers {
  [key: string]: string;
}

export interface Question {
  id: string;
  question: string;
  description: string;
  type: string;
  placeholder: string;
  options?: string[];
}
