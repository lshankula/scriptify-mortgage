import { Star } from 'lucide-react';

export const LevelProgress = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 w-full max-w-full mt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
            <Star className="w-5 h-5 text-accent" />
            Content Master Level 3
          </h2>
          <p className="text-muted-foreground mt-1">Complete daily tasks to level up!</p>
        </div>
        <div className="flex-shrink-0">
          <div className="text-2xl font-bold text-primary">2,450 XP</div>
          <p className="text-sm text-muted-foreground">Next level: 550 XP needed</p>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div className="bg-primary rounded-full h-2.5 w-4/5 transition-all duration-300"></div>
      </div>
    </div>
  );
};