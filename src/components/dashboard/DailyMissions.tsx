import { Zap, Star } from 'lucide-react';

interface MissionProps {
  text: string;
  xp: number;
  progress: number;
}

const Mission = ({ text, xp, progress }: MissionProps) => (
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

export const DailyMissions = () => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-accent" />
        Daily Missions
      </h3>
      <div className="space-y-3">
        <Mission text="Create your first video script" xp={100} progress={0} />
        <Mission text="Share content with an agent" xp={50} progress={0.5} />
        <Mission text="Complete your profile" xp={25} progress={1} />
      </div>
    </div>
  );
};