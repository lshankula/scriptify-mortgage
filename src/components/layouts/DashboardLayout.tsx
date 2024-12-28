import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex pt-16">
        <NavigationMenu className="hidden md:block fixed h-[calc(100vh-4rem)]" />
        <main className="flex-1 p-4 md:ml-64">{children}</main>
      </div>
    </div>
  );
};