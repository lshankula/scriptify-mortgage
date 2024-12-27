import React from 'react';
import { 
  SidebarProvider, 
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SidebarProvider>
        <div className="flex min-h-[calc(100vh-4rem)] w-full pt-16">
          <NavigationMenu />
          <main className="flex-1">
            <div className="container mx-auto p-6">
              <SidebarTrigger className="mb-4 md:hidden" />
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};