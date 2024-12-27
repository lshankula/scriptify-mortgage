import React from 'react';

interface TemplateItemProps {
  title: string;
  description: string;
}

export const TemplateItem = ({ title, description }: TemplateItemProps) => (
  <button className="w-full text-left p-3 hover:bg-accent rounded-lg">
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </button>
);