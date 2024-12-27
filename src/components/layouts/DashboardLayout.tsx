import React from 'react';
import { 
  SidebarProvider,
  SidebarInset
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
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-[calc(100vh-4rem)] w-full pt-16">
          <NavigationMenu />
          <SidebarInset>
            <div className="container mx-auto p-6">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};