import React from 'react';
import { PostItem } from './PostItem';
import { TemplateItem } from './TemplateItem';

export const ContentSections = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Recent Posts */}
      <div className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-3">
          <PostItem 
            title="Market Update Q4"
            type="Long Form"
            time="2 hours ago"
            status="draft"
          />
          <PostItem 
            title="Rate Alert"
            type="Quick Update"
            time="Yesterday"
            status="published"
          />
          <PostItem 
            title="Team Achievement"
            type="Announcement"
            time="2 days ago"
            status="published"
          />
        </div>
        <button className="w-full mt-4 text-sm text-primary hover:text-primary/90">
          View All Posts
        </button>
      </div>

      {/* Draft Posts */}
      <div className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Saved Drafts</h2>
        <div className="space-y-3">
          <PostItem 
            title="Industry Insights"
            type="Thought Leadership"
            time="1 day ago"
            status="draft"
          />
          <PostItem 
            title="Client Success Story"
            type="Long Form"
            time="3 days ago"
            status="draft"
          />
        </div>
        <button className="w-full mt-4 text-sm text-primary hover:text-primary/90">
          View All Drafts
        </button>
      </div>

      {/* Templates */}
      <div className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Quick Templates</h2>
        <div className="space-y-3">
          <TemplateItem 
            title="Rate Update"
            description="Share current rates and market insights"
          />
          <TemplateItem 
            title="Team Spotlight"
            description="Highlight team achievements and news"
          />
          <TemplateItem 
            title="Market Update"
            description="Share weekly market analysis"
          />
        </div>
        <button className="w-full mt-4 text-sm text-primary hover:text-primary/90">
          View All Templates
        </button>
      </div>
    </div>
  );
};