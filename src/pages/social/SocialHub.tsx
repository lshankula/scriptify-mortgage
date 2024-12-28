import React from 'react';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { QuickActions } from '@/components/social/QuickActions';

const SocialHub = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Social Media Hub</h1>
        <QuickActions />
      </div>
    </DashboardLayout>
  );
};

export default SocialHub;