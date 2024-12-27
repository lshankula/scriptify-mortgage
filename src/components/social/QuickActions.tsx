import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2 } from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
      <button
        onClick={() => navigate('/social/create')}
        className="p-6 border rounded-lg bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium">Create New Post</span>
        </div>
        <p className="text-muted-foreground text-sm">
          Create a new social media post with AI assistance
        </p>
      </button>

      <button
        onClick={() => navigate('/social/analytics')}
        className="p-6 border rounded-lg hover:bg-accent transition-colors"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-secondary rounded-lg">
            <BarChart2 className="w-5 h-5 text-secondary-foreground" />
          </div>
          <span className="font-medium">View Analytics</span>
        </div>
        <p className="text-muted-foreground text-sm">
          Track performance and engagement metrics
        </p>
      </button>
    </div>
  );
};