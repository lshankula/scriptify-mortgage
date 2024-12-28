import React from 'react';
import { OnboardingDialog } from '@/components/onboarding/OnboardingDialog';
import { LevelProgress } from '@/components/dashboard/LevelProgress';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { DailyMissions } from '@/components/dashboard/DailyMissions';
import { RecentContent } from '@/components/dashboard/RecentContent';

const Dashboard = () => {
  return (
    <>
      <OnboardingDialog />
      <div>
        <LevelProgress />
        <QuickStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <DailyMissions />
          <RecentContent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;