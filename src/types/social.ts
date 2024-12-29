import { ReactNode } from 'react';

export type Post = {
  id: string;
  content: string;
  type: keyof typeof PostTypes;
  created_at: string;
  author_id: string;
  title?: string;
  status?: 'draft' | 'published';
  metadata?: Record<string, any>;
};

export type PostTypes = {
  thoughtLeadership: PostType;
  marketUpdate: PostType;
  valueContent: PostType;
  announcement: PostType;
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