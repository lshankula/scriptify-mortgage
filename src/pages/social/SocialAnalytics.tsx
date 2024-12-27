import React from 'react';
import { Navigation } from "@/components/Navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const SocialAnalytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pl-64 pt-16">
        <div className="max-w-6xl mx-auto p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/social">Content Hub</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-2xl font-bold mt-4">Social Analytics</h1>
          {/* Content will be implemented later */}
          <div className="mt-8">
            <p>Analytics dashboard coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAnalytics;