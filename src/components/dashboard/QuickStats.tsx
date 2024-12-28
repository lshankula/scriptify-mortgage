import { TrendingUp, Users, Target } from 'lucide-react';

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
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
  );
};