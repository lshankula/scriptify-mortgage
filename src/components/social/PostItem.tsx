import React from 'react';

interface PostItemProps {
  title: string;
  type: string;
  time: string;
  status: 'published' | 'draft';
}

export const PostItem = ({ title, type, time, status }: PostItemProps) => (
  <div className="flex items-center justify-between p-3 hover:bg-accent rounded-lg">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{type} • {time}</p>
    </div>
    <span className={`text-sm ${
      status === 'published' ? 'text-green-600' : 'text-muted-foreground'
    }`}>
      {status === 'published' ? 'Published' : 'Draft'}
    </span>
  </div>
);