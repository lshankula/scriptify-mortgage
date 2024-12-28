import { NavigationMenu } from "@/components/navigation/NavigationMenu";
import { Navigation } from "@/components/Navigation";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex pt-16">
        <aside className="hidden md:block w-64 shrink-0">
          <NavigationMenu className="fixed h-[calc(100vh-4rem)] w-64" />
        </aside>
        <main className="flex-1 px-4 md:px-8 py-6 w-full max-w-[1400px] mx-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};