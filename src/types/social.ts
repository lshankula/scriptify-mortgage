import { ReactNode } from 'react';

export const PostTypes = {
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

export type Post = {
  id: string;
  content: string;
  type: keyof typeof PostTypes;
  created_at: string;
  user_id: string;  // Changed from author_id to match database
  title?: string;
  status?: 'draft' | 'published';
  metadata?: Record<string, any>;
};

export type PostType = {
  icon: ReactNode;
  title: string;
  description: string;
  examples: string[];
};

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