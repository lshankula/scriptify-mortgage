import React from 'react';
import { 
  Plus, BarChart2, FileText, 
  Archive, Settings, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from "@/components/Navigation";

const SocialHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pl-64 pt-16"> {/* Adjust for fixed navigation */}
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4" />
              <span>Content Hub</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Social Content</span>
            </div>
            <h1 className="text-2xl font-bold">Social Content Hub</h1>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          {/* Content Sections */}
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
        </div>
      </div>
    </div>
  );
};

interface PostItemProps {
  title: string;
  type: string;
  time: string;
  status: 'published' | 'draft';
}

const PostItem = ({ title, type, time, status }: PostItemProps) => (
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

interface TemplateItemProps {
  title: string;
  description: string;
}

const TemplateItem = ({ title, description }: TemplateItemProps) => (
  <button className="w-full text-left p-3 hover:bg-accent rounded-lg">
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </button>
);

export default SocialHub;