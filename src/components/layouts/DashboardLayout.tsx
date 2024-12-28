import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex pt-16">
        <div className="hidden md:block">
          <NavigationMenu />
        </div>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};