import React, { useState } from 'react';
import { Plus, Star, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { NavigationMenu } from '@/components/navigation/NavigationMenu';
import { OnboardingDialog } from '@/components/onboarding/OnboardingDialog';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

// Separate components to reduce file size
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

const Dashboard = () => {
  const [notifications] = useState(3);

  return (
    <DashboardLayout>
      <OnboardingDialog />
      <div className="p-8">
        <div className="bg-white p-6 rounded-lg border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Content Master Level 3
              </h2>
              <p className="text-gray-600">Complete daily tasks to level up!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">2,450 XP</div>
              <p className="text-sm text-gray-600">Next level: 550 XP needed</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary rounded-full h-2 w-4/5"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Quick Stats */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Missions */}
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
    </DashboardLayout>
  );
};

export default Dashboard;