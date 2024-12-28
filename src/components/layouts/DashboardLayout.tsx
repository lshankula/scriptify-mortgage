import { Navigation } from "@/components/Navigation";
import { MobileCreateButton } from "@/components/social/MobileCreateButton";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex pt-16">
        <main className="flex-1 px-4 md:px-8 py-6 w-full max-w-[1400px] mx-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <MobileCreateButton />
    </div>
  );
};