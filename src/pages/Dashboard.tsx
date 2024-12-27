import React, { useState } from 'react';
import { Plus, Bell, Search, Star, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { NavigationMenu } from '@/components/navigation/NavigationMenu';
import { OnboardingDialog } from '@/components/onboarding/OnboardingDialog';
import { OnboardingCenter } from '@/components/onboarding/OnboardingCenter';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';

const Dashboard = () => {
  const [notifications, setNotifications] = useState(3);
  const { checkOnboardingStatus } = useOnboardingStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingDialog />
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left section */}
            <div className="flex items-center gap-8">
              <div className="font-bold text-xl text-primary">MortgageContent.ai</div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search content..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Quick Create Button */}
              <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Create Content
              </button>
              
              {/* Notifications */}
              <button className="relative p-2 hover:bg-accent rounded-lg">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                JD
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Navigation */}
      <div className="fixed left-0 top-16 bottom-0 z-10">
        <NavigationMenu />
      </div>

      {/* Main Dashboard Content */}
      <main className="pt-16 pl-64">
        <div className="p-8">
          <OnboardingCenter />
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Content Created</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
              <div className="text-sm text-green-600">↑ 12% from last week</div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Active Co-Marketing</h3>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
              <div className="text-sm text-primary">3 pending invites</div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Weekly Goals</h3>
                  <p className="text-2xl font-bold">7/10</p>
                </div>
              </div>
              <div className="text-sm text-accent">3 tasks remaining</div>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Daily Missions
              </h3>
              <div className="space-y-3">
                <Mission 
                  text="Create your first video script" 
                  xp={100}
                  progress={0}
                />
                <Mission 
                  text="Share content with an agent" 
                  xp={50}
                  progress={0.5}
                />
                <Mission 
                  text="Complete your profile" 
                  xp={25}
                  progress={1}
                />
              </div>
            </div>

            {/* Recent Content */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-bold mb-4">Recent Content</h3>
              <div className="space-y-3">
                <ContentItem 
                  title="First-Time Homebuyer Guide"
                  type="Blog Post"
                  time="2 hours ago"
                />
                <ContentItem 
                  title="Market Update Video Script"
                  type="Video"
                  time="Yesterday"
                />
                <ContentItem 
                  title="Rate Change Announcement"
                  type="Social Post"
                  time="2 days ago"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Mission = ({ text, xp, progress }: { text: string; xp: number; progress: number }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <input 
        type="checkbox" 
        checked={progress === 1}
        className="w-4 h-4 text-primary rounded"
        readOnly
      />
      <span className={progress === 1 ? 'text-gray-500 line-through' : ''}>
        {text}
      </span>
    </div>
    <div className="flex items-center gap-2 text-accent">
      <Star className="w-4 h-4" />
      <span>{xp} XP</span>
    </div>
  </div>
);

const ContentItem = ({ title, type, time }: { title: string; type: string; time: string }) => (
  <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{type} • {time}</p>
    </div>
    <button className="text-primary hover:text-primary-dark">View</button>
  </div>
);

export default Dashboard;
