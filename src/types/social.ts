export interface PostType {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
}

export interface PostTypes {
  [key: string]: PostType;
}

export interface Question {
  id: string;
  question: string;
  description: string;
  type: string;
  placeholder: string;
  options?: string[];
}

export interface Answers {
  [key: string]: string;
}