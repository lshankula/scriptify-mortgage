import { Star } from 'lucide-react';

export const LevelProgress = () => {
  return (
    <div className="bg-white p-6 rounded-lg border mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Content Master Level 3
          </h2>
          <p className="text-gray-600">Complete daily tasks to level up!</p>
        </div>
        <div className="mt-2 md:mt-0 md:text-right">
          <div className="text-2xl font-bold text-primary">2,450 XP</div>
          <p className="text-sm text-gray-600">Next level: 550 XP needed</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-primary rounded-full h-2 w-4/5"></div>
      </div>
    </div>
  );
};