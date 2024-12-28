import { LevelCard } from "@/components/dashboard/LevelCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { DailyMissions } from "@/components/dashboard/DailyMissions";
import { RecentContent } from "@/components/dashboard/RecentContent";

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <LevelCard />
      <StatsGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <DailyMissions />
        <RecentContent />
      </div>
    </div>
  );
};

export default Dashboard;