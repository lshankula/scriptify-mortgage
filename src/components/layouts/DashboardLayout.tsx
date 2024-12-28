import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex pt-16">
        <aside className="hidden md:block w-64 fixed h-[calc(100vh-4rem)]">
          <NavigationMenu className="h-full w-64" />
        </aside>
        <main className="flex-1 md:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};