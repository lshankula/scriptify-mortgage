import React from 'react';
import { NavigationMenu } from "@/components/navigation/NavigationMenu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-[calc(100vh-4rem)] w-full pt-16">
        <div className="hidden md:block">
          <NavigationMenu />
        </div>
        <main className="flex-1">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};